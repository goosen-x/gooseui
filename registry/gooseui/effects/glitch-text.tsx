import type * as React from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  /** Text to display with glitch effect */
  text: string
  /** Intensity of the glitch effect */
  intensity?: "low" | "medium" | "high"
  /** Show scanline overlay */
  showScanlines?: boolean
  /** Show glow effect behind text */
  showGlow?: boolean
  /** Custom text color */
  color?: string
  /** Additional CSS classes */
  className?: string
}

const intensityConfig = {
  low: { offset: "2px", skew: "5deg", duration: "8s" },
  medium: { offset: "3px", skew: "10deg", duration: "5s" },
  high: { offset: "5px", skew: "20deg", duration: "3s" },
}

const css = `
@keyframes gooseui-glitch-shift {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(calc(var(--glitch-offset) * -1), var(--glitch-offset)); }
  40% { transform: translate(var(--glitch-offset), calc(var(--glitch-offset) * -1)); }
  60% { transform: translate(calc(var(--glitch-offset) * -1), var(--glitch-offset)); }
  80% { transform: translate(var(--glitch-offset), calc(var(--glitch-offset) * -1)); }
}
@keyframes gooseui-glitch-skew {
  0%, 100% { transform: skewX(0deg); }
  2% { transform: skewX(var(--glitch-skew)); }
  4% { transform: skewX(0deg); }
}
@keyframes gooseui-glitch-clip-1 {
  0% { clip-path: inset(40% 0 61% 0); }
  10% { clip-path: inset(92% 0 1% 0); }
  20% { clip-path: inset(43% 0 1% 0); }
  30% { clip-path: inset(25% 0 58% 0); }
  40% { clip-path: inset(54% 0 7% 0); }
  50% { clip-path: inset(58% 0 43% 0); }
  60% { clip-path: inset(91% 0 7% 0); }
  70% { clip-path: inset(46% 0 43% 0); }
  80% { clip-path: inset(12% 0 62% 0); }
  90% { clip-path: inset(67% 0 13% 0); }
  100% { clip-path: inset(40% 0 61% 0); }
}
@keyframes gooseui-glitch-clip-2 {
  0% { clip-path: inset(65% 0 14% 0); }
  10% { clip-path: inset(14% 0 75% 0); }
  20% { clip-path: inset(79% 0 5% 0); }
  30% { clip-path: inset(3% 0 87% 0); }
  40% { clip-path: inset(88% 0 3% 0); }
  50% { clip-path: inset(21% 0 68% 0); }
  60% { clip-path: inset(74% 0 17% 0); }
  70% { clip-path: inset(8% 0 83% 0); }
  80% { clip-path: inset(56% 0 32% 0); }
  90% { clip-path: inset(33% 0 55% 0); }
  100% { clip-path: inset(65% 0 14% 0); }
}
@keyframes gooseui-glitch-scanline {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}
[data-glitch-main] {
  animation: gooseui-glitch-skew var(--glitch-duration) infinite linear alternate-reverse;
}
[data-glitch-layer] {
  position: absolute; inset: 0; mix-blend-mode: multiply;
  animation:
    gooseui-glitch-shift 0.3s infinite linear alternate-reverse,
    gooseui-glitch-clip-1 var(--glitch-duration) infinite linear alternate-reverse;
}
[data-glitch-layer="1"] { color: var(--glitch-cyan); transform: translate(calc(var(--glitch-offset) * -1), 0); }
[data-glitch-layer="2"] { color: var(--glitch-magenta); transform: translate(var(--glitch-offset), 0); animation-name: gooseui-glitch-shift, gooseui-glitch-clip-2; }
[data-glitch-root] { --glitch-cyan: #00a8d6; --glitch-magenta: #e0007a; }
:where(.dark) [data-glitch-root] { --glitch-cyan: cyan; --glitch-magenta: magenta; }
:where(.dark) [data-glitch-layer] { mix-blend-mode: screen; }
[data-glitch-glow] { opacity: 0.2; }
:where(.dark) [data-glitch-glow] { opacity: 0.5; }
[data-glitch-scanlines] {
  --glitch-scan: rgb(255 255 255 / 0.3);
  color: transparent;
  background: repeating-linear-gradient(to bottom, transparent 0 2px, var(--glitch-scan) 2px 3px);
  -webkit-background-clip: text; background-clip: text;
  animation: gooseui-glitch-scanline 8s ease-in-out infinite alternate;
}
:where(.dark) [data-glitch-scanlines] { --glitch-scan: rgb(0 0 0 / 0.3); }
@media (prefers-reduced-motion: reduce) {
  [data-glitch-main], [data-glitch-layer], [data-glitch-scanlines] { animation: none; }
  [data-glitch-layer] { display: none; }
}
`

/**
 * GlitchText
 *
 * Glitch text effect with chromatic aberration and optional scanlines.
 * CSS keyframes only: a server component with no client JavaScript.
 */
export function GlitchText({
  text,
  intensity = "medium",
  showScanlines = true,
  showGlow = true,
  color,
  className,
}: GlitchTextProps) {
  const config = intensityConfig[intensity]

  return (
    <div
      data-glitch-root=""
      className={cn("relative inline-block", className)}
      style={
        {
          "--glitch-offset": config.offset,
          "--glitch-skew": config.skew,
          "--glitch-duration": config.duration,
          "--glitch-color": color || "currentColor",
        } as React.CSSProperties
      }
    >
      <style href="gooseui-glitch-text" precedence="default">
        {css}
      </style>

      {showGlow && (
        <span
          aria-hidden="true"
          data-glitch-glow=""
          className="absolute inset-0 blur-2xl"
          style={{ color: "var(--glitch-color)" }}
        >
          {text}
        </span>
      )}

      <span
        data-glitch-main=""
        className="relative inline-block font-bold"
        style={{ color: "var(--glitch-color)" }}
      >
        {text}
        <span aria-hidden="true" data-glitch-layer="1">
          {text}
        </span>
        <span aria-hidden="true" data-glitch-layer="2">
          {text}
        </span>
      </span>

      {showScanlines && (
        <span
          aria-hidden="true"
          data-glitch-scanlines=""
          className="pointer-events-none absolute inset-0 font-bold"
        >
          {text}
        </span>
      )}
    </div>
  )
}

export type { GlitchTextProps }
