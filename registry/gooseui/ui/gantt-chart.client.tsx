"use client"

import * as React from "react"

const pad = (n: number) => String(n).padStart(2, "0")

export type GanttNowProps = {
  from: number
  to: number
  /** Range start in ms when the range is given in Dates */
  startMs: number | null
  timeZone?: string
  locale: string
  /** Height of the scale header, px */
  head: number
}

/** The live "now" line: the only part of GanttChart that needs the clock */
export function GanttNow({
  from,
  to,
  startMs,
  timeZone,
  locale,
  head,
}: GanttNowProps) {
  const [now, setNow] = React.useState<number | null>(null)

  React.useEffect(() => {
    const zone = timeZone
      ? new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hourCycle: "h23",
          timeZone,
        })
      : null
    const tick = () => {
      const d = new Date()
      if (startMs !== null) return setNow((d.getTime() - startMs) / 60_000)
      if (zone) {
        const p = Object.fromEntries(
          zone.formatToParts(d).map((x) => [x.type, Number(x.value)]),
        )
        return setNow(p.hour * 60 + p.minute + p.second / 60)
      }
      setNow(d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60)
    }
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [startMs, timeZone])

  if (now === null || now < from || now > to) return null

  const ratio = (now - from) / Math.max(1, to - from)
  const label =
    startMs !== null
      ? new Intl.DateTimeFormat(locale, {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
          timeZone,
        }).format(new Date(startMs + now * 60_000))
      : `${pad(Math.floor(now / 60) % 24)}:${pad(Math.floor(now % 60))}`

  return <GanttNowMarker ratio={ratio} label={label} head={head} />
}

export function GanttNowMarker({
  ratio,
  label,
  head,
}: {
  ratio: number
  label: string
  head: number
}) {
  const left = `${ratio * 100}%`
  return (
    <>
      <span
        className="absolute bottom-0 z-10 w-px bg-foreground"
        style={{ left, top: head }}
      />
      <span
        className={
          ratio < 0.04
            ? "absolute top-1 z-10 rounded-full bg-foreground px-1.5 text-[11px] font-medium text-background tabular-nums"
            : ratio > 0.96
              ? "absolute top-1 z-10 -translate-x-full rounded-full bg-foreground px-1.5 text-[11px] font-medium text-background tabular-nums"
              : "absolute top-1 z-10 -translate-x-1/2 rounded-full bg-foreground px-1.5 text-[11px] font-medium text-background tabular-nums"
        }
        style={{ left }}
      >
        {label}
      </span>
    </>
  )
}
