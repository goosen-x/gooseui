"use client"

import * as React from "react"

export type CompareSliderInputProps = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "step" | "onChange"
> & {
  value?: number
  defaultValue: number
  step: number
  vertical: boolean
  onPositionChange?: (position: number) => void
}

const clamp = (value: number) => Math.min(100, Math.max(0, value))

/**
 * The only client part of CompareSlider: a native range input that writes
 * its value into the --compare-slider-pos custom property of the root.
 */
export function CompareSliderInput({
  value,
  defaultValue,
  step,
  vertical,
  onPositionChange,
  onKeyDown,
  ...props
}: CompareSliderInputProps) {
  const ref = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    ref.current?.parentElement?.setAttribute("data-ready", "")
  }, [])

  const apply = (input: HTMLInputElement, next: number) => {
    const position = clamp(next)
    // Controlled: the parent re-renders the root with the new position
    if (value === undefined) {
      input.value = String(position)
      input.parentElement?.style.setProperty(
        "--compare-slider-pos",
        `${position}%`,
      )
    }
    onPositionChange?.(position)
  }

  return (
    <input
      {...props}
      ref={ref}
      type="range"
      min={0}
      max={100}
      step="any"
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined}
      onChange={(event) =>
        apply(event.currentTarget, Number(event.currentTarget.value))
      }
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        const current = Number(event.currentTarget.value)
        // Vertical ranges grow downward, horizontal ones to the right
        const keys: Record<string, number> = {
          ArrowRight: step,
          ArrowLeft: -step,
          ArrowUp: vertical ? -step : step,
          ArrowDown: vertical ? step : -step,
          PageUp: step * 2,
          PageDown: -step * 2,
        }
        const delta = keys[event.key]
        if (delta === undefined) return
        event.preventDefault()
        apply(event.currentTarget, current + delta)
      }}
      className={`${props.className ?? ""} ${vertical ? "cursor-ns-resize" : "cursor-ew-resize"}`}
    />
  )
}
