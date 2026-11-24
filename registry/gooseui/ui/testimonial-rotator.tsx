import { type CSSProperties, type ReactNode, useId } from "react"
import { cn } from "@/lib/utils"

export type Testimonial = {
  quote: ReactNode
  author: string
  role?: ReactNode
  /** Photo URL (square, 160px or more) or a custom node. Falls back to initials */
  avatar?: string | ReactNode
}

export type TestimonialRotatorLabels = {
  /** Accessible label for an avatar radio */
  show: (author: string) => string
  region: string
}

export type TestimonialRotatorProps = {
  items: Testimonial[]
  /** Time per testimonial in ms */
  interval?: number
  autoPlay?: boolean
  defaultIndex?: number
  /** Avatars above the quote or in a column on the left (from md) */
  orientation?: "vertical" | "horizontal"
  /** Name of the radio group. Generated when omitted */
  name?: string
  labels?: Partial<TestimonialRotatorLabels>
  className?: string
}

const defaultLabels: TestimonialRotatorLabels = {
  show: (author) => `Show testimonial from ${author}`,
  region: "Testimonials",
}

const avatarTones = [
  "bg-primary text-primary-foreground",
  "bg-[color-mix(in_oklch,var(--primary)_25%,var(--card))] text-foreground",
  "bg-muted text-foreground",
  "bg-foreground text-background",
]

// Manual mode: the checked radio picks the quote, avatar and ring
const BASE_STYLES = `
.gooseui-tr-slide { grid-area: 1 / 1; opacity: 0; visibility: hidden; transition: opacity 250ms, visibility 250ms allow-discrete; }
.gooseui-tr-avatar { opacity: 0.5; scale: 1; transition: opacity 300ms, scale 300ms; }
.gooseui-tr-avatar:hover { opacity: 0.9; scale: 1.05; }
.gooseui-tr-avatar:has(:checked) { opacity: 1; scale: 1.1; }
.gooseui-tr-avatar:has(:focus-visible) { box-shadow: 0 0 0 4px var(--background), 0 0 0 7px color-mix(in oklch, var(--ring) 50%, transparent); }
.gooseui-tr-ring { opacity: 0; }
.gooseui-tr-hit { visibility: hidden; }
.gooseui-tr-avatar:has(:checked) .gooseui-tr-ring { opacity: 1; }
.gooseui-tr-progress { stroke-dashoffset: 100; }
.gooseui-tr[data-auto] .gooseui-tr-avatar:has(:checked) .gooseui-tr-progress { stroke-dashoffset: 0; }
@media (prefers-reduced-motion: reduce) {
  .gooseui-tr-slide, .gooseui-tr-avatar { transition: none; }
}
`

const MS = (value: number) => `${Math.round(value)}ms`
const pct = (value: number) => `${Number(value.toFixed(4))}%`

/**
 * Auto mode: every quote, avatar and ring runs one infinite cycle of
 * `count * interval`, shifted by its index. Checking a radio swaps the
 * animation name, which restarts the cycle from that testimonial.
 */
function autoStyles(set: string, count: number, interval: number) {
  const slot = 100 / count
  const fadeMs = Math.min(350, interval / 4)
  const fade = (fadeMs / (count * interval)) * 100
  const scope = `.gooseui-tr[data-auto][data-tr-set="${set}"]`
  let css = ""
  for (let k = 0; k < count; k++) {
    const id = `gooseui-tr-${set}-${k}`
    css += `@keyframes ${id}-slide {
  0% { opacity: 0; visibility: visible; translate: 0 var(--tr-shift); }
  ${pct(fade)}, ${pct(slot - fade)} { opacity: 1; visibility: visible; translate: 0 0; }
  ${pct(slot)}, 100% { opacity: 0; visibility: hidden; translate: 0 calc(var(--tr-shift) * -1); }
}
@keyframes ${id}-on {
  0%, ${pct(slot - 0.001)} { opacity: 1; scale: 1.1; }
  ${pct(slot)}, 100% { opacity: 0.5; scale: 1; }
}
@keyframes ${id}-ring {
  0% { opacity: 1; stroke-dashoffset: 100; }
  ${pct(slot - 0.001)} { opacity: 1; stroke-dashoffset: 0; }
  ${pct(slot)}, 100% { opacity: 0; stroke-dashoffset: 0; }
}
@keyframes ${id}-track {
  0%, ${pct(slot - 0.001)} { opacity: 1; }
  ${pct(slot)}, 100% { opacity: 0; }
}
@keyframes ${id}-hit {
  0%, ${pct(fade - 0.001)}, ${pct(slot - fade + 0.001)}, 100% { visibility: hidden; }
  ${pct(fade)}, ${pct(slot - fade)} { visibility: visible; }
}
${scope}:has(.gooseui-tr-avatar:nth-child(${k + 1}) :checked) {
  --tr-k: ${k};
  --tr-slide: ${id}-slide;
  --tr-on: ${id}-on;
  --tr-ring: ${id}-ring;
  --tr-track: ${id}-track;
  --tr-hit: ${id}-hit;
}
`
  }
  return `${css}
@media (prefers-reduced-motion: no-preference) {
  ${scope} { --tr-shift: 8px; }
  ${scope} :is(.gooseui-tr-slide, .gooseui-tr-avatar, .gooseui-tr-ring, .gooseui-tr-progress, .gooseui-tr-hit) {
    animation-duration: ${MS(count * interval)};
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    /* Negative delay: element i is (i - k) slots into the cycle. After a
       click the chosen quote starts at 0% and fades in from below; the
       hit layer stays hidden during that fade, so a pause never freezes
       a half-transparent quote */
    animation-delay: calc((var(--i) - var(--tr-k) - ${count}) * ${MS(interval)});
  }
  ${scope} .gooseui-tr-slide { animation-name: var(--tr-slide); transition: none; }
  ${scope} .gooseui-tr-avatar { animation-name: var(--tr-on); transition: none; }
  ${scope} .gooseui-tr-ring { animation-name: var(--tr-track); }
  ${scope} .gooseui-tr-progress { animation-name: var(--tr-ring); }
  /* The hit layer is visible only while its avatar plays and its quote is
     fully opaque, so only that avatar can be hovered and a pause never
     freezes a fading quote. Hover only: touch has no real hover, and
     keyboard focus cannot be matched to the playing avatar without JS */
  ${scope} .gooseui-tr-hit { animation-name: var(--tr-hit); }
  @media (hover: hover) {
    ${scope}:has(.gooseui-tr-hit:hover) :is(.gooseui-tr-slide, .gooseui-tr-avatar, .gooseui-tr-ring, .gooseui-tr-progress, .gooseui-tr-hit) {
      animation-play-state: paused;
    }
  }
}
`
}

function staticStyles(count: number) {
  let css = ""
  for (let k = 1; k <= count; k++) {
    css += `.gooseui-tr:has(.gooseui-tr-avatar:nth-child(${k}) :checked) .gooseui-tr-slide:nth-child(${k}) { opacity: 1; visibility: visible; }\n`
  }
  return css
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function TestimonialRotator({
  items,
  interval = 6000,
  autoPlay = true,
  defaultIndex = 0,
  orientation = "vertical",
  name: nameProp,
  labels: labelsProp,
  className,
}: TestimonialRotatorProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const autoName = useId()
  const name = nameProp ?? autoName

  const count = items.length
  if (count === 0) return null
  // Keeps an out-of-range defaultIndex in bounds
  const index = ((Math.trunc(defaultIndex) % count) + count) % count
  const rotating = autoPlay && count > 1
  const safeInterval = Math.max(500, Math.round(interval))
  const set = `${count}-${safeInterval}`
  const horizontal = orientation === "horizontal"

  return (
    <section
      aria-label={labels.region}
      data-auto={rotating || undefined}
      data-tr-set={set}
      className={cn(
        "gooseui-tr flex w-full flex-col items-center gap-8",
        horizontal && "md:flex-row md:items-center md:gap-12",
        className,
      )}
    >
      <style href="gooseui-testimonial-rotator" precedence="default">
        {BASE_STYLES}
      </style>
      <style
        href={`gooseui-testimonial-rotator-n${count}`}
        precedence="default"
      >
        {staticStyles(count)}
      </style>
      {rotating && (
        <style href={`gooseui-testimonial-rotator-${set}`} precedence="default">
          {autoStyles(set, count, safeInterval)}
        </style>
      )}

      <div
        role="radiogroup"
        aria-label={labels.region}
        className={cn(
          "flex flex-wrap items-center justify-center gap-4",
          horizontal
            ? "md:grid md:shrink-0 md:grid-cols-2 md:gap-5"
            : "order-1",
        )}
      >
        {items.map((item, i) => (
          <label
            key={`${item.author}-${i}`}
            style={{ "--i": i } as CSSProperties}
            className="gooseui-tr-avatar relative size-12 shrink-0 cursor-pointer rounded-full md:size-14"
          >
            <input
              type="radio"
              name={name}
              value={i}
              defaultChecked={i === index}
              aria-label={labels.show(item.author)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "flex size-full items-center justify-center overflow-hidden rounded-full text-sm font-semibold",
                typeof item.avatar === "string" || item.avatar
                  ? "bg-muted"
                  : avatarTones[i % avatarTones.length],
              )}
            >
              {typeof item.avatar === "string" ? (
                <img
                  src={item.avatar}
                  alt={item.author}
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  className="size-full rounded-full object-cover"
                />
              ) : (
                (item.avatar ?? initials(item.author))
              )}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="pointer-events-none absolute -inset-1.5 size-[calc(100%+0.75rem)] -rotate-90 overflow-visible"
            >
              <circle
                className="gooseui-tr-ring"
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="var(--border)"
                strokeWidth="4"
              />
              {rotating && (
                <circle
                  className="gooseui-tr-progress"
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="100"
                />
              )}
            </svg>
            {rotating && (
              <span
                aria-hidden="true"
                className="gooseui-tr-hit absolute inset-0 rounded-full"
              />
            )}
          </label>
        ))}
      </div>

      <div
        className={cn(
          "relative grid min-h-40 w-full max-w-2xl text-center",
          horizontal && "md:flex-1 md:text-left",
        )}
      >
        {items.map((item, i) => (
          <figure
            key={`${item.author}-${i}`}
            style={{ "--i": i } as CSSProperties}
            className="gooseui-tr-slide"
          >
            <blockquote className="text-lg leading-relaxed tracking-tight text-balance md:text-xl">
              {item.quote}
            </blockquote>
            <figcaption className="mt-5">
              <span className="block font-semibold">{item.author}</span>
              {item.role && (
                <span className="block text-sm text-muted-foreground">
                  {item.role}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
