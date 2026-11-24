import type * as React from "react"
import { cn } from "@/lib/utils"
import { ActivityHeatmapGrid } from "./activity-heatmap.client"

export type ActivityDay = { date: string; count: number }

export type ActivityHeatmapLabels = {
  less?: string
  more?: string
  /** Text for the tooltip and the cell's accessible name */
  cell?: (count: number, date: string) => string
  /** Accessible name of the grid */
  grid?: string
}

export type ActivityHeatmapProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  data: ActivityDay[]
  /** First day, "YYYY-MM-DD". Defaults to 52 weeks before `to` */
  from?: string
  /** Last day, "YYYY-MM-DD". Defaults to the latest date in data, or today */
  to?: string
  /** 0 = Sunday, 1 = Monday, … */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** BCP 47 locale for month, weekday and date labels */
  locale?: string
  /** Maps a count to a level 0–4. Defaults to quarters of the max */
  getLevel?: (count: number, max: number) => 0 | 1 | 2 | 3 | 4
  cellSize?: number
  gap?: number
  showWeekdays?: boolean
  showMonths?: boolean
  showLegend?: boolean
  labels?: ActivityHeatmapLabels
  /** Works when the heatmap is rendered from a client component */
  onCellClick?: (day: ActivityDay) => void
}

const css = `[data-gooseui-heatmap] [data-day]:is(:hover,:focus-visible) [data-tip]{visibility:visible;opacity:1}`

const DAY = 86_400_000
const LEVEL_BG = [
  "var(--muted)",
  "color-mix(in oklch, var(--primary) 30%, var(--background))",
  "color-mix(in oklch, var(--primary) 55%, var(--background))",
  "color-mix(in oklch, var(--primary) 80%, var(--background))",
  "var(--primary)",
]

function parseDay(s: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (!m) return null
  return Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3]) / DAY)
}

function toKey(day: number) {
  return new Date(day * DAY).toISOString().slice(0, 10)
}

// 1970-01-01 was a Thursday
const weekday = (day: number) => (((day + 4) % 7) + 7) % 7

function defaultLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0 || max <= 0) return 0
  return Math.min(4, Math.max(1, Math.ceil((count / max) * 4))) as 1 | 2 | 3 | 4
}

export function ActivityHeatmap({
  data,
  from,
  to,
  weekStartsOn = 0,
  locale = "en-US",
  getLevel = defaultLevel,
  cellSize = 12,
  gap = 3,
  showWeekdays = true,
  showMonths = true,
  showLegend = true,
  labels,
  onCellClick,
  className,
  ...props
}: ActivityHeatmapProps) {
  const counts = new Map<number, number>()
  for (const d of data) {
    const day = parseDay(d.date)
    if (day !== null) counts.set(day, (counts.get(day) ?? 0) + d.count)
  }

  let end = to ? parseDay(to) : null
  if (end === null && counts.size) end = Math.max(...counts.keys())
  if (end === null) {
    // Rendered on the server, so "today" is the render date
    const d = new Date()
    end = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY)
  }
  let start = from ? parseDay(from) : null
  if (start === null || start > end) start = end - 364
  const gridStart = start - ((weekday(start) - weekStartsOn + 7) % 7)
  const weeks = Math.ceil((end - gridStart + 1) / 7)

  let max = 0
  for (const [day, c] of counts)
    if (day >= start && day <= end) max = Math.max(max, c)

  const fmtMonth = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
  })
  const fmtWeekday = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    timeZone: "UTC",
  })
  const fmtDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  })

  const cellText =
    labels?.cell ??
    ((count: number, date: string) =>
      `${count === 0 ? "No" : count} ${count === 1 ? "activity" : "activities"} on ${date}`)

  const step = cellSize + gap

  // A month is labelled on the first column whose last day falls into it
  const months: { col: number; text: string }[] = []
  let prevMonth = -1
  for (let c = 0; c < weeks; c++) {
    const last = Math.min(end, gridStart + c * 7 + 6)
    const date = new Date(last * DAY)
    if (date.getUTCMonth() !== prevMonth) {
      months.push({ col: c, text: fmtMonth.format(date) })
      prevMonth = date.getUTCMonth()
    }
  }
  if (months.length > 1 && months[1].col - months[0].col < 3) months.shift()

  const weekdayLabel = (r: number) =>
    fmtWeekday.format(new Date((3 + weekStartsOn + r) * DAY))
  const labelCol = showWeekdays ? 32 : 0

  return (
    <div
      data-gooseui-heatmap=""
      className={cn("relative w-full", className)}
      {...props}
    >
      <style href="gooseui-activity-heatmap" precedence="default">
        {css}
      </style>
      <div className="overflow-x-auto pb-1">
        <div
          className="relative w-max"
          style={{ paddingLeft: labelCol, paddingTop: showMonths ? 18 : 0 }}
        >
          {showMonths && (
            <div
              aria-hidden="true"
              className="absolute top-0 h-4 text-[11px] text-muted-foreground"
              style={{ left: labelCol }}
            >
              {months.map((m) => (
                <span
                  key={m.col}
                  className="absolute whitespace-nowrap"
                  style={{ left: m.col * step }}
                >
                  {m.text}
                </span>
              ))}
            </div>
          )}
          <ActivityHeatmapGrid
            start={start}
            end={end}
            gridStart={gridStart}
            weeks={weeks}
            onCellClick={onCellClick}
            aria-label={labels?.grid ?? "Activity"}
            className="flex flex-col"
            style={{ gap }}
          >
            {Array.from({ length: 7 }, (_, r) => (
              <div
                key={r}
                role="row"
                className="relative flex"
                style={{ gap, height: cellSize }}
              >
                {showWeekdays && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -translate-y-1/2 text-[10px] leading-none text-muted-foreground"
                    style={{ left: -labelCol }}
                  >
                    {r % 2 === 1 ? weekdayLabel(r) : ""}
                  </span>
                )}
                {Array.from({ length: weeks }, (_, c) => {
                  const day = gridStart + c * 7 + r
                  if (day < start || day > end) {
                    return (
                      <span
                        key={c}
                        role="gridcell"
                        aria-hidden="true"
                        className="shrink-0"
                        style={{ width: cellSize, height: cellSize }}
                      />
                    )
                  }
                  const count = counts.get(day) ?? 0
                  const level = getLevel(count, max)
                  const text = cellText(
                    count,
                    fmtDate.format(new Date(day * DAY)),
                  )
                  return (
                    <span
                      key={c}
                      role="gridcell"
                      tabIndex={day === end ? 0 : -1}
                      aria-label={text}
                      data-day={day}
                      data-date={toKey(day)}
                      data-count={count}
                      data-level={level}
                      className={cn(
                        "relative shrink-0 rounded-[3px] outline-none ring-offset-1 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring",
                        onCellClick && "cursor-pointer",
                        level === 0 && "ring-1 ring-inset ring-border/60",
                      )}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        background: LEVEL_BG[level],
                      }}
                    >
                      <span
                        data-tip=""
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none invisible absolute z-10 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity duration-100",
                          // The scroll box clips overflow, so top rows show the tip below
                          r < 2
                            ? "top-[calc(100%+6px)]"
                            : "bottom-[calc(100%+6px)]",
                          c < 8
                            ? "left-0"
                            : c > weeks - 9
                              ? "right-0"
                              : "left-1/2 -translate-x-1/2",
                        )}
                      >
                        {text}
                      </span>
                    </span>
                  )
                })}
              </div>
            ))}
          </ActivityHeatmapGrid>
        </div>
      </div>

      {showLegend && (
        <div
          aria-hidden="true"
          className="mt-2 flex items-center justify-end gap-1 text-[11px] text-muted-foreground"
        >
          <span className="mr-1">{labels?.less ?? "Less"}</span>
          {LEVEL_BG.map((bg, i) => (
            <span
              key={bg}
              className={cn(
                "rounded-[3px]",
                i === 0 && "ring-1 ring-inset ring-border/60",
              )}
              style={{ width: cellSize, height: cellSize, background: bg }}
            />
          ))}
          <span className="ml-1">{labels?.more ?? "More"}</span>
        </div>
      )}
    </div>
  )
}
