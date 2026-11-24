import type * as React from "react"
import { cn } from "@/lib/utils"

export type HoverScrollVariant = "glide" | "bounce" | "zoom"

export type HoverScrollScreenshotProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  /** Tall screenshot URL */
  src: string
  /** Alternative text, also used as the accessible name of the frame */
  alt: string
  /** Motion style */
  variant?: HoverScrollVariant
  /** Time to scroll from top to bottom, ms */
  duration?: number
  /** How many times faster the way back is */
  returnSpeedup?: number
  /** Extra classes for the <img> */
  imageClassName?: string
}

// The frame is a size container, so 100cqh is its height and 100% in
// translate is the image height: the end offset needs no measuring.
// A transition takes its timing from the state it goes to, so the way in
// uses --hss-in and the way back --hss-out.
const ON = "[data-gooseui-hss]:focus"
const HOVER = "[data-gooseui-hss]:hover"

const active = (rule: string) =>
  `${ON}${rule}\n@media (hover:hover){${HOVER}${rule}}`

const css = `@layer components{
[data-gooseui-hss]{container-type:size;--hss-easing:cubic-bezier(.45,0,.15,1);--hss-easing-out:cubic-bezier(.3,0,.1,1)}
[data-hss-track]{transform-origin:top;transition:translate var(--hss-out) var(--hss-easing-out),scale var(--hss-out) var(--hss-easing-out)}
${active(" [data-hss-track]{translate:0 calc(100cqh - 100%);transition:translate var(--hss-in) var(--hss-easing),scale var(--hss-in) var(--hss-easing)}")}
[data-variant=bounce]{--hss-easing:linear(0,.3 25%,.75 52%,1.03 76%,1.04 84%,1.012 94%,1)}
[data-variant=zoom] [data-hss-track]{scale:1.12}
${active("[data-variant=zoom] [data-hss-track]{scale:1}")}
@media (prefers-reduced-motion:reduce){
[data-gooseui-hss] [data-hss-track]{translate:none!important;scale:none!important;transition:none!important}
}
}`

/** A tall screenshot that scrolls inside its frame on hover or focus. CSS only. */
export function HoverScrollScreenshot({
  src,
  alt,
  variant = "glide",
  duration = 6000,
  returnSpeedup = 6,
  imageClassName,
  className,
  style,
  ...props
}: HoverScrollScreenshotProps) {
  return (
    <div
      tabIndex={0}
      role="img"
      aria-label={alt}
      data-gooseui-hss=""
      data-slot="hover-scroll-screenshot"
      data-variant={variant}
      className={cn(
        "relative isolate aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border bg-muted outline-none",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      style={
        {
          "--hss-in": `${duration}ms`,
          "--hss-out": `${duration / Math.max(returnSpeedup, 0.01)}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <style href="gooseui-hover-scroll-screenshot" precedence="default">
        {css}
      </style>
      <div data-hss-track="" className="relative">
        <img
          src={src}
          alt=""
          draggable={false}
          className={cn(
            "pointer-events-none block h-auto w-full select-none",
            imageClassName,
          )}
        />
      </div>
    </div>
  )
}
