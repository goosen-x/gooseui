/**
 * Block registry configuration for GooseUI Blocks Marketplace
 *
 * Each block represents an individual UI pattern/component
 * that can be installed via the shadcn CLI.
 */

export const BLOCKS_REGISTRY_BASE_URL = "https://gooseui.pro/r/blocks"

export type BlockTier = "free" | "pro" | "team"

export interface BlockItem {
  /** URL slug (e.g., "wallet-connect", "nft-card") */
  slug: string
  /** Display name */
  name: string
  /** Short description */
  description: string
  /** Category slug */
  category: string
  /** Required tier to access */
  tier: BlockTier
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
    tier: "pro",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "wallet-select-card",
    name: "Wallet Select Card",
    description: "Card with wallet selection, search, and connect button",
    category: "web3",
    tier: "pro",
    isComingSoon: true,
  },
  {
    slug: "address-display",
    name: "Address Display",
    description: "Truncated address display with copy to clipboard",
    category: "web3",
    tier: "pro",
    isComingSoon: true,
  },
  {
    slug: "nft-card",
    name: "NFT Card",
    description: "Card displaying NFT with image, title, price, and buy button",
    category: "web3",
    tier: "pro",
    isComingSoon: true,
  },
  {
    slug: "token-balance",
    name: "Token Balance",
    description: "Display token balance with icon and value",
    category: "web3",
    tier: "pro",
    isComingSoon: true,
  },
  {
    slug: "network-switcher",
    name: "Network Switcher",
    description: "Dropdown to switch between blockchain networks",
    category: "web3",
    tier: "pro",
    isComingSoon: true,
  },

  // Dashboard blocks
  {
    slug: "stats-card",
    name: "Stats Card",
    description:
      "Card with metric value, change percentage, and sparkline chart",
    category: "dashboard",
    tier: "pro",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "price-card",
    name: "Price Card",
    description: "Current price display with chart and period selector",
    category: "dashboard",
    tier: "pro",
    isComingSoon: true,
  },
  {
    slug: "staking-card",
    name: "Staking Card",
    description: "Staking metrics with APR and user count",
    category: "dashboard",
    tier: "pro",
    isComingSoon: true,
  },
  {
    slug: "wallet-stats-card",
    name: "Wallet Stats Card",
    description: "Compact wallet card with balance and change",
    category: "dashboard",
    tier: "pro",
    isComingSoon: true,
  },

  // Marketing blocks
  {
    slug: "promo-banner",
    name: "Promo Banner",
    description: "Popup banner for promotions with countdown and marquee",
    category: "marketing",
    tier: "pro",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "announcement-bar",
    name: "Announcement Bar",
    description: "Top bar for site-wide announcements",
    category: "marketing",
    tier: "free",
    isComingSoon: true,
  },
  {
    slug: "price-tag",
    name: "Price Tag",
    description: "Price display with original price strikethrough",
    category: "marketing",
    tier: "free",
    isComingSoon: true,
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    description: "Countdown to a specific date/time",
    category: "marketing",
    tier: "pro",
    isComingSoon: true,
  },
  {
    slug: "marquee-banner",
    name: "Marquee Banner",
    description: "Scrolling text banner for urgency messaging",
    category: "marketing",
    tier: "pro",
    isComingSoon: true,
  },

  // E-commerce blocks
  {
    slug: "product-card",
    name: "Product Card",
    description: "Product display with image, title, price, and actions",
    category: "e-commerce",
    tier: "pro",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "cart-item",
    name: "Cart Item",
    description: "Shopping cart item with quantity controls",
    category: "e-commerce",
    tier: "pro",
    isComingSoon: true,
  },
  {
    slug: "checkout-summary",
    name: "Checkout Summary",
    description: "Order summary with totals and checkout button",
    category: "e-commerce",
    tier: "pro",
    isComingSoon: true,
  },
  {
    slug: "pricing-card",
    name: "Pricing Card",
    description: "Pricing tier card with features list and CTA",
    category: "e-commerce",
    tier: "free",
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
 * Get blocks by tier
 */
export function getBlocksByTier(tier: BlockTier): BlockItem[] {
  return BLOCK_ITEMS.filter((b) => b.tier === tier)
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
