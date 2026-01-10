"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Generate superellipse path with normalized coordinates (0-1)
 * for use with clipPathUnits="objectBoundingBox"
 */
function generateNormalizedPath(n: number = 5, points: number = 360): string {
  const pathPoints: string[] = []

  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI
    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)

    const x = 0.5 + 0.5 * Math.sign(cosA) * Math.abs(cosA) ** (2 / n)
    const y = 0.5 + 0.5 * Math.sign(sinA) * Math.abs(sinA) ** (2 / n)

    if (i === 0) {
      pathPoints.push(`M${x.toFixed(4)},${y.toFixed(4)}`)
    } else {
      pathPoints.push(`L${x.toFixed(4)},${y.toFixed(4)}`)
    }
  }

  pathPoints.push("Z")
  return pathPoints.join(" ")
}

/**
 * Generate superellipse path for SVG with absolute coordinates
 */
function generateSuperellipsePath(
  n: number = 5,
  size: number = 100,
  points: number = 360,
): string {
  const a = size / 2
  const cx = size / 2
  const cy = size / 2
  const pathPoints: string[] = []

  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI
    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)

    const x = cx + a * Math.sign(cosA) * Math.abs(cosA) ** (2 / n)
    const y = cy + a * Math.sign(sinA) * Math.abs(sinA) ** (2 / n)

    if (i === 0) {
      pathPoints.push(`M ${x.toFixed(2)} ${y.toFixed(2)}`)
    } else {
      pathPoints.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`)
    }
  }

  pathPoints.push("Z")
  return pathPoints.join(" ")
}

function generateSquirclePath(size: number = 100): string {
  return generateSuperellipsePath(5, size, 360)
}

function createSquircleSvgUrl(n: number = 5): string {
  const path = generateSuperellipsePath(n, 100, 360)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='${path}' fill='black'/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

// Pre-generated paths for common n values
const NORMALIZED_PATHS: Record<number, string> = {
  4: generateNormalizedPath(4, 360),
  5: generateNormalizedPath(5, 360),
  6: generateNormalizedPath(6, 360),
  8: generateNormalizedPath(8, 360),
}

const SQUIRCLE_PATH = generateSquirclePath(100)

/**
 * Check if CSS corner-shape is supported
 */
function checkCornerShapeSupport(): boolean {
  if (typeof CSS === "undefined" || !CSS.supports) return false
  return CSS.supports("corner-shape", "squircle")
}

export interface SquircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Superellipse exponent: 2=ellipse, 5=squircle (Apple), higher=more square */
  n?: number
  /** Border radius for corner-shape (CSS value like "20%" or "24px") */
  radius?: string
  /** Children elements */
  children?: React.ReactNode
}

let idCounter = 0

/**
 * Squircle - iOS-style rounded rectangle with smooth continuous curves
 *
 * Uses native CSS `corner-shape: squircle` when supported (Chrome 139+),
 * with SVG clip-path fallback for other browsers.
 *
 * @example
 * ```tsx
 * <Squircle className="w-32 h-32 bg-blue-500" radius="20%">
 *   <img src="..." alt="..." className="w-full h-full object-cover" />
 * </Squircle>
 * ```
 */
export function Squircle({
  className,
  style,
  n = 5,
  radius = "20%",
  children,
  ...props
}: SquircleProps) {
  const [supportsCornerShape, setSupportsCornerShape] = React.useState(false)
  const clipId = React.useMemo(() => `squircle-${++idCounter}`, [])

  React.useEffect(() => {
    setSupportsCornerShape(checkCornerShapeSupport())
  }, [])

  const fallbackPath = React.useMemo(() => {
    if (NORMALIZED_PATHS[n]) return NORMALIZED_PATHS[n]
    return generateNormalizedPath(n, 360)
  }, [n])

  // Native CSS corner-shape (Chrome 139+)
  if (supportsCornerShape) {
    return (
      <div
        className={cn("relative", className)}
        style={{
          ...style,
          borderRadius: radius,
          // @ts-expect-error - corner-shape is experimental
          cornerShape: "squircle",
        }}
        data-squircle
        data-native="true"
        data-n={n}
        {...props}
      >
        {children}
      </div>
    )
  }

  // SVG clip-path fallback
  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={fallbackPath} />
          </clipPath>
        </defs>
      </svg>
      <div
        className={cn("relative", className)}
        style={{
          ...style,
          clipPath: `url(#${clipId})`,
        }}
        data-squircle
        data-native="false"
        data-n={n}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

/**
 * SquircleImage - Optimized squircle specifically for images
 */
export interface SquircleImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  n?: number
  radius?: string
  containerClassName?: string
}

export function SquircleImage({
  className,
  containerClassName,
  n = 5,
  radius = "20%",
  ...props
}: SquircleImageProps) {
  return (
    <Squircle n={n} radius={radius} className={containerClassName}>
      <img className={cn("w-full h-full object-cover", className)} {...props} />
    </Squircle>
  )
}

/**
 * SquircleComparison - Side-by-side comparison of border-radius vs squircle
 */
export function SquircleComparison({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("flex gap-8 items-center", className)}>
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-24 bg-gradient-to-br from-slate-400 to-slate-600 rounded-[24px]">
          {children}
        </div>
        <span className="text-xs text-muted-foreground">border-radius</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Squircle
          radius="24px"
          className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600"
        >
          {children}
        </Squircle>
        <span className="text-xs text-muted-foreground">squircle</span>
      </div>
    </div>
  )
}

export function useSuperellipsePath(n: number = 5, size: number = 100): string {
  return React.useMemo(() => generateSuperellipsePath(n, size, 360), [n, size])
}

export function useCornerShapeSupport(): boolean {
  const [supported, setSupported] = React.useState(false)

  React.useEffect(() => {
    setSupported(checkCornerShapeSupport())
  }, [])

  return supported
}

export {
  generateSuperellipsePath,
  generateSquirclePath,
  generateNormalizedPath,
  createSquircleSvgUrl,
  SQUIRCLE_PATH,
}
