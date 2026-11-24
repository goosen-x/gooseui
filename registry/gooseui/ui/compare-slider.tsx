import type * as React from "react"
import { cn } from "@/lib/utils"
import { CompareSliderInput } from "@/registry/gooseui/ui/compare-slider-input"

export type CompareSliderOrientation = "horizontal" | "vertical"

export type CompareSliderProps = Omit<
  React.ComponentProps<"div">,
  "children" | "defaultValue" | "onChange"
> & {
  /** Layer shown on the start side (left or top) of the divider */
  before: React.ReactNode
  /** Layer shown on the end side (right or bottom) of the divider */
  after: React.ReactNode
  /** Initial divider position in percent (uncontrolled) */
  defaultPosition?: number
  /** Divider position in percent (controlled, from a client component) */
  position?: number
  /** Called with the new position in percent (from a client component) */
  onPositionChange?: (position: number) => void
  orientation?: CompareSliderOrientation
  /** Draw a checkerboard under both layers to reveal transparent areas */
  checkerboard?: boolean
  /** Badge text over the "before" layer */
  beforeLabel?: React.ReactNode
  /** Badge text over the "after" layer */
  afterLabel?: React.ReactNode
  /** Keyboard step in percent */
  step?: number
  /** Accessible name of the range input */
  sliderLabel?: string
  /** Turn off the smoothing transition and follow the pointer instantly */
  instant?: boolean
  /** Form field name: the position is submitted with the form */
  name?: string
}

const CHECKERBOARD: React.CSSProperties = {
  backgroundImage:
    "conic-gradient(var(--muted) 25%, var(--background) 0 50%, var(--muted) 0 75%, var(--background) 0)",
  backgroundSize: "16px 16px",
}

// The position lives in a registered custom property, so it can transition
const STYLES = `
@property --compare-slider-pos {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 50%;
}
.gooseui-compare-slider { transition: --compare-slider-pos 160ms ease-out; }
.gooseui-compare-slider[data-instant] { transition: none; }
.gooseui-compare-slider-input {
  appearance: none;
  background: transparent;
  margin: 0;
  opacity: 0;
}
/* A 1px thumb maps the value to the pointer exactly, edge to edge */
.gooseui-compare-slider-input::-webkit-slider-thumb { appearance: none; width: 1px; height: 36px; }
.gooseui-compare-slider-input::-moz-range-thumb { width: 1px; height: 36px; border: 0; }
.gooseui-compare-slider[data-orientation="vertical"] .gooseui-compare-slider-input {
  writing-mode: vertical-lr;
}
.gooseui-compare-slider[data-orientation="vertical"] .gooseui-compare-slider-input::-webkit-slider-thumb { width: 36px; height: 1px; }
.gooseui-compare-slider[data-orientation="vertical"] .gooseui-compare-slider-input::-moz-range-thumb { width: 36px; height: 1px; }
.gooseui-compare-slider:has(.gooseui-compare-slider-input:focus-visible) .gooseui-compare-slider-handle {
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 60%, transparent);
}
.gooseui-compare-slider:not([data-ready]) .gooseui-compare-slider-input { visibility: hidden; }
.gooseui-compare-slider:not([data-ready]) { cursor: default; }
@media (prefers-reduced-motion: reduce) {
  .gooseui-compare-slider { transition: none; }
}
`

const clamp = (value: number) => Math.min(100, Math.max(0, value))

const layerClass =
  "absolute inset-0 [&_img]:pointer-events-none [&_img]:h-full [&_img]:w-full [&_img]:object-cover"

function GripIcon({ vertical }: { vertical: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-4", vertical && "rotate-90")}
    >
      <circle cx="9" cy="5" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="15" cy="5" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="15" cy="19" r="1.5" />
    </svg>
  )
}

export function CompareSlider({
  before,
  after,
  defaultPosition = 50,
  position,
  onPositionChange,
  orientation = "horizontal",
  checkerboard = false,
  beforeLabel,
  afterLabel,
  step = 5,
  sliderLabel = "Comparison divider",
  instant = false,
  name,
  className,
  style,
  ...props
}: CompareSliderProps) {
  const current = clamp(position ?? defaultPosition)
  const isHorizontal = orientation === "horizontal"
  const layerStyle = checkerboard ? CHECKERBOARD : undefined

  return (
    <div
      {...props}
      data-slot="compare-slider"
      data-orientation={orientation}
      data-instant={instant || undefined}
      className={cn(
        "gooseui-compare-slider relative isolate aspect-video w-full select-none overflow-hidden rounded-lg border bg-muted",
        isHorizontal
          ? "cursor-ew-resize touch-pan-y"
          : "cursor-ns-resize touch-pan-x",
        className,
      )}
      style={
        {
          ...style,
          "--compare-slider-pos": `${current}%`,
        } as React.CSSProperties
      }
    >
      <style href="gooseui-compare-slider" precedence="default">
        {STYLES}
      </style>
      <div
        className={cn(layerClass, !checkerboard && "bg-muted")}
        style={layerStyle}
      >
        {after}
      </div>

      <div
        className={cn(layerClass, !checkerboard && "bg-muted")}
        style={{
          ...layerStyle,
          clipPath: isHorizontal
            ? "inset(0 calc(100% - var(--compare-slider-pos)) 0 0)"
            : "inset(0 0 calc(100% - var(--compare-slider-pos)) 0)",
        }}
      >
        {before}
      </div>

      {beforeLabel ? (
        <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-background/80 px-2.5 py-1 font-medium text-foreground text-xs shadow-sm backdrop-blur">
          {beforeLabel}
        </span>
      ) : null}
      {afterLabel ? (
        <span
          className={cn(
            "pointer-events-none absolute z-10 rounded-full bg-background/80 px-2.5 py-1 font-medium text-foreground text-xs shadow-sm backdrop-blur",
            isHorizontal ? "top-3 right-3" : "bottom-3 left-3",
          )}
        >
          {afterLabel}
        </span>
      ) : null}

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-20 bg-background shadow-[0_0_0_1px_rgb(0_0_0/0.15)]",
          isHorizontal
            ? "inset-y-0 left-(--compare-slider-pos) w-0.5 -translate-x-1/2"
            : "inset-x-0 top-(--compare-slider-pos) h-0.5 -translate-y-1/2",
        )}
      />

      <div
        aria-hidden
        className={cn(
          "gooseui-compare-slider-handle pointer-events-none absolute z-30 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background text-foreground shadow-md",
          isHorizontal
            ? "top-1/2 left-(--compare-slider-pos)"
            : "top-(--compare-slider-pos) left-1/2",
        )}
      >
        <GripIcon vertical={!isHorizontal} />
      </div>

      <CompareSliderInput
        className="gooseui-compare-slider-input absolute inset-0 z-40 size-full"
        value={position}
        defaultValue={current}
        onPositionChange={onPositionChange}
        step={step}
        name={name}
        aria-label={sliderLabel}
        aria-orientation={orientation}
        vertical={!isHorizontal}
      />
    </div>
  )
}
