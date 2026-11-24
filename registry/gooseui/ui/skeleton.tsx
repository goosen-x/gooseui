import type * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Skeleton placeholders in plain CSS: a server component, no JavaScript.
 *
 * - `pulse` (default) fades the block in and out, like shadcn.
 * - `shimmer` runs a soft highlight left to right.
 * - `wave` lights blocks up one after another, top to bottom.
 *
 * Inside <SkeletonGroup> the highlight is ONE band shared by every block, with
 * one angle and one speed, as if the blocks were holes in a mask. How: every
 * block draws a highlight layer the size of the whole group (the group is the
 * containing block of `position: fixed` because it has a transform), all layers
 * run the same `background-position` animation, and each block clips its layer
 * to its own rounded box with `clip-path: border-box`. No
 * `background-attachment: fixed`, so it behaves the same in Safari and on iOS.
 * The layers are not composited (no transform animation), so a big group does
 * not allocate one GPU layer per block.
 *
 * The group renders its children directly (no wrapper), so `space-y-*`, `gap-*`,
 * `flex` and `grid` classes on the group apply to the blocks as expected.
 */

type SkeletonVariant = "pulse" | "shimmer" | "wave"
type SkeletonShape = "rect" | "text" | "circle"

const shapes: Record<SkeletonShape, string> = {
  rect: "rounded-md",
  text: "h-4 w-full rounded-sm",
  circle: "size-10 shrink-0 rounded-full",
}

/** Selectors for blocks that resolve to `variant`: their own attribute wins, otherwise the group's. */
const BLOCK = '[data-slot="skeleton"]:not([data-loading="false"])'
function resolved(variant: SkeletonVariant, tail = "") {
  return [
    `${BLOCK}[data-variant="${variant}"]${tail}`,
    `[data-slot="skeleton-group"][data-variant="${variant}"] ${BLOCK}:not([data-variant])${tail}`,
  ].join(",")
}

const css = `
@keyframes goose-skeleton-pulse { 50% { opacity: 0.5; } }
@keyframes goose-skeleton-sweep-x { from { background-position: 120% 0; } to { background-position: -20% 0; } }
@keyframes goose-skeleton-sweep-y { from { background-position: 0 120%; } to { background-position: 0 -20%; } }

/* block: a tint of the text color, so it reads on any surface; the highlight is lighter than the block */
[data-slot="skeleton"], [data-slot="skeleton-group"] {
  --skeleton-base: color-mix(in oklab, var(--foreground) 15%, transparent);
  --skeleton-shine: color-mix(in oklab, var(--background) 80%, transparent);
}
:is(.dark) [data-slot="skeleton"], :is(.dark) [data-slot="skeleton-group"] {
  --skeleton-base: color-mix(in oklab, var(--foreground) 13%, transparent);
  --skeleton-shine: color-mix(in oklab, var(--foreground) 14%, transparent);
}

${BLOCK}:not([data-variant]), ${BLOCK}[data-variant="pulse"] {
  animation: goose-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* shimmer and wave: a highlight layer clipped to the block's rounded box */
${resolved("shimmer")}, ${resolved("wave")} {
  animation: none;
  clip-path: border-box;
}
${resolved("shimmer", "::before")}, ${resolved("wave", "::before")} {
  content: "";
  position: var(--skeleton-layer, absolute);
  inset: 0;
  pointer-events: none;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
${resolved("shimmer", "::before")} {
  background: linear-gradient(100deg, transparent 40%, var(--skeleton-shine) 50%, transparent 60%) no-repeat 120% 0 / 200% 100%;
  animation-name: goose-skeleton-sweep-x;
  animation-duration: 1.8s;
}
${resolved("wave", "::before")} {
  background: linear-gradient(180deg, transparent 40%, var(--skeleton-shine) 50%, transparent 60%) no-repeat 0 120% / 100% 200%;
  animation-name: goose-skeleton-sweep-y;
  animation-duration: 2.4s;
}

/* inside a group the layer covers the whole group, so one sweep crosses every block */
[data-slot="skeleton-group"] {
  position: relative;
  transform: translate(0);
  --skeleton-layer: fixed;
}

/* swapping in real content: children keep the size, then fade in. While loading
   nothing shows through: text is transparent, elements are hidden but laid out. */
[data-slot="skeleton"][data-loading] { transition: background-color 300ms ease-out, color 300ms ease-out; }
[data-slot="skeleton-content"] > * { transition: opacity 300ms ease-out; }
[data-slot="skeleton"][data-loading="true"] { color: transparent; text-shadow: none; user-select: none; }
[data-slot="skeleton"][data-loading="true"] > [data-slot="skeleton-content"] { visibility: hidden; }
[data-slot="skeleton"][data-loading="true"] > [data-slot="skeleton-content"] > * { opacity: 0; }

[data-slot="skeleton-reveal"] { transition: opacity 400ms ease-out, translate 400ms ease-out; }
@starting-style { [data-slot="skeleton-reveal"] { opacity: 0; translate: 0 6px; } }

@media (prefers-reduced-motion: reduce) {
  [data-slot="skeleton"], [data-slot="skeleton"]::before { animation: none !important; }
  [data-slot="skeleton"]::before { content: none !important; }
  [data-slot="skeleton"][data-loading], [data-slot="skeleton-content"] > *, [data-slot="skeleton-reveal"] { transition: none; }
}
`

function SkeletonStyles() {
  return (
    <style href="goose-skeleton" precedence="goose-skeleton">
      {css}
    </style>
  )
}

type SkeletonProps = React.ComponentProps<"div"> & {
  /** Animation. Falls back to the surrounding SkeletonGroup, then to "pulse". */
  variant?: SkeletonVariant
  /** Ready-made form: a text line, a circle or a free rectangle. */
  shape?: SkeletonShape
  /**
   * With children: `true` shows the placeholder and keeps the children invisible
   * but laid out (so nothing jumps), `false` fades the children in.
   */
  loading?: boolean
}

function Skeleton({
  className,
  variant,
  shape = "rect",
  loading,
  children,
  ...props
}: SkeletonProps) {
  const wraps = children !== undefined && children !== null
  const active = !wraps || loading !== false
  return (
    <>
      <SkeletonStyles />
      <div
        data-slot="skeleton"
        data-variant={variant}
        data-shape={shape}
        data-loading={wraps ? String(active) : undefined}
        aria-busy={wraps && active ? true : undefined}
        className={cn(
          "relative",
          active && "bg-[var(--skeleton-base)]",
          shapes[shape],
          className,
        )}
        {...props}
      >
        {wraps ? (
          <span
            data-slot="skeleton-content"
            aria-hidden={active ? true : undefined}
            className="contents"
          >
            {children}
          </span>
        ) : null}
      </div>
    </>
  )
}

type SkeletonGroupProps = React.ComponentProps<"div"> & {
  /** Animation shared by the blocks inside. Default "shimmer". */
  variant?: SkeletonVariant
  /** Text for screen readers. Default "Loading…". */
  label?: string
}

/** Wraps blocks so shimmer and wave run as one wave across all of them. */
function SkeletonGroup({
  className,
  variant = "shimmer",
  label = "Loading…",
  children,
  ...props
}: SkeletonGroupProps) {
  return (
    <>
      <SkeletonStyles />
      <div
        data-slot="skeleton-group"
        data-variant={variant}
        role="status"
        aria-busy="true"
        className={className}
        {...props}
      >
        <span className="sr-only">{label}</span>
        {children}
      </div>
    </>
  )
}

/** Line widths in percent: fixed, so server and client render the same markup. */
const LINE_WIDTHS = [100, 94, 97, 88]
const LAST_LINE_WIDTH = 62

type SkeletonTextProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Number of lines. Default 3. */
  lines?: number
  variant?: SkeletonVariant
  /** Classes for every line, for example a height. */
  lineClassName?: string
}

/** A paragraph of text lines; the last line is shorter. */
function SkeletonText({
  className,
  lines = 3,
  variant,
  lineClassName,
  ...props
}: SkeletonTextProps) {
  const count = Math.max(1, Math.floor(lines))
  return (
    <div
      data-slot="skeleton-text"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => {
        const last = index === count - 1 && count > 1
        const width = last
          ? LAST_LINE_WIDTH
          : LINE_WIDTHS[index % LINE_WIDTHS.length]
        return (
          <Skeleton
            key={index}
            shape="text"
            variant={variant}
            className={lineClassName}
            style={{ width: `${width}%` }}
          />
        )
      })}
    </div>
  )
}

/**
 * Wrap real content that replaces a placeholder (for example a Suspense
 * boundary): it fades in on mount through `@starting-style`. Browsers without
 * it just show the content.
 */
function SkeletonReveal({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <>
      <SkeletonStyles />
      <div data-slot="skeleton-reveal" className={className} {...props} />
    </>
  )
}

export { Skeleton, SkeletonGroup, SkeletonReveal, SkeletonText }
export type {
  SkeletonGroupProps,
  SkeletonProps,
  SkeletonShape,
  SkeletonTextProps,
  SkeletonVariant,
}
