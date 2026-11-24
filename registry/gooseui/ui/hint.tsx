"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type HintSide = "top" | "bottom" | "left" | "right"

type HintProps = {
  /** The hint text. Plain text only, nothing interactive. */
  content: string
  /** The element that gets the hint. One element, ideally a button or a link. */
  children: React.ReactElement<Record<string, unknown>>
  /** Which side of the element the hint appears on. */
  side?: HintSide
  /** Delay before the hint appears, in ms. A system tooltip waits about 500. */
  delay?: number
  /** Extra classes for the hint bubble. */
  className?: string
}

// A trigger the browser can open natively with `interestfor`.
const CAPABLE = ":has(> :is(button, a[href], area))"
const ROOT = "[data-goose-hint-root]"
const TIP = "[data-goose-hint]"

// Plain CSS display on hover and focus-visible. Used before hydration, in
// browsers without the Popover API or anchor positioning, and nowhere else.
const byHover = (root: string) => `
${root} > ${TIP} { display: block; visibility: hidden; opacity: 0; transition: opacity .12s ease, visibility 0s .12s; }
@media (hover: hover) {
  ${root}:not([data-dismissed]):hover > ${TIP} { visibility: visible; opacity: 1; transition: opacity .12s ease var(--goose-hint-delay), visibility 0s var(--goose-hint-delay); }
}
${root}:not([data-dismissed]):has(:focus-visible) > ${TIP} { visibility: visible; opacity: 1; transition: opacity .12s ease var(--goose-hint-delay), visibility 0s var(--goose-hint-delay); }
`

// Popover display: the top layer, with a small fade and slide.
const byPopover = (scope: string) => `
${scope} > ${TIP} { opacity: 0; transition: opacity .12s ease, translate .12s ease, display .12s allow-discrete, overlay .12s allow-discrete; }
${scope} > ${TIP}:popover-open { opacity: 1; translate: 0 0; }
${scope} > ${TIP}[data-side="top"] { translate: 0 2px; }
${scope} > ${TIP}[data-side="bottom"] { translate: 0 -2px; }
${scope} > ${TIP}[data-side="left"] { translate: 2px 0; }
${scope} > ${TIP}[data-side="right"] { translate: -2px 0; }
@starting-style {
  ${scope} > ${TIP}:popover-open { opacity: 0; }
  ${scope} > ${TIP}[data-side="top"]:popover-open { translate: 0 2px; }
  ${scope} > ${TIP}[data-side="bottom"]:popover-open { translate: 0 -2px; }
  ${scope} > ${TIP}[data-side="left"]:popover-open { translate: 2px 0; }
  ${scope} > ${TIP}[data-side="right"]:popover-open { translate: -2px 0; }
}
`

const STYLES = `
${ROOT} { display: inline-flex; position: relative; max-width: 100%; min-width: 0; }
${TIP} { width: max-content; max-width: min(20rem, calc(100vw - 1rem)); margin: 0; inset: auto; pointer-events: none; z-index: 50; text-align: left; }

@supports (anchor-name: --a) {
  ${ROOT} { display: contents; }
  ${ROOT} > :not(${TIP}) { anchor-name: var(--goose-hint-anchor); }
  ${TIP} { position: fixed; position-anchor: var(--goose-hint-anchor); }
  ${TIP}[data-side="top"] { position-area: top; margin-bottom: 6px; position-try-fallbacks: flip-block, top span-right, top span-left; }
  ${TIP}[data-side="bottom"] { position-area: bottom; margin-top: 6px; position-try-fallbacks: flip-block, bottom span-right, bottom span-left; }
  ${TIP}[data-side="left"] { position-area: left; margin-right: 6px; position-try-fallbacks: flip-inline; }
  ${TIP}[data-side="right"] { position-area: right; margin-left: 6px; position-try-fallbacks: flip-inline; }
}
@supports not (anchor-name: --a) {
  ${TIP} { position: absolute; }
  ${TIP}[data-side="top"] { bottom: calc(100% + 6px); left: 50%; translate: -50% 0; }
  ${TIP}[data-side="bottom"] { top: calc(100% + 6px); left: 50%; translate: -50% 0; }
  ${TIP}[data-side="left"] { right: calc(100% + 6px); top: 50%; translate: 0 -50%; }
  ${TIP}[data-side="right"] { left: calc(100% + 6px); top: 50%; translate: 0 -50%; }
}

${byHover(`${ROOT}:not([data-mode]):not(${CAPABLE})`)}
@supports not (interest-delay: 0s) {
${byHover(`${ROOT}:not([data-mode])`)}
}

${byPopover(`${ROOT}[data-mode="popover"]`)}
@supports (interest-delay: 0s) {
  ${ROOT} > :is(button, a[href], area) { interest-delay: var(--goose-hint-delay) 100ms; }
${byPopover(`${ROOT}${CAPABLE}`)}
}
@media (prefers-reduced-motion: reduce) {
  ${ROOT} > ${TIP} { transition: none !important; }
}
`

/**
 * Hint: a small text-only label next to an element, shown on hover and keyboard
 * focus. The modern replacement for the `title` attribute.
 *
 * On a button or link in a browser with `interestfor` and `popover="hint"`
 * the browser opens the hint itself: top layer, ~500 ms delay, Escape and long
 * press included, no script runs. For any other element (a truncated span) or
 * an older browser a few lines of script open the same popover. Without the
 * Popover API or anchor positioning it is plain CSS on `:hover` and
 * `:focus-visible`. The `title` attribute is never used, so the browser never
 * shows two tooltips.
 */
function Hint({
  content,
  children,
  side = "top",
  delay = 500,
  className,
}: HintProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const tipId = `goose-hint-${id}`
  const root = React.useRef<HTMLSpanElement>(null)

  const tip = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const node = root.current
    const bubble = tip.current
    const target = node?.querySelector<HTMLElement>(
      ":scope > :not([data-goose-hint])",
    )
    if (!node || !bubble || !target) return

    // 1. Native: the browser opens the hint itself, Escape included.
    const native =
      CSS.supports("interest-delay", "0s") &&
      target.matches("button, a[href], area")
    if (native) return

    const reset = () => node.removeAttribute("data-dismissed")

    // 2. Popover opened by a few lines of script: a span, a div or an older
    // browser. Still the top layer, so no clipping by overflow or masks.
    if (
      typeof bubble.showPopover === "function" &&
      CSS.supports("anchor-name", "--a")
    ) {
      node.setAttribute("data-mode", "popover")
      let timer: ReturnType<typeof setTimeout> | undefined
      const show = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          if (!bubble.matches(":popover-open")) bubble.showPopover()
        }, delay)
      }
      const hide = () => {
        clearTimeout(timer)
        if (bubble.matches(":popover-open")) bubble.hidePopover()
      }
      const enter = (event: PointerEvent) => {
        if (event.pointerType !== "touch") show()
      }
      const focus = () => {
        if (target.matches(":focus-visible")) show()
      }
      const escape = (event: KeyboardEvent) => {
        if (event.key === "Escape") hide()
      }
      target.addEventListener("pointerenter", enter)
      target.addEventListener("pointerleave", hide)
      target.addEventListener("focus", focus)
      target.addEventListener("blur", hide)
      document.addEventListener("keydown", escape)
      return () => {
        clearTimeout(timer)
        node.removeAttribute("data-mode")
        target.removeEventListener("pointerenter", enter)
        target.removeEventListener("pointerleave", hide)
        target.removeEventListener("focus", focus)
        target.removeEventListener("blur", hide)
        document.removeEventListener("keydown", escape)
      }
    }

    // 3. Plain CSS (no Popover API or anchor positioning). The only script is
    // Escape, so the hint can be dismissed without moving the pointer.
    const dismiss = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        (node.matches(":hover") || node.matches(":has(:focus-visible)"))
      )
        node.setAttribute("data-dismissed", "")
    }
    document.addEventListener("keydown", dismiss)
    node.addEventListener("pointerleave", reset)
    node.addEventListener("focusout", reset)
    return () => {
      document.removeEventListener("keydown", dismiss)
      node.removeEventListener("pointerleave", reset)
      node.removeEventListener("focusout", reset)
    }
  }, [delay])

  const trigger = React.cloneElement(children, {
    interestfor: tipId,
    "aria-describedby": [children.props["aria-describedby"], tipId]
      .filter(Boolean)
      .join(" "),
  })

  return (
    <span
      ref={root}
      data-goose-hint-root=""
      style={
        {
          "--goose-hint-anchor": `--${tipId}`,
          "--goose-hint-delay": `${delay}ms`,
        } as React.CSSProperties
      }
    >
      <style href="gooseui-hint" precedence="default">
        {STYLES}
      </style>
      {trigger}
      <span
        ref={tip}
        id={tipId}
        role="tooltip"
        data-goose-hint=""
        data-side={side}
        {...({ popover: "hint" } as object)}
        className={cn(
          "overflow-visible rounded-sm border-0 bg-foreground px-2 py-0.5 text-xs leading-4 font-normal text-background",
          className,
        )}
      >
        {content}
      </span>
    </span>
  )
}

export { Hint }
export type { HintProps, HintSide }
