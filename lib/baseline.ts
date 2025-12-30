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
  year?: number // extracted year from highDate or lowDate
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

/**
 * Fetches Baseline status for a web feature
 * Use this at build time or in server components for caching
 */
export async function getBaselineStatus(
  featureId: string,
): Promise<BaselineFeature> {
  try {
    const response = await fetch(`${BASELINE_API}/${featureId}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (!response.ok) {
      console.warn(`Baseline API: Feature "${featureId}" not found`)
      return { status: "no_data" }
    }

    const data: BaselineAPIResponse = await response.json()

    if (!data.baseline) {
      return { status: "no_data" }
    }

    const { status, low_date, high_date } = data.baseline

    // Extract year from the relevant date
    const relevantDate = status === "widely" ? high_date : low_date
    const year = relevantDate ? new Date(relevantDate).getFullYear() : undefined

    return {
      status,
      lowDate: low_date,
      highDate: high_date,
      year,
    }
  } catch (error) {
    console.error(`Baseline API error for "${featureId}":`, error)
    return { status: "no_data" }
  }
}

/**
 * Get display text for Baseline status
 */
export function getBaselineStatusText(
  status: BaselineStatus,
  year?: number,
): string {
  switch (status) {
    case "widely":
      return year ? `Widely available since ${year}` : "Widely available"
    case "newly":
      return year ? `Newly available since ${year}` : "Newly available"
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
