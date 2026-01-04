/**
 * Block categories configuration for GooseUI Blocks Marketplace
 *
 * Each category represents a collection of related blocks
 * that can be installed via the shadcn CLI.
 */

import type { LucideIcon } from "lucide-react"
import {
  Bell,
  Bot,
  FormInput,
  KeyRound,
  LayoutDashboard,
  Megaphone,
  PanelBottom,
  PanelTop,
  Rocket,
  ShoppingCart,
  TableProperties,
  Wallet,
} from "lucide-react"

export interface BlockCategory {
  /** URL slug (e.g., "web3", "marketing") */
  slug: string
  /** Display name */
  name: string
  /** Short description */
  description: string
  /** Icon component */
  icon: LucideIcon
  /** Number of blocks in category */
  count: number
  /** Coming soon? */
  isComingSoon?: boolean
}

/**
 * All block categories
 */
export const BLOCK_CATEGORIES: BlockCategory[] = [
  {
    slug: "web3",
    name: "Web3",
    description: "Wallet connections, NFT cards, token dashboards",
    icon: Wallet,
    count: 0,
  },
  {
    slug: "dashboard",
    name: "Dashboard",
    description: "Analytics, charts, metrics, admin panels",
    icon: LayoutDashboard,
    count: 0,
  },
  {
    slug: "marketing",
    name: "Marketing",
    description: "Promo banners, CTAs, pricing tables",
    icon: Megaphone,
    count: 0,
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    description: "Product cards, carts, checkout flows",
    icon: ShoppingCart,
    count: 0,
  },
  {
    slug: "forms",
    name: "Forms",
    description: "Contact, sign-up, multi-step forms",
    icon: FormInput,
    count: 0,
    isComingSoon: true,
  },
  {
    slug: "ai",
    name: "AI",
    description: "Chat interfaces, prompts, AI workflows",
    icon: Bot,
    count: 0,
    isComingSoon: true,
  },
  {
    slug: "authentication",
    name: "Authentication",
    description: "Login, sign-up, password reset forms",
    icon: KeyRound,
    count: 0,
    isComingSoon: true,
  },
  {
    slug: "headers",
    name: "Headers",
    description: "Navigation bars, mega menus, sticky headers",
    icon: PanelTop,
    count: 0,
  },
  {
    slug: "footers",
    name: "Footers",
    description: "Site footers, newsletter, social links",
    icon: PanelBottom,
    count: 0,
  },
  {
    slug: "hero",
    name: "Hero Sections",
    description: "Landing heroes, split layouts, with video/images",
    icon: Rocket,
    count: 0,
  },
  {
    slug: "data-display",
    name: "Data Display",
    description: "Tables, lists, grids, cards",
    icon: TableProperties,
    count: 0,
    isComingSoon: true,
  },
  {
    slug: "feedback",
    name: "Feedback",
    description: "Alerts, notifications, modals, toasts",
    icon: Bell,
    count: 0,
    isComingSoon: true,
  },
]

/**
 * Get category by slug
 */
export function getBlockCategory(slug: string): BlockCategory | undefined {
  return BLOCK_CATEGORIES.find((c) => c.slug === slug)
}

/**
 * Get all available categories (not coming soon)
 */
export function getAvailableCategories(): BlockCategory[] {
  return BLOCK_CATEGORIES.filter((c) => !c.isComingSoon)
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development"
}

/**
 * Get categories for display (respects dev/prod mode)
 * In production: only shows categories that have available blocks
 * In development: shows all categories
 */
export function getDisplayCategories(
  countAvailableBlocks: (category: string) => number
): BlockCategory[] {
  if (isDevelopment()) {
    return BLOCK_CATEGORIES
  }
  // In production, only show categories with available blocks
  return BLOCK_CATEGORIES.filter((c) => {
    if (c.isComingSoon) return false
    return countAvailableBlocks(c.slug) > 0
  })
}

