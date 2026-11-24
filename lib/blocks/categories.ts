/**
 * Block categories configuration for GooseUI Blocks
 *
 * Categories are used to organize blocks and provide
 * navigation in the documentation.
 */

import {
  Bell,
  Bot,
  Briefcase,
  Building2,
  CircleHelp,
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
    name: { en: "Headers", ru: "Хедеры" },
    description: {
      en: "Navigation bars, mega menus, sticky headers",
      ru: "Навигационные панели, мега-меню, залипающие хедеры",
    },
    icon: PanelTop,
  },
  {
    id: "footers",
    name: { en: "Footers", ru: "Футеры" },
    description: {
      en: "Site footers, newsletter, social links",
      ru: "Футеры сайта, рассылка, ссылки на соцсети",
    },
    icon: PanelBottom,
  },
  {
    id: "hero",
    name: { en: "Hero Sections", ru: "Hero-секции" },
    description: {
      en: "Landing heroes, split layouts, with video/images",
      ru: "Hero для лендингов, раскладки в две колонки, с видео и изображениями",
    },
    icon: Rocket,
  },
  {
    id: "brands",
    name: { en: "Brands", ru: "Бренды" },
    description: {
      en: "Partner logos, client carousels, trust badges",
      ru: "Логотипы партнёров, карусели клиентов, знаки доверия",
    },
    icon: Building2,
  },
  {
    id: "services",
    name: { en: "Services", ru: "Услуги" },
    description: {
      en: "Feature cards, service grids, offerings showcase",
      ru: "Карточки возможностей, сетки услуг, витрина предложений",
    },
    icon: Briefcase,
  },
  {
    id: "faq",
    name: { en: "FAQ", ru: "FAQ" },
    description: {
      en: "Accordion FAQ sections, Q&A blocks",
      ru: "FAQ-аккордеоны, блоки вопросов и ответов",
    },
    icon: CircleHelp,
  },
  {
    id: "stats",
    name: { en: "Stats", ru: "Статистика" },
    description: {
      en: "Metrics, charts, progress indicators",
      ru: "Метрики, графики, индикаторы прогресса",
    },
    icon: TrendingUp,
    hasCharts: true,
  },
  {
    id: "login",
    name: { en: "Login", ru: "Вход" },
    description: {
      en: "Login forms, OAuth, two-factor auth",
      ru: "Формы входа, OAuth, двухфакторная аутентификация",
    },
    icon: LogIn,
  },
  {
    id: "dashboard",
    name: { en: "Dashboard", ru: "Дашборд" },
    description: {
      en: "Analytics, charts, metrics, admin panels",
      ru: "Аналитика, графики, метрики, админ-панели",
    },
    icon: LayoutDashboard,
    hasCharts: true,
  },
  {
    id: "web3",
    name: { en: "Web3", ru: "Web3" },
    description: {
      en: "Wallet connections, NFT cards, token dashboards",
      ru: "Подключение кошельков, NFT-карточки, дашборды токенов",
    },
    icon: Wallet,
  },
  {
    id: "marketing",
    name: { en: "Marketing", ru: "Маркетинг" },
    description: {
      en: "Promo banners, CTAs, pricing tables",
      ru: "Промо-баннеры, CTA, таблицы тарифов",
    },
    icon: Megaphone,
  },
  {
    id: "e-commerce",
    name: { en: "E-commerce", ru: "E-commerce" },
    description: {
      en: "Product cards, carts, checkout flows",
      ru: "Карточки товаров, корзины, оформление заказа",
    },
    icon: ShoppingCart,
  },
  {
    id: "forms",
    name: { en: "Forms", ru: "Формы" },
    description: {
      en: "Contact, sign-up, multi-step forms",
      ru: "Контактные, регистрационные и многошаговые формы",
    },
    icon: FormInput,
    isComingSoon: true,
  },
  {
    id: "ai",
    name: { en: "AI", ru: "AI" },
    description: {
      en: "Chat interfaces, prompts, AI workflows",
      ru: "Чат-интерфейсы, промпты, AI-воркфлоу",
    },
    icon: Bot,
    isComingSoon: true,
  },
  {
    id: "authentication",
    name: { en: "Authentication", ru: "Аутентификация" },
    description: {
      en: "Login, sign-up, password reset forms",
      ru: "Формы входа, регистрации и сброса пароля",
    },
    icon: KeyRound,
    isComingSoon: true,
  },
  {
    id: "data-display",
    name: { en: "Data Display", ru: "Отображение данных" },
    description: {
      en: "Tables, lists, grids, cards",
      ru: "Таблицы, списки, сетки, карточки",
    },
    icon: TableProperties,
    isComingSoon: true,
  },
  {
    id: "feedback",
    name: { en: "Feedback", ru: "Обратная связь" },
    description: {
      en: "Alerts, notifications, modals, toasts",
      ru: "Алерты, уведомления, модалки, тосты",
    },
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
    a.name.en.localeCompare(b.name.en),
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
