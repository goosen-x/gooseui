"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Container height */
  height?: string | number
  /** Show scrollbar only on hover */
  autoHide?: boolean
  /** Scrollbar size */
  scrollbarSize?: "sm" | "md" | "lg"
}

/**
 * Scroll Container
 *
 * Container with custom styled scrollbar.
 */
export const ScrollContainer = React.forwardRef<
  HTMLDivElement,
  ScrollContainerProps
>(
  (
    {
      children,
      className,
      height = "100%",
      autoHide = true,
      scrollbarSize = "md",
      style,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "[&::-webkit-scrollbar]:w-1.5",
      md: "[&::-webkit-scrollbar]:w-2",
      lg: "[&::-webkit-scrollbar]:w-2.5",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-auto",
          // Scrollbar track
          "[&::-webkit-scrollbar]:bg-transparent",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-track]:rounded-full",
          // Scrollbar thumb
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:border-2",
          "[&::-webkit-scrollbar-thumb]:border-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-clip-padding",
          // Size
          sizeClasses[scrollbarSize],
          // Auto hide - use transparent bg and show on hover
          autoHide
            ? [
                "[&::-webkit-scrollbar-thumb]:bg-transparent",
                "hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40",
              ]
            : [
                "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20",
                "hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40",
              ],
          // Firefox
          "scrollbar-thin",
          "scrollbar-track-transparent",
          autoHide
            ? "scrollbar-thumb-transparent hover:scrollbar-thumb-muted-foreground/40"
            : "scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40",
          className,
        )}
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)

ScrollContainer.displayName = "ScrollContainer"
