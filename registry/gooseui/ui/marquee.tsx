import type { ComponentProps, CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { MarqueeBrake } from "@/registry/gooseui/ui/marquee.client"

export type MarqueeProps = ComponentProps<"div"> & {
  /** Seconds for one copy of the content to scroll past */
  duration?: number
  /** How many copies of the content to render. One copy must be at least as wide (tall) as the container */
  repeat?: number
  /** Move right (or down when vertical) instead of left (up) */
  reverse?: boolean
  vertical?: boolean
  pauseOnHover?: boolean
  /** Milliseconds the ticker takes to slow down and speed up again on hover or focus */
  stopDuration?: number
  /** Space between items, number in px or any CSS length */
  gap?: number | string
  /** Width of the faded edges, px. 0 disables the mask */
  fade?: number
}

const STYLES = `
@keyframes gooseui-marquee-x { to { transform: translate3d(calc(-100% / var(--marquee-copies)), 0, 0); } }
@keyframes gooseui-marquee-y { to { transform: translate3d(0, calc(-100% / var(--marquee-copies)), 0); } }
.gooseui-marquee-track {
  animation: gooseui-marquee-x var(--marquee-duration) linear infinite;
  animation-direction: var(--marquee-direction);
}
.gooseui-marquee[data-vertical] .gooseui-marquee-track { animation-name: gooseui-marquee-y; }
/* No-JS fallback: pauses at once. With JS the brake eases playbackRate instead */
.gooseui-marquee[data-pause-on-hover]:not([data-brake]):hover .gooseui-marquee-track,
.gooseui-marquee:not([data-brake]):focus-within .gooseui-marquee-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .gooseui-marquee { mask-image: none !important; -webkit-mask-image: none !important; }
  .gooseui-marquee-track { animation: none; transform: none; }
  .gooseui-marquee .gooseui-marquee-copy[data-clone] { display: none; }
  .gooseui-marquee .gooseui-marquee-copy {
    flex-wrap: wrap; justify-content: center; flex-shrink: 1; width: 100%; padding: 0;
  }
  .gooseui-marquee:not([data-vertical]) .gooseui-marquee-track { width: 100%; }
}
`

function toLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value
}

export function Marquee({
  duration = 20,
  repeat = 2,
  reverse = false,
  vertical = false,
  pauseOnHover = false,
  stopDuration = 500,
  gap = 32,
  fade = 48,
  className,
  style,
  children,
  ...props
}: MarqueeProps) {
  const copies = Math.max(2, Math.round(repeat))
  const edge = vertical ? "to bottom" : "to right"
  const mask =
    fade > 0
      ? `linear-gradient(${edge}, transparent, #000 ${fade}px, #000 calc(100% - ${fade}px), transparent)`
      : undefined

  return (
    <div
      data-vertical={vertical || undefined}
      data-pause-on-hover={pauseOnHover || undefined}
      className={cn("gooseui-marquee relative flex overflow-hidden", className)}
      style={
        {
          maskImage: mask,
          WebkitMaskImage: mask,
          "--marquee-gap": toLength(gap),
          "--marquee-copies": copies,
          "--marquee-duration": `${Math.max(duration, 0.1)}s`,
          "--marquee-direction": reverse ? "reverse" : "normal",
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <style href="gooseui-marquee" precedence="default">
        {STYLES}
      </style>
      <MarqueeBrake stopDuration={stopDuration} onHover={pauseOnHover} />
      <div
        className={cn(
          "gooseui-marquee-track flex shrink-0",
          vertical ? "h-max w-full flex-col self-start" : "w-max",
        )}
      >
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            data-clone={i > 0 || undefined}
            aria-hidden={i > 0 || undefined}
            inert={i > 0 || undefined}
            className={cn(
              "gooseui-marquee-copy flex shrink-0 items-center gap-(--marquee-gap)",
              vertical ? "flex-col pb-(--marquee-gap)" : "pr-(--marquee-gap)",
            )}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
