"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  /** Animation direction */
  direction?: "up" | "down" | "left" | "right" | "fade"
  /** Animation delay in ms */
  delay?: number
  /** Animation duration in ms */
  duration?: number
}

/**
 * Reveal on Scroll
 *
 * Uses CSS scroll-driven animations with view() timeline
 * to reveal elements as they enter the viewport.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
 */
export function RevealOnScroll({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 600,
}: RevealOnScrollProps) {
  const animationName = `reveal-${direction}`

  return (
    <div
      className={cn("reveal-on-scroll", className)}
      style={{
        animation: `${animationName} linear both`,
        animationTimeline: "view()",
        animationRange: "entry 0% cover 40%",
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

/**
 * Reveal on Scroll Styles
 *
 * Include this component once in your app to enable reveal animations.
 */
export function RevealOnScrollStyles() {
  return (
    <style jsx global>{`
      @keyframes reveal-up {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes reveal-down {
        from {
          opacity: 0;
          transform: translateY(-40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes reveal-left {
        from {
          opacity: 0;
          transform: translateX(40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes reveal-right {
        from {
          opacity: 0;
          transform: translateX(-40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes reveal-fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `}</style>
  )
}
