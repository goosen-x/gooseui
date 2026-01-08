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

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            [data-anchor="${anchorName}"] {
              anchor-name: ${anchorName};
            }
            [data-anchor-popover="${anchorName}"] {
              position: fixed;
              position-anchor: ${anchorName};
              inset: unset;
              overflow: visible;
              border-color: oklch(0.9 0 0);
              opacity: 0;
              transition: opacity 0.15s ease, translate 0.15s ease, display 0.15s ease allow-discrete;
            }
            [data-anchor-popover="${anchorName}"]:popover-open {
              opacity: 1;
              translate: 0 0;
            }
            /* Closed state - slide out */
            [data-anchor-popover="${anchorName}"][data-position="top"]:not(:popover-open) {
              translate: 0 4px;
            }
            [data-anchor-popover="${anchorName}"][data-position="bottom"]:not(:popover-open) {
              translate: 0 -4px;
            }
            [data-anchor-popover="${anchorName}"][data-position="left"]:not(:popover-open) {
              translate: 4px 0;
            }
            [data-anchor-popover="${anchorName}"][data-position="right"]:not(:popover-open) {
              translate: -4px 0;
            }
            /* Starting style for enter animation */
            @starting-style {
              [data-anchor-popover="${anchorName}"]:popover-open {
                opacity: 0;
              }
              [data-anchor-popover="${anchorName}"][data-position="top"]:popover-open {
                translate: 0 4px;
              }
              [data-anchor-popover="${anchorName}"][data-position="bottom"]:popover-open {
                translate: 0 -4px;
              }
              [data-anchor-popover="${anchorName}"][data-position="left"]:popover-open {
                translate: 4px 0;
              }
              [data-anchor-popover="${anchorName}"][data-position="right"]:popover-open {
                translate: -4px 0;
              }
            }
            :is(.dark) [data-anchor-popover="${anchorName}"] {
              border-color: oklch(0.3 0 0);
            }
            [data-anchor-popover="${anchorName}"]::before,
            [data-anchor-popover="${anchorName}"]::after {
              content: "";
              position: absolute;
              pointer-events: none;
            }
            [data-anchor-popover="${anchorName}"]::before {
              border: 7px solid transparent;
            }
            [data-anchor-popover="${anchorName}"]::after {
              border: 6px solid transparent;
            }
            [data-anchor-popover="${anchorName}"][data-position="top"] {
              bottom: anchor(top);
              left: anchor(center);
              transform: translateX(-50%) translateY(-7px);
            }
            [data-anchor-popover="${anchorName}"][data-position="top"]::before {
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              border-top-color: oklch(0.9 0 0);
            }
            :is(.dark) [data-anchor-popover="${anchorName}"][data-position="top"]::before {
              border-top-color: oklch(0.3 0 0);
            }
            [data-anchor-popover="${anchorName}"][data-position="top"]::after {
              top: calc(100% - 1px);
              left: 50%;
              transform: translateX(-50%);
              border-top-color: var(--popover);
            }
            [data-anchor-popover="${anchorName}"][data-position="bottom"] {
              top: anchor(bottom);
              left: anchor(center);
              transform: translateX(-50%) translateY(7px);
            }
            [data-anchor-popover="${anchorName}"][data-position="bottom"]::before {
              bottom: 100%;
              left: 50%;
              transform: translateX(-50%);
              border-bottom-color: oklch(0.9 0 0);
            }
            :is(.dark) [data-anchor-popover="${anchorName}"][data-position="bottom"]::before {
              border-bottom-color: oklch(0.3 0 0);
            }
            [data-anchor-popover="${anchorName}"][data-position="bottom"]::after {
              bottom: calc(100% - 1px);
              left: 50%;
              transform: translateX(-50%);
              border-bottom-color: var(--popover);
            }
            [data-anchor-popover="${anchorName}"][data-position="left"] {
              right: anchor(left);
              top: anchor(center);
              transform: translateY(-50%) translateX(-7px);
            }
            [data-anchor-popover="${anchorName}"][data-position="left"]::before {
              left: 100%;
              top: 50%;
              transform: translateY(-50%);
              border-left-color: oklch(0.9 0 0);
            }
            :is(.dark) [data-anchor-popover="${anchorName}"][data-position="left"]::before {
              border-left-color: oklch(0.3 0 0);
            }
            [data-anchor-popover="${anchorName}"][data-position="left"]::after {
              left: calc(100% - 1px);
              top: 50%;
              transform: translateY(-50%);
              border-left-color: var(--popover);
            }
            [data-anchor-popover="${anchorName}"][data-position="right"] {
              left: anchor(right);
              top: anchor(center);
              transform: translateY(-50%) translateX(7px);
            }
            [data-anchor-popover="${anchorName}"][data-position="right"]::before {
              right: 100%;
              top: 50%;
              transform: translateY(-50%);
              border-right-color: oklch(0.9 0 0);
            }
            :is(.dark) [data-anchor-popover="${anchorName}"][data-position="right"]::before {
              border-right-color: oklch(0.3 0 0);
            }
            [data-anchor-popover="${anchorName}"][data-position="right"]::after {
              right: calc(100% - 1px);
              top: 50%;
              transform: translateY(-50%);
              border-right-color: var(--popover);
            }
          `,
        }}
      />
      <span
        data-anchor={anchorName}
        className={cn("inline-block cursor-help", className)}
        onMouseEnter={() => {
          const popover = document.getElementById(popoverId)
          popover?.showPopover?.()
        }}
        onMouseLeave={() => {
          const popover = document.getElementById(popoverId)
          popover?.hidePopover?.()
        }}
      >
        {children}
      </span>
      <div
        id={popoverId}
        popover="manual"
        data-anchor-popover={anchorName}
        data-position={position}
        className="m-0 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md"
      >
        {content}
      </div>
    </>
  )
}
