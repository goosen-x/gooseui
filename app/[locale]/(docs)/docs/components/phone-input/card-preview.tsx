export default function CardPreview() {
  return (
    <div className="flex w-[210px] flex-col gap-1.5">
      <span className="text-[10px] font-medium">Phone</span>
      <div className="flex h-8 items-stretch rounded-md border border-ring bg-background text-[11px] shadow-xs ring-[3px] ring-ring/30">
        <span className="flex items-center gap-1 border-r pr-1.5 pl-2">
          <span aria-hidden>🇬🇧</span>
          <span className="text-muted-foreground tabular-nums">+44</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-3 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
        <span className="flex items-center px-2 tabular-nums">
          2079 46
          <span className="ml-px h-3.5 w-px animate-pulse bg-foreground motion-reduce:animate-none" />
        </span>
      </div>
      <span className="font-mono text-[9px] text-muted-foreground">
        +44207946 · incomplete
      </span>
    </div>
  )
}
