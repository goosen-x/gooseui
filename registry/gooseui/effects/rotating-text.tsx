import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type RotatingTextProps = {
  /** Words to cycle through. */
  words: string[]
  /** Time each word stays on screen, in ms. */
  interval?: number
  /** "reserve" keeps the width of the longest word, "animate" tweens the width. */
  widthMode?: "reserve" | "animate"
  /** Duration of a single letter animation, in seconds. */
  duration?: number
  /** Delay between letters, in seconds. */
  stagger?: number
  /** Blur of an entering or leaving letter, in px. */
  blur?: number
  /** Static text announced by screen readers. Defaults to the first word. */
  srLabel?: string
  className?: string
}

// One registered number --gooseui-rt-t runs from 0 to 1 over the whole cycle.
// Every letter knows when it enters (--a) and leaves (--b) in ms of the cycle
// and derives its opacity, transform and blur from the clock with clamp().
// All timings are computed on the server, so the browser runs no JavaScript.
const css = `
@property --gooseui-rt-t {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@keyframes gooseui-rt-clock {
  to {
    --gooseui-rt-t: 1;
  }
}
.gooseui-rt[data-running] {
  animation: gooseui-rt-clock calc(var(--cycle) * 1ms) linear
    calc(var(--lead) * -1ms) infinite;
}
.gooseui-rt[data-running] .gooseui-rt-letter {
  --time: calc(var(--gooseui-rt-t) * var(--cycle));
  --e: clamp(0, (var(--time) - var(--a)) / var(--in), 1);
  --l: clamp(0, (var(--time) - var(--b)) / var(--out), 1);
  --ee: calc(var(--e) * (2 - var(--e)));
  --ll: calc(var(--l) * var(--l));
  opacity: calc(var(--ee) * (1 - var(--ll)));
  transform: translateY(calc((1 - var(--ee) - var(--ll)) * 0.35em))
    rotateX(calc((1 - var(--ee) - var(--ll)) * 90deg));
  filter: blur(calc((1 - var(--ee) + var(--ll)) * var(--blur) * 1px));
  transform-origin: 50% 50% -0.25em;
}
.gooseui-rt[data-running][data-width="animate"] .gooseui-rt-word {
  --time: calc(var(--gooseui-rt-t) * var(--cycle));
  --grow: clamp(0, (var(--time) - var(--ws)) / var(--in), 1);
  --shrink: calc(1 - clamp(0, (var(--time) - var(--we)) / var(--in), 1));
  --tail: calc(var(--wrap) * (1 - clamp(0, var(--time) / var(--in), 1)));
  max-width: calc(max(min(var(--grow), var(--shrink)), var(--tail)) * var(--len) * 1em);
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-rt[data-running] .gooseui-rt-letter {
    transform: none;
    filter: none;
  }
}
`

export function RotatingText({
  words,
  interval = 2500,
  widthMode = "reserve",
  duration = 0.5,
  stagger = 0.04,
  blur = 6,
  srLabel,
  className,
}: RotatingTextProps) {
  const count = words.length
  if (count === 0) return null

  const slot = Math.max(interval, 200)
  const enter = Math.max(duration, 0.01) * 1000
  const leave = enter * 0.6
  const step = Math.max(stagger, 0) * 1000
  const running = count > 1
  // Start the clock right after the first word has fully entered,
  // so the page loads with the first word already in place
  const firstLength = Array.from(words[0]).length
  const lead = Math.min(enter + step * (firstLength - 1), slot / 2)

  const rootVars = {
    "--cycle": slot * count,
    "--lead": lead,
    "--in": enter,
    "--out": leave,
    "--blur": Math.max(blur, 0),
  } as CSSProperties

  return (
    <span
      className={cn("gooseui-rt relative inline-block align-bottom", className)}
      data-running={running ? "" : undefined}
      data-width={widthMode}
      style={rootVars}
    >
      <style href="gooseui-rotating-text" precedence="default">
        {css}
      </style>
      <span className="sr-only">{srLabel ?? words[0]}</span>
      <span
        aria-hidden="true"
        className="inline-grid whitespace-pre [perspective:600px]"
      >
        {words.map((word, i) => {
          const letters = Array.from(word)
          const start = i * slot
          const end = start + slot
          // Leaving letters finish exactly when the slot ends
          const leaveStart = end - leave - (step / 2) * (letters.length - 1)
          const wordVars = {
            "--ws": start,
            "--we": end,
            "--len": letters.length,
            "--wrap": i === count - 1 ? 1 : 0,
          } as CSSProperties
          return (
            <span
              key={i}
              className={cn(
                "gooseui-rt-word col-start-1 row-start-1 inline-flex min-w-0 whitespace-pre",
                !running && i > 0 && "invisible",
              )}
              style={wordVars}
            >
              {letters.map((char, j) => (
                <span
                  key={j}
                  className="gooseui-rt-letter inline-block whitespace-pre"
                  style={
                    {
                      "--a": start + j * step,
                      "--b": leaveStart + (j * step) / 2,
                    } as CSSProperties
                  }
                >
                  {char}
                </span>
              ))}
            </span>
          )
        })}
      </span>
    </span>
  )
}
