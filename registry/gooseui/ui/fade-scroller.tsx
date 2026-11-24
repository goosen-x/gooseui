import type { ComponentProps, CSSProperties } from "react"
import { cn } from "@/lib/utils"
import {
  FadeScrollerArrow,
  FadeScrollerViewport,
} from "@/registry/gooseui/ui/fade-scroller.client"

export type FadeScrollerLabels = {
  previous: string
  next: string
}

const defaultLabels: FadeScrollerLabels = {
  previous: "Scroll back",
  next: "Scroll forward",
}

export type FadeScrollerProps = ComponentProps<"div"> & {
  /** Scroll axis */
  orientation?: "horizontal" | "vertical"
  /** Width of the faded edge in px */
  fadeSize?: number
  /** Arrow buttons at the edges: "auto" shows them on devices with a mouse */
  showArrows?: "auto" | boolean
  /** Vertical mouse wheel scrolls a horizontal row */
  wheel?: boolean
  /** Arrow scroll distance as a fraction of the visible size */
  scrollStep?: number
  /** Hide the native scrollbar */
  hideScrollbar?: boolean
  /** Accessible name of the scroll region */
  label?: string
  /** Classes for the scrolling element */
  viewportClassName?: string
  labels?: Partial<FadeScrollerLabels>
}

// The viewport exposes a named scroll timeline; timeline-scope lifts it to the
// root, so the root and the arrows can animate on it. The start fade grows over
// the first fadeSize px of scroll, the end fade shrinks over the last fadeSize px.
// No overflow means an inactive timeline: no fades, arrows stay hidden.
const css = `
@property --gooseui-fs-start{syntax:"<length>";inherits:true;initial-value:0px}
@property --gooseui-fs-end{syntax:"<length>";inherits:true;initial-value:0px}
@keyframes gooseui-fs-start{from{--gooseui-fs-start:0px}to{--gooseui-fs-start:var(--gooseui-fs-size)}}
@keyframes gooseui-fs-end{from{--gooseui-fs-end:var(--gooseui-fs-size)}to{--gooseui-fs-end:0px}}
@keyframes gooseui-fs-arrow{from{opacity:0;visibility:hidden}to{opacity:1;visibility:visible}}
[data-fade-scroller]{--gooseui-fs-dir:to right;timeline-scope:--gooseui-fs}
[data-fade-scroller][data-orientation="vertical"]{--gooseui-fs-dir:to bottom}
[data-fade-scroller][data-orientation="horizontal"]:dir(rtl){--gooseui-fs-dir:to left}
[data-fade-scroller-viewport]{scroll-timeline:--gooseui-fs inline;
-webkit-mask-image:linear-gradient(var(--gooseui-fs-dir),transparent 0,#000 var(--gooseui-fs-start),#000 calc(100% - var(--gooseui-fs-end)),transparent 100%);
mask-image:linear-gradient(var(--gooseui-fs-dir),transparent 0,#000 var(--gooseui-fs-start),#000 calc(100% - var(--gooseui-fs-end)),transparent 100%)}
[data-fade-scroller][data-orientation="vertical"]>[data-fade-scroller-viewport]{scroll-timeline:--gooseui-fs block}
[data-fade-scroller]{animation:gooseui-fs-start linear both,gooseui-fs-end linear both;animation-timeline:--gooseui-fs,--gooseui-fs;
animation-range:0px var(--gooseui-fs-size),calc(100% - var(--gooseui-fs-size)) 100%}
[data-fade-scroller-arrow]{opacity:0;visibility:hidden;animation:gooseui-fs-arrow linear both;animation-timeline:--gooseui-fs}
[data-fade-scroller-arrow="prev"]{animation-range:0px var(--gooseui-fs-size)}
[data-fade-scroller-arrow="next"]{animation-direction:reverse;animation-range:calc(100% - var(--gooseui-fs-size)) 100%}
@supports not (animation-timeline:scroll()){[data-fade-scroller-arrow]{opacity:1;visibility:visible}}
@media (scripting:none){[data-fade-scroller-arrow]{display:none}}
@media not all and (hover:hover) and (pointer:fine){[data-fade-scroller-arrow][data-auto]{display:none}}
[data-fade-scroller]:has(>[data-fade-scroller-viewport]:focus-visible){outline:2px solid var(--ring);outline-offset:2px}
`

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export function FadeScroller({
  orientation = "horizontal",
  fadeSize = 40,
  showArrows = "auto",
  wheel = true,
  scrollStep = 0.8,
  hideScrollbar = false,
  label = "Scrollable content",
  viewportClassName,
  labels: labelsProp,
  className,
  style,
  children,
  ...props
}: FadeScrollerProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const horizontal = orientation === "horizontal"

  const arrow = (dir: 1 | -1) => {
    const start = dir === -1
    const place = horizontal
      ? cn("top-1/2 -translate-y-1/2", start ? "start-1" : "end-1")
      : cn("left-1/2 -translate-x-1/2", start ? "top-1" : "bottom-1")
    const rotate = horizontal
      ? start
        ? "rotate-180 rtl:rotate-0"
        : "rtl:rotate-180"
      : start
        ? "-rotate-90"
        : "rotate-90"
    return (
      <FadeScrollerArrow
        dir={dir}
        step={scrollStep}
        auto={showArrows === "auto"}
        label={start ? labels.previous : labels.next}
        className={cn(
          "absolute z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full border bg-background/90 text-foreground shadow-sm backdrop-blur hover:bg-accent",
          place,
        )}
      >
        <Chevron className={rotate} />
      </FadeScrollerArrow>
    )
  }

  return (
    <div
      data-fade-scroller=""
      data-orientation={orientation}
      className={cn("relative rounded-md", className)}
      style={
        { "--gooseui-fs-size": `${fadeSize}px`, ...style } as CSSProperties
      }
      {...props}
    >
      <style href="gooseui-fade-scroller" precedence="default">
        {css}
      </style>
      <FadeScrollerViewport
        wheel={wheel && horizontal}
        data-fade-scroller-viewport=""
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "outline-none",
          horizontal
            ? "overflow-x-auto overflow-y-hidden overscroll-x-contain"
            : "h-full overflow-y-auto overscroll-y-contain",
          hideScrollbar &&
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          viewportClassName,
        )}
      >
        <div className={horizontal ? "w-max min-w-full" : undefined}>
          {children}
        </div>
      </FadeScrollerViewport>
      {showArrows !== false && (
        <>
          {arrow(-1)}
          {arrow(1)}
        </>
      )}
    </div>
  )
}
