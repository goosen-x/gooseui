/**
 * Registry configuration for GooseUI components
 *
 * When adding a new component:
 * 1. Add entry to REGISTRY_ITEMS with slug and type
 * 2. The registryUrl will be auto-generated as: https://gooseui.pro/r/{slug}.json
 * 3. DocsPageNav will automatically use this URL for "Open in v0" and other AI tools
 */

export const REGISTRY_BASE_URL = "https://gooseui.pro/r"

/**
 * Registry namespace for shadcn CLI
 * When registered in shadcn, flip this to true and use "@gooseui" format
 */
export const REGISTRY_IS_OFFICIAL = true
export const REGISTRY_NAMESPACE = "@gooseui"

export type RegistryItemType = "component" | "effect" | "hook" | "lib"

export interface RegistryItem {
  /** URL slug, e.g., "button", "animated-timer" */
  slug: string
  /** Display name */
  name: string
  /** Item type */
  type: RegistryItemType
  /** Optional custom registry filename (defaults to {slug}.json) */
  registryFile?: string
}

/**
 * All registered components and effects
 * Add new items here when creating new components
 */
export const REGISTRY_ITEMS: RegistryItem[] = [
  // Components
  { slug: "tooltip", name: "Tooltip", type: "component" },
  { slug: "dropdown-menu", name: "Dropdown Menu", type: "component" },
  { slug: "language-switcher", name: "Language Switcher", type: "component" },
  { slug: "dialog", name: "Dialog", type: "component" },
  { slug: "sheet", name: "Sheet", type: "component" },
  { slug: "tabs", name: "Tabs", type: "component" },
  { slug: "collapsible", name: "Collapsible", type: "component" },
  { slug: "theme-toggle", name: "Theme Toggle", type: "component" },
  { slug: "toggle-group", name: "Toggle Group", type: "component" },
  { slug: "toggle", name: "Toggle", type: "component" },
  { slug: "breadcrumb", name: "Breadcrumb", type: "component" },
  { slug: "skeleton", name: "Skeleton", type: "component" },
  { slug: "kbd", name: "Kbd", type: "component" },
  { slug: "badge", name: "Badge", type: "component" },
  { slug: "separator", name: "Separator", type: "component" },
  { slug: "button", name: "Button", type: "component" },
  { slug: "card", name: "Card", type: "component" },
  { slug: "input", name: "Input", type: "component" },
  { slug: "checkbox", name: "Checkbox", type: "component" },
  { slug: "radio", name: "Radio", type: "component" },
  { slug: "switch", name: "Switch", type: "component" },
  { slug: "animated-timer", name: "Animated Timer", type: "component" },
  { slug: "toast", name: "Toast", type: "component" },
  { slug: "typography", name: "Typography", type: "component" },
  { slug: "theme-customizer", name: "Theme Customizer", type: "component" },
  { slug: "carousel", name: "Carousel", type: "component" },
  { slug: "digital-clock", name: "Digital Clock", type: "component" },
  { slug: "baseline-status", name: "Baseline Status", type: "component" },
  { slug: "promo-banner", name: "Promo Banner", type: "component" },
  {
    slug: "github-star-dialog",
    name: "GitHub Star Dialog",
    type: "component",
  },
  { slug: "morphing-dialog", name: "Morphing Dialog", type: "component" },
  { slug: "morphing-header", name: "Morphing Header", type: "component" },
  { slug: "scroll-container", name: "Scroll Container", type: "component" },
  { slug: "scroll-progress", name: "Scroll Progress", type: "component" },
  { slug: "scroll-to-top", name: "Scroll To Top", type: "component" },
  { slug: "adaptive-grid", name: "Adaptive Grid", type: "component" },
  { slug: "slider", name: "Slider", type: "component" },
  { slug: "stacking-cards", name: "Stacking Cards", type: "component" },
  { slug: "reveal-on-scroll", name: "Reveal on Scroll", type: "effect" },
  { slug: "hint", name: "Hint", type: "component" },
  { slug: "search-panel", name: "Search Panel", type: "component" },

  // Effects
  { slug: "border-beam", name: "Border Beam", type: "effect" },
  { slug: "booking-calendar", name: "Booking Calendar", type: "component" },
  { slug: "compare-slider", name: "Compare Slider", type: "component" },
  { slug: "corner-badge", name: "Corner Badge", type: "component" },
  {
    slug: "hover-scroll-screenshot",
    name: "Hover Scroll Screenshot",
    type: "component",
  },
  { slug: "marquee", name: "Marquee", type: "component" },
  { slug: "option-picker", name: "Option Picker", type: "component" },
  { slug: "phone-input", name: "Phone Input", type: "component" },
  { slug: "quantity-slider", name: "Quantity Slider", type: "component" },
  { slug: "range-slider", name: "Range Slider", type: "component" },
  { slug: "rating-breakdown", name: "Rating Breakdown", type: "component" },
  { slug: "rating", name: "Rating", type: "component" },
  { slug: "signature-pad", name: "Signature Pad", type: "component" },
  { slug: "step-progress", name: "Step Progress", type: "component" },
  { slug: "step-wizard", name: "Step Wizard", type: "component" },
  {
    slug: "testimonial-rotator",
    name: "Testimonial Rotator",
    type: "component",
  },
  { slug: "video-dialog", name: "Video Dialog", type: "component" },
  {
    slug: "video-hover-preview",
    name: "Video Hover Preview",
    type: "component",
  },
  { slug: "video-synced-steps", name: "Video Synced Steps", type: "component" },
  { slug: "searchbar", name: "Searchbar", type: "component" },
  { slug: "burger-button", name: "Burger Button", type: "component" },
  { slug: "confetti", name: "Confetti", type: "effect" },
  { slug: "cookie-consent", name: "Cookie Consent", type: "component" },
  { slug: "copy-button", name: "Copy Button", type: "component" },
  { slug: "copy-field", name: "Copy Field", type: "component" },
  { slug: "details-accordion", name: "Details Accordion", type: "component" },
  { slug: "dropzone", name: "Dropzone", type: "component" },
  {
    slug: "floating-label-input",
    name: "Floating Label Input",
    type: "component",
  },
  { slug: "install-command", name: "Install Command", type: "component" },
  {
    slug: "notification-prompt",
    name: "Notification Prompt",
    type: "component",
  },
  { slug: "mega-menu", name: "Mega Menu", type: "component" },
  { slug: "otp-input", name: "OTP Input", type: "component" },
  {
    slug: "paint-roller-loader",
    name: "Paint Roller Loader",
    type: "component",
  },
  { slug: "progress-ring", name: "Progress Ring", type: "component" },
  { slug: "relative-time", name: "Relative Time", type: "component" },
  { slug: "responsive-hint", name: "Responsive Hint", type: "component" },
  { slug: "ripple-loader", name: "Ripple Loader", type: "component" },
  { slug: "scroll-spy", name: "ScrollSpy", type: "component" },
  { slug: "share-buttons", name: "Share Buttons", type: "component" },
  { slug: "timeline", name: "Timeline", type: "component" },
  { slug: "toc-scrollspy", name: "Table of Contents", type: "component" },
  { slug: "use-copy-to-clipboard", name: "useCopyToClipboard", type: "hook" },
  { slug: "use-file-drop", name: "useFileDrop", type: "hook" },
  { slug: "use-now", name: "useNow", type: "hook" },
  {
    slug: "use-notification-permission",
    name: "useNotificationPermission",
    type: "hook",
  },
  { slug: "use-scroll-spy", name: "useScrollSpy", type: "hook" },
  { slug: "activity-heatmap", name: "Activity Heatmap", type: "component" },
  { slug: "click-sparks", name: "Click Sparks", type: "effect" },
  { slug: "dashed-line", name: "Dashed Line", type: "effect" },
  { slug: "dither-background", name: "Dither Background", type: "effect" },
  { slug: "fade-scroller", name: "Fade Scroller", type: "component" },
  { slug: "gantt-chart", name: "Gantt Chart", type: "component" },
  { slug: "gauge", name: "Gauge", type: "component" },
  { slug: "highlight-text", name: "Highlight Text", type: "effect" },
  { slug: "image-viewer", name: "Image Viewer", type: "component" },
  { slug: "mesh-gradient", name: "Mesh Gradient", type: "effect" },
  { slug: "radar-chart", name: "Radar Chart", type: "component" },
  { slug: "rotary-dial", name: "Rotary Dial", type: "component" },
  { slug: "rotating-text", name: "Rotating Text", type: "effect" },
  { slug: "scroll-word-reveal", name: "Scroll Word Reveal", type: "effect" },
  { slug: "silhouette-reveal", name: "Silhouette Reveal", type: "component" },
  { slug: "stat-counter", name: "Stat Counter", type: "component" },
  { slug: "theme-transition", name: "Theme Transition", type: "effect" },
  { slug: "use-keyboard-layout", name: "useKeyboardLayout", type: "hook" },
  { slug: "add-to-calendar", name: "Add to Calendar", type: "component" },
  { slug: "ics", name: "ics", type: "lib" },
  { slug: "phone-countries", name: "phone-countries", type: "lib" },
  {
    slug: "use-deferred-interaction",
    name: "useDeferredInteraction",
    type: "hook",
  },
  { slug: "use-horizontal-wheel", name: "useHorizontalWheel", type: "hook" },
  { slug: "use-keyboard-fit", name: "useKeyboardFit", type: "hook" },
  { slug: "use-near-viewport", name: "useNearViewport", type: "hook" },
  { slug: "use-scroll-threshold", name: "useScrollThreshold", type: "hook" },
  { slug: "use-sound-effects", name: "useSoundEffects", type: "hook" },
]

/**
 * Get registry URL for a component/effect by slug
 */
export function getRegistryUrl(slug: string): string | undefined {
  const item = REGISTRY_ITEMS.find((i) => i.slug === slug)
  if (!item) return undefined

  const filename = item.registryFile || `${slug}.json`
  return `${REGISTRY_BASE_URL}/${filename}`
}

/**
 * Get registry item by slug
 */
export function getRegistryItem(slug: string): RegistryItem | undefined {
  return REGISTRY_ITEMS.find((i) => i.slug === slug)
}

/**
 * Get all items by type
 */
export function getRegistryItemsByType(type: RegistryItemType): RegistryItem[] {
  return REGISTRY_ITEMS.filter((i) => i.type === type)
}

/**
 * Get install package name for CLI
 * Returns short format (@gooseui/button) if officially registered,
 * otherwise returns full URL (https://gooseui.pro/r/button.json)
 */
export function getInstallPackageName(slug: string): string {
  if (REGISTRY_IS_OFFICIAL) {
    return `${REGISTRY_NAMESPACE}/${slug}`
  }
  return `${REGISTRY_BASE_URL}/${slug}.json`
}
