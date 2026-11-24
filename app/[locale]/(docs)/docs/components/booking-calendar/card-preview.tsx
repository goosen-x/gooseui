const OPEN = new Set([3, 4, 5, 8, 10, 11, 12, 15, 17, 18, 22, 24, 25])
const SELECTED = 11

export default function CardPreview() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1)
  return (
    <div className="flex w-[210px] gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm">
      <div className="flex-1">
        <div className="mb-1 flex items-center justify-between px-0.5 text-[8px] font-medium">
          <span className="text-muted-foreground">‹</span>
          <span>March</span>
          <span className="text-muted-foreground">›</span>
        </div>
        <div className="grid grid-cols-7 gap-px">
          {days.map((d) => (
            <span
              key={d}
              className={
                d === SELECTED
                  ? "flex size-[17px] items-center justify-center rounded-full bg-primary text-[7px] font-medium text-primary-foreground"
                  : OPEN.has(d)
                    ? "flex size-[17px] items-center justify-center text-[7px] font-medium"
                    : "flex size-[17px] items-center justify-center text-[7px] text-muted-foreground/40"
              }
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-12 flex-col gap-1 border-l pl-2">
        <span className="mb-0.5 h-1 w-8 rounded-full bg-muted-foreground/30" />
        {["09:00", "10:30", "14:00", "16:30"].map((time) => (
          <span
            key={time}
            className={
              time === "10:30"
                ? "rounded border border-primary bg-primary py-0.5 text-center text-[7px] text-primary-foreground tabular-nums"
                : "rounded border py-0.5 text-center text-[7px] tabular-nums"
            }
          >
            {time}
          </span>
        ))}
        <span className="mt-auto rounded bg-primary py-0.5 text-center text-[7px] font-medium text-primary-foreground">
          Book
        </span>
      </div>
    </div>
  )
}
