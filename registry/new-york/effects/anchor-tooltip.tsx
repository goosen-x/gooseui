"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AnchorTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
  /** Tooltip position */
  position?: "top" | "bottom" | "left" | "right"
}

/**
 * Anchor Tooltip
 *
 * Uses CSS Anchor Positioning + Popover API for
 * JavaScript-free tooltip positioning.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
 */
export function AnchorTooltip({
  children,
  content,
  className,
  position = "top",
}: AnchorTooltipProps) {
  const id = React.useId()
  const anchorName = `--anchor-${id.replace(/:/g, "")}`
  const popoverId = `tooltip-${id.replace(/:/g, "")}`

  const positionStyles = React.useMemo(() => {
    switch (position) {
      case "top":
        return {
          bottom: `anchor(${anchorName} top)`,
          left: `anchor(${anchorName} center)`,
          transform: "translateX(-50%) translateY(-8px)",
        }
      case "bottom":
        return {
          top: `anchor(${anchorName} bottom)`,
          left: `anchor(${anchorName} center)`,
          transform: "translateX(-50%) translateY(8px)",
        }
      case "left":
        return {
          right: `anchor(${anchorName} left)`,
          top: `anchor(${anchorName} center)`,
          transform: "translateY(-50%) translateX(-8px)",
        }
      case "right":
        return {
          left: `anchor(${anchorName} right)`,
          top: `anchor(${anchorName} center)`,
          transform: "translateY(-50%) translateX(8px)",
        }
    }
  }, [position, anchorName])

  return (
    <>
      <span
        className={cn("inline-block cursor-help", className)}
        style={{ anchorName } as React.CSSProperties}
        // @ts-expect-error - popover API
        popovertarget={popoverId}
        popovertargetaction="toggle"
        onMouseEnter={(e) => {
          const popover = document.getElementById(popoverId)
          popover?.showPopover?.()
        }}
        onMouseLeave={(e) => {
          const popover = document.getElementById(popoverId)
          popover?.hidePopover?.()
        }}
      >
        {children}
      </span>
      <div
        id={popoverId}
        popover="hint"
        className="m-0 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md"
        style={{
          position: "fixed",
          positionAnchor: anchorName,
          ...positionStyles,
        } as React.CSSProperties}
      >
        {content}
      </div>
    </>
  )
}
