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

// Generate unique ID for scoped styles
let styleId = 0

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
    const [scopeId] = React.useState(() => `sc-${++styleId}`)

    const sizeMap = {
      sm: "6px",
      md: "8px",
      lg: "10px",
    }

    const scrollbarStyles = `
      .${scopeId} {
        scrollbar-width: thin;
        scrollbar-color: ${autoHide ? "transparent" : "hsl(var(--muted-foreground) / 0.2)"} transparent;
      }
      .${scopeId}:hover {
        scrollbar-color: hsl(var(--muted-foreground) / 0.4) transparent;
      }
      .${scopeId}::-webkit-scrollbar {
        width: ${sizeMap[scrollbarSize]};
        background: transparent;
      }
      .${scopeId}::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 9999px;
      }
      .${scopeId}::-webkit-scrollbar-thumb {
        background: ${autoHide ? "transparent" : "hsl(var(--muted-foreground) / 0.2)"};
        border-radius: 9999px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      .${scopeId}:hover::-webkit-scrollbar-thumb {
        background: hsl(var(--muted-foreground) / 0.4);
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      .${scopeId}::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--muted-foreground) / 0.5);
        border: 2px solid transparent;
        background-clip: padding-box;
      }
    `

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
        <div
          ref={ref}
          className={cn("overflow-auto", scopeId, className)}
          style={{
            height: typeof height === "number" ? `${height}px` : height,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </>
    )
  },
)

ScrollContainer.displayName = "ScrollContainer"
