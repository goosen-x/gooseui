"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { useNow } from "@/registry/gooseui/hooks/use-now"

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 86_400_000],
  ["month", 30 * 86_400_000],
  ["week", 7 * 86_400_000],
  ["day", 86_400_000],
  ["hour", 3_600_000],
  ["minute", 60_000],
  ["second", 1000],
]

/** Picks the largest unit that fits and formats the difference. */
export function formatRelativeTime(
  date: Date,
  now: number,
  formatter: Intl.RelativeTimeFormat,
): string {
  const diff = date.getTime() - now
  const abs = Math.abs(diff)
  if (abs < 45_000) return formatter.format(0, "second")
  for (const [unit, ms] of UNITS) {
    if (abs >= ms || unit === "second") {
      return formatter.format(Math.round(diff / ms), unit)
    }
  }
  return formatter.format(0, "second")
}

export type RelativeTimeProps = Omit<
  React.ComponentProps<"time">,
  "dateTime" | "children"
> & {
  date: Date | string | number
  /** BCP 47 locale for Intl, e.g. "en" or "de". */
  locale?: string
  /** After this many ms in the past the value is marked as stale. */
  staleAfter?: number
  /** How often to refresh, in ms. */
  updateInterval?: number
  numeric?: Intl.RelativeTimeFormatNumeric
  formatStyle?: Intl.RelativeTimeFormatStyle
  /** Format of the absolute time in the tooltip. */
  titleFormat?: Intl.DateTimeFormatOptions
  staleClassName?: string
}

const DEFAULT_TITLE_FORMAT: Intl.DateTimeFormatOptions = {
  dateStyle: "medium",
  timeStyle: "short",
}

export function RelativeTime({
  date,
  locale = "en",
  staleAfter,
  updateInterval = 15_000,
  numeric = "auto",
  formatStyle = "long",
  titleFormat = DEFAULT_TITLE_FORMAT,
  staleClassName = "text-destructive",
  className,
  title,
  ...props
}: RelativeTimeProps) {
  const now = useNow(updateInterval)
  const value = date instanceof Date ? date : new Date(date)
  const valid = !Number.isNaN(value.getTime())

  if (!valid) {
    return <time className={className} {...props} />
  }

  const iso = value.toISOString()
  // Before hydration there is no "now": show a UTC date so server and client agree.
  if (now === null) {
    return (
      <time dateTime={iso} className={className} {...props}>
        {new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
          timeZone: "UTC",
        }).format(value)}
      </time>
    )
  }

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric,
    style: formatStyle,
  })
  const stale = staleAfter !== undefined && now - value.getTime() > staleAfter

  return (
    <time
      dateTime={iso}
      title={
        title ?? new Intl.DateTimeFormat(locale, titleFormat).format(value)
      }
      data-stale={stale ? "" : undefined}
      className={cn("tabular-nums", className, stale && staleClassName)}
      {...props}
    >
      {formatRelativeTime(value, now, formatter)}
    </time>
  )
}
