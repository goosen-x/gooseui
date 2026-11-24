import { SilhouetteReveal } from "@/registry/gooseui/ui/silhouette-reveal"

export default function CardPreview() {
  return (
    <div className="flex items-center gap-5">
      <SilhouetteReveal
        src="/demo/silhouette-reveal/owl.svg"
        alt="Owl"
        trigger="manual"
        className="size-24"
      />
      <SilhouetteReveal
        src="/demo/silhouette-reveal/fox.svg"
        alt="Fox"
        trigger="manual"
        revealed
        className="size-24"
      />
    </div>
  )
}
