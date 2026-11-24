import {
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  useId,
} from "react"
import { cn } from "@/lib/utils"

export type ResponsiveHintMode = "auto" | "tooltip" | "sheet"

export type ResponsiveHintProps = Omit<
  ComponentProps<"button">,
  "children" | "title" | "content"
> & {
  /** Hint body. Shown in the tooltip and in the sheet. */
  children: ReactNode
  /** Optional heading. In the sheet it becomes the dialog title. */
  title?: ReactNode
  /** Custom trigger icon. */
  icon?: ReactNode
  /** Below this width (px) the sheet is used even with a mouse. */
  breakpoint?: number
  /** Force one presentation instead of choosing it with media queries. */
  mode?: ResponsiveHintMode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  /** Hover delay before the tooltip shows, in ms. */
  delayDuration?: number
  contentClassName?: string
  labels?: { trigger?: string; close?: string; title?: string }
}

type Side = NonNullable<ResponsiveHintProps["side"]>
type Align = NonNullable<ResponsiveHintProps["align"]>

// Fallback placement inside the relative wrapper, for browsers without
// anchor positioning.
const place: Record<Side, Record<Align, string>> = {
  top: {
    start: "bottom: calc(100% + 6px); left: 0",
    center: "bottom: calc(100% + 6px); left: 50%; translate: -50% 0",
    end: "bottom: calc(100% + 6px); right: 0",
  },
  bottom: {
    start: "top: calc(100% + 6px); left: 0",
    center: "top: calc(100% + 6px); left: 50%; translate: -50% 0",
    end: "top: calc(100% + 6px); right: 0",
  },
  right: {
    start: "left: calc(100% + 6px); top: 0",
    center: "left: calc(100% + 6px); top: 50%; translate: 0 -50%",
    end: "left: calc(100% + 6px); bottom: 0",
  },
  left: {
    start: "right: calc(100% + 6px); top: 0",
    center: "right: calc(100% + 6px); top: 50%; translate: 0 -50%",
    end: "right: calc(100% + 6px); bottom: 0",
  },
}

const area: Record<Side, Record<Align, string>> = {
  top: { start: "top span-right", center: "top", end: "top span-left" },
  bottom: {
    start: "bottom span-right",
    center: "bottom",
    end: "bottom span-left",
  },
  right: { start: "right span-bottom", center: "right", end: "right span-top" },
  left: { start: "left span-bottom", center: "left", end: "left span-top" },
}

const fallbacks: Record<Side, string> = {
  top: "flip-block, top span-left, top span-right, bottom span-left, bottom span-right",
  bottom:
    "flip-block, bottom span-left, bottom span-right, top span-left, top span-right",
  right: "flip-inline, bottom, top",
  left: "flip-inline, bottom, top",
}

const placementCss = (Object.keys(place) as Side[])
  .flatMap((side) =>
    (Object.keys(place[side]) as Align[]).map(
      (align) =>
        `.gooseui-hint-tip[data-side="${side}"][data-align="${align}"] { ${place[side][align]} }`,
    ),
  )
  .join("\n")

const anchoredCss = (Object.keys(area) as Side[])
  .flatMap((side) =>
    (Object.keys(area[side]) as Align[]).map(
      (align) =>
        `.gooseui-hint-tip[data-side="${side}"][data-align="${align}"] { inset: auto; translate: none; position-area: ${area[side][align]}; position-try-fallbacks: ${fallbacks[side]} }`,
    ),
  )
  .join("\n  ")

const css = `
.gooseui-hint-tip {
  position: absolute;
  z-index: 50;
  display: none;
  width: max-content;
  max-width: min(18rem, calc(100vw - 1rem));
  opacity: 0;
  visibility: hidden;
  /* the short hide delay lets the pointer cross the gap to the tooltip */
  transition: opacity 120ms ease-in 100ms, visibility 0s linear 220ms;
}
${placementCss}
.gooseui-hint:hover .gooseui-hint-tip,
.gooseui-hint:has(.gooseui-hint-trigger:focus-visible) .gooseui-hint-tip {
  opacity: 1;
  visibility: visible;
  transition: opacity 150ms ease-out var(--gooseui-hint-delay, 150ms),
    visibility 0s linear var(--gooseui-hint-delay, 150ms);
}
.gooseui-hint[data-mode="tooltip"] .gooseui-hint-tip { display: block }
@supports (anchor-name: --a) {
  .gooseui-hint-trigger { anchor-name: var(--gooseui-anchor) }
  .gooseui-hint-tip {
    position: fixed;
    position-anchor: var(--gooseui-anchor);
    inset: auto;
    translate: none;
    margin: 6px;
  }
  ${anchoredCss}
}
.gooseui-hint-sheet {
  inset: auto 0 0 0;
  margin: 0;
  width: 100%;
  max-width: none;
  max-height: 80vh;
  translate: 0 100%;
  transition: translate 260ms cubic-bezier(0.32, 0.72, 0, 1),
    display 260ms allow-discrete, overlay 260ms allow-discrete;
}
.gooseui-hint-sheet:popover-open { translate: 0 0 }
@starting-style {
  .gooseui-hint-sheet:popover-open { translate: 0 100% }
}
.gooseui-hint-sheet::backdrop {
  background: rgb(0 0 0 / 0);
  transition: background-color 200ms, display 260ms allow-discrete,
    overlay 260ms allow-discrete;
}
.gooseui-hint-sheet:popover-open::backdrop { background: rgb(0 0 0 / 0.5) }
@starting-style {
  .gooseui-hint-sheet:popover-open::backdrop { background: rgb(0 0 0 / 0) }
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-hint-tip, .gooseui-hint-sheet, .gooseui-hint-sheet::backdrop {
    transition-duration: 1ms;
    transition-delay: 0s;
  }
}
`

// "auto" switches on input type and width. Media queries can't take a
// variable, so each breakpoint gets its own deduplicated rule.
const autoCss = (bp: number) => `
@media (hover: hover) and (pointer: fine) and (min-width: ${bp}px) {
  .gooseui-hint[data-mode="auto"][data-bp="${bp}"] .gooseui-hint-tip { display: block }
  .gooseui-hint[data-mode="auto"][data-bp="${bp}"] .gooseui-hint-sheet { display: none }
}
`

function HelpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-4"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/**
 * Server component, no client JavaScript. With a mouse the hint is a CSS
 * tooltip on hover and keyboard focus; on touch screens (or narrower than
 * `breakpoint`) the button opens a bottom sheet built on a native popover.
 */
export function ResponsiveHint({
  children,
  title,
  icon,
  breakpoint = 768,
  mode = "auto",
  side = "top",
  align = "center",
  delayDuration = 150,
  contentClassName,
  labels,
  className,
  ...props
}: ResponsiveHintProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const tipId = `hint-tip-${id}`
  const sheetId = `hint-sheet-${id}`
  const titleId = `hint-title-${id}`
  const triggerLabel = labels?.trigger ?? "More information"
  const hasSheet = mode !== "tooltip"

  return (
    <span
      className="gooseui-hint relative inline-flex align-middle"
      data-mode={mode}
      data-bp={breakpoint}
      style={
        {
          "--gooseui-anchor": `--${tipId}`,
          "--gooseui-hint-delay": `${delayDuration}ms`,
        } as CSSProperties
      }
    >
      <style href="gooseui-responsive-hint" precedence="default">
        {css}
      </style>
      {mode === "auto" && (
        <style
          href={`gooseui-responsive-hint-${breakpoint}`}
          precedence="default"
        >
          {autoCss(breakpoint)}
        </style>
      )}
      <button
        type="button"
        aria-label={triggerLabel}
        aria-describedby={tipId}
        popoverTarget={hasSheet ? sheetId : undefined}
        className={cn(
          "gooseui-hint-trigger inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground",
          "outline-none focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
          "[&_svg]:size-4",
          className,
        )}
        {...props}
      >
        {icon ?? <HelpIcon />}
      </button>
      <span
        id={tipId}
        role="tooltip"
        data-side={side}
        data-align={align}
        className={cn(
          "gooseui-hint-tip rounded-lg border bg-card px-3.5 py-2.5 text-left text-sm font-normal text-card-foreground shadow-md",
          contentClassName,
        )}
      >
        {title && <span className="mb-1 block font-medium">{title}</span>}
        <span className="block text-muted-foreground">{children}</span>
      </span>
      {hasSheet && (
        <span
          id={sheetId}
          popover="auto"
          role="dialog"
          aria-labelledby={titleId}
          className={cn(
            "gooseui-hint-sheet overflow-y-auto rounded-t-2xl border-0 border-t bg-background px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-left text-foreground shadow-lg",
            contentClassName,
          )}
        >
          <span
            aria-hidden
            className="mx-auto mb-4 block h-1.5 w-10 rounded-full bg-muted"
          />
          <span className="flex items-start justify-between gap-4">
            <span
              id={titleId}
              className={cn("text-base font-semibold", !title && "sr-only")}
            >
              {title ?? labels?.title ?? triggerLabel}
            </span>
            <button
              type="button"
              popoverTarget={sheetId}
              popoverTargetAction="hide"
              aria-label={labels?.close ?? "Close"}
              className="-mt-1 -mr-1 ml-auto inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CloseIcon />
            </button>
          </span>
          <span
            className={cn(
              "block text-sm text-muted-foreground",
              title && "mt-2",
            )}
          >
            {children}
          </span>
        </span>
      )}
    </span>
  )
}
