import * as React from "react"
import { cn } from "@/lib/utils"

export type RatingShape = "star" | "sparkle"
export type RatingSize = "sm" | "md" | "lg"

export type RatingLabels = {
  /** Accessible name of the whole rating */
  group: string
  /** Accessible name of a single option in interactive mode */
  item: (value: number, max: number) => string
  /** Screen reader text in read-only mode */
  summary: (value: number, max: number) => string
  /** Accessible name of the "no rating" option added by allowClear */
  clear: string
}

export type RatingProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  value?: number | null
  defaultValue?: number | null
  /**
   * Called with the new score, or null after clearing.
   * Works when Rating is rendered inside a client component.
   */
  onValueChange?: (value: number | null) => void
  max?: number
  size?: RatingSize
  shape?: RatingShape
  readOnly?: boolean
  disabled?: boolean
  /** Name of the radio group, so the score is sent with a form */
  name?: string
  /** The form must have a score before it can be sent */
  required?: boolean
  /** Clicking the selected star again clears the rating */
  allowClear?: boolean
  labels?: Partial<RatingLabels>
}

const defaultLabels: RatingLabels = {
  group: "Rating",
  item: (value, max) => `${value} of ${max}`,
  summary: (value, max) => `Rated ${Number(value.toFixed(1))} out of ${max}`,
  clear: "No rating",
}

const sizeClass: Record<RatingSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
}

// Star polygon centred in a 24×24 box with the first point facing up.
function polygon(points: number, outer: number, inner: number) {
  const coords: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const angle = (Math.PI / points) * i - Math.PI / 2
    coords.push(
      `${(12 + r * Math.cos(angle)).toFixed(2)},${(12 + r * Math.sin(angle)).toFixed(2)}`,
    )
  }
  return coords.join(" ")
}

const SHAPES: Record<RatingShape, string> = {
  star: polygon(5, 10.5, 4.4),
  sparkle: polygon(8, 10.5, 5),
}

// One keyframes name per score: switching 3 → 4 changes the name on every
// lit star, which restarts the flash without any JavaScript.
const POP_NAMES = 10
const popFrames = "0%{scale:1}35%{scale:1.35}65%{scale:.9}100%{scale:1}"

const R = ".gooseui-rating"
// :where keeps specificity low, so the hover preview below can override it
const lit = (state: string) =>
  `${R} :where(.gr-cell:has(${state}),.gr-cell:has(~ .gr-cell ${state}))`

const styles = `
${Array.from({ length: POP_NAMES }, (_, i) => `@keyframes gooseui-rating-pop-${i + 1}{${popFrames}}`).join("\n")}
@keyframes gooseui-rating-ring{0%{scale:.4;opacity:.7;stroke-width:5px}100%{scale:1.7;opacity:0;stroke-width:0}}
${R}{--gr-pop:gooseui-rating-pop-1}
${Array.from({ length: POP_NAMES }, (_, i) => `${R}:has(input[value="${i + 1}"]:checked){--gr-pop:gooseui-rating-pop-${i + 1}}`).join("\n")}
${R} .gr-star{color:color-mix(in oklab,var(--muted-foreground) 40%,transparent);transition:color 150ms,opacity 150ms}
${R} .gr-shape,${R} .gr-ring{transform-box:fill-box;transform-origin:center}
${R} .gr-shape{fill:transparent;transition:fill 150ms}
${R} .gr-ring{display:none}
${lit(":checked")} .gr-star{color:inherit}
${lit(":checked")} .gr-shape{fill:currentColor}
${R} .gr-star:has(:focus-visible){outline:2px solid var(--ring);outline-offset:1px}
${R}:has(.gr-clear:focus-visible){outline:2px solid var(--ring);outline-offset:2px;border-radius:4px}
${R} .gr-unset{display:none}
${R} .gr-cell:has(:checked) .gr-unset{display:block}
@media (hover:hover){
  ${R}:not([data-disabled]):hover .gr-star{color:color-mix(in oklab,var(--muted-foreground) 40%,transparent)}
  ${R}:not([data-disabled]):hover .gr-shape{fill:transparent}
  ${R}:not([data-disabled]):hover .gr-cell:is(:hover,:has(~ .gr-cell:hover)) .gr-star{color:inherit;opacity:.8}
  ${R}:not([data-disabled]):hover .gr-cell:is(:hover,:has(~ .gr-cell:hover)) .gr-shape{fill:currentColor}
}
@media (prefers-reduced-motion:no-preference){
  ${lit(":checked:user-valid")} .gr-shape{animation:var(--gr-pop) 450ms ease-out both;animation-delay:calc(var(--gr-i) * 60ms)}
  ${R} .gr-cell:has(:checked:user-valid) .gr-ring{display:block;animation:gooseui-rating-ring 700ms ease-out both;animation-delay:calc(var(--gr-i) * 60ms)}
}
`

function ShapeIcon({
  shape,
  className,
  filled,
}: {
  shape: RatingShape
  className?: string
  filled: boolean
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("overflow-visible", className)}
    >
      <polygon
        points={SHAPES[shape]}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ReadOnlyRating({
  value,
  max,
  size,
  shape,
  labels,
  className,
  ...rest
}: Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  value: number
  max: number
  size: RatingSize
  shape: RatingShape
  labels: RatingLabels
}) {
  const clamped = Math.max(0, Math.min(max, value))
  return (
    <div
      role="img"
      aria-label={labels.summary(clamped, max)}
      className={cn("inline-flex items-center gap-0.5 text-primary", className)}
      {...rest}
    >
      {Array.from({ length: max }, (_, i) => {
        const fraction = Math.max(0, Math.min(1, clamped - i))
        return (
          <span
            key={i}
            className={cn("relative inline-block", sizeClass[size])}
          >
            <ShapeIcon
              shape={shape}
              filled={false}
              className="absolute inset-0 size-full text-muted-foreground/40"
            />
            <span
              className="absolute inset-y-0 left-0 overflow-hidden motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-out"
              style={{ width: `${fraction * 100}%` }}
            >
              <ShapeIcon
                shape={shape}
                filled
                className={cn("block", sizeClass[size])}
              />
            </span>
          </span>
        )
      })}
    </div>
  )
}

/**
 * Star rating on native radio inputs. Hover preview, fill and the flash on
 * selection are plain CSS, so it works in Server Components and without JS.
 */
export function Rating({
  value,
  defaultValue,
  onValueChange,
  max = 5,
  size = "md",
  shape = "star",
  readOnly = false,
  disabled = false,
  name,
  required,
  allowClear = false,
  labels: labelsProp,
  className,
  ...rest
}: RatingProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const id = React.useId()

  if (readOnly) {
    return (
      <ReadOnlyRating
        value={value ?? defaultValue ?? 0}
        max={max}
        size={size}
        shape={shape}
        labels={labels}
        className={className}
        {...rest}
      />
    )
  }

  // Controlled only with a handler, otherwise value is just the start state
  const controlled = value !== undefined && onValueChange !== undefined
  const initial = value !== undefined ? value : (defaultValue ?? null)
  const state = (n: number | null) =>
    controlled ? { checked: value === n } : { defaultChecked: initial === n }
  const input = (n: number | null) => ({
    type: "radio" as const,
    name: name ?? `gooseui-rating${id}`,
    // Without a name the group stays out of any surrounding form
    form: name ? undefined : `${id}-none`,
    value: n ?? "",
    disabled,
    required,
    onChange: onValueChange ? () => onValueChange(n) : undefined,
    ...state(n),
  })
  const clearId = `${id}-clear`

  return (
    <div
      role="radiogroup"
      aria-label={labels.group}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "gooseui-rating inline-flex items-center text-primary",
        disabled && "opacity-50",
        className,
      )}
      {...rest}
    >
      <style href="gooseui-rating" precedence="default">
        {styles}
      </style>
      {allowClear && (
        <input
          {...input(null)}
          id={clearId}
          aria-label={labels.clear}
          className="gr-clear sr-only"
        />
      )}
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1
        return (
          <span
            key={n}
            className="gr-cell relative inline-flex"
            style={{ "--gr-i": i } as React.CSSProperties}
          >
            <label
              className={cn(
                "gr-star inline-flex rounded-sm p-0.5",
                disabled ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              <input
                {...input(n)}
                aria-label={labels.item(n, max)}
                className="sr-only"
              />
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={cn("overflow-visible", sizeClass[size])}
              >
                <circle
                  cx={12}
                  cy={12}
                  r={10}
                  fill="none"
                  stroke="currentColor"
                  className="gr-ring"
                />
                <polygon
                  points={SHAPES[shape]}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  className="gr-shape"
                />
              </svg>
            </label>
            {allowClear && !disabled && (
              // Covers the selected star: a second click picks "no rating"
              <label
                htmlFor={clearId}
                aria-hidden="true"
                className="gr-unset absolute inset-0 cursor-pointer"
              />
            )}
          </span>
        )
      })}
    </div>
  )
}
