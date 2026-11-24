"use client"

import * as React from "react"

type CarouselControllerProps = {
  loop?: boolean
  autoPlay?: number
  pauseOnHover?: boolean
}

/**
 * Wires the arrows, marks the active dot or thumbnail, updates the counter
 * and progress, keeps the thumbnail strip scrolled to the active one and runs
 * auto-play. Slides, snapping, keyboard scrolling and dot links
 * work without it.
 */
export function CarouselController({
  loop = false,
  autoPlay = 0,
  pauseOnHover = true,
}: CarouselControllerProps) {
  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const root = ref.current?.parentElement
    const view = root?.querySelector<HTMLElement>(
      "[data-slot=carousel-viewport]",
    )
    if (!root || !view) return
    const vertical = root.dataset.orientation === "vertical"
    const all = (selector: string) =>
      root.querySelectorAll<HTMLElement>(selector)
    const items = () =>
      [...view.children].filter((el): el is HTMLElement =>
        el.hasAttribute("data-carousel-item"),
      )
    const offset = (el: HTMLElement) =>
      vertical ? el.offsetTop : el.offsetLeft
    const pos = () => Math.abs(vertical ? view.scrollTop : view.scrollLeft)
    const max = () =>
      vertical
        ? view.scrollHeight - view.clientHeight
        : view.scrollWidth - view.clientWidth
    const atStart = () => pos() <= 4
    const atEnd = () => pos() >= max() - 4

    const current = () => {
      const list = items()
      if (list.length < 2) return 0
      const step = Math.abs(offset(list[1]) - offset(list[0])) || 1
      return Math.min(Math.round(pos() / step), list.length - 1)
    }

    const go = (index: number) => {
      const list = items()
      const target = list[(index + list.length) % list.length]
      if (!target) return
      const to = offset(target) - offset(list[0])
      view.scrollTo(vertical ? { top: to } : { left: to })
    }

    const step = (dir: 1 | -1) => {
      if (dir > 0 && atEnd()) return loop && go(0)
      if (dir < 0 && atStart()) return loop && go(items().length - 1)
      go(current() + dir)
    }

    let shown = -1
    const sync = () => {
      const index = current()
      const total = items().length
      for (const dot of all("[data-carousel-dot]")) {
        dot.setAttribute(
          "aria-current",
          String(Number(dot.dataset.carouselDot) === index),
        )
      }
      if (index !== shown) {
        shown = index
        // Keep the active thumbnail in view, scrolling only the strip
        for (const strip of all("[data-carousel-strip]")) {
          const thumb = strip.querySelectorAll<HTMLElement>(
            "[data-carousel-thumb]",
          )[index]
          if (!thumb) continue
          const side =
            strip.closest<HTMLElement>("[data-slot=carousel-thumbnails]")
              ?.dataset.position !== "bottom"
          strip.scrollTo(
            side
              ? {
                  top:
                    thumb.offsetTop -
                    (strip.clientHeight - thumb.offsetHeight) / 2,
                }
              : {
                  left:
                    thumb.offsetLeft -
                    (strip.clientWidth - thumb.offsetWidth) / 2,
                },
          )
        }
      }
      for (const el of all("[data-carousel-current]")) {
        el.textContent = String(index + 1)
      }
      for (const el of all("[data-slot=carousel-progress]")) {
        el.setAttribute("aria-valuenow", String(index + 1))
      }
      root.style.setProperty(
        "--carousel-progress",
        `${((index + 1) / Math.max(total, 1)) * 100}%`,
      )
      for (const button of all("[data-carousel-prev]")) {
        ;(button as HTMLButtonElement).disabled = !loop && atStart()
      }
      for (const button of all("[data-carousel-next]")) {
        ;(button as HTMLButtonElement).disabled = !loop && atEnd()
      }
    }

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(sync)
    }

    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element).closest<HTMLElement>(
        "[data-carousel-prev],[data-carousel-next],[data-carousel-dot]",
      )
      if (!target || !root.contains(target)) return
      if (target.hasAttribute("data-carousel-dot")) {
        // Scroll only the carousel, not the page
        event.preventDefault()
        go(Number(target.dataset.carouselDot))
      } else {
        step(target.hasAttribute("data-carousel-prev") ? -1 : 1)
      }
    }

    let paused = false
    const pause = () => {
      paused = true
    }
    const resume = () => {
      paused = false
    }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const timer =
      autoPlay > 0 && !reduced
        ? setInterval(() => {
            if (!paused && !document.hidden) step(1)
          }, autoPlay)
        : undefined

    sync()
    view.addEventListener("scroll", onScroll, { passive: true })
    addEventListener("resize", onScroll)
    root.addEventListener("click", onClick)
    root.addEventListener("focusin", pause)
    root.addEventListener("focusout", resume)
    if (pauseOnHover) {
      root.addEventListener("pointerenter", pause)
      root.addEventListener("pointerleave", resume)
    }
    return () => {
      clearInterval(timer)
      cancelAnimationFrame(frame)
      view.removeEventListener("scroll", onScroll)
      removeEventListener("resize", onScroll)
      root.removeEventListener("click", onClick)
      root.removeEventListener("focusin", pause)
      root.removeEventListener("focusout", resume)
      root.removeEventListener("pointerenter", pause)
      root.removeEventListener("pointerleave", resume)
    }
  }, [loop, autoPlay, pauseOnHover])

  return <span ref={ref} hidden data-slot="carousel-controller" />
}
