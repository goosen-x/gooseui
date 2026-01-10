"use client"

import * as React from "react"
import { useCornerShapeSupport } from "@/registry/new-york/ui/corner-shape"
import { Slider } from "@/registry/new-york/ui/slider"

const DEMO_IMAGE =
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop"

/**
 * Main demo - shows native CSS corner-shape comparison
 */
export function CornerShapeDemo() {
  const isSupported = useCornerShapeSupport()
  const [radius, setRadius] = React.useState(22) // Apple uses ~22.37%
  const size = 160

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="flex items-center gap-12">
        {/* Regular border-radius */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="bg-slate-400 dark:bg-slate-500"
            style={{
              width: size,
              height: size,
              borderRadius: `${radius}%`,
            }}
          />
          <div className="text-center">
            <span className="text-sm text-muted-foreground block">Regular</span>
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">border-radius</code>
          </div>
        </div>

        {/* Squircle with corner-shape */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="bg-gradient-to-br from-violet-500 to-fuchsia-500"
            style={{
              width: size,
              height: size,
              borderRadius: `${radius}%`,
              // @ts-expect-error - corner-shape is experimental
              cornerShape: "squircle",
            }}
          />
          <div className="text-center">
            <span className="text-sm font-semibold block">Squircle</span>
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">corner-shape: squircle</code>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="w-full max-w-xs space-y-2">
        <Slider
          value={radius}
          onValueChange={setRadius}
          min={0}
          max={50}
          step={1}
          showValue
          animateValue
          formatValue={(v) => `${v}%`}
          label="Border radius"
        />
      </div>

      {!isSupported && (
        <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-4 py-2 rounded-lg">
          Your browser doesn&apos;t support corner-shape. Try Chrome 139+
        </div>
      )}
    </div>
  )
}

export function CornerShapeImageDemo() {
  const isSupported = useCornerShapeSupport()

  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="w-32 h-32 rounded-[24px] overflow-hidden">
          <img
            src={DEMO_IMAGE}
            alt="Regular"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">border-radius</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-32 h-32 overflow-hidden"
          style={{
            borderRadius: "24px",
            // @ts-expect-error - experimental
            cornerShape: isSupported ? "squircle" : undefined,
          }}
        >
          <img
            src={DEMO_IMAGE}
            alt="Squircle"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {isSupported ? "squircle" : "fallback"}
        </span>
      </div>
    </div>
  )
}

export function CornerShapeIconsDemo() {
  const isSupported = useCornerShapeSupport()

  const iconStyle: React.CSSProperties & { cornerShape?: string } = {
    borderRadius: "22.37%",
    cornerShape: isSupported ? "squircle" : undefined,
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
        style={iconStyle}
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>
      <div
        className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center"
        style={iconStyle}
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div
        className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
        style={iconStyle}
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>
      <div
        className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
        style={iconStyle}
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </div>
    </div>
  )
}
