/**
 * Baseline API utility for fetching web feature browser support status
 * @see https://web.dev/baseline
 * @see https://api.webstatus.dev/v1/features/
 */

const BASELINE_API = "https://api.webstatus.dev/v1/features"

export type BaselineStatus = "widely" | "newly" | "limited" | "no_data"

export interface BaselineFeature {
  status: BaselineStatus
  lowDate?: string // "2020-01-15" - when feature became newly available
  highDate?: string // "2022-07-15" - when feature became widely available
  year?: number // year of lowDate (Baseline Newly available)
  /** Official English feature name from webstatus.dev (not translated) */
  name?: string
}

export interface BrowserImplementation {
  date: string
  status: "available" | "unavailable"
  version: string
}

export interface BaselineAPIResponse {
  baseline: {
    status: "widely" | "newly" | "limited"
    low_date?: string
    high_date?: string
  } | null
  browser_implementations?: Record<string, BrowserImplementation>
  feature_id: string
  name: string
}

const cache = new Map<string, Promise<BaselineFeature>>()

/** Year from an ISO date ("2026-10-27"), without timezone shifts */
function yearOf(date?: string): number | undefined {
  const year = Number(date?.slice(0, 4))
  return Number.isInteger(year) && year > 1990 ? year : undefined
}

async function fetchBaselineStatus(
  featureId: string,
): Promise<BaselineFeature> {
  try {
    const response = await fetch(
      `${BASELINE_API}/${encodeURIComponent(featureId)}`,
      {
        next: { revalidate: 86400 }, // Cache for 24 hours (server only)
        signal: AbortSignal.timeout(8000),
      },
    )

    if (!response.ok) {
      console.warn(
        response.status === 404
          ? `Baseline API: feature "${featureId}" not found`
          : `Baseline API: HTTP ${response.status} for "${featureId}"`,
      )
      return { status: "no_data" }
    }

    const data: BaselineAPIResponse = await response.json()

    if (!data.baseline) {
      return { status: "no_data", name: data.name }
    }

    const { status, low_date, high_date } = data.baseline
    const name = data.name

    // Like the official <baseline-status>: the year is always the year when
    // the feature became Baseline Newly available (low_date). For widely
    // available features this is "available across browsers since <low_date>".
    return {
      status,
      lowDate: low_date,
      highDate: high_date,
      year: yearOf(low_date),
      name,
    }
  } catch (error) {
    console.error(`Baseline API error for "${featureId}":`, error)
    return { status: "no_data" }
  }
}

/**
 * Fetches Baseline status for a web feature.
 * Never throws: network errors, 404 and missing data resolve to "no_data".
 * Successful results are deduplicated per featureId; failures are retried.
 */
export function getBaselineStatus(featureId: string): Promise<BaselineFeature> {
  const cached = cache.get(featureId)
  if (cached) return cached

  const request = fetchBaselineStatus(featureId).then((feature) => {
    if (feature.status === "no_data") cache.delete(featureId)
    return feature
  })
  cache.set(featureId, request)
  return request
}

/**
 * Get display text for Baseline status
 * (official wording: "Baseline Widely available", "Baseline Newly available",
 * "Limited availability")
 */
export function getBaselineStatusText(
  status: BaselineStatus,
  year?: number,
): string {
  switch (status) {
    case "widely":
      return year
        ? `Baseline Widely available since ${year}`
        : "Baseline Widely available"
    case "newly":
      return year
        ? `Baseline Newly available since ${year}`
        : "Baseline Newly available"
    case "limited":
      return "Limited availability"
    default:
      return "No data"
  }
}

/**
 * Common feature IDs for reference
 * @see https://github.com/web-platform-dx/web-features/tree/main/features
 */
export const FEATURE_IDS = {
  // CSS
  scrollSnap: "scroll-snap",
  containerQueries: "container-queries",
  cssGrid: "css-grid",
  flexbox: "flexbox",
  cssVariables: "css-variables",
  anchorPositioning: "anchor-positioning",
  viewTransitions: "view-transitions",
  popover: "popover",

  // JavaScript
  promises: "promises",
  asyncAwait: "async-await",
  modules: "modules",

  // APIs
  intersectionObserver: "intersection-observer",
  resizeObserver: "resize-observer",
  webAnimations: "web-animations",
} as const
