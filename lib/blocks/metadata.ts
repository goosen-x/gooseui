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
    description: {
      en: "Minimal header with logo and navigation links",
      ru: "Минималистичный хедер с логотипом и навигацией",
    },
    type: "file",
    iframeHeight: 80,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "header-02",
    category: "headers",
    name: "Header with CTA",
    description: {
      en: "Navigation with prominent call-to-action button",
      ru: "Навигация с заметной кнопкой призыва к действию",
    },
    type: "file",
    iframeHeight: 80,
    isNew: true,
  },
  {
    id: "header-03",
    category: "headers",
    name: "Header with Auth",
    description: {
      en: "Navigation with login/signup buttons and user menu",
      ru: "Навигация с кнопками входа и регистрации и меню пользователя",
    },
    type: "file",
    iframeHeight: 80,
    isNew: true,
  },
  {
    id: "header-04",
    category: "headers",
    name: "Header with Dropdown",
    description: {
      en: "Navigation with dropdown menus for nested links",
      ru: "Навигация с выпадающими меню для вложенных ссылок",
    },
    type: "file",
    iframeHeight: 80,
    isComingSoon: true,
  },
  {
    id: "header-05",
    category: "headers",
    name: "Mega Menu Header",
    description: {
      en: "Header with full-width mega menu dropdowns",
      ru: "Хедер с мега-меню на всю ширину",
    },
    type: "file",
    iframeHeight: 440,
    isNew: true,
    dependencies: ["@gooseui/mega-menu", "@gooseui/button"],
  },
  {
    id: "header-11",
    category: "headers",
    name: "Morphing Header",
    description: {
      en: "Sticky header that shrinks on scroll with scroll-driven animations, no JavaScript",
      ru: "Липкий хедер, который сжимается при прокрутке на scroll-driven анимациях, без JavaScript",
    },
    type: "file",
    iframeHeight: 420,
    isNew: true,
    dependencies: ["@gooseui/morphing-header", "@gooseui/button"],
  },
  {
    id: "header-06",
    category: "headers",
    name: "Header with Search",
    description: {
      en: "Navigation with integrated search input",
      ru: "Навигация со встроенным полем поиска",
    },
    type: "file",
    iframeHeight: 80,
    isComingSoon: true,
  },
  {
    id: "header-07",
    category: "headers",
    name: "Transparent Header",
    description: {
      en: "Overlay header for hero sections and landing pages",
      ru: "Прозрачный хедер поверх hero-секций и лендингов",
    },
    type: "file",
    iframeHeight: 400,
    isComingSoon: true,
  },
  {
    id: "header-08",
    category: "headers",
    name: "Sticky Header",
    description: {
      en: "Fixed header that stays on scroll with shrink effect",
      ru: "Фиксированный хедер, который остаётся при скролле и уменьшается",
    },
    type: "file",
    iframeHeight: 200,
    isComingSoon: true,
  },
  {
    id: "header-09",
    category: "headers",
    name: "Mobile Header",
    description: {
      en: "Responsive header with hamburger menu and drawer",
      ru: "Адаптивный хедер с бургер-меню и боковой панелью",
    },
    type: "file",
    iframeHeight: 80,
    isComingSoon: true,
  },
  {
    id: "header-10",
    category: "headers",
    name: "Header with Notifications",
    description: {
      en: "Navigation with notification bell and dropdown",
      ru: "Навигация с иконкой уведомлений и выпадающим списком",
    },
    type: "file",
    iframeHeight: 80,
    isComingSoon: true,
  },

  // ===== FOOTERS =====
  {
    id: "footer-01",
    category: "footers",
    name: "Simple Footer",
    description: {
      en: "Minimal footer with logo, links, and copyright",
      ru: "Минималистичный футер с логотипом, ссылками и копирайтом",
    },
    type: "file",
    iframeHeight: 100,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "footer-02",
    category: "footers",
    name: "Multi-Column Footer",
    description: {
      en: "Footer with multiple link columns and sections",
      ru: "Футер с несколькими колонками ссылок и разделами",
    },
    type: "file",
    iframeHeight: 400,
    isNew: true,
  },
  {
    id: "footer-03",
    category: "footers",
    name: "Footer with Newsletter",
    description: {
      en: "Footer with email subscription form",
      ru: "Футер с формой подписки по email",
    },
    type: "file",
    iframeHeight: 350,
    isNew: true,
  },
  {
    id: "footer-04",
    category: "footers",
    name: "Footer with Social",
    description: {
      en: "Footer focused on social media links and icons",
      ru: "Футер со ссылками и иконками соцсетей",
    },
    type: "file",
    iframeHeight: 200,
    isComingSoon: true,
  },
  {
    id: "footer-05",
    category: "footers",
    name: "Centered Footer",
    description: {
      en: "Compact centered footer with minimal links",
      ru: "Компактный футер по центру с минимумом ссылок",
    },
    type: "file",
    iframeHeight: 150,
    isComingSoon: true,
  },
  {
    id: "footer-06",
    category: "footers",
    name: "Footer with Contact",
    description: {
      en: "Footer with contact information and form",
      ru: "Футер с контактами и формой связи",
    },
    type: "file",
    iframeHeight: 400,
    isComingSoon: true,
  },
  {
    id: "footer-07",
    category: "footers",
    name: "Footer with App Links",
    description: {
      en: "Footer with app store download buttons",
      ru: "Футер с кнопками загрузки из магазинов приложений",
    },
    type: "file",
    iframeHeight: 250,
    isComingSoon: true,
  },
  {
    id: "footer-08",
    category: "footers",
    name: "Full Footer",
    description: {
      en: "Complete footer with all sections: links, newsletter, social, legal",
      ru: "Полный футер со всеми разделами: ссылки, рассылка, соцсети, юридическая информация",
    },
    type: "file",
    iframeHeight: 500,
    isComingSoon: true,
  },

  // ===== HERO SECTIONS =====
  {
    id: "hero-01",
    category: "hero",
    name: "Classic Hero",
    description: {
      en: "Hero with headline, CTA buttons, and side image placeholder",
      ru: "Hero с заголовком, CTA-кнопками и местом под изображение сбоку",
    },
    type: "file",
    iframeHeight: 650,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "hero-02",
    category: "hero",
    name: "Split Hero",
    description: {
      en: "Full-height split hero with content and browser mockup",
      ru: "Hero на всю высоту в две колонки: контент и макет браузера",
    },
    type: "file",
    iframeHeight: 700,
    isNew: true,
  },
  {
    id: "hero-03",
    category: "hero",
    name: "Centered Hero",
    description: {
      en: "Centered hero with headline, description, and CTA buttons",
      ru: "Hero по центру с заголовком, описанием и CTA-кнопками",
    },
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-04",
    category: "hero",
    name: "Hero with Video",
    description: {
      en: "Hero with background or embedded video",
      ru: "Hero с фоновым или встроенным видео",
    },
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-05",
    category: "hero",
    name: "Hero with Form",
    description: {
      en: "Hero with integrated signup or contact form",
      ru: "Hero со встроенной формой регистрации или обратной связи",
    },
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-06",
    category: "hero",
    name: "Hero with Stats",
    description: {
      en: "Hero showcasing key metrics and numbers",
      ru: "Hero с ключевыми метриками и цифрами",
    },
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-07",
    category: "hero",
    name: "Hero with Features",
    description: {
      en: "Hero with feature highlights and icons",
      ru: "Hero с выделенными возможностями и иконками",
    },
    type: "file",
    iframeHeight: 700,
    isComingSoon: true,
  },
  {
    id: "hero-08",
    category: "hero",
    name: "Gradient Hero",
    description: {
      en: "Hero with animated gradient background",
      ru: "Hero с анимированным градиентным фоном",
    },
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-09",
    category: "hero",
    name: "Animated Hero",
    description: {
      en: "Hero with text animations and motion effects",
      ru: "Hero с анимацией текста и эффектами движения",
    },
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "hero-10",
    category: "hero",
    name: "Hero with Logo Cloud",
    description: {
      en: "Hero with partner/client logos below CTA",
      ru: "Hero с логотипами партнёров и клиентов под CTA",
    },
    type: "file",
    iframeHeight: 700,
    isComingSoon: true,
  },

  // ===== STATS =====
  {
    id: "stats-01",
    category: "stats",
    name: "Stats Card",
    description: {
      en: "Card with metric value, change percentage, and sparkline chart",
      ru: "Карточка со значением метрики, процентом изменения и спарклайном",
    },
    type: "file",
    iframeHeight: 200,
    isFeatured: true,
    isComingSoon: true,
  },
  {
    id: "stats-02",
    category: "stats",
    name: "Stats Grid",
    description: {
      en: "Grid of multiple stat cards with icons",
      ru: "Сетка из нескольких карточек статистики с иконками",
    },
    type: "file",
    iframeHeight: 300,
    isComingSoon: true,
  },
  {
    id: "stats-03",
    category: "stats",
    name: "Progress Stats",
    description: {
      en: "Stats with progress bars and percentages",
      ru: "Статистика с прогресс-барами и процентами",
    },
    type: "file",
    iframeHeight: 250,
    isComingSoon: true,
  },

  // ===== LOGIN =====
  {
    id: "login-01",
    category: "login",
    name: "Simple Login",
    description: {
      en: "Basic login form with email and password",
      ru: "Простая форма входа по email и паролю",
    },
    type: "file",
    iframeHeight: 500,
    isFeatured: true,
    isComingSoon: true,
  },
  {
    id: "login-02",
    category: "login",
    name: "Login with Social",
    description: {
      en: "Login form with social OAuth buttons",
      ru: "Форма входа с кнопками OAuth через соцсети",
    },
    type: "file",
    iframeHeight: 600,
    isComingSoon: true,
  },
  {
    id: "login-03",
    category: "login",
    name: "Login with Image",
    description: {
      en: "Split login with side image",
      ru: "Форма входа в две колонки с изображением сбоку",
    },
    type: "file",
    iframeHeight: 700,
    isComingSoon: true,
  },

  // ===== WEB3 =====
  {
    id: "web3-01",
    category: "web3",
    name: "Wallet Connect",
    description: {
      en: "Button with dropdown to connect crypto wallets",
      ru: "Кнопка с выпадающим списком для подключения крипто-кошельков",
    },
    type: "file",
    iframeHeight: 400,
    isFeatured: true,
    isComingSoon: true,
  },
  {
    id: "web3-02",
    category: "web3",
    name: "NFT Card",
    description: {
      en: "Card displaying NFT with image, title, price",
      ru: "Карточка NFT с изображением, названием и ценой",
    },
    type: "file",
    iframeHeight: 400,
    isComingSoon: true,
  },
  {
    id: "web3-03",
    category: "web3",
    name: "Token Balance",
    description: {
      en: "Display token balance with icon and value",
      ru: "Баланс токена с иконкой и значением",
    },
    type: "file",
    iframeHeight: 100,
    isComingSoon: true,
  },
  {
    id: "web3-04",
    category: "web3",
    name: "Tap Coin",
    description: {
      en: "Tap-to-earn screen: 3D coin that tilts toward the tap, balance and energy",
      ru: "Экран tap-to-earn: 3D-монета наклоняется к тапу, баланс и энергия",
    },
    type: "file",
    iframeHeight: 560,
    isNew: true,
    dependencies: ["@gooseui/button", "@gooseui/sliding-number"],
  },

  // ===== DASHBOARD =====
  {
    id: "dashboard-01",
    category: "dashboard",
    name: "Price Card",
    description: {
      en: "Current price display with chart and period selector",
      ru: "Текущая цена с графиком и выбором периода",
    },
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
    description: {
      en: "Popup banner for promotions with countdown",
      ru: "Всплывающий промо-баннер с обратным отсчётом",
    },
    type: "file",
    iframeHeight: 300,
    isFeatured: true,
    isComingSoon: true,
  },
  {
    id: "marketing-02",
    category: "marketing",
    name: "Pricing Table",
    description: {
      en: "Plan cards with a monthly/yearly switch on radio inputs, no JavaScript",
      ru: "Карточки тарифов с переключателем «месяц/год» на радиокнопках, без JavaScript",
    },
    type: "file",
    iframeHeight: 640,
    isNew: true,
  },

  // ===== E-COMMERCE =====
  {
    id: "ecommerce-01",
    category: "e-commerce",
    name: "Product Card",
    description: {
      en: "Product display with image, title, price, and actions",
      ru: "Карточка товара с изображением, названием, ценой и действиями",
    },
    type: "file",
    iframeHeight: 400,
    isFeatured: true,
    isComingSoon: true,
  },

  // ===== BRANDS/LOGOS =====
  {
    id: "brands-01",
    category: "brands",
    name: "Brands Carousel",
    description: {
      en: "Infinite marquee of partner/client logos",
      ru: "Бесконечная бегущая строка с логотипами партнёров и клиентов",
    },
    type: "file",
    iframeHeight: 180,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "brands-02",
    category: "brands",
    name: "Brands Double Row",
    description: {
      en: "Double row marquee with opposite directions",
      ru: "Две бегущие строки, движущиеся в противоположные стороны",
    },
    type: "file",
    iframeHeight: 280,
    isNew: true,
  },
  {
    id: "brands-03",
    category: "brands",
    name: "Brands Grid",
    description: {
      en: "Static grid of partner logos",
      ru: "Статичная сетка логотипов партнёров",
    },
    type: "file",
    iframeHeight: 200,
    isComingSoon: true,
  },

  // ===== SERVICES =====
  {
    id: "services-01",
    category: "services",
    name: "Services Marquee",
    description: {
      en: "Infinite scroll of service cards with icons",
      ru: "Бесконечная прокрутка карточек услуг с иконками",
    },
    type: "file",
    iframeHeight: 450,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "services-02",
    category: "services",
    name: "Services Grid",
    description: {
      en: "Static grid of service cards",
      ru: "Статичная сетка карточек услуг",
    },
    type: "file",
    iframeHeight: 600,
    isNew: true,
  },
  {
    id: "services-03",
    category: "services",
    name: "Services Bento",
    description: {
      en: "Bento grid layout for services",
      ru: "Bento-сетка для услуг",
    },
    type: "file",
    iframeHeight: 500,
    isComingSoon: true,
  },

  // ===== AI =====
  {
    id: "ai-01",
    category: "ai",
    name: "Chat Interface",
    description: {
      en: "AI chat interface with message bubbles",
      ru: "AI-чат с пузырями сообщений",
    },
    type: "directory",
    iframeHeight: 600,
    isFeatured: true,
    isComingSoon: true,
  },

  // ===== FAQ =====
  {
    id: "faq-01",
    category: "faq",
    name: "Accordion FAQ",
    description: {
      en: "Expandable FAQ items with animated icons and numbering",
      ru: "Раскрывающиеся пункты FAQ с анимированными иконками и нумерацией",
    },
    type: "file",
    iframeHeight: 600,
    isFeatured: true,
    isNew: true,
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
    (b) => b.category === category && !b.isComingSoon,
  ).length
}

/**
 * Count all blocks in a category
 */
export function countBlocksInCategory(category: string): number {
  return blocksMetadata.filter((b) => b.category === category).length
}
