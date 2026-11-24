import * as React from "react"
import { cn } from "@/lib/utils"

export type GaugeThreshold = {
  /** Lower bound of the level, in value units */
  from: number
  /** Any CSS color, e.g. "var(--primary)" */
  color: string
  /** Level caption, e.g. "High" */
  label?: string
}

export type GaugeProps = Omit<React.ComponentProps<"div">, "children"> & {
  value: number
  min?: number
  max?: number
  variant?: "arc" | "bar"
  /** Levels sorted or not; the last one with `from <= value` wins */
  thresholds?: GaugeThreshold[]
  /** Accessible name of the meter */
  label?: string
  showValue?: boolean
  showLevel?: boolean
  /** Show min and max under the scale */
  showRange?: boolean
  formatValue?: (value: number) => string
  /** Text for aria-valuetext */
  valueText?: (value: number, level?: string) => string
  /** Transition duration in ms for the arc and the marker */
  duration?: number
  /** Stroke width of the arc or height of the bar, px */
  thickness?: number
}

const MID = "color-mix(in oklch, var(--destructive), var(--primary))"

function defaultThresholds(min: number, max: number): GaugeThreshold[] {
  const span = max - min
  return [
    { from: min, color: "var(--destructive)", label: "Low" },
    { from: min + span / 3, color: MID, label: "Medium" },
    { from: min + (span * 2) / 3, color: "var(--primary)", label: "High" },
  ]
}

function pickLevel(sorted: GaugeThreshold[], value: number) {
  let level = sorted[0]
  for (const t of sorted) if (value >= t.from) level = t
  return level
}

// Arc fill and marker position come from custom properties, so a new value
// transitions in CSS and the first render grows from zero via @starting-style.
const css = `[data-gauge]{--gauge-ease:cubic-bezier(.33,1,.68,1)}
[data-gauge-arc]{stroke-dashoffset:calc(100 - var(--gauge-fill));transition:stroke-dashoffset var(--gauge-duration) var(--gauge-ease),stroke .3s}
[data-gauge-marker]{left:calc(var(--gauge-fill) * 1% - var(--gauge-knob) / 2);transition:left var(--gauge-duration) var(--gauge-ease)}
@starting-style{[data-gauge-arc]{stroke-dashoffset:100}[data-gauge-marker]{left:calc(var(--gauge-knob) / -2)}}
@media (prefers-reduced-motion:reduce){[data-gauge-arc],[data-gauge-marker]{transition:none}}`

export function Gauge({
  value,
  min = 0,
  max = 100,
  variant = "arc",
  thresholds,
  label,
  showValue = true,
  showLevel = true,
  showRange = false,
  formatValue = (v) => String(Math.round(v)),
  valueText,
  duration = 700,
  thickness,
  className,
  style,
  ...props
}: GaugeProps) {
  const gradientId = `gauge-${React.useId().replace(/:/g, "")}`
  const safeMax = max > min ? max : min + 1
  const clamped = Math.min(safeMax, Math.max(min, value))
  const sorted = [
    ...(thresholds?.length ? thresholds : defaultThresholds(min, safeMax)),
  ].sort((a, b) => a.from - b.from)
  const level = pickLevel(sorted, clamped)
  const ratio = (clamped - min) / (safeMax - min)
  const filled = Math.max(0, Math.min(100, ratio * 100))
  const ariaText = valueText
    ? valueText(clamped, level?.label)
    : [formatValue(clamped), level?.label].filter(Boolean).join(", ")
  const vars = {
    "--gauge-fill": filled,
    "--gauge-duration": `${Math.max(0, duration)}ms`,
    ...style,
  } as React.CSSProperties
  const styleTag = (
    <style href="gooseui-gauge" precedence="default">
      {css}
    </style>
  )

  const meter = {
    role: "meter",
    "aria-valuenow": clamped,
    "aria-valuemin": min,
    "aria-valuemax": safeMax,
    "aria-valuetext": ariaText,
    "aria-label": label,
  } as const

  const valueNode = showValue ? (
    <span className="font-semibold tabular-nums leading-none text-foreground">
      {formatValue(clamped)}
    </span>
  ) : null
  const levelNode =
    showLevel && level?.label ? (
      <span
        className="text-sm font-medium transition-colors duration-300"
        style={{ color: level.color }}
      >
        {level.label}
      </span>
    ) : null

  if (variant === "bar") {
    const h = thickness ?? 10
    // Gradient stops follow threshold positions
    const stops = sorted
      .map((t) => {
        const pos = ((t.from - min) / (safeMax - min)) * 100
        return `${t.color} ${Math.max(0, Math.min(100, pos))}%`
      })
      .join(", ")
    const gradient =
      sorted.length > 1
        ? `linear-gradient(90deg, ${stops})`
        : (sorted[0]?.color ?? "var(--primary)")
    return (
      <div
        {...meter}
        {...props}
        data-gauge=""
        className={cn("w-full space-y-2", className)}
        style={{ ...vars, "--gauge-knob": `${h + 6}px` } as React.CSSProperties}
      >
        {styleTag}
        {(valueNode || levelNode) && (
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-2xl">{valueNode}</span>
            {levelNode}
          </div>
        )}
        <div className="relative" style={{ height: h }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: gradient }}
          />
          <div
            data-gauge-marker=""
            className="absolute top-1/2 rounded-full border-2 border-background bg-foreground shadow-sm"
            style={{
              width: h + 6,
              height: h + 6,
              transform: "translateY(-50%)",
            }}
          />
        </div>
        {showRange && (
          <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{formatValue(min)}</span>
            <span>{formatValue(safeMax)}</span>
          </div>
        )}
      </div>
    )
  }

  const stroke = thickness ?? 20
  const r = 100 - stroke / 2
  const arc = `M ${100 - r} 100 A ${r} ${r} 0 0 1 ${100 + r} 100`
  // The gradient runs left to right, but a value's x on the half-circle is
  // (1 - cos(PI * t)) / 2 of the width, so each stop is moved to where its
  // threshold actually sits on the arc.
  const arcStops = sorted.map((t) => {
    const share = Math.max(0, Math.min(1, (t.from - min) / (safeMax - min)))
    return { offset: (1 - Math.cos(Math.PI * share)) / 2, color: t.color }
  })
  const arcStroke =
    arcStops.length > 1
      ? `url(#${gradientId})`
      : (level?.color ?? "var(--primary)")

  return (
    <div
      {...meter}
      {...props}
      data-gauge=""
      className={cn("@container w-full max-w-[240px]", className)}
      style={vars}
    >
      {styleTag}
      <div className="relative">
        <svg
          viewBox={`0 0 200 ${100 + stroke / 2}`}
          className="block w-full overflow-visible"
          aria-hidden="true"
        >
          {arcStops.length > 1 && (
            <defs>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1={100 - r}
                y1={0}
                x2={100 + r}
                y2={0}
              >
                {arcStops.map((s) => (
                  <stop
                    key={`${s.offset}-${s.color}`}
                    offset={s.offset}
                    style={{ stopColor: s.color }}
                  />
                ))}
              </linearGradient>
            </defs>
          )}
          <path
            d={arc}
            fill="none"
            stroke="color-mix(in oklch, var(--muted-foreground) 18%, transparent)"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d={arc}
            fill="none"
            data-gauge-arc=""
            stroke={arcStroke}
            strokeWidth={stroke}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100 200"
            opacity={filled > 0 ? 1 : 0}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1">
          {valueNode && (
            <span className="text-[clamp(1rem,17cqw,2.5rem)]">{valueNode}</span>
          )}
          {levelNode}
        </div>
      </div>
      {showRange && (
        <div
          className="mt-1 flex justify-between text-xs text-muted-foreground tabular-nums"
          style={{ paddingInline: `${(stroke / 200) * 50}%` }}
        >
          <span>{formatValue(min)}</span>
          <span>{formatValue(safeMax)}</span>
        </div>
      )}
    </div>
  )
}
