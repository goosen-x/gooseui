"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SlidingNumber } from "@/registry/gooseui/ui/sliding-number"

export type QuantityUnit = {
  id: string
  label: string
  /** How many base units one of this unit holds */
  factor: number
  /** Step in this unit. Defaults to the base step divided by `factor` */
  step?: number
}

export type QuantitySliderLabels = {
  quantity: string
  decrease: string
  increase: string
  total: string
  unit: string
}

export type QuantitySliderProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  /** Quantity in base units */
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  /** Limits and step in base units */
  min?: number
  max?: number
  step?: number
  /** Price of one base unit. The total is hidden when omitted */
  unitPrice?: number
  formatTotal?: (total: number) => string
  /** Formats numbers in tick labels and aria-valuetext */
  formatValue?: (value: number) => string
  units?: QuantityUnit[]
  unit?: string
  defaultUnit?: string
  onUnitChange?: (unitId: string) => void
  /** Number of tick buttons under the slider, 0 hides them */
  ticks?: number
  disabled?: boolean
  /**
   * Form field name. Without units the number field itself carries it, so the
   * value is sent even before hydration. With units a hidden input sends the
   * amount in base units.
   */
  name?: string
  labels?: Partial<QuantitySliderLabels>
}

const defaultLabels: QuantitySliderLabels = {
  quantity: "Quantity",
  decrease: "Decrease",
  increase: "Increase",
  total: "Total",
  unit: "Unit",
}

// The fill is painted by the thumb itself: a border-image band with a 100vw
// outset to the left, clipped by the input. No width math in JavaScript.
const thumb =
  "appearance:none;box-sizing:border-box;width:22px;height:22px;border:3px solid var(--background);border-radius:50%;background:var(--primary);box-shadow:0 2px 6px rgb(0 0 0/.2);cursor:grab;border-image:linear-gradient(90deg,var(--primary) 50%,transparent 0) 0 1/7px 100vw/0 100vw"
const styles = `
.gooseui-quantity-slider input[type=range]{width:100%;height:22px;margin:0;appearance:none;background:linear-gradient(var(--muted) 0 0) center/100% 8px no-repeat;border-radius:9999px;overflow:hidden;outline:none;cursor:pointer}
.gooseui-quantity-slider input[type=range]::-webkit-slider-runnable-track{height:100%;background:none}
.gooseui-quantity-slider input[type=range]::-moz-range-track{background:none}
.gooseui-quantity-slider input[type=range]::-webkit-slider-thumb{${thumb}}
.gooseui-quantity-slider input[type=range]::-moz-range-thumb{${thumb}}
.gooseui-quantity-slider input[type=range]:active::-webkit-slider-thumb,.gooseui-quantity-slider input[type=range]:active::-moz-range-thumb{cursor:grabbing}
.gooseui-quantity-slider input[type=range]:disabled,.gooseui-quantity-slider input[type=range]:disabled::-webkit-slider-thumb,.gooseui-quantity-slider input[type=range]:disabled::-moz-range-thumb{cursor:not-allowed}
.gooseui-quantity-slider input[type=range]:focus-visible::-webkit-slider-thumb{border-color:var(--ring)}
.gooseui-quantity-slider input[type=range]:focus-visible::-moz-range-thumb{border-color:var(--ring)}
`

const clean = (n: number) => Math.round(n * 1e6) / 1e6
const positive = (n?: number) => (n && n > 0 && Number.isFinite(n) ? n : 0)

const defaultFormatValue = (v: number) =>
  v.toLocaleString("en-US", { maximumFractionDigits: 3 })
const defaultFormatTotal = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD" })

function Icon({ plus }: { plus?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d={plus ? "M5 12h14M12 5v14" : "M5 12h14"} />
    </svg>
  )
}

/**
 * Number field and slider on native inputs. Client code keeps the two in
 * sync, converts units and counts the total; the field submits on its own.
 */
export function QuantitySlider({
  value: valueProp,
  defaultValue,
  onValueChange,
  min = 1,
  max = 100,
  step: stepProp = 1,
  unitPrice,
  formatTotal = defaultFormatTotal,
  formatValue = defaultFormatValue,
  units,
  unit: unitProp,
  defaultUnit,
  onUnitChange,
  ticks = 5,
  disabled = false,
  name,
  labels: labelsProp,
  className,
  ...rest
}: QuantitySliderProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const step = positive(stepProp) || 1
  const id = React.useId()

  const [inner, setInner] = React.useState(defaultValue ?? min)
  const value = valueProp ?? inner
  const [innerUnit, setInnerUnit] = React.useState(
    defaultUnit ?? units?.[0]?.id,
  )
  const [draft, setDraft] = React.useState<string | null>(null)

  // Everything the user sees is in the selected unit
  const scale = (u?: QuantityUnit) => {
    const f = u?.factor ?? 1
    const s = positive(u?.step) || step / f
    const lo = clean(Math.ceil(min / f / s - 1e-9) * s)
    const hi = Math.max(lo, clean(Math.floor(max / f / s + 1e-9) * s))
    const snap = (v: number) =>
      Math.max(lo, Math.min(hi, clean(Math.round(v / s) * s)))
    return { f, s, lo, hi, snap }
  }
  const unit =
    units?.find((u) => u.id === (unitProp ?? innerUnit)) ?? units?.[0]
  const { f, s, lo, hi, snap } = scale(unit)
  const shown = clean(value / f)
  // Field width fits the longest value across every unit, so nothing shifts
  const fieldCh =
    Math.max(
      2,
      ...(units?.length ? units : [undefined]).flatMap((u) => {
        const r = scale(u)
        return [String(r.lo).length, String(r.hi).length]
      }),
    ) + 1

  const commit = (base: number) => {
    const next = clean(Math.max(min, Math.min(max, base)))
    if (valueProp === undefined) setInner(next)
    if (next !== value) onValueChange?.(next)
  }
  const setShown = (v: number) => commit(snap(v) * f)

  const span = hi - lo || 1
  const tickValues =
    ticks > 1
      ? [
          ...new Set(
            Array.from({ length: ticks }, (_, i) =>
              snap(lo + (span * i) / (ticks - 1)),
            ),
          ),
        ]
      : []
  const total = unitPrice !== undefined ? formatTotal(unitPrice * value) : null

  const button =
    "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"

  return (
    <div
      className={cn(
        "gooseui-quantity-slider w-full space-y-4",
        disabled && "opacity-60",
        className,
      )}
      {...rest}
    >
      <style href="gooseui-quantity-slider" precedence="default">
        {styles}
      </style>

      {units && units.length > 1 && (
        <div
          role="radiogroup"
          aria-label={labels.unit}
          className="inline-flex rounded-md border bg-muted p-0.5"
        >
          {units.map((u) => (
            <label
              key={u.id}
              className="cursor-pointer rounded-sm px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground has-[:checked]:bg-background has-[:checked]:text-foreground has-[:checked]:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:disabled]:cursor-not-allowed"
            >
              <input
                type="radio"
                name={`${id}-unit`}
                form={`${id}-none`}
                value={u.id}
                checked={u.id === unit?.id}
                disabled={disabled}
                onChange={() => {
                  if (unitProp === undefined) setInnerUnit(u.id)
                  onUnitChange?.(u.id)
                  setDraft(null)
                  // Keep the same amount, snapped to the new unit's step
                  const next = scale(u)
                  commit(next.snap(value / next.f) * next.f)
                }}
                className="sr-only"
              />
              {u.label}
            </label>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1.5">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-muted-foreground"
          >
            {labels.quantity}
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={labels.decrease}
              aria-controls={id}
              disabled={disabled || shown <= lo}
              onClick={() => setShown(shown - s)}
              className={button}
            >
              <Icon />
            </button>
            <div className="flex h-10 shrink-0 items-center gap-1.5 rounded-md border bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
              <input
                id={id}
                type="number"
                name={units ? undefined : name}
                min={lo}
                max={hi}
                step={s}
                disabled={disabled}
                value={draft ?? String(shown)}
                onChange={(e) => {
                  setDraft(e.target.value)
                  const n = e.target.valueAsNumber
                  if (n >= lo && n <= hi) commit(n * f)
                }}
                onBlur={(e) => {
                  setDraft(null)
                  const n = e.target.valueAsNumber
                  if (Number.isFinite(n)) setShown(n)
                }}
                style={{
                  width: `${Math.max(fieldCh, (draft ?? "").length + 1)}ch`,
                }}
                className="min-w-0 bg-transparent text-center text-lg font-medium tabular-nums outline-none [appearance:textfield] disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none"
              />
              {unit && (
                <span className="inline-grid text-sm text-muted-foreground">
                  {(units ?? []).map((u) => (
                    <span
                      key={u.id}
                      className={cn(
                        "col-start-1 row-start-1",
                        u.id !== unit.id && "invisible",
                      )}
                      aria-hidden={u.id !== unit.id}
                    >
                      {u.label}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <button
              type="button"
              aria-label={labels.increase}
              aria-controls={id}
              disabled={disabled || shown >= hi}
              onClick={() => setShown(shown + s)}
              className={button}
            >
              <Icon plus />
            </button>
          </div>
        </div>

        {total !== null && (
          <div className="text-right" aria-live="polite">
            <div className="text-xs text-muted-foreground">{labels.total}</div>
            <SlidingNumber
              value={(unitPrice ?? 0) * value}
              text={total}
              className="text-2xl font-semibold"
            />
          </div>
        )}
      </div>

      <div>
        <input
          type="range"
          aria-label={labels.quantity}
          aria-valuetext={`${formatValue(shown)}${unit ? ` ${unit.label}` : ""}`}
          min={lo}
          max={hi}
          step={s}
          value={Math.min(hi, Math.max(lo, shown))}
          disabled={disabled}
          onChange={(e) => setShown(e.target.valueAsNumber)}
          className="block disabled:cursor-not-allowed"
        />
        {tickValues.length > 0 && (
          <div className="relative mt-2 h-5 text-xs text-muted-foreground">
            {tickValues.map((t, i) => {
              const p = ((t - lo) / span) * 100
              return (
                <button
                  key={t}
                  type="button"
                  disabled={disabled}
                  tabIndex={-1}
                  onClick={() => setShown(t)}
                  className="absolute cursor-pointer whitespace-nowrap tabular-nums transition-colors hover:text-foreground disabled:cursor-not-allowed"
                  style={{
                    left: `calc(${p}% + ${((0.5 - p / 100) * 22).toFixed(2)}px)`,
                    translate:
                      i === 0
                        ? "-25%"
                        : i === tickValues.length - 1
                          ? "-75%"
                          : "-50%",
                  }}
                >
                  {formatValue(t)}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {name && units && <input type="hidden" name={name} value={value} />}
    </div>
  )
}
