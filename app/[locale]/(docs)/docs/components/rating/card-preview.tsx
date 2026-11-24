import { Rating } from "@/registry/gooseui/ui/rating"

export default function CardPreview() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <Rating defaultValue={4} size="lg" />
      <Rating readOnly value={3.5} shape="sparkle" size="sm" />
    </div>
  )
}
