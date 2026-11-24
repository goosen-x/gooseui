import { BookOpen, Briefcase, Home, Layers } from "lucide-react"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-start pl-6">
      <div className="space-y-1 rounded-xl border border-border/50 bg-background p-2 shadow-xl">
        <span className="flex p-1.5 text-muted-foreground/50">
          <Home className="size-5" />
        </span>
        <span className="flex p-1.5 text-primary">
          <Layers className="size-5" />
        </span>
        <span className="flex p-1.5 text-muted-foreground/50">
          <Briefcase className="size-5" />
        </span>
        <span className="flex p-1.5 text-muted-foreground/50">
          <BookOpen className="size-5" />
        </span>
      </div>
    </div>
  )
}
