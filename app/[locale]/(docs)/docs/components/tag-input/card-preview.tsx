import { X } from "lucide-react"

const tags = ["React", "TypeScript", "Figma"]

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center p-3">
      <div className="w-[210px] space-y-1">
        <div className="flex flex-wrap items-center gap-1 rounded-md border border-ring bg-background px-1.5 py-1.5 ring-[3px] ring-ring/20">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground"
            >
              {tag}
              <X className="size-2.5 opacity-70" />
            </span>
          ))}
          <span className="flex items-center text-[10px] text-muted-foreground">
            Rea
            <span className="ml-px h-3 w-px bg-foreground" />
          </span>
        </div>
        <div className="rounded-md border bg-popover p-0.5 text-[10px] shadow-sm">
          <div className="rounded-sm bg-accent px-1.5 py-1 text-accent-foreground">
            React Native
          </div>
          <div className="px-1.5 py-1">Reanimated</div>
        </div>
      </div>
    </div>
  )
}
