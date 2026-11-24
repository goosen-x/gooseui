import { RadarChart } from "@/registry/gooseui/ui/radar-chart"

const axes = ["a", "b", "c", "d", "e"].map((key) => ({ key, label: "" }))

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <RadarChart
        showLegend={false}
        className="w-[136px]"
        plotClassName="p-1"
        axes={axes}
        max={10}
        duration={500}
        series={[
          { name: "A", values: { a: 8, b: 5, c: 7, d: 4, e: 6 } },
          { name: "B", values: { a: 5, b: 8, c: 4, d: 7, e: 8 } },
        ]}
      />
    </div>
  )
}
