"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MorphingHeaderProps {
  children: React.ReactNode
  className?: string
  /** Compact mode threshold (scroll position in px) */
  compactThreshold?: number
}

/**
 * Morphing Header
 *
 * Header that morphs between full and compact states
 * using View Transitions API + scroll detection.
 *
 * @see https://developer.chrome.com/docs/web-platform/view-transitions
 */
export function MorphingHeader({
  children,
  className,
  compactThreshold = 100,
}: MorphingHeaderProps) {
  const [isCompact, setIsCompact] = React.useState(false)
  const isTransitioning = React.useRef(false)
  const lastCompactState = React.useRef(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const shouldBeCompact = window.scrollY > compactThreshold

      // Skip if state hasn't changed or transition in progress
      if (
        shouldBeCompact === lastCompactState.current ||
        isTransitioning.current
      ) {
        return
      }

      lastCompactState.current = shouldBeCompact

      // Use View Transitions API if available
      if (document.startViewTransition) {
        isTransitioning.current = true
        const transition = document.startViewTransition(() => {
          setIsCompact(shouldBeCompact)
        })
        transition.finished
          .then(() => {
            isTransitioning.current = false
          })
          .catch(() => {
            isTransitioning.current = false
          })
      } else {
        setIsCompact(shouldBeCompact)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [compactThreshold])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur",
        "transition-all duration-300",
        isCompact ? "py-2" : "py-4",
        className,
      )}
      style={{
        viewTransitionName: "morphing-header",
      }}
      role="banner"
      aria-label="Site header"
    >
      <div className="mx-auto max-w-screen-xl px-4">
        {typeof children === "function"
          ? (children as (isCompact: boolean) => React.ReactNode)(isCompact)
          : children}
      </div>
    </header>
  )
}

interface MorphingLogoProps {
  src: string
  alt?: string
  className?: string
  /** Compact size */
  compactSize?: number
  /** Full size */
  fullSize?: number
  /** Is header compact */
  isCompact?: boolean
}

/**
 * Morphing Logo
 *
 * Logo that smoothly transitions between sizes.
 */
export function MorphingLogo({
  src,
  alt = "",
  className,
  compactSize = 32,
  fullSize = 48,
  isCompact = false,
}: MorphingLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("transition-all duration-300", className)}
      style={{
        height: isCompact ? compactSize : fullSize,
        width: "auto",
        viewTransitionName: "morphing-logo",
      }}
    />
  )
}

interface MorphingNavProps {
  children: React.ReactNode
  className?: string
  /** Is header compact */
  isCompact?: boolean
}

/**
 * Morphing Nav
 *
 * Navigation that adjusts based on header state.
 */
export function MorphingNav({
  children,
  className,
  isCompact = false,
}: MorphingNavProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-4 transition-all duration-300",
        isCompact ? "gap-2 text-sm" : "gap-4",
        className,
      )}
      style={{
        viewTransitionName: "morphing-nav",
      }}
    >
      {children}
    </nav>
  )
}
