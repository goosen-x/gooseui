"use client"

import * as React from "react"
import { Slider } from "@/registry/new-york/ui/slider"

export function SliderDemo() {
  const [value, setValue] = React.useState(50)

  return (
    <div className="w-full max-w-sm space-y-8">
      {/* Basic */}
      <div className="space-y-2">
        <Slider
          value={value}
          onValueChange={setValue}
          showValue
          formatValue={(v) => `${v}%`}
        />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Small</span>
          <Slider defaultValue={30} size="sm" />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Medium</span>
          <Slider defaultValue={50} size="md" />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Large</span>
          <Slider defaultValue={70} size="lg" />
        </div>
      </div>

      {/* With step */}
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Step: 25</span>
        <Slider defaultValue={50} min={0} max={100} step={25} showValue />
      </div>
    </div>
  )
}
