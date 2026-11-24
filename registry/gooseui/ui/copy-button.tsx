"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/registry/gooseui/hooks/use-copy-to-clipboard"

export type CopyButtonLabels = {
  /** Visible text (label variant) and accessible name before copying. */
  copy: string
  /** Visible text (label variant) and accessible name after copying. */
  copied: string
}

export type CopyButtonProps = Omit<
  React.ComponentProps<"button">,
  "value" | "onCopy" | "children"
> & {
  /** Text to copy. A function is called on click, handy for content that changes. */
  value: string | (() => string)
  /**
   * `icon` is a square icon button, `label` adds a text label, `inline` is a
   * small icon for the end of a field.
   */
  variant?: "icon" | "label" | "inline"
  size?: "sm" | "md"
  /** How long the check mark stays, in ms. */
  timeout?: number
  labels?: Partial<CopyButtonLabels>
  onCopy?: (value: string) => void
  onCopyError?: (error: Error) => void
}

const DEFAULT_LABELS: CopyButtonLabels = { copy: "Copy", copied: "Copied" }

const ease = "ease-out motion-reduce:transition-none"

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/** Copy and check icons stacked in one slot; the check draws in while the button has `data-copied`. */
function CopyIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-block size-4 shrink-0", className)}
    >
      <svg
        {...svgProps}
        className={cn(
          "absolute inset-0 size-full origin-center transition-[opacity,scale] duration-200",
          ease,
          "group-data-copied/copy:scale-[0.6] group-data-copied/copy:opacity-0",
        )}
      >
        <rect width="14" height="14" x="8" y="8" rx="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
      <svg
        {...svgProps}
        className={cn(
          "absolute inset-0 size-full origin-center scale-[0.6] opacity-0 transition-[opacity,scale] duration-200",
          ease,
          "group-data-copied/copy:scale-100 group-data-copied/copy:opacity-100",
        )}
      >
        <path
          d="M20 6 9 17l-5-5"
          pathLength={1}
          strokeDasharray={1}
          className={cn(
            "[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-250",
            ease,
            "group-data-copied/copy:[stroke-dashoffset:0]",
          )}
        />
      </svg>
    </span>
  )
}

/**
 * Copies `value` on click. Copying goes through `useCopyToClipboard`, so
 * `onCopy` / `onCopyError` fire once per click and nothing else shows a toast.
 */
export function CopyButton({
  value,
  variant = "icon",
  size = "md",
  timeout = 2000,
  labels,
  onCopy,
  onCopyError,
  onClick,
  className,
  type = "button",
  ...props
}: CopyButtonProps) {
  const text = { ...DEFAULT_LABELS, ...labels }
  const { copy, copied } = useCopyToClipboard({
    timeout,
    onCopy,
    onError: onCopyError,
  })
  const withLabel = variant === "label"
  const name = copied ? text.copied : text.copy

  return (
    <>
      <button
        type={type}
        aria-label={withLabel ? undefined : name}
        title={withLabel ? undefined : name}
        data-slot="copy-button"
        data-variant={variant}
        data-copied={copied ? "" : undefined}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          void copy(typeof value === "function" ? value() : value)
        }}
        className={cn(
          "group/copy inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md text-sm font-medium outline-none transition-colors",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
          variant === "icon" &&
            "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          variant === "icon" && (size === "sm" ? "size-7" : "size-8"),
          variant === "inline" &&
            "size-6 rounded-sm text-muted-foreground hover:text-foreground",
          withLabel &&
            "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
          withLabel && (size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3"),
          className,
        )}
        {...props}
      >
        <CopyIcon
          className={
            size === "sm" || variant === "inline" ? "size-3.5" : "size-4"
          }
        />
        {withLabel && (
          // Both labels share one grid cell, so the width does not jump.
          <span className="grid overflow-hidden">
            <span
              className={cn(
                "col-start-1 row-start-1 transition-[opacity,translate] duration-200",
                ease,
                "group-data-copied/copy:-translate-y-full group-data-copied/copy:opacity-0",
              )}
            >
              {text.copy}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "col-start-1 row-start-1 translate-y-full opacity-0 transition-[opacity,translate] duration-200",
                ease,
                "group-data-copied/copy:translate-y-0 group-data-copied/copy:opacity-100",
              )}
            >
              {text.copied}
            </span>
          </span>
        )}
      </button>
      {/* Announced outside the button: live regions inside controls are unreliable. */}
      <span className="sr-only" aria-live="polite">
        {copied ? text.copied : ""}
      </span>
    </>
  )
}
