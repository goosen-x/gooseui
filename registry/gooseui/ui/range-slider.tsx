"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

export type RangeValue = [number, number]
/** `null` at an edge means "no limit" on that side */
export type NullableRangeValue = [number | null, number | null]

export type RangeSliderLabels = {
  /** Accessible name of the lower thumb */
  min: string
  /** Accessible name of the upper thumb */
  max: string
}

type RangeSliderBaseProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  min?: number
  max?: number
  step?: number
  /** Smallest allowed distance between the two thumbs */
  minGap?: number
  disabled?: boolean
  /** Formats the value labels and `aria-valuetext` */
  formatValue?: (value: number) => string
  /** Show formatted values under the track */
  showValues?: boolean
  /** Name prefix for form submission: `${name}-min` and `${name}-max` */
  name?: string
  labels?: Partial<RangeSliderLabels>
}

export type RangeSliderProps = RangeSliderBaseProps &
  (
    | {
        nullableEdges?: false
        value?: RangeValue
        defaultValue?: RangeValue
        onValueChange?: (value: RangeValue) => void
      }
    | {
        /** A thumb resting on its edge is reported as `null` */
        nullableEdges: true
        value?: NullableRangeValue
        defaultValue?: NullableRangeValue
        onValueChange?: (value: NullableRangeValue) => void
      }
  )

const defaultLabels: RangeSliderLabels = {
  min: "Minimum",
  max: "Maximum",
}

// The fill is painted by the thumbs: border-image with a 100vw outset draws a
// band to the right of each thumb, clipped by the input. The lower thumb paints
// the primary color, the upper one paints the track color over the rest.
const thumb = `appearance:none;pointer-events:auto;box-sizing:border-box;width:18px;height:18px;border:0;border-radius:50%;background:var(--background);box-shadow:inset 0 0 0 2px var(--primary),var(--rs-f,0 1px 2px rgb(0 0 0/.12));cursor:grab;border-image:linear-gradient(90deg,transparent 50%,var(--rs-c) 0) 0 1/6px 100vw/0 100vw`
const styles = `.gooseui-range-slider input{position:absolute;inset:0;width:100%;height:100%;margin:0;appearance:none;background:none;pointer-events:none;overflow:hidden;outline:none;--rs-c:var(--primary);
&+input{--rs-c:var(--muted)}
&:focus-visible{--rs-f:0 0 0 4px color-mix(in oklab,var(--ring) 40%,transparent)}
&::-webkit-slider-runnable-track{height:100%;background:none}
&::-moz-range-track{background:none}
&::-webkit-slider-thumb{${thumb};margin-top:5px}
&::-moz-range-thumb{${thumb}}
&:active::-webkit-slider-thumb{cursor:grabbing}
&:active::-moz-range-thumb{cursor:grabbing}
&:disabled::-webkit-slider-thumb{cursor:not-allowed}
&:disabled::-moz-range-thumb{cursor:not-allowed}}`

/**
 * Two native range inputs. The fill between the thumbs is CSS, so the slider
 * looks right and submits before hydration. JavaScript only keeps the thumbs
 * from crossing, updates the value labels and calls onValueChange.
 */
export function RangeSlider(props: RangeSliderProps) {
  const {
    min = 0,
    max = 100,
    step = 1,
    minGap = 0,
    disabled = false,
    formatValue = String,
    showValues = true,
    name,
    labels: labelsProp,
    nullableEdges = false,
    value,
    defaultValue,
    onValueChange,
    className,
    ...rest
  } = props
  const labels = { ...defaultLabels, ...labelsProp }
  const emit = onValueChange as
    | ((value: NullableRangeValue) => void)
    | undefined

  const start = value ?? defaultValue ?? [null, null]
  const lo = Math.max(min, Math.min(max, start[0] ?? min))
  const hi = Math.max(lo, Math.min(max, start[1] ?? max))

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const root = event.currentTarget.closest(".gooseui-range-slider")
    if (!root) return
    const [a, b] = root.querySelectorAll("input")
    const isLow = event.currentTarget === a
    let l = Number(a.value)
    let h = Number(b.value)
    if (isLow) l = Math.max(min, Math.min(l, h - minGap))
    else h = Math.min(max, Math.max(h, l + minGap))
    a.value = String(l)
    b.value = String(h)
    const out = root.querySelectorAll("[data-out]")
    for (const [i, v] of [l, h].entries()) {
      const text = formatValue(v)
      ;[a, b][i].ariaValueText = text
      if (out[i]) out[i].textContent = text
    }
    emit?.(nullableEdges ? [l <= min ? null : l, h >= max ? null : h] : [l, h])
  }

  const field = (which: "min" | "max", v: number) => ({
    type: "range" as const,
    "aria-label": labels[which],
    "aria-valuetext": formatValue(v),
    name: name ? `${name}-${which}` : undefined,
    min,
    max,
    step,
    disabled,
    onChange,
    // Controlled when a value is passed, otherwise the inputs keep their own state
    ...(value ? { value: v } : { defaultValue: v }),
  })

  return (
    <div
      className={cn(
        "gooseui-range-slider w-full",
        disabled && "opacity-50",
        className,
      )}
      {...rest}
    >
      <style href="gooseui-range-slider" precedence="default">
        {styles}
      </style>
      <div className="relative h-7">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
        <input {...field("min", lo)} />
        <input {...field("max", hi)} />
      </div>
      {showValues && (
        <div
          aria-hidden="true"
          className="mt-1 flex justify-between text-sm tabular-nums text-muted-foreground"
        >
          <span data-out="">{formatValue(lo)}</span>
          <span data-out="">{formatValue(hi)}</span>
        </div>
      )}
    </div>
  )
}
