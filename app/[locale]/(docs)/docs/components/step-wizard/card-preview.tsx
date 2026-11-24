export default function CardPreview() {
  return (
    <div className="flex w-[200px] flex-col gap-2 rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 rounded-full bg-primary" />
        </div>
        <span className="font-mono text-[8px] text-muted-foreground tabular-nums">
          02 / 04
        </span>
      </div>
      <span className="text-[11px] font-semibold leading-tight">
        How many people?
      </span>
      <div className="flex gap-1">
        {["Just me", "2–4", "5+"].map((label) => (
          <span
            key={label}
            className={
              label === "2–4"
                ? "flex-1 rounded border border-primary bg-primary py-1 text-center text-[8px] text-primary-foreground"
                : "flex-1 rounded border py-1 text-center text-[8px]"
            }
          >
            {label}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-0.5">
        <span className="text-[8px] text-muted-foreground">← Back</span>
        <span className="rounded bg-primary px-2 py-0.5 text-[8px] font-medium text-primary-foreground">
          Next →
        </span>
      </div>
    </div>
  )
}
