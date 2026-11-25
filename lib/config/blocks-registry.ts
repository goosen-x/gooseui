/**
 * Block registry configuration for GooseUI Blocks
 *
 * Each block represents an individual UI pattern/component
 * that can be installed via the shadcn CLI.
 */

import type { Localized } from "@/i18n/dict"

export const BLOCKS_REGISTRY_BASE_URL = "https://gooseui.pro/r/blocks"

export interface BlockItem {
  /** URL slug (e.g., "wallet-connect", "nft-card") */
  slug: string
  /** Display name */
  name: string
  /** Short description */
  description: Localized
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
  /** Id of the live block in `lib/blocks` (preview and code on the block page) */
  blockId?: string
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
    description: {
      en: "Button with dropdown to connect crypto wallets (MetaMask, Coinbase, Trust)",
      ru: "Кнопка с выпадающим списком для подключения крипто-кошельков (MetaMask, Coinbase, Trust)",
    },
    category: "web3",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "wallet-select-card",
    name: "Wallet Select Card",
    description: {
      en: "Card with wallet selection, search, and connect button",
      ru: "Карточка с выбором кошелька, поиском и кнопкой подключения",
    },
    category: "web3",
    isComingSoon: true,
  },
  {
    slug: "address-display",
    name: "Address Display",
    description: {
      en: "Truncated address display with copy to clipboard",
      ru: "Сокращённый адрес с копированием в буфер обмена",
    },
    category: "web3",
    isComingSoon: true,
  },
  {
    slug: "nft-card",
    name: "NFT Card",
    description: {
      en: "Card displaying NFT with image, title, price, and buy button",
      ru: "Карточка NFT с изображением, названием, ценой и кнопкой покупки",
    },
    category: "web3",
    isComingSoon: true,
  },
  {
    slug: "token-balance",
    name: "Token Balance",
    description: {
      en: "Display token balance with icon and value",
      ru: "Баланс токена с иконкой и значением",
    },
    category: "web3",
    isComingSoon: true,
  },
  {
    slug: "tap-coin",
    name: "Tap Coin",
    description: {
      en: "Tap-to-earn screen: 3D coin that tilts toward the tap, balance and energy",
      ru: "Экран tap-to-earn: 3D-монета наклоняется к тапу, баланс и энергия",
    },
    category: "web3",
    isNew: true,
    blockId: "web3-04",
  },
  {
    slug: "network-switcher",
    name: "Network Switcher",
    description: {
      en: "Dropdown to switch between blockchain networks",
      ru: "Выпадающий список для переключения между блокчейн-сетями",
    },
    category: "web3",
    isComingSoon: true,
  },

  // Dashboard blocks
  {
    slug: "stats-card",
    name: "Stats Card",
    description: {
      en: "Card with metric value, change percentage, and sparkline chart",
      ru: "Карточка со значением метрики, процентом изменения и спарклайном",
    },
    category: "dashboard",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "price-card",
    name: "Price Card",
    description: {
      en: "Current price display with chart and period selector",
      ru: "Текущая цена с графиком и выбором периода",
    },
    category: "dashboard",
    isComingSoon: true,
  },
  {
    slug: "staking-card",
    name: "Staking Card",
    description: {
      en: "Staking metrics with APR and user count",
      ru: "Метрики стейкинга: APR и число пользователей",
    },
    category: "dashboard",
    isComingSoon: true,
  },
  {
    slug: "wallet-stats-card",
    name: "Wallet Stats Card",
    description: {
      en: "Compact wallet card with balance and change",
      ru: "Компактная карточка кошелька с балансом и изменением",
    },
    category: "dashboard",
    isComingSoon: true,
  },

  // Marketing blocks
  {
    slug: "promo-banner",
    name: "Promo Banner",
    description: {
      en: "Popup banner for promotions with countdown and marquee",
      ru: "Всплывающий промо-баннер с обратным отсчётом и бегущей строкой",
    },
    category: "marketing",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "announcement-bar",
    name: "Announcement Bar",
    description: {
      en: "Top bar for site-wide announcements",
      ru: "Верхняя панель для объявлений на всём сайте",
    },
    category: "marketing",
    isComingSoon: true,
  },
  {
    slug: "price-tag",
    name: "Price Tag",
    description: {
      en: "Price display with original price strikethrough",
      ru: "Цена с зачёркнутой старой ценой",
    },
    category: "marketing",
    isComingSoon: true,
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    description: {
      en: "Countdown to a specific date/time",
      ru: "Обратный отсчёт до заданной даты и времени",
    },
    category: "marketing",
    isComingSoon: true,
  },
  {
    slug: "marquee-banner",
    name: "Marquee Banner",
    description: {
      en: "Scrolling text banner for urgency messaging",
      ru: "Баннер с бегущей строкой для сообщений о срочности",
    },
    category: "marketing",
    isComingSoon: true,
  },
  {
    slug: "pricing-table",
    name: "Pricing Table",
    description: {
      en: "Plan cards with a monthly/yearly switch on radio inputs, no JavaScript",
      ru: "Карточки тарифов с переключателем «месяц/год» на радиокнопках, без JavaScript",
    },
    category: "marketing",
    isNew: true,
    blockId: "marketing-02",
  },

  // E-commerce blocks
  {
    slug: "product-card",
    name: "Product Card",
    description: {
      en: "Product display with image, title, price, and actions",
      ru: "Карточка товара с изображением, названием, ценой и действиями",
    },
    category: "e-commerce",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "cart-item",
    name: "Cart Item",
    description: {
      en: "Shopping cart item with quantity controls",
      ru: "Товар в корзине с управлением количеством",
    },
    category: "e-commerce",
    isComingSoon: true,
  },
  {
    slug: "checkout-summary",
    name: "Checkout Summary",
    description: {
      en: "Order summary with totals and checkout button",
      ru: "Сводка заказа с итогами и кнопкой оформления",
    },
    category: "e-commerce",
    isComingSoon: true,
  },
  {
    slug: "pricing-card",
    name: "Pricing Card",
    description: {
      en: "Pricing tier card with features list and CTA",
      ru: "Карточка тарифа со списком возможностей и CTA",
    },
    category: "e-commerce",
    isComingSoon: true,
  },

  // Headers blocks (10)
  {
    slug: "header-simple",
    name: "Simple Header",
    description: {
      en: "Minimal header with logo and navigation links",
      ru: "Минималистичный хедер с логотипом и навигацией",
    },
    category: "headers",
    isFeatured: true,
    isNew: true,
  },
  {
    slug: "header-with-cta",
    name: "Header with CTA",
    description: {
      en: "Navigation with prominent call-to-action button",
      ru: "Навигация с заметной кнопкой призыва к действию",
    },
    category: "headers",
  },
  {
    slug: "header-dropdown",
    name: "Header with Dropdown",
    description: {
      en: "Navigation with dropdown menus for nested links",
      ru: "Навигация с выпадающими меню для вложенных ссылок",
    },
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-mega-menu",
    name: "Mega Menu Header",
    description: {
      en: "Header with full-width mega menu dropdowns",
      ru: "Хедер с мега-меню на всю ширину",
    },
    category: "headers",
    isNew: true,
    blockId: "header-05",
  },
  {
    slug: "header-morphing",
    name: "Morphing Header",
    description: {
      en: "Sticky header that shrinks on scroll with scroll-driven animations, no JavaScript",
      ru: "Липкий хедер, который сжимается при прокрутке на scroll-driven анимациях, без JavaScript",
    },
    category: "headers",
    isNew: true,
    blockId: "header-11",
  },
  {
    slug: "header-search",
    name: "Header with Search",
    description: {
      en: "Navigation with integrated search input",
      ru: "Навигация со встроенным полем поиска",
    },
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-transparent",
    name: "Transparent Header",
    description: {
      en: "Overlay header for hero sections and landing pages",
      ru: "Прозрачный хедер поверх hero-секций и лендингов",
    },
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-sticky",
    name: "Sticky Header",
    description: {
      en: "Fixed header that stays on scroll with shrink effect",
      ru: "Фиксированный хедер, который остаётся при скролле и уменьшается",
    },
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-auth",
    name: "Header with Auth",
    description: {
      en: "Navigation with login/signup buttons and user menu",
      ru: "Навигация с кнопками входа и регистрации и меню пользователя",
    },
    category: "headers",
    isNew: true,
  },
  {
    slug: "header-mobile",
    name: "Mobile Header",
    description: {
      en: "Responsive header with hamburger menu and drawer",
      ru: "Адаптивный хедер с бургер-меню и боковой панелью",
    },
    category: "headers",
    isComingSoon: true,
  },
  {
    slug: "header-notification",
    name: "Header with Notifications",
    description: {
      en: "Navigation with notification bell and dropdown",
      ru: "Навигация с иконкой уведомлений и выпадающим списком",
    },
    category: "headers",
    isComingSoon: true,
  },

  // Footers blocks (8)
  {
    slug: "footer-simple",
    name: "Simple Footer",
    description: {
      en: "Minimal footer with logo, links, and copyright",
      ru: "Минималистичный футер с логотипом, ссылками и копирайтом",
    },
    category: "footers",
    isFeatured: true,
    isNew: true,
  },
  {
    slug: "footer-columns",
    name: "Multi-Column Footer",
    description: {
      en: "Footer with multiple link columns and sections",
      ru: "Футер с несколькими колонками ссылок и разделами",
    },
    category: "footers",
    isNew: true,
  },
  {
    slug: "footer-newsletter",
    name: "Footer with Newsletter",
    description: {
      en: "Footer with email subscription form",
      ru: "Футер с формой подписки по email",
    },
    category: "footers",
  },
  {
    slug: "footer-social",
    name: "Footer with Social",
    description: {
      en: "Footer focused on social media links and icons",
      ru: "Футер со ссылками и иконками соцсетей",
    },
    category: "footers",
    isComingSoon: true,
  },
  {
    slug: "footer-centered",
    name: "Centered Footer",
    description: {
      en: "Compact centered footer with minimal links",
      ru: "Компактный футер по центру с минимумом ссылок",
    },
    category: "footers",
    isComingSoon: true,
  },
  {
    slug: "footer-contact",
    name: "Footer with Contact",
    description: {
      en: "Footer with contact information and form",
      ru: "Футер с контактами и формой связи",
    },
    category: "footers",
    isComingSoon: true,
  },
  {
    slug: "footer-app-links",
    name: "Footer with App Links",
    description: {
      en: "Footer with app store download buttons",
      ru: "Футер с кнопками загрузки из магазинов приложений",
    },
    category: "footers",
    isComingSoon: true,
  },
  {
    slug: "footer-full",
    name: "Full Footer",
    description: {
      en: "Complete footer with all sections: links, newsletter, social, legal",
      ru: "Полный футер со всеми разделами: ссылки, рассылка, соцсети, юридическая информация",
    },
    category: "footers",
    isComingSoon: true,
  },

  // Features blocks
  {
    slug: "features-grid",
    name: "Features Grid",
    description: {
      en: "Six-column grid showcasing product features with icons",
      ru: "Сетка из шести колонок с иконками для показа возможностей продукта",
    },
    category: "features",
    isFeatured: true,
    isNew: true,
  },

  // Hero sections blocks (10)
  {
    slug: "hero-simple",
    name: "Simple Hero",
    description: {
      en: "Centered hero with headline, description, and CTA buttons",
      ru: "Hero по центру с заголовком, описанием и CTA-кнопками",
    },
    category: "hero",
    isFeatured: true,
    isComingSoon: true,
  },
  {
    slug: "hero-with-image",
    name: "Hero with Image",
    description: {
      en: "Hero section with side image or illustration",
      ru: "Hero-секция с изображением или иллюстрацией сбоку",
    },
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-split",
    name: "Split Hero",
    description: {
      en: "Two-column hero with content and visual",
      ru: "Hero в две колонки: контент и визуал",
    },
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-video",
    name: "Hero with Video",
    description: {
      en: "Hero with background or embedded video",
      ru: "Hero с фоновым или встроенным видео",
    },
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-with-form",
    name: "Hero with Form",
    description: {
      en: "Hero with integrated signup or contact form",
      ru: "Hero со встроенной формой регистрации или обратной связи",
    },
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-stats",
    name: "Hero with Stats",
    description: {
      en: "Hero showcasing key metrics and numbers",
      ru: "Hero с ключевыми метриками и цифрами",
    },
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-features",
    name: "Hero with Features",
    description: {
      en: "Hero with feature highlights and icons",
      ru: "Hero с выделенными возможностями и иконками",
    },
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-gradient",
    name: "Gradient Hero",
    description: {
      en: "Hero with animated gradient background",
      ru: "Hero с анимированным градиентным фоном",
    },
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-animated",
    name: "Animated Hero",
    description: {
      en: "Hero with text animations and motion effects",
      ru: "Hero с анимацией текста и эффектами движения",
    },
    category: "hero",
    isComingSoon: true,
  },
  {
    slug: "hero-logo-cloud",
    name: "Hero with Logo Cloud",
    description: {
      en: "Hero with partner/client logos below CTA",
      ru: "Hero с логотипами партнёров и клиентов под CTA",
    },
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
