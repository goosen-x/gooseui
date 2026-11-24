import type { ComponentProps, CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type MeshGradientProps = Omit<ComponentProps<"div">, "children"> & {
  /** Blob colors, any CSS color or var(). Defaults to neighbours of the theme primary colour */
  colors?: string[]
  /** Animation speed multiplier */
  speed?: number
  /** Blur radius of the blobs in pixels */
  blur?: number
  /** Opacity of the blobs, 0 to 1 */
  blobOpacity?: number
  /** Opacity of the grain layer, 0 disables it */
  grain?: number
}

// Analogous palette: the primary colour and its neighbours on the hue wheel,
// so the blobs always match each other and the theme
const DEFAULT_COLORS = [
  "var(--primary)",
  "oklch(from var(--primary) calc(l + 0.08) c calc(h + 35))",
  "oklch(from var(--primary) calc(l - 0.04) c calc(h - 35))",
  "oklch(from var(--primary) calc(l + 0.12) calc(c * 0.8) calc(h + 70))",
  "oklch(from var(--primary) calc(l - 0.02) c calc(h - 70))",
]

// Start position, size and base duration (s) for each blob slot
const SLOTS = [
  { left: "-10%", top: "-15%", size: "60%", duration: 22 },
  { left: "45%", top: "-20%", size: "55%", duration: 26 },
  { left: "55%", top: "40%", size: "60%", duration: 30 },
  { left: "-5%", top: "45%", size: "55%", duration: 24 },
  { left: "25%", top: "15%", size: "45%", duration: 34 },
]

const KEYFRAMES = `
@keyframes gooseui-mesh-a{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(18%,12%) scale(1.15)}66%{transform:translate(-8%,20%) scale(.9)}}
@keyframes gooseui-mesh-b{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-20%,15%) scale(.9)}66%{transform:translate(10%,25%) scale(1.1)}}
@keyframes gooseui-mesh-c{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-15%,-18%) scale(1.1)}66%{transform:translate(-25%,5%) scale(.95)}}
@keyframes gooseui-mesh-d{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20%,-15%) scale(1.05)}66%{transform:translate(28%,-5%) scale(.9)}}
@keyframes gooseui-mesh-e{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-12%,14%) scale(1.2)}}
@media (prefers-reduced-motion: reduce){.gooseui-mesh-blob{animation:none!important}}
`

const ANIMATIONS = [
  "gooseui-mesh-a",
  "gooseui-mesh-b",
  "gooseui-mesh-c",
  "gooseui-mesh-d",
  "gooseui-mesh-e",
]

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`

export function MeshGradient({
  colors = DEFAULT_COLORS,
  speed = 1,
  blur = 80,
  blobOpacity = 0.7,
  grain = 0.15,
  className,
  ...props
}: MeshGradientProps) {
  const safeSpeed = speed > 0 ? speed : 1

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 isolate overflow-hidden",
        className,
      )}
      {...props}
    >
      <style href="gooseui-mesh-gradient" precedence="default">
        {KEYFRAMES}
      </style>
      {colors.map((color, i) => {
        const slot = SLOTS[i % SLOTS.length]
        const blob: CSSProperties = {
          left: slot.left,
          top: slot.top,
          width: slot.size,
          backgroundColor: color,
          opacity: blobOpacity,
          filter: `blur(${blur}px)`,
          animation: `${ANIMATIONS[i % ANIMATIONS.length]} ${slot.duration / safeSpeed}s ease-in-out infinite`,
          animationPlayState: speed > 0 ? "running" : "paused",
        }
        return (
          <div
            key={i}
            className="gooseui-mesh-blob absolute aspect-square rounded-full will-change-transform"
            style={blob}
          />
        )
      })}
      {grain > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: GRAIN_URL, opacity: grain }}
        />
      )}
    </div>
  )
}
