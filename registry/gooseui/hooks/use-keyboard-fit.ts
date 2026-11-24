"use client"

import { useEffect, useState } from "react"

export type UseKeyboardFitOptions = {
  /** Stop tracking and clear the CSS variables. */
  disabled?: boolean
  /** Smaller overlaps are treated as browser chrome, not a keyboard. */
  minHeight?: number
  /** Count the keyboard as open only while a text field has focus. */
  requireFocus?: boolean
}

export type KeyboardFit = {
  /** Height of the layout viewport covered by the keyboard, in px. */
  height: number
  open: boolean
}

const VARS = ["--keyboard-height", "--viewport-height", "--viewport-top"]
const ATTRIBUTE = "data-keyboard-open"
const CLOSED: KeyboardFit = { height: 0, open: false }

function isTextField(element: Element | null) {
  if (!element) return false
  if (element instanceof HTMLTextAreaElement) return true
  if (element instanceof HTMLElement && element.isContentEditable) return true
  if (!(element instanceof HTMLInputElement)) return false
  return ![
    "button",
    "checkbox",
    "radio",
    "range",
    "color",
    "file",
    "submit",
    "reset",
    "image",
  ].includes(element.type)
}

/**
 * Tracks `visualViewport` and reports how much of the screen the on-screen
 * keyboard covers. Also writes `--keyboard-height`, `--viewport-height` and
 * `--viewport-top` on <html>, plus `data-keyboard-open` while it is open,
 * so bottom-pinned bars and inputs can sit above the iOS keyboard.
 */
export function useKeyboardFit({
  disabled = false,
  minHeight = 120,
  requireFocus = true,
}: UseKeyboardFitOptions = {}): KeyboardFit {
  const [fit, setFit] = useState<KeyboardFit>(CLOSED)

  useEffect(() => {
    const viewport = window.visualViewport
    if (disabled || !viewport) return

    const root = document.documentElement
    // Tallest height seen at the current width. Installed web apps shrink the
    // layout viewport together with the visual one, so compare against this.
    let tallest = 0
    let width = 0
    let frame = 0

    const update = () => {
      frame = 0
      if (root.clientWidth !== width) {
        width = root.clientWidth
        tallest = 0
      }
      tallest = Math.max(
        tallest,
        root.clientHeight,
        window.innerHeight,
        viewport.height,
      )

      const covered = Math.max(
        0,
        Math.round(tallest - viewport.height - viewport.offsetTop),
      )
      const zoomed = viewport.scale > 1.05
      const focused = !requireFocus || isTextField(document.activeElement)
      const open = !zoomed && focused && covered > minHeight
      const height = open ? covered : 0

      root.style.setProperty("--keyboard-height", `${height}px`)
      root.style.setProperty("--viewport-height", `${viewport.height}px`)
      root.style.setProperty("--viewport-top", `${viewport.offsetTop}px`)
      root.toggleAttribute(ATTRIBUTE, open)

      setFit((prev) =>
        prev.height === height && prev.open === open ? prev : { height, open },
      )
    }

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    update()
    viewport.addEventListener("resize", schedule)
    viewport.addEventListener("scroll", schedule)
    document.addEventListener("focusin", schedule)
    document.addEventListener("focusout", schedule)

    return () => {
      viewport.removeEventListener("resize", schedule)
      viewport.removeEventListener("scroll", schedule)
      document.removeEventListener("focusin", schedule)
      document.removeEventListener("focusout", schedule)
      if (frame !== 0) cancelAnimationFrame(frame)
      for (const name of VARS) root.style.removeProperty(name)
      root.removeAttribute(ATTRIBUTE)
      setFit(CLOSED)
    }
  }, [disabled, minHeight, requireFocus])

  return fit
}
