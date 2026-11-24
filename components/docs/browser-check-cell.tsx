"use client"

import * as React from "react"
import { resolveBrowserCheck } from "@/registry/gooseui/lib/baseline-checks"

interface BrowserCheckCellProps {
  featureId: string
  /** Checks the feature in the visitor's browser. `false` shows a dash */
  enabled?: boolean
  labels: {
    /** Column name, shown only in the mobile card layout */
    column: string
    /** Screen reader text, the feature name is appended */
    supported: string
    notSupported: string
  }
  /** Feature name for the screen reader text */
  name: string
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function Cross() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

/**
 * The "Your browser" cell of the browser support table: a check or a cross
 * from the same detection BaselineStatus uses. Until the check has run the
 * cell keeps its size invisibly, so nothing jumps after hydration.
 */
export function BrowserCheckCell({
  featureId,
  enabled = true,
  labels,
  name,
}: BrowserCheckCellProps) {
  const check = enabled ? resolveBrowserCheck(true, featureId) : null
  const [supported, setSupported] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    setSupported(check ? check.run() : null)
  }, [check])

  const columnLabel = (
    <span className="text-muted-foreground sm:hidden">{labels.column}:</span>
  )

  if (!check) {
    return (
      <span className="inline-flex items-center gap-1.5">
        {columnLabel}
        <span className="text-muted-foreground" aria-hidden="true">
          —
        </span>
      </span>
    )
  }

  const pending = supported === null
  const text = `${supported ? labels.supported : labels.notSupported} ${name}`

  return (
    <span className="inline-flex items-center gap-1.5">
      {columnLabel}
      <span
        className={
          pending
            ? "invisible inline-flex items-center gap-1.5"
            : supported
              ? "inline-flex items-center gap-1.5 font-medium text-green-600 dark:text-green-400"
              : "inline-flex items-center gap-1.5 font-medium text-red-600 dark:text-red-400"
        }
        title={pending ? undefined : text}
        role={pending ? undefined : "status"}
        aria-hidden={pending || undefined}
      >
        {supported === false ? <Cross /> : <Check />}
        {!pending && <span className="sr-only">{text}</span>}
      </span>
    </span>
  )
}
