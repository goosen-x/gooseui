import type * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollProgressProps extends React.ComponentProps<"div"> {
  /**
   * Which scroller to track.
   * - "root": the page (bar is fixed to the viewport edge)
   * - "nearest": the closest scrollable ancestor (bar is sticky inside it)
   */
  target?: "root" | "nearest"
  /** Bar color, any CSS color. Defaults to the theme primary */
  color?: string
  /** Bar thickness in pixels */
  height?: number
  /** Edge of the page / container where the bar sticks */
  position?: "top" | "bottom"
  /** Fill the bar with a gradient from a faded to the full color */
  gradient?: boolean
  /** Show the percentage next to the bar (pure CSS counter) */
  showPercent?: boolean
}

const css = `
@property --gsp {
  syntax: "<integer>";
  inherits: true;
  initial-value: 0;
}
@keyframes gsp-grow { to { transform: scaleX(1); } }
@keyframes gsp-count { to { --gsp: 100; } }
[data-gooseui-scroll-progress] [data-gsp-bar] {
  transform: scaleX(0);
  transform-origin: left;
}
[data-gooseui-scroll-progress] [data-gsp-label] { display: none; }
@supports (animation-timeline: scroll()) {
  [data-gooseui-scroll-progress] { animation: gsp-count linear both; }
  [data-gooseui-scroll-progress] [data-gsp-bar] { animation: gsp-grow linear both; }
  [data-gooseui-scroll-progress][data-target="root"],
  [data-gooseui-scroll-progress][data-target="root"] [data-gsp-bar] {
    animation-timeline: scroll(root);
  }
  [data-gooseui-scroll-progress][data-target="nearest"],
  [data-gooseui-scroll-progress][data-target="nearest"] [data-gsp-bar] {
    animation-timeline: scroll(nearest);
  }
  [data-gooseui-scroll-progress] [data-gsp-label] {
    display: block;
    counter-reset: gsp var(--gsp);
  }
  [data-gooseui-scroll-progress] [data-gsp-label]::after { content: counter(gsp) "%"; }
}
`

/**
 * Scroll progress bar on CSS scroll-driven animations, no JavaScript.
 * Without `animation-timeline` support the bar stays empty (hidden).
 */
export function ScrollProgress({
  target = "root",
  color,
  height = 3,
  position = "top",
  gradient = false,
  showPercent = false,
  className,
  style,
  ...props
}: ScrollProgressProps) {
  const edge = position === "top" ? "top-0" : "bottom-0"
  const c = color ?? "var(--primary)"
  return (
    <div
      aria-hidden="true"
      data-gooseui-scroll-progress=""
      data-target={target}
      className={cn(
        "pointer-events-none left-0 right-0 flex items-center gap-2",
        target === "root" ? "fixed z-[100]" : "sticky z-10",
        edge,
        className,
      )}
      style={style}
      {...props}
    >
      <style href="gooseui-scroll-progress" precedence="default">
        {css}
      </style>
      <div className="flex-1">
        <div
          data-gsp-bar=""
          className="rounded-full"
          style={{
            height,
            background: gradient
              ? `linear-gradient(to right, color-mix(in oklab, ${c} 25%, transparent), ${c})`
              : c,
          }}
        />
      </div>
      {showPercent && (
        <span
          data-gsp-label=""
          className="w-10 pr-2 text-right text-xs tabular-nums text-muted-foreground"
        />
      )}
    </div>
  )
}
