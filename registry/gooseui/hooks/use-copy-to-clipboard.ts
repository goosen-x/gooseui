"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type UseCopyToClipboardOptions = {
  /** How long `copied` stays true, in ms. `0` keeps it until the next copy. */
  timeout?: number
  onCopy?: (text: string) => void
  onError?: (error: Error) => void
}

export type UseCopyToClipboardReturn = {
  copy: (text: string) => Promise<boolean>
  copied: boolean
  copiedText: string | null
  error: Error | null
  reset: () => void
}

// Works over plain http and in old browsers where the async Clipboard API is missing.
function copyWithTextarea(text: string): boolean {
  const active = document.activeElement as HTMLElement | null
  const selection = document.getSelection()
  const range =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.top = "0"
  textarea.style.left = "-9999px"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.select()

  let ok = false
  try {
    ok = document.execCommand("copy")
  } finally {
    document.body.removeChild(textarea)
    if (range && selection) {
      selection.removeAllRanges()
      selection.addRange(range)
    }
    active?.focus({ preventScroll: true })
  }
  return ok
}

async function writeText(text: string): Promise<void> {
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Permission denied or document not focused: try the legacy path below.
    }
  }
  if (!copyWithTextarea(text)) {
    throw new Error("Copy to clipboard is not supported")
  }
}

export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {},
): UseCopyToClipboardReturn {
  const { timeout = 2000 } = options
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  })

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => clearTimer, [clearTimer])

  const reset = useCallback(() => {
    clearTimer()
    setCopiedText(null)
    setError(null)
  }, [clearTimer])

  const copy = useCallback(
    async (text: string) => {
      clearTimer()
      try {
        await writeText(text)
        setError(null)
        setCopiedText(text)
        optionsRef.current.onCopy?.(text)
        // An overlapping copy may have set its own timer while this one awaited.
        clearTimer()
        if (timeout > 0) {
          timerRef.current = setTimeout(() => {
            timerRef.current = null
            setCopiedText(null)
          }, timeout)
        }
        return true
      } catch (cause) {
        const err = cause instanceof Error ? cause : new Error(String(cause))
        setCopiedText(null)
        setError(err)
        optionsRef.current.onError?.(err)
        return false
      }
    },
    [clearTimer, timeout],
  )

  return { copy, copied: copiedText !== null, copiedText, error, reset }
}
