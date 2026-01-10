"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SlidingNumber } from "@/registry/new-york/ui/sliding-number"

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
  className?: string
}

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

  // Find where the number appears in the formatted string
  const numberIndex = formatted.indexOf(valueStr)

  if (numberIndex === -1) {
    // If exact number not found (e.g., decimal formatting), just show formatted
    return <>{formatted}</>
  }

  const prefix = formatted.slice(0, numberIndex)
  const suffix = formatted.slice(numberIndex + valueStr.length)

  return (
    <>
      {prefix}
      <SlidingNumber value={value} />
      {suffix}
    </>
  )
}

/**
 * Slider
 *
 * Range slider input component with customizable styling.
 * Pure CSS implementation without external dependencies.
 *
 * @see https://www.smashingmagazine.com/2021/12/create-custom-range-input-consistent-browsers/
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/::-moz-range-progress
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
      formatValue = (v) => String(v),
      size = "md",
      label,
      className,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue,
    )
    const currentValue = value ?? internalValue
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Merge refs
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    // Calculate percentage for gradient background (Chrome/Safari)
    const percentage = ((currentValue - min) / (max - min)) * 100

    // Update CSS custom property for gradient
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.style.setProperty(
          "--slider-progress",
          `${percentage}%`,
        )
      }
    }, [percentage])

    return (
      <div className={cn("flex items-center gap-3", className)}>
        <input
          ref={inputRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          // ARIA attributes for accessibility
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-valuetext={formatValue(currentValue)}
          aria-label={label}
          className={cn(
            "relative w-full cursor-pointer appearance-none bg-transparent",
            // Track - WebKit (Chrome, Safari, Edge)
            "[&::-webkit-slider-runnable-track]:rounded-full",
            "[&::-webkit-slider-runnable-track]:bg-muted",
            // Progress fill via gradient (WebKit)
            "[&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,hsl(var(--primary))_var(--slider-progress,0%),hsl(var(--muted))_var(--slider-progress,0%))]",
            // Thumb - WebKit
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:border-2",
            "[&::-webkit-slider-thumb]:border-background",
            "[&::-webkit-slider-thumb]:shadow-sm",
            "[&::-webkit-slider-thumb]:transition-all",
            "[&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-webkit-slider-thumb]:hover:shadow-[0_0_0_4px_hsl(var(--primary)/0.1)]",
            // Focus styles - WebKit
            "[&:focus-visible]:outline-none",
            "[&:focus-visible::-webkit-slider-thumb]:ring-2",
            "[&:focus-visible::-webkit-slider-thumb]:ring-ring",
            "[&:focus-visible::-webkit-slider-thumb]:ring-offset-2",
            "[&:focus-visible::-webkit-slider-thumb]:ring-offset-background",
            // Track - Firefox
            "[&::-moz-range-track]:rounded-full",
            "[&::-moz-range-track]:bg-muted",
            // Progress fill - Firefox (native support!)
            "[&::-moz-range-progress]:rounded-full",
            "[&::-moz-range-progress]:bg-primary",
            // Thumb - Firefox
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-primary",
            "[&::-moz-range-thumb]:border-2",
            "[&::-moz-range-thumb]:border-background",
            "[&::-moz-range-thumb]:shadow-sm",
            "[&::-moz-range-thumb]:transition-all",
            "[&::-moz-range-thumb]:hover:scale-110",
            // Focus styles - Firefox
            "[&:focus-visible::-moz-range-thumb]:ring-2",
            "[&:focus-visible::-moz-range-thumb]:ring-ring",
            "[&:focus-visible::-moz-range-thumb]:ring-offset-2",
            // Size variants - must be static classes for Tailwind
            size === "sm" && [
              "[&::-webkit-slider-runnable-track]:h-1",
              "[&::-webkit-slider-thumb]:h-3",
              "[&::-webkit-slider-thumb]:w-3",
              "[&::-webkit-slider-thumb]:-mt-1",
              "[&::-moz-range-track]:h-1",
              "[&::-moz-range-progress]:h-1",
              "[&::-moz-range-thumb]:h-3",
              "[&::-moz-range-thumb]:w-3",
            ],
            size === "md" && [
              "[&::-webkit-slider-runnable-track]:h-1.5",
              "[&::-webkit-slider-thumb]:h-4",
              "[&::-webkit-slider-thumb]:w-4",
              "[&::-webkit-slider-thumb]:-mt-[5px]",
              "[&::-moz-range-track]:h-1.5",
              "[&::-moz-range-progress]:h-1.5",
              "[&::-moz-range-thumb]:h-4",
              "[&::-moz-range-thumb]:w-4",
            ],
            size === "lg" && [
              "[&::-webkit-slider-runnable-track]:h-2",
              "[&::-webkit-slider-thumb]:h-5",
              "[&::-webkit-slider-thumb]:w-5",
              "[&::-webkit-slider-thumb]:-mt-1.5",
              "[&::-moz-range-track]:h-2",
              "[&::-moz-range-progress]:h-2",
              "[&::-moz-range-thumb]:h-5",
              "[&::-moz-range-thumb]:w-5",
            ],
            // Disabled state
            disabled && "opacity-50 cursor-not-allowed",
          )}
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
