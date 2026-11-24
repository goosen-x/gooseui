"use client"

import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-[color-mix(in_oklab,var(--primary)_94%,black)] dark:data-[state=on]:hover:bg-[color-mix(in_oklab,var(--primary)_84%,var(--foreground))] data-[state=on]:hover:text-primary-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,background-color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Toggle({
  className,
  variant,
  size,
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  ...props
}: Omit<React.ComponentProps<"button">, "onChange"> & {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
} & VariantProps<typeof toggleVariants>) {
  const [internal, setInternal] = React.useState(defaultPressed)
  const active = pressed ?? internal
  return (
    <button
      type="button"
      aria-pressed={active}
      data-state={active ? "on" : "off"}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          if (pressed === undefined) setInternal(!active)
          onPressedChange?.(!active)
        }
      }}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
