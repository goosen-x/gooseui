import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface SlidingNumberProps {
  value: number
  /** Ready-made text, e.g. "$1,250.00". Digits slide, other characters stay as they are */
  text?: string
  className?: string
  padStart?: number
  decimalSeparator?: string
  /** CSS transition for the digit columns, e.g. "transform 300ms ease-out" */
  transition?: string
}

// Each digit is a column 0..9 shifted by --d. When the value prop changes,
// React only updates --d and the CSS transition slides the column.
// linear() approximates a spring with a small overshoot.
const css = `
.gooseui-sn-col {
  transform: translateY(calc(var(--d) * -10%));
  transition: transform 600ms
    linear(0, 0.2 6%, 0.55 13%, 0.85 21%, 1.03 30%, 1.07 37%, 1.05 45%, 1.01 56%, 0.995 70%, 1);
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-sn-col {
    transition: none;
  }
}
`

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

function SlidingDigit({
  digit,
  transition,
}: {
  digit: number
  transition?: string
}) {
  return (
    <span className="relative inline-flex h-[1em] w-[0.65em] justify-center overflow-hidden leading-none">
      <span
        className="gooseui-sn-col absolute top-0 left-0 flex w-full flex-col items-center"
        style={{ "--d": digit, transition } as CSSProperties}
      >
        {DIGITS.map((d) => (
          <span key={d} className="flex h-[1em] items-center">
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

function SlidingNumber({
  value,
  text,
  className,
  padStart = 0,
  decimalSeparator = ".",
  transition,
}: SlidingNumberProps) {
  const str = value.toString()
  const formatted = text ?? (padStart > 0 ? str.padStart(padStart, "0") : str)
  const chars = formatted.split("")

  return (
    <span
      className={cn(
        "inline-flex items-center tabular-nums font-medium",
        className,
      )}
    >
      <style href="gooseui-sliding-number" precedence="default">
        {css}
      </style>
      <span className="sr-only">{formatted}</span>
      <span aria-hidden="true" className="inline-flex items-center">
        {chars.map((char, index) => {
          const isDigit = /\d/.test(char)
          const isSeparator = char === decimalSeparator || char === ","
          // Key from the right, so the ones column keeps its node
          // when the number grows by a digit
          const key = `${chars.length - index}-${isDigit ? "d" : "s"}`

          if (isSeparator) {
            return (
              <span key={key} className="w-[0.25em]">
                {char}
              </span>
            )
          }

          if (isDigit) {
            return (
              <SlidingDigit
                key={key}
                digit={Number(char)}
                transition={transition}
              />
            )
          }

          return (
            <span key={key} className="inline-flex whitespace-pre">
              {char}
            </span>
          )
        })}
      </span>
    </span>
  )
}

export { SlidingNumber, type SlidingNumberProps }
