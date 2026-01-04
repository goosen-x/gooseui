"use client"

import { AnimatedCheckbox } from "@/registry/new-york/ui/animated-checkbox"

export function AnimatedCheckboxPreview() {
  return (
    <div className="flex items-center justify-center rounded-lg border p-8 min-h-[150px]">
      <AnimatedCheckbox label="Accept terms and conditions" />
    </div>
  )
}

export function AnimatedCheckboxVariants() {
  return (
    <div className="flex flex-col gap-4">
      <AnimatedCheckbox variant="default" label="Default variant" />
      <AnimatedCheckbox variant="destructive" label="Destructive variant" />
      <AnimatedCheckbox variant="success" label="Success variant" />
    </div>
  )
}

export function AnimatedCheckboxSizes() {
  return (
    <div className="flex flex-col gap-4">
      <AnimatedCheckbox size="sm" label="Small size" />
      <AnimatedCheckbox size="default" label="Default size" />
      <AnimatedCheckbox size="lg" label="Large size" />
    </div>
  )
}

export function AnimatedCheckboxWithoutLabel() {
  return (
    <div className="flex items-center gap-4">
      <AnimatedCheckbox size="sm" />
      <AnimatedCheckbox size="default" />
      <AnimatedCheckbox size="lg" />
    </div>
  )
}
