"use client"

import { useEffect } from "react"

/** Closes the menu's <details> on Escape, outside click, focus leaving and link click. */
export function MegaMenuDismiss({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId)
    const details = root?.querySelector<HTMLDetailsElement>(":scope>details")
    if (!root || !details) return
    const close = (focus: boolean) => {
      if (!details.open) return
      details.open = false
      if (focus) details.querySelector("summary")?.focus()
    }
    const inside = (node: EventTarget | null) =>
      node instanceof Node && root.contains(node)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(inside(document.activeElement))
    }
    const onDown = (e: PointerEvent) => {
      if (!inside(e.target)) close(false)
    }
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("a")) close(false)
    }
    const onFocusOut = (e: FocusEvent) => {
      if (e.relatedTarget && !inside(e.relatedTarget)) close(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onDown)
    root.addEventListener("click", onClick)
    root.addEventListener("focusout", onFocusOut)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onDown)
      root.removeEventListener("click", onClick)
      root.removeEventListener("focusout", onFocusOut)
    }
  }, [rootId])
  return null
}
