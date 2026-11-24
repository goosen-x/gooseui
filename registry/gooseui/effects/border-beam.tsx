import type * as React from "react"
import { cn } from "@/lib/utils"

const css = `
@property --gooseui-beam-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@keyframes gooseui-border-beam-spin {
  to { --gooseui-beam-angle: 360deg; }
}
[data-gooseui-border-beam] > [data-beam] {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: var(--border-width);
  background: linear-gradient(
    var(--gooseui-beam-angle),
    transparent 0%,
    transparent 35%,
    var(--color-from) 50%,
    var(--color-to) 65%,
    transparent 80%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: gooseui-border-beam-spin var(--duration) linear infinite var(--delay);
}
[data-gooseui-border-beam][data-squircle],
[data-gooseui-border-beam][data-squircle] > [data-beam] {
  corner-shape: squircle;
}
@media (prefers-reduced-motion: reduce) {
  [data-gooseui-border-beam] > [data-beam] { animation: none; }
}
`

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
  /** Match iOS-style squircle corners where corner-shape is supported */
  squircle?: boolean
}

/** A light beam running along the border. CSS only: @property + keyframes. */
export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  borderWidth = 1.5,
  squircle = false,
}: BorderBeamProps) {
  return (
    <div
      data-gooseui-border-beam=""
      data-squircle={squircle || undefined}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className,
      )}
      style={
        {
          "--size": size,
          "--duration": `${duration}s`,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <style href="gooseui-border-beam" precedence="default">
        {css}
      </style>
      <div data-beam="" />
    </div>
  )
}
