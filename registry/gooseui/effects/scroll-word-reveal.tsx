import type { CSSProperties, ElementType } from "react"
import { cn } from "@/lib/utils"

export type ScrollWordRevealProps = {
  /** Paragraph text. Words are split by whitespace. */
  text: string
  /** Element to render. */
  as?: ElementType
  /**
   * Two lines in the scroll container, as a share of its height from the top
   * (1 is the bottom edge). The reveal starts when the top of the text crosses
   * the first line and ends when the bottom of the text crosses the second.
   */
  offset?: [number, number]
  /** Blur of a hidden word, in px. */
  blur?: number
  /** Opacity of a hidden word, 0..1. */
  initialOpacity?: number
  /** Share of the scroll range a single word needs to fully appear, 0..1. */
  wordSpan?: number
  className?: string
  wordClassName?: string
}

// Every word runs the same keyframes on the shared view() timeline of the
// paragraph. view-timeline-inset turns the offset lines into the edges of the
// timeline, and each word takes its own slice of the "cover" range, shifted
// by --i. Without scroll-driven animations the text simply stays visible.
const css = `
.gooseui-swr {
  view-timeline: --gooseui-swr block;
  view-timeline-inset: var(--top) var(--bottom);
}
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .gooseui-swr-word {
      --p: calc(var(--i) / max(var(--n) - 1, 1) * (1 - var(--span)));
      animation: gooseui-swr linear both;
      animation-timeline: --gooseui-swr;
      animation-range:
        cover calc(var(--p) * 100%)
        cover calc((var(--p) + var(--span)) * 100%);
    }
  }
}
@keyframes gooseui-swr {
  from {
    opacity: var(--o);
    filter: blur(var(--blur));
  }
  to {
    opacity: 1;
    filter: none;
  }
}
`

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max)

export function ScrollWordReveal({
  text,
  as: Tag = "p",
  offset = [0.9, 0.25],
  blur = 6,
  initialOpacity = 0.15,
  wordSpan = 0.12,
  className,
  wordClassName,
}: ScrollWordRevealProps) {
  const words = text.split(/\s+/).filter(Boolean)
  const count = words.length
  // Insets in % of the scroll container: the timeline starts at the
  // bottom line and ends at the top line
  const start = clamp(offset[0], 0.02, 1)
  const end = clamp(offset[1], 0, start - 0.01)

  const vars = {
    "--n": count,
    "--top": `${end * 100}%`,
    "--bottom": `${(1 - start) * 100}%`,
    "--span": clamp(wordSpan, 0.01, 1),
    "--o": clamp(initialOpacity, 0, 1),
    "--blur": `${Math.max(blur, 0)}px`,
  } as CSSProperties

  return (
    <Tag className={cn("gooseui-swr", className)} style={vars}>
      <style href="gooseui-scroll-word-reveal" precedence="default">
        {css}
      </style>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span
              className={cn("gooseui-swr-word inline-block", wordClassName)}
              style={{ "--i": i } as CSSProperties}
            >
              {word}
            </span>
            {i < count - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  )
}
