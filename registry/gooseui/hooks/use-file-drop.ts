import * as React from "react"

export type FileRejectReason = "type" | "count"

export type UseFileDropOptions = {
  /** Same format as the `accept` attribute: "image/*,.pdf" or an array */
  accept?: string | string[]
  /** Allow more than one file per drop */
  multiple?: boolean
  disabled?: boolean
  onDrop?: (files: File[]) => void
  onReject?: (files: File[], reason: FileRejectReason) => void
}

export type FileDropProps = {
  onDragEnter: (event: React.DragEvent<HTMLElement>) => void
  onDragOver: (event: React.DragEvent<HTMLElement>) => void
  onDragLeave: (event: React.DragEvent<HTMLElement>) => void
  onDrop: (event: React.DragEvent<HTMLElement>) => void
  "data-dragging"?: true
}

export type UseFileDropResult = {
  isDragging: boolean
  /** Spread on the element that accepts drops */
  dropProps: FileDropProps
}

function toAcceptList(accept: string | string[] | undefined): string[] {
  if (!accept) return []
  const list = Array.isArray(accept) ? accept : accept.split(",")
  return list.map((item) => item.trim().toLowerCase()).filter(Boolean)
}

/** Checks a file against an `accept` value (MIME types, wildcards, extensions). */
export function matchesAccept(
  file: File,
  accept: string | string[] | undefined,
): boolean {
  const rules = toAcceptList(accept)
  if (rules.length === 0) return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return rules.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule)
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1))
    return type === rule
  })
}

function hasFiles(event: React.DragEvent) {
  return Array.from(event.dataTransfer?.types ?? []).includes("Files")
}

export function useFileDrop({
  accept,
  multiple = false,
  disabled = false,
  onDrop,
  onReject,
}: UseFileDropOptions = {}): UseFileDropResult {
  const [isDragging, setIsDragging] = React.useState(false)
  // dragenter/dragleave fire for every child, so count depth instead of toggling
  const depth = React.useRef(0)
  const latest = React.useRef({ accept, multiple, onDrop, onReject })
  latest.current = { accept, multiple, onDrop, onReject }

  const reset = React.useCallback(() => {
    depth.current = 0
    setIsDragging(false)
  }, [])

  React.useEffect(() => {
    if (disabled) reset()
  }, [disabled, reset])

  // A drop or cancelled drag elsewhere can leave the counter unbalanced
  React.useEffect(() => {
    if (!isDragging) return
    window.addEventListener("drop", reset)
    window.addEventListener("dragend", reset)
    return () => {
      window.removeEventListener("drop", reset)
      window.removeEventListener("dragend", reset)
    }
  }, [isDragging, reset])

  const onDragEnter = React.useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (disabled || !hasFiles(event)) return
      event.preventDefault()
      depth.current += 1
      if (depth.current === 1) setIsDragging(true)
    },
    [disabled],
  )

  const onDragOver = React.useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (disabled || !hasFiles(event)) return
      event.preventDefault()
      event.dataTransfer.dropEffect = "copy"
    },
    [disabled],
  )

  const onDragLeave = React.useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (disabled || !hasFiles(event)) return
      depth.current = Math.max(0, depth.current - 1)
      if (depth.current === 0) setIsDragging(false)
    },
    [disabled],
  )

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (disabled || !hasFiles(event)) return
      event.preventDefault()
      reset()
      const files = Array.from(event.dataTransfer.files)
      if (files.length === 0) return
      const { accept, multiple, onDrop, onReject } = latest.current
      if (!multiple && files.length > 1) {
        onReject?.(files, "count")
        return
      }
      const accepted: File[] = []
      const rejected: File[] = []
      for (const file of files) {
        ;(matchesAccept(file, accept) ? accepted : rejected).push(file)
      }
      if (rejected.length > 0) onReject?.(rejected, "type")
      if (accepted.length > 0) onDrop?.(accepted)
    },
    [disabled, reset],
  )

  const dropProps = React.useMemo<FileDropProps>(
    () => ({
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop: handleDrop,
      "data-dragging": isDragging ? true : undefined,
    }),
    [onDragEnter, onDragOver, onDragLeave, handleDrop, isDragging],
  )

  return { isDragging, dropProps }
}
