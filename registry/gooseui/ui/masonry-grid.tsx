import type { ComponentProps, CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type MasonryGridProps = ComponentProps<"div"> & {
  /** Narrowest a column may get, in px. Columns stretch to fill the row */
  minColumnWidth?: number
  /** Space between items. Number is px, string is any CSS length */
  gap?: number | string
  /**
   * `"auto"` uses CSS Grid Lanes where supported and multi-column layout elsewhere.
   * `"columns"` always uses the multi-column layout.
   */
  layout?: "auto" | "columns"
  /** Rendered element, e.g. `"ul"` with `MasonryItem as="li"` */
  as?: "div" | "ul" | "ol" | "section"
}

export type MasonryItemProps = ComponentProps<"div"> & {
  as?: "div" | "li" | "article" | "figure"
}

// Base (every browser): multi-column layout. Items fill each column top to
// bottom, so reading order goes down column 1, then column 2.
// Grid Lanes places items left to right into the shortest lane. The browser
// picks the mode in @supports, so there is no JavaScript and no layout shift.
// The tolerance property was renamed during spec work; engines drop the name
// they do not know, so both spellings are set.
// Everything sits in @layer components, so Tailwind utilities still win.
const STYLES = `@layer components {
.gooseui-masonry {
  list-style: none;
  padding: 0;
  columns: var(--masonry-min);
  column-gap: var(--masonry-gap);
}
.gooseui-masonry > * {
  break-inside: avoid;
  margin-block-end: var(--masonry-gap);
}
@supports (display: grid-lanes) {
  .gooseui-masonry:not([data-mode="columns"]) {
    display: grid-lanes;
    columns: auto;
    grid-template-columns: repeat(auto-fill, minmax(min(var(--masonry-min), 100%), 1fr));
    gap: var(--masonry-gap);
    flow-tolerance: var(--masonry-tolerance, 1em);
    fit-tolerance: var(--masonry-tolerance, 1em);
  }
  .gooseui-masonry:not([data-mode="columns"]) > * {
    margin-block-end: 0;
  }
}
}`

/**
 * Pinterest-style layout for items of different heights. Server component, no JavaScript.
 *
 * Uses CSS Grid Lanes (`display: grid-lanes`) where available. Elsewhere it
 * falls back to CSS multi-column layout, which orders items top to bottom per
 * column instead of left to right.
 */
export function MasonryGrid({
  minColumnWidth = 240,
  gap = 16,
  layout = "auto",
  as = "div",
  className,
  style,
  children,
  ...props
}: MasonryGridProps) {
  const Comp = as as "div"

  return (
    <Comp
      data-slot="masonry-grid"
      data-mode={layout}
      className={cn("gooseui-masonry", className)}
      style={
        {
          "--masonry-min": `${minColumnWidth}px`,
          "--masonry-gap": typeof gap === "number" ? `${gap}px` : gap,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <style href="gooseui-masonry-grid" precedence="default">
        {STYLES}
      </style>
      {children}
    </Comp>
  )
}

/** One cell of a `MasonryGrid`. Any direct child works; this adds the slot and block display */
export function MasonryItem({
  as = "div",
  className,
  ...props
}: MasonryItemProps) {
  const Comp = as as "div"
  return (
    <Comp
      data-slot="masonry-item"
      className={cn("block w-full min-w-0", className)}
      {...props}
    />
  )
}
