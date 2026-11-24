import { ChevronDown, Plus, X } from "lucide-react"

const options = ["performance", "permissions"]

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center p-3">
      <div className="w-[200px]">
        <div className="relative flex min-h-8 flex-wrap items-center gap-1 rounded-md border bg-background py-1 pr-6 pl-1 text-[11px] shadow-xs ring-[3px] ring-ring/30">
          <span className="inline-flex items-center gap-0.5 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium">
            bug
            <X className="size-2.5 opacity-60" />
          </span>
          <span className="ml-0.5">per</span>
          <span className="-ml-0.5 h-3.5 w-px bg-foreground" />
          <ChevronDown className="absolute right-1.5 size-3 rotate-180 opacity-50" />
        </div>
        <div className="mt-1 rounded-md border bg-popover p-1 shadow-md">
          {options.map((option, index) => (
            <div
              key={option}
              className={
                index === 0
                  ? "rounded-sm bg-accent px-2 py-1 text-[11px] text-accent-foreground"
                  : "px-2 py-1 text-[11px]"
              }
            >
              <mark className="rounded-sm bg-primary/20 font-medium text-inherit">
                per
              </mark>
              {option.slice(3)}
            </div>
          ))}
          <div className="flex items-center gap-1 px-2 py-1 text-[11px] text-muted-foreground">
            <Plus className="size-3" />
            Add “per”
          </div>
        </div>
      </div>
    </div>
  )
}
