"use client"

import * as React from "react"
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
  low: {
    offset: "2px",
    skew: "5deg",
    duration: "8s",
  },
  medium: {
    offset: "3px",
    skew: "10deg",
    duration: "5s",
  },
  high: {
    offset: "5px",
    skew: "20deg",
    duration: "3s",
  },
}

/**
 * GlitchText
 *
 * Animated glitch text effect with chromatic aberration and optional scanlines.
 * Uses clip-path for the glitch slice effect and CSS animations.
 *
 * @see https://caniuse.com/css-clip-path - clip-path browser support (Baseline since 2020)
 * @see https://caniuse.com/css-mixblendmode - mix-blend-mode browser support
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
  const id = React.useId()

  return (
    <div
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
      {/* Inject keyframes */}
      <style>{`
        @keyframes glitch-${id} {
          0%, 100% {
            transform: translate(0);
          }
          20% {
            transform: translate(calc(var(--glitch-offset) * -1), var(--glitch-offset));
          }
          40% {
            transform: translate(var(--glitch-offset), calc(var(--glitch-offset) * -1));
          }
          60% {
            transform: translate(calc(var(--glitch-offset) * -1), var(--glitch-offset));
          }
          80% {
            transform: translate(var(--glitch-offset), calc(var(--glitch-offset) * -1));
          }
        }

        @keyframes glitch-skew-${id} {
          0%, 100% {
            transform: skewX(0deg);
          }
          2% {
            transform: skewX(var(--glitch-skew));
          }
          4% {
            transform: skewX(0deg);
          }
        }

        @keyframes glitch-clip-1-${id} {
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

        @keyframes glitch-clip-2-${id} {
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

        @keyframes scanline-${id} {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .glitch-text-${id},
          .glitch-text-${id}::before,
          .glitch-text-${id}::after {
            animation: none !important;
          }
        }
      `}</style>

      {/* Glow layer */}
      {showGlow && (
        <span
          aria-hidden="true"
          className="absolute inset-0 blur-2xl opacity-50"
          style={{ color: "var(--glitch-color)" }}
        >
          {text}
        </span>
      )}

      {/* Main text with pseudo-element glitch layers */}
      <span
        data-text={text}
        className={cn(
          "relative inline-block font-bold",
          `glitch-text-${id}`,
        )}
        style={{
          color: "var(--glitch-color)",
          animation: `glitch-skew-${id} var(--glitch-duration) infinite linear alternate-reverse`,
        }}
      >
        {text}

        {/* Chromatic aberration layers via additional spans */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 w-full h-full"
          style={{
            color: "cyan",
            mixBlendMode: "screen",
            animation: `glitch-${id} 0.3s infinite linear alternate-reverse, glitch-clip-1-${id} var(--glitch-duration) infinite linear alternate-reverse`,
            transform: `translate(calc(var(--glitch-offset) * -1), 0)`,
          }}
        >
          {text}
        </span>
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 w-full h-full"
          style={{
            color: "magenta",
            mixBlendMode: "screen",
            animation: `glitch-${id} 0.3s infinite linear alternate-reverse, glitch-clip-2-${id} var(--glitch-duration) infinite linear alternate-reverse`,
            transform: `translate(var(--glitch-offset), 0)`,
          }}
        >
          {text}
        </span>
      </span>

      {/* Scanlines overlay */}
      {showScanlines && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-overlay"
          style={{
            background: `repeating-linear-gradient(
              to bottom,
              transparent 0%,
              rgba(255, 255, 255, 0.03) 0.5%,
              transparent 1%
            )`,
            animation: `scanline-${id} 8s ease-in-out infinite alternate`,
          }}
        />
      )}
    </div>
  )
}

export { type GlitchTextProps }
