import { MeshGradient } from "@/registry/gooseui/effects/mesh-gradient"

export default function CardPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-background">
      <MeshGradient blur={24} grain={0.2} />
    </div>
  )
}
