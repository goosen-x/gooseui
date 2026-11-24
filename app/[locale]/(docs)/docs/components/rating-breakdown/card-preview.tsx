import { RatingBreakdown } from "@/registry/gooseui/ui/rating-breakdown"

export default function CardPreview() {
  return (
    <div className="flex h-full items-center justify-center overflow-hidden">
      <RatingBreakdown
        animate={false}
        counts={[2, 3, 8, 21, 46]}
        className="w-[340px] shrink-0 origin-center scale-[0.62] flex-row items-center gap-4"
      />
    </div>
  )
}
