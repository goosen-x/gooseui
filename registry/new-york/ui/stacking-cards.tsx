"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StackingCardProps {
  children: React.ReactNode
  className?: string
  /** Card index (0-based) for stacking offset */
  index?: number
}

/**
 * Stacking Card
 *
 * Card that stacks on top of previous cards when scrolling.
 * Uses CSS position: sticky + scroll-driven animations.
 *
 * @see https://scroll-driven-animations.style/
 */
export function StackingCard({
  children,
  className,
  index = 0,
}: StackingCardProps) {
  const topOffset = 100 + index * 20 // Stack with 20px offset

  return (
    <div
      className={cn(
        "sticky rounded-xl border bg-card shadow-lg",
        "transition-shadow duration-300",
        "hover:shadow-xl",
        className,
      )}
      style={{
        top: `${topOffset}px`,
        zIndex: index + 1,
        // Scale down slightly as cards stack
        transform: `scale(${1 - index * 0.02})`,
        transformOrigin: "center top",
      }}
    >
      {children}
    </div>
  )
}

interface StackingCardsContainerProps {
  children: React.ReactNode
  className?: string
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
}: StackingCardsContainerProps) {
  // Clone children with index prop
  const cards = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { index } as StackingCardProps)
    }
    return child
  })

  return (
    <div
      className={cn(
        "relative space-y-4",
        // Add bottom padding for last card to unstick
        "pb-[50vh]",
        className,
      )}
    >
      {cards}
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
  return (
    <style jsx global>{`
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
    `}</style>
  )
}
