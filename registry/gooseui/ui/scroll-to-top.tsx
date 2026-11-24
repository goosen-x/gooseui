// No "use client": every variant is a plain link to #top. Appearing, hiding and
// the progress ring run on a scroll-driven CSS animation of the nearest scroller.
// The link itself lives in scroll-to-top.client.tsx: a click scrolls only the
// container, so the fragment jump does not drag the page along.
// The namespace import keeps the legacy useScrollToTop hook below usable from
// client components without pulling hooks into the server graph.
import * as React from "react"
import { cn } from "@/lib/utils"
import {
  ScrollToTopAnchor,
  type ScrollToTopTarget,
} from "@/registry/gooseui/ui/scroll-to-top.client"

interface ScrollToTopProps {
  /** Scroll distance in pixels before the button shows up */
  threshold?: number
  /** "smooth" makes the page scroll smoothly when the link is used */
  behavior?: ScrollBehavior
  /** Additional CSS classes */
  className?: string
  /** Duration of the hover and press transitions in ms */
  animationDuration?: number
  /** Accessible name of the link */
  label?: string
  /** Fallback anchor without JavaScript. "#top" scrolls to the top of the document */
  href?: string
  /**
   * Scroll container to send to the top: a CSS selector, an element or a ref.
   * By default the nearest scrolling ancestor of the button, else the page.
   * The button appears by the scroll of its own nearest scroller, so place it inside the target.
   */
  target?: ScrollToTopTarget
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

// The button fades in over 80px of scroll after the threshold.
// Without scroll-driven animations it is simply always visible.
// Smooth scrolling is switched on for the page only while the link is hovered,
// pressed or focused, so other anchors and route changes keep their behavior.
const css = `
@keyframes gooseui-stt-show{from{opacity:0;translate:0 1rem;visibility:hidden}to{opacity:1;translate:0 0;visibility:visible}}
@keyframes gooseui-stt-progress{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}
@keyframes gooseui-stt-draw{from{stroke-dashoffset:20}to{stroke-dashoffset:0}}
@supports (animation-timeline:scroll()){
[data-gooseui-scroll-to-top],[data-gooseui-stt-draw]{animation:gooseui-stt-show linear both;animation-timeline:scroll(nearest);animation-range:var(--stt-from) var(--stt-to)}
[data-gooseui-stt-draw]{animation-name:gooseui-stt-draw}
[data-gooseui-stt-progress]{animation:gooseui-stt-progress linear both;animation-timeline:scroll(nearest)}
}
@media (prefers-reduced-motion:no-preference){html:has([data-gooseui-scroll-to-top][data-smooth]:is(:hover,:active,:focus-visible)){scroll-behavior:smooth}}
`

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}

/** Shared link: data attributes, scroll range and styles */
function TopLink({
  threshold = 300,
  behavior = "smooth",
  animationDuration = 300,
  href = "#top",
  target,
  label,
  className,
  children,
}: ScrollToTopProps & { children: React.ReactNode }) {
  return (
    <ScrollToTopAnchor
      href={href}
      scrollTarget={target}
      behavior={behavior}
      aria-label={label}
      data-gooseui-scroll-to-top=""
      data-smooth={behavior === "smooth" || undefined}
      className={cn(
        "fixed bottom-6 right-6 z-50 cursor-pointer transition-[scale,box-shadow,color,background-color] ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      style={
        {
          "--stt-from": `${threshold}px`,
          "--stt-to": `${threshold + 80}px`,
          transitionDuration: `${animationDuration}ms`,
        } as React.CSSProperties
      }
    >
      <style href="gooseui-scroll-to-top" precedence="default">
        {css}
      </style>
      {children}
    </ScrollToTopAnchor>
  )
}

/**
 * ScrollToTop - Default variant
 *
 * Circular button with arrow icon
 */
export function ScrollToTop({
  size = "md",
  label = "Scroll to top",
  className,
  ...props
}: ScrollToTopDefaultProps) {
  const sizeClasses = { sm: "size-10", md: "size-12", lg: "size-14" }
  const iconSizes = { sm: "size-4", md: "size-5", lg: "size-6" }

  return (
    <TopLink
      {...props}
      label={label}
      className={cn(
        "flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg",
        "hover:scale-110 hover:shadow-xl active:scale-95",
        sizeClasses[size],
        className,
      )}
    >
      <ArrowUpIcon className={iconSizes[size]} />
    </TopLink>
  )
}

/**
 * ScrollToTopPill - Pill variant
 *
 * Elongated button with text label
 */
export function ScrollToTopPill({
  label = "Scroll to top",
  className,
  ...props
}: ScrollToTopPillProps) {
  return (
    <TopLink
      {...props}
      className={cn(
        "flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg",
        "hover:bg-primary/90 hover:shadow-xl active:scale-95",
        className,
      )}
    >
      <ChevronUpIcon className="size-4" />
      <span>{label}</span>
    </TopLink>
  )
}

/**
 * ScrollToTopMinimal - Minimal variant
 *
 * Icon-only button without background
 */
export function ScrollToTopMinimal({
  label = "Scroll to top",
  className,
  ...props
}: ScrollToTopProps) {
  return (
    <TopLink
      {...props}
      label={label}
      className={cn(
        "flex size-10 items-center justify-center text-muted-foreground",
        "hover:scale-110 hover:text-foreground active:scale-95",
        className,
      )}
    >
      <ArrowUpIcon className="size-6" />
    </TopLink>
  )
}

/**
 * ScrollToTopProgress - Progress variant
 *
 * Circular button with a ring that fills as the page scrolls
 */
export function ScrollToTopProgress({
  label = "Scroll to top",
  className,
  progressColor,
  progressBgColor,
  strokeWidth = 3,
  ...props
}: ScrollToTopProgressProps) {
  const size = 48
  const radius = (size - strokeWidth) / 2

  return (
    <TopLink
      {...props}
      label={label}
      className={cn(
        "flex size-12 items-center justify-center rounded-full bg-background shadow-lg",
        "hover:scale-110 hover:shadow-xl active:scale-95",
        className,
      )}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressBgColor || "currentColor"}
          strokeWidth={strokeWidth}
          className={cn(!progressBgColor && "text-muted")}
        />
        <circle
          data-gooseui-stt-progress=""
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor || "currentColor"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100 100"
          strokeDashoffset={100}
          className={cn(!progressColor && "text-primary")}
        />
      </svg>
      <ArrowUpIcon className="relative size-5 text-foreground" />
    </TopLink>
  )
}

/**
 * ScrollToTopText - Text variant with a progress circle
 *
 * Minimal text link with a circle that fills as the page scrolls
 */
export function ScrollToTopText({
  label = "Scroll to top",
  className,
  ...props
}: ScrollToTopPillProps) {
  return (
    <TopLink
      {...props}
      className={cn(
        "group flex items-center gap-1.5 text-muted-foreground hover:text-foreground",
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
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="opacity-20"
        />
        <circle
          data-gooseui-stt-progress=""
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100 100"
          strokeDashoffset={100}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
        <path
          data-gooseui-stt-draw=""
          d="M12 16V8M8 12l4-4 4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray={20}
          strokeDashoffset={0}
        />
      </svg>
    </TopLink>
  )
}

/**
 * Legacy hook: scroll position and a scrollToTop helper for client components.
 * The components above do not use it.
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

export { useScrollToTop }
