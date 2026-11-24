import { ArrowUp, Paperclip } from "lucide-react"

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center p-3">
      <div className="w-[210px] rounded-xl border border-ring bg-background shadow-xs ring-[3px] ring-ring/20">
        <div className="flex gap-1.5 px-1.5 pt-1.5">
          <span className="flex items-center gap-1 rounded-md border bg-muted/60 py-0.5 pr-1.5 pl-0.5">
            <span className="size-4 rounded-sm bg-gradient-to-br from-sky-400 to-indigo-500" />
            <span className="text-[9px] font-medium">header.png</span>
          </span>
        </div>
        <p className="px-2.5 pt-1.5 text-[10px] leading-snug">
          Why does the header jump on scroll?
          <span className="ml-px inline-block h-2.5 w-px translate-y-0.5 bg-foreground" />
        </p>
        <div className="flex items-center gap-1 p-1.5">
          <span className="flex size-5 items-center justify-center rounded-full text-muted-foreground">
            <Paperclip className="size-3" />
          </span>
          <span className="ml-auto text-[9px] tabular-nums text-muted-foreground">
            36 / 2000
          </span>
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowUp className="size-3" />
          </span>
        </div>
      </div>
    </div>
  )
}
