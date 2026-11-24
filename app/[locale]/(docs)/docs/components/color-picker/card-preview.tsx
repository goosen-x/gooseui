const swatches = [
  "oklch(0.62 0.19 255)",
  "oklch(0.65 0.24 340)",
  "oklch(0.75 0.17 60)",
  "oklch(0.72 0.19 145)",
  "oklch(0.3 0.02 260)",
]

const hue = Array.from(
  { length: 13 },
  (_, i) => `oklch(0.75 0.15 ${i * 30})`,
).join(", ")

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center p-3">
      <div className="flex w-[150px] flex-col gap-2 rounded-lg border bg-popover p-2 shadow-sm">
        <div
          className="relative h-[72px] rounded-md"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #000), linear-gradient(to right, oklch(0.75 0 255), oklch(0.62 0.22 255))",
          }}
        >
          <span
            className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
            style={{
              left: "62%",
              top: "35%",
              background: "oklch(0.62 0.19 255)",
            }}
          />
        </div>
        <div
          className="relative h-2 rounded-full"
          style={{ background: `linear-gradient(to right, ${hue})` }}
        >
          <span className="absolute top-1/2 left-[70%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[oklch(0.75_0.15_255)] shadow" />
        </div>
        <div className="rounded border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
          oklch(0.62 0.19 255)
        </div>
        <div className="flex gap-1">
          {swatches.map((color) => (
            <span
              key={color}
              className="size-3.5 rounded-sm"
              style={{ background: color }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
