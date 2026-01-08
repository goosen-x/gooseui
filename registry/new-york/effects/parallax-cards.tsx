"use client"

import type * as React from "react"
import { useGlobalStyles } from "@/hooks/use-global-styles"
import { cn } from "@/lib/utils"

const PARALLAX_CARDS_STYLES = `
@keyframes parallax-card {
  from {
    opacity: 0;
    transform: translateY(var(--parallax-translate, 50px))
      scale(var(--parallax-scale, 0.95));
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
`

interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
  /** Parallax intensity (0-1) */
  intensity?: number
}

/**
 * Parallax Card
 *
 * Uses CSS scroll-driven animations with view() timeline
 * to create parallax effect as card enters/exits viewport.
 *
 * @see https://scroll-driven-animations.style/
 */
export function ParallaxCard({
  children,
  className,
  intensity = 0.5,
}: ParallaxCardProps) {
  const translateY = Math.round(intensity * 100)
  const scale = 1 - intensity * 0.1

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm",
        className,
      )}
      style={
        {
          "--parallax-translate": `${translateY}px`,
          "--parallax-scale": scale,
          animation: "parallax-card linear",
          animationTimeline: "view()",
          animationRange: "entry 0% cover 50%",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

interface ParallaxCardsProps {
  children: React.ReactNode
  className?: string
}

export function ParallaxCards({ children, className }: ParallaxCardsProps) {
  return (
    <>
      <ParallaxCardsStyles />
      <div className={cn("space-y-8", className)}>{children}</div>
    </>
  )
}

export function ParallaxCardsStyles() {
  useGlobalStyles(PARALLAX_CARDS_STYLES, "parallax-cards-styles")
  return null
}
