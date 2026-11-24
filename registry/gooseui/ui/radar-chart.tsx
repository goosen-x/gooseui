import type * as React from "react"
import { cn } from "@/lib/utils"

export type RadarAxis = { key: string; label: string }

export type RadarSeries = {
  name: string
  /** Values keyed by axis key */
  values: Record<string, number>
  /** Any CSS color; defaults to --chart-1..5 */
  color?: string
}

export type RadarChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  axes: RadarAxis[]
  series: RadarSeries[]
  /** Scale maximum; defaults to the largest value */
  max?: number
  /** Number of grid rings */
  levels?: number
  grid?: "polygon" | "circle"
  showLegend?: boolean
  formatValue?: (value: number) => string
  /** Accessible name and caption of the hidden data table */
  title?: string
  /** Header of the first column of the hidden table */
  axisHeader?: string
  /** Draw-in animation duration, ms */
  duration?: number
  /** Classes for the plot box; its padding is the room for axis labels */
  plotClassName?: string
}

const ACTIVE = "[data-point]:is(:hover,:focus-visible)"

// Legend hover highlights one series; rules for the first eight are enough
const legendRules = Array.from(
  { length: 8 },
  (_, i) =>
    `[data-gooseui-radar]:has([data-legend="${i}"]:hover) [data-series]:not([data-i="${i}"]){opacity:.3}
[data-gooseui-radar]:has([data-legend="${i}"]:hover) [data-i="${i}"]{--radar-fill:.35}`,
).join("\n")

const css = `[data-gooseui-radar] [data-series]{transition:opacity .2s}
[data-gooseui-radar] [data-series] polygon{fill-opacity:var(--radar-fill,.18);transition:fill-opacity .2s}
[data-gooseui-radar]:has(${ACTIVE}) [data-series]:not(:has(${ACTIVE})){opacity:.3}
[data-gooseui-radar] [data-series]:has(${ACTIVE}){--radar-fill:.35;z-index:10}
[data-gooseui-radar] ${ACTIVE} [data-dot]{scale:1.5;background:var(--radar-color)}
[data-gooseui-radar] ${ACTIVE} [data-tip]{visibility:visible;opacity:1}
${legendRules}
@keyframes gooseui-radar-in{from{scale:0;opacity:0}}
@media (prefers-reduced-motion: no-preference){
  [data-gooseui-radar] [data-series]{animation:gooseui-radar-in var(--radar-duration,700ms) cubic-bezier(.2,.8,.2,1) var(--radar-delay,0ms) backwards}
  @supports (animation-timeline: view()){
    [data-gooseui-radar] [data-series]{animation-duration:auto;animation-delay:0s;animation-timeline:view();animation-range:entry 10% cover 40%}
  }
}`

const SIZE = 200
const C = SIZE / 2
const R = 88

const fallbackColor = (i: number) => `var(--chart-${(i % 5) + 1})`

function point(i: number, n: number, ratio: number) {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
  return { x: C + Math.cos(a) * R * ratio, y: C + Math.sin(a) * R * ratio, a }
}

const toPct = (v: number) => `${(v / SIZE) * 100}%`

export function RadarChart({
  axes,
  series,
  max,
  levels = 4,
  grid = "polygon",
  showLegend = true,
  formatValue = (v) => String(v),
  title = "Radar chart",
  axisHeader = "Axis",
  duration = 700,
  plotClassName,
  className,
  style,
  ...props
}: RadarChartProps) {
  const n = axes.length
  let top = max && max > 0 ? max : 0
  if (!top) {
    for (const s of series)
      for (const a of axes) top = Math.max(top, s.values[a.key] ?? 0)
    if (top <= 0) top = 1
  }
  const ratioOf = (v: number) => Math.max(0, Math.min(1, v / top))
  const rings = Array.from(
    { length: Math.max(1, levels) },
    (_, i) => (i + 1) / Math.max(1, levels),
  )

  return (
    <div
      data-gooseui-radar=""
      className={cn("flex w-full flex-col items-center gap-4", className)}
      style={{ ...style, ["--radar-duration" as string]: `${duration}ms` }}
      {...props}
    >
      <style href="gooseui-radar-chart" precedence="default">
        {css}
      </style>

      {/* Padding leaves room for axis labels outside the plot */}
      <div className={cn("w-full max-w-[420px] px-14 py-8", plotClassName)}>
        <div className="relative aspect-square w-full">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 size-full overflow-visible text-border"
            aria-hidden="true"
          >
            {rings.map((r) =>
              grid === "circle" ? (
                <circle
                  key={r}
                  cx={C}
                  cy={C}
                  r={R * r}
                  fill="none"
                  stroke="currentColor"
                />
              ) : (
                <polygon
                  key={r}
                  points={axes
                    .map((_, i) => {
                      const p = point(i, n, r)
                      return `${p.x},${p.y}`
                    })
                    .join(" ")}
                  fill="none"
                  stroke="currentColor"
                />
              ),
            )}
            {axes.map((ax, i) => {
              const p = point(i, n, 1)
              return (
                <line
                  key={ax.key}
                  x1={C}
                  y1={C}
                  x2={p.x}
                  y2={p.y}
                  stroke="currentColor"
                />
              )
            })}
          </svg>

          {axes.map((ax, i) => {
            const p = point(i, n, 1.1)
            const cos = Math.cos(p.a)
            const sin = Math.sin(p.a)
            const tx = Math.abs(cos) < 0.2 ? "-50%" : cos > 0 ? "0%" : "-100%"
            const ty = Math.abs(sin) < 0.2 ? "-50%" : sin > 0 ? "0%" : "-100%"
            const align =
              Math.abs(cos) < 0.2
                ? "text-center"
                : cos > 0
                  ? "text-left"
                  : "text-right"
            return (
              <span
                key={ax.key}
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute w-max max-w-[7rem] text-xs leading-tight text-muted-foreground",
                  align,
                )}
                style={{
                  left: toPct(p.x),
                  top: toPct(p.y),
                  transform: `translate(${tx}, ${ty})`,
                }}
              >
                {ax.label}
              </span>
            )
          })}

          {series.map((s, si) => {
            const color = s.color ?? fallbackColor(si)
            const pts = axes.map((ax, i) =>
              point(i, n, ratioOf(s.values[ax.key] ?? 0)),
            )
            return (
              <div
                key={s.name}
                data-series=""
                data-i={si}
                className="pointer-events-none absolute inset-0"
                style={
                  {
                    "--radar-color": color,
                    "--radar-delay": `${si * 120}ms`,
                  } as React.CSSProperties
                }
              >
                <svg
                  viewBox={`0 0 ${SIZE} ${SIZE}`}
                  className="absolute inset-0 size-full overflow-visible"
                  aria-hidden="true"
                >
                  <polygon
                    points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill={color}
                    stroke={color}
                    strokeWidth={1.5}
                    strokeLinejoin="round"
                  />
                </svg>
                {pts.map((p, ai) => {
                  const ax = axes[ai]
                  const value = formatValue(s.values[ax.key] ?? 0)
                  return (
                    <span
                      key={ax.key}
                      data-point=""
                      tabIndex={0}
                      role="img"
                      aria-label={`${s.name}, ${ax.label}: ${value}`}
                      className="pointer-events-auto absolute flex size-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      style={{ left: toPct(p.x), top: toPct(p.y) }}
                    >
                      <span
                        data-dot=""
                        className="size-[7px] rounded-full border-[1.5px] bg-background transition-[scale] duration-150"
                        style={{ borderColor: color }}
                      />
                      <span
                        data-tip=""
                        aria-hidden="true"
                        className="pointer-events-none invisible absolute bottom-[calc(100%+4px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity duration-150"
                      >
                        <span className="flex items-center gap-1.5 font-medium">
                          <span
                            className="size-2 rounded-full"
                            style={{ background: color }}
                          />
                          {s.name}
                        </span>
                        <span className="block text-muted-foreground">
                          {ax.label}:{" "}
                          <span className="font-medium text-foreground tabular-nums">
                            {value}
                          </span>
                        </span>
                      </span>
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {showLegend && series.length > 0 && (
        <ul
          className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm"
          aria-hidden="true"
        >
          {series.map((s, si) => (
            <li
              key={s.name}
              data-legend={si}
              className="flex items-center gap-1.5 text-muted-foreground"
            >
              <span
                className="size-2.5 rounded-[3px]"
                style={{ background: s.color ?? fallbackColor(si) }}
              />
              {s.name}
            </li>
          ))}
        </ul>
      )}

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">{axisHeader}</th>
            {series.map((s) => (
              <th key={s.name} scope="col">
                {s.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {axes.map((ax) => (
            <tr key={ax.key}>
              <th scope="row">{ax.label}</th>
              {series.map((s) => (
                <td key={s.name}>{formatValue(s.values[ax.key] ?? 0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
