"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------------------------------
 * Context
 * -------------------------------------------------------------------------------------------------*/

interface CarouselContextValue {
  scrollRef: React.RefObject<HTMLDivElement | null>
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  activeIndex: number
  itemCount: number
  orientation: "horizontal" | "vertical"
  draggable: boolean
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

/* -------------------------------------------------------------------------------------------------
 * Carousel
 * -------------------------------------------------------------------------------------------------*/

const carouselVariants = cva("relative", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

interface CarouselProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof carouselVariants> {
  /** Enable drag-to-scroll functionality */
  draggable?: boolean
  /** Loop back to start/end */
  loop?: boolean
  /** Auto-play interval in ms (0 to disable) */
  autoPlay?: number
  /** Pause auto-play on hover */
  pauseOnHover?: boolean
}

function Carousel({
  className,
  children,
  orientation = "horizontal",
  draggable = true,
  loop = false,
  autoPlay = 0,
  pauseOnHover = true,
  ...props
}: CarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  // Count CarouselItem children for initial render (no flash)
  const itemCount = React.useMemo(() => {
    let count = 0
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const displayName =
          typeof child.type === "function"
            ? (child.type as { displayName?: string }).displayName
            : undefined
        if (displayName === "CarouselItem") {
          count++
        }
      }
    })
    return count
  }, [children])

  // Drag state (disabled for now)
  // const isDragging = React.useRef(false)
  // const startPos = React.useRef(0)
  // const scrollStart = React.useRef(0)
  // const preventClick = React.useRef(false)

  const updateScrollState = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const isHorizontal = orientation === "horizontal"
    const scrollPos = isHorizontal ? el.scrollLeft : el.scrollTop
    const scrollSize = isHorizontal ? el.scrollWidth : el.scrollHeight
    const clientSize = isHorizontal ? el.clientWidth : el.clientHeight
    const maxScroll = scrollSize - clientSize

    // Use larger threshold for scroll-snap precision
    const threshold = 5
    setCanScrollPrev(scrollPos > threshold)
    setCanScrollNext(scrollPos < maxScroll - threshold)

    // Calculate active index
    const items = el.querySelectorAll("[data-carousel-item]")

    if (items.length > 0) {
      const itemSize = isHorizontal
        ? (items[0] as HTMLElement).offsetWidth
        : (items[0] as HTMLElement).offsetHeight
      const gap = 16 // Approximate gap
      const newIndex = Math.round(scrollPos / (itemSize + gap))
      setActiveIndex(Math.min(newIndex, items.length - 1))
    }
  }, [orientation])

  const scrollPrev = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const isHorizontal = orientation === "horizontal"
    const items = el.querySelectorAll("[data-carousel-item]")

    if (items.length === 0) return

    const itemSize = isHorizontal
      ? (items[0] as HTMLElement).offsetWidth
      : (items[0] as HTMLElement).offsetHeight

    const currentScroll = isHorizontal ? el.scrollLeft : el.scrollTop
    let targetScroll = currentScroll - itemSize - 16

    if (loop && targetScroll < 0) {
      targetScroll =
        el[isHorizontal ? "scrollWidth" : "scrollHeight"] -
        el[isHorizontal ? "clientWidth" : "clientHeight"]
    }

    el.scrollTo({
      [isHorizontal ? "left" : "top"]: Math.max(0, targetScroll),
      behavior: "smooth",
    })
  }, [orientation, loop])

  const scrollNext = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const isHorizontal = orientation === "horizontal"
    const items = el.querySelectorAll("[data-carousel-item]")

    if (items.length === 0) return

    const itemSize = isHorizontal
      ? (items[0] as HTMLElement).offsetWidth
      : (items[0] as HTMLElement).offsetHeight

    const currentScroll = isHorizontal ? el.scrollLeft : el.scrollTop
    const maxScroll =
      el[isHorizontal ? "scrollWidth" : "scrollHeight"] -
      el[isHorizontal ? "clientWidth" : "clientHeight"]
    let targetScroll = currentScroll + itemSize + 16

    if (loop && targetScroll > maxScroll) {
      targetScroll = 0
    }

    el.scrollTo({
      [isHorizontal ? "left" : "top"]: Math.min(maxScroll, targetScroll),
      behavior: "smooth",
    })
  }, [orientation, loop])

  const scrollTo = React.useCallback(
    (index: number) => {
      const el = scrollRef.current
      if (!el) return

      const items = el.querySelectorAll("[data-carousel-item]")
      const item = items[index] as HTMLElement | undefined

      if (item) {
        // Use direct scroll instead of scrollIntoView to avoid page scroll
        const isHorizontal = orientation === "horizontal"
        if (isHorizontal) {
          el.scrollTo({
            left: item.offsetLeft,
            behavior: "smooth",
          })
        } else {
          el.scrollTo({
            top: item.offsetTop,
            behavior: "smooth",
          })
        }
      }
    },
    [orientation],
  )

  // Drag handlers (disabled for now)
  /*
  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (!draggable) return

      const el = scrollRef.current
      if (!el) return

      isDragging.current = true
      preventClick.current = false
      el.style.scrollSnapType = "none"
      el.style.cursor = "grabbing"
      el.setPointerCapture(e.pointerId)

      const isHorizontal = orientation === "horizontal"
      startPos.current = isHorizontal ? e.clientX : e.clientY
      scrollStart.current = isHorizontal ? el.scrollLeft : el.scrollTop
    },
    [draggable, orientation]
  )

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return

      const el = scrollRef.current
      if (!el) return

      const isHorizontal = orientation === "horizontal"
      const currentPos = isHorizontal ? e.clientX : e.clientY
      const delta = startPos.current - currentPos

      if (Math.abs(delta) > 5) {
        preventClick.current = true
      }

      if (isHorizontal) {
        el.scrollLeft = scrollStart.current + delta
      } else {
        el.scrollTop = scrollStart.current + delta
      }
    },
    [orientation]
  )

  const handlePointerUp = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    isDragging.current = false
    el.style.scrollSnapType = orientation === "horizontal" ? "x mandatory" : "y mandatory"
    el.style.cursor = draggable ? "grab" : ""
  }, [orientation, draggable])

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    if (preventClick.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [])
  */

  // Scroll listener
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    updateScrollState()
    el.addEventListener("scroll", updateScrollState, { passive: true })

    return () => el.removeEventListener("scroll", updateScrollState)
  }, [updateScrollState])

  // Auto-play
  React.useEffect(() => {
    if (autoPlay <= 0 || isPaused) return

    const interval = setInterval(() => {
      if (canScrollNext) {
        scrollNext()
      } else if (loop) {
        scrollTo(0)
      }
    }, autoPlay)

    return () => clearInterval(interval)
  }, [autoPlay, isPaused, canScrollNext, loop, scrollNext, scrollTo])

  // Keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const isHorizontal = orientation === "horizontal"

      if (
        (isHorizontal && e.key === "ArrowLeft") ||
        (!isHorizontal && e.key === "ArrowUp")
      ) {
        e.preventDefault()
        scrollPrev()
      } else if (
        (isHorizontal && e.key === "ArrowRight") ||
        (!isHorizontal && e.key === "ArrowDown")
      ) {
        e.preventDefault()
        scrollNext()
      }
    },
    [orientation, scrollPrev, scrollNext],
  )

  const contextValue = React.useMemo(
    () => ({
      scrollRef,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
      scrollTo,
      activeIndex,
      itemCount,
      orientation: orientation ?? "horizontal",
      draggable: draggable ?? true,
    }),
    [
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
      scrollTo,
      activeIndex,
      itemCount,
      orientation,
      draggable,
    ],
  )

  // Separate children into categories:
  // - items: only CarouselItem slides (inside viewport)
  // - navButtons: prev/next buttons (inside viewport wrapper for positioning)
  // - other: everything else including indicators (outside viewport)
  const items: React.ReactNode[] = []
  const navButtons: React.ReactNode[] = []
  const other: React.ReactNode[] = []

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      other.push(child)
      return
    }
    const displayName =
      typeof child.type === "function"
        ? (child.type as { displayName?: string }).displayName
        : undefined

    if (displayName === "CarouselPrevious" || displayName === "CarouselNext") {
      navButtons.push(child)
    } else if (displayName === "CarouselItem") {
      items.push(child)
    } else {
      // Everything else (indicators, custom wrappers, etc.) goes outside viewport
      other.push(child)
    }
  })

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        className={cn(
          carouselVariants({ orientation }),
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        {...props}
      >
        {/* Wrapper for viewport + nav buttons (buttons position relative to this) */}
        <div className={cn("relative", orientation === "vertical" && "h-full")}>
          <div
            ref={scrollRef}
            data-slot="carousel-viewport"
            className={cn(
              "flex gap-4 overflow-hidden scroll-smooth",
              orientation === "horizontal"
                ? "snap-x snap-mandatory overflow-x-auto"
                : "h-full flex-col snap-y snap-mandatory overflow-y-auto [&>*]:h-full [&>*]:shrink-0",
              // Hide scrollbar
              "scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
            )}
            style={{
              scrollSnapType:
                orientation === "horizontal" ? "x mandatory" : "y mandatory",
              overscrollBehavior:
                orientation === "horizontal" ? "x contain" : "y contain",
            }}
          >
            {items}
          </div>
          {navButtons}
        </div>
        {/* Other content (indicators, custom wrappers) outside viewport */}
        {other}
      </div>
    </CarouselContext.Provider>
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

const carouselItemVariants = cva("shrink-0 snap-start scroll-ml-0", {
  variants: {
    size: {
      full: "w-full",
      "1/2": "w-1/2",
      "1/3": "w-1/3",
      "1/4": "w-1/4",
      auto: "w-auto",
    },
  },
  defaultVariants: {
    size: "full",
  },
})

interface CarouselItemProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof carouselItemVariants> {}

function CarouselItem({ className, size, ...props }: CarouselItemProps) {
  return (
    <div
      data-slot="carousel-item"
      data-carousel-item
      role="group"
      aria-roledescription="slide"
      className={cn(carouselItemVariants({ size }), className)}
      {...props}
    />
  )
}
CarouselItem.displayName = "CarouselItem"

/* -------------------------------------------------------------------------------------------------
 * CarouselPrevious
 * -------------------------------------------------------------------------------------------------*/

interface CarouselButtonProps extends React.ComponentProps<"button"> {
  /** Icon size */
  iconSize?: number
}

function CarouselPrevious({
  className,
  iconSize = 16,
  children,
  ...props
}: CarouselButtonProps) {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel()

  return (
    <button
      data-slot="carousel-previous"
      type="button"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      aria-label="Previous slide"
      className={cn(
        "absolute z-10 flex size-10 items-center justify-center rounded-full",
        "bg-background/80 backdrop-blur-sm border shadow-sm",
        "cursor-pointer transition-all hover:bg-background hover:scale-105",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        orientation === "horizontal"
          ? "left-2 top-1/2 -translate-y-1/2"
          : "top-2 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      {children ?? (
        <ChevronLeftIcon style={{ width: iconSize, height: iconSize }} />
      )}
    </button>
  )
}
CarouselPrevious.displayName = "CarouselPrevious"

/* -------------------------------------------------------------------------------------------------
 * CarouselNext
 * -------------------------------------------------------------------------------------------------*/

function CarouselNext({
  className,
  iconSize = 16,
  children,
  ...props
}: CarouselButtonProps) {
  const { scrollNext, canScrollNext, orientation } = useCarousel()

  return (
    <button
      data-slot="carousel-next"
      type="button"
      onClick={scrollNext}
      disabled={!canScrollNext}
      aria-label="Next slide"
      className={cn(
        "absolute z-10 flex size-10 items-center justify-center rounded-full",
        "bg-background/80 backdrop-blur-sm border shadow-sm",
        "cursor-pointer transition-all hover:bg-background hover:scale-105",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        orientation === "horizontal"
          ? "right-2 top-1/2 -translate-y-1/2"
          : "bottom-2 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon style={{ width: iconSize, height: iconSize }} />
      )}
    </button>
  )
}
CarouselNext.displayName = "CarouselNext"

/* -------------------------------------------------------------------------------------------------
 * CarouselDots
 * -------------------------------------------------------------------------------------------------*/

interface CarouselDotsProps extends React.ComponentProps<"div"> {
  /** Variant style for dots */
  variant?: "dots" | "line" | "numbers"
}

function CarouselDots({
  className,
  variant = "dots",
  ...props
}: CarouselDotsProps) {
  const { itemCount, activeIndex, scrollTo } = useCarousel()

  if (itemCount === 0) return null

  return (
    <div
      data-slot="carousel-dots"
      role="tablist"
      aria-label="Carousel navigation"
      className={cn("flex items-center justify-center gap-2 py-4", className)}
      {...props}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => scrollTo(index)}
          className={cn(
            "cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            variant === "dots" && [
              "size-2 rounded-full",
              index === activeIndex
                ? "bg-primary scale-125"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
            ],
            variant === "line" && [
              "h-1 rounded-full transition-all",
              index === activeIndex
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
            ],
            variant === "numbers" && [
              "size-8 rounded-full text-xs font-medium",
              index === activeIndex
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted-foreground/20",
            ],
          )}
        >
          {variant === "numbers" ? index + 1 : null}
        </button>
      ))}
    </div>
  )
}
CarouselDots.displayName = "CarouselDots"

/* -------------------------------------------------------------------------------------------------
 * CarouselProgress
 * -------------------------------------------------------------------------------------------------*/

function CarouselProgress({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { activeIndex, itemCount } = useCarousel()

  if (itemCount === 0) return null

  const progress = ((activeIndex + 1) / itemCount) * 100

  return (
    <div
      data-slot="carousel-progress"
      role="progressbar"
      aria-valuenow={activeIndex + 1}
      aria-valuemin={1}
      aria-valuemax={itemCount}
      aria-label={`Slide ${activeIndex + 1} of ${itemCount}`}
      className={cn(
        "h-1 w-full bg-muted rounded-full overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
CarouselProgress.displayName = "CarouselProgress"

/* -------------------------------------------------------------------------------------------------
 * CarouselCounter
 * -------------------------------------------------------------------------------------------------*/

function CarouselCounter({ className, ...props }: React.ComponentProps<"div">) {
  const { activeIndex, itemCount } = useCarousel()

  if (itemCount === 0) return null

  return (
    <div
      data-slot="carousel-counter"
      aria-live="polite"
      aria-atomic="true"
      className={cn("text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    >
      <span className="font-medium text-foreground">{activeIndex + 1}</span>
      <span className="mx-1">/</span>
      <span>{itemCount}</span>
    </div>
  )
}
CarouselCounter.displayName = "CarouselCounter"

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
  CarouselProgress,
  CarouselCounter,
  useCarousel,
  type CarouselProps,
  type CarouselItemProps,
  type CarouselButtonProps,
  type CarouselDotsProps,
}
