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
  /** Short description for component cards */
  description?: string
  /** Component category (Display, Inputs, Layout, etc.) */
  category?: string
  /** Mark as new */
  isNew?: boolean
  /** Mark as draft (hidden in production) */
  isDraft?: boolean
  /** Mark as coming soon (shown but disabled) */
  isComingSoon?: boolean
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
 * Sort navigation items:
 * 1. Regular items (alphabetically)
 * 2. Draft items (alphabetically)
 * 3. Coming soon items (alphabetically)
 */
function sortNavItems(items: NavItem[]): NavItem[] {
  return [...items].sort((a, b) => {
    // Coming soon always last
    if (a.isComingSoon !== b.isComingSoon) return a.isComingSoon ? 1 : -1
    // Drafts after regular
    if (a.isDraft !== b.isDraft) return a.isDraft ? 1 : -1
    // Alphabetically within groups
    return a.title.localeCompare(b.title)
  })
}

/**
 * Raw navigation data (unsorted)
 */
const rawNavigation: NavSection[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    items: [
      {
        slug: "docs",
        title: "Introduction",
        href: "/docs",
        description: "Get started with GooseUI components",
        keywords: ["start", "getting started", "intro"],
      },
      {
        slug: "installation",
        title: "Installation",
        href: "/docs/installation",
        description: "How to install and configure GooseUI",
        keywords: ["install", "setup", "npm", "pnpm"],
      },
      {
        slug: "cli",
        title: "CLI",
        href: "/docs/cli",
        description: "Use CLI to add components",
        keywords: ["command", "terminal", "shadcn"],
      },
    ],
  },
  {
    title: "Components",
    slug: "components",
    href: "/docs/components",
    items: [
      // A
      {
        slug: "adaptive-grid",
        title: "Adaptive Grid",
        href: "/docs/components/adaptive-grid",
        description: "Grid that adapts with Container Queries + :has()",
        category: "Layout",
        isNew: true,
        keywords: ["grid", "container", "queries", "adaptive"],
      },
      {
        slug: "animated-timer",
        title: "Animated Timer",
        href: "/docs/components/animated-timer",
        description: "Countdown timer with flip animation",
        category: "Display",
        keywords: ["countdown", "timer", "flip", "animation"],
      },
      // B
      {
        slug: "baseline-status",
        title: "Baseline Status",
        href: "/docs/components/baseline-status",
        description: "Display browser support status",
        category: "Display",
        isNew: true,
        keywords: ["browser", "support", "compatibility", "baseline"],
      },
      {
        slug: "button",
        title: "Button",
        href: "/docs/components/button",
        description: "Button with various variants and sizes",
        category: "Inputs",
        keywords: ["click", "action", "submit"],
      },
      // C
      {
        slug: "card",
        title: "Card",
        href: "/docs/components/card",
        description: "Container for grouping content",
        category: "Layout",
        keywords: ["container", "box", "wrapper"],
      },
      {
        slug: "carousel",
        title: "Carousel",
        href: "/docs/components/carousel",
        description: "Image and content carousel slider",
        category: "Display",
        isNew: true,
        keywords: ["slider", "gallery", "images", "swipe"],
      },
      {
        slug: "checkbox",
        title: "Checkbox",
        href: "/docs/components/checkbox",
        description: "Checkbox input with label support",
        category: "Inputs",
        isNew: true,
        keywords: ["check", "toggle", "form", "input"],
      },
      // D
      {
        slug: "digital-clock",
        title: "Digital Clock",
        href: "/docs/components/digital-clock",
        description: "LED-style digital clock display",
        category: "Display",
        isNew: true,
        keywords: ["time", "clock", "led", "display"],
      },
      // I
      {
        slug: "input",
        title: "Input",
        href: "/docs/components/input",
        description: "Text input field component",
        category: "Inputs",
        keywords: ["text", "field", "form", "input"],
      },
      // M
      {
        slug: "morphing-dialog",
        title: "Morphing Dialog",
        href: "/docs/components/morphing-dialog",
        description: "Dialog with View Transitions API animation",
        category: "Overlay",
        isNew: true,
        keywords: ["modal", "popup", "view transitions", "animation"],
      },
      // P
      {
        slug: "promo-banner",
        title: "Promo Banner",
        href: "/docs/components/promo-banner",
        description: "Floating promotional banner with marquee",
        category: "Marketing",
        isNew: true,
        keywords: ["marketing", "popup", "sale", "campaign", "promotion"],
      },
      // S
      {
        slug: "scroll-progress",
        title: "Scroll Progress",
        href: "/docs/components/scroll-progress",
        description:
          "Page scroll progress bar using CSS scroll-driven animations",
        category: "Display",
        isDraft: true,
        keywords: ["scroll", "progress", "animation", "timeline"],
      },
      // T
      {
        slug: "theme-customizer",
        title: "Theme Customizer",
        href: "/docs/components/theme-customizer",
        description: "Floating theme and color picker",
        category: "Utilities",
        isNew: true,
        keywords: ["theme", "color", "dark mode", "customizer"],
      },
      {
        slug: "toast",
        title: "Toast",
        href: "/docs/components/toast",
        description: "Notification toast messages",
        category: "Feedback",
        keywords: ["notification", "alert", "message", "snackbar"],
      },
      {
        slug: "typography",
        title: "Typography",
        href: "/docs/components/typography",
        description: "Text styles and formatting",
        category: "Display",
        keywords: ["text", "heading", "paragraph", "font"],
      },
      // Draft components (alphabetically sorted)
      {
        slug: "morphing-header",
        title: "Morphing Header",
        href: "/docs/components/morphing-header",
        description: "Header that morphs on scroll with View Transitions",
        category: "Navigation",
        isDraft: true,
        keywords: ["header", "morph", "view transitions", "scroll"],
      },
      {
        slug: "scroll-container",
        title: "Scroll Container",
        href: "/docs/components/scroll-container",
        description: "Container with custom styled scrollbar",
        category: "Layout",
        isDraft: true,
        keywords: ["scroll", "scrollbar", "container", "custom"],
      },
      {
        slug: "smart-form",
        title: "Smart Form",
        href: "/docs/components/smart-form",
        description: "CSS-only form validation with :has() selector",
        category: "Inputs",
        isDraft: true,
        keywords: ["form", "validation", "has", "css-only"],
      },
      {
        slug: "stacking-cards",
        title: "Stacking Cards",
        href: "/docs/components/stacking-cards",
        description: "Cards that stack on scroll",
        category: "Display",
        isDraft: true,
        keywords: ["cards", "stack", "sticky", "scroll"],
      },
      {
        slug: "svg-drawable",
        title: "SVG Drawable",
        href: "/docs/components/svg-drawable",
        description: "Animate SVG path drawing with CSS",
        category: "Effects",
        isDraft: true,
        keywords: ["svg", "draw", "animation", "path", "stroke"],
      },
      // Coming Soon components (alphabetically sorted)
      {
        slug: "radio",
        title: "Radio",
        href: "/docs/components/radio",
        description: "Radio button group component",
        category: "Inputs",
        isComingSoon: true,
        keywords: ["radio", "option", "select", "form"],
      },
      {
        slug: "select",
        title: "Select",
        href: "/docs/components/select",
        description: "Dropdown select component",
        category: "Inputs",
        isComingSoon: true,
        keywords: ["dropdown", "select", "option", "form"],
      },
      {
        slug: "slider",
        title: "Slider",
        href: "/docs/components/slider",
        description: "Range slider input component",
        category: "Inputs",
        isDraft: true,
        keywords: ["range", "slider", "input", "form"],
      },
      {
        slug: "switch",
        title: "Switch",
        href: "/docs/components/switch",
        description: "Toggle switch component",
        category: "Inputs",
        isComingSoon: true,
        keywords: ["toggle", "switch", "on", "off", "form"],
      },
      {
        slug: "tabs",
        title: "Tabs",
        href: "/docs/components/tabs",
        description: "Tabbed content navigation",
        category: "Navigation",
        isComingSoon: true,
        keywords: ["tabs", "navigation", "panel", "content"],
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
        description: "Animated border beam effect",
        category: "Effects",
        isNew: true,
        keywords: ["border", "beam", "glow", "animation"],
      },
      {
        slug: "parallax-cards",
        title: "Parallax Cards",
        href: "/docs/effects/parallax-cards",
        description: "Cards with parallax effect on scroll",
        category: "Effects",
        isDraft: true,
        keywords: ["parallax", "scroll", "cards", "animation"],
      },
      {
        slug: "reveal-on-scroll",
        title: "Reveal on Scroll",
        href: "/docs/effects/reveal-on-scroll",
        description: "Elements reveal as they enter viewport",
        category: "Effects",
        isDraft: true,
        keywords: ["reveal", "scroll", "animation", "view"],
      },
    ],
  },
  {
    title: "Experimental",
    slug: "experimental",
    href: "/docs/experimental",
    items: [
      {
        slug: "anchor-tooltip",
        title: "Anchor Tooltip",
        href: "/docs/experimental/anchor-tooltip",
        description: "CSS-only tooltips with Anchor Positioning API",
        category: "Experimental",
        isNew: true,
        keywords: [
          "tooltip",
          "anchor",
          "popover",
          "positioning",
          "experimental",
        ],
      },
    ],
  },
  {
    title: "Blocks",
    slug: "blocks",
    href: "/docs/blocks",
    items: [
      {
        slug: "blocks",
        title: "Blocks Overview",
        href: "/docs/blocks",
        description: "Ready-to-use component blocks",
        isDraft: true,
        keywords: ["blocks", "templates", "examples"],
      },
    ],
  },
]

/**
 * Main documentation navigation structure (sorted)
 */
export const docsNavigation: NavSection[] = rawNavigation.map((section) => ({
  ...section,
  items: sortNavItems(section.items),
}))

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
  experimental: NavItem[]
} {
  const filtered = filterDraftItems(docsNavigation)
  const gettingStarted = filtered.find((s) => s.slug === "getting-started")
  const components = filtered.find((s) => s.slug === "components")
  const effects = filtered.find((s) => s.slug === "effects")
  const experimental = filtered.find((s) => s.slug === "experimental")

  return {
    pages: gettingStarted?.items || [],
    components: components?.items || [],
    effects: effects?.items || [],
    experimental: experimental?.items || [],
  }
}

/**
 * Get available components (not coming soon, not draft in production)
 */
export function getAvailableComponents(): NavItem[] {
  const isDev = process.env.NODE_ENV === "development"
  const components = docsNavigation.find((s) => s.slug === "components")
  if (!components) return []

  return components.items.filter((item) => {
    if (item.isComingSoon) return false
    if (item.isDraft && !isDev) return false
    return true
  })
}

/**
 * Get coming soon components
 */
export function getComingSoonComponents(): NavItem[] {
  const components = docsNavigation.find((s) => s.slug === "components")
  if (!components) return []

  return components.items.filter((item) => item.isComingSoon)
}

/**
 * Get all components for display (available + coming soon, filtered by env)
 */
export function getComponentsForDisplay(): {
  available: NavItem[]
  comingSoon: NavItem[]
} {
  return {
    available: getAvailableComponents(),
    comingSoon: getComingSoonComponents(),
  }
}

/**
 * Get prev/next navigation items for a given path
 * Returns undefined for prev if at the start, undefined for next if at the end
 */
export function getPrevNextNavigation(pathname: string): {
  prev: NavItem | undefined
  next: NavItem | undefined
} {
  // Get all navigable items (flatten sections, exclude coming soon)
  const allItems = filterDraftItems(docsNavigation)
    .flatMap((section) => section.items)
    .filter((item) => !item.isComingSoon)

  // Find current index
  const currentIndex = allItems.findIndex((item) => item.href === pathname)

  if (currentIndex === -1) {
    return { prev: undefined, next: undefined }
  }

  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : undefined,
    next:
      currentIndex < allItems.length - 1
        ? allItems[currentIndex + 1]
        : undefined,
  }
}
