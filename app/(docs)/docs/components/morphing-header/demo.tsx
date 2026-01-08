"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollContainer } from "@/registry/new-york/ui/scroll-container"

export function MorphingHeaderDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isCompact, setIsCompact] = React.useState(false)
  const isTransitioning = React.useRef(false)
  const lastCompactState = React.useRef(false)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const shouldBeCompact = container.scrollTop > 60

      // Skip if state hasn't changed or transition in progress
      if (
        shouldBeCompact === lastCompactState.current ||
        isTransitioning.current
      ) {
        return
      }

      lastCompactState.current = shouldBeCompact

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

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <ScrollContainer
      ref={containerRef}
      height="24rem"
      autoHide={false}
      className="relative rounded-lg border bg-muted/30"
    >
      {/* Sticky Header */}
      <header
        className={cn(
          "sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur",
          "transition-all duration-300",
          isCompact ? "py-2" : "py-4",
        )}
        style={{ viewTransitionName: "demo-header" }}
      >
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold",
                  "transition-all duration-300",
                  isCompact ? "size-8 rounded-md text-sm" : "size-12",
                )}
                style={{ viewTransitionName: "demo-logo" }}
              >
                G
              </div>
              <span
                className={cn(
                  "font-semibold transition-all duration-300",
                  isCompact ? "text-base" : "text-lg",
                )}
              >
                Brand
              </span>
            </div>
            <nav
              className={cn(
                "flex items-center transition-all duration-300",
                isCompact ? "gap-2 text-xs" : "gap-4 text-sm",
              )}
              style={{ viewTransitionName: "demo-nav" }}
            >
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                Home
              </span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                About
              </span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                Contact
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="p-4 space-y-4">
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            ↓ Scroll down to see the header transform ↓
          </p>
        </div>

        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-background p-4">
            <div className="h-4 w-3/4 rounded bg-muted mb-2" />
            <div className="h-3 w-1/2 rounded bg-muted/60" />
          </div>
        ))}
      </div>
    </ScrollContainer>
  )
}
