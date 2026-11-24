import { Skeleton, SkeletonGroup } from "@/registry/gooseui/ui/skeleton"

export default function CardPreview() {
  return (
    <SkeletonGroup variant="shimmer" className="flex w-48 items-center gap-3">
      <Skeleton shape="circle" className="size-10" />
      <div className="flex-1 space-y-2">
        <Skeleton shape="text" className="w-full" />
        <Skeleton shape="text" className="h-3 w-2/3" />
      </div>
    </SkeletonGroup>
  )
}
