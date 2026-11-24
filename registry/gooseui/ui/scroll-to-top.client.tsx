"use client"

import type { ComponentProps, RefObject } from "react"

export type ScrollToTopTarget =
  | string
  | HTMLElement
  | RefObject<HTMLElement | null>

/** Container to scroll: the explicit target, else the nearest scrolling ancestor. */
function findContainer(
  link: HTMLElement,
  target?: ScrollToTopTarget,
): HTMLElement | null {
  if (typeof target === "string") {
    return document.querySelector<HTMLElement>(target)
  }
  if (target) return "current" in target ? target.current : target

  const root = document.documentElement
  for (
    let el = link.parentElement;
    el && el !== document.body && el !== root;
    el = el.parentElement
  ) {
    if (
      /auto|scroll|overlay/.test(getComputedStyle(el).overflowY) &&
      el.scrollHeight > el.clientHeight
    ) {
      return el
    }
  }
  return null
}

/**
 * The link of ScrollToTop. Without JavaScript it is a plain anchor. With it, a
 * click scrolls only the container (the `scrollTarget` or the nearest scroller)
 * instead of letting the fragment jump also move the window.
 */
export function ScrollToTopAnchor({
  scrollTarget,
  behavior = "smooth",
  onClick,
  ...props
}: ComponentProps<"a"> & {
  scrollTarget?: ScrollToTopTarget
  behavior?: ScrollBehavior
}) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }
        const container = findContainer(event.currentTarget, scrollTarget)
        if (!container) return // the page itself: the anchor does the job
        event.preventDefault()
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches
        container.scrollTo({ top: 0, behavior: reduced ? "instant" : behavior })
      }}
    />
  )
}
