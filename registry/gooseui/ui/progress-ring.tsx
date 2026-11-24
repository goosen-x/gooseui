import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SlidingNumber } from "@/registry/gooseui/ui/sliding-number"

export type ProgressRingThreshold = {
  /** Percentage (0-100) from which this color applies */
  from: number
  /** Any CSS color, e.g. "var(--destructive)" */
  color: string
}

export type ProgressRingProps = Omit<ComponentProps<"div">, "children"> & {
  /** Current value */
  value?: number
  /** Maximum value */
  max?: number
  /** Diameter in px */
  size?: number
  /** Stroke width in px */
  thickness?: number
  /** Spinning arc without a known value */
  indeterminate?: boolean
  /** Colors by percentage, the highest matching "from" wins */
  thresholds?: ProgressRingThreshold[]
  /** Indicator color when no threshold matches */
  color?: string
  /** Show the percentage in the center */
  showValue?: boolean
  /** Roll the digits of the default percentage, the % sign stays still */
  animateValue?: boolean
  /** Custom formatter for the center value */
  formatValue?: (value: number, max: number) => ReactNode
  /** Custom center content, replaces the value */
  children?: ReactNode
  /** Accessible name */
  label?: string
  /** Round stroke ends */
  rounded?: boolean
  trackClassName?: string
  indicatorClassName?: string
}

const styles = `
@keyframes gooseui-progress-ring-spin { to { transform: rotate(360deg) } }
.gooseui-progress-ring-spin { animation: gooseui-progress-ring-spin 1s linear infinite; transform-origin: center }
@media (prefers-reduced-motion: reduce) { .gooseui-progress-ring-spin { animation-duration: 3s } }
`

function pickColor(
  percent: number,
  thresholds: ProgressRingThreshold[] | undefined,
  fallback: string,
) {
  if (!thresholds?.length) return fallback
  let color = fallback
  let best = Number.NEGATIVE_INFINITY
  for (const t of thresholds) {
    if (percent >= t.from && t.from >= best) {
      best = t.from
      color = t.color
    }
  }
  return color
}

export function ProgressRing({
  value = 0,
  max = 100,
  size = 64,
  thickness = 6,
  indeterminate = false,
  thresholds,
  color = "var(--primary)",
  showValue = true,
  animateValue = true,
  formatValue,
  children,
  label = "Progress",
  rounded = true,
  trackClassName,
  indicatorClassName,
  className,
  style,
  ...props
}: ProgressRingProps) {
  const safeMax = max > 0 ? max : 100
  const finite = Number.isFinite(value) ? value : 0
  const clamped = Math.min(Math.max(finite, 0), safeMax)
  const percent = (clamped / safeMax) * 100

  // A stroke wider than half the ring would push the radius below zero
  const strokeWidth = Math.min(Math.max(thickness, 0), size / 2)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = indeterminate
    ? circumference * 0.75
    : circumference * (1 - percent / 100)
  const stroke = pickColor(percent, thresholds, color)

  const shownPercent = Math.round(percent)
  const defaultValue = animateValue ? (
    <span className="inline-flex items-center">
      <SlidingNumber value={shownPercent} className="font-semibold" />%
    </span>
  ) : (
    `${shownPercent}%`
  )

  const center =
    children ??
    (showValue && !indeterminate
      ? (formatValue?.(clamped, safeMax) ?? defaultValue)
      : null)

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : safeMax}
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-busy={indeterminate || undefined}
      className={cn(
        "relative inline-grid shrink-0 place-items-center",
        className,
      )}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      {indeterminate && (
        <style href="gooseui-progress-ring" precedence="default">
          {styles}
        </style>
      )}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn(
          "absolute inset-0 -rotate-90",
          indeterminate && "gooseui-progress-ring-spin",
        )}
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={cn("stroke-muted", trackClassName)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap={rounded ? "round" : "butt"}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            stroke,
            // A round cap still draws a dot at 0%
            opacity: !indeterminate && percent === 0 ? 0 : 1,
          }}
          className={cn(
            "transition-[stroke-dashoffset,stroke] duration-500 ease-out motion-reduce:transition-none",
            indicatorClassName,
          )}
        />
      </svg>
      {center !== null && (
        <span
          aria-hidden={children ? undefined : true}
          className={cn(
            "relative flex flex-col items-center justify-center text-center leading-none font-semibold tabular-nums",
          )}
          style={{ fontSize: Math.max(10, size * 0.22) }}
        >
          {center}
        </span>
      )}
    </div>
  )
}
