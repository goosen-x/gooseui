"use client"

import { Checkbox } from "@/registry/new-york/ui/checkbox"

export function CheckboxPreview() {
  return (
    <div className="flex items-center justify-center rounded-lg border p-8 min-h-[150px]">
      <Checkbox label="Accept terms and conditions" />
    </div>
  )
}

export function CheckboxVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox variant="default" label="Default variant" />
      <Checkbox variant="destructive" label="Destructive variant" />
      <Checkbox variant="success" label="Success variant" />
    </div>
  )
}

export function CheckboxSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small size" />
      <Checkbox size="default" label="Default size" />
      <Checkbox size="lg" label="Large size" />
    </div>
  )
}

export function CheckboxWithoutLabel() {
  return (
    <div className="flex items-center gap-4">
      <Checkbox size="sm" />
      <Checkbox size="default" />
      <Checkbox size="lg" />
    </div>
  )
}
