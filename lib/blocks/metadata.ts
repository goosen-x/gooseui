/**
 * Block metadata registry for GooseUI Blocks
 *
 * Each entry represents a UI block that can be:
 * - Previewed in the documentation
 * - Installed via shadcn CLI
 * - Copied directly from the code view
 */

import type { BlockMetadata } from "./declarations"

/**
 * All registered blocks metadata
 *
 * Naming convention: {category}-{number} (e.g., "header-01", "stats-01")
 */
export const blocksMetadata: BlockMetadata[] = [
  // ===== HEADERS =====
  {
    id: "header-01",
    category: "headers",
    name: "Simple Header",
    description: "Minimal header with logo and navigation links",
    type: "file",
    iframeHeight: 80,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "header-02",
    category: "headers",
    name: "Header with CTA",
    description: "Navigation with prominent call-to-action button",
    type: "file",
    iframeHeight: 80,
    isNew: true,
  },
  {
    id: "header-03",
    category: "headers",
    name: "Header with Auth",
    description: "Navigation with login/signup buttons and user menu",
    type: "file",
    iframeHeight: 80,
    isNew: true,
  },
  {
    id: "header-04",
    category: "headers",
    name: "Header with Dropdown",
    description: "Navigation with dropdown menus for nested links",
    type: "file",
    iframeHeight: 80,
    isComingSoon: true,
  },
  {
    id: "header-05",
    category: "headers",
    name: "Mega Menu Header",
    description: "Header with full-width mega menu dropdowns",
    type: "file",
    iframeHeight: 400,
    isComingSoon: true,
  },
  {
    id: "header-06",
    category: "headers",
    name: "Header with Search",
    description: "Navigation with integrated search input",
    type: "file",
    iframeHeight: 80,
    isComingSoon: true,
  },
  {
    id: "header-07",
    category: "headers",
    name: "Transparent Header",
    description: "Overlay header for hero sections and landing pages",
    type: "file",
    iframeHeight: 400,
    isComingSoon: true,
  },
  {
    id: "header-08",
    category: "headers",
    name: "Sticky Header",
    description: "Fixed header that stays on scroll with shrink effect",
    type: "file",
    iframeHeight: 200,
    isComingSoon: true,
  },
  {
    id: "header-09",
    category: "headers",
    name: "Mobile Header",
    description: "Responsive header with hamburger menu and drawer",
    type: "file",
    iframeHeight: 80,
    isComingSoon: true,
  },
  {
    id: "header-10",
    category: "headers",
    name: "Header with Notifications",
    description: "Navigation with notification bell and dropdown",
    type: "file",
    iframeHeight: 80,
    isComingSoon: true,
  },

  // ===== FOOTERS =====
  {
    id: "footer-01",
    category: "footers",
    name: "Simple Footer",
    description: "Minimal footer with logo, links, and copyright",
    type: "file",
    iframeHeight: 100,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "footer-02",
    category: "footers",
    name: "Multi-Column Footer",
    description: "Footer with multiple link columns and sections",
    type: "file",
    iframeHeight: 400,
    isNew: true,
  },
  {
    id: "footer-03",
    category: "footers",
    name: "Footer with Newsletter",
    description: "Footer with email subscription form",
    type: "file",
    iframeHeight: 350,
    isNew: true,
  },
  {
    id: "footer-04",
    category: "footers",
    name: "Footer with Social",
    description: "Footer focused on social media links and icons",
    type: "file",
    iframeHeight: 200,
    isComingSoon: true,
  },
  {
    id: "footer-05",
    category: "footers",
    name: "Centered Footer",
    description: "Compact centered footer with minimal links",
    type: "file",
    iframeHeight: 150,
    isComingSoon: true,
  },
  {
    id: "footer-06",
    category: "footers",
    name: "Footer with Contact",
    description: "Footer with contact information and form",
    type: "file",
    iframeHeight: 400,
    isComingSoon: true,
  },
  {
    id: "footer-07",
    category: "footers",
    name: "Footer with App Links",
    description: "Footer with app store download buttons",
    type: "file",
    iframeHeight: 250,
    isComingSoon: true,
  },
  {
    id: "footer-08",
    category: "footers",
    name: "Full Footer",
    description: "Complete footer with all sections: links, newsletter, social, legal",
    type: "file",
    iframeHeight: 500,
    isComingSoon: true,
  },

  // ===== HERO SECTIONS =====
  {
    id: "hero-01",
    category: "hero",
    name: "Simple Hero",
    description: "Centered hero with headline, description, and CTA buttons",
    type: "file",
    iframeHeight: 600,
    isFeatured: true,
    isComingSoon: true,
  },
  {
    id: "hero-02",
    category: "hero",
    name: "Hero with Image",
    description: "Hero section with side image or illustration",
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-03",
    category: "hero",
    name: "Split Hero",
    description: "Two-column hero with content and visual",
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-04",
    category: "hero",
    name: "Hero with Video",
    description: "Hero with background or embedded video",
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-05",
    category: "hero",
    name: "Hero with Form",
    description: "Hero with integrated signup or contact form",
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-06",
    category: "hero",
    name: "Hero with Stats",
    description: "Hero showcasing key metrics and numbers",
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-07",
    category: "hero",
    name: "Hero with Features",
    description: "Hero with feature highlights and icons",
    type: "file",
    iframeHeight: 700,
    isComingSoon: true,
  },
  {
    id: "hero-08",
    category: "hero",
    name: "Gradient Hero",
    description: "Hero with animated gradient background",
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-09",
    category: "hero",
    name: "Animated Hero",
    description: "Hero with text animations and motion effects",
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-10",
    category: "hero",
    name: "Hero with Logo Cloud",
    description: "Hero with partner/client logos below CTA",
    type: "file",
    iframeHeight: 700,
    isComingSoon: true,
  },

  // ===== STATS =====
  {
    id: "stats-01",
    category: "stats",
    name: "Stats Card",
    description: "Card with metric value, change percentage, and sparkline chart",
    type: "file",
    iframeHeight: 200,
    isFeatured: true,
    isComingSoon: true,
  },
  {
    id: "stats-02",
    category: "stats",
    name: "Stats Grid",
    description: "Grid of multiple stat cards with icons",
    type: "file",
    iframeHeight: 300,
    isComingSoon: true,
  },
  {
    id: "stats-03",
    category: "stats",
    name: "Progress Stats",
    description: "Stats with progress bars and percentages",
    type: "file",
    iframeHeight: 250,
    isComingSoon: true,
  },

  // ===== LOGIN =====
  {
    id: "login-01",
    category: "login",
    name: "Simple Login",
    description: "Basic login form with email and password",
    type: "file",
    iframeHeight: 500,
    isFeatured: true,
    isComingSoon: true,
  },
  {
    id: "login-02",
    category: "login",
    name: "Login with Social",
    description: "Login form with social OAuth buttons",
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "login-03",
    category: "login",
    name: "Login with Image",
    description: "Split login with side image",
    type: "file",
    iframeHeight: 700,
    isComingSoon: true,
  },

  // ===== WEB3 =====
  {
    id: "web3-01",
    category: "web3",
    name: "Wallet Connect",
    description: "Button with dropdown to connect crypto wallets",
    type: "file",
    iframeHeight: 400,
    isFeatured: true,
    isComingSoon: true,
  },
  {
    id: "web3-02",
    category: "web3",
    name: "NFT Card",
    description: "Card displaying NFT with image, title, price",
    type: "file",
    iframeHeight: 400,
    isComingSoon: true,
  },
  {
    id: "web3-03",
    category: "web3",
    name: "Token Balance",
    description: "Display token balance with icon and value",
    type: "file",
    iframeHeight: 100,
    isComingSoon: true,
  },

  // ===== DASHBOARD =====
  {
    id: "dashboard-01",
    category: "dashboard",
    name: "Price Card",
    description: "Current price display with chart and period selector",
    type: "file",
    iframeHeight: 400,
    isFeatured: true,
    isComingSoon: true,
  },

  // ===== MARKETING =====
  {
    id: "marketing-01",
    category: "marketing",
    name: "Promo Banner",
    description: "Popup banner for promotions with countdown",
    type: "file",
    iframeHeight: 300,
    isFeatured: true,
    isComingSoon: true,
  },

  // ===== E-COMMERCE =====
  {
    id: "ecommerce-01",
    category: "e-commerce",
    name: "Product Card",
    description: "Product display with image, title, price, and actions",
    type: "file",
    iframeHeight: 400,
    isFeatured: true,
    isComingSoon: true,
  },

  // ===== AI =====
  {
    id: "ai-01",
    category: "ai",
    name: "Chat Interface",
    description: "AI chat interface with message bubbles",
    type: "directory",
    iframeHeight: 600,
    isFeatured: true,
    isComingSoon: true,
  },
]

/**
 * Get block metadata by ID
 */
export function getBlockById(id: string): BlockMetadata | undefined {
  return blocksMetadata.find((block) => block.id === id)
}

/**
 * Get blocks by category
 */
export function getBlocksByCategory(category: string): BlockMetadata[] {
  return blocksMetadata.filter((block) => block.category === category)
}

/**
 * Get featured blocks
 */
export function getFeaturedBlocks(): BlockMetadata[] {
  return blocksMetadata.filter((block) => block.isFeatured)
}

/**
 * Get available blocks (not coming soon)
 */
export function getAvailableBlocks(): BlockMetadata[] {
  return blocksMetadata.filter((block) => !block.isComingSoon)
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development"
}

/**
 * Get blocks for display (respects dev/prod mode)
 */
export function getDisplayBlocks(): BlockMetadata[] {
  if (isDevelopment()) {
    return blocksMetadata
  }
  return getAvailableBlocks()
}

/**
 * Get blocks by category for display (respects dev/prod mode)
 */
export function getDisplayBlocksByCategory(category: string): BlockMetadata[] {
  const blocks = getBlocksByCategory(category)
  if (isDevelopment()) {
    return blocks
  }
  return blocks.filter((b) => !b.isComingSoon)
}

/**
 * Count available blocks in a category
 */
export function countAvailableBlocksInCategory(category: string): number {
  return blocksMetadata.filter(
    (b) => b.category === category && !b.isComingSoon
  ).length
}

/**
 * Count all blocks in a category
 */
export function countBlocksInCategory(category: string): number {
  return blocksMetadata.filter((b) => b.category === category).length
}
