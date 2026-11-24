export default function CardPreview() {
  return (
    <div className="relative flex h-full w-full items-end justify-center p-3">
      <div aria-hidden className="absolute inset-x-6 top-5 space-y-2">
        <div className="h-2 w-1/2 rounded bg-muted" />
        <div className="h-2 w-3/4 rounded bg-muted/70" />
      </div>
      <div className="relative flex w-full max-w-[210px] items-center gap-2 rounded-lg border bg-card p-2.5 shadow-md">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-3.5"
          >
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold leading-tight">
            We use cookies
          </p>
          <div className="mt-1.5 flex gap-1.5">
            <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
              Accept
            </span>
            <span className="rounded border bg-background px-2 py-0.5 text-[10px] font-medium">
              Decline
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
