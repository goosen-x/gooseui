"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SlidingNumber } from "@/registry/gooseui/ui/sliding-number"

interface SliderProps {
  /** Current value */
  value?: number
  /** Default value */
  defaultValue?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Callback when value changes */
  onValueChange?: (value: number) => void
  /** Disabled state */
  disabled?: boolean
  /** Show value label */
  showValue?: boolean
  /** Animate value with sliding numbers */
  animateValue?: boolean
  /** Value formatter for display */
  formatValue?: (value: number) => string
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Label for accessibility */
  label?: string
  /** Field name, so the value goes to FormData */
  name?: string
  className?: string
}

// The filled part of the track is painted by the thumb itself: its
// border-image stretches 100vw to the left at track height, and the input
// clips it with overflow: hidden. Firefox has ::-moz-range-progress.
// No JavaScript keeps the fill in sync, it follows the thumb natively.
const css = `
.gooseui-slider {
  --track-h: 6px;
  --thumb: 16px;
  --fill: var(--slider-fill, var(--primary));
  appearance: none;
  display: block;
  width: 100%;
  height: calc(var(--thumb) + 8px);
  margin: 0;
  overflow: hidden;
  background: transparent;
  cursor: pointer;
  outline: none;
}
.gooseui-slider[data-size="sm"] { --track-h: 4px; --thumb: 12px; }
.gooseui-slider[data-size="lg"] { --track-h: 8px; --thumb: 20px; }
.gooseui-slider:disabled { cursor: not-allowed; opacity: 0.5; }
.gooseui-slider:not(:disabled):active::-webkit-slider-thumb { cursor: grabbing; }
.gooseui-slider:not(:disabled):active::-moz-range-thumb { cursor: grabbing; }
.gooseui-slider:disabled::-webkit-slider-thumb { cursor: not-allowed; }
.gooseui-slider:disabled::-moz-range-thumb { cursor: not-allowed; }
.gooseui-slider::-webkit-slider-runnable-track {
  height: var(--track-h);
  border-radius: 9999px;
  background: var(--slider-track, var(--muted));
}
.gooseui-slider::-webkit-slider-thumb {
  appearance: none;
  cursor: grab;
  width: var(--thumb);
  height: var(--thumb);
  margin-top: calc((var(--track-h) - var(--thumb)) / 2);
  border-radius: 50%;
  background: var(--slider-thumb, var(--primary));
  box-shadow: 0 0 0 2px var(--background);
  border-image: linear-gradient(90deg, var(--fill) 50%, transparent 0) 0 1 /
    calc(50% - var(--track-h) / 2) 100vw / 0 100vw;
  transition: box-shadow 0.15s;
}
.gooseui-slider::-moz-range-track {
  height: var(--track-h);
  border-radius: 9999px;
  background: var(--slider-track, var(--muted));
}
.gooseui-slider::-moz-range-progress {
  height: var(--track-h);
  border-radius: 9999px;
  background: var(--fill);
}
.gooseui-slider::-moz-range-thumb {
  cursor: grab;
  width: var(--thumb);
  height: var(--thumb);
  border: 2px solid var(--background);
  border-radius: 50%;
  background: var(--slider-thumb, var(--primary));
  transition: box-shadow 0.15s;
}
.gooseui-slider:not(:disabled):hover::-webkit-slider-thumb {
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px color-mix(in oklab, var(--primary) 25%, transparent);
}
.gooseui-slider:not(:disabled):hover::-moz-range-thumb {
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 25%, transparent);
}
.gooseui-slider:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}
.gooseui-slider:focus-visible::-moz-range-thumb {
  box-shadow: 0 0 0 2px var(--ring);
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-slider::-webkit-slider-thumb,
  .gooseui-slider::-moz-range-thumb {
    transition: none;
  }
}
`

/**
 * Helper component to render SlidingNumber with prefix/suffix from formatValue
 */
function FormattedSlidingNumber({
  value,
  formatValue,
}: {
  value: number
  formatValue: (v: number) => string
}) {
  const formatted = formatValue(value)
  const valueStr = String(value)
  const numberIndex = formatted.indexOf(valueStr)

  if (numberIndex === -1) return <>{formatted}</>

  return (
    <>
      {formatted.slice(0, numberIndex)}
      <SlidingNumber value={value} />
      {formatted.slice(numberIndex + valueStr.length)}
    </>
  )
}

const defaultFormat = (v: number) => String(v)

/**
 * Slider
 *
 * Native <input type="range"> with styled track, thumb and fill.
 * The fill is pure CSS, the client part only mirrors the value for
 * the label and onValueChange.
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      disabled = false,
      showValue = false,
      animateValue = false,
      formatValue = defaultFormat,
      size = "md",
      label,
      name,
      className,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue,
    )
    const currentValue = value ?? internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value)
      setInternalValue(next)
      onValueChange?.(next)
    }

    return (
      <div className={cn("flex items-center gap-3", className)}>
        <style href="gooseui-slider" precedence="default">
          {css}
        </style>
        <input
          ref={ref}
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          aria-valuetext={formatValue(currentValue)}
          aria-label={label}
          data-size={size}
          className="gooseui-slider"
        />
        {showValue && (
          <span className="min-w-[3ch] text-sm font-medium tabular-nums text-muted-foreground">
            {animateValue ? (
              <FormattedSlidingNumber
                value={currentValue}
                formatValue={formatValue}
              />
            ) : (
              formatValue(currentValue)
            )}
          </span>
        )}
      </div>
    )
  },
)

Slider.displayName = "Slider"
