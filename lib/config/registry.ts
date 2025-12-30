/**
 * Registry configuration for GooseUI components
 *
 * When adding a new component:
 * 1. Add entry to REGISTRY_ITEMS with slug and type
 * 2. The registryUrl will be auto-generated as: https://gooseui.pro/r/{slug}.json
 * 3. DocsPageNav will automatically use this URL for "Open in v0" and other AI tools
 */

export const REGISTRY_BASE_URL = "https://gooseui.pro/r"

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
  { slug: "button", name: "Button", type: "component" },
  { slug: "button-group", name: "Button Group", type: "component" },
  { slug: "card", name: "Card", type: "component" },
  { slug: "input", name: "Input", type: "component" },
  { slug: "animated-timer", name: "Animated Timer", type: "component" },
  {
    slug: "toast",
    name: "Toast",
    type: "component",
    registryFile: "sonner.json",
  },
  { slug: "typography", name: "Typography", type: "component" },
  { slug: "theme-customizer", name: "Theme Customizer", type: "component" },
  { slug: "carousel", name: "Carousel", type: "component" },
  { slug: "digital-clock", name: "Digital Clock", type: "component" },
  { slug: "baseline-status", name: "Baseline Status", type: "component" },
  { slug: "theme-switcher", name: "Theme Switcher", type: "component" },

  // Effects
  { slug: "border-beam", name: "Border Beam", type: "effect" },
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
