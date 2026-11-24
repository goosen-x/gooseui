import { PaintRollerLoader } from "@/registry/gooseui/ui/paint-roller-loader"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PaintRollerLoader size={150} />
    </div>
  )
}
