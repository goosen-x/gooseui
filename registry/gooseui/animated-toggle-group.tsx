"use client"

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const animatedToggleGroupVariants = cva(
  "relative flex flex-wrap rounded-lg bg-muted p-1 text-sm",
  {
    variants: {
      size: {
        default: "h-10",
        sm: "h-9 text-xs",
        lg: "h-11",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const animatedToggleGroupItemVariants = cva(
  [
    "relative flex flex-1 cursor-pointer items-center justify-center rounded-md px-3 py-1.5",
    "text-muted-foreground transition-all duration-150 ease-in-out",
    "hover:bg-background/50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    // Active state
    "data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:font-semibold",
    "data-[state=on]:shadow-sm data-[state=on]:hover:bg-background",
    // Animation on select
    "data-[state=on]:animate-toggle-select",
    // Particles
    "data-[state=on]:before:absolute data-[state=on]:before:left-1/2 data-[state=on]:before:top-[-8px]",
    "data-[state=on]:before:size-1 data-[state=on]:before:-translate-x-1/2 data-[state=on]:before:rounded-full",
    "data-[state=on]:before:bg-primary data-[state=on]:before:animate-particle-up",
    "data-[state=on]:after:absolute data-[state=on]:after:left-1/2 data-[state=on]:after:bottom-[-8px]",
    "data-[state=on]:after:size-1 data-[state=on]:after:-translate-x-1/2 data-[state=on]:after:rounded-full",
    "data-[state=on]:after:bg-primary data-[state=on]:after:animate-particle-down",
  ],
  {
    variants: {
      size: {
        default: "text-sm",
        sm: "text-xs px-2",
        lg: "text-base px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type AnimatedToggleGroupContextValue = VariantProps<
  typeof animatedToggleGroupItemVariants
>

const AnimatedToggleGroupContext =
  React.createContext<AnimatedToggleGroupContextValue>({
    size: "default",
  })

function AnimatedToggleGroup({
  className,
  size,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof animatedToggleGroupVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="animated-toggle-group"
      className={cn(animatedToggleGroupVariants({ size, className }))}
      {...props}
    >
      <AnimatedToggleGroupContext.Provider value={{ size }}>
        {children}
      </AnimatedToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function AnimatedToggleGroupItem({
  className,
  children,
  size,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof animatedToggleGroupItemVariants>) {
  const context = React.useContext(AnimatedToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="animated-toggle-group-item"
      className={cn(
        animatedToggleGroupItemVariants({ size: size || context.size }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { AnimatedToggleGroup, AnimatedToggleGroupItem }
