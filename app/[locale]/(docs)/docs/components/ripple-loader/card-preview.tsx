import { RippleLoader } from "@/registry/gooseui/ui/ripple-loader"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-6">
      <RippleLoader size={72} gap={4} />
      <RippleLoader
        size={48}
        grid={4}
        origin="top-left"
        shape="circle"
        className="text-muted-foreground"
      />
    </div>
  )
}
