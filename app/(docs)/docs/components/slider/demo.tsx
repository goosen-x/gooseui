"use client"

import * as React from "react"
import { Slider } from "@/registry/new-york/ui/slider"

export function SliderDemo() {
  const [value, setValue] = React.useState(53)

  return (
    <div className="w-full max-w-sm space-y-8">
      {/* Basic with value display */}
      <Slider
        value={value}
        onValueChange={setValue}
        showValue
        formatValue={(v) => `${v}%`}
        label="Volume control"
      />

      {/* Sizes */}
      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Small</span>
          <Slider defaultValue={30} size="sm" label="Small slider" />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Medium</span>
          <Slider defaultValue={50} size="md" label="Medium slider" />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Large</span>
          <Slider defaultValue={70} size="lg" label="Large slider" />
        </div>
      </div>

      {/* With step */}
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Step: 25</span>
        <Slider
          defaultValue={50}
          min={0}
          max={100}
          step={25}
          showValue
          label="Step slider"
        />
      </div>
    </div>
  )
}

export function SliderSizesDemo() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Small</span>
        <Slider defaultValue={30} size="sm" label="Small slider" />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Medium (default)</span>
        <Slider defaultValue={50} size="md" label="Medium slider" />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Large</span>
        <Slider defaultValue={70} size="lg" label="Large slider" />
      </div>
    </div>
  )
}

export function SliderStepDemo() {
  const [value, setValue] = React.useState(50)

  return (
    <div className="w-full max-w-sm space-y-2">
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={10}
        showValue
        label="Step slider"
      />
      <p className="text-xs text-muted-foreground text-center">
        Step: 10 (values: 0, 10, 20, ... 100)
      </p>
    </div>
  )
}

export function SliderDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={40} disabled label="Disabled slider" />
    </div>
  )
}

export function SliderCustomFormatDemo() {
  const [temperature, setTemperature] = React.useState(22)
  const [price, setPrice] = React.useState(150)

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Temperature</span>
        <Slider
          value={temperature}
          onValueChange={setTemperature}
          min={16}
          max={30}
          showValue
          formatValue={(v) => `${v}°C`}
          label="Temperature control"
        />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Price Range</span>
        <Slider
          value={price}
          onValueChange={setPrice}
          min={0}
          max={500}
          step={10}
          showValue
          formatValue={(v) => `$${v}`}
          label="Price filter"
        />
      </div>
    </div>
  )
}

export function SliderGradientDemo() {
  const [value, setValue] = React.useState(50)

  return (
    <div className="w-full max-w-sm space-y-4">
      <style>{`
        .gradient-slider::-webkit-slider-runnable-track {
          background: linear-gradient(
            to right,
            hsl(var(--chart-1)) 0%,
            hsl(var(--chart-2)) 25%,
            hsl(var(--chart-3)) 50%,
            hsl(var(--chart-4)) 75%,
            hsl(var(--chart-5)) 100%
          ) !important;
        }
        .gradient-slider::-moz-range-track {
          background: linear-gradient(
            to right,
            hsl(var(--chart-1)) 0%,
            hsl(var(--chart-2)) 25%,
            hsl(var(--chart-3)) 50%,
            hsl(var(--chart-4)) 75%,
            hsl(var(--chart-5)) 100%
          ) !important;
        }
        .gradient-slider::-moz-range-progress {
          background: transparent !important;
        }
      `}</style>
      <Slider
        value={value}
        onValueChange={setValue}
        showValue
        label="Gradient slider"
        className="gradient-slider"
      />
      <p className="text-xs text-muted-foreground text-center">
        Custom gradient track using CSS overrides
      </p>
    </div>
  )
}

export function SliderValueDisplayDemo() {
  const [value, setValue] = React.useState(75)

  return (
    <div className="w-full max-w-sm">
      <Slider
        value={value}
        onValueChange={setValue}
        showValue
        formatValue={(v) => `${v}%`}
        label="Volume control"
      />
    </div>
  )
}

export function SliderAnimatedValueDemo() {
  const [value, setValue] = React.useState(50)

  return (
    <div className="w-full max-w-sm">
      <Slider
        value={value}
        onValueChange={setValue}
        showValue
        animateValue
        formatValue={(v) => `${v}%`}
        label="Animated value slider"
      />
    </div>
  )
}

export function SliderAnimatedPriceDemo() {
  const [price, setPrice] = React.useState(150)

  return (
    <div className="w-full max-w-sm">
      <Slider
        value={price}
        onValueChange={setPrice}
        min={0}
        max={500}
        step={10}
        showValue
        animateValue
        formatValue={(v) => `$${v}`}
        label="Price filter"
      />
    </div>
  )
}
