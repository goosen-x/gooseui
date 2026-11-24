import type * as React from "react"

import { cn } from "@/lib/utils"

export type StepProgressProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  /** Current step, starting from 1 */
  step: number
  /** Total number of steps */
  total: number
  /** Show the percentage on the right */
  showPercent?: boolean
  /** Show the "04 / 05" counter on the left */
  showCounter?: boolean
  /** Run the dashes on the completed part */
  animated?: boolean
  /** Accessible label. `{step}` and `{total}` are replaced */
  label?: string
}

const pad = (n: number) => String(n).padStart(2, "0")

const KEYFRAMES = `@keyframes gooseui-step-progress-dash{to{background-position:12px 0}}`

function StepProgress({
  step,
  total,
  showPercent = true,
  showCounter = true,
  animated = true,
  label = "Step {step} of {total}",
  className,
  ...props
}: StepProgressProps) {
  const safeTotal = Math.max(total, 1)
  const current = Math.min(Math.max(Math.round(step), 0), safeTotal)
  const pct = Math.round((current / safeTotal) * 100)
  const text = label
    .replace("{step}", String(current))
    .replace("{total}", String(safeTotal))

  return (
    <div
      data-slot="step-progress"
      className={cn(
        "flex w-full items-center gap-3 text-foreground",
        className,
      )}
      {...props}
    >
      <style href="gooseui-step-progress" precedence="default">
        {KEYFRAMES}
      </style>
      {showCounter && (
        <span
          aria-hidden
          className="shrink-0 font-mono text-xs font-medium tracking-wider text-muted-foreground tabular-nums"
        >
          <span className="text-foreground">{pad(current)}</span> /{" "}
          {pad(safeTotal)}
        </span>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={text}
        aria-label={text}
        className="relative h-2.5 flex-1"
      >
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        <div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 overflow-hidden transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        >
          <div
            className={cn(
              "size-full bg-[repeating-linear-gradient(90deg,currentColor_0_8px,transparent_8px_12px)] bg-size-[12px_100%]",
              animated &&
                "motion-safe:[animation:gooseui-step-progress-dash_0.6s_linear_infinite]",
            )}
          />
        </div>
        <span
          aria-hidden
          className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background transition-[left] duration-500 ease-out motion-reduce:transition-none"
          style={{ left: `${pct}%` }}
        />
      </div>
      {showPercent && (
        <span
          aria-hidden
          className="w-9 shrink-0 text-right font-mono text-xs tabular-nums"
        >
          {pct}%
        </span>
      )}
    </div>
  )
}

export { StepProgress }
