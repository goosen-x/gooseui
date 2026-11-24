"use client"

import { type RefCallback, useCallback } from "react"

export type UseHorizontalWheelOptions = {
  /** Turn the behavior off without detaching the ref. */
  disabled?: boolean
  /** Ease toward the target position. Ignored with reduced motion. */
  smooth?: boolean
}

const LINE_HEIGHT = 16

/**
 * Maps the vertical mouse wheel to horizontal scrolling of the element.
 * Leaves the wheel alone when the element is at its edge, when the gesture
 * already has a horizontal part (trackpads), with Shift or with Ctrl (zoom).
 */
export function useHorizontalWheel<T extends HTMLElement = HTMLDivElement>({
  disabled = false,
  smooth = true,
}: UseHorizontalWheelOptions = {}): RefCallback<T> {
  return useCallback<RefCallback<T>>(
    (node) => {
      if (!node || disabled) return

      let frame = 0
      let target = 0

      const stop = () => {
        if (frame !== 0) cancelAnimationFrame(frame)
        frame = 0
      }

      const step = () => {
        const current = node.scrollLeft
        const diff = target - current
        const move = diff * 0.25
        // Browsers round scrollLeft, so tiny steps may not move at all.
        node.scrollLeft =
          Math.abs(diff) <= 2
            ? target
            : current + (Math.abs(move) < 1 ? Math.sign(diff) : move)
        if (Math.abs(diff) <= 2 || node.scrollLeft === current) {
          node.scrollLeft = target
          frame = 0
          return
        }
        frame = requestAnimationFrame(step)
      }

      const onWheel = (event: WheelEvent) => {
        if (event.shiftKey || event.ctrlKey) return
        if (event.deltaX !== 0 || event.deltaY === 0) return

        const max = node.scrollWidth - node.clientWidth
        if (max <= 0) return

        let delta = event.deltaY
        if (event.deltaMode === 1) delta *= LINE_HEIGHT
        else if (event.deltaMode === 2) delta *= node.clientWidth

        // In RTL scrollLeft runs from -max (end) to 0 (start).
        const rtl = getComputedStyle(node).direction === "rtl"
        if (rtl) delta = -delta
        const low = rtl ? -max : 0
        const high = rtl ? 0 : max

        const from = frame !== 0 ? target : node.scrollLeft
        // At the edge: let the page keep scrolling.
        if ((delta < 0 && from <= low + 1) || (delta > 0 && from >= high - 1))
          return

        event.preventDefault()
        target = Math.min(high, Math.max(low, from + delta))

        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches
        if (!smooth || reduced) {
          stop()
          node.scrollLeft = target
          return
        }
        if (frame === 0) frame = requestAnimationFrame(step)
      }

      node.addEventListener("wheel", onWheel, { passive: false })
      return () => {
        node.removeEventListener("wheel", onWheel)
        stop()
      }
    },
    [disabled, smooth],
  )
}
