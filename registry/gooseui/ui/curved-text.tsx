"use client"

import { useEffect, useId, useState } from "react"
import { cn } from "@/lib/utils"

interface CurvedTextProps {
  /** Text to display along the curve */
  text: string
  /** Animation duration in seconds (one full rotation) */
  duration?: number
  /** Direction: "left" = text moves left, "right" = text moves right */
  direction?: "left" | "right"
  /** Additional class names */
  className?: string
  /** Font size in pixels */
  fontSize?: number
  /** How much the arc curves - higher = flatter (1 = minimum curve, 2+ = very flat) */
  flatness?: number
  /** Override visible height (default: auto-calculated from fontSize) */
  height?: number
  /** Curve direction: "down" = arc curves down (∩), "up" = arc curves up (∪) */
  curve?: "down" | "up"
  /** Separator character to style differently (e.g., "✦") */
  separator?: string
  /** CSS class for separator characters */
  separatorClassName?: string
}

/**
 * Calculate minimum radius so the arc extends beyond viewport edges
 *
 * Geometry: For a circle with radius R, the chord width at height h from top is:
 * chordWidth = 2 * sqrt(2*R*h - h²)
 *
 * We need chordWidth > viewportWidth, solving for R:
 * R > (W²/4 + h²) / (2*h)  =>  R > W²/(8h) + h/2
 */
function calculateRadius(
  viewportWidth: number,
  visibleHeight: number,
  flatness: number,
): number {
  // Minimum radius for arc to span viewport width
  const minRadius =
    (viewportWidth * viewportWidth) / (8 * visibleHeight) + visibleHeight / 2
  // Add flatness multiplier for extra margin and flatter curve
  return minRadius * flatness
}

export function CurvedText({
  text,
  duration = 30,
  direction = "left",
  fontSize = 48,
  flatness = 1.3,
  height,
  curve = "down",
  className,
  separator,
  separatorClassName,
}: CurvedTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [dimensions, setDimensions] = useState({
    radius: 2000,
    visibleHeight: 120,
  })
  const pathId = useId()

  // Calculate responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth
      // Use provided height or auto-calculate from font size
      const visibleHeight = height ?? fontSize * 3.5
      // Calculate radius so arc always extends beyond viewport
      const radius = calculateRadius(viewportWidth, visibleHeight, flatness)

      setDimensions({ radius, visibleHeight })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [fontSize, flatness, height])

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const { radius, visibleHeight } = dimensions

  // Ensure text ends with separator for seamless loop
  const displayText = text.endsWith(" ") ? text : `${text} `
  // Repeat text enough times to fill the circle
  const repeatedText = displayText.repeat(12)

  // SVG dimensions
  const svgSize = radius * 2 + 100
  const center = svgSize / 2

  // Create circular path
  // For "down" curve: path starts at top, goes clockwise
  // For "up" curve: path starts at bottom, goes counter-clockwise (text right-side up)
  const circlePath =
    curve === "down"
      ? `M ${center},${center - radius} a ${radius},${radius} 0 1,1 -0.01,0`
      : `M ${center},${center + radius} a ${radius},${radius} 0 1,0 -0.01,0`

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden transition-opacity duration-700 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{ height: visibleHeight }}
    >
      {/* SVG positioned to show top or bottom arc */}
      <div
        className="absolute left-1/2"
        style={{
          transform: "translateX(-50%)",
          // For "down" curve: show top arc, position SVG at top
          // For "up" curve: show bottom arc, position SVG so bottom is visible
          top:
            curve === "down"
              ? fontSize * 0.5
              : -(svgSize - visibleHeight - fontSize * 0.5),
        }}
      >
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          width={svgSize}
          height={svgSize}
          className="overflow-visible"
          style={{
            animation: `curved-text-spin ${duration}s linear infinite`,
            animationDirection: direction === "left" ? "reverse" : "normal",
          }}
        >
          <defs>
            <path id={pathId} d={circlePath} fill="none" />
          </defs>
          <text
            className="fill-current font-light tracking-tight"
            fontSize={fontSize}
          >
            <textPath href={`#${pathId}`}>
              {separator
                ? repeatedText.split(separator).map((part, i, arr) => (
                    <tspan key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <tspan className={separatorClassName}>
                          {separator}
                        </tspan>
                      )}
                    </tspan>
                  ))
                : repeatedText}
            </textPath>
          </text>
        </svg>
      </div>

      <style jsx>{`
        @keyframes curved-text-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
