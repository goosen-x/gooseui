import {
  type ActivityDay,
  ActivityHeatmap,
} from "@/registry/gooseui/ui/activity-heatmap"

const data: ActivityDay[] = Array.from({ length: 84 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 7, 31) + i * 86_400_000)
  return {
    date: d.toISOString().slice(0, 10),
    count: (i * 7 + (i % 5) * 3) % 11,
  }
})

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ActivityHeatmap
        data={data}
        from="2026-08-31"
        to="2026-11-22"
        cellSize={11}
        gap={3}
        showWeekdays={false}
        showLegend={false}
        className="w-auto"
      />
    </div>
  )
}
