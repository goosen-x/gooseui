import { type RefObject, useEffect, useState } from "react"

export type ScrollSpyRoot = HTMLElement | null | RefObject<HTMLElement | null>

export type UseScrollSpyOptions = {
  /** Scroll container. Defaults to the window. */
  root?: ScrollSpyRoot
  /**
   * Activation line measured from the top of the root: pixels or a percentage
   * of the root height. A section becomes active once its top crosses it.
   */
  offset?: number | `${number}%`
  /** Custom IntersectionObserver rootMargin. By default a 1px band at `offset`. */
  rootMargin?: string
  /** Distance from the bottom (px) at which the last section is forced active. */
  bottomThreshold?: number
  /** Return the first id when no section has reached the line yet. */
  fallbackToFirst?: boolean
  /** Watch the DOM for sections that mount later. */
  watchDom?: boolean
  enabled?: boolean
}

function resolveRoot(root: ScrollSpyRoot | undefined): HTMLElement | null {
  if (!root) return null
  if (root instanceof HTMLElement) return root
  return root.current
}

function resolveOffset(offset: number | string, height: number): number {
  if (typeof offset === "number") return offset
  const value = Number.parseFloat(offset)
  return Number.isFinite(value) ? (value / 100) * height : 0
}

/**
 * Returns the id of the section currently under the activation line.
 * Sections are matched by `document.getElementById`, in the order of `ids`.
 */
export function useScrollSpy(
  ids: readonly string[],
  options: UseScrollSpyOptions = {},
): string | null {
  const {
    root,
    offset = 0,
    rootMargin,
    bottomThreshold = 4,
    fallbackToFirst = true,
    watchDom = true,
    enabled = true,
  } = options

  const [activeId, setActiveId] = useState<string | null>(null)
  const idsKey = ids.join("\u0000")

  useEffect(() => {
    if (!enabled || ids.length === 0) {
      setActiveId(null)
      return
    }

    const rootEl = resolveRoot(root)
    const scrollTarget: HTMLElement | Window = rootEl ?? window
    let elements: HTMLElement[] = []
    let observer: IntersectionObserver | null = null
    let frame = 0
    let pending = 0

    const metrics = () => {
      if (rootEl) {
        const rect = rootEl.getBoundingClientRect()
        return {
          top: rect.top,
          height: rootEl.clientHeight,
          scrollTop: rootEl.scrollTop,
          scrollHeight: rootEl.scrollHeight,
        }
      }
      const doc = document.documentElement
      return {
        top: 0,
        height: window.innerHeight,
        scrollTop: window.scrollY,
        scrollHeight: doc.scrollHeight,
      }
    }

    const pick = () => {
      frame = 0
      if (elements.length === 0) {
        setActiveId(null)
        return
      }
      const m = metrics()
      const line = m.top + resolveOffset(offset, m.height)
      let current: string | null = null
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line + 1) current = el.id
      }
      const scrollable = m.scrollHeight - m.height > 1
      const atBottom =
        scrollable && m.scrollTop + m.height >= m.scrollHeight - bottomThreshold
      if (atBottom) current = elements[elements.length - 1].id
      if (!current && fallbackToFirst) current = elements[0].id
      setActiveId(current)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(pick)
    }

    const observe = () => {
      observer?.disconnect()
      elements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
      const m = metrics()
      const line = Math.round(resolveOffset(offset, m.height))
      const margin =
        rootMargin ??
        `${-line}px 0px ${-Math.max(0, Math.round(m.height) - line - 1)}px 0px`
      observer = new IntersectionObserver(schedule, {
        root: rootEl,
        rootMargin: margin,
        threshold: [0, 1],
      })
      for (const el of elements) observer.observe(el)
      schedule()
    }

    observe()

    // The scroll listener covers fast jumps (Home/End) and the bottom edge,
    // which the thin observer band can miss.
    scrollTarget.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", observe)

    let mutation: MutationObserver | null = null
    if (watchDom) {
      mutation = new MutationObserver(() => {
        if (pending) return
        pending = requestAnimationFrame(() => {
          pending = 0
          const found = ids.filter((id) => document.getElementById(id)).length
          if (
            found !== elements.length ||
            elements.some((el) => !el.isConnected)
          ) {
            observe()
          }
        })
      })
      mutation.observe(rootEl ?? document.body, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      observer?.disconnect()
      mutation?.disconnect()
      scrollTarget.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", observe)
      if (frame) cancelAnimationFrame(frame)
      if (pending) cancelAnimationFrame(pending)
    }
  }, [
    idsKey,
    root,
    enabled,
    offset,
    rootMargin,
    bottomThreshold,
    fallbackToFirst,
    watchDom,
  ])

  return activeId
}
