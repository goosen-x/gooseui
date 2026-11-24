"use client"

import { QuantitySlider } from "@/registry/gooseui/ui/quantity-slider"

export default function CardPreview() {
  return (
    <div className="flex h-full items-center justify-center overflow-hidden">
      <QuantitySlider
        min={1}
        max={20}
        defaultValue={6}
        unitPrice={9}
        ticks={0}
        formatTotal={(v) => `$${v}`}
        className="w-[300px] shrink-0 origin-center scale-[0.72]"
      />
    </div>
  )
}
