"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollProgressProps {
  className?: string
  /** Progress bar color */
  color?: string
  /** Progress bar height */
  height?: number
  /** Position: top or bottom */
  position?: "top" | "bottom"
}

/**
 * Scroll Progress Bar
 *
 * Uses CSS scroll-driven animations (animation-timeline: scroll())
 * to show page scroll progress without JavaScript calculations.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
 */
export function ScrollProgress({
  className,
  color,
  height = 3,
  position = "top",
}: ScrollProgressProps) {
  return (
    <div
      className={cn(
        "scroll-progress-bar fixed left-0 right-0 z-[100] bg-primary",
        position === "top" ? "top-0" : "bottom-0",
        className,
      )}
      style={{
        height: `${height}px`,
        ...(color && { backgroundColor: color }),
      }}
    />
  )
}

/**
 * ScrollProgressStyles - DEPRECATED
 *
 * Keyframes are now in globals.css, so this component is no longer needed.
 * Kept for backwards compatibility - does nothing.
 */
export function ScrollProgressStyles() {
  return null
}
