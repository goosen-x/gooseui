export default function CardPreview() {
  const items = [
    { w: "w-20", d: 0 },
    { w: "w-16", d: 1 },
    { w: "w-16", d: 1 },
    { w: "w-20", d: 0 },
    { w: "w-14", d: 0 },
  ]
  return (
    <div className="flex h-full w-full items-center justify-center gap-4">
      <div className="space-y-2">
        <div className="h-2 w-16 rounded bg-foreground/70" />
        <div className="h-1.5 w-20 rounded bg-muted-foreground/30" />
        <div className="h-1.5 w-20 rounded bg-muted-foreground/30" />
        <div className="h-1.5 w-20 rounded bg-muted-foreground/30" />
        <div className="h-2 w-16 rounded bg-foreground/70" />
        <div className="h-1.5 w-20 rounded bg-muted-foreground/30" />
      </div>
      <div className="space-y-2.5 py-0.5">
        {items.map((item, i) => (
          <div
            key={i}
            className={`h-1.5 rounded ${item.w} ${i === 1 ? "bg-foreground" : "bg-muted-foreground/40"}`}
            style={{ marginLeft: item.d * 8 }}
          />
        ))}
      </div>
    </div>
  )
}
