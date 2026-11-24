import * as React from "react"
import { cn } from "@/lib/utils"

const variants = {
  default: "[--checkbox-checked:var(--primary)]",
  destructive: "[--checkbox-checked:var(--destructive)]",
  // No success token in shadcn themes, so this one keeps a fixed green
  success: "[--checkbox-checked:#22c55e]",
} as const

const sizes = {
  sm: "[--checkbox-size:1rem]",
  default: "[--checkbox-size:1.5rem]",
  lg: "[--checkbox-size:2rem]",
} as const

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: keyof typeof variants | null
  size?: keyof typeof sizes | null
  label?: string
}

/**
 * Native checkbox with a drawn check mark. The box turns into a tick through
 * an SVG stroke animation on :checked, so it needs no JavaScript.
 */
export function Checkbox({
  className,
  variant,
  size,
  label,
  id,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId()
  const inputId = id || generatedId

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex cursor-pointer select-none items-center gap-2 [--checkbox-unchecked:var(--border)]",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
        variants[variant ?? "default"],
        sizes[size ?? "default"],
        className,
      )}
    >
      <input id={inputId} type="checkbox" className="peer sr-only" {...props} />
      <svg
        aria-hidden="true"
        className="size-(--checkbox-size) shrink-0 overflow-visible rounded-[22%] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring"
        viewBox="0 0 64 64"
      >
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          className={cn(
            "fill-none stroke-[6] [stroke-linecap:round] [stroke-linejoin:round]",
            "transition-[stroke,stroke-dasharray,stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none",
            "[stroke-dasharray:241_9999999] [stroke-dashoffset:0]",
            "stroke-(--checkbox-unchecked)",
            "group-has-[:checked]:stroke-(--checkbox-checked)",
            "group-has-[:checked]:[stroke-dasharray:70.5096664428711_9999999]",
            "group-has-[:checked]:[stroke-dashoffset:-262.2723388671875]",
          )}
        />
      </svg>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  )
}
