"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  type FileRejectReason,
  matchesAccept,
  useFileDrop,
} from "@/registry/gooseui/hooks/use-file-drop"
import { Button } from "@/registry/gooseui/ui/button"

export type DropzoneRejectReason = FileRejectReason | "size"

export type DropzoneRejection = {
  file: File
  reason: DropzoneRejectReason
}

export type DropzoneLabels = {
  title: string
  dragging: string
  /** Line under the title. Built from `maxSize` and `maxFiles` when omitted */
  hint?: string
  slotTitle: string
  replace: string
  remove: string
  typeError: (file: File) => string
  sizeError: (file: File, maxSize: number) => string
  countError: (maxFiles: number) => string
}

export type DropzoneProps = {
  /** `zone`: a large area with a file list. `slot`: a square for one image */
  variant?: "zone" | "slot"
  value?: File[]
  defaultValue?: File[]
  onValueChange?: (files: File[]) => void
  onReject?: (rejections: DropzoneRejection[]) => void
  /** Same format as the `accept` attribute */
  accept?: string
  /** Max size of one file, in bytes */
  maxSize?: number
  /** Max number of files in the zone. The slot always holds one */
  maxFiles?: number
  disabled?: boolean
  /** Name for the hidden file input */
  name?: string
  labels?: Partial<DropzoneLabels>
  className?: string
  "aria-label"?: string
}

function Svg({ className, d }: { className?: string; d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  )
}

const ICON = {
  file: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7ZM14 2v5h5",
  imagePlus:
    "M16 5h6M19 2v6M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5M21 15l-3.1-3.1a2 2 0 0 0-2.8 0L6 21M9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  refresh:
    "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  x: "M18 6 6 18M6 6l12 12",
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB"]
  let size = bytes / 1024
  let unit = 0
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024
    unit += 1
  }
  return `${size >= 10 ? Math.round(size) : Number(size.toFixed(1))} ${units[unit]}`
}

const defaultLabels: DropzoneLabels = {
  title: "Drop files here or click to browse",
  dragging: "Release to add files",
  slotTitle: "Add image",
  replace: "Replace",
  remove: "Remove",
  typeError: (file) => `${file.name}: this file type is not allowed`,
  sizeError: (file, max) => `${file.name} is larger than ${formatBytes(max)}`,
  countError: (max) =>
    max === 1 ? "Only one file is allowed" : `You can add up to ${max} files`,
}

const sameFile = (a: File, b: File) =>
  a.name === b.name && a.size === b.size && a.lastModified === b.lastModified

/** Object URLs for image files, revoked when a file leaves the list or on unmount. */
function useImagePreviews(files: File[]) {
  const urls = React.useRef(new Map<File, string>())
  const [previews, setPreviews] = React.useState(() => new Map<File, string>())

  React.useEffect(() => {
    const next = new Map<File, string>()
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue
      next.set(file, urls.current.get(file) ?? URL.createObjectURL(file))
    }
    for (const [file, url] of urls.current) {
      if (!next.has(file)) URL.revokeObjectURL(url)
    }
    urls.current = next
    setPreviews(next)
  }, [files])

  React.useEffect(
    () => () => {
      for (const url of urls.current.values()) URL.revokeObjectURL(url)
      urls.current = new Map()
    },
    [],
  )

  return previews
}

export function Dropzone({
  variant = "zone",
  value: valueProp,
  defaultValue,
  onValueChange,
  onReject,
  accept,
  maxSize,
  maxFiles: maxFilesProp,
  disabled = false,
  name,
  labels: labelsProp,
  className,
  "aria-label": ariaLabel,
}: DropzoneProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const isSlot = variant === "slot"
  const maxFiles = isSlot ? 1 : maxFilesProp
  const multiple = maxFiles !== 1

  const [inner, setInner] = React.useState<File[]>(defaultValue ?? [])
  const files = valueProp ?? inner
  const [errors, setErrors] = React.useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const batchIndexes = React.useRef(new WeakMap<File, number>())
  const [leaving, setLeaving] = React.useState<Set<File>>(() => new Set())
  const [errorAnimation, setErrorAnimation] = React.useState(0)
  const previews = useImagePreviews(files)
  const errorId = React.useId()
  const hintId = React.useId()

  // Keep the hidden input in sync so `name` submits the current files with a form
  React.useEffect(() => {
    const input = inputRef.current
    if (!input || typeof DataTransfer === "undefined") return
    const current = Array.from(input.files ?? [])
    if (
      current.length === files.length &&
      current.every((file, index) => sameFile(file, files[index]))
    )
      return
    try {
      const transfer = new DataTransfer()
      for (const file of files) transfer.items.add(file)
      input.files = transfer.files
    } catch {
      // Older browsers cannot assign FileList
    }
  })

  const setFiles = (next: File[]) => {
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
  }

  const report = (rejections: DropzoneRejection[]) => {
    const messages: string[] = []
    let countReported = false
    for (const { file, reason } of rejections) {
      if (reason === "type") messages.push(labels.typeError(file))
      else if (reason === "size" && maxSize)
        messages.push(labels.sizeError(file, maxSize))
      else if (reason === "count" && !countReported) {
        countReported = true
        messages.push(labels.countError(maxFiles ?? 1))
      }
    }
    setErrors(messages)
    if (messages.length > 0) setErrorAnimation((current) => current + 1)
    if (rejections.length > 0) onReject?.(rejections)
  }

  const addFiles = (incoming: File[]) => {
    const rejections: DropzoneRejection[] = []
    const valid: File[] = []
    for (const file of incoming) {
      if (!matchesAccept(file, accept))
        rejections.push({ file, reason: "type" })
      else if (maxSize && file.size > maxSize)
        rejections.push({ file, reason: "size" })
      else valid.push(file)
    }

    if (isSlot) {
      if (valid.length > 1) {
        report([
          ...rejections,
          ...valid.map((file) => ({ file, reason: "count" as const })),
        ])
        return
      }
      report(rejections)
      if (valid[0]) setFiles([valid[0]])
      return
    }

    const fresh = valid.filter(
      (file) => !files.some((existing) => sameFile(existing, file)),
    )
    const room =
      maxFiles === undefined
        ? fresh.length
        : Math.max(0, maxFiles - files.length)
    for (const file of fresh.slice(room))
      rejections.push({ file, reason: "count" })
    report(rejections)
    const added = fresh.slice(0, room)
    if (added.length > 0) {
      added.forEach((file, index) => batchIndexes.current.set(file, index))
      setFiles([...files, ...added])
    }
  }

  // Validation lives in addFiles so drop, picker and paste behave the same
  const { isDragging, dropProps } = useFileDrop({
    multiple: true,
    disabled,
    onDrop: (dropped) => addFiles(dropped),
  })

  const removeFile = (file: File) => {
    setFiles(files.filter((item) => item !== file))
    setErrors([])
  }

  const startRemoving = (file: File, button: HTMLButtonElement) => {
    const row = button.closest("li")
    const nextButton =
      row?.nextElementSibling?.querySelector<HTMLButtonElement>("button")
    ;(nextButton ?? inputRef.current)?.focus()
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      removeFile(file)
    } else {
      setLeaving((current) => new Set(current).add(file))
    }
  }

  const styles = (
    <style href="gooseui-dropzone" precedence="default">{`
      @keyframes gooseui-dropzone-enter { from { grid-template-rows: 0fr; } to { grid-template-rows: 1fr; } }
      @keyframes gooseui-dropzone-leave { from { grid-template-rows: 1fr; } to { grid-template-rows: 0fr; } }
      @keyframes gooseui-dropzone-content-enter { from { opacity: 0; transform: translateY(-0.375rem) scale(0.98); } to { opacity: 1; transform: none; } }
      @keyframes gooseui-dropzone-content-leave { from { opacity: 1; transform: none; } to { opacity: 0; transform: scale(0.98); } }
      @keyframes gooseui-dropzone-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-0.1875rem); } }
      @keyframes gooseui-dropzone-shake-a { 0%, 100% { transform: translateX(0); } 16.67%, 50%, 83.33% { transform: translateX(-0.1875rem); } 33.33%, 66.67% { transform: translateX(0.1875rem); } }
      @keyframes gooseui-dropzone-shake-b { 0%, 100% { transform: translateX(0); } 16.67%, 50%, 83.33% { transform: translateX(-0.1875rem); } 33.33%, 66.67% { transform: translateX(0.1875rem); } }
      @keyframes gooseui-dropzone-error { from { opacity: 0; transform: translateY(-0.25rem); } to { opacity: 1; transform: none; } }
      @media (prefers-reduced-motion: no-preference) {
        .gooseui-dropzone-row { display: grid; grid-template-rows: 1fr; animation: gooseui-dropzone-enter 220ms cubic-bezier(0.2, 0, 0, 1) backwards; animation-delay: calc(var(--i) * 40ms); }
        .gooseui-dropzone-row > div { min-height: 0; overflow: hidden; }
        .gooseui-dropzone-row-content { transition: padding-top 180ms cubic-bezier(0.2, 0, 0, 1); animation: gooseui-dropzone-content-enter 220ms cubic-bezier(0.2, 0, 0, 1) backwards; animation-delay: calc(var(--i) * 40ms); }
        .gooseui-dropzone-row:first-child[data-state="leaving"] + .gooseui-dropzone-row .gooseui-dropzone-row-content { padding-top: 0; }
        .gooseui-dropzone-row[data-state="leaving"] { animation: gooseui-dropzone-leave 180ms cubic-bezier(0.2, 0, 0, 1) forwards; }
        .gooseui-dropzone-row[data-state="leaving"] .gooseui-dropzone-row-content { transition: padding-top 180ms cubic-bezier(0.2, 0, 0, 1); animation: gooseui-dropzone-content-leave 180ms cubic-bezier(0.2, 0, 0, 1) forwards; }
        .gooseui-dropzone-image { opacity: 0; transition: opacity 200ms; }
        .gooseui-dropzone-image[data-loaded] { opacity: 1; }
        .gooseui-dropzone-icon[data-dragging="true"] { transform: translateY(-0.125rem); }
        .gooseui-dropzone-icon[data-dragging="true"] > span { animation: gooseui-dropzone-bounce 900ms ease-in-out infinite; }
        .gooseui-dropzone-surface[data-error="1"] { animation: gooseui-dropzone-shake-a 300ms; }
        .gooseui-dropzone-surface[data-error="0"] { animation: gooseui-dropzone-shake-b 300ms; }
        .gooseui-dropzone-error { animation: gooseui-dropzone-error 180ms; }
      }
    `}</style>
  )

  const handlePaste = (event: React.ClipboardEvent<HTMLElement>) => {
    if (disabled) return
    const pasted = Array.from(event.clipboardData.files)
    if (pasted.length === 0) return
    event.preventDefault()
    addFiles(isSlot ? pasted.slice(0, 1) : pasted)
  }

  const hint =
    labels.hint ??
    [
      maxSize ? `Up to ${formatBytes(maxSize)}` : null,
      maxFiles && maxFiles > 1 ? `${maxFiles} files max` : null,
    ]
      .filter(Boolean)
      .join(" · ")

  const describedBy =
    [hint && !isSlot ? hintId : null, errors.length > 0 ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined

  // The native input sits inside the <label>: click, Enter and Space open the picker without JS
  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      name={name}
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      aria-label={
        isSlot && !ariaLabel
          ? files[0]
            ? `${labels.replace}: ${files[0].name}`
            : labels.slotTitle
          : ariaLabel
      }
      aria-describedby={describedBy}
      className="peer sr-only"
      onChange={(event) => {
        const picked = Array.from(event.target.files ?? [])
        // Cleared so the same file can be picked again; the sync effect restores the list
        event.target.value = ""
        if (picked.length > 0) addFiles(picked)
      }}
    />
  )

  const errorList =
    errors.length > 0 ? (
      <ul
        key={errorAnimation}
        id={errorId}
        role="alert"
        className="gooseui-dropzone-error space-y-0.5 text-sm text-destructive"
      >
        {errors.map((message, index) => (
          <li key={`${index}-${message}`}>{message}</li>
        ))}
      </ul>
    ) : null

  const surface = cn(
    "transition-[border-color,background-color,box-shadow] has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50",
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
  )

  if (isSlot) {
    const file = files[0]
    const preview = file ? previews.get(file) : undefined
    return (
      <div className={cn("w-40 space-y-2", className)}>
        {styles}
        <div className="relative">
          <label
            {...dropProps}
            onPaste={handlePaste}
            data-error={errorAnimation ? errorAnimation % 2 : undefined}
            className={cn(
              "gooseui-dropzone-surface",
              "group relative flex aspect-square w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-input bg-background p-3 text-center",
              !disabled && "hover:border-primary/50 hover:bg-accent/50",
              file && "border-solid",
              isDragging && "border-primary bg-primary/5",
              surface,
            )}
          >
            {file ? (
              <>
                {preview ? (
                  <img
                    key={preview}
                    src={preview}
                    alt=""
                    onLoad={(event) => {
                      event.currentTarget.dataset.loaded = ""
                    }}
                    className="gooseui-dropzone-image absolute inset-0 size-full object-cover"
                  />
                ) : (
                  <Svg d={ICON.file} className="size-8 text-muted-foreground" />
                )}
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-background/85 py-1.5 text-xs font-medium text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-has-[input:focus-visible]:opacity-100">
                  <Svg d={ICON.refresh} className="size-3.5" />
                  {labels.replace}
                </span>
              </>
            ) : (
              <>
                <span
                  data-dragging={isDragging}
                  className="gooseui-dropzone-icon flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <span>
                    <Svg
                      d={isDragging ? ICON.upload : ICON.imagePlus}
                      className="size-5"
                    />
                  </span>
                </span>
                <span className="text-sm font-medium">
                  {isDragging ? labels.dragging : labels.slotTitle}
                </span>
                {hint && (
                  <span className="text-xs text-muted-foreground">{hint}</span>
                )}
              </>
            )}
            {isDragging && file && (
              <span className="absolute inset-0 flex items-center justify-center bg-primary/10 text-sm font-medium text-foreground backdrop-blur-[2px]">
                {labels.dragging}
              </span>
            )}
            {fileInput}
          </label>
          {file && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`${labels.remove} ${file.name}`}
              onClick={() => {
                removeFile(file)
                inputRef.current?.focus()
              }}
              className="absolute top-1.5 right-1.5 flex size-7 cursor-pointer items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur-sm transition-colors outline-none hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <Svg d={ICON.x} className="size-3.5" />
            </Button>
          )}
        </div>
        {errorList}
      </div>
    )
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {styles}
      <label
        {...dropProps}
        onPaste={handlePaste}
        data-error={errorAnimation ? errorAnimation % 2 : undefined}
        className={cn(
          "gooseui-dropzone-surface",
          "group flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-input bg-background px-6 py-10 text-center",
          !disabled && "hover:border-primary/50 hover:bg-accent/40",
          isDragging && "border-primary bg-primary/5",
          surface,
        )}
      >
        <span
          data-dragging={isDragging}
          className={cn(
            "gooseui-dropzone-icon flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 motion-reduce:transform-none motion-reduce:transition-none",
            !isDragging && "group-hover:scale-105",
          )}
        >
          <span>
            <Svg d={ICON.upload} className="size-5" />
          </span>
        </span>
        <span className="text-sm font-medium">
          {isDragging ? labels.dragging : labels.title}
        </span>
        {hint && (
          <span id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </span>
        )}
        {fileInput}
      </label>

      {errorList}

      {files.length > 0 && (
        <ul>
          {files.map((file, index) => {
            const preview = previews.get(file)
            return (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}`}
                data-state={leaving.has(file) ? "leaving" : undefined}
                style={
                  {
                    "--i": batchIndexes.current.get(file) ?? 0,
                  } as React.CSSProperties
                }
                className="gooseui-dropzone-row"
                onAnimationEnd={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    event.animationName !== "gooseui-dropzone-leave"
                  )
                    return
                  setLeaving((current) => {
                    const next = new Set(current)
                    next.delete(file)
                    return next
                  })
                  removeFile(file)
                }}
              >
                <div>
                  <div
                    className={cn(
                      "gooseui-dropzone-row-content",
                      index > 0 && "pt-2",
                    )}
                  >
                    <div className="flex items-center gap-3 rounded-lg border bg-card p-2 pr-3 text-card-foreground">
                      <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
                        {preview ? (
                          <img
                            src={preview}
                            alt=""
                            onLoad={(event) => {
                              event.currentTarget.dataset.loaded = ""
                            }}
                            className="gooseui-dropzone-image size-full object-cover"
                          />
                        ) : (
                          <Svg
                            d={ICON.file}
                            className="size-4 text-muted-foreground"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {file.name}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {formatBytes(file.size)}
                        </span>
                      </span>
                      {!disabled && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`${labels.remove} ${file.name}`}
                          onClick={(event) =>
                            startRemoving(file, event.currentTarget)
                          }
                          disabled={leaving.has(file)}
                          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        >
                          <Svg d={ICON.x} className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
