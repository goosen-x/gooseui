"use client"

import { type RefObject, useEffect, useState } from "react"

export type UseScrollThresholdOptions = {
  /**
   * Offset at which the flag turns back off while scrolling up.
   * Defaults to half of `threshold`. Clamped so it never exceeds `threshold`.
   */
  releaseAt?: number
  /** Scroll container to watch instead of the window. */
  container?: RefObject<HTMLElement | null>
}

/**
 * `true` once the page (or `container`) is scrolled past `threshold`.
 * It turns off only below `releaseAt`, so a sticky header does not flicker
 * when the scroll position hovers around a single boundary.
 */
export function useScrollThreshold(
  threshold = 64,
  { releaseAt, container }: UseScrollThresholdOptions = {},
): boolean {
  const [passed, setPassed] = useState(false)
  const release = Math.min(releaseAt ?? threshold / 2, threshold)

  useEffect(() => {
    const element = container?.current ?? null
    const target: HTMLElement | Window = element ?? window
    let frame = 0

    const read = () => {
      frame = 0
      const offset = element ? element.scrollTop : window.scrollY
      setPassed((prev) => (prev ? offset > release : offset > threshold))
    }

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(read)
    }

    read()
    target.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      target.removeEventListener("scroll", onScroll)
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [threshold, release, container])

  return passed
}
