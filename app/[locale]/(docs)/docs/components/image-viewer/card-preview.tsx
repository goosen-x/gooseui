import { Minus, Plus, RotateCw } from "lucide-react"

export default function CardPreview() {
  return (
    <div className="relative h-[120px] w-[200px] overflow-hidden rounded-lg border bg-muted/40">
      <img
        src="/demo/image-viewer/city-aerial.webp"
        alt=""
        draggable={false}
        className="absolute top-1/2 left-1/2 w-[360px] max-w-none -translate-x-[40%] -translate-y-[60%]"
      />
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border bg-background/90 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-muted-foreground shadow-sm">
        <Minus className="size-3" />
        <span>180%</span>
        <Plus className="size-3" />
        <span className="mx-0.5 h-3 w-px bg-border" />
        <RotateCw className="size-3" />
      </div>
    </div>
  )
}
