"use client"

import { CheckCircle2, XCircle } from "lucide-react"
import * as React from "react"
import {
  type BaselineFeature,
  type BaselineStatus as BaselineStatusType,
  getBaselineStatus,
  getBaselineStatusText,
} from "@/lib/baseline"
import { cn } from "@/lib/utils"

// ============================================================================
// Browser Feature Detection
// ============================================================================

type BrowserFeature = "view-transitions" | "popover" | "anchor-positioning"

function checkBrowserFeature(feature: BrowserFeature): boolean {
  if (typeof document === "undefined" || typeof window === "undefined")
    return false

  switch (feature) {
    case "view-transitions":
      return "startViewTransition" in document
    case "popover":
      return "popover" in HTMLElement.prototype
    case "anchor-positioning":
      return CSS.supports("anchor-name", "--test")
    default:
      return false
  }
}

function getBrowserFeatureLabel(feature: BrowserFeature): string {
  switch (feature) {
    case "view-transitions":
      return "View Transitions API"
    case "popover":
      return "Popover API"
    case "anchor-positioning":
      return "CSS Anchor Positioning"
    default:
      return feature
  }
}

/**
 * Official Baseline icons from W3C WebDX Community Group
 * @see https://web-platform-dx.github.io/web-features/name-and-logo-usage-guidelines/
 * @license CC BY-ND 4.0
 */
const BaselineIcons = {
  widely: (
    <svg
      viewBox="0 0 540 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-auto"
      aria-hidden="true"
    >
      <path
        d="M420 30L390 60L480 150L390 240L330 180L300 210L390 300L540 150L420 30Z"
        fill="#C4EED0"
      />
      <path
        d="M150 0L30 120L60 150L150 60L210 120L240 90L150 0Z"
        fill="#C4EED0"
      />
      <path
        d="M390 0L420 30L150 300L0 150L30 120L150 240L390 0Z"
        fill="#1EA446"
      />
    </svg>
  ),
  newly: (
    <svg
      viewBox="0 0 540 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-auto"
      aria-hidden="true"
    >
      <path d="M150 0L180 30L150 60L120 30L150 0Z" fill="#A8C7FA" />
      <path d="M210 60L240 90L210 120L180 90L210 60Z" fill="#A8C7FA" />
      <path d="M450 60L480 90L450 120L420 90L450 60Z" fill="#A8C7FA" />
      <path d="M510 120L540 150L510 180L480 150L510 120Z" fill="#A8C7FA" />
      <path d="M450 180L480 210L450 240L420 210L450 180Z" fill="#A8C7FA" />
      <path d="M390 240L420 270L390 300L360 270L390 240Z" fill="#A8C7FA" />
      <path d="M330 180L360 210L330 240L300 210L330 180Z" fill="#A8C7FA" />
      <path d="M90 60L120 90L90 120L60 90L90 60Z" fill="#A8C7FA" />
      <path
        d="M390 0L420 30L150 300L0 150L30 120L150 240L390 0Z"
        fill="#1B6EF3"
      />
    </svg>
  ),
  limited: (
    <svg
      viewBox="0 0 540 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-auto"
      aria-hidden="true"
    >
      <path d="M150 0L240 90L210 120L120 30L150 0Z" fill="#F09409" />
      <path
        d="M420 30L540 150L420 270L390 240L480 150L390 60L420 30Z"
        fill="#C6C6C6"
      />
      <path d="M330 180L300 210L390 300L420 270L330 180Z" fill="#F09409" />
      <path
        d="M120 30L150 60L60 150L150 240L120 270L0 150L120 30Z"
        fill="#C6C6C6"
      />
      <path d="M390 0L420 30L150 300L120 270L390 0Z" fill="#F09409" />
    </svg>
  ),
  no_data: (
    <svg
      viewBox="0 0 540 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-auto opacity-40"
      aria-hidden="true"
    >
      <path
        d="M420 30L540 150L420 270L390 240L480 150L390 60L420 30Z"
        fill="currentColor"
      />
      <path
        d="M120 30L150 60L60 150L150 240L120 270L0 150L120 30Z"
        fill="currentColor"
      />
      <path d="M390 0L420 30L150 300L120 270L390 0Z" fill="currentColor" />
    </svg>
  ),
}

const sizeClasses = {
  sm: "text-xs gap-1.5",
  md: "text-sm gap-2",
  lg: "text-base gap-2.5",
}

const iconSizeClasses = {
  sm: "[&_svg]:h-4",
  md: "[&_svg]:h-5",
  lg: "[&_svg]:h-6",
}

export interface BaselineStatusProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Feature ID from web-features (e.g., "scroll-snap", "container-queries") */
  featureId?: string
  /** Direct status override (use instead of featureId for static data) */
  status?: BaselineStatusType
  /** Year when the feature became available */
  year?: number
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Show year in the label */
  showYear?: boolean
  /** Show only the icon without text */
  iconOnly?: boolean
  /** Browser feature to check support for */
  browserCheck?: BrowserFeature
}

/**
 * BaselineStatus displays browser support status for web features
 * based on the W3C WebDX Baseline specification.
 *
 * @see https://web.dev/baseline
 * @see https://github.com/web-platform-dx/web-features
 *
 * @example
 * // With featureId (fetches data at build time)
 * <BaselineStatus featureId="scroll-snap" />
 *
 * @example
 * // With static data (no API call)
 * <BaselineStatus status="widely" year={2022} />
 *
 * @example
 * // Icon only
 * <BaselineStatus featureId="container-queries" iconOnly />
 */
export function BaselineStatus({
  featureId,
  status: statusProp,
  year: yearProp,
  size = "md",
  showYear = true,
  iconOnly = false,
  browserCheck,
  className,
  ...props
}: BaselineStatusProps) {
  const [feature, setFeature] = React.useState<BaselineFeature | null>(
    statusProp ? { status: statusProp, year: yearProp } : null,
  )
  const [isLoading, setIsLoading] = React.useState(!statusProp && !!featureId)
  const [browserSupport, setBrowserSupport] = React.useState<boolean | null>(
    null,
  )

  React.useEffect(() => {
    if (statusProp || !featureId) return

    let cancelled = false
    setIsLoading(true)

    getBaselineStatus(featureId).then((data) => {
      if (!cancelled) {
        setFeature(data)
        setIsLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [featureId, statusProp])

  // Check browser support on mount
  React.useEffect(() => {
    if (browserCheck) {
      setBrowserSupport(checkBrowserFeature(browserCheck))
    }
  }, [browserCheck])

  if (isLoading) {
    return (
      <div
        className={cn(
          "inline-flex items-center animate-pulse",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        <div className="h-5 w-9 rounded-full bg-muted" />
        {!iconOnly && <div className="h-4 w-24 rounded bg-muted" />}
      </div>
    )
  }

  const status = feature?.status ?? "no_data"
  const year = showYear ? feature?.year : undefined
  const label = getBaselineStatusText(status, year)
  const icon = BaselineIcons[status]

  // If browserCheck is provided, render combined layout
  if (browserCheck && browserSupport !== null) {
    const featureLabel = getBrowserFeatureLabel(browserCheck)

    return (
      <div
        className={cn(
          "inline-flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2",
          className,
        )}
        role="status"
        {...props}
      >
        {/* Baseline Status */}
        <div
          className={cn(
            "flex items-center",
            sizeClasses[size],
            iconSizeClasses[size],
          )}
        >
          {icon}
          {!iconOnly && (
            <span className="text-muted-foreground whitespace-nowrap">
              {label}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-border" />

        {/* Browser Support Check */}
        <div
          className={cn(
            "flex items-center gap-1.5 text-sm",
            browserSupport
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400",
          )}
        >
          {browserSupport ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span className="whitespace-nowrap">
            {browserSupport ? "Your browser supports" : "Not supported:"}{" "}
            {featureLabel}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "inline-flex items-center",
        sizeClasses[size],
        iconSizeClasses[size],
        className,
      )}
      role="status"
      aria-label={label}
      {...props}
    >
      {icon}
      {!iconOnly && (
        <span className="text-muted-foreground whitespace-nowrap">{label}</span>
      )}
    </div>
  )
}

/**
 * Server Component wrapper for BaselineStatus
 * Use this in Server Components to fetch data at build time
 *
 * @example
 * // In a Server Component
 * const feature = await getBaselineStatus("scroll-snap")
 * <BaselineStatusStatic {...feature} />
 */
export function BaselineStatusStatic({
  status,
  year,
  size = "md",
  showYear = true,
  iconOnly = false,
  className,
  ...props
}: Omit<BaselineStatusProps, "featureId"> & {
  status: BaselineStatusType
}) {
  const label = getBaselineStatusText(status, showYear ? year : undefined)
  const icon = BaselineIcons[status]

  return (
    <div
      className={cn(
        "inline-flex items-center",
        sizeClasses[size],
        iconSizeClasses[size],
        className,
      )}
      role="status"
      aria-label={label}
      {...props}
    >
      {icon}
      {!iconOnly && (
        <span className="text-muted-foreground whitespace-nowrap">{label}</span>
      )}
    </div>
  )
}
