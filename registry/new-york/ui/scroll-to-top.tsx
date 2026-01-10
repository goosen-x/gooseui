"use client"

import { ArrowUp, ChevronUp } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollToTopProps {
  /** Scroll threshold in pixels before showing button */
  threshold?: number
  /** Scroll behavior */
  behavior?: ScrollBehavior
  /** Additional CSS classes */
  className?: string
  /** Animation duration in ms */
  animationDuration?: number
}

interface ScrollToTopDefaultProps extends ScrollToTopProps {
  /** Button size */
  size?: "sm" | "md" | "lg"
}

interface ScrollToTopPillProps extends ScrollToTopProps {
  /** Custom label text */
  label?: string
}

interface ScrollToTopProgressProps extends ScrollToTopProps {
  /** Progress circle color */
  progressColor?: string
  /** Progress circle background color */
  progressBgColor?: string
  /** Progress circle stroke width */
  strokeWidth?: number
}

/**
 * Hook to track scroll position and visibility
 */
function useScrollToTop(threshold: number = 300) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      setIsVisible(scrollTop > threshold)
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  const scrollToTop = React.useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      window.scrollTo({ top: 0, behavior })
    },
    [],
  )

  return { isVisible, scrollProgress, scrollToTop }
}

/**
 * ScrollToTop - Default variant
 *
 * Circular button with arrow icon
 */
export function ScrollToTop({
  threshold = 300,
  behavior = "smooth",
  className,
  size = "md",
}: ScrollToTopDefaultProps) {
  const { isVisible, scrollToTop } = useScrollToTop(threshold)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const sizeClasses = {
    sm: "size-10",
    md: "size-12",
    lg: "size-14",
  }

  const iconSizes = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  }

  const handleClick = () => {
    setIsAnimating(true)
    scrollToTop(behavior)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full",
        "bg-primary text-primary-foreground shadow-lg",
        "transition-all duration-300 ease-out",
        "hover:scale-110 hover:shadow-xl active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "cursor-pointer",
        sizeClasses[size],
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      {/* Click ripple animation */}
      {isAnimating && (
        <span
          className="absolute inset-0 rounded-full animate-ping bg-primary-foreground/30"
          style={{ animationDuration: "600ms", animationIterationCount: 1 }}
        />
      )}
      <ArrowUp
        className={cn(
          iconSizes[size],
          "relative z-10 transition-transform",
          isAnimating && "animate-bounce",
        )}
        style={isAnimating ? { animationDuration: "500ms" } : undefined}
      />
    </button>
  )
}

/**
 * ScrollToTopPill - Pill variant
 *
 * Elongated button with text label
 */
export function ScrollToTopPill({
  threshold = 300,
  behavior = "smooth",
  className,
  label = "Scroll to top",
}: ScrollToTopPillProps) {
  const { isVisible, scrollToTop } = useScrollToTop(threshold)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    scrollToTop(behavior)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full",
        "bg-primary text-primary-foreground text-sm font-medium shadow-lg",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:bg-primary/90 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "cursor-pointer",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      {/* Click ripple animation */}
      {isAnimating && (
        <span
          className="absolute inset-0 rounded-full animate-ping bg-primary-foreground/30"
          style={{ animationDuration: "600ms", animationIterationCount: 1 }}
        />
      )}
      <ChevronUp
        className={cn(
          "size-4 relative z-10 transition-transform",
          isAnimating && "animate-bounce",
        )}
        style={isAnimating ? { animationDuration: "500ms" } : undefined}
      />
      <span className="relative z-10">{label}</span>
    </button>
  )
}

/**
 * ScrollToTopMinimal - Minimal variant
 *
 * Icon-only button without background
 */
export function ScrollToTopMinimal({
  threshold = 300,
  behavior = "smooth",
  className,
}: ScrollToTopProps) {
  const { isVisible, scrollToTop } = useScrollToTop(threshold)

  return (
    <button
      type="button"
      onClick={() => scrollToTop(behavior)}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center size-10",
        "text-muted-foreground",
        "transition-all duration-300 ease-out",
        "hover:text-foreground hover:scale-110 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "cursor-pointer",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      <ArrowUp className="size-6" />
    </button>
  )
}

/**
 * ScrollToTopProgress - Progress variant
 *
 * Circular button with scroll progress indicator
 */
export function ScrollToTopProgress({
  threshold = 300,
  behavior = "smooth",
  className,
  progressColor,
  progressBgColor,
  strokeWidth = 3,
}: ScrollToTopProgressProps) {
  const { isVisible, scrollProgress, scrollToTop } = useScrollToTop(threshold)
  const [isAnimating, setIsAnimating] = React.useState(false)

  // Circle dimensions
  const size = 48
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference

  const handleClick = () => {
    setIsAnimating(true)
    scrollToTop(behavior)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Scroll to top (${Math.round(scrollProgress)}% scrolled)`}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center size-12",
        "bg-background rounded-full shadow-lg",
        "transition-all duration-300 ease-out",
        "hover:scale-110 hover:shadow-xl active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "cursor-pointer",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      {/* Click ripple animation */}
      {isAnimating && (
        <span
          className="absolute inset-0 rounded-full animate-ping bg-primary/30"
          style={{ animationDuration: "600ms", animationIterationCount: 1 }}
        />
      )}
      {/* Progress circle SVG */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressBgColor || "currentColor"}
          strokeWidth={strokeWidth}
          className={cn(!progressBgColor && "text-muted")}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor || "currentColor"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            "transition-[stroke-dashoffset] duration-150 ease-out",
            !progressColor && "text-primary",
          )}
        />
      </svg>
      {/* Arrow icon with bounce animation on click */}
      <ArrowUp
        className={cn(
          "size-5 text-foreground relative z-10 transition-transform",
          isAnimating && "animate-bounce",
        )}
        style={isAnimating ? { animationDuration: "500ms" } : undefined}
      />
    </button>
  )
}

/**
 * ScrollToTopText - Text variant with animated icon
 *
 * Minimal text button with animated circle progress
 */
export function ScrollToTopText({
  threshold = 300,
  behavior = "smooth",
  className,
  label = "Scroll to top",
}: ScrollToTopPillProps) {
  const { isVisible, scrollProgress, scrollToTop } = useScrollToTop(threshold)
  const [isAnimating, setIsAnimating] = React.useState(false)

  // Circle dimensions for viewBox 0 0 24 24
  const radius = 10
  const circumference = 2 * Math.PI * radius
  const circleOffset = circumference - (scrollProgress / 100) * circumference
  const arrowPathLength = 20

  const handleClick = () => {
    setIsAnimating(true)
    scrollToTop(behavior)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        "group fixed bottom-6 right-6 z-50 flex items-center gap-1.5",
        "text-muted-foreground hover:text-foreground",
        "transition-all duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "cursor-pointer",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      <span className="text-sm font-medium">{label}</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="overflow-visible"
      >
        {/* Background circle */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circleOffset}
          className="transition-all duration-500 ease-out"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
        {/* Arrow path */}
        <path
          d="M12 16V8M8 12l4-4 4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray={arrowPathLength}
          strokeDashoffset={isVisible ? 0 : arrowPathLength}
          className={cn(
            "transition-all duration-500 ease-out",
            isAnimating && "animate-pulse",
          )}
        />
      </svg>
    </button>
  )
}

// Named exports for convenience
export { useScrollToTop }
