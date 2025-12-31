/**
 * Unified documentation navigation configuration
 *
 * This is the SINGLE SOURCE OF TRUTH for all docs navigation:
 * - Sidebar navigation
 * - Breadcrumbs
 * - Site search
 *
 * When adding a new component/page, add it here and it will
 * automatically appear in all navigation elements.
 */

export interface NavItem {
  /** URL slug (e.g., "carousel", "animated-timer") */
  slug: string
  /** Display title (e.g., "Carousel", "Animated Timer") */
  title: string
  /** Full href path */
  href: string
  /** Mark as new */
  isNew?: boolean
  /** Mark as draft (hidden in production) */
  isDraft?: boolean
  /** Search keywords */
  keywords?: string[]
}

export interface NavSection {
  /** Section title */
  title: string
  /** Section slug for breadcrumbs */
  slug: string
  /** Optional section href */
  href?: string
  /** Navigation items */
  items: NavItem[]
}

/**
 * Main documentation navigation structure
 */
export const docsNavigation: NavSection[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    items: [
      {
        slug: "docs",
        title: "Introduction",
        href: "/docs",
        keywords: ["start", "getting started", "intro"],
      },
      {
        slug: "installation",
        title: "Installation",
        href: "/docs/installation",
        keywords: ["install", "setup", "npm", "pnpm"],
      },
      {
        slug: "cli",
        title: "CLI",
        href: "/docs/cli",
        keywords: ["command", "terminal", "shadcn"],
      },
    ],
  },
  {
    title: "Components",
    slug: "components",
    href: "/docs/components",
    items: [
      {
        slug: "animated-checkbox",
        title: "Animated Checkbox",
        href: "/docs/components/animated-checkbox",
        isDraft: true,
        isNew: true,
      },
      {
        slug: "animated-timer",
        title: "Animated Timer",
        href: "/docs/components/animated-timer",
      },
      {
        slug: "baseline-status",
        title: "Baseline Status",
        href: "/docs/components/baseline-status",
        isNew: true,
      },
      {
        slug: "button",
        title: "Button",
        href: "/docs/components/button",
      },
      {
        slug: "card",
        title: "Card",
        href: "/docs/components/card",
      },
      {
        slug: "carousel",
        title: "Carousel",
        href: "/docs/components/carousel",
        isNew: true,
      },
      {
        slug: "digital-clock",
        title: "Digital Clock",
        href: "/docs/components/digital-clock",
        isNew: true,
      },
      {
        slug: "github-promo-banner",
        title: "GitHub Promo Banner",
        href: "/docs/components/github-promo-banner",
        isNew: true,
        keywords: ["github", "stars", "marketing", "popup", "promotion"],
      },
      {
        slug: "input",
        title: "Input",
        href: "/docs/components/input",
      },
      {
        slug: "morphing-dialog",
        title: "Morphing Dialog",
        href: "/docs/components/morphing-dialog",
        isDraft: true,
        isNew: true,
        keywords: ["modal", "popup", "view transitions", "animation"],
      },
      {
        slug: "promo-banner",
        title: "Promo Banner",
        href: "/docs/components/promo-banner",
        isNew: true,
        keywords: ["marketing", "popup", "sale", "campaign", "promotion"],
      },
      {
        slug: "theme-customizer",
        title: "Theme Customizer",
        href: "/docs/components/theme-customizer",
        isNew: true,
      },
      {
        slug: "toast",
        title: "Toast",
        href: "/docs/components/toast",
      },
      {
        slug: "typography",
        title: "Typography",
        href: "/docs/components/typography",
      },
    ],
  },
  {
    title: "Effects",
    slug: "effects",
    items: [
      {
        slug: "border-beam",
        title: "Border Beam",
        href: "/docs/effects/border-beam",
        isNew: true,
      },
    ],
  },
]

/**
 * Get all navigation items flattened
 */
export function getAllNavItems(): NavItem[] {
  return docsNavigation.flatMap((section) => section.items)
}

/**
 * Get navigation item by slug
 */
export function getNavItemBySlug(slug: string): NavItem | undefined {
  return getAllNavItems().find((item) => item.slug === slug)
}

/**
 * Get display title for a slug (for breadcrumbs)
 */
export function getSlugTitle(slug: string): string {
  // Check sections first
  const section = docsNavigation.find((s) => s.slug === slug)
  if (section) return section.title

  // Check items
  const item = getNavItemBySlug(slug)
  if (item) return item.title

  // Fallback: capitalize slug
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Filter out draft items in production
 */
export function filterDraftItems(sections: NavSection[]): NavSection[] {
  const isDev = process.env.NODE_ENV === "development"
  if (isDev) return sections

  return sections.map((section) => ({
    ...section,
    items: section.items.filter((item) => !item.isDraft),
  }))
}

/**
 * Get items for search (excludes drafts in production)
 */
export function getSearchableItems(): {
  pages: NavItem[]
  components: NavItem[]
  effects: NavItem[]
} {
  const filtered = filterDraftItems(docsNavigation)
  const gettingStarted = filtered.find((s) => s.slug === "getting-started")
  const components = filtered.find((s) => s.slug === "components")
  const effects = filtered.find((s) => s.slug === "effects")

  return {
    pages: gettingStarted?.items || [],
    components: components?.items || [],
    effects: effects?.items || [],
  }
}
