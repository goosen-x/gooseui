import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export type HighlightChunk = { text: string; match: boolean }

export type HighlightOptions = {
  /** Ignore diacritics ("é" matches "e") and treat Cyrillic yo as ye. */
  ignoreDiacritics?: boolean
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function foldChar(char: string) {
  return char
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\u0451/g, "\u0435") // Cyrillic yo -> ye
    .replace(/\u0401/g, "\u0415")
}

/**
 * Folds the text and keeps, for every code unit of the folded string,
 * the [start, end) range it came from in the original string.
 */
function foldWithMap(text: string) {
  let folded = ""
  const starts: number[] = []
  const ends: number[] = []
  let pos = 0
  for (const char of text) {
    const next = pos + char.length
    const out = foldChar(char)
    if (out.length === 0) {
      // A lone combining mark: attach it to the previous character
      if (ends.length > 0) ends[ends.length - 1] = next
    } else {
      for (let k = 0; k < out.length; k++) {
        starts.push(pos)
        ends.push(next)
      }
      folded += out
    }
    pos = next
  }
  return { folded, starts, ends }
}

/** Splits `text` into matched and unmatched chunks for every word of `query`. */
export function splitHighlight(
  text: string,
  query: string,
  { ignoreDiacritics = false }: HighlightOptions = {},
): HighlightChunk[] {
  if (!text) return []
  const fold = ignoreDiacritics
    ? (s: string) => foldWithMap(s).folded
    : (s: string) => s
  const terms = Array.from(
    new Set(query.split(/\s+/).map(fold).filter(Boolean)),
  ).sort((a, b) => b.length - a.length)
  if (terms.length === 0) return [{ text, match: false }]

  const pattern = new RegExp(terms.map(escapeRegExp).join("|"), "giu")
  const source = ignoreDiacritics ? foldWithMap(text) : null
  const haystack = source ? source.folded : text

  const chunks: HighlightChunk[] = []
  let last = 0
  for (const m of haystack.matchAll(pattern)) {
    const from = source ? source.starts[m.index] : m.index
    const to = source
      ? source.ends[m.index + m[0].length - 1]
      : m.index + m[0].length
    if (from > last) chunks.push({ text: text.slice(last, from), match: false })
    chunks.push({ text: text.slice(from, to), match: true })
    last = to
  }
  if (last < text.length) chunks.push({ text: text.slice(last), match: false })
  return chunks
}

export type HighlightTextProps = Omit<
  ComponentProps<"span">,
  "children" | "ref"
> & {
  text: string
  query: string
  /** Ignore diacritics and treat Cyrillic yo as ye. */
  ignoreDiacritics?: boolean
  /** Paint the marker left to right as each match scrolls into view. */
  animate?: boolean
  markClassName?: string
}

// Each mark paints along its own view() timeline. Browsers without
// scroll-driven animations, and reduced motion, get a fully painted marker.
const css = `@keyframes gooseui-highlight-paint{from{background-size:0% 100%}to{background-size:100% 100%}}
@supports (animation-timeline: view()){@media (prefers-reduced-motion: no-preference){
[data-highlight-animate]{animation:gooseui-highlight-paint linear both;animation-timeline:view();animation-range:entry 100% cover 35%}
}}`

export function HighlightText({
  text,
  query,
  ignoreDiacritics = false,
  animate = false,
  markClassName,
  className,
  ...props
}: HighlightTextProps) {
  const chunks = splitHighlight(text, query, { ignoreDiacritics })

  return (
    <span className={className} {...props}>
      {animate && (
        <style href="gooseui-highlight-text" precedence="default">
          {css}
        </style>
      )}
      {chunks.map((chunk, i) => {
        const key = `${i}-${chunk.match ? "m" : "t"}`
        if (!chunk.match) return <span key={key}>{chunk.text}</span>
        return (
          <mark
            key={key}
            data-highlight-animate={animate || undefined}
            className={cn(
              "rounded-[0.2em] text-foreground box-decoration-clone",
              animate
                ? "bg-transparent bg-linear-to-r from-primary/25 to-primary/25 bg-no-repeat bg-left"
                : "bg-primary/25",
              markClassName,
            )}
          >
            {chunk.text}
          </mark>
        )
      })}
    </span>
  )
}
