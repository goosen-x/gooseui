import { ProgressRing } from "@/registry/gooseui/ui/progress-ring"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-5">
      <ProgressRing value={72} size={84} thickness={8} />
      <ProgressRing
        value={95}
        size={52}
        thickness={6}
        color="var(--destructive)"
      />
    </div>
  )
}
