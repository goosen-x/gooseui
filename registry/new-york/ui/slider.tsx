"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

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
  /** Value formatter for display */
  formatValue?: (value: number) => string
  /** Size variant */
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * Slider
 *
 * Range slider input component with customizable styling.
 * Pure CSS implementation without external dependencies.
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
      formatValue = (v) => String(v),
      size = "md",
      className,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue,
    )
    const currentValue = value ?? internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    // Calculate percentage for styling
    const percentage = ((currentValue - min) / (max - min)) * 100

    const sizeStyles = {
      sm: {
        track: "h-1",
        thumb: "h-3 w-3",
      },
      md: {
        track: "h-1.5",
        thumb: "h-4 w-4",
      },
      lg: {
        track: "h-2",
        thumb: "h-5 w-5",
      },
    }

    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="relative flex-1">
          {/* Progress fill - behind input */}
          <div
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-primary",
              sizeStyles[size].track,
            )}
            style={{ width: `${percentage}%` }}
          />
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "relative w-full cursor-pointer appearance-none bg-transparent z-10",
              // Track
              "[&::-webkit-slider-runnable-track]:rounded-full",
              "[&::-webkit-slider-runnable-track]:bg-muted",
              sizeStyles[size].track &&
                `[&::-webkit-slider-runnable-track]:${sizeStyles[size].track}`,
              // Thumb
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:h-4",
              "[&::-webkit-slider-thumb]:w-4",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-primary",
              "[&::-webkit-slider-thumb]:border-2",
              "[&::-webkit-slider-thumb]:border-background",
              "[&::-webkit-slider-thumb]:shadow-sm",
              "[&::-webkit-slider-thumb]:transition-transform",
              "[&::-webkit-slider-thumb]:hover:scale-110",
              "[&::-webkit-slider-thumb]:-mt-[6px]",
              // Firefox
              "[&::-moz-range-track]:rounded-full",
              "[&::-moz-range-track]:bg-muted",
              "[&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:bg-primary",
              "[&::-moz-range-thumb]:border-2",
              "[&::-moz-range-thumb]:border-background",
              "[&::-moz-range-thumb]:border-0",
              // Disabled
              disabled && "opacity-50 cursor-not-allowed",
            )}
          />
        </div>
        {showValue && (
          <span className="min-w-[3ch] text-sm font-medium tabular-nums text-muted-foreground">
            {formatValue(currentValue)}
          </span>
        )}
      </div>
    )
  },
)

Slider.displayName = "Slider"
