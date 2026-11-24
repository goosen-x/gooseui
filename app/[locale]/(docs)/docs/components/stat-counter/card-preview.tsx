import { StatCounter } from "@/registry/gooseui/ui/stat-counter"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 px-3 text-center">
      <div>
        <StatCounter
          value={12480}
          suffix="+"
          className="text-2xl font-bold text-primary"
        />
        <div className="text-[11px] text-muted-foreground">users</div>
      </div>
      <div>
        <StatCounter
          value={99.9}
          decimals={1}
          suffix="%"
          className="text-2xl font-bold"
        />
        <div className="text-[11px] text-muted-foreground">uptime</div>
      </div>
    </div>
  )
}
