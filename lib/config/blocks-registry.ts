/**
 * Block registry configuration for GooseUI Blocks
 *
 * Each block represents an individual UI pattern/component
 * that can be installed via the shadcn CLI.
 */

export const BLOCKS_REGISTRY_BASE_URL = "https://gooseui.pro/r/blocks"

export interface BlockItem {
  /** URL slug (e.g., "wallet-connect", "nft-card") */
  slug: string
  /** Display name */
  name: string
  /** Short description */
  description: string
  /** Category slug */
  category: string
  /** Preview image path */
  previewImage?: string
  /** Component source code (for preview) */
  sourceCode?: string
  /** Dependencies required */
  dependencies?: string[]
  /** Is this a featured block? */
  isFeatured?: boolean
  /** Is this new? */
  isNew?: boolean
  /** Coming soon? */
  isComingSoon?: boolean
}

/**
 * All registered blocks
 *
 * Add new blocks here as they are created.
 * The registry JSON files should be placed in public/r/blocks/{slug}.json
 */
export const BLOCK_ITEMS: BlockItem[] = [
  // Web3 blocks
  {
    slug: "wallet-connect",
    name: "Wallet Connect",
    description:
      "Button with dropdown to connect crypto wallets (MetaMask, Coinbase, Trust)",
    category: "web3",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "wallet-select-card",
    name: "Wallet Select Card",
    description: "Card with wallet selection, search, and connect button",
    category: "web3",
    isComingSoon: true,
  },
  {
    slug: "address-display",
    name: "Address Display",
    description: "Truncated address display with copy to clipboard",
    category: "web3",
    isComingSoon: true,
  },
  {
    slug: "nft-card",
    name: "NFT Card",
    description: "Card displaying NFT with image, title, price, and buy button",
    category: "web3",
    isComingSoon: true,
  },
  {
    slug: "token-balance",
    name: "Token Balance",
    description: "Display token balance with icon and value",
    category: "web3",
    isComingSoon: true,
  },
  {
    slug: "network-switcher",
    name: "Network Switcher",
    description: "Dropdown to switch between blockchain networks",
    category: "web3",
    isComingSoon: true,
  },

  // Dashboard blocks
  {
    slug: "stats-card",
    name: "Stats Card",
    description:
      "Card with metric value, change percentage, and sparkline chart",
    category: "dashboard",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "price-card",
    name: "Price Card",
    description: "Current price display with chart and period selector",
    category: "dashboard",
    isComingSoon: true,
  },
  {
    slug: "staking-card",
    name: "Staking Card",
    description: "Staking metrics with APR and user count",
    category: "dashboard",
    isComingSoon: true,
  },
  {
    slug: "wallet-stats-card",
    name: "Wallet Stats Card",
    description: "Compact wallet card with balance and change",
    category: "dashboard",
    isComingSoon: true,
  },

  // Marketing blocks
  {
    slug: "promo-banner",
    name: "Promo Banner",
    description: "Popup banner for promotions with countdown and marquee",
    category: "marketing",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "announcement-bar",
    name: "Announcement Bar",
    description: "Top bar for site-wide announcements",
    category: "marketing",
    isComingSoon: true,
  },
  {
    slug: "price-tag",
    name: "Price Tag",
    description: "Price display with original price strikethrough",
    category: "marketing",
    isComingSoon: true,
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    description: "Countdown to a specific date/time",
    category: "marketing",
    isComingSoon: true,
  },
  {
    slug: "marquee-banner",
    name: "Marquee Banner",
    description: "Scrolling text banner for urgency messaging",
    category: "marketing",
    isComingSoon: true,
  },

  // E-commerce blocks
  {
    slug: "product-card",
    name: "Product Card",
    description: "Product display with image, title, price, and actions",
    category: "e-commerce",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "cart-item",
    name: "Cart Item",
    description: "Shopping cart item with quantity controls",
    category: "e-commerce",
    isComingSoon: true,
  },
  {
    slug: "checkout-summary",
    name: "Checkout Summary",
    description: "Order summary with totals and checkout button",
    category: "e-commerce",
    isComingSoon: true,
  },
  {
    slug: "pricing-card",
    name: "Pricing Card",
    description: "Pricing tier card with features list and CTA",
    category: "e-commerce",
    isComingSoon: true,
  },

  // Headers blocks (10)
  {
    slug: "header-simple",
    name: "Simple Header",
    description: "Minimal header with logo and navigation links",
    category: "headers",
    isFeatured: true,
    isNew: true,
  },
  {
    slug: "header-with-cta",
    name: "Header with CTA",
    description: "Navigation with prominent call-to-action button",
    category: "headers",
  },
  {
    slug: "header-dropdown",
    name: "Header with Dropdown",
    description: "Navigation with dropdown menus for nested links",
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-mega-menu",
    name: "Mega Menu Header",
    description: "Header with full-width mega menu dropdowns",
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-search",
    name: "Header with Search",
    description: "Navigation with integrated search input",
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-transparent",
    name: "Transparent Header",
    description: "Overlay header for hero sections and landing pages",
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-sticky",
    name: "Sticky Header",
    description: "Fixed header that stays on scroll with shrink effect",
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-auth",
    name: "Header with Auth",
    description: "Navigation with login/signup buttons and user menu",
    category: "headers",
    isNew: true,
  },
  {
    slug: "header-mobile",
    name: "Mobile Header",
    description: "Responsive header with hamburger menu and drawer",
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-notification",
    name: "Header with Notifications",
    description: "Navigation with notification bell and dropdown",
    category: "headers",
    isComingSoon: true,
  },

  // Footers blocks (8)
  {
    slug: "footer-simple",
    name: "Simple Footer",
    description: "Minimal footer with logo, links, and copyright",
    category: "footers",
    isFeatured: true,
    isNew: true,
  },
  {
    slug: "footer-columns",
    name: "Multi-Column Footer",
    description: "Footer with multiple link columns and sections",
    category: "footers",
    isNew: true,
  },
  {
    slug: "footer-newsletter",
    name: "Footer with Newsletter",
    description: "Footer with email subscription form",
    category: "footers",
  },
  {
    slug: "footer-social",
    name: "Footer with Social",
    description: "Footer focused on social media links and icons",
    category: "footers",
    isComingSoon: true,
  },
  {
    slug: "footer-centered",
    name: "Centered Footer",
    description: "Compact centered footer with minimal links",
    category: "footers",
    isComingSoon: true,
  },
  {
    slug: "footer-contact",
    name: "Footer with Contact",
    description: "Footer with contact information and form",
    category: "footers",
    isComingSoon: true,
  },
  {
    slug: "footer-app-links",
    name: "Footer with App Links",
    description: "Footer with app store download buttons",
    category: "footers",
    isComingSoon: true,
  },
  {
    slug: "footer-full",
    name: "Full Footer",
    description:
      "Complete footer with all sections: links, newsletter, social, legal",
    category: "footers",
    isComingSoon: true,
  },

  // Features blocks
  {
    slug: "features-grid",
    name: "Features Grid",
    description: "Six-column grid showcasing product features with icons",
    category: "features",
    isFeatured: true,
    isNew: true,
  },

  // Hero sections blocks (10)
  {
    slug: "hero-simple",
    name: "Simple Hero",
    description: "Centered hero with headline, description, and CTA buttons",
    category: "hero",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "hero-with-image",
    name: "Hero with Image",
    description: "Hero section with side image or illustration",
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-split",
    name: "Split Hero",
    description: "Two-column hero with content and visual",
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-video",
    name: "Hero with Video",
    description: "Hero with background or embedded video",
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-with-form",
    name: "Hero with Form",
    description: "Hero with integrated signup or contact form",
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-stats",
    name: "Hero with Stats",
    description: "Hero showcasing key metrics and numbers",
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-features",
    name: "Hero with Features",
    description: "Hero with feature highlights and icons",
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-gradient",
    name: "Gradient Hero",
    description: "Hero with animated gradient background",
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-animated",
    name: "Animated Hero",
    description: "Hero with text animations and motion effects",
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-logo-cloud",
    name: "Hero with Logo Cloud",
    description: "Hero with partner/client logos below CTA",
    category: "hero",
    isComingSoon: true,
  },
]

/**
 * Get block by slug
 */
export function getBlock(slug: string): BlockItem | undefined {
  return BLOCK_ITEMS.find((b) => b.slug === slug)
}

/**
 * Get blocks by category
 */
export function getBlocksByCategory(category: string): BlockItem[] {
  return BLOCK_ITEMS.filter((b) => b.category === category)
}

/**
 * Get featured blocks
 */
export function getFeaturedBlocks(): BlockItem[] {
  return BLOCK_ITEMS.filter((b) => b.isFeatured)
}

/**
 * Get available blocks (not coming soon)
 */
export function getAvailableBlocks(): BlockItem[] {
  return BLOCK_ITEMS.filter((b) => !b.isComingSoon)
}

/**
 * Get registry URL for a block
 */
export function getBlockRegistryUrl(slug: string): string {
  return `${BLOCKS_REGISTRY_BASE_URL}/${slug}.json`
}

/**
 * Count blocks in a category
 */
export function countBlocksInCategory(category: string): number {
  return getBlocksByCategory(category).length
}

/**
 * Count available blocks in a category (not coming soon)
 */
export function countAvailableBlocksInCategory(category: string): number {
  return BLOCK_ITEMS.filter((b) => b.category === category && !b.isComingSoon)
    .length
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development"
}

/**
 * Get blocks for display (respects dev/prod mode)
 * In production: only shows available blocks (not coming soon)
 * In development: shows all blocks including coming soon
 */
export function getDisplayBlocks(): BlockItem[] {
  if (isDevelopment()) {
    return BLOCK_ITEMS
  }
  return getAvailableBlocks()
}

/**
 * Get blocks by category for display (respects dev/prod mode)
 */
export function getDisplayBlocksByCategory(category: string): BlockItem[] {
  const blocks = getBlocksByCategory(category)
  if (isDevelopment()) {
    return blocks
  }
  return blocks.filter((b) => !b.isComingSoon)
}
