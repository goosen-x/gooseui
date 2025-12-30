import * as React from "react"
import { cn } from "@/lib/utils"

interface SquircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Curvature of the squircle corners (0-1). Default is 0.8 */
  curvature?: number
  children?: React.ReactNode
}

function generateSquirclePath(curvature: number = 0.8): string {
  const c = Math.max(0, Math.min(1, curvature))
  const k = c * 0.5

  return `M 0 0.5 C 0 ${k}, ${k} 0, 0.5 0 C ${1 - k} 0, 1 ${k}, 1 0.5 C 1 ${1 - k}, ${1 - k} 1, 0.5 1 C ${k} 1, 0 ${1 - k}, 0 0.5 Z`
}

export function Squircle({
  curvature = 0.8,
  className,
  children,
  style,
  ...props
}: SquircleProps) {
  const path = generateSquirclePath(curvature)
  const svgMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='${encodeURIComponent(path)}'/%3E%3C/svg%3E")`

  return (
    <div
      className={cn("relative", className)}
      style={{
        maskImage: svgMask,
        WebkitMaskImage: svgMask,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
