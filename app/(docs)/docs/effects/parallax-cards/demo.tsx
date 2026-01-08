"use client"

import * as React from "react"
import {
  ParallaxCards,
  ParallaxCard,
} from "@/registry/new-york/effects/parallax-cards"
import { ScrollContainer } from "@/registry/new-york/ui/scroll-container"
import { Slider } from "@/registry/new-york/ui/slider"

export function ParallaxCardsDemo() {
  const [intensity, setIntensity] = React.useState(0.5)

  return (
    <div className="space-y-4">
      {/* Slider control */}
      <div className="flex items-center gap-4 px-2">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Intensity:
        </span>
        <Slider
          value={intensity * 100}
          min={10}
          max={100}
          step={10}
          onValueChange={(v) => setIntensity(v / 100)}
          showValue
          formatValue={(v) => `${v}%`}
          className="flex-1"
        />
      </div>

      <ScrollContainer
        height={300}
        autoHide={false}
        className="rounded-lg border bg-background p-4"
      >
        {/* Large spacer to push cards below viewport */}
        <div className="h-[250px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl mb-2">↓</p>
            <p className="text-sm text-muted-foreground">
              Scroll down slowly
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Cards will animate as they enter
            </p>
          </div>
        </div>

        <ParallaxCards key={intensity}>
          <ParallaxCard intensity={intensity}>
            <h3 className="font-semibold mb-2">Card 1</h3>
            <p className="text-sm text-muted-foreground">
              Appears with fade + scale + translateY
            </p>
          </ParallaxCard>

          <ParallaxCard intensity={intensity}>
            <h3 className="font-semibold mb-2">Card 2</h3>
            <p className="text-sm text-muted-foreground">
              Animation tied to scroll position
            </p>
          </ParallaxCard>

          <ParallaxCard intensity={intensity}>
            <h3 className="font-semibold mb-2">Card 3</h3>
            <p className="text-sm text-muted-foreground">
              Intensity controls translateY distance
            </p>
          </ParallaxCard>
        </ParallaxCards>

        <div className="h-32" />
      </ScrollContainer>
    </div>
  )
}
