import { DashedLine } from "@/registry/gooseui/effects/dashed-line"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 px-6">
      <div className="flex w-32 flex-col gap-4">
        <DashedLine animated fade={20} />
        <DashedLine
          animated
          direction="reverse"
          dash={10}
          gap={6}
          thickness={2}
          className="text-primary"
        />
        <DashedLine animated fade={20} />
      </div>
      <div className="h-24">
        <DashedLine orientation="vertical" animated dash={4} gap={4} />
      </div>
    </div>
  )
}
