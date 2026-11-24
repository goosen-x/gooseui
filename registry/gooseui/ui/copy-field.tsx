"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import {
  CopyButton,
  type CopyButtonLabels,
} from "@/registry/gooseui/ui/copy-button"

export type CopyFieldLabels = CopyButtonLabels

export type CopyFieldProps = Omit<
  React.ComponentProps<"div">,
  "onCopy" | "children"
> & {
  label: string
  value: string
  /** Text shown instead of the raw value, e.g. a masked token. Copying still uses `value`. */
  displayValue?: React.ReactNode
  mono?: boolean
  /** Cut long values to one line; the full text goes to the tooltip. */
  truncate?: boolean
  timeout?: number
  labels?: Partial<CopyFieldLabels>
  labelClassName?: string
  valueClassName?: string
  onCopy?: (value: string) => void
  onCopyError?: (error: Error) => void
}

const DEFAULT_LABELS: CopyFieldLabels = { copy: "Copy", copied: "Copied" }

/**
 * A “label: value” row with a read-only field and an inline `CopyButton`.
 * All copying, the check mark and the announcements come from CopyButton.
 */
export function CopyField({
  label,
  value,
  displayValue,
  mono = false,
  truncate = true,
  timeout,
  labels,
  labelClassName,
  valueClassName,
  onCopy,
  onCopyError,
  className,
  ...props
}: CopyFieldProps) {
  const text = { ...DEFAULT_LABELS, ...labels }

  return (
    <div
      data-slot="copy-field"
      className={cn("flex min-w-0 items-center gap-3 text-sm", className)}
      {...props}
    >
      <span className={cn("shrink-0 text-muted-foreground", labelClassName)}>
        {label}
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-1 rounded-md border bg-background py-1 pr-1 pl-2.5">
        <span
          title={truncate ? value : undefined}
          className={cn(
            "min-w-0 text-foreground",
            truncate ? "truncate" : "[overflow-wrap:anywhere]",
            mono && "font-mono text-[0.92em]",
            valueClassName,
          )}
        >
          {displayValue ?? value}
        </span>
        <CopyButton
          variant="inline"
          value={value}
          timeout={timeout}
          labels={{
            copy: `${text.copy}: ${label}`,
            copied: `${text.copied}: ${label}`,
          }}
          onCopy={onCopy}
          onCopyError={onCopyError}
        />
      </div>
    </div>
  )
}
