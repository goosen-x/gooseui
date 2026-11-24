"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface AdaptiveCardProps {
  children: React.ReactNode
  className?: string
  /** Card image */
  image?: string
  /** Card title */
  title?: string
}

/**
 * Adaptive Card
 *
 * Uses Container Queries + :has() selector to automatically
 * adjust layout based on content and container size.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
 */
export function AdaptiveCard({
  children,
  className,
  image,
  title,
}: AdaptiveCardProps) {
  return (
    <div
      className={cn(
        "@container group/card",
        "rounded-xl border bg-card shadow-sm overflow-hidden",
        // Layout changes based on content with :has()
        "has-[img]:grid has-[img]:@sm:grid-cols-[140px_1fr] has-[img]:@md:grid-cols-[200px_1fr]",
        "[&:not(:has(img))]:flex [&:not(:has(img))]:flex-col",
        className,
      )}
    >
      {image && (
        <div className="relative aspect-video @sm:aspect-auto @sm:h-full overflow-hidden bg-muted">
          <img
            src={image}
            alt={title || ""}
            className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 p-4 @sm:p-5">
        {title && (
          <h3 className="font-semibold text-base @sm:text-lg line-clamp-2">
            {title}
          </h3>
        )}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

interface AdaptiveGridProps {
  children: React.ReactNode
  className?: string
  /** Minimum card width */
  minCardWidth?: number
}

/**
 * Adaptive Grid
 *
 * Auto-adjusting grid that responds to container size
 * using Container Queries.
 */
export function AdaptiveGrid({
  children,
  className,
  minCardWidth = 280,
}: AdaptiveGridProps) {
  return (
    <div
      className={cn(
        "@container",
        "grid gap-4",
        // Responsive columns based on container width
        "grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4",
        className,
      )}
      style={
        {
          "--min-card-width": `${minCardWidth}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
