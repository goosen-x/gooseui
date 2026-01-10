"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Container height */
  height?: string | number
  /** Show scrollbar only on hover */
  autoHide?: boolean
  /** Scrollbar variant */
  variant?: "default" | "minimal" | "primary"
  /** Force scrollbar visibility (for macOS overlay scrollbars) */
  forceVisible?: boolean
  /** Children */
  children?: React.ReactNode
}

/**
 * Scroll Container
 *
 * Custom scrollbar component using modern CSS properties:
 * - scrollbar-color (Chrome 121+, Firefox 64+, Safari 26.2+)
 * - scrollbar-width (thin/auto/none)
 * - scrollbar-gutter (prevents layout shift)
 * - ::-webkit-scrollbar (legacy fallback)
 *
 * Browser support: 85%+
 *
 * @see https://developer.chrome.com/docs/css-ui/scrollbar-styling
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
 */
export const ScrollContainer = React.forwardRef<
  HTMLDivElement,
  ScrollContainerProps
>(
  (
    {
      children,
      className,
      style,
      height = "100%",
      autoHide = false,
      variant = "default",
      forceVisible = false,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId()
    const scopeId = `sc${reactId.replace(/:/g, "")}`

    // CSS variable-based theming for scrollbars
    const variantStyles = {
      default: {
        "--sc-thumb": "hsl(var(--muted-foreground) / 0.3)",
        "--sc-thumb-hover": "hsl(var(--muted-foreground) / 0.5)",
        "--sc-track": "hsl(var(--muted))",
      },
      minimal: {
        "--sc-thumb": "hsl(var(--muted-foreground) / 0.2)",
        "--sc-thumb-hover": "hsl(var(--muted-foreground) / 0.4)",
        "--sc-track": "transparent",
      },
      primary: {
        "--sc-thumb": "hsl(var(--primary) / 0.5)",
        "--sc-thumb-hover": "hsl(var(--primary) / 0.7)",
        "--sc-track": "hsl(var(--muted) / 0.5)",
      },
    } as const

    const vars = variantStyles[variant]

    // CSS for custom scrollbar styling
    // Note: transitions work on ::-webkit-scrollbar when applied to base element
    const customStyles = `
      /* Modern CSS scrollbar (Chrome 121+, Firefox 64+, Safari 26.2+) */
      .${scopeId} {
        scrollbar-color: var(--sc-thumb) var(--sc-track);
        scrollbar-width: thin;
        ${forceVisible ? "scrollbar-gutter: stable;" : ""}
      }

      /* Hover state for modern browsers */
      .${scopeId}:hover {
        scrollbar-color: var(--sc-thumb-hover) var(--sc-track);
      }

      /* WebKit fallback (older Chrome, Safari, Edge) */
      @supports selector(::-webkit-scrollbar) {
        .${scopeId}::-webkit-scrollbar {
          width: 0.5rem;
          height: 0.5rem;
        }

        .${scopeId}::-webkit-scrollbar-track {
          background: var(--sc-track);
          border-radius: 9999px;
        }

        .${scopeId}::-webkit-scrollbar-thumb {
          background: var(--sc-thumb);
          border-radius: 9999px;
          /* Transition on base element, not hover */
          transition: background 0.2s ease;
        }

        .${scopeId}::-webkit-scrollbar-thumb:hover {
          background: var(--sc-thumb-hover);
        }

        .${scopeId}::-webkit-scrollbar-corner {
          background: transparent;
        }
      }

      ${
        autoHide
          ? `
        /* Auto-hide: transparent by default, visible on hover */
        .${scopeId} {
          scrollbar-color: transparent var(--sc-track);
        }

        .${scopeId}:hover {
          scrollbar-color: var(--sc-thumb-hover) var(--sc-track);
        }

        @supports selector(::-webkit-scrollbar) {
          .${scopeId}::-webkit-scrollbar-thumb {
            background: transparent;
          }

          .${scopeId}:hover::-webkit-scrollbar-thumb {
            background: var(--sc-thumb);
          }

          .${scopeId}:hover::-webkit-scrollbar-thumb:hover {
            background: var(--sc-thumb-hover);
          }
        }
      `
          : ""
      }
    `

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: customStyles }} />
        <div
          ref={ref}
          className={cn(scopeId, "overflow-auto", className)}
          style={
            {
              height: typeof height === "number" ? `${height}px` : height,
              ...vars,
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </>
    )
  },
)

ScrollContainer.displayName = "ScrollContainer"
