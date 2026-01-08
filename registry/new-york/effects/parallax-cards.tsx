"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

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
  intensity = 0.3,
}: ParallaxCardProps) {
  const offset = Math.round(intensity * 100)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm",
        className,
      )}
      style={{
        animation: "parallax-card linear",
        animationTimeline: "view()",
        animationRange: "entry 0% cover 50%",
      }}
    >
      <div
        className="parallax-content"
        style={
          {
            "--parallax-offset": `${offset}px`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
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
  return (
    <style jsx global>{`
      @keyframes parallax-card {
        from {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `}</style>
  )
}
