const rows = [
  { p: [8, 40], a: [10, 46] },
  { p: [30, 62], a: [34, 58] },
  { p: [52, 80], a: [55, 70] },
  { p: [70, 94], a: null },
]

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center px-3">
      <div className="relative w-full max-w-[210px] overflow-hidden rounded-md border bg-card">
        {rows.map((r, i) => (
          <div
            key={r.p[0]}
            className="flex h-6 items-center border-b last:border-b-0"
          >
            <span className="h-full w-10 shrink-0 border-r bg-muted/40">
              <span
                className="mx-1.5 mt-2.5 block h-1 rounded-full bg-muted-foreground/40"
                style={{ width: 18 + (i % 2) * 8 }}
              />
            </span>
            <span className="relative h-full flex-1">
              <span
                className="absolute top-1/2 h-3.5 -translate-y-1/2 rounded-[4px] border border-dashed border-primary/60 bg-primary/15"
                style={{ left: `${r.p[0]}%`, width: `${r.p[1] - r.p[0]}%` }}
              />
              {r.a && (
                <span
                  className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
                  style={{ left: `${r.a[0]}%`, width: `${r.a[1] - r.a[0]}%` }}
                />
              )}
            </span>
          </div>
        ))}
        <span
          className="absolute inset-y-0 w-px bg-foreground"
          style={{ left: "calc(40px + 50% - 20px)" }}
        />
      </div>
    </div>
  )
}
