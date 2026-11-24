import { FadeScroller } from "@/registry/gooseui/ui/fade-scroller"

const chips = [
  "Design",
  "Frontend",
  "Motion",
  "Color",
  "Forms",
  "Icons",
  "Layout",
]

export default function CardPreview() {
  return (
    <div className="flex w-[200px] flex-col gap-2">
      <FadeScroller label="Tags" hideScrollbar fadeSize={28}>
        <div className="flex gap-1.5 py-0.5">
          {chips.map((chip, i) => (
            <span
              key={chip}
              className={
                i === 0
                  ? "shrink-0 rounded-full bg-primary px-2.5 py-1 text-[11px] text-primary-foreground"
                  : "shrink-0 rounded-full border bg-background px-2.5 py-1 text-[11px]"
              }
            >
              {chip}
            </span>
          ))}
        </div>
      </FadeScroller>
      <FadeScroller label="Bars" hideScrollbar fadeSize={28}>
        <div className="flex gap-1.5">
          {[40, 64, 52, 80, 36, 70, 58, 46, 66, 50].map((w, i) => (
            <span
              key={i}
              className="h-8 shrink-0 rounded-md bg-muted-foreground/25"
              style={{ width: w }}
            />
          ))}
        </div>
      </FadeScroller>
    </div>
  )
}
