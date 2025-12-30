/**
 * Baseline feature dependencies for components
 *
 * Only list components that use features worth documenting.
 * Most components use flexbox/transitions which are Widely Available (98%+)
 * and don't need to be listed here.
 *
 * @see https://github.com/web-platform-dx/web-features
 * @see https://web.dev/baseline
 */

export const COMPONENT_BASELINE_FEATURES: Record<string, string[]> = {
  // Components with CSS Scroll Snap
  carousel: ["scroll-snap"],

  // Future components might use:
  // popover: ["popover"],                    // Newly Available 2024
  // tooltip-anchor: ["anchor-positioning"],  // Limited
  // dialog: ["dialog"],                      // Widely Available 2022
}

/**
 * Get baseline features for a component
 */
export function getComponentBaselineFeatures(
  slug: string,
): string[] | undefined {
  return COMPONENT_BASELINE_FEATURES[slug]
}

/**
 * Tailwind class to Feature ID mapping reference
 *
 * | Tailwind class | Feature ID |
 * |----------------|------------|
 * | snap-x, snap-y, snap-mandatory | scroll-snap |
 * | @container | container-queries |
 * | anchor-* | anchor-positioning |
 * | popover | popover |
 * | view-transition-* | view-transitions |
 */
