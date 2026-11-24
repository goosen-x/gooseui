import { CornerBadge } from "@/registry/gooseui/ui/corner-badge"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-36 w-60 rounded-3xl bg-muted p-4 pl-[104px]">
        <CornerBadge
          variant="photo"
          corner="tl"
          size={88}
          gap={5}
          notch={14}
          src="/demo/corner-badge/teacher-2.webp"
          alt=""
        />
        <div className="mt-2 h-2.5 w-20 rounded-full bg-muted-foreground/40" />
        <div className="mt-2 h-2 w-16 rounded-full bg-muted-foreground/25" />
        <div className="mt-10 h-2 w-40 rounded-full bg-background/60 -ml-[88px]" />
        <div className="mt-2 h-2 w-32 rounded-full bg-background/60 -ml-[88px]" />
      </div>
    </div>
  )
}
