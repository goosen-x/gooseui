const columns = [
  [28, 44, 20],
  [40, 22, 34],
  [18, 36, 38],
]

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center p-3">
      <div className="grid w-[180px] grid-cols-3 items-start gap-1.5">
        {columns.map((column, c) => (
          <div key={c} className="flex flex-col gap-1.5">
            {column.map((height, r) => (
              <div
                key={r}
                className={
                  (c + r) % 3 === 0
                    ? "rounded-md bg-primary/70"
                    : "rounded-md bg-muted-foreground/20"
                }
                style={{ height }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
