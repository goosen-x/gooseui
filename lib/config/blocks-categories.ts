/**
 * Block categories configuration for GooseUI Blocks Marketplace
 *
 * Each category represents a collection of related blocks
 * that can be purchased/downloaded together or individually.
 */

import type { LucideIcon } from "lucide-react"
import {
  Bot,
  FormInput,
  LayoutDashboard,
  Megaphone,
  ShoppingCart,
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
  /** Is this a premium category? */
  isPremium?: boolean
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
    isPremium: true,
  },
  {
    slug: "dashboard",
    name: "Dashboard",
    description: "Analytics, charts, metrics, admin panels",
    icon: LayoutDashboard,
    count: 0,
    isPremium: true,
  },
  {
    slug: "marketing",
    name: "Marketing",
    description: "Promo banners, CTAs, pricing tables",
    icon: Megaphone,
    count: 0,
    isPremium: true,
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    description: "Product cards, carts, checkout flows",
    icon: ShoppingCart,
    count: 0,
    isPremium: true,
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
 * Get premium categories
 */
export function getPremiumCategories(): BlockCategory[] {
  return BLOCK_CATEGORIES.filter((c) => c.isPremium)
}
