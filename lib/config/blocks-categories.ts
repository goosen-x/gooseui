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
  Grid3X3,
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
import type { Localized } from "@/i18n/dict"

export interface BlockCategory {
  /** URL slug (e.g., "web3", "marketing") */
  slug: string
  /** Display name */
  name: Localized
  /** Short description */
  description: Localized
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
    name: { en: "Web3", ru: "Web3" },
    description: {
      en: "Wallet connections, NFT cards, token dashboards",
      ru: "Подключение кошельков, NFT-карточки, дашборды токенов",
    },
    icon: Wallet,
    count: 0,
  },
  {
    slug: "dashboard",
    name: { en: "Dashboard", ru: "Дашборд" },
    description: {
      en: "Analytics, charts, metrics, admin panels",
      ru: "Аналитика, графики, метрики, админ-панели",
    },
    icon: LayoutDashboard,
    count: 0,
  },
  {
    slug: "marketing",
    name: { en: "Marketing", ru: "Маркетинг" },
    description: {
      en: "Promo banners, CTAs, pricing tables",
      ru: "Промо-баннеры, CTA, таблицы тарифов",
    },
    icon: Megaphone,
    count: 0,
  },
  {
    slug: "e-commerce",
    name: { en: "E-commerce", ru: "E-commerce" },
    description: {
      en: "Product cards, carts, checkout flows",
      ru: "Карточки товаров, корзины, оформление заказа",
    },
    icon: ShoppingCart,
    count: 0,
  },
  {
    slug: "forms",
    name: { en: "Forms", ru: "Формы" },
    description: {
      en: "Contact, sign-up, multi-step forms",
      ru: "Контактные, регистрационные и многошаговые формы",
    },
    icon: FormInput,
    count: 0,
    isComingSoon: true,
  },
  {
    slug: "ai",
    name: { en: "AI", ru: "AI" },
    description: {
      en: "Chat interfaces, prompts, AI workflows",
      ru: "Чат-интерфейсы, промпты, AI-сценарии",
    },
    icon: Bot,
    count: 0,
    isComingSoon: true,
  },
  {
    slug: "authentication",
    name: { en: "Authentication", ru: "Авторизация" },
    description: {
      en: "Login, sign-up, password reset forms",
      ru: "Формы входа, регистрации и сброса пароля",
    },
    icon: KeyRound,
    count: 0,
    isComingSoon: true,
  },
  {
    slug: "headers",
    name: { en: "Headers", ru: "Хедеры" },
    description: {
      en: "Navigation bars, mega menus, sticky headers",
      ru: "Навбары, мегаменю, липкие хедеры",
    },
    icon: PanelTop,
    count: 0,
  },
  {
    slug: "footers",
    name: { en: "Footers", ru: "Футеры" },
    description: {
      en: "Site footers, newsletter, social links",
      ru: "Футеры сайта, рассылка, ссылки на соцсети",
    },
    icon: PanelBottom,
    count: 0,
  },
  {
    slug: "hero",
    name: { en: "Hero Sections", ru: "Hero-секции" },
    description: {
      en: "Landing heroes, split layouts, with video/images",
      ru: "Хиро для лендингов, сплит-раскладки, с видео и картинками",
    },
    icon: Rocket,
    count: 0,
  },
  {
    slug: "features",
    name: { en: "Features", ru: "Возможности" },
    description: {
      en: "Feature grids, benefit sections, highlights",
      ru: "Сетки возможностей, блоки преимуществ, акценты",
    },
    icon: Grid3X3,
    count: 0,
  },
  {
    slug: "data-display",
    name: { en: "Data Display", ru: "Отображение данных" },
    description: {
      en: "Tables, lists, grids, cards",
      ru: "Таблицы, списки, сетки, карточки",
    },
    icon: TableProperties,
    count: 0,
    isComingSoon: true,
  },
  {
    slug: "feedback",
    name: { en: "Feedback", ru: "Обратная связь" },
    description: {
      en: "Alerts, notifications, modals, toasts",
      ru: "Алерты, уведомления, модалки, тосты",
    },
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
  countAvailableBlocks: (category: string) => number,
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
