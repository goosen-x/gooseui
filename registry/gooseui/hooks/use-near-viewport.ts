"use client"

import { type RefCallback, useCallback, useState } from "react"

export type UseNearViewportOptions = {
  /** Extra space around the viewport (or `root`), in CSS margin syntax. */
  rootMargin?: string
  /** Scroll container to watch instead of the viewport. */
  root?: Element | null
  /** Skip observing and stay `false`. */
  disabled?: boolean
}

export type UseNearViewportResult<T extends Element> = [
  ref: RefCallback<T>,
  isNear: boolean,
]

/**
 * Turns `true` once the element comes within `rootMargin` of the viewport
 * and never goes back. Use it to defer heavy widgets: maps, video, charts.
 * Without IntersectionObserver it reports `true` right away.
 */
export function useNearViewport<T extends Element = HTMLDivElement>({
  rootMargin = "200px",
  root = null,
  disabled = false,
}: UseNearViewportOptions = {}): UseNearViewportResult<T> {
  const [isNear, setIsNear] = useState(false)

  const ref = useCallback<RefCallback<T>>(
    (node) => {
      if (!node || isNear || disabled) return
      if (typeof IntersectionObserver === "undefined") {
        setIsNear(true)
        return
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect()
            setIsNear(true)
          }
        },
        { root, rootMargin },
      )
      observer.observe(node)
      return () => observer.disconnect()
    },
    [isNear, disabled, root, rootMargin],
  )

  return [ref, isNear]
}
