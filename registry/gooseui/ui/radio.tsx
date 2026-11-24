import type * as React from "react"
import { cn } from "@/lib/utils"

export type RadioProps = React.ComponentProps<"input">

/**
 * A native radio input that works without JavaScript.
 * The circle is drawn with SVG: CSS boxes with border-radius get pixel-snapped
 * separately on each axis under page zoom and turn into ovals, vectors do not.
 */
export function Radio({ className, ...props }: RadioProps) {
  return (
    <span
      data-slot="radio"
      className={cn(
        "relative inline-grid size-4 shrink-0 place-items-center",
        className,
      )}
    >
      <input
        {...props}
        type="radio"
        className={cn(
          "peer col-start-1 row-start-1 size-full cursor-pointer appearance-none rounded-full bg-transparent outline-none",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed",
        )}
      />
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={cn(
          "pointer-events-none col-start-1 row-start-1 size-full overflow-visible",
          "[&_circle]:transition-[fill,stroke,r] [&_circle]:duration-200 [&_circle]:ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:[&_circle]:transition-none",
          "fill-background stroke-input",
          "peer-hover:stroke-foreground/40",
          "peer-checked:fill-primary peer-checked:stroke-primary",
          "peer-aria-invalid:stroke-destructive peer-disabled:opacity-50",
          "peer-checked:[&_.dot]:[r:3px]",
        )}
      >
        <circle cx="8" cy="8" r="7.5" strokeWidth="1" />
        <circle
          className="dot fill-background stroke-none"
          cx="8"
          cy="8"
          r="0"
        />
      </svg>
    </span>
  )
}
