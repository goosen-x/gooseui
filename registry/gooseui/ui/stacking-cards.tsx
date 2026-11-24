"use client"

import * as React from "react"
import { useGlobalStyles } from "@/hooks/use-global-styles"
import { cn } from "@/lib/utils"

const STACKING_CARDS_STYLES = `
.stacking-card-wrapper {
  animation: stack-scale linear;
  animation-timeline: view();
  animation-range: exit -100px exit 100px;
}

@keyframes stack-scale {
  to {
    transform: scale(0.95);
    opacity: 0.8;
  }
}
`

interface StackingCardProps {
  children: React.ReactNode
  className?: string
  /** Card index (0-based), assigned by the container */
  index?: number
  /** Base sticky top position in pixels, assigned by the container */
  stickyTop?: number
  /** Offset between stacked cards in pixels, assigned by the container */
  stackOffset?: number
}

/**
 * Stacking Card
 *
 * Card that sticks and stacks on top of previous cards when scrolling.
 * Only the mechanics live here: the look (padding, colors, accents) is yours.
 * The card is opaque (bg-card) and casts a soft shadow upward so cards
 * underneath never show through.
 */
export function StackingCard({
  children,
  className,
  index = 0,
  stickyTop = 100,
  stackOffset = 20,
}: StackingCardProps) {
  return (
    <div
      className={cn(
        "sticky overflow-hidden rounded-xl border bg-card text-card-foreground",
        "shadow-[0_-12px_32px_-12px_rgb(0_0_0/0.18),0_12px_32px_-12px_rgb(0_0_0/0.2)]",
        // Dark theme: a lighter surface and a stronger edge, so the stack stays readable
        "dark:border-foreground/15 dark:bg-[color-mix(in_oklab,var(--card),var(--foreground)_6%)]",
        "dark:shadow-[0_-10px_28px_-8px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.04)]",
        className,
      )}
      style={{
        top: `${stickyTop + index * stackOffset}px`,
        zIndex: index + 1,
      }}
    >
      {children}
    </div>
  )
}

interface StackingCardsContainerProps {
  children: React.ReactNode
  className?: string
  /** Base sticky top position in pixels */
  stickyTop?: number
  /** Offset between stacked cards in pixels */
  stackOffset?: number
  /**
   * Empty space after the last card (px or any CSS length). It sits inside the
   * sticky range, so the scroll ends right when the last card is in place:
   * endSpace = scrollport height - stickyTop - stackOffset * (cards - 1)
   * - card height - gap above it. Container padding can't do this: sticky
   * cards are bounded by the content box.
   */
  endSpace?: number | string
}

/**
 * Stacking Cards Container
 *
 * Container for StackingCard components.
 * Cards will stack on top of each other as user scrolls.
 */
export function StackingCardsContainer({
  children,
  className,
  stickyTop,
  stackOffset,
  endSpace = "50vh",
}: StackingCardsContainerProps) {
  // Clone children with index and offsets
  const cards = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        index,
        stickyTop,
        stackOffset,
      } as Partial<StackingCardProps>)
    }
    return child
  })

  return (
    <div className={cn("relative space-y-4", className)}>
      {cards}
      <div
        aria-hidden="true"
        style={{
          height: typeof endSpace === "number" ? `${endSpace}px` : endSpace,
        }}
      />
    </div>
  )
}

/**
 * Stacking Cards with Scroll Animation
 *
 * Enhanced version with scroll-driven scale animation.
 */
export function StackingCardsAnimated({
  children,
  className,
}: StackingCardsContainerProps) {
  return (
    <>
      <StackingCardsStyles />
      <div className={cn("relative space-y-4 pb-[50vh]", className)}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <div
                className="stacking-card-wrapper sticky"
                style={{
                  top: `${100 + index * 20}px`,
                  zIndex: index + 1,
                }}
              >
                {child}
              </div>
            )
          }
          return child
        })}
      </div>
    </>
  )
}

export function StackingCardsStyles() {
  useGlobalStyles(STACKING_CARDS_STYLES, "stacking-cards-styles")
  return null
}
