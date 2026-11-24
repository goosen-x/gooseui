import type * as React from "react"
import { cn } from "@/lib/utils"
import { GanttNow, GanttNowMarker } from "./gantt-chart.client"

/** Minutes from the range start, or an absolute Date */
export type GanttTime = number | Date

export type GanttStatus = "planned" | "running" | "done" | "delayed" | "failed"

export type GanttItem = {
  id: string
  label: string
  group?: string
  planned?: [GanttTime, GanttTime]
  actual?: [GanttTime, GanttTime]
  status?: GanttStatus
}

export type GanttGroup = { id: string; label: string }

export type GanttLabels = {
  name?: string
  planned?: string
  actual?: string
  now?: string
  shaded?: string
  status?: Partial<Record<GanttStatus, string>>
}

export type GanttChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  items: GanttItem[]
  /** Range start: minutes (default 0) or a Date. Date values in items are measured from it */
  start?: GanttTime
  /** Range end: minutes (default 1440, one day) or a Date */
  end?: GanttTime
  /** Optional titles and order for groups; otherwise the `group` string is the title */
  groups?: GanttGroup[]
  /** Group ids collapsed on first render */
  defaultCollapsed?: string[]
  /** Tick step in minutes */
  tickStep?: number
  /** "auto" follows the clock in a small client part; a time pins the line; null hides it */
  now?: GanttTime | "auto" | null
  /** Hatched intervals, e.g. off hours */
  shaded?: [GanttTime, GanttTime][]
  /** BCP 47 locale for time labels */
  locale?: string
  /** IANA time zone for reading Dates and labels. Set it with SSR: without it the server and browser zones may differ */
  timeZone?: string
  rowHeight?: number
  /** Width of the sticky name column, px */
  labelWidth?: number
  /** Minimum width of the time scale before it scrolls, px. Tick labels are thinned for this width */
  minTimelineWidth?: number
  showLegend?: boolean
  labels?: GanttLabels
}

const STATUS_LABEL: Record<GanttStatus, string> = {
  planned: "Planned",
  running: "Running",
  done: "Done",
  delayed: "Delayed",
  failed: "Failed",
}

const STATUS_BADGE: Record<GanttStatus, string> = {
  planned: "border-dashed text-muted-foreground",
  running: "border-primary/50 text-foreground",
  done: "bg-muted text-foreground",
  delayed: "border-destructive/50 text-destructive",
  failed: "border-destructive bg-destructive/10 text-destructive",
}

const HATCH =
  "repeating-linear-gradient(135deg, color-mix(in oklch, var(--foreground) 9%, transparent) 0 1px, transparent 1px 7px)"

type Interval = [number, number]

const pad = (n: number) => String(n).padStart(2, "0")

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function GanttChart({
  items,
  start = 0,
  end = 1440,
  groups,
  defaultCollapsed,
  tickStep = 60,
  now = "auto",
  shaded,
  locale = "en-US",
  timeZone,
  rowHeight = 36,
  labelWidth = 200,
  minTimelineWidth = 640,
  showLegend = true,
  labels,
  className,
  style,
  ...props
}: GanttChartProps) {
  const startMs = start instanceof Date ? start.getTime() : null
  // Time of day in a fixed zone, so the result does not depend on the server zone
  const zoneFmt = timeZone
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h23",
        timeZone,
      })
    : null
  const toMin = (t: GanttTime) => {
    if (typeof t === "number") return t
    if (startMs !== null) return (t.getTime() - startMs) / 60_000
    // Numeric range with a Date value: time of day in timeZone or local time
    if (zoneFmt) {
      const parts = zoneFmt.formatToParts(t)
      const get = (type: Intl.DateTimeFormatPartTypes) =>
        Number(parts.find((p) => p.type === type)?.value ?? 0)
      return get("hour") * 60 + get("minute") + get("second") / 60
    }
    return t.getHours() * 60 + t.getMinutes() + t.getSeconds() / 60
  }
  const from = typeof start === "number" ? start : 0
  const to = toMin(end)
  const span = Math.max(1, to - from)
  const ratio = (m: number) => (Math.max(from, Math.min(to, m)) - from) / span
  const pct = (m: number) => `${ratio(m) * 100}%`
  const width = (a: number, b: number, minPx: number) =>
    `max(${minPx}px, calc(${pct(b)} - ${pct(a)}))`

  const timeFmt = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  })
  const fmt = (m: number) => {
    if (startMs !== null) return timeFmt.format(new Date(startMs + m * 60_000))
    const total = Math.round(m)
    const h = Math.floor(total / 60)
    return `${pad(((h % 24) + 24) % 24)}:${pad(((total % 60) + 60) % 60)}`
  }

  const pinned = now === "auto" || now === null ? null : toMin(now)
  const showPinned = pinned !== null && pinned >= from && pinned <= to

  const iv = (r?: [GanttTime, GanttTime]): Interval | null => {
    if (!r) return null
    const a = toMin(r[0])
    const b = toMin(r[1])
    return a <= b ? [a, b] : [b, a]
  }
  const order: string[] = groups?.map((g) => g.id) ?? []
  const byGroup = new Map<string, GanttItem[]>()
  const loose: GanttItem[] = []
  for (const it of items) {
    if (!it.group) {
      loose.push(it)
      continue
    }
    if (!byGroup.has(it.group)) {
      byGroup.set(it.group, [])
      if (!order.includes(it.group)) order.push(it.group)
    }
    byGroup.get(it.group)?.push(it)
  }

  const ticks: number[] = []
  const stepSafe = Math.max(1, tickStep)
  for (let m = from; m <= to + 1e-6 && ticks.length < 500; m += stepSafe)
    ticks.push(m)
  const lastTick = ticks.length - 1
  // ~56px per "00:00" label at the narrowest scale, so labels never overlap
  const labelEvery = Math.max(
    1,
    Math.ceil((ticks.length * 56) / Math.max(1, minTimelineWidth)),
  )

  const statusText = (s: GanttStatus) => labels?.status?.[s] ?? STATUS_LABEL[s]
  const L = {
    name: labels?.name ?? "Name",
    planned: labels?.planned ?? "Planned",
    actual: labels?.actual ?? "Actual",
    now: labels?.now ?? "Now",
    shaded: labels?.shaded ?? "Off hours",
  }
  const HEAD = 44
  const range = (r: Interval) => `${fmt(r[0])}–${fmt(r[1])}`
  const cols = { gridTemplateColumns: `${labelWidth}px minmax(0, 1fr)` }

  const itemRow = (item: GanttItem, nested: boolean) => {
    const planned = iv(item.planned)
    const actual = iv(item.actual)
    return (
      <div
        key={item.id}
        className="relative grid border-b"
        style={{ ...cols, height: rowHeight }}
      >
        <div
          className={cn(
            "sticky left-0 z-20 flex items-center gap-2 border-r bg-card px-3 text-sm",
            nested && "pl-8",
          )}
        >
          <span className="truncate" title={item.label}>
            {item.label}
          </span>
          {item.status && (
            <span
              className={cn(
                "ml-auto inline-flex h-5 shrink-0 items-center rounded-md border px-1.5 text-[11px] whitespace-nowrap",
                STATUS_BADGE[item.status],
              )}
            >
              {statusText(item.status)}
            </span>
          )}
          <span className="sr-only">
            {[
              planned && `${L.planned} ${range(planned)}`,
              actual && `${L.actual} ${range(actual)}`,
            ]
              .filter(Boolean)
              .join(", ")}
          </span>
        </div>
        <div className="relative" aria-hidden="true">
          {planned && (
            <span
              title={`${L.planned}: ${range(planned)}`}
              className="absolute top-1/2 h-5 -translate-y-1/2 rounded-md border border-dashed border-primary/60 bg-primary/15"
              style={{
                left: pct(planned[0]),
                width: width(planned[0], planned[1], 6),
              }}
            />
          )}
          {actual && (
            <span
              title={`${L.actual}: ${range(actual)}`}
              className={cn(
                "absolute top-1/2 h-2 -translate-y-1/2 rounded-full",
                item.status === "failed" || item.status === "delayed"
                  ? "bg-destructive"
                  : "bg-primary",
                item.status === "running" && "motion-safe:animate-pulse",
              )}
              style={{
                left: pct(actual[0]),
                width: width(actual[0], actual[1], 4),
              }}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full space-y-3", className)} style={style} {...props}>
      {showLegend && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-5 rounded-[4px] border border-dashed border-primary/60 bg-primary/15" />
            {L.planned}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-5 rounded-full bg-primary" />
            {L.actual}
          </span>
          {shaded?.length ? (
            <span className="flex items-center gap-1.5">
              <span
                className="h-3 w-5 rounded-[4px] border"
                style={{ backgroundImage: HATCH }}
              />
              {L.shaded}
            </span>
          ) : null}
          {(now === "auto" || showPinned) && (
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-px bg-foreground" />
              {L.now}
            </span>
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border bg-card">
        <div
          className="relative"
          style={{ minWidth: labelWidth + minTimelineWidth }}
        >
          {/* Grid lines and hatching sit under the rows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0"
            style={{ left: labelWidth, top: HEAD }}
          >
            {shaded?.map(([a, b]) => {
              const x = toMin(a)
              const y = toMin(b)
              return (
                <span
                  key={`${x}-${y}`}
                  className="absolute inset-y-0"
                  style={{
                    left: pct(Math.min(x, y)),
                    width: width(Math.min(x, y), Math.max(x, y), 0),
                    backgroundImage: HATCH,
                  }}
                />
              )
            })}
            {ticks.slice(1, -1).map((m) => (
              <span
                key={m}
                className="absolute inset-y-0 w-px bg-border/60"
                style={{ left: pct(m) }}
              />
            ))}
          </div>

          <div
            className="relative grid border-b"
            style={{ ...cols, height: HEAD }}
          >
            <div className="sticky left-0 z-20 flex items-end border-r bg-card px-3 pb-1.5 text-xs text-muted-foreground">
              {L.name}
            </div>
            <div
              aria-hidden="true"
              className="relative text-[11px] text-muted-foreground tabular-nums"
            >
              {ticks.map((m, i) =>
                i !== lastTick &&
                (i % labelEvery !== 0 || lastTick - i < labelEvery) ? null : (
                  <span
                    key={m}
                    className={cn(
                      "absolute bottom-1.5 whitespace-nowrap",
                      i === 0
                        ? "pl-1.5"
                        : m >= to
                          ? "-translate-x-full pr-1.5"
                          : "-translate-x-1/2",
                    )}
                    style={{ left: pct(m) }}
                  >
                    {fmt(m)}
                  </span>
                ),
              )}
            </div>
          </div>

          {loose.map((item) => itemRow(item, false))}

          {order.map((gid) => {
            const list = byGroup.get(gid)
            if (!list?.length) return null
            const bounds = list
              .flatMap((it) => [iv(it.planned), iv(it.actual)])
              .filter((x): x is Interval => !!x)
            const groupSpan: Interval | null = bounds.length
              ? [
                  Math.min(...bounds.map((b) => b[0])),
                  Math.max(...bounds.map((b) => b[1])),
                ]
              : null
            return (
              <details
                key={gid}
                open={!defaultCollapsed?.includes(gid)}
                className="group/gantt"
              >
                <summary
                  className="group/row relative grid cursor-pointer list-none border-b bg-muted/40 outline-none hover:bg-muted focus-visible:bg-muted [&::-webkit-details-marker]:hidden"
                  style={{ ...cols, height: rowHeight }}
                >
                  <span className="sticky left-0 z-20 flex items-center gap-1.5 border-r bg-[color-mix(in_oklch,var(--muted)_40%,var(--card))] px-3 text-left text-sm font-medium group-hover/row:bg-muted group-focus-visible/row:bg-muted group-focus-visible/row:ring-2 group-focus-visible/row:ring-ring group-focus-visible/row:ring-inset">
                    <ChevronIcon className="size-4 shrink-0 -rotate-90 text-muted-foreground transition-transform group-open/gantt:rotate-0 motion-reduce:transition-none" />
                    <span className="truncate">
                      {groups?.find((g) => g.id === gid)?.label ?? gid}
                    </span>
                    <span className="ml-auto text-xs font-normal text-muted-foreground tabular-nums">
                      {list.length}
                    </span>
                  </span>
                  <span className="relative" aria-hidden="true">
                    {groupSpan && (
                      <span
                        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-muted-foreground/45"
                        style={{
                          left: pct(groupSpan[0]),
                          width: width(groupSpan[0], groupSpan[1], 4),
                        }}
                      />
                    )}
                  </span>
                </summary>
                {list.map((item) => itemRow(item, true))}
              </details>
            )
          })}

          {now !== null && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0"
              style={{ left: labelWidth }}
            >
              {now === "auto" ? (
                <GanttNow
                  from={from}
                  to={to}
                  startMs={startMs}
                  timeZone={timeZone}
                  locale={locale}
                  head={HEAD}
                />
              ) : (
                showPinned && (
                  <GanttNowMarker
                    ratio={ratio(pinned)}
                    label={fmt(pinned)}
                    head={HEAD}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
