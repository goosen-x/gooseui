import type * as React from "react"
import { cn } from "@/lib/utils"

export type StatCounterProps = Omit<
  React.ComponentProps<"span">,
  "children" | "prefix"
> & {
  value: number
  /** Number the count starts from */
  from?: number
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  /** Digits after the decimal point */
  decimals?: number
  /** BCP 47 locale for Intl.NumberFormat */
  locale?: string
  /** Extra Intl.NumberFormat options (currency, percent, compact notation) */
  formatOptions?: Intl.NumberFormatOptions
  /**
   * "mount" counts once by time on first paint. "scroll" ties the count to
   * the scroll of the nearest scrollable container (view() timeline).
   */
  trigger?: "mount" | "scroll"
  /** Count duration in ms (trigger="mount" only) */
  duration?: number
  /** animation-range for trigger="scroll", e.g. "entry 0% cover 65%" */
  scrollRange?: string
}

// trigger="mount": the count runs once by time on first paint.
// trigger="scroll": it follows the view() timeline of the nearest scroll container.
// --gsc-n is the animated number (the final value scaled to an integer).
// Every digit slot derives its own digit from it: q = floor(n / p), d = q mod 10.
// Registered <integer> properties round calc() results, which gives floor().
// A slot whose q is 0 is a leading zero and collapses to font-size 0.
const css = `@property --gsc-n{syntax:"<integer>";inherits:true;initial-value:0}
@property --gsc-q{syntax:"<integer>";inherits:false;initial-value:0}
@property --gsc-q10{syntax:"<integer>";inherits:false;initial-value:0}
@property --gsc-d{syntax:"<integer>";inherits:false;initial-value:0}
@keyframes gooseui-stat-count{from{--gsc-n:var(--gsc-from)}to{--gsc-n:var(--gsc-to)}}
[data-gooseui-stat-counter] [data-anim]{display:none}
[data-gsc-slot]{--gsc-q:calc(var(--gsc-n) / var(--gsc-p) - .5);font-size:calc(min(var(--gsc-q),1) * 1em)}
[data-gsc-slot][data-fixed]{font-size:inherit}
[data-gsc-digit]{--gsc-q10:calc(var(--gsc-q) / 10 - .5);--gsc-d:calc(var(--gsc-q) - var(--gsc-q10) * 10);counter-reset:gsc var(--gsc-d)}
[data-gsc-digit]::before{content:counter(gsc)}
@supports (transition-behavior:allow-discrete){@media (prefers-reduced-motion:no-preference){
[data-gooseui-stat-counter][data-animated][data-trigger=mount]{--gsc-n:var(--gsc-to);animation:gooseui-stat-count var(--gsc-duration,2.5s) cubic-bezier(.4,.2,.2,1) both}
[data-gooseui-stat-counter][data-animated][data-trigger=mount] [data-final]{visibility:hidden}
[data-gooseui-stat-counter][data-animated][data-trigger=mount] [data-anim]{display:block}
@supports (animation-timeline:view()){
[data-gooseui-stat-counter][data-animated][data-trigger=scroll]{--gsc-n:var(--gsc-to);animation:gooseui-stat-count 1s linear both;animation-timeline:view();animation-range:var(--gsc-range,entry 0% cover 65%)}
[data-gooseui-stat-counter][data-animated][data-trigger=scroll] [data-final]{visibility:hidden}
[data-gooseui-stat-counter][data-animated][data-trigger=scroll] [data-anim]{display:block}
}}}`

type Plan = {
  before: string
  after: string
  to: number
  from: number
  intDigits: number
  decimals: number
  group: string
  decimal: string
}

const NUMBER_PARTS = new Set(["integer", "group", "decimal", "fraction"])
// Above this the integer custom property may overflow in some engines
const MAX = 2_000_000_000

function digitsOf(parts: Intl.NumberFormatPart[]) {
  let int = ""
  let frac = ""
  for (const p of parts) {
    if (p.type === "integer") int += p.value
    if (p.type === "fraction") frac += p.value
  }
  return { int, frac }
}

/** Splits the formatted number into static text and an animatable integer. */
function plan(
  formatter: Intl.NumberFormat,
  value: number,
  from: number,
): Plan | null {
  if (value < 0 || from < 0) return null
  const parts = formatter.formatToParts(value)
  const fromParts = formatter.formatToParts(from)
  if (parts.some((p) => /exponent|minusSign|nan|infinity/.test(p.type)))
    return null
  const first = parts.findIndex((p) => NUMBER_PARTS.has(p.type))
  let last = -1
  parts.forEach((p, i) => {
    if (NUMBER_PARTS.has(p.type)) last = i
  })
  if (first < 0) return null
  // Literal parts inside the number (other than separators) cannot be animated
  for (let i = first; i <= last; i++)
    if (!NUMBER_PARTS.has(parts[i].type)) return null

  const end = digitsOf(parts)
  const start = digitsOf(fromParts)
  const decimals = end.frac.length
  const to = Number(end.int + end.frac)
  const fromScaled = Number(
    start.int + start.frac.padEnd(decimals, "0").slice(0, decimals),
  )
  if (!(to <= MAX && fromScaled <= MAX)) return null
  const group = parts.find((p) => p.type === "group")?.value ?? ""
  const decimal = parts.find((p) => p.type === "decimal")?.value ?? "."

  const intDigits = Math.max(
    String(Math.floor(to / 10 ** decimals)).length,
    String(Math.floor(fromScaled / 10 ** decimals)).length,
  )
  const result: Plan = {
    before: parts
      .slice(0, first)
      .map((p) => p.value)
      .join(""),
    after: parts
      .slice(last + 1)
      .map((p) => p.value)
      .join(""),
    to,
    from: fromScaled,
    intDigits,
    decimals,
    group,
    decimal,
  }
  // The final frame must match Intl exactly, otherwise keep the static number
  const numeric = parts
    .slice(first, last + 1)
    .map((p) => p.value)
    .join("")
  return render(result, to) === numeric ? result : null
}

/** What the digit slots show for n, used to check the plan against Intl. */
function render(plan: Plan, n: number) {
  const intPart = String(Math.floor(n / 10 ** plan.decimals))
  const grouped = plan.group
    ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, plan.group)
    : intPart
  if (!plan.decimals) return grouped
  const frac = String(n % 10 ** plan.decimals).padStart(plan.decimals, "0")
  return `${grouped}${plan.decimal}${frac}`
}

function Slots({ plan }: { plan: Plan }) {
  const slots: React.ReactNode[] = []
  for (let j = plan.intDigits - 1; j >= 0; j--) {
    const p = 10 ** (j + plan.decimals)
    const fixed = j === 0 ? "" : undefined
    slots.push(
      <span
        key={`d${j}`}
        data-gsc-slot=""
        data-gsc-digit=""
        data-fixed={fixed}
        style={{ "--gsc-p": p } as React.CSSProperties}
      />,
    )
    if (plan.group && j > 0 && j % 3 === 0) {
      slots.push(
        <span
          key={`g${j}`}
          data-gsc-slot=""
          style={{ "--gsc-p": p } as React.CSSProperties}
        >
          {plan.group}
        </span>,
      )
    }
  }
  if (plan.decimals) {
    slots.push(<span key="sep">{plan.decimal}</span>)
    for (let k = plan.decimals - 1; k >= 0; k--) {
      slots.push(
        <span
          key={`f${k}`}
          data-gsc-slot=""
          data-gsc-digit=""
          data-fixed=""
          style={{ "--gsc-p": 10 ** k } as React.CSSProperties}
        />,
      )
    }
  }
  return slots
}

export function StatCounter({
  value,
  from = 0,
  prefix,
  suffix,
  decimals = 0,
  locale = "en-US",
  formatOptions,
  trigger = "mount",
  duration = 2500,
  scrollRange,
  className,
  style,
  ...props
}: StatCounterProps) {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    ...formatOptions,
  })
  const finalText = formatter.format(value)
  const counting = plan(formatter, value, from)

  return (
    <span
      data-gooseui-stat-counter=""
      data-animated={counting ? "" : undefined}
      data-trigger={trigger}
      className={cn("inline-grid tabular-nums", className)}
      style={
        counting
          ? ({
              "--gsc-from": counting.from,
              "--gsc-to": counting.to,
              "--gsc-duration": `${duration}ms`,
              ...(scrollRange ? { "--gsc-range": scrollRange } : null),
              ...style,
            } as React.CSSProperties)
          : style
      }
      {...props}
    >
      <style href="gooseui-stat-counter" precedence="default">
        {css}
      </style>
      <span className="sr-only">
        {prefix}
        {finalText}
        {suffix}
      </span>
      {/* The final value: shown until the count starts, then a width reserve */}
      <span
        aria-hidden="true"
        data-final=""
        className="col-start-1 row-start-1 whitespace-nowrap"
      >
        {prefix}
        {finalText}
        {suffix}
      </span>
      {counting && (
        <span
          aria-hidden="true"
          data-anim=""
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {prefix}
          {counting.before}
          <Slots plan={counting} />
          {counting.after}
          {suffix}
        </span>
      )}
    </span>
  )
}
