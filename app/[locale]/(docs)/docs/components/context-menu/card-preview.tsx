import {
  ChevronRight,
  Copy,
  FileText,
  MousePointer2,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react"

const items = [
  { icon: SquareArrowOutUpRight, label: "Open", hint: "⌘O" },
  { icon: Copy, label: "Duplicate", hint: "⌘D", active: true },
  { icon: null, label: "Share", hint: null, sub: true },
]

export default function CardPreview() {
  return (
    <div className="relative flex size-full items-center justify-center p-3">
      <div className="relative h-[120px] w-[220px]">
        <div className="absolute top-2 left-0 flex w-20 flex-col gap-2 rounded-md border bg-card p-2">
          <FileText className="size-5 text-muted-foreground" />
          <div className="h-1.5 w-full rounded-full bg-muted-foreground/30" />
          <div className="h-1.5 w-2/3 rounded-full bg-muted-foreground/20" />
        </div>
        <MousePointer2 className="absolute top-9 left-14 size-3.5 fill-foreground text-foreground" />
        <div className="absolute top-11 left-[66px] w-[136px] rounded-md border bg-popover p-1 text-[10px] text-popover-foreground shadow-md">
          {items.map((item) => (
            <div
              key={item.label}
              className={
                item.active
                  ? "flex items-center gap-1.5 rounded-sm bg-accent px-1.5 py-1 text-accent-foreground"
                  : "flex items-center gap-1.5 px-1.5 py-1"
              }
            >
              {item.icon ? (
                <item.icon className="size-3 text-muted-foreground" />
              ) : (
                <span className="size-3" />
              )}
              {item.label}
              {item.hint && (
                <span className="ml-auto text-muted-foreground">
                  {item.hint}
                </span>
              )}
              {item.sub && (
                <ChevronRight className="ml-auto size-3 text-muted-foreground" />
              )}
            </div>
          ))}
          <div className="-mx-1 my-1 h-px bg-border" />
          <div className="flex items-center gap-1.5 px-1.5 py-1 text-destructive">
            <Trash2 className="size-3" />
            Delete
          </div>
        </div>
      </div>
    </div>
  )
}
