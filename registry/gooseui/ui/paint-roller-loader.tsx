import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

export type PaintRollerLoaderProps = Omit<ComponentProps<"div">, "children"> & {
  /** Width of the illustration in px, height scales with it */
  size?: number
  /** One stroke cycle, ms */
  duration?: number
  /** Visible caption under the roller */
  label?: ReactNode
  /** Screen reader text */
  srLabel?: string
}

// All geometry is in em, so one font-size scales the whole drawing
const styles = `
.gooseui-paint-roller {
  --pr-paint: var(--paint-roller-color, var(--primary));
  --pr-frame: var(--paint-roller-frame, var(--foreground));
  --pr-track: var(--paint-roller-track, var(--muted));
  position: relative; width: 12.4em; height: 7.6em;
}
.gooseui-paint-roller__strip {
  position: absolute; left: .7em; top: .9em; width: 11em; height: 3em;
  border-radius: .5em; background: var(--pr-track); overflow: hidden;
}
.gooseui-paint-roller__paint {
  position: absolute; inset: 0; background: var(--pr-paint); transform-origin: left center;
  animation: gooseui-pr-paint var(--pr-duration) ease-in-out infinite;
}
.gooseui-paint-roller__tool {
  position: absolute; left: 0; top: 0; width: 1.4em; height: 7.6em;
  animation: gooseui-pr-move var(--pr-duration) ease-in-out infinite;
}
.gooseui-paint-roller__bob {
  position: absolute; inset: 0;
  animation: gooseui-pr-bob calc(var(--pr-duration) / 4) ease-in-out infinite alternate;
}
.gooseui-paint-roller__roller {
  position: absolute; left: 0; top: .5em; width: 1.4em; height: 3.8em; box-sizing: border-box;
  border: .18em solid var(--pr-frame); border-radius: .4em;
  background: linear-gradient(to right, var(--pr-paint) 0 62%, color-mix(in oklab, var(--pr-paint), black 22%) 62%);
}
.gooseui-paint-roller__roller::before {
  content: ""; position: absolute; left: .18em; top: .3em; width: .22em; height: 1.8em;
  border-radius: 1em; background: color-mix(in oklab, white 65%, transparent);
}
.gooseui-paint-roller__arm {
  position: absolute; left: .59em; top: 4.2em; width: .22em; height: 1.4em; background: var(--pr-frame);
}
.gooseui-paint-roller__grip {
  position: absolute; left: .3em; top: 5.5em; width: .8em; height: 2.05em;
  border-radius: .35em; background: var(--pr-frame);
}
@keyframes gooseui-pr-paint {
  0% { transform: scaleX(0); opacity: 1 }
  65%, 80% { transform: scaleX(1); opacity: 1 }
  95% { transform: scaleX(1); opacity: 0 }
  100% { transform: scaleX(0); opacity: 0 }
}
@keyframes gooseui-pr-move {
  0% { transform: translateX(0) }
  65%, 80% { transform: translateX(11em) }
  100% { transform: translateX(0) }
}
@keyframes gooseui-pr-bob {
  from { transform: translateY(-.08em) rotate(-2deg) }
  to { transform: translateY(.08em) rotate(2deg) }
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-paint-roller__paint { animation: none; transform: scaleX(.6) }
  .gooseui-paint-roller__tool { animation: none; transform: translateX(6.6em) }
  .gooseui-paint-roller__bob { animation: none }
}
`

export function PaintRollerLoader({
  size = 160,
  duration = 2400,
  label,
  srLabel = "Loading",
  className,
  style,
  ...props
}: PaintRollerLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("inline-flex flex-col items-center gap-3", className)}
      style={style}
      {...props}
    >
      <style href="gooseui-paint-roller-loader" precedence="default">
        {styles}
      </style>
      <div
        aria-hidden
        className="gooseui-paint-roller"
        style={
          {
            fontSize: size / 12.4,
            "--pr-duration": `${duration}ms`,
          } as CSSProperties
        }
      >
        <div className="gooseui-paint-roller__strip">
          <div className="gooseui-paint-roller__paint" />
        </div>
        <div className="gooseui-paint-roller__tool">
          <div className="gooseui-paint-roller__bob">
            <div className="gooseui-paint-roller__roller" />
            <div className="gooseui-paint-roller__arm" />
            <div className="gooseui-paint-roller__grip" />
          </div>
        </div>
      </div>
      {label ? (
        <div className="text-sm text-muted-foreground">{label}</div>
      ) : (
        <span className="sr-only">{srLabel}</span>
      )}
    </div>
  )
}
