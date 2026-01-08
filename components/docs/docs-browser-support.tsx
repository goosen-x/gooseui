import * as React from "react"
import { BaselineStatus, type BrowserFeature } from "@/registry/new-york/ui/baseline-status"

interface FeatureConfig {
  featureId: string
  browserCheck?: BrowserFeature
}

interface DocsBrowserSupportProps {
  /**
   * Feature ID(s) for BaselineStatus
   * - string: single feature
   * - string[]: multiple features without browser check
   * - FeatureConfig: single feature with browser check
   * - FeatureConfig[]: multiple features with browser check
   */
  features: string | string[] | FeatureConfig | FeatureConfig[]
  /** Description text */
  children: React.ReactNode
}

/**
 * Browser Support section for documentation pages
 * Matches the structure in morphing-dialog/page.tsx
 *
 * Usage:
 * ```tsx
 * // Single feature with browser check (like morphing-dialog)
 * <DocsBrowserSupport features={{ featureId: "view-transitions", browserCheck: "view-transitions" }}>
 *   View Transitions API is supported in Chrome 111+, Edge 111+, Safari 18+.
 * </DocsBrowserSupport>
 *
 * // Multiple features with browser check
 * <DocsBrowserSupport features={[
 *   { featureId: "container-queries", browserCheck: "container-queries" },
 *   { featureId: "has", browserCheck: "has" }
 * ]}>
 *   Combines @container queries with :has() selector.
 * </DocsBrowserSupport>
 *
 * // Simple string (no browser check)
 * <DocsBrowserSupport features="scroll-driven-animations">
 *   Description here.
 * </DocsBrowserSupport>
 * ```
 */
export function DocsBrowserSupport({
  features,
  children,
}: DocsBrowserSupportProps) {
  // Normalize to array of FeatureConfig
  const featureArray: FeatureConfig[] = Array.isArray(features)
    ? features.map((f) => (typeof f === "string" ? { featureId: f } : f))
    : [typeof features === "string" ? { featureId: features } : features]

  return (
    <div className="space-y-4">
      <h2
        id="browser-support"
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      >
        Browser Support
      </h2>
      {featureArray.length === 1 ? (
        <BaselineStatus
          featureId={featureArray[0].featureId}
          browserCheck={featureArray[0].browserCheck}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {featureArray.map((feature) => (
            <BaselineStatus
              key={feature.featureId}
              featureId={feature.featureId}
              browserCheck={feature.browserCheck}
            />
          ))}
        </div>
      )}
      <p className="text-sm text-muted-foreground mt-3">{children}</p>
    </div>
  )
}
