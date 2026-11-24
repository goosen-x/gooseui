"use client"

import { RangeSlider } from "@/registry/gooseui/ui/range-slider"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <RangeSlider
        defaultValue={[25, 70]}
        formatValue={(v) => `$${v * 10}`}
        className="w-full max-w-[190px]"
      />
    </div>
  )
}
