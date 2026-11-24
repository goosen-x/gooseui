import type * as React from "react"
import { cn } from "@/lib/utils"
import { Rating, type RatingShape } from "@/registry/gooseui/ui/rating"
import { SlidingNumber } from "@/registry/gooseui/ui/sliding-number"

/**
 * Vote counts per score. An array is ordered from the lowest score:
 * `[ones, twos, threes, fours, fives]`. An object is keyed by score.
 */
export type RatingCounts = number[] | Record<number, number>

export type RatingBreakdownLabels = {
  /** Text under the average, e.g. "128 ratings" */
  total: (total: number) => string
  /** Accessible description of one row */
  row: (score: number, count: number, percent: number) => string
  /** Accessible name of the stars next to the average */
  summary: (average: number, max: number) => string
}

export type RatingBreakdownProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  counts: RatingCounts
  /** Highest score. Defaults to the array length or 5 */
  max?: number
  shape?: RatingShape
  /** Formats the large average number */
  formatAverage?: (average: number) => string
  /** Formats the vote count at the end of each row */
  formatCount?: (count: number) => string
  /**
   * Grow the bars from zero once, when the block first renders. Where
   * @starting-style is unsupported, or with reduced motion, the bars are full.
   */
  animate?: boolean
  labels?: Partial<RatingBreakdownLabels>
}

const defaultLabels: RatingBreakdownLabels = {
  total: (total) =>
    `${total.toLocaleString("en-US")} ${total === 1 ? "rating" : "ratings"}`,
  row: (score, count, percent) =>
    `${score} stars: ${count} (${Math.round(percent)}%)`,
  summary: (average, max) => `Average ${average.toFixed(1)} out of ${max}`,
}

// Bars are full by default. On first paint they grow from 0 (@starting-style),
// each row a little later than the one above. No JS involved.
const styles = `
@media (prefers-reduced-motion:no-preference){
  .gooseui-rating-breakdown[data-animate] .gooseui-rating-breakdown-bar{
    transition:scale .6s cubic-bezier(.22,1,.36,1) calc(var(--rb-i) * 80ms),width .5s cubic-bezier(.3,.55,.35,1);
    @starting-style{scale:0 1}
  }
  .gooseui-rating-breakdown:not([data-animate]) .gooseui-rating-breakdown-bar{
    transition:width .5s cubic-bezier(.3,.55,.35,1);
  }
}
`

function countFor(counts: RatingCounts, score: number) {
  const raw = Array.isArray(counts) ? counts[score - 1] : counts[score]
  return Number.isFinite(raw) && raw > 0 ? raw : 0
}

export function RatingBreakdown({
  counts,
  max: maxProp,
  shape = "star",
  formatAverage = (average) => average.toFixed(1),
  formatCount = (count) => count.toLocaleString("en-US"),
  animate = true,
  labels: labelsProp,
  className,
  ...rest
}: RatingBreakdownProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const max = maxProp ?? (Array.isArray(counts) ? counts.length : 5)
  const scores = Array.from({ length: max }, (_, i) => max - i)

  let total = 0
  let sum = 0
  for (const score of scores) {
    const count = countFor(counts, score)
    total += count
    sum += count * score
  }
  const average = total > 0 ? sum / total : 0

  return (
    <div
      data-animate={animate ? "" : undefined}
      className={cn(
        "gooseui-rating-breakdown",
        "flex w-full flex-col gap-6 sm:flex-row sm:items-center",
        className,
      )}
      {...rest}
    >
      <style href="gooseui-rating-breakdown" precedence="default">
        {styles}
      </style>
      <div className="flex shrink-0 flex-col items-center gap-2 sm:w-40">
        <SlidingNumber
          value={average}
          text={formatAverage(average)}
          className="text-5xl font-semibold tracking-tight"
        />
        <Rating
          readOnly
          value={average}
          max={max}
          shape={shape}
          size="sm"
          labels={{ summary: labels.summary }}
        />
        <SlidingNumber
          value={total}
          text={labels.total(total)}
          className="text-sm font-normal text-muted-foreground"
        />
      </div>

      <ul className="flex flex-1 flex-col gap-2">
        {scores.map((score, i) => {
          const count = countFor(counts, score)
          const percent = total > 0 ? (count / total) * 100 : 0
          return (
            <li key={score} className="flex items-center gap-3 text-sm">
              <span className="sr-only">
                {labels.row(score, count, percent)}
              </span>
              <span
                aria-hidden="true"
                className="w-4 shrink-0 text-right font-medium tabular-nums"
              >
                {score}
              </span>
              <span
                aria-hidden="true"
                className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted"
              >
                <span
                  className="gooseui-rating-breakdown-bar absolute inset-y-0 left-0 origin-left rounded-full bg-primary"
                  style={
                    {
                      width: `${percent}%`,
                      "--rb-i": i,
                    } as React.CSSProperties
                  }
                />
              </span>
              <span
                aria-hidden="true"
                className="flex w-12 shrink-0 justify-end text-muted-foreground"
              >
                <SlidingNumber
                  value={count}
                  text={formatCount(count)}
                  className="font-normal"
                />
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
