"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { ActivityHeatmap } from "@/registry/gooseui/ui/activity-heatmap"
import { content, QUARTER } from "./activity-heatmap-demo"

function useT() {
  return content[useLocale() as Locale]
}

export function ActivityHeatmapMondayDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-md space-y-3 px-4">
      <p className="text-sm font-medium">{t.workouts}</p>
      <ActivityHeatmap
        data={QUARTER}
        from="2026-06-01"
        to="2026-08-31"
        weekStartsOn={1}
        cellSize={16}
        gap={4}
        locale={t.dateLocale}
        labels={{
          less: t.less,
          more: t.more,
          grid: t.workouts,
          cell: t.workoutCell,
        }}
        onCellClick={(day) => customToast.info(t.clicked(day.date, day.count))}
      />
    </div>
  )
}
