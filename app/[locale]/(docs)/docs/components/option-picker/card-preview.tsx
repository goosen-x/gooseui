const BARS = [1, 2, 3, 4, 5]

export default function CardPreview() {
  return (
    <div className="flex w-[200px] flex-col gap-3">
      <div className="flex gap-0.5 rounded-md bg-muted p-0.5">
        {["Starter", "Team", "Studio"].map((label) => (
          <span
            key={label}
            className={
              label === "Team"
                ? "flex-1 rounded bg-background py-1 text-center text-[9px] font-medium shadow-sm"
                : "flex-1 py-1 text-center text-[9px] text-muted-foreground"
            }
          >
            {label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-5 items-end gap-1.5">
        {BARS.map((n) => (
          <span key={n} className="flex h-10 items-end">
            <span
              className={
                n <= 3
                  ? "w-full rounded-sm bg-primary"
                  : "w-full rounded-sm bg-muted"
              }
              style={{ height: `${n * 20}%` }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
