import * as React from "react"

import { cn } from "@/lib/utils"
import { CarouselController } from "@/registry/gooseui/ui/carousel.client"

/* -------------------------------------------------------------------------------------------------
 * Styles
 * Without JavaScript the arrows stay disabled, counter and progress hide,
 * and browsers with ::scroll-button draw native arrows instead.
 * -------------------------------------------------------------------------------------------------*/

const STYLE = `
.gooseui-carousel [data-slot=carousel-viewport]{scrollbar-width:none}
.gooseui-carousel [data-slot=carousel-viewport]::-webkit-scrollbar{display:none}
@media (prefers-reduced-motion:no-preference){.gooseui-carousel :is([data-slot=carousel-viewport],[data-carousel-strip]){scroll-behavior:smooth}}
.gooseui-carousel [data-carousel-strip]{scrollbar-width:none}
.gooseui-carousel [data-carousel-strip]::-webkit-scrollbar{display:none}
@supports (scroll-target-group:auto){
.gooseui-carousel [data-slot=carousel-dots]{scroll-target-group:auto}
.gooseui-carousel [data-slot=carousel-dots] [data-carousel-dot]:target-current{background:var(--primary);color:var(--primary-foreground)}
.gooseui-carousel [data-carousel-strip]{scroll-target-group:auto}
.gooseui-carousel [data-carousel-thumb]:target-current{border-color:var(--primary);opacity:1}
.gooseui-carousel [data-variant=dots] [data-carousel-dot]:target-current{scale:1.25}
.gooseui-carousel [data-variant=line] [data-carousel-dot]:target-current{width:1.5rem}
}
@media (scripting:none){
.gooseui-carousel :is([data-slot=carousel-counter],[data-slot=carousel-progress]){display:none}
@supports selector(::scroll-button(*)){
.gooseui-carousel :is([data-slot=carousel-previous],[data-slot=carousel-next]){display:none}
.gooseui-carousel [data-slot=carousel-viewport]::scroll-button(*){position:absolute;z-index:10;display:grid;place-items:center;width:2.5rem;height:2.5rem;border:1px solid var(--border);border-radius:999px;background:color-mix(in oklab,var(--background) 80%,transparent);color:var(--foreground);font-size:1.25rem;line-height:1;cursor:pointer;box-shadow:0 1px 2px rgb(0 0 0/.08)}
.gooseui-carousel [data-slot=carousel-viewport]::scroll-button(*):disabled{opacity:.4;cursor:not-allowed}
.gooseui-carousel [data-slot=carousel-viewport]::scroll-button(*):focus-visible{outline:2px solid var(--ring);outline-offset:2px}
.gooseui-carousel[data-orientation=horizontal] [data-slot=carousel-viewport]::scroll-button(left){content:"\\2039"/"Previous slide";left:.5rem;top:50%;translate:0 -50%}
.gooseui-carousel[data-orientation=horizontal] [data-slot=carousel-viewport]::scroll-button(right){content:"\\203A"/"Next slide";right:.5rem;top:50%;translate:0 -50%}
.gooseui-carousel[data-orientation=vertical] [data-slot=carousel-viewport]::scroll-button(up){content:"\\2039"/"Previous slide";top:.5rem;left:50%;translate:-50% 0;rotate:90deg}
.gooseui-carousel[data-orientation=vertical] [data-slot=carousel-viewport]::scroll-button(down){content:"\\203A"/"Next slide";bottom:.5rem;left:50%;translate:-50% 0;rotate:90deg}
}}
`

/* -------------------------------------------------------------------------------------------------
 * Carousel
 * -------------------------------------------------------------------------------------------------*/

interface CarouselProps extends React.ComponentProps<"div"> {
  /** Scroll direction */
  orientation?: "horizontal" | "vertical"
  /** Kept for compatibility: touch and trackpad scrolling are native */
  draggable?: boolean
  /** Arrows jump from the last slide to the first and back (needs JS) */
  loop?: boolean
  /** Auto-play interval in ms, 0 turns it off (needs JS) */
  autoPlay?: number
  /** Pause auto-play while the pointer is over the carousel */
  pauseOnHover?: boolean
}

type Wiring = { count: number; baseId: string }

/** Gives dots, progress and counter the slide count, even when they are nested in plain elements */
function wire(node: React.ReactNode, wiring: Wiring): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) {
      return child
    }
    if (
      child.type === CarouselDots ||
      child.type === CarouselThumbnails ||
      child.type === CarouselProgress ||
      child.type === CarouselCounter
    ) {
      return React.cloneElement(child as React.ReactElement<Wiring>, wiring)
    }
    if (typeof child.type === "string" && child.props.children) {
      return React.cloneElement(
        child,
        undefined,
        wire(child.props.children, wiring),
      )
    }
    return child
  })
}

function Carousel({
  className,
  children,
  orientation = "horizontal",
  draggable: _draggable,
  loop = false,
  autoPlay = 0,
  pauseOnHover = true,
  ...props
}: CarouselProps) {
  const baseId = `carousel-${React.useId().replace(/[^\w-]/g, "")}`
  const items: React.ReactNode[] = []
  const navButtons: React.ReactNode[] = []
  const other: React.ReactNode[] = []
  const thumbnails: React.ReactElement<CarouselThumbnailsProps>[] = []

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<CarouselItemProps>(child)) {
      other.push(child)
    } else if (child.type === CarouselThumbnails) {
      thumbnails.push(
        child as unknown as React.ReactElement<CarouselThumbnailsProps>,
      )
    } else if (child.type === CarouselItem) {
      items.push(
        React.cloneElement(child, {
          id: child.props.id ?? `${baseId}-${items.length}`,
        }),
      )
    } else if (child.type === CarouselPrevious || child.type === CarouselNext) {
      navButtons.push(child)
    } else {
      other.push(child)
    }
  })

  const vertical = orientation === "vertical"
  const position = thumbnails[0]?.props.position ?? "bottom"
  const side = position !== "bottom"

  return (
    <div
      data-slot="carousel"
      data-orientation={orientation}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      className={cn(
        "gooseui-carousel group/carousel relative",
        vertical ? "h-full" : "w-full",
        side && "flex gap-3",
        className,
      )}
      {...props}
    >
      <style href="gooseui-carousel" precedence="default">
        {STYLE}
      </style>
      <div className={cn(side && "min-w-0 flex-1", vertical && "h-full")}>
        {/* Wrapper for viewport + nav buttons (buttons position relative to this) */}
        <div className={cn("relative", vertical && "h-full")}>
          {/* Focusable scroller: arrow keys scroll it natively */}
          <div
            data-slot="carousel-viewport"
            tabIndex={0}
            className={cn(
              "flex gap-4 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              vertical
                ? "h-full snap-y snap-mandatory flex-col overflow-y-auto overscroll-y-contain [&>*]:h-full [&>*]:shrink-0"
                : "snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
            )}
          >
            {items}
          </div>
          {navButtons}
        </div>
        {wire(other, { count: items.length, baseId })}
      </div>
      {wire(thumbnails, { count: items.length, baseId })}
      <CarouselController
        loop={loop}
        autoPlay={autoPlay}
        pauseOnHover={pauseOnHover}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CarouselContent
 * -------------------------------------------------------------------------------------------------*/

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="carousel-content"
      className={cn("flex gap-4", className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * CarouselItem
 * -------------------------------------------------------------------------------------------------*/

const itemSizes = {
  full: "w-full",
  "1/2": "w-1/2",
  "1/3": "w-1/3",
  "1/4": "w-1/4",
  auto: "w-auto",
}

interface CarouselItemProps extends React.ComponentProps<"div"> {
  /** Item width */
  size?: keyof typeof itemSizes | null
}

function CarouselItem({ className, size, ...props }: CarouselItemProps) {
  return (
    <div
      data-slot="carousel-item"
      data-carousel-item
      role="group"
      aria-roledescription="slide"
      className={cn(
        "shrink-0 snap-start",
        itemSizes[size ?? "full"],
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * CarouselPrevious / CarouselNext
 * -------------------------------------------------------------------------------------------------*/

interface CarouselButtonProps extends React.ComponentProps<"button"> {
  /** Icon size */
  iconSize?: number
}

const buttonClass =
  "absolute z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border bg-background/80 shadow-sm backdrop-blur-sm transition-[scale,opacity,background-color] hover:scale-105 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 group-data-[orientation=vertical]/carousel:left-1/2 group-data-[orientation=vertical]/carousel:-translate-x-1/2 group-data-[orientation=vertical]/carousel:rotate-90 group-data-[orientation=horizontal]/carousel:top-1/2 group-data-[orientation=horizontal]/carousel:-translate-y-1/2"

function Chevron({ size, flip }: { size: number; flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={flip ? "rotate-180" : undefined}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

/** Disabled until the client part loads, then scrolls one slide back */
function CarouselPrevious({
  className,
  iconSize = 16,
  children,
  ...props
}: CarouselButtonProps) {
  return (
    <button
      data-slot="carousel-previous"
      data-carousel-prev
      type="button"
      disabled
      aria-label="Previous slide"
      className={cn(
        buttonClass,
        "group-data-[orientation=horizontal]/carousel:left-2 group-data-[orientation=vertical]/carousel:top-2",
        className,
      )}
      {...props}
    >
      {children ?? <Chevron size={iconSize} />}
    </button>
  )
}

/** Disabled until the client part loads, then scrolls one slide forward */
function CarouselNext({
  className,
  iconSize = 16,
  children,
  ...props
}: CarouselButtonProps) {
  return (
    <button
      data-slot="carousel-next"
      data-carousel-next
      type="button"
      disabled
      aria-label="Next slide"
      className={cn(
        buttonClass,
        "group-data-[orientation=horizontal]/carousel:right-2 group-data-[orientation=vertical]/carousel:bottom-2",
        className,
      )}
      {...props}
    >
      {children ?? <Chevron size={iconSize} flip />}
    </button>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CarouselDots
 * -------------------------------------------------------------------------------------------------*/

interface CarouselDotsProps extends React.ComponentProps<"div"> {
  /** Variant style for dots */
  variant?: "dots" | "line" | "numbers"
  /** Accessible name of a dot link */
  slideLabel?: (index: number) => string
  /** Set by Carousel */
  count?: number
  /** Set by Carousel */
  baseId?: string
}

const dotVariants = {
  dots: "size-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 aria-[current=true]:scale-125 aria-[current=true]:bg-primary",
  line: "h-1 w-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 aria-[current=true]:w-6 aria-[current=true]:bg-primary",
  numbers:
    "flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium hover:bg-muted-foreground/20 aria-[current=true]:bg-primary aria-[current=true]:text-primary-foreground",
}

/** Links to every slide. They work without JavaScript */
function CarouselDots({
  className,
  variant = "dots",
  slideLabel = (index) => `Go to slide ${index}`,
  count = 0,
  baseId = "",
  ...props
}: CarouselDotsProps) {
  if (count === 0) return null

  return (
    <div
      data-slot="carousel-dots"
      data-variant={variant}
      role="group"
      aria-label="Choose slide"
      className={cn("flex items-center justify-center gap-2 py-4", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => (
        <a
          key={index}
          href={`#${baseId}-${index}`}
          data-carousel-dot={index}
          aria-label={slideLabel(index + 1)}
          className={cn(
            "cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            dotVariants[variant],
          )}
        >
          {variant === "numbers" ? index + 1 : null}
        </a>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CarouselThumbnails
 * -------------------------------------------------------------------------------------------------*/

interface CarouselThumbnail {
  /** Full image, also used for the thumbnail when `thumbnail` is not set */
  src: string
  /** Alt text of the slide image. The thumbnail itself is decorative */
  alt?: string
  /** Smaller image for the strip */
  thumbnail?: string
}

interface CarouselThumbnailsProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** One entry per slide, in the same order */
  images: CarouselThumbnail[]
  /** Where the strip sits. "left" and "right" lay the strip out vertically */
  position?: "bottom" | "left" | "right"
  /** Accessible name of a thumbnail link */
  slideLabel?: (index: number) => string
  /** Set by Carousel */
  count?: number
  /** Set by Carousel */
  baseId?: string
}

/** Strip of image links to the slides. They work without JavaScript, the client part keeps the active one in view */
function CarouselThumbnails({
  className,
  images,
  position = "bottom",
  slideLabel = (index) => `Go to slide ${index}`,
  count = 0,
  baseId = "",
  ...props
}: CarouselThumbnailsProps) {
  if (count < 2) return null
  const side = position !== "bottom"

  return (
    <div
      data-slot="carousel-thumbnails"
      data-position={position}
      className={cn(
        "relative shrink-0",
        side ? "w-20 sm:w-24" : "mt-3",
        position === "left" && "order-first",
        className,
      )}
      {...props}
    >
      <div
        data-carousel-strip
        role="group"
        aria-label="Choose slide"
        className={cn(
          "flex gap-2 p-1",
          side
            ? "absolute inset-0 flex-col overflow-y-auto"
            : "overflow-x-auto",
        )}
      >
        {images.slice(0, count).map((image, index) => (
          <a
            key={`${image.src}-${index}`}
            href={`#${baseId}-${index}`}
            data-carousel-dot={index}
            data-carousel-thumb
            aria-label={slideLabel(index + 1)}
            className={cn(
              "relative aspect-[4/3] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 border-transparent bg-muted opacity-60 outline-none transition-[opacity,border-color] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-[current=true]:border-primary aria-[current=true]:opacity-100",
              side ? "w-full" : "w-20 sm:w-24",
            )}
          >
            <img
              src={image.thumbnail ?? image.src}
              alt=""
              draggable={false}
              loading="lazy"
              className="size-full object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CarouselProgress
 * -------------------------------------------------------------------------------------------------*/

interface CarouselIndicatorProps extends React.ComponentProps<"div"> {
  /** Set by Carousel */
  count?: number
  /** Set by Carousel */
  baseId?: string
}

function CarouselProgress({
  className,
  count = 0,
  baseId: _baseId,
  ...props
}: CarouselIndicatorProps) {
  if (count === 0) return null

  return (
    <div
      data-slot="carousel-progress"
      role="progressbar"
      aria-valuenow={1}
      aria-valuemin={1}
      aria-valuemax={count}
      aria-label="Slide"
      className={cn(
        "h-1 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
      {...props}
    >
      <div
        className="h-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
        style={{ width: `var(--carousel-progress, ${100 / count}%)` }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CarouselCounter
 * -------------------------------------------------------------------------------------------------*/

function CarouselCounter({
  className,
  count = 0,
  baseId: _baseId,
  ...props
}: CarouselIndicatorProps) {
  if (count === 0) return null

  return (
    <div
      data-slot="carousel-counter"
      aria-live="polite"
      aria-atomic="true"
      className={cn("text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    >
      <span data-carousel-current className="font-medium text-foreground">
        1
      </span>
      <span className="mx-1">/</span>
      <span>{count}</span>
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------------------------------*/

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselThumbnails,
  CarouselProgress,
  CarouselCounter,
  type CarouselProps,
  type CarouselItemProps,
  type CarouselButtonProps,
  type CarouselDotsProps,
  type CarouselThumbnail,
  type CarouselThumbnailsProps,
  type CarouselIndicatorProps,
}
