import type * as React from "react"
import { Children, cloneElement, isValidElement } from "react"
import { cn } from "@/lib/utils"

export type TimelineOrientation = "vertical" | "horizontal"
export type TimelinePosition = "left" | "right" | "alternate"
export type TimelineStatus = "completed" | "current" | "upcoming"

export type TimelineLabels = Record<TimelineStatus, string>

const DEFAULT_LABELS: TimelineLabels = {
  completed: "Completed",
  current: "Current",
  upcoming: "Upcoming",
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" pathLength={1} />
    </svg>
  )
}

/** CSS string literal for a custom property, read back with content: var(). */
const cssString = (value: string) => JSON.stringify(value)

// Layout lives in grid areas keyed off data attributes, so parts can be written in any order.
const styles = `@layer components{
[data-slot=timeline-item]{display:grid;column-gap:var(--timeline-gap,.875rem)}
[data-slot=timeline-marker]{grid-area:marker}
[data-slot=timeline-connector]{grid-area:line}
[data-slot=timeline-content]{grid-area:content;min-width:0}
[data-slot=timeline-item]:last-child>[data-slot=timeline-connector]{visibility:hidden}
[data-slot=timeline][data-orientation=vertical] [data-slot=timeline-connector]{margin-block:.25rem;min-height:1rem;justify-self:center}
[data-slot=timeline][data-orientation=horizontal] [data-slot=timeline-connector]{margin-inline:.5rem;align-self:center}
[data-slot=timeline][data-orientation=vertical] [data-slot=timeline-connector][data-variant=solid]{width:2px}
[data-slot=timeline][data-orientation=horizontal] [data-slot=timeline-connector][data-variant=solid]{height:2px}
[data-slot=timeline][data-orientation=vertical] [data-slot=timeline-connector][data-variant=dashed]{width:0;border-left:2px dashed}
[data-slot=timeline][data-orientation=horizontal] [data-slot=timeline-connector][data-variant=dashed]{height:0;border-top:2px dashed}
[data-slot=timeline-status]::before{content:var(--timeline-label-current)}
[data-status=completed]>[data-slot=timeline-marker] [data-slot=timeline-status]::before{content:var(--timeline-label-completed)}
[data-status=upcoming]>[data-slot=timeline-marker] [data-slot=timeline-status]::before{content:var(--timeline-label-upcoming)}
[data-slot=timeline-fallback]{display:grid;place-items:center}
[data-slot=timeline-fallback]>*{grid-area:1/1;opacity:0;transition:opacity .25s ease,transform .35s ease;transition-delay:var(--timeline-delay,0s)}
[data-slot=timeline-fallback]>[data-for=current]{transform:scale(.3)}
:not([data-status])>[data-slot=timeline-marker] [data-slot=timeline-status]{display:none}
:not([data-status])>[data-slot=timeline-marker] [data-for=none],
[data-status=current]>[data-slot=timeline-marker] [data-for=current],
[data-status=completed]>[data-slot=timeline-marker] [data-for=completed]{opacity:1}
[data-status=current]>[data-slot=timeline-marker] [data-for=current]{transform:scale(1)}
[data-for=completed] path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .35s ease-out;transition-delay:calc(var(--timeline-delay,0s) + .1s)}
[data-status=completed]>[data-slot=timeline-marker] [data-for=completed] path{stroke-dashoffset:0}
[data-slot=timeline-connector][data-variant=solid]{position:relative;overflow:hidden}
[data-slot=timeline-connector][data-variant=solid]::after{content:"";position:absolute;inset:0;background:var(--color-primary);transform-origin:0 0;transition:transform .45s ease-in-out;transition-delay:var(--timeline-line-delay,0s)}
[data-slot=timeline][data-orientation=vertical] [data-slot=timeline-connector][data-variant=solid]::after{transform:scaleY(0)}
[data-slot=timeline][data-orientation=horizontal] [data-slot=timeline-connector][data-variant=solid]::after{transform:scaleX(0)}
[data-status=completed]>[data-slot=timeline-connector][data-variant=solid]::after{transform:scale(1)!important}
[data-slot=timeline-connector][data-variant=dashed]{transition:border-color .45s ease;transition-delay:var(--timeline-line-delay,0s)}
@media (prefers-reduced-motion:reduce){
[data-slot=timeline] *,[data-slot=timeline] *::before,[data-slot=timeline] *::after{transition-duration:0s!important;transition-delay:0s!important}
}

[data-slot=timeline][data-orientation=vertical]>[data-slot=timeline-item]{grid-template-columns:var(--timeline-marker,1.5rem) minmax(0,1fr);grid-template-rows:auto 1fr;grid-template-areas:"marker content" "line content"}
[data-slot=timeline][data-orientation=vertical] [data-slot=timeline-content]{padding-top:.125rem;padding-bottom:1.75rem}
[data-slot=timeline][data-orientation=vertical]>[data-slot=timeline-item]:last-child>[data-slot=timeline-content]{padding-bottom:0}

@media (min-width:640px){
[data-slot=timeline][data-orientation=vertical][data-position=right]>[data-slot=timeline-item]{grid-template-columns:minmax(0,1fr) var(--timeline-marker,1.5rem);grid-template-areas:"content marker" "content line"}
[data-slot=timeline][data-orientation=vertical][data-position=right] [data-slot=timeline-content]{text-align:right}
[data-slot=timeline][data-orientation=vertical][data-position=alternate]>[data-slot=timeline-item]{grid-template-columns:minmax(0,1fr) var(--timeline-marker,1.5rem) minmax(0,1fr)}
[data-slot=timeline][data-orientation=vertical][data-position=alternate]>[data-slot=timeline-item]:nth-child(odd){grid-template-areas:"content marker ." "content line ."}
[data-slot=timeline][data-orientation=vertical][data-position=alternate]>[data-slot=timeline-item]:nth-child(odd)>[data-slot=timeline-content]{text-align:right}
[data-slot=timeline][data-orientation=vertical][data-position=alternate]>[data-slot=timeline-item]:nth-child(even){grid-template-areas:". marker content" ". line content"}
}

[data-slot=timeline][data-orientation=horizontal]>[data-slot=timeline-item]{flex:1 0 0;min-width:var(--timeline-item-min,9rem);grid-template-columns:var(--timeline-marker,1.5rem) minmax(0,1fr)}
[data-slot=timeline][data-orientation=horizontal][data-position=left]>[data-slot=timeline-item]{grid-template-rows:auto 1fr;grid-template-areas:"marker line" "content content"}
[data-slot=timeline][data-orientation=horizontal][data-position=right]>[data-slot=timeline-item]{grid-template-rows:1fr auto;grid-template-areas:"content content" "marker line"}
[data-slot=timeline][data-orientation=horizontal][data-position=alternate]>[data-slot=timeline-item]{grid-template-rows:1fr auto 1fr}
[data-slot=timeline][data-orientation=horizontal][data-position=alternate]>[data-slot=timeline-item]:nth-child(odd){grid-template-areas:". ." "marker line" "content content"}
[data-slot=timeline][data-orientation=horizontal][data-position=alternate]>[data-slot=timeline-item]:nth-child(even){grid-template-areas:"content content" "marker line" ". ."}
[data-slot=timeline][data-orientation=horizontal] [data-slot=timeline-content]{padding:.75rem 1rem .75rem 0;align-self:start}
[data-slot=timeline][data-orientation=horizontal][data-position=right] [data-slot=timeline-content],
[data-slot=timeline][data-orientation=horizontal][data-position=alternate]>[data-slot=timeline-item]:nth-child(even)>[data-slot=timeline-content]{align-self:end}
}`

export type TimelineProps = React.ComponentProps<"ol"> & {
  orientation?: TimelineOrientation
  /**
   * Where the content sits relative to the line. In horizontal mode
   * `left` means below and `right` means above.
   */
  position?: TimelinePosition
  /** Screen reader text for each status. */
  labels?: Partial<TimelineLabels>
  /**
   * Index of the current step. Items before it become completed, the item at
   * it becomes current, the rest become upcoming. A `status` set on an item
   * wins over this.
   */
  activeIndex?: number
  /**
   * The previous `activeIndex`. When given, transitions across several steps
   * play one after another instead of all at once.
   */
  fromIndex?: number
}

const STEP_MS = 450

export function Timeline({
  orientation = "vertical",
  position = "left",
  labels,
  activeIndex,
  fromIndex,
  className,
  style,
  children,
  ...props
}: TimelineProps) {
  const text = { ...DEFAULT_LABELS, ...labels }
  let index = 0
  const items =
    activeIndex === undefined
      ? children
      : Children.map(children, (child) => {
          if (
            !isValidElement<TimelineItemProps>(child) ||
            child.type !== TimelineItem
          ) {
            return child
          }
          const i = index++
          const status: TimelineStatus =
            i < activeIndex
              ? "completed"
              : i === activeIndex
                ? "current"
                : "upcoming"
          const from = fromIndex ?? activeIndex
          const forward = activeIndex >= from
          const delays = {
            "--timeline-delay": `${Math.abs(i - from) * STEP_MS}ms`,
            "--timeline-line-delay": `${Math.max(0, forward ? i - from : from - 1 - i) * STEP_MS}ms`,
          }
          return cloneElement(child, {
            status: child.props.status ?? status,
            style: { ...delays, ...child.props.style } as React.CSSProperties,
          })
        })
  return (
    <>
      <style href="gooseui-timeline" precedence="default">
        {styles}
      </style>
      <ol
        data-slot="timeline"
        data-orientation={orientation}
        data-position={position}
        className={cn(
          orientation === "horizontal"
            ? // padding + negative margin keep marker rings from being clipped by the scroll container
              "-m-2 flex overflow-x-auto p-2"
            : "flex flex-col",
          className,
        )}
        {...props}
        // Status names reach every marker through inherited custom properties
        style={
          {
            "--timeline-label-completed": cssString(text.completed),
            "--timeline-label-current": cssString(text.current),
            "--timeline-label-upcoming": cssString(text.upcoming),
            ...style,
          } as React.CSSProperties
        }
      >
        {items}
      </ol>
    </>
  )
}

export type TimelineItemProps = React.ComponentProps<"li"> & {
  status?: TimelineStatus
}

export function TimelineItem({
  status,
  className,
  ...props
}: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      data-status={status}
      aria-current={status === "current" ? "step" : undefined}
      className={cn("group/timeline-item relative", className)}
      {...props}
    />
  )
}

export type TimelineMarkerProps = React.ComponentProps<"span">

/** Dot or icon on the line. Pass an icon as children to replace the default. */
export function TimelineMarker({
  className,
  children,
  ...props
}: TimelineMarkerProps) {
  // The status lives on the parent item, so the look is picked in CSS
  return (
    <span
      data-slot="timeline-marker"
      className={cn(
        "relative z-[1] flex size-[var(--timeline-marker,1.5rem)] items-center justify-center self-start rounded-full border-2 bg-background text-muted-foreground transition-[background-color,border-color,color] duration-300 [transition-delay:var(--timeline-delay,0s)] [&_svg]:size-3.5 [&_svg]:shrink-0",
        // halo ring: grows and fades in when the step becomes current
        "before:pointer-events-none before:absolute before:-inset-1.5 before:scale-50 before:rounded-full before:border-4 before:border-primary/15 before:opacity-0 before:transition-[transform,opacity] before:duration-300 before:[transition-delay:var(--timeline-delay,0s)] before:content-['']",
        "group-data-[status=current]/timeline-item:before:scale-100 group-data-[status=current]/timeline-item:before:opacity-100",
        "group-data-[status=completed]/timeline-item:border-primary group-data-[status=completed]/timeline-item:bg-primary group-data-[status=completed]/timeline-item:text-primary-foreground",
        "group-data-[status=current]/timeline-item:border-primary group-data-[status=current]/timeline-item:text-primary",
        "group-data-[status=upcoming]/timeline-item:border-dashed group-data-[status=upcoming]/timeline-item:border-muted-foreground/40",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="contents">
        {children ?? (
          <span
            data-slot="timeline-fallback"
            className="grid size-full place-items-center"
          >
            <span
              data-for="none"
              className="size-2 rounded-full bg-muted-foreground/70"
            />
            <span
              data-for="current"
              className="size-2 rounded-full bg-primary"
            />
            <span data-for="completed" className="size-3.5">
              <CheckIcon />
            </span>
          </span>
        )}
      </span>
      <span data-slot="timeline-status" className="sr-only" />
    </span>
  )
}

export type TimelineConnectorProps = React.ComponentProps<"span"> & {
  variant?: "solid" | "dashed"
}

export function TimelineConnector({
  variant = "solid",
  className,
  ...props
}: TimelineConnectorProps) {
  // Size and side come from the CSS above, keyed off the timeline orientation
  return (
    <span
      data-slot="timeline-connector"
      data-variant={variant}
      aria-hidden="true"
      className={cn(
        "block",
        variant === "solid" && "bg-border",
        variant === "dashed" &&
          "border-border group-data-[status=completed]/timeline-item:border-primary",
        className,
      )}
      {...props}
    />
  )
}

export function TimelineContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

export function TimelineTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-title"
      className={cn(
        "text-sm font-medium leading-5 text-foreground transition-colors duration-300 [transition-delay:var(--timeline-delay,0s)] group-data-[status=upcoming]/timeline-item:text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

export function TimelineDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export function TimelineTime({
  className,
  ...props
}: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn("text-xs tabular-nums text-muted-foreground", className)}
      {...props}
    />
  )
}
