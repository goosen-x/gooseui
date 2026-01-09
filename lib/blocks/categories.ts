/**
 * Block categories configuration for GooseUI Blocks
 *
 * Categories are used to organize blocks and provide
 * navigation in the documentation.
 */

import {
  Bell,
  Bot,
  Building2,
  Briefcase,
  FormInput,
  KeyRound,
  LayoutDashboard,
  LogIn,
  Megaphone,
  PanelBottom,
  PanelTop,
  Rocket,
  ShoppingCart,
  TableProperties,
  TrendingUp,
  Wallet,
} from "lucide-react"
import type { CategoryMetadata } from "./declarations"
import {
  countAvailableBlocksInCategory,
  countBlocksInCategory,
  isDevelopment,
} from "./metadata"

/**
 * All block categories
 */
export const blocksCategoriesMetadata: CategoryMetadata[] = [
  {
    id: "headers",
    name: "Headers",
    description: "Navigation bars, mega menus, sticky headers",
    icon: PanelTop,
  },
  {
    id: "footers",
    name: "Footers",
    description: "Site footers, newsletter, social links",
    icon: PanelBottom,
  },
  {
    id: "hero",
    name: "Hero Sections",
    description: "Landing heroes, split layouts, with video/images",
    icon: Rocket,
  },
  {
    id: "brands",
    name: "Brands",
    description: "Partner logos, client carousels, trust badges",
    icon: Building2,
  },
  {
    id: "services",
    name: "Services",
    description: "Feature cards, service grids, offerings showcase",
    icon: Briefcase,
  },
  {
    id: "stats",
    name: "Stats",
    description: "Metrics, charts, progress indicators",
    icon: TrendingUp,
    hasCharts: true,
  },
  {
    id: "login",
    name: "Login",
    description: "Login forms, OAuth, two-factor auth",
    icon: LogIn,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Analytics, charts, metrics, admin panels",
    icon: LayoutDashboard,
    hasCharts: true,
  },
  {
    id: "web3",
    name: "Web3",
    description: "Wallet connections, NFT cards, token dashboards",
    icon: Wallet,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Promo banners, CTAs, pricing tables",
    icon: Megaphone,
  },
  {
    id: "e-commerce",
    name: "E-commerce",
    description: "Product cards, carts, checkout flows",
    icon: ShoppingCart,
  },
  {
    id: "forms",
    name: "Forms",
    description: "Contact, sign-up, multi-step forms",
    icon: FormInput,
    isComingSoon: true,
  },
  {
    id: "ai",
    name: "AI",
    description: "Chat interfaces, prompts, AI workflows",
    icon: Bot,
    isComingSoon: true,
  },
  {
    id: "authentication",
    name: "Authentication",
    description: "Login, sign-up, password reset forms",
    icon: KeyRound,
    isComingSoon: true,
  },
  {
    id: "data-display",
    name: "Data Display",
    description: "Tables, lists, grids, cards",
    icon: TableProperties,
    isComingSoon: true,
  },
  {
    id: "feedback",
    name: "Feedback",
    description: "Alerts, notifications, modals, toasts",
    icon: Bell,
    isComingSoon: true,
  },
]

/**
 * Get category by ID
 */
export function getCategoryById(id: string): CategoryMetadata | undefined {
  return blocksCategoriesMetadata.find((c) => c.id === id)
}

/**
 * Get all categories sorted alphabetically
 */
export function getAllCategories(): CategoryMetadata[] {
  return [...blocksCategoriesMetadata].sort((a, b) =>
    a.name.localeCompare(b.name),
  )
}

/**
 * Get categories with block counts
 */
export function getCategoriesWithCounts(): (CategoryMetadata & {
  count: number
})[] {
  return blocksCategoriesMetadata.map((category) => ({
    ...category,
    count: isDevelopment()
      ? countBlocksInCategory(category.id)
      : countAvailableBlocksInCategory(category.id),
  }))
}

/**
 * Get categories for display (respects dev/prod mode)
 * In production: only shows categories with available blocks
 * In development: shows all categories
 */
export function getDisplayCategories(): (CategoryMetadata & {
  count: number
})[] {
  const categoriesWithCounts = getCategoriesWithCounts()

  if (isDevelopment()) {
    return categoriesWithCounts
  }

  // In production, only show categories with available blocks
  return categoriesWithCounts.filter((c) => {
    if (c.isComingSoon) return false
    return c.count > 0
  })
}

/**
 * Get available categories (not coming soon and have blocks)
 */
export function getAvailableCategories(): CategoryMetadata[] {
  return blocksCategoriesMetadata.filter((c) => {
    if (c.isComingSoon) return false
    return countAvailableBlocksInCategory(c.id) > 0
  })
}
