import { Copy, Share2, Trash2 } from "lucide-react"
import { Button } from "@/registry/gooseui/ui/button"
import { Hint, type HintSide } from "@/registry/gooseui/ui/hint"

type Labels = { copy: string; remove: string; share: string }

const defaults: Labels = {
  copy: "Copy",
  remove: "Delete",
  share: "Share",
}

export function HintDemo({ labels = defaults }: { labels?: Labels }) {
  return (
    <div className="flex items-center gap-1">
      <Hint content={labels.copy}>
        <Button variant="ghost" size="icon" aria-label={labels.copy}>
          <Copy />
        </Button>
      </Hint>
      <Hint content={labels.remove}>
        <Button variant="ghost" size="icon" aria-label={labels.remove}>
          <Trash2 />
        </Button>
      </Hint>
      <Hint content={labels.share}>
        <Button variant="ghost" size="icon" aria-label={labels.share}>
          <Share2 />
        </Button>
      </Hint>
    </div>
  )
}

export function HintSides({ labels }: { labels: Record<HintSide, string> }) {
  const sides: HintSide[] = ["top", "bottom", "left", "right"]
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sides.map((side) => (
        <Hint key={side} content={labels[side]} side={side}>
          <Button variant="outline" size="sm">
            {side}
          </Button>
        </Hint>
      ))}
    </div>
  )
}

export function HintTruncated({ text }: { text: string }) {
  return (
    <div className="w-56 rounded-md border bg-background p-3 text-sm">
      <Hint content={text} side="bottom">
        <span className="block min-w-0 cursor-default truncate">{text}</span>
      </Hint>
    </div>
  )
}

export function HintCompare({
  hintLabel,
  titleLabel,
  text,
}: {
  hintLabel: string
  titleLabel: string
  text: string
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Hint content={text}>
        <Button variant="outline" size="sm">
          {hintLabel}
        </Button>
      </Hint>
      <Button variant="outline" size="sm" title={text}>
        {titleLabel}
      </Button>
    </div>
  )
}
