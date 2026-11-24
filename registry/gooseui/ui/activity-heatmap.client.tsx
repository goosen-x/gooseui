"use client"

import type * as React from "react"

export type ActivityHeatmapGridProps = React.ComponentProps<"div"> & {
  /** Day numbers (days since 1970-01-01) of the range and the grid */
  start: number
  end: number
  gridStart: number
  weeks: number
  onCellClick?: (day: { date: string; count: number }) => void
}

/** Roving tabindex and clicks for the server-rendered heatmap grid */
export function ActivityHeatmapGrid({
  start,
  end,
  gridStart,
  weeks,
  onCellClick,
  ...props
}: ActivityHeatmapGridProps) {
  const cellOf = (e: React.SyntheticEvent) =>
    (e.target as HTMLElement).closest<HTMLElement>("[data-day]")

  const pick = (cell: HTMLElement) =>
    onCellClick?.({
      date: cell.dataset.date ?? "",
      count: Number(cell.dataset.count ?? 0),
    })

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const cell = cellOf(e)
    if (!cell) return
    const day = Number(cell.dataset.day)
    // A row is one weekday, so Home and End go to its first and last week
    const row = (day - gridStart) % 7
    const first = gridStart + row
    const last = gridStart + (weeks - 1) * 7 + row
    const keys: Record<string, number> = {
      ArrowRight: day + 7,
      ArrowLeft: day - 7,
      ArrowDown: day + 1,
      ArrowUp: day - 1,
      Home: first < start ? first + 7 : first,
      End: last > end ? last - 7 : last,
      PageUp: start,
      PageDown: end,
    }
    if (e.key in keys) {
      e.preventDefault()
      const next = e.currentTarget.querySelector<HTMLElement>(
        `[data-day="${Math.min(end, Math.max(start, keys[e.key]))}"]`,
      )
      if (!next) return
      cell.tabIndex = -1
      next.tabIndex = 0
      next.focus()
      next.scrollIntoView({ block: "nearest", inline: "nearest" })
    } else if ((e.key === "Enter" || e.key === " ") && onCellClick) {
      e.preventDefault()
      pick(cell)
    } else if (e.key === "Escape") {
      cell.blur()
    }
  }

  return (
    <div
      role="grid"
      onKeyDown={onKeyDown}
      onFocus={(e) => {
        // Focus moved by mouse: keep the single tab stop on that day
        const cell = cellOf(e)
        if (!cell || cell.tabIndex === 0) return
        for (const el of e.currentTarget.querySelectorAll<HTMLElement>(
          '[data-day][tabindex="0"]',
        ))
          el.tabIndex = -1
        cell.tabIndex = 0
      }}
      onClick={
        onCellClick
          ? (e) => {
              const cell = cellOf(e)
              if (cell) pick(cell)
            }
          : undefined
      }
      {...props}
    />
  )
}
