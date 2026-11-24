import type * as React from "react"
import { cn } from "@/lib/utils"

export interface ScrollContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Container height */
  height?: string | number
  /** Show the scrollbar only while hovered or focused (always shown on touch screens) */
  autoHide?: boolean
  /** Scrollbar variant */
  variant?: "default" | "minimal" | "primary"
  /** Reserve space for the scrollbar (scrollbar-gutter: stable). No effect on overlay scrollbars */
  forceVisible?: boolean
  ref?: React.Ref<HTMLDivElement>
}

// Static CSS: one stylesheet for every instance, state lives in data attributes.
// Standard scrollbar-width + scrollbar-color are the base (Chrome 121+, Firefox, Safari 26+).
// ::-webkit-scrollbar is only a fallback for older Safari: Chrome 121+ switches it off
// as soon as scrollbar-color or scrollbar-width is set.
const css = `
[data-gooseui-scroll-container]{
--sc-thumb:color-mix(in oklch,var(--muted-foreground) 50%,transparent);
--sc-thumb-hover:color-mix(in oklch,var(--muted-foreground) 70%,transparent);
--sc-track:var(--muted);
--sc-size:.5rem;
overflow:auto;
scrollbar-width:thin;
scrollbar-color:var(--sc-thumb) var(--sc-track);
transition:scrollbar-color .25s ease}
[data-gooseui-scroll-container][data-variant=minimal]{
--sc-thumb:color-mix(in oklch,var(--muted-foreground) 25%,transparent);
--sc-thumb-hover:color-mix(in oklch,var(--muted-foreground) 45%,transparent);
--sc-track:transparent;
--sc-size:.25rem}
[data-gooseui-scroll-container][data-variant=primary]{
--sc-thumb:var(--primary);
--sc-thumb-hover:color-mix(in oklch,var(--primary) 80%,var(--foreground));
--sc-track:color-mix(in oklch,var(--primary) 12%,transparent)}
[data-gooseui-scroll-container][data-force-visible]{scrollbar-gutter:stable}
[data-gooseui-scroll-container]:hover{scrollbar-color:var(--sc-thumb-hover) var(--sc-track)}
@media (hover:hover){
[data-gooseui-scroll-container][data-auto-hide]{scrollbar-color:transparent transparent}
[data-gooseui-scroll-container][data-auto-hide]:is(:hover,:focus-within){scrollbar-color:var(--sc-thumb) var(--sc-track)}
}
@supports not (scrollbar-color:red blue){
[data-gooseui-scroll-container]{scrollbar-width:auto}
[data-gooseui-scroll-container]::-webkit-scrollbar{width:var(--sc-size);height:var(--sc-size)}
[data-gooseui-scroll-container]::-webkit-scrollbar-track{background:var(--sc-track)}
[data-gooseui-scroll-container]::-webkit-scrollbar-thumb{background:var(--sc-thumb);border-radius:9999px;transition:background-color .25s ease}
[data-gooseui-scroll-container]:hover::-webkit-scrollbar-thumb{background:var(--sc-thumb-hover)}
[data-gooseui-scroll-container]::-webkit-scrollbar-corner{background:transparent}
@media (hover:hover){
[data-gooseui-scroll-container][data-auto-hide]::-webkit-scrollbar-thumb{background:transparent}
[data-gooseui-scroll-container][data-auto-hide]:is(:hover,:focus-within)::-webkit-scrollbar-thumb{background:var(--sc-thumb)}
}
}
@media (prefers-reduced-motion:reduce){
[data-gooseui-scroll-container],[data-gooseui-scroll-container]::-webkit-scrollbar-thumb{transition:none}
}`

/**
 * Scroll Container: a scroll area with a themed scrollbar.
 * Pure CSS (scrollbar-color, scrollbar-width, scrollbar-gutter), no JavaScript.
 */
export function ScrollContainer({
  children,
  className,
  style,
  height = "100%",
  autoHide = false,
  variant = "default",
  forceVisible = false,
  ref,
  ...props
}: ScrollContainerProps) {
  return (
    <div
      ref={ref}
      data-gooseui-scroll-container=""
      data-variant={variant}
      data-auto-hide={autoHide || undefined}
      data-force-visible={forceVisible || undefined}
      className={cn("overflow-auto", className)}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      {...props}
    >
      <style href="gooseui-scroll-container" precedence="default">
        {css}
      </style>
      {children}
    </div>
  )
}
