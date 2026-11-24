import decisions from "@/review/decisions.json"
/**
 * Unified documentation navigation configuration
 *
 * This is the SINGLE SOURCE OF TRUTH for all docs navigation:
 * - Sidebar navigation
 * - Breadcrumbs
 * - Site search
 *
 * When adding a new component/page, add it here and it will
 * automatically appear in all navigation elements.
 */

import type { LucideIcon } from "lucide-react"
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUp,
  Badge as BadgeIcon,
  BadgePercent,
  Bell,
  BellRing,
  Blend,
  Book,
  Calculator,
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  ChartBarDecreasing,
  ChartGantt,
  CheckSquare,
  ChevronsUpDown,
  CircleDashed,
  CircleDot,
  CircleHelp,
  CirclePlay,
  ClipboardCopy,
  ClipboardList,
  Clock,
  CloudUpload,
  Columns,
  Cookie,
  Copy,
  Disc3,
  Eye,
  FileInput,
  FormInput,
  GalleryHorizontal,
  GalleryHorizontalEnd,
  Gauge,
  GitCommitHorizontal,
  GitCommitVertical,
  Globe,
  Grid3x3,
  Hash,
  Highlighter,
  History,
  Keyboard,
  Languages,
  Layers,
  LayoutGrid,
  ListChecks,
  ListCollapse,
  ListTree,
  ListVideo,
  Megaphone,
  Menu,
  MessageSquare,
  MessageSquareHeart,
  MessageSquareQuote,
  MonitorPlay,
  MousePointer,
  MousePointerClick,
  MoveHorizontal,
  PaintRoller,
  Palette,
  PanelBottom,
  PartyPopper,
  Phone,
  Radar,
  RectangleEllipsis,
  RotateCw,
  ScanEye,
  Scroll,
  ScrollText,
  Search,
  SeparatorHorizontal,
  Settings,
  Share2,
  Signature,
  SlidersHorizontal,
  Sparkles,
  SplitSquareHorizontal,
  Square,
  Star,
  SunMoon,
  Terminal,
  TextCursorInput,
  TextSearch,
  ToggleLeft,
  Type,
  VenetianMask,
  Volume2,
  Zap,
  ZoomIn,
} from "lucide-react"
import { type Localized, pick } from "@/i18n/dict"
import { BLOCK_CATEGORIES } from "@/lib/config/blocks-categories"
import { BLOCKS_ENABLED } from "@/lib/config/features"

/** Group of nav items inside a section (sidebar subheadings, catalog sections) */
export interface NavGroup<Id extends string = string> {
  /** Stable id: used as category value and lowercased as anchor */
  id: Id
  title: Localized
}

/** Component groups in display order */
export const COMPONENT_GROUPS = [
  { id: "Inputs", title: { en: "Inputs", ru: "Ввод" } },
  { id: "Display", title: { en: "Display", ru: "Отображение" } },
  { id: "Data", title: { en: "Data", ru: "Данные" } },
  { id: "Media", title: { en: "Media", ru: "Медиа" } },
  { id: "Feedback", title: { en: "Feedback", ru: "Обратная связь" } },
  { id: "Navigation", title: { en: "Navigation", ru: "Навигация" } },
  { id: "Overlay", title: { en: "Overlay", ru: "Оверлеи" } },
  { id: "Layout", title: { en: "Layout", ru: "Раскладка" } },
  { id: "Marketing", title: { en: "Marketing", ru: "Маркетинг" } },
  { id: "Utilities", title: { en: "Utilities", ru: "Утилиты" } },
] as const satisfies readonly NavGroup[]

/** Effect groups in display order */
export const EFFECT_GROUPS = [
  { id: "Text", title: { en: "Text", ru: "Текст" } },
  { id: "Scroll", title: { en: "Scroll", ru: "Скролл" } },
  {
    id: "Decor",
    title: { en: "Backgrounds & Borders", ru: "Фоны и рамки" },
  },
  { id: "Interaction", title: { en: "Interaction", ru: "Интерактив" } },
] as const satisfies readonly NavGroup[]

export type ComponentGroupId = (typeof COMPONENT_GROUPS)[number]["id"]
export type EffectGroupId = (typeof EFFECT_GROUPS)[number]["id"]
export type NavCategory = ComponentGroupId | EffectGroupId | "Hooks"

/** Fallback group for items without a known category */
export const OTHER_GROUP: NavGroup<"Other"> = {
  id: "Other",
  title: { en: "Other", ru: "Другое" },
}

/** Anchor id for a group heading (#inputs, #decor) */
export function groupAnchor(id: string): string {
  return id.toLowerCase().replace(/\s+/g, "-")
}

export type ReviewStatus = "" | "accepted" | "revise" | "delete"

export interface NavItem {
  reviewStatus?: ReviewStatus
  /** URL slug (e.g., "carousel", "animated-timer") */
  slug: string
  /** Display title: component names are plain strings, pages are Localized */
  title: string | Localized
  /** Full href path */
  href: string
  /** Short description for component cards */
  description?: Localized
  /** Group id from COMPONENT_GROUPS / EFFECT_GROUPS */
  category?: NavCategory
  /** Lucide icon for sidebar display */
  icon?: LucideIcon
  /** Mark as new */
  isNew?: boolean
  /** Mark as draft (hidden in production) */
  isDraft?: boolean
  /** Mark as coming soon (shown but disabled) */
  isComingSoon?: boolean
  /** Search keywords */
  keywords?: string[]
}

export interface NavSection {
  /** Section title */
  title: Localized
  /** Section slug for breadcrumbs */
  slug: string
  /** Optional section href */
  href?: string
  /** Navigation items */
  items: NavItem[]
  /** If set, items are shown grouped by `category` in this order */
  groups?: readonly NavGroup[]
}

/**
 * Split items into groups in the given order. Empty groups are skipped,
 * items with an unknown category go to the trailing "Other" group.
 */
export function groupNavItems<T extends Pick<NavItem, "category">>(
  items: readonly T[],
  groups: readonly NavGroup[],
): { group: NavGroup; items: T[] }[] {
  const known = new Set<string>(groups.map((g) => g.id))
  const result = groups.map((group) => ({
    group: group as NavGroup,
    items: items.filter((item) => item.category === group.id),
  }))
  const other = items.filter(
    (item) => !item.category || !known.has(item.category),
  )
  if (other.length > 0) result.push({ group: OTHER_GROUP, items: other })
  return result.filter((entry) => entry.items.length > 0)
}

/**
 * Title of a nav item for the given locale (plain strings are returned as is)
 */
export function navTitle(item: NavItem, locale: string): string {
  return typeof item.title === "string" ? item.title : pick(item.title, locale)
}

/**
 * Sort navigation items:
 * 1. Regular items (alphabetically)
 * 2. Draft items (alphabetically)
 * 3. Coming soon items (alphabetically)
 */
function sortNavItems(items: NavItem[]): NavItem[] {
  return [...items].sort((a, b) => {
    // Coming soon always last
    if (a.isComingSoon !== b.isComingSoon) return a.isComingSoon ? 1 : -1
    // Drafts after regular
    if (a.isDraft !== b.isDraft) return a.isDraft ? 1 : -1
    // Alphabetically within groups
    return navTitle(a, "en").localeCompare(navTitle(b, "en"))
  })
}

/**
 * Raw navigation data (unsorted)
 */
const rawNavigation: NavSection[] = [
  {
    title: { en: "Getting Started", ru: "Начало работы" },
    slug: "getting-started",
    items: [
      {
        slug: "docs",
        title: { en: "Introduction", ru: "Введение" },
        href: "/docs",
        description: {
          en: "Get started with GooseUI components",
          ru: "Начните работу с компонентами GooseUI",
        },
        icon: Book,
        keywords: ["start", "getting started", "intro"],
      },
      {
        slug: "installation",
        title: { en: "Installation", ru: "Установка" },
        href: "/docs/installation",
        description: {
          en: "How to install and configure GooseUI",
          ru: "Как установить и настроить GooseUI",
        },
        icon: Settings,
        keywords: ["install", "setup", "npm", "pnpm"],
      },
      {
        slug: "cli",
        title: "CLI",
        href: "/docs/cli",
        description: {
          en: "Use CLI to add components",
          ru: "Добавляйте компоненты через CLI",
        },
        icon: Terminal,
        keywords: ["command", "terminal", "shadcn"],
      },
    ],
  },
  {
    title: { en: "Components", ru: "Компоненты" },
    slug: "components",
    href: "/docs/components",
    groups: COMPONENT_GROUPS,
    items: [
      {
        slug: "tooltip",
        title: "Tooltip",
        href: "/docs/components/tooltip",
        description: {
          en: "Contextual hints on hover and focus",
          ru: "Контекстные подсказки при наведении и фокусе",
        },
        category: "Overlay",
        icon: MessageSquare,
        keywords: ["tooltip", "hint", "popover"],
      },
      {
        slug: "hint",
        title: "Hint",
        href: "/docs/components/hint",
        description: {
          en: "Tiny native hint on hover and focus, a styled title",
          ru: "Крошечная нативная подсказка при наведении и фокусе, title со стилем",
        },
        category: "Overlay",
        icon: MessageSquare,
        isNew: true,
        keywords: ["hint", "title", "tooltip", "interestfor", "popover"],
      },
      {
        slug: "dropdown-menu",
        title: "Dropdown Menu",
        href: "/docs/components/dropdown-menu",
        description: {
          en: "Accessible menu of actions",
          ru: "Доступное меню действий",
        },
        category: "Overlay",
        icon: Menu,
        keywords: ["dropdown", "menu", "actions"],
      },
      {
        slug: "language-switcher",
        title: "Language Switcher",
        href: "/docs/components/language-switcher",
        description: {
          en: "Language dropdown with links that work without JavaScript",
          ru: "Выбор языка со ссылками, которые работают без JavaScript",
        },
        category: "Navigation",
        icon: Languages,
        isNew: true,
        keywords: ["language", "locale", "i18n", "translate", "switcher"],
      },
      // A
      {
        slug: "adaptive-grid",
        title: "Adaptive Grid",
        href: "/docs/components/adaptive-grid",
        description: {
          en: "Grid that adapts with Container Queries + :has()",
          ru: "Сетка, которая подстраивается через Container Queries и :has()",
        },
        category: "Layout",
        icon: LayoutGrid,
        keywords: ["grid", "container", "queries", "adaptive"],
      },
      {
        slug: "animated-timer",
        title: "Animated Timer",
        href: "/docs/components/animated-timer",
        description: {
          en: "Countdown timer with flip animation",
          ru: "Таймер обратного отсчёта с flip-анимацией",
        },
        category: "Display",
        icon: Clock,
        keywords: ["countdown", "timer", "flip", "animation"],
      },
      {
        slug: "separator",
        title: "Separator",
        href: "/docs/components/separator",
        description: {
          en: "A semantic or decorative divider",
          ru: "Смысловой или декоративный разделитель",
        },
        category: "Layout",
        icon: LayoutGrid,
        keywords: ["separator", "divider", "line"],
      },
      {
        slug: "kbd",
        title: "Kbd",
        href: "/docs/components/kbd",
        description: {
          en: "Kbd displays a keyboard key or shortcut. It uses the native kbd element for semantic markup. Combine keys in a group to show shortcuts. It works without JavaScript.",
          ru: "Kbd показывает клавишу или сочетание клавиш. Компонент использует семантический элемент kbd. Объединяйте клавиши в группы для отображения сочетаний. Компонент работает без JavaScript.",
        },
        category: "Display",
        icon: LayoutGrid,
        keywords: ["kbd"],
      },
      {
        slug: "skeleton",
        title: "Skeleton",
        href: "/docs/components/skeleton",
        description: {
          en: "Loading placeholders in plain CSS: pulse, shimmer and wave animations, ready-made shapes, a group with one shared shimmer and a fade-in for real content. No JavaScript, still with reduced motion.",
          ru: "Заглушки загрузки на чистом CSS: анимации pulse, shimmer и wave, готовые формы, группа с общим бликом и плавное появление контента. Без JavaScript, при reduced motion стоят на месте.",
        },
        category: "Feedback",
        icon: LayoutGrid,
        keywords: [
          "skeleton",
          "loading",
          "placeholder",
          "shimmer",
          "skeleton loader",
        ],
      },
      {
        slug: "breadcrumb",
        title: "Breadcrumb",
        href: "/docs/components/breadcrumb",
        description: {
          en: "Breadcrumb trail with CSS-drawn separators (chevron, slash, dot, arrow), a pill variant, an animated underline and a horizontally scrollable list with faded edges. No JavaScript.",
          ru: "Хлебные крошки: разделители на CSS (chevron, slash, dot, arrow), вариант pill, выезжающее подчёркивание и горизонтально прокручиваемый список с затухающими краями. Без JavaScript.",
        },
        category: "Navigation",
        icon: LayoutGrid,
        keywords: [
          "breadcrumb",
          "breadcrumbs",
          "path",
          "navigation",
          "pill",
          "separator",
          "хлебные крошки",
        ],
      },
      {
        slug: "toggle",
        title: "Toggle",
        href: "/docs/components/toggle",
        description: {
          en: "Toggle is a two-state button. It exposes its state through aria-pressed. Use it for settings that can be switched on and off. It supports controlled and uncontrolled state.",
          ru: "Toggle — кнопка с двумя состояниями. Она сообщает состояние через aria-pressed. Используйте её для включения и выключения параметров. Поддерживаются управляемый и неуправляемый режимы.",
        },
        category: "Inputs",
        icon: LayoutGrid,
        keywords: ["toggle"],
      },
      {
        slug: "toggle-group",
        title: "Toggle Group",
        href: "/docs/components/toggle-group",
        description: {
          en: "Toggle Group lets users choose one option from a set. It uses native radio inputs for keyboard interaction. The selected option can be controlled by the parent. Each option can contain text or an icon.",
          ru: "Toggle Group позволяет выбрать один вариант из набора. Для работы с клавиатурой используются нативные радиокнопки. Родитель может управлять выбранным значением. Варианты могут содержать текст или значок.",
        },
        category: "Inputs",
        icon: LayoutGrid,
        keywords: ["toggle-group"],
      },
      {
        slug: "collapsible",
        title: "Collapsible",
        href: "/docs/components/collapsible",
        description: {
          en: 'Collapsible shows and hides a block of content when its trigger is clicked. Keep the state inside with defaultOpen or control it from outside with open and onOpenChange. Height animates through interpolate-size, and the closed panel gets hidden="until-found", so in-page search opens it on its own. The trigger accepts asChild and sets aria-expanded and aria-controls for you.',
          ru: 'Collapsible скрывает и показывает блок содержимого по клику на триггер. Состояние можно держать внутри через defaultOpen или управлять снаружи через open и onOpenChange. Высота плавно анимируется через interpolate-size, а закрытая панель получает hidden="until-found", поэтому поиск по странице раскрывает её сам. Триггер принимает asChild и подставляет атрибуты aria-expanded и aria-controls.',
        },
        category: "Layout",
        icon: ChevronsUpDown,
        isNew: true,
        keywords: [
          "collapsible",
          "accordion",
          "disclosure",
          "expand",
          "collapse",
          "сворачиваемый",
          "раскрывающийся",
        ],
      },
      {
        slug: "theme-toggle",
        title: "Theme Toggle",
        href: "/docs/components/theme-toggle",
        description: {
          en: "Theme Toggle is a button that switches between light and dark themes with a sun and moon animation. The component knows nothing about a theme provider: it takes the current theme in theme and reports a change through onThemeChange. That lets you wire it to next-themes or any store of your own. It is built on Button, the icon size comes from the size prop, and the animation turns off under prefers-reduced-motion.",
          ru: "Theme Toggle - кнопка переключения светлой и тёмной темы с анимацией солнца и луны. Компонент ничего не знает о провайдере тем: текущую тему он получает в theme, а смену отдаёт в onThemeChange. Поэтому его можно подключить к next-themes или к любому своему хранилищу. Кнопка построена на Button, размер иконки задаётся пропом size, анимация отключается при prefers-reduced-motion.",
        },
        category: "Utilities",
        icon: SunMoon,
        isNew: true,
        keywords: [
          "theme",
          "dark mode",
          "light mode",
          "toggle",
          "переключатель темы",
          "тёмная тема",
        ],
      },
      {
        slug: "tabs",
        title: "Tabs",
        href: "/docs/components/tabs",
        description: {
          en: "Tabs organize related content into selectable panels. Native radio inputs handle selection and keyboard navigation. Use a controlled value when other interface elements need the selected tab. Each panel displays content for its corresponding option.",
          ru: "Tabs организуют связанное содержимое в переключаемые панели. Нативные радиокнопки отвечают за выбор и управление с клавиатуры. Управляемое значение удобно, когда выбранная вкладка нужна другим элементам интерфейса. Каждой вкладке соответствует своя панель.",
        },
        category: "Navigation",
        icon: LayoutGrid,
        keywords: ["tabs"],
      },
      {
        slug: "dialog",
        title: "Dialog",
        href: "/docs/components/dialog",
        description: {
          en: "An accessible native modal dialog.",
          ru: "Доступное модальное окно на нативном dialog.",
        },
        category: "Overlay",
        icon: LayoutGrid,
        keywords: ["dialog", "modal"],
      },
      {
        slug: "sheet",
        title: "Sheet",
        href: "/docs/components/sheet",
        description: {
          en: "An accessible panel that opens from a screen edge.",
          ru: "Доступная панель, открывающаяся от края экрана.",
        },
        category: "Overlay",
        icon: LayoutGrid,
        keywords: ["sheet", "drawer", "panel"],
      },
      // B
      {
        slug: "badge",
        title: "Badge",
        href: "/docs/components/badge",
        description: {
          en: "Small status indicator with variants",
          ru: "Небольшой индикатор статуса с вариантами",
        },
        category: "Display",
        icon: BadgeIcon,
        keywords: ["badge", "tag", "label", "status", "chip"],
      },
      {
        slug: "baseline-status",
        title: "Baseline Status",
        href: "/docs/components/baseline-status",
        description: {
          en: "Display browser support status",
          ru: "Показывает статус поддержки в браузерах",
        },
        category: "Display",
        icon: Globe,
        keywords: ["browser", "support", "compatibility", "baseline"],
      },
      {
        slug: "button",
        title: "Button",
        href: "/docs/components/button",
        description: {
          en: "Button with various variants and sizes",
          ru: "Кнопка с разными вариантами и размерами",
        },
        category: "Inputs",
        icon: MousePointer,
        keywords: ["click", "action", "submit"],
      },
      // C
      {
        slug: "card",
        title: "Card",
        href: "/docs/components/card",
        description: {
          en: "Container for grouping content",
          ru: "Контейнер для группировки контента",
        },
        category: "Layout",
        icon: Square,
        keywords: ["container", "box", "wrapper"],
      },
      {
        slug: "carousel",
        title: "Carousel",
        href: "/docs/components/carousel",
        description: {
          en: "Carousel on scroll-snap with dots, thumbnails and auto-play",
          ru: "Карусель на scroll-snap с точками, миниатюрами и автопрокруткой",
        },
        category: "Media",
        icon: GalleryHorizontal,
        isNew: true,
        keywords: ["slider", "gallery", "thumbnails", "images", "swipe"],
      },
      {
        slug: "checkbox",
        title: "Checkbox",
        href: "/docs/components/checkbox",
        description: {
          en: "Checkbox input with label support",
          ru: "Чекбокс с поддержкой подписи",
        },
        category: "Inputs",
        icon: CheckSquare,
        keywords: ["check", "toggle", "form", "input"],
      },
      {
        slug: "radio",
        title: "Radio",
        href: "/docs/components/radio",
        description: {
          en: "Native radio input for a single choice",
          ru: "Нативная радиокнопка для выбора одного варианта",
        },
        category: "Inputs",
        icon: CircleDot,
        isNew: true,
        keywords: ["radio", "choice", "form", "input"],
      },
      // D
      {
        slug: "digital-clock",
        title: "Digital Clock",
        href: "/docs/components/digital-clock",
        description: {
          en: "LED-style digital clock display",
          ru: "Цифровые часы в стиле LED-дисплея",
        },
        category: "Display",
        icon: Clock,
        isNew: true,
        keywords: ["time", "clock", "led", "display"],
      },
      // G
      {
        slug: "github-star-dialog",
        title: "GitHub Star Dialog",
        href: "/docs/components/github-star-dialog",
        description: {
          en: "Modal asking to star the repository, with a goal progress bar",
          ru: "Модалка с просьбой поставить звезду репозиторию и прогресс-баром цели",
        },
        category: "Marketing",
        icon: MessageSquareHeart,
        isDraft: true,
        keywords: [
          "github",
          "stars",
          "modal",
          "open source",
          "goal",
          "progress",
        ],
      },
      // I
      {
        slug: "input",
        title: "Input",
        href: "/docs/components/input",
        description: {
          en: "Text input field component",
          ru: "Текстовое поле ввода",
        },
        category: "Inputs",
        icon: FormInput,
        keywords: ["text", "field", "form", "input"],
      },
      // M
      {
        slug: "morphing-dialog",
        title: "Morphing Dialog",
        href: "/docs/components/morphing-dialog",
        description: {
          en: "Dialog with View Transitions API animation",
          ru: "Диалог с анимацией на View Transitions API",
        },
        category: "Overlay",
        icon: Layers,
        isNew: true,
        keywords: ["modal", "popup", "view transitions", "animation"],
      },
      // P
      {
        slug: "promo-banner",
        title: "Promo Banner",
        href: "/docs/components/promo-banner",
        description: {
          en: "Floating promotional banner with marquee",
          ru: "Плавающий промо-баннер с бегущей строкой",
        },
        category: "Marketing",
        icon: Megaphone,
        isNew: true,
        keywords: ["marketing", "popup", "sale", "campaign", "promotion"],
      },
      // S
      {
        slug: "scroll-progress",
        title: "Scroll Progress",
        href: "/docs/components/scroll-progress",
        description: {
          en: "Scroll progress bar for the page or any container, pure CSS",
          ru: "Полоса прогресса прокрутки страницы или любого контейнера на чистом CSS",
        },
        category: "Display",
        icon: Gauge,
        isDraft: true,
        keywords: ["scroll", "progress", "animation", "timeline"],
      },
      {
        slug: "search-panel",
        title: "Search Panel",
        href: "/docs/components/search-panel",
        description: {
          en: "Versatile search with 5 variants: instant, command palette, scoped, contextual, federated",
          ru: "Универсальный поиск в 5 вариантах: instant, command palette, scoped, contextual, federated",
        },
        category: "Inputs",
        icon: Search,
        isNew: true,
        keywords: [
          "search",
          "command",
          "palette",
          "instant",
          "federated",
          "cmdk",
        ],
      },
      {
        slug: "scroll-to-top",
        title: "Scroll To Top",
        href: "/docs/components/scroll-to-top",
        description: {
          en: "Floating scroll-to-top button with multiple variants",
          ru: "Плавающая кнопка «наверх» с несколькими вариантами",
        },
        category: "Navigation",
        icon: ArrowUp,
        keywords: ["scroll", "top", "button", "navigation", "back"],
      },
      {
        slug: "sliding-number",
        title: "Sliding Number",
        href: "/docs/components/sliding-number",
        description: {
          en: "Animated number display with sliding transitions",
          ru: "Анимированное число со скользящими переходами",
        },
        category: "Data",
        isDraft: true,
        keywords: ["number", "counter", "animation", "stats", "price"],
      },
      // T
      {
        slug: "theme-customizer",
        title: "Theme Customizer",
        href: "/docs/components/theme-customizer",
        description: {
          en: "Floating theme and color picker",
          ru: "Плавающий переключатель темы и цвета",
        },
        category: "Utilities",
        icon: Palette,
        keywords: ["theme", "color", "dark mode", "customizer"],
      },
      {
        slug: "typography",
        title: "Typography",
        href: "/docs/components/typography",
        description: {
          en: "Text styles and formatting",
          ru: "Стили и форматирование текста",
        },
        category: "Display",
        icon: Type,
        keywords: ["text", "heading", "paragraph", "font"],
      },
      // Draft components (alphabetically sorted)
      {
        slug: "scroll-container",
        title: "Scroll Container",
        href: "/docs/components/scroll-container",
        description: {
          en: "Container with custom styled scrollbar",
          ru: "Контейнер с кастомным скроллбаром",
        },
        category: "Layout",
        icon: Scroll,
        isDraft: true,
        keywords: ["scroll", "scrollbar", "container", "custom"],
      },
      {
        slug: "stacking-cards",
        title: "Stacking Cards",
        href: "/docs/components/stacking-cards",
        description: {
          en: "Cards that stack on scroll",
          ru: "Карточки, которые складываются стопкой при скролле",
        },
        category: "Display",
        icon: Layers,
        isDraft: true,
        keywords: ["cards", "stack", "sticky", "scroll"],
      },
      // Coming Soon components (alphabetically sorted)
      {
        slug: "select",
        title: "Select",
        href: "/docs/components/select",
        description: {
          en: "Dropdown select component",
          ru: "Выпадающий список",
        },
        category: "Inputs",
        icon: Columns,
        isComingSoon: true,
        keywords: ["dropdown", "select", "option", "form"],
      },
      {
        slug: "slider",
        title: "Slider",
        href: "/docs/components/slider",
        description: {
          en: "Range slider input component",
          ru: "Слайдер для выбора диапазона",
        },
        category: "Inputs",
        icon: Gauge,
        isDraft: true,
        keywords: ["range", "slider", "input", "form"],
      },
      {
        slug: "switch",
        title: "Switch",
        href: "/docs/components/switch",
        description: {
          en: "Native on/off switch with a spring knob animation. Works without JavaScript and submits its value in forms.",
          ru: "Нативный переключатель с пружинной анимацией шарика. Работает без JavaScript и отправляет значение в форме.",
        },
        category: "Inputs",
        icon: ToggleLeft,
        isNew: true,
        keywords: ["toggle", "switch", "on", "off", "form"],
      },
      {
        slug: "booking-calendar",
        title: "Booking Calendar",
        href: "/docs/components/booking-calendar",
        description: {
          en: "Month grid with free time slots and an async book button",
          ru: "Сетка месяца со свободным временем и асинхронной записью",
        },
        category: "Inputs",
        icon: CalendarClock,
        isNew: true,
        keywords: [
          "booking",
          "calendar",
          "schedule",
          "slots",
          "appointment",
          "date",
        ],
      },
      {
        slug: "compare-slider",
        title: "Compare Slider",
        href: "/docs/components/compare-slider",
        description: {
          en: "Before/after comparison with a draggable divider",
          ru: "Сравнение «до/после» с перетаскиваемым разделителем",
        },
        category: "Media",
        icon: SplitSquareHorizontal,
        isNew: true,
        keywords: [
          "before",
          "after",
          "compare",
          "image",
          "slider",
          "clip-path",
        ],
      },
      {
        slug: "corner-badge",
        title: "Corner Badge",
        href: "/docs/components/corner-badge",
        description: {
          en: "Badge in a card corner with concave notches on both sides",
          ru: "Бейдж в углу карточки с вогнутыми скруглениями по бокам",
        },
        category: "Display",
        icon: BadgePercent,
        isNew: true,
        keywords: ["badge", "corner", "card", "notch", "label"],
      },
      {
        slug: "hover-scroll-screenshot",
        title: "Hover Scroll Screenshot",
        href: "/docs/components/hover-scroll-screenshot",
        description: {
          en: "Tall screenshot that scrolls inside a fixed frame on hover",
          ru: "Длинный скриншот прокручивается в рамке при наведении",
        },
        category: "Media",
        icon: ScrollText,
        isNew: true,
        keywords: [
          "screenshot",
          "scroll",
          "hover",
          "portfolio",
          "preview",
          "web animations",
        ],
      },
      {
        slug: "marquee",
        title: "Marquee",
        href: "/docs/components/marquee",
        description: {
          en: "Infinite CSS ticker with faded edges and speed in px per second",
          ru: "Бесконечная лента на CSS с затуханием по краям",
        },
        category: "Marketing",
        icon: GalleryHorizontalEnd,
        isNew: true,
        keywords: [
          "marquee",
          "ticker",
          "logos",
          "scroll",
          "infinite",
          "carousel",
        ],
      },
      {
        slug: "option-picker",
        title: "Option Picker",
        href: "/docs/components/option-picker",
        description: {
          en: "Single choice as segments, rows, tiles, a slider or bars",
          ru: "Выбор одного значения: сегменты, строки, плитки, ползунок, столбики",
        },
        category: "Inputs",
        icon: CircleDot,
        isNew: true,
        keywords: [
          "radio",
          "radiogroup",
          "select",
          "segmented",
          "choice",
          "picker",
        ],
      },
      {
        slug: "phone-input",
        title: "Phone Input",
        href: "/docs/components/phone-input",
        description: {
          en: "Phone field with a country select and live mask, returns E.164",
          ru: "Поле телефона с выбором страны и маской, отдаёт E.164",
        },
        category: "Inputs",
        icon: Phone,
        isNew: true,
        keywords: ["phone", "tel", "mask", "e164", "country", "input"],
      },
      {
        slug: "quantity-slider",
        title: "Quantity Slider",
        href: "/docs/components/quantity-slider",
        description: {
          en: "Quantity input with stepper buttons, a slider and a live total",
          ru: "Поле количества с кнопками, ползунком и итоговой суммой",
        },
        category: "Inputs",
        icon: Calculator,
        isNew: true,
        keywords: ["quantity", "stepper", "slider", "cart", "units"],
      },
      {
        slug: "range-slider",
        title: "Range Slider",
        href: "/docs/components/range-slider",
        description: {
          en: "Two-thumb range slider built on native range inputs",
          ru: "Слайдер диапазона с двумя ручками на нативных range-полях",
        },
        category: "Inputs",
        icon: SlidersHorizontal,
        isNew: true,
        keywords: ["range", "slider", "filter", "price", "min max"],
      },
      {
        slug: "rating-breakdown",
        title: "Rating Breakdown",
        href: "/docs/components/rating-breakdown",
        description: {
          en: "Average score with stars and a per-score vote distribution",
          ru: "Средняя оценка со звёздами и распределение голосов по баллам",
        },
        category: "Display",
        icon: ChartBarDecreasing,
        isNew: true,
        keywords: ["rating", "reviews", "distribution", "stars", "average"],
      },
      {
        slug: "rating",
        title: "Rating",
        href: "/docs/components/rating",
        description: {
          en: "Star rating input with keyboard support and a read-only mode",
          ru: "Оценка звёздами с клавиатурой и режимом только для чтения",
        },
        category: "Inputs",
        icon: Star,
        isNew: true,
        keywords: ["rating", "stars", "review", "score", "radiogroup"],
      },
      {
        slug: "signature-pad",
        title: "Signature Pad",
        href: "/docs/components/signature-pad",
        description: {
          en: "Canvas signature field with smooth strokes, undo and PNG export",
          ru: "Поле для подписи на canvas: сглаженные штрихи, отмена и экспорт в PNG",
        },
        category: "Inputs",
        icon: Signature,
        isNew: true,
        keywords: ["signature", "canvas", "draw", "sign", "pointer"],
      },
      {
        slug: "step-progress",
        title: "Step Progress",
        href: "/docs/components/step-progress",
        description: {
          en: "Step bar with running dashes, a marker dot and a 04 / 05 counter",
          ru: "Полоса шагов с бегущим пунктиром, точкой и счётчиком 04 / 05",
        },
        category: "Feedback",
        icon: GitCommitHorizontal,
        isNew: true,
        keywords: ["progress", "steps", "stepper", "progressbar", "form"],
      },
      {
        slug: "step-wizard",
        title: "Step Wizard",
        href: "/docs/components/step-wizard",
        description: {
          en: "One question per screen with progress, validation and transitions",
          ru: "Один вопрос на экран: прогресс, проверка шагов и переходы",
        },
        category: "Inputs",
        icon: ListChecks,
        isNew: true,
        keywords: [
          "wizard",
          "steps",
          "form",
          "quiz",
          "onboarding",
          "multi-step",
        ],
      },
      {
        slug: "testimonial-rotator",
        title: "Testimonial Rotator",
        href: "/docs/components/testimonial-rotator",
        description: {
          en: "Auto-rotating testimonials with a progress ring around the avatar",
          ru: "Отзывы сменяются сами, вокруг аватарки идёт кольцо прогресса",
        },
        category: "Marketing",
        icon: MessageSquareQuote,
        isNew: true,
        keywords: [
          "testimonials",
          "reviews",
          "quotes",
          "carousel",
          "social proof",
        ],
      },
      {
        slug: "video-dialog",
        title: "Video Dialog",
        href: "/docs/components/video-dialog",
        description: {
          en: "Video preview that expands into a modal player",
          ru: "Превью видео раскрывается в модальный плеер",
        },
        category: "Media",
        icon: CirclePlay,
        isNew: true,
        keywords: [
          "video",
          "dialog",
          "modal",
          "player",
          "view transitions",
          "lightbox",
        ],
      },
      {
        slug: "video-hover-preview",
        title: "Video Hover Preview",
        href: "/docs/components/video-hover-preview",
        description: {
          en: "Video card: muted preview with captions on hover, sound on click",
          ru: "Карточка видео: превью без звука с субтитрами, звук по клику",
        },
        category: "Media",
        icon: MonitorPlay,
        isNew: true,
        keywords: [
          "video",
          "hover",
          "preview",
          "card",
          "autoplay",
          "gallery",
          "testimonial",
          "review",
          "captions",
          "subtitles",
          "vtt",
        ],
      },
      {
        slug: "video-synced-steps",
        title: "Video Synced Steps",
        href: "/docs/components/video-synced-steps",
        description: {
          en: "Looping video with a step list that follows playback",
          ru: "Зацикленное видео и шаги, которые следят за роликом",
        },
        category: "Media",
        icon: ListVideo,
        isNew: true,
        keywords: ["video", "steps", "tutorial", "how-to", "sync", "progress"],
      },
      {
        slug: "searchbar",
        title: "Searchbar",
        href: "/docs/components/searchbar",
        description: {
          en: "Input with async suggestions, debounce and request cancelling",
          ru: "Поле с асинхронными подсказками, задержкой и отменой запросов",
        },
        category: "Inputs",
        icon: TextSearch,
        isNew: true,
        keywords: [
          "searchbar",
          "search",
          "autocomplete",
          "async",
          "combobox",
          "suggestions",
          "typeahead",
        ],
      },
      {
        slug: "burger-button",
        title: "Burger Button",
        href: "/docs/components/burger-button",
        description: {
          en: "Menu toggle with uneven lines that morph into a cross",
          ru: "Кнопка-бургер из линий разной длины, превращается в крестик",
        },
        category: "Navigation",
        icon: Menu,
        isNew: true,
        keywords: ["burger", "hamburger", "menu", "toggle", "button"],
      },
      {
        slug: "cookie-consent",
        title: "Cookie Consent",
        href: "/docs/components/cookie-consent",
        description: {
          en: "Cookie banner with categories, stored choice and a hook",
          ru: "Cookie-баннер с категориями, сохранённым выбором и хуком",
        },
        category: "Feedback",
        icon: Cookie,
        isNew: true,
        keywords: [
          "cookie",
          "consent",
          "gdpr",
          "banner",
          "privacy",
          "localStorage",
        ],
      },
      {
        slug: "copy-button",
        title: "Copy Button",
        href: "/docs/components/copy-button",
        description: {
          en: "Copy button whose icon turns into a check mark",
          ru: "Кнопка копирования, иконка которой превращается в галочку",
        },
        category: "Utilities",
        icon: Copy,
        isNew: true,
        keywords: ["copy", "clipboard", "button", "check"],
      },
      {
        slug: "copy-field",
        title: "Copy Field",
        href: "/docs/components/copy-field",
        description: {
          en: "Label and value row that copies the value on click",
          ru: "Строка «подпись: значение», которая копирует значение по клику",
        },
        category: "Display",
        icon: ClipboardList,
        isNew: true,
        keywords: ["copy", "field", "label", "value", "details", "admin"],
      },
      {
        slug: "details-accordion",
        title: "Details Accordion",
        href: "/docs/components/details-accordion",
        description: {
          en: "Accordion on native details with exclusive mode and no JavaScript",
          ru: "Аккордеон на нативном details: открыт один пункт, без JavaScript",
        },
        category: "Display",
        icon: ListCollapse,
        isNew: true,
        keywords: [
          "accordion",
          "details",
          "summary",
          "faq",
          "collapse",
          "disclosure",
        ],
      },
      {
        slug: "dropzone",
        title: "Dropzone",
        href: "/docs/components/dropzone",
        description: {
          en: "File upload area with previews, validation and paste support",
          ru: "Зона загрузки файлов с превью, проверками и вставкой из буфера",
        },
        category: "Inputs",
        icon: CloudUpload,
        isNew: true,
        keywords: [
          "upload",
          "file",
          "dropzone",
          "drag",
          "drop",
          "image",
          "preview",
        ],
      },
      {
        slug: "floating-label-input",
        title: "Floating Label Input",
        href: "/docs/components/floating-label-input",
        description: {
          en: "Input and textarea with a label that floats up on focus",
          ru: "Поле и textarea с подписью, которая поднимается при фокусе",
        },
        category: "Inputs",
        icon: TextCursorInput,
        isNew: true,
        keywords: ["input", "textarea", "label", "floating", "form", "field"],
      },
      {
        slug: "install-command",
        title: "Install Command",
        href: "/docs/components/install-command",
        description: {
          en: "Install command with npm, pnpm, yarn and bun tabs",
          ru: "Команда установки с вкладками npm, pnpm, yarn и bun",
        },
        category: "Utilities",
        icon: Terminal,
        isNew: true,
        keywords: ["install", "npm", "pnpm", "yarn", "bun", "command", "tabs"],
      },
      {
        slug: "toast",
        title: "Toast",
        href: "/docs/components/toast",
        description: {
          en: "Toasts on native HTML and CSS, a stack as in sonner without dependencies",
          ru: "Тосты на нативных HTML и CSS, стопка как у sonner без зависимостей",
        },
        category: "Feedback",
        icon: BellRing,
        isNew: true,
        keywords: [
          "toast",
          "notification",
          "snackbar",
          "sonner",
          "popover",
          "alert",
          "message",
          "native",
        ],
      },
      {
        slug: "notification-prompt",
        title: "Notification Prompt",
        href: "/docs/components/notification-prompt",
        description: {
          en: "Banner that asks the user to turn on browser notifications",
          ru: "Плашка с просьбой включить уведомления в браузере",
        },
        category: "Feedback",
        icon: Bell,
        isNew: true,
        keywords: ["notifications", "push", "permission", "banner", "bell"],
      },
      {
        slug: "otp-input",
        title: "OTP Input",
        href: "/docs/components/otp-input",
        description: {
          en: "One-time code field with paste, caret and animated messages",
          ru: "Поле одноразового кода со вставкой, кареткой и анимацией текста",
        },
        category: "Inputs",
        icon: RectangleEllipsis,
        isNew: true,
        keywords: ["otp", "code", "pin", "verification", "sms", "2fa"],
      },
      {
        slug: "paint-roller-loader",
        title: "Paint Roller Loader",
        href: "/docs/components/paint-roller-loader",
        description: {
          en: "CSS loader where a paint roller covers a stripe",
          ru: "CSS-лоадер: малярный валик закрашивает полосу",
        },
        category: "Feedback",
        icon: PaintRoller,
        isNew: true,
        keywords: ["loader", "paint", "roller", "loading", "css", "animation"],
      },
      {
        slug: "progress-ring",
        title: "Progress Ring",
        href: "/docs/components/progress-ring",
        description: {
          en: "SVG progress ring with thresholds and indeterminate mode",
          ru: "Кольцо прогресса на SVG с порогами и бесконечным режимом",
        },
        category: "Feedback",
        icon: CircleDashed,
        isNew: true,
        keywords: [
          "progress",
          "ring",
          "circle",
          "circular",
          "loader",
          "percentage",
        ],
      },
      {
        slug: "relative-time",
        title: "Relative Time",
        href: "/docs/components/relative-time",
        description: {
          en: "“5 minutes ago” that updates itself and flags stale data",
          ru: "«5 минут назад», которое обновляется само и видит устаревшее",
        },
        category: "Display",
        icon: History,
        isNew: true,
        keywords: ["time", "date", "ago", "relative", "intl", "stale"],
      },
      {
        slug: "responsive-hint",
        title: "Responsive Hint",
        href: "/docs/components/responsive-hint",
        description: {
          en: "Help icon: a tooltip with a mouse, a bottom sheet on touch screens",
          ru: "Значок подсказки: тултип при мыши, шторка на сенсорных экранах",
        },
        category: "Overlay",
        icon: CircleHelp,
        isNew: true,
        keywords: ["tooltip", "hint", "help", "sheet", "drawer", "mobile"],
      },
      {
        slug: "ripple-loader",
        title: "Ripple Loader",
        href: "/docs/components/ripple-loader",
        description: {
          en: "Grid of dots lit by a wave from the center or a corner",
          ru: "Сетка точек, которые зажигаются волной от центра или угла",
        },
        category: "Feedback",
        icon: Grid3x3,
        isNew: true,
        keywords: ["loader", "spinner", "grid", "dots", "ripple", "loading"],
      },
      {
        slug: "scroll-spy",
        title: "ScrollSpy",
        href: "/docs/components/scroll-spy",
        description: {
          en: "Floating section navigation: an icon rail that expands on hover",
          ru: "Плавающая навигация по разделам: колонка иконок, раскрывается при наведении",
        },
        category: "Navigation",
        icon: PanelBottom,
        isNew: true,
        keywords: [
          "scroll spy",
          "scrollspy",
          "sections",
          "floating",
          "navigation",
          "dock",
        ],
      },
      {
        slug: "share-buttons",
        title: "Share Buttons",
        href: "/docs/components/share-buttons",
        description: {
          en: "Share links for networks, copy link and the system share sheet",
          ru: "Кнопки «Поделиться», копирование ссылки и системное меню",
        },
        category: "Utilities",
        icon: Share2,
        isNew: true,
        keywords: [
          "share",
          "social",
          "copy link",
          "telegram",
          "whatsapp",
          "navigator.share",
        ],
      },
      {
        slug: "timeline",
        title: "Timeline",
        href: "/docs/components/timeline",
        description: {
          en: "Vertical or horizontal timeline with step statuses",
          ru: "Вертикальный или горизонтальный таймлайн со статусами шагов",
        },
        category: "Display",
        icon: GitCommitVertical,
        isNew: true,
        keywords: ["timeline", "steps", "history", "roadmap", "order tracking"],
      },
      {
        slug: "toc-scrollspy",
        title: "Table of Contents",
        href: "/docs/components/toc-scrollspy",
        description: {
          en: "Sticky table of contents that highlights the current section",
          ru: "Липкое оглавление с подсветкой текущего раздела",
        },
        category: "Navigation",
        icon: ListTree,
        isNew: true,
        keywords: [
          "toc",
          "table of contents",
          "scrollspy",
          "anchor",
          "headings",
          "sticky",
        ],
      },
      {
        slug: "activity-heatmap",
        title: "Activity Heatmap",
        href: "/docs/components/activity-heatmap",
        description: {
          en: "Yearly activity grid with weeks as columns and five levels",
          ru: "Сетка активности за год: недели по столбцам, пять уровней",
        },
        category: "Data",
        icon: CalendarDays,
        isNew: true,
        keywords: [
          "heatmap",
          "activity",
          "calendar",
          "contributions",
          "grid",
          "year",
        ],
      },
      {
        slug: "fade-scroller",
        title: "Fade Scroller",
        href: "/docs/components/fade-scroller",
        description: {
          en: "Scroll container that fades its edges when there is more to scroll",
          ru: "Прокрутка с затуханием краёв, когда есть что листать",
        },
        category: "Layout",
        icon: ArrowLeftRight,
        isNew: true,
        keywords: ["scroll", "overflow", "fade", "mask", "table", "chips"],
      },
      {
        slug: "gantt-chart",
        title: "Gantt Chart",
        href: "/docs/components/gantt-chart",
        description: {
          en: "Gantt chart for a day or a span of hours with plan and fact",
          ru: "Диаграмма Ганта на день или отрезок часов: план и факт",
        },
        category: "Data",
        icon: ChartGantt,
        isNew: true,
        keywords: ["gantt", "timeline", "schedule", "plan", "jobs", "day"],
      },
      {
        slug: "gauge",
        title: "Gauge",
        href: "/docs/components/gauge",
        description: {
          en: "Value meter as a half-circle arc or a linear scale",
          ru: "Датчик значения: полукруглая дуга или линейная шкала",
        },
        category: "Data",
        icon: Gauge,
        isNew: true,
        keywords: ["gauge", "meter", "score", "progress", "arc", "threshold"],
      },
      {
        slug: "image-viewer",
        title: "Image Viewer",
        href: "/docs/components/image-viewer",
        description: {
          en: "Zoom, pan and rotate an image inline or in a fullscreen dialog",
          ru: "Масштаб, перетаскивание и поворот картинки в блоке или на весь экран",
        },
        category: "Media",
        icon: ZoomIn,
        isNew: true,
        keywords: [
          "image",
          "zoom",
          "pan",
          "pinch",
          "rotate",
          "lightbox",
          "viewer",
        ],
      },
      {
        slug: "radar-chart",
        title: "Radar Chart",
        href: "/docs/components/radar-chart",
        description: {
          en: "SVG radar chart with several series, legend and tooltips",
          ru: "Радар-диаграмма на SVG с сериями, легендой и подсказками",
        },
        category: "Data",
        icon: Radar,
        isNew: true,
        keywords: ["radar", "spider", "chart", "svg", "skills", "comparison"],
      },
      {
        slug: "rotary-dial",
        title: "Rotary Dial",
        href: "/docs/components/rotary-dial",
        description: {
          en: "Circular selector you turn by dragging, wheel or arrow keys",
          ru: "Круговой селектор: крутится мышью, колесом и стрелками",
        },
        category: "Inputs",
        icon: Disc3,
        isNew: true,
        keywords: [
          "dial",
          "rotary",
          "knob",
          "wheel",
          "cipher",
          "circular",
          "slider",
        ],
      },
      {
        slug: "silhouette-reveal",
        title: "Silhouette Reveal",
        href: "/docs/components/silhouette-reveal",
        description: {
          en: "Image shown as a silhouette that smoothly reveals itself",
          ru: "Картинка в виде силуэта, который плавно раскрывается",
        },
        category: "Media",
        icon: VenetianMask,
        isNew: true,
        keywords: ["silhouette", "reveal", "mask", "quiz", "image", "guess"],
      },
      {
        slug: "stat-counter",
        title: "Stat Counter",
        href: "/docs/components/stat-counter",
        description: {
          en: "Number that counts up when it scrolls into view",
          ru: "Число досчитывает до значения при появлении на экране",
        },
        category: "Data",
        icon: Hash,
        isNew: true,
        keywords: ["counter", "stats", "number", "count up", "animate", "intl"],
      },
      {
        slug: "add-to-calendar",
        title: "Add to Calendar",
        href: "/docs/components/add-to-calendar",
        description: {
          en: "Button with links to Google, Apple, Outlook and an .ics download",
          ru: "Кнопка со ссылками в Google, Apple, Outlook и скачиванием .ics",
        },
        category: "Utilities",
        icon: CalendarPlus,
        isNew: true,
        keywords: ["calendar", "ics", "google calendar", "outlook", "event"],
      },
    ],
  },
  {
    title: { en: "Effects", ru: "Эффекты" },
    slug: "effects",
    href: "/docs/effects",
    groups: EFFECT_GROUPS,
    items: [
      {
        slug: "border-beam",
        title: "Border Beam",
        href: "/docs/effects/border-beam",
        description: {
          en: "Animated border beam effect",
          ru: "Анимированный луч по границе",
        },
        category: "Decor",
        icon: Zap,
        isNew: true,
        keywords: ["border", "beam", "glow", "animation"],
      },
      {
        slug: "reveal-on-scroll",
        title: "Reveal on Scroll",
        href: "/docs/effects/reveal-on-scroll",
        description: {
          en: "Elements reveal as they enter viewport",
          ru: "Элементы появляются при попадании во вьюпорт",
        },
        category: "Scroll",
        icon: Sparkles,
        isDraft: true,
        keywords: ["reveal", "scroll", "animation", "view"],
      },
      {
        slug: "glitch-text",
        title: "Glitch Text",
        href: "/docs/effects/glitch-text",
        description: {
          en: "Animated glitch text with chromatic aberration",
          ru: "Анимированный glitch-текст с хроматической аберрацией",
        },
        category: "Text",
        isDraft: true,
        keywords: ["glitch", "text", "animation", "cyberpunk", "distortion"],
      },
      {
        slug: "confetti",
        title: "Confetti",
        href: "/docs/effects/confetti",
        description: {
          en: "Dependency-free canvas confetti burst with a hook and presets",
          ru: "Залп конфетти на canvas без зависимостей, с хуком и пресетами",
        },
        category: "Interaction",
        icon: PartyPopper,
        isNew: true,
        keywords: [
          "confetti",
          "celebration",
          "canvas",
          "particles",
          "party",
          "success",
        ],
      },
      {
        slug: "click-sparks",
        title: "Click Sparks",
        href: "/docs/effects/click-sparks",
        description: {
          en: "Spark strokes burst from every click inside a wrapper",
          ru: "Искры разлетаются из каждой точки клика внутри обёртки",
        },
        category: "Interaction",
        icon: MousePointerClick,
        isNew: true,
        keywords: ["click", "spark", "burst", "canvas", "feedback"],
      },
      {
        slug: "dashed-line",
        title: "Dashed Line",
        href: "/docs/effects/dashed-line",
        description: {
          en: "Dashed divider with faded ends and moving dashes",
          ru: "Пунктирный разделитель с затуханием на концах и бегущими штрихами",
        },
        category: "Decor",
        icon: SeparatorHorizontal,
        isNew: true,
        keywords: ["dashed", "divider", "line", "separator", "css"],
      },
      {
        slug: "dither-background",
        title: "Dither Background",
        href: "/docs/effects/dither-background",
        description: {
          en: "Animated two-color background with ordered Bayer dithering",
          ru: "Анимированный двухцветный фон с dithering по матрице Байера",
        },
        category: "Decor",
        icon: Grid3x3,
        isNew: true,
        keywords: ["dither", "bayer", "pixel", "canvas", "background", "retro"],
      },
      {
        slug: "highlight-text",
        title: "Highlight Text",
        href: "/docs/effects/highlight-text",
        description: {
          en: "Search match highlighting with an optional marker animation",
          ru: "Подсветка совпадений поиска с анимацией маркера по желанию",
        },
        category: "Text",
        icon: Highlighter,
        isNew: true,
        keywords: ["highlight", "search", "mark", "query", "diacritics"],
      },
      {
        slug: "mesh-gradient",
        title: "Mesh Gradient",
        href: "/docs/effects/mesh-gradient",
        description: {
          en: "Blurred color blobs drifting under a film grain layer",
          ru: "Размытые цветные пятна плавают под слоем зерна",
        },
        category: "Decor",
        icon: Blend,
        isNew: true,
        keywords: ["gradient", "mesh", "blur", "grain", "noise", "background"],
      },
      {
        slug: "rotating-text",
        title: "Rotating Text",
        href: "/docs/effects/rotating-text",
        description: {
          en: "Word that flips to the next one letter by letter",
          ru: "Слово, которое по буквам переворачивается в следующее",
        },
        category: "Text",
        icon: RotateCw,
        isNew: true,
        keywords: ["rotate", "words", "flip", "headline", "text"],
      },
      {
        slug: "scroll-word-reveal",
        title: "Scroll Word Reveal",
        href: "/docs/effects/scroll-word-reveal",
        description: {
          en: "Paragraph whose words fade in out of a blur as you scroll",
          ru: "Абзац, слова которого проявляются из размытия при прокрутке",
        },
        category: "Scroll",
        icon: ScrollText,
        isNew: true,
        keywords: ["scroll", "words", "reveal", "blur", "text"],
      },
      {
        slug: "theme-transition",
        title: "Theme Transition",
        href: "/docs/effects/theme-transition",
        description: {
          en: "Animated theme switch with the View Transitions API",
          ru: "Анимированная смена темы через View Transitions API",
        },
        category: "Interaction",
        icon: SunMoon,
        isNew: true,
        keywords: ["theme", "dark mode", "view transitions", "toggle"],
      },
    ],
  },
  {
    title: { en: "Hooks", ru: "Хуки" },
    slug: "hooks",
    href: "/docs/hooks",
    items: [
      {
        slug: "use-copy-to-clipboard",
        title: "useCopyToClipboard",
        href: "/docs/hooks/use-copy-to-clipboard",
        description: {
          en: "Copy text with a copied state and a fallback for http",
          ru: "Копирование текста с флагом copied и запасным способом для http",
        },
        category: "Hooks",
        icon: ClipboardCopy,
        isNew: true,
        keywords: ["copy", "clipboard", "paste"],
      },
      {
        slug: "use-file-drop",
        title: "useFileDrop",
        href: "/docs/hooks/use-file-drop",
        description: {
          en: "Drag-and-drop files onto any element, with accept filtering",
          ru: "Перетаскивание файлов на любой элемент с фильтром по типу",
        },
        category: "Hooks",
        icon: FileInput,
        isNew: true,
        keywords: ["drag", "drop", "file", "upload", "dnd", "hook"],
      },
      {
        slug: "use-now",
        title: "useNow",
        href: "/docs/hooks/use-now",
        description: {
          en: "Current time on a shared interval, safe for hydration",
          ru: "Текущее время на общем таймере без ошибок гидрации",
        },
        category: "Hooks",
        icon: Clock,
        isNew: true,
        keywords: ["time", "now", "clock", "interval", "hydration"],
      },
      {
        slug: "use-notification-permission",
        title: "useNotificationPermission",
        href: "/docs/hooks/use-notification-permission",
        description: {
          en: "Browser notification permission with quiet days",
          ru: "Разрешение на уведомления в браузере с периодом тишины",
        },
        category: "Hooks",
        icon: BellRing,
        isNew: true,
        keywords: ["notifications", "permission", "push", "dismiss"],
      },
      {
        slug: "use-scroll-spy",
        title: "useScrollSpy",
        href: "/docs/hooks/use-scroll-spy",
        description: {
          en: "Returns the id of the section currently in view",
          ru: "Возвращает id раздела, который сейчас на экране",
        },
        category: "Hooks",
        icon: ScanEye,
        isNew: true,
        keywords: [
          "scroll",
          "spy",
          "intersection",
          "observer",
          "toc",
          "active",
          "section",
        ],
      },
      {
        slug: "use-keyboard-layout",
        title: "useKeyboardLayout",
        href: "/docs/hooks/use-keyboard-layout",
        description: {
          en: "Spot text typed on the wrong keyboard layout and fix it",
          ru: "Находит текст, набранный не в той раскладке, и исправляет его",
        },
        category: "Hooks",
        icon: Languages,
        isNew: true,
        keywords: [
          "keyboard",
          "layout",
          "qwerty",
          "jcuken",
          "russian",
          "convert",
          "typo",
        ],
      },
      {
        slug: "use-deferred-interaction",
        title: "useDeferredInteraction",
        href: "/docs/hooks/use-deferred-interaction",
        description: {
          en: "Flag that turns on after the first user interaction or a timeout",
          ru: "Флаг, который включается после первого действия или по таймауту",
        },
        category: "Hooks",
        icon: MousePointerClick,
        isNew: true,
        keywords: [
          "defer",
          "third-party",
          "scripts",
          "performance",
          "interaction",
        ],
      },
      {
        slug: "use-horizontal-wheel",
        title: "useHorizontalWheel",
        href: "/docs/hooks/use-horizontal-wheel",
        description: {
          en: "Vertical mouse wheel scrolls a horizontal row",
          ru: "Вертикальное колесо мыши прокручивает горизонтальный ряд",
        },
        category: "Hooks",
        icon: MoveHorizontal,
        isNew: true,
        keywords: ["wheel", "horizontal", "scroll", "carousel"],
      },
      {
        slug: "use-keyboard-fit",
        title: "useKeyboardFit",
        href: "/docs/hooks/use-keyboard-fit",
        description: {
          en: "On-screen keyboard height from visualViewport as a value and CSS vars",
          ru: "Высота экранной клавиатуры из visualViewport и CSS-переменные",
        },
        category: "Hooks",
        icon: Keyboard,
        isNew: true,
        keywords: ["keyboard", "visual viewport", "ios", "mobile", "input"],
      },
      {
        slug: "use-near-viewport",
        title: "useNearViewport",
        href: "/docs/hooks/use-near-viewport",
        description: {
          en: "One-shot flag for elements that come close to the screen",
          ru: "Флаг, который один раз включается у элементов рядом с экраном",
        },
        category: "Hooks",
        icon: Eye,
        isNew: true,
        keywords: [
          "lazy",
          "intersection observer",
          "viewport",
          "defer",
          "performance",
        ],
      },
      {
        slug: "use-scroll-threshold",
        title: "useScrollThreshold",
        href: "/docs/hooks/use-scroll-threshold",
        description: {
          en: "Scrolled-past-threshold flag with hysteresis for sticky headers",
          ru: "Флаг прокрутки за порог с гистерезисом для липкой шапки",
        },
        category: "Hooks",
        icon: ArrowDownToLine,
        isNew: true,
        keywords: ["scroll", "sticky", "header", "threshold", "hysteresis"],
      },
      {
        slug: "use-sound-effects",
        title: "useSoundEffects",
        href: "/docs/hooks/use-sound-effects",
        description: {
          en: "Interface sounds synthesized with Web Audio, no audio files",
          ru: "Звуки интерфейса через Web Audio, без аудиофайлов",
        },
        category: "Hooks",
        icon: Volume2,
        isNew: true,
        keywords: ["sound", "audio", "web audio", "feedback", "click"],
      },
    ],
  },
  {
    title: { en: "Blocks", ru: "Блоки" },
    slug: "blocks",
    href: "/docs/blocks",
    items: [
      {
        slug: "blocks",
        title: "Blocks Overview",
        href: "/docs/blocks",
        description: {
          en: "Ready-to-use component blocks",
          ru: "Готовые блоки из компонентов",
        },
        isDraft: true,
        keywords: ["blocks", "templates", "examples"],
      },
    ],
  },
]

/**
 * Main documentation navigation structure (sorted)
 */
export const docsNavigation: NavSection[] = rawNavigation
  .filter((section) => BLOCKS_ENABLED || section.slug !== "blocks")
  .map((section) => ({
    ...section,
    items: sortNavItems(section.items).map((item) => {
      if (!["components", "effects", "hooks"].includes(section.slug))
        return item
      const status =
        (decisions.items as Record<string, { status: ReviewStatus }>)[item.slug]
          ?.status || ""
      return { ...item, reviewStatus: status, isDraft: status !== "accepted" }
    }),
  }))

/**
 * Get all navigation items flattened
 */
export function getAllNavItems(): NavItem[] {
  return docsNavigation.flatMap((section) => section.items)
}

/**
 * Get navigation item by slug
 */
export function getNavItemBySlug(slug: string): NavItem | undefined {
  return getAllNavItems().find((item) => item.slug === slug)
}

/**
 * Get display title for a slug (for breadcrumbs)
 */
export function getSlugTitle(slug: string): Localized {
  // Check sections first
  const section = docsNavigation.find((s) => s.slug === slug)
  if (section) return section.title

  // Check items
  const item = getNavItemBySlug(slug)
  if (item) {
    return typeof item.title === "string"
      ? { en: item.title, ru: item.title }
      : item.title
  }

  // Block categories (e.g. "e-commerce", "ai") have their own names
  const category = BLOCK_CATEGORIES.find((c) => c.slug === slug)
  if (category) return category.name

  // Fallback: capitalize slug
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  return { en: title, ru: title }
}

/**
 * Filter out draft items in production and remove empty sections
 */
export function filterDraftItems(sections: NavSection[]): NavSection[] {
  const isDev = process.env.NODE_ENV === "development"
  if (isDev) return sections

  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.isDraft),
    }))
    .filter((section) => section.items.length > 0)
}

/**
 * Get items for search (excludes drafts in production)
 */
export function getSearchableItems(): {
  pages: NavItem[]
  components: NavItem[]
  effects: NavItem[]
  hooks: NavItem[]
} {
  const filtered = filterDraftItems(docsNavigation)
  const gettingStarted = filtered.find((s) => s.slug === "getting-started")
  const components = filtered.find((s) => s.slug === "components")
  const effects = filtered.find((s) => s.slug === "effects")
  const hooks = filtered.find((s) => s.slug === "hooks")

  return {
    pages: gettingStarted?.items || [],
    components: components?.items || [],
    effects: effects?.items || [],
    hooks: hooks?.items || [],
  }
}

/**
 * Get available components (not coming soon, not draft in production)
 */
export function getAvailableComponents(): NavItem[] {
  const isDev = process.env.NODE_ENV === "development"
  const components = docsNavigation.find((s) => s.slug === "components")
  if (!components) return []

  return components.items.filter((item) => {
    if (item.isComingSoon) return false
    if (item.isDraft && !isDev) return false
    return true
  })
}

/**
 * Get coming soon components
 */
export function getComingSoonComponents(): NavItem[] {
  const components = docsNavigation.find((s) => s.slug === "components")
  if (!components) return []

  return (
    filterDraftItems([components])[0]?.items.filter(
      (item) => item.isComingSoon,
    ) ?? []
  )
}

/**
 * Get all components for display (available + coming soon, filtered by env)
 */
export function getComponentsForDisplay(): {
  available: NavItem[]
  comingSoon: NavItem[]
} {
  return {
    available: getAvailableComponents(),
    comingSoon: getComingSoonComponents(),
  }
}

/**
 * Get prev/next navigation items for a given path
 * Returns undefined for prev if at the start, undefined for next if at the end
 */
export function getPrevNextNavigation(pathname: string): {
  prev: NavItem | undefined
  next: NavItem | undefined
} {
  // Get all navigable items (flatten sections, exclude coming soon)
  const allItems = filterDraftItems(docsNavigation)
    .flatMap((section) => section.items)
    .filter((item) => !item.isComingSoon)

  // Find current index
  const currentIndex = allItems.findIndex((item) => item.href === pathname)

  if (currentIndex === -1) {
    return { prev: undefined, next: undefined }
  }

  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : undefined,
    next:
      currentIndex < allItems.length - 1
        ? allItems[currentIndex + 1]
        : undefined,
  }
}
