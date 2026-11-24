import type * as React from "react"
import { cn } from "@/lib/utils"

const sizes = {
  sm: "h-[18px] w-[33px]",
  default: "h-6 w-11",
  lg: "h-8 w-[59px]",
}

export type SwitchProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type"
> & {
  size?: keyof typeof sizes
}

/**
 * A native checkbox with role="switch" that works without JavaScript.
 * The capsule and the knob are drawn with SVG: CSS boxes with border-radius get
 * pixel-snapped per axis under page zoom and turn into ovals, vectors do not.
 * The knob moves on a spring curve and stretches while pressed.
 */
export function Switch({ className, size = "default", ...props }: SwitchProps) {
  return (
    <span
      data-slot="switch"
      data-size={size}
      className={cn(
        "relative inline-grid shrink-0 rounded-full",
        "has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50",
        sizes[size],
        className,
      )}
    >
      <style href="goose-switch" precedence="goose-switch">{`
        [data-slot="switch"] {
          --switch-ease: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @supports (transition-timing-function: linear(0, 1)) {
          [data-slot="switch"] {
            --switch-ease: linear(0, 0.16 6%, 0.5 14%, 0.8 22%, 0.98 30%, 1.07 38%, 1.09 45%, 1.06 53%, 1.02 62%, 0.995 72%, 1 85%, 1);
          }
        }
        [data-slot="switch"] .switch-thumb {
          transform: translateX(0);
          transition: transform 250ms var(--switch-ease), width 200ms cubic-bezier(0.2, 0, 0, 1);
        }
        [data-slot="switch"] input:checked ~ svg .switch-thumb { transform: translateX(20px); }
        [data-slot="switch"] input:active:not(:disabled) ~ svg .switch-thumb { width: 24px; }
        [data-slot="switch"] input:checked:active:not(:disabled) ~ svg .switch-thumb { transform: translateX(16px); }
        @media (prefers-reduced-motion: reduce) {
          [data-slot="switch"] .switch-thumb { transition: none; }
          [data-slot="switch"] input:active:not(:disabled) ~ svg .switch-thumb { width: 20px; }
          [data-slot="switch"] input:checked:active:not(:disabled) ~ svg .switch-thumb { transform: translateX(20px); }
        }
      `}</style>
      <input
        {...props}
        type="checkbox"
        role="switch"
        className={cn(
          "peer col-start-1 row-start-1 m-0 size-full cursor-pointer appearance-none rounded-full bg-transparent outline-none",
          "disabled:cursor-not-allowed",
        )}
      />
      <svg
        viewBox="0 0 44 24"
        aria-hidden="true"
        className={cn(
          "pointer-events-none col-start-1 row-start-1 size-full overflow-visible",
          "[&_.track]:fill-input [&_.track]:transition-[fill] [&_.track]:duration-200 motion-reduce:[&_.track]:transition-none",
          "peer-checked:[&_.track]:fill-primary peer-aria-invalid:[&_.track]:stroke-destructive peer-aria-invalid:[&_.track]:stroke-2",
          "peer-disabled:opacity-50",
        )}
      >
        <rect width="44" height="24" rx="12" className="track" />
        <rect
          className="switch-thumb fill-white drop-shadow-[0_1px_2px_rgb(0_0_0/0.3)]"
          x="2"
          y="2"
          width="20"
          height="20"
          rx="10"
        />
      </svg>
    </span>
  )
}
