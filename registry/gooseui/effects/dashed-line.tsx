import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type DashedLineProps = {
  orientation?: "horizontal" | "vertical"
  /** Dash length in px. */
  dash?: number
  /** Gap between dashes in px. */
  gap?: number
  /** Line thickness in px. */
  thickness?: number
  /** Fade length at each end, in percent of the line length (0 to disable). */
  fade?: number
  /** Move the dashes along the line. */
  animated?: boolean
  /** Dash speed in px per second. */
  speed?: number
  /** "forward" moves right / down, "reverse" moves left / up. */
  direction?: "forward" | "reverse"
  className?: string
  style?: CSSProperties
}

const CSS = `
@keyframes gooseui-dashed-line-x { to { background-position-x: var(--dashed-period); } }
@keyframes gooseui-dashed-line-y { to { background-position-y: var(--dashed-period); } }
.gooseui-dashed-line[data-animated="true"] {
  animation: var(--dashed-name) var(--dashed-duration) linear infinite;
  animation-direction: var(--dashed-direction);
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-dashed-line[data-animated="true"] { animation: none; }
}
`

export function DashedLine({
  orientation = "horizontal",
  dash = 6,
  gap = 4,
  thickness = 1,
  fade = 15,
  animated = false,
  speed = 20,
  direction = "forward",
  className,
  style,
}: DashedLineProps) {
  const horizontal = orientation === "horizontal"
  const axis = horizontal ? "to right" : "to bottom"
  const safeDash = Math.max(dash, 0.5)
  const period = safeDash + Math.max(gap, 0)
  const edge = Math.min(Math.max(fade, 0), 50)
  const mask =
    edge > 0
      ? `linear-gradient(${axis}, transparent, #000 ${edge}%, #000 ${100 - edge}%, transparent)`
      : undefined
  const duration = speed > 0 ? period / speed : 0

  return (
    <>
      <style href="gooseui-dashed-line" precedence="default">
        {CSS}
      </style>
      <div
        aria-hidden="true"
        data-animated={animated && duration > 0}
        className={cn(
          "gooseui-dashed-line shrink-0 text-muted-foreground",
          horizontal ? "w-full" : "h-full self-stretch",
          className,
        )}
        style={
          {
            [horizontal ? "height" : "width"]: thickness,
            backgroundImage: `linear-gradient(${axis}, currentColor ${safeDash}px, transparent ${safeDash}px)`,
            backgroundSize: horizontal
              ? `${period}px 100%`
              : `100% ${period}px`,
            backgroundRepeat: horizontal ? "repeat-x" : "repeat-y",
            maskImage: mask,
            WebkitMaskImage: mask,
            "--dashed-period": `${period}px`,
            "--dashed-duration": `${duration}s`,
            "--dashed-name": horizontal
              ? "gooseui-dashed-line-x"
              : "gooseui-dashed-line-y",
            "--dashed-direction":
              direction === "reverse" ? "reverse" : "normal",
            ...style,
          } as CSSProperties
        }
      />
    </>
  )
}
