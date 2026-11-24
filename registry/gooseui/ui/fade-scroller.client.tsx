"use client"

import type { ComponentProps, ReactNode } from "react"
import { useHorizontalWheel } from "@/registry/gooseui/hooks/use-horizontal-wheel"

/** Scrolling element: maps the vertical mouse wheel to a horizontal row. */
export function FadeScrollerViewport({
  wheel,
  ...props
}: ComponentProps<"div"> & { wheel: boolean }) {
  const ref = useHorizontalWheel<HTMLDivElement>({ disabled: !wheel })
  return <div ref={ref} {...props} />
}

/** Arrow button: the only part of FadeScroller that needs JavaScript. */
export function FadeScrollerArrow({
  dir,
  step,
  label,
  auto = false,
  className,
  children,
}: {
  dir: 1 | -1
  step: number
  label: string
  /** Show only on devices with a mouse */
  auto?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      // The region itself is keyboard scrollable, arrows are for pointer users
      tabIndex={-1}
      aria-label={label}
      data-fade-scroller-arrow={dir === 1 ? "next" : "prev"}
      data-auto={auto ? "" : undefined}
      className={className}
      onClick={(event) => {
        const root = event.currentTarget.closest("[data-fade-scroller]")
        const el = root?.querySelector<HTMLElement>(
          "[data-fade-scroller-viewport]",
        )
        if (!root || !el) return
        const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches
        const behavior: ScrollBehavior = smooth ? "smooth" : "auto"
        if (root.getAttribute("data-orientation") === "vertical") {
          el.scrollBy({ top: dir * el.clientHeight * step, behavior })
        } else {
          const rtl = getComputedStyle(el).direction === "rtl" ? -1 : 1
          el.scrollBy({ left: dir * rtl * el.clientWidth * step, behavior })
        }
      }}
    >
      {children}
    </button>
  )
}
