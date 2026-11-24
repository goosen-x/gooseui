import { Gauge } from "@/registry/gooseui/ui/gauge"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-5 px-4">
      <Gauge value={72} thickness={12} className="w-[110px]" label="Score" />
      <div className="w-[80px]">
        <Gauge
          value={38}
          variant="bar"
          thickness={6}
          showLevel={false}
          label="Load"
        />
      </div>
    </div>
  )
}
