import type { ComponentProps, CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type RippleLoaderOrigin =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export type RippleLoaderProps = Omit<ComponentProps<"div">, "children"> & {
  /** Total width and height in px */
  size?: number
  /** Cells per side */
  grid?: number
  /** Where the wave starts */
  origin?: RippleLoaderOrigin
  /** One wave cycle, ms */
  duration?: number
  /** Gap between cells in px */
  gap?: number
  /** Cell shape */
  shape?: "square" | "rounded" | "circle"
  /** Screen reader text */
  label?: string
}

const styles = `
@keyframes gooseui-ripple-cell {
  0%, 60%, 100% { opacity: .12; transform: scale(.82) }
  30% { opacity: 1; transform: scale(1) }
}
.gooseui-ripple-cell { animation: gooseui-ripple-cell var(--ripple-duration) ease-in-out infinite backwards; animation-delay: var(--ripple-delay) }
@media (prefers-reduced-motion: reduce) {
  .gooseui-ripple-cell { animation: none; opacity: max(.25, calc(1 - var(--ripple-step) * .2)) }
}
`

function distance(
  row: number,
  col: number,
  n: number,
  origin: RippleLoaderOrigin,
) {
  const last = n - 1
  switch (origin) {
    case "top-left":
      return row + col
    case "top-right":
      return row + (last - col)
    case "bottom-left":
      return last - row + col
    case "bottom-right":
      return last - row + (last - col)
    default: {
      // Rings around the center: 3x3 gives the middle cell, then the frame
      const c = last / 2
      return Math.max(Math.abs(row - c), Math.abs(col - c))
    }
  }
}

export function RippleLoader({
  size = 48,
  grid = 3,
  origin = "center",
  duration = 1500,
  gap = 2,
  shape = "rounded",
  label = "Loading",
  className,
  style,
  ...props
}: RippleLoaderProps) {
  const n = Math.max(2, Math.round(grid))
  const cells = Array.from({ length: n * n }, (_, i) => {
    const row = Math.floor(i / n)
    const col = i % n
    return distance(row, col, n, origin)
  })
  const maxStep = Math.max(...cells) || 1
  // The whole wave travels within ~40% of the cycle
  const stepMs = (duration * 0.4) / maxStep

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("inline-block shrink-0 text-primary", className)}
      style={style}
      {...props}
    >
      <style href="gooseui-ripple-loader" precedence="default">
        {styles}
      </style>
      <div
        aria-hidden
        className="grid"
        style={{
          width: size,
          height: size,
          gap,
          gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((step, i) => (
          <span
            key={i}
            className={cn(
              "gooseui-ripple-cell block bg-current",
              shape === "circle" && "rounded-full",
              shape === "rounded" && "rounded-[20%]",
            )}
            style={
              {
                "--ripple-duration": `${duration}ms`,
                "--ripple-delay": `${Math.round(step * stepMs)}ms`,
                "--ripple-step": step,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <span className="sr-only">{label}</span>
    </div>
  )
}
