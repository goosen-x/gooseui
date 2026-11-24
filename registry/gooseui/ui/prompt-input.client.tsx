"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  matchesAccept,
  useFileDrop,
} from "@/registry/gooseui/hooks/use-file-drop"
import { BadgeRemove } from "@/registry/gooseui/ui/badge"

export type PromptInputStatus = "idle" | "submitting" | "streaming"

export type PromptInputMessage = {
  text: string
  files: File[]
}

export type PromptInputLabels = {
  /** Accessible name of the textarea */
  message: string
  /** Accessible name of the attachment list */
  attachments: string
  /** Remove button on an attachment, followed by the file name */
  remove: string
  attach: string
  /** Read after the counter: "12 / 500 characters" */
  characters: string
  send: string
  sending: string
  stop: string
  /** Overlay text while files are dragged over the box */
  drop: string
}

const DEFAULT_LABELS: PromptInputLabels = {
  message: "Message",
  attachments: "Attachments",
  remove: "Remove",
  attach: "Attach files",
  characters: "characters",
  send: "Send message",
  sending: "Sending",
  stop: "Stop generating",
  drop: "Drop files to attach",
}

type Attachment = { id: string; file: File }

type PromptInputContextValue = {
  text: string
  setText: (text: string) => void
  attachments: Attachment[]
  addFiles: (files: File[]) => void
  removeAttachment: (id: string) => void
  openFilePicker: () => void
  submit: () => void
  canSubmit: boolean
  overLimit: boolean
  status: PromptInputStatus
  onStop?: () => void
  disabled: boolean
  placeholder?: string
  maxLength?: number
  submitOn: "enter" | "mod+enter"
  labels: PromptInputLabels
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  counterId: string
}

const PromptInputContext = React.createContext<PromptInputContextValue | null>(
  null,
)

/** State and actions of the surrounding PromptInput, for custom toolbar parts */
export function usePromptInput() {
  const context = React.useContext(PromptInputContext)
  if (!context) {
    throw new Error("PromptInput parts must be used inside <PromptInput>")
  }
  return context
}

function supportsFieldSizing() {
  return typeof CSS !== "undefined" && CSS.supports("field-sizing", "content")
}

let attachmentCounter = 0

export type PromptInputProps = Omit<
  React.ComponentProps<"form">,
  "onSubmit" | "defaultValue"
> & {
  /** Controlled text */
  value?: string
  /** Initial text when uncontrolled */
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Called with the trimmed text and attached files. The input is cleared afterwards */
  onSubmit?: (message: PromptInputMessage) => void
  /** `streaming` turns the send button into a stop button, `submitting` shows a spinner */
  status?: PromptInputStatus
  /** Called by the stop button while streaming */
  onStop?: () => void
  placeholder?: string
  /** Soft limit: the counter turns red and sending is blocked above it */
  maxLength?: number
  /** Which shortcut sends. With `"enter"`, Shift+Enter adds a new line. Default: `"enter"` */
  submitOn?: "enter" | "mod+enter"
  /** File types for the picker, drop and paste, same format as the `accept` attribute */
  accept?: string
  /** Maximum number of attachments. Default: 10 */
  maxFiles?: number
  disabled?: boolean
  /** Texts for screen readers and the drop overlay */
  labels?: Partial<PromptInputLabels>
}

/** The form, its state and the hidden file input. PromptInput wraps it with the default layout */
export function PromptInputForm({
  className,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onSubmit,
  status = "idle",
  onStop,
  placeholder = "Send a message…",
  maxLength,
  submitOn = "enter",
  accept,
  maxFiles = 10,
  disabled = false,
  labels: labelsProp,
  children,
  ...props
}: PromptInputProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsProp }
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const text = valueProp ?? uncontrolled
  const setText = React.useCallback(
    (next: string) => {
      if (valueProp === undefined) setUncontrolled(next)
      onValueChange?.(next)
    },
    [valueProp, onValueChange],
  )

  const [attachments, setAttachments] = React.useState<Attachment[]>([])
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const counterId = React.useId()

  const addFiles = React.useCallback(
    (files: File[]) => {
      const accepted = files.filter((file) => matchesAccept(file, accept))
      if (accepted.length === 0) return
      setAttachments((current) =>
        [
          ...current,
          ...accepted.map((file) => ({
            id: `attachment-${++attachmentCounter}`,
            file,
          })),
        ].slice(0, maxFiles),
      )
    },
    [accept, maxFiles],
  )

  const removeAttachment = React.useCallback((id: string) => {
    setAttachments((current) => current.filter((a) => a.id !== id))
    textareaRef.current?.focus()
  }, [])

  const { dropProps } = useFileDrop({
    accept,
    multiple: true,
    disabled: disabled || status !== "idle",
    onDrop: addFiles,
  })

  const overLimit = maxLength !== undefined && text.length > maxLength
  const canSubmit =
    !disabled &&
    status === "idle" &&
    !overLimit &&
    (text.trim().length > 0 || attachments.length > 0)

  const submit = () => {
    if (!canSubmit) return
    onSubmit?.({ text: text.trim(), files: attachments.map((a) => a.file) })
    setText("")
    setAttachments([])
  }

  const context: PromptInputContextValue = {
    text,
    setText,
    attachments,
    addFiles,
    removeAttachment,
    openFilePicker: () => fileInputRef.current?.click(),
    submit,
    canSubmit,
    overLimit,
    status,
    onStop,
    disabled,
    placeholder,
    maxLength,
    submitOn,
    labels,
    textareaRef,
    counterId,
  }

  return (
    <PromptInputContext.Provider value={context}>
      <form
        data-slot="prompt-input"
        data-status={status}
        aria-busy={status !== "idle" || undefined}
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
        className={cn(
          "bg-background dark:bg-input/30 border-input relative flex w-full flex-col rounded-xl border shadow-xs transition-[border-color,box-shadow]",
          // :has() refinements; without it the box keeps the plain focus-within border
          "focus-within:border-ring has-[textarea:focus-visible]:ring-ring/30 has-[textarea:focus-visible]:ring-[5px]",
          "has-[[data-slot=prompt-attachment]]:pt-1",
          "has-[textarea[aria-invalid=true]]:border-destructive has-[textarea[aria-invalid=true]]:ring-destructive/30",
          "data-[dragging]:border-primary data-[dragging]:ring-primary/25 data-[dragging]:ring-[5px]",
          disabled && "opacity-50",
          className,
        )}
        {...dropProps}
        {...props}
      >
        {children}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          hidden
          tabIndex={-1}
          onChange={(event) => {
            addFiles(Array.from(event.target.files ?? []))
            event.target.value = ""
            textareaRef.current?.focus()
          }}
        />
        {dropProps["data-dragging"] && (
          <div
            aria-hidden="true"
            className="bg-background/85 text-primary pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] text-sm font-medium"
          >
            {labels.drop}
          </div>
        )}
      </form>
    </PromptInputContext.Provider>
  )
}

/** Textarea that grows with its text. Enter (or Ctrl/⌘+Enter) sends, paste attaches files */
export function PromptInputTextarea({
  className,
  onKeyDown,
  onPaste,
  onChange,
  "aria-describedby": ariaDescribedBy,
  ...props
}: React.ComponentProps<"textarea">) {
  const {
    text,
    setText,
    submit,
    addFiles,
    status,
    disabled,
    placeholder,
    maxLength,
    overLimit,
    submitOn,
    labels,
    textareaRef,
    counterId,
  } = usePromptInput()

  // Fallback for browsers without field-sizing: grow to scrollHeight, max-block-size clamps it
  React.useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el || supportsFieldSizing()) return
    el.style.blockSize = "auto"
    el.style.blockSize = `${el.scrollHeight + el.offsetHeight - el.clientHeight}px`
  }, [text, textareaRef])

  return (
    <textarea
      ref={textareaRef}
      data-slot="prompt-input-textarea"
      rows={1}
      aria-label={labels.message}
      aria-describedby={
        [ariaDescribedBy, maxLength !== undefined ? counterId : null]
          .filter(Boolean)
          .join(" ") || undefined
      }
      aria-invalid={overLimit || undefined}
      aria-keyshortcuts={
        submitOn === "enter" ? "Enter" : "Control+Enter Meta+Enter"
      }
      enterKeyHint={submitOn === "enter" ? "send" : "enter"}
      placeholder={placeholder}
      disabled={disabled}
      value={text}
      onChange={(event) => {
        onChange?.(event)
        setText(event.target.value)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || event.key !== "Enter") return
        // IME: Enter confirms the composition, it must not send (keyCode 229 covers Safari)
        if (event.nativeEvent.isComposing || event.keyCode === 229) return
        const mod = event.metaKey || event.ctrlKey
        const sends =
          submitOn === "enter" ? !event.shiftKey && !event.altKey : mod
        if (!sends) return
        event.preventDefault()
        if (status === "idle") submit()
      }}
      onPaste={(event) => {
        onPaste?.(event)
        const files = Array.from(event.clipboardData.files)
        if (event.defaultPrevented || files.length === 0) return
        addFiles(files)
        // Keep the text when the clipboard has both (e.g. a copied table)
        if (!event.clipboardData.getData("text/plain")) event.preventDefault()
      }}
      className={cn(
        "placeholder:text-muted-foreground field-sizing-content block max-h-52 min-h-11 w-full resize-none overflow-y-auto bg-transparent px-3.5 pt-3 pb-1 text-base outline-none disabled:cursor-not-allowed md:text-sm",
        className,
      )}
      {...props}
    />
  )
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

const buttonClass =
  "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none transition-[background-color,color,opacity] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function AttachmentChip({
  attachment,
  removeLabel,
  onRemove,
}: {
  attachment: Attachment
  removeLabel: string
  onRemove: () => void
}) {
  const { file } = attachment
  const isImage = file.type.startsWith("image/")
  const [url, setUrl] = React.useState<string>()

  React.useEffect(() => {
    if (!isImage) return
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file, isImage])

  return (
    <li
      data-slot="prompt-attachment"
      className="bg-muted/60 text-foreground flex max-w-52 shrink-0 items-center gap-2 rounded-lg border py-1 pr-2 pl-1 text-xs"
    >
      {isImage && url ? (
        <img
          src={url}
          alt=""
          className="size-8 shrink-0 rounded-md object-cover"
        />
      ) : (
        <span className="bg-background text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-md border">
          <svg {...iconProps} className="size-4">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8M10 9H8" />
          </svg>
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate font-medium">{file.name}</span>
        <span className="text-muted-foreground block">
          {formatSize(file.size)}
        </span>
      </span>
      <BadgeRemove
        aria-label={`${removeLabel} ${file.name}`}
        onClick={onRemove}
      />
    </li>
  )
}

/** Chips for attached files. Renders nothing while there are none */
export function PromptInputAttachments({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  const { attachments, removeAttachment, labels } = usePromptInput()
  if (attachments.length === 0) return null
  return (
    <ul
      data-slot="prompt-input-attachments"
      aria-label={labels.attachments}
      className={cn("flex gap-2 overflow-x-auto px-2 pt-1.5 pb-1", className)}
      {...props}
    >
      {attachments.map((attachment) => (
        <AttachmentChip
          key={attachment.id}
          attachment={attachment}
          removeLabel={labels.remove}
          onRemove={() => removeAttachment(attachment.id)}
        />
      ))}
    </ul>
  )
}

/** Paperclip button that opens the file picker */
export function PromptInputAttachButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { openFilePicker, disabled, status, labels } = usePromptInput()
  return (
    <button
      type="button"
      data-slot="prompt-input-attach"
      aria-label={labels.attach}
      disabled={disabled || status !== "idle"}
      onClick={openFilePicker}
      className={cn(
        buttonClass,
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        className,
      )}
      {...props}
    >
      {children ?? (
        <svg {...iconProps}>
          <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
        </svg>
      )}
    </button>
  )
}

/** `12 / 500` counter. Renders nothing without `maxLength` */
export function PromptInputCounter({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { text, maxLength, overLimit, counterId, labels } = usePromptInput()
  if (maxLength === undefined) return null
  return (
    <span
      id={counterId}
      data-slot="prompt-input-counter"
      data-over={overLimit || undefined}
      className={cn(
        "text-muted-foreground data-[over]:text-destructive px-1 text-xs tabular-nums",
        className,
      )}
      {...props}
    >
      {text.length} / {maxLength}
      <span className="sr-only"> {labels.characters}</span>
    </span>
  )
}

/** Send button. Shows a spinner while submitting and a stop button while streaming */
export function PromptInputSubmit({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { canSubmit, status, onStop, labels } = usePromptInput()
  const classes = cn(
    buttonClass,
    "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
    className,
  )

  if (status === "streaming") {
    return (
      <button
        type="button"
        data-slot="prompt-input-submit"
        data-status={status}
        aria-label={labels.stop}
        disabled={!onStop}
        onClick={onStop}
        className={classes}
        {...props}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className="size-3"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      </button>
    )
  }

  return (
    <button
      type="submit"
      data-slot="prompt-input-submit"
      data-status={status}
      aria-label={status === "submitting" ? labels.sending : labels.send}
      disabled={!canSubmit}
      className={classes}
      {...props}
    >
      {status === "submitting" ? (
        <svg {...iconProps} className="animate-spin motion-reduce:animate-none">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        (children ?? (
          <svg {...iconProps}>
            <path d="m5 12 7-7 7 7M12 19V5" />
          </svg>
        ))
      )}
    </button>
  )
}
