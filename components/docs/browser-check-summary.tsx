"use client"

import { Check, X } from "lucide-react"
import * as React from "react"
import { resolveBrowserCheck } from "@/registry/gooseui/lib/baseline-checks"

interface BrowserCheckSummaryProps {
  features: {
    featureId: string
    /** Feature name for the "not supported" list */
    name: string
    /** `false` leaves the feature out of the result */
    enabled?: boolean
  }[]
  labels: {
    /** "Your browser supports everything" */
    allSupported: string
    /** "Your browser does not support", the failed names are appended */
    notSupported: string
  }
}

/**
 * One-line result of every browser check at once, for the collapsed browser
 * support summary. Until the checks have run, the line keeps its size
 * invisibly, so nothing jumps after hydration. Renders nothing when no
 * feature has a check.
 */
export function BrowserCheckSummary({
  features,
  labels,
}: BrowserCheckSummaryProps) {
  const [failed, setFailed] = React.useState<string[] | null>(null)
  const [checkable, setCheckable] = React.useState(true)

  React.useEffect(() => {
    let any = false
    const missing: string[] = []
    for (const feature of features) {
      if (feature.enabled === false) continue
      const check = resolveBrowserCheck(true, feature.featureId)
      if (!check) continue
      any = true
      if (!check.run()) missing.push(feature.name)
    }
    setCheckable(any)
    setFailed(missing)
  }, [features])

  if (!checkable) return null

  const pending = failed === null
  const ok = failed !== null && failed.length === 0
  const text = ok
    ? labels.allSupported
    : `${labels.notSupported}${pending ? "" : `: ${failed.join(", ")}`}`

  return (
    <span
      className={
        pending
          ? "invisible inline-flex items-center gap-1.5"
          : ok
            ? "inline-flex items-center gap-1.5 font-medium text-green-600 dark:text-green-400"
            : "inline-flex items-center gap-1.5 font-medium text-red-600 dark:text-red-400"
      }
      role={pending ? undefined : "status"}
      aria-hidden={pending || undefined}
    >
      {ok || pending ? (
        <Check className="size-4 shrink-0" aria-hidden="true" />
      ) : (
        <X className="size-4 shrink-0" aria-hidden="true" />
      )}
      <span>{text}</span>
    </span>
  )
}
