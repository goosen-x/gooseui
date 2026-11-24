"use client"

import {
  ArrowRight,
  ChevronDown,
  Menu as MenuIcon,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/registry/gooseui/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/gooseui/ui/dropdown-menu"
import { MegaMenu } from "@/registry/gooseui/ui/mega-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/registry/gooseui/ui/sheet"

/* -------------------------------------------------------------------------- */
/* Types and default data. Replace the data through props in your app.        */
/* -------------------------------------------------------------------------- */

export interface HeaderMagazineArticle {
  slug: string
  title: string
}

export interface HeaderMagazineCategory {
  slug: string
  name: string
  articles?: HeaderMagazineArticle[]
}

export interface HeaderMagazineLink {
  label: string
  href: string
}

export interface HeaderMagazineLinkProps {
  href: string
  className?: string
  children: React.ReactNode
  role?: string
  tabIndex?: number
}

export interface HeaderMagazineLabels {
  home: string
  categories: string
  formats: string
  more: string
  subscribe: string
  toggleTheme: string
  search: string
  closeSearch: string
  searchPlaceholder: string
  searchHint: string
  openMenu: string
  closeMenu: string
  menuTitle: string
  goToSection: string
}

export interface HeaderMagazineProps {
  /** Brand name shown as `first ■ second`. */
  brand?: [string, string]
  categories?: HeaderMagazineCategory[]
  /** Plain links in the desktop bar, between categories and formats. */
  featuredLinks?: HeaderMagazineLink[]
  formatLinks?: HeaderMagazineLink[]
  moreLinks?: HeaderMagazineLink[]
  labels?: Partial<HeaderMagazineLabels>
  /** Accent color for the brand mark and the subscribe button. */
  brandColor?: string
  onSubscribe?: () => void
  /** Render links with your router's link component. */
  renderLink?: (props: HeaderMagazineLinkProps) => React.ReactNode
}

const DEFAULT_LABELS: HeaderMagazineLabels = {
  home: "Home",
  categories: "Sections",
  formats: "Formats",
  more: "More",
  subscribe: "Subscribe",
  toggleTheme: "Toggle theme",
  search: "Search",
  closeSearch: "Close search",
  searchPlaceholder: "Search articles...",
  searchHint: "Start typing and suggestions will appear here.",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Navigation menu",
  goToSection: "Go to section",
}

const DEFAULT_CATEGORIES: HeaderMagazineCategory[] = [
  {
    slug: "news",
    name: "News",
    articles: [
      {
        slug: "central-bank-rate",
        title: "Central bank holds the key rate: what it means for business",
      },
      { slug: "tax-reform-2026", title: "Tax reform 2026: the main changes" },
      {
        slug: "import-substitution",
        title: "Import substitution: results of the year and forecasts",
      },
      {
        slug: "labour-market",
        title: "Labour market: talent shortage in IT and industry",
      },
    ],
  },
  {
    slug: "business",
    name: "Business",
    articles: [
      {
        slug: "scaling-startup",
        title: "How to scale a startup without losing control",
      },
      {
        slug: "family-business",
        title: "Family business: handing over to the second generation",
      },
      { slug: "b2b-sales", title: "B2B sales: the deal cycle has halved" },
      {
        slug: "franchise-2026",
        title: "Franchises 2026: where investors are looking",
      },
    ],
  },
  {
    slug: "opinions",
    name: "Opinions",
    articles: [
      {
        slug: "ai-replacing-managers",
        title: "AI will replace middle managers, says a CEO",
      },
      {
        slug: "remote-work-end",
        title: "Remote work is over: why companies call people back",
      },
      {
        slug: "esg-trap",
        title: "The ESG trap: the illusion of sustainability",
      },
    ],
  },
  {
    slug: "management",
    name: "Management",
    articles: [
      { slug: "okr-vs-kpi", title: "OKR vs KPI: what to pick in 2026" },
      {
        slug: "flat-structure",
        title: "Flat structures: myth or working model",
      },
      {
        slug: "1on1-meetings",
        title: "1:1 meetings: turning routine into a growth tool",
      },
    ],
  },
  {
    slug: "marketing",
    name: "Marketing",
    articles: [
      { slug: "tiktok-b2b", title: "TikTok for B2B: company case studies" },
      {
        slug: "performance-marketing",
        title: "Performance marketing after Google Ads",
      },
      {
        slug: "brand-platform",
        title: "Brand platform: why it matters in the AI era",
      },
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    articles: [
      {
        slug: "cfo-toolkit-2026",
        title: "CFO toolkit 2026: what belongs in the stack",
      },
      {
        slug: "cash-flow-crisis",
        title: "Cash flow in a crisis: 5 survival rules",
      },
      { slug: "ipo-russia", title: "IPO on the exchange: the window is open" },
    ],
  },
  {
    slug: "career",
    name: "Career and growth",
    articles: [
      { slug: "skills-2026", title: "Top 10 skills of 2026" },
      { slug: "career-pivot", title: "Changing career at 40+: real stories" },
      {
        slug: "soft-skills-ai",
        title: "Soft skills in the AI era: what becomes key",
      },
    ],
  },
  {
    slug: "investments",
    name: "Investments",
    articles: [
      {
        slug: "private-equity",
        title: "Private equity: who invests and where",
      },
      {
        slug: "venture-2026",
        title: "Venture market 2026: trends and segments",
      },
      {
        slug: "bonds-vs-stocks",
        title: "Bonds vs stocks: where to earn in 2026",
      },
    ],
  },
]

const DEFAULT_FEATURED: HeaderMagazineLink[] = [
  { label: "Special projects", href: "/special" },
  { label: "Video", href: "/video" },
]

const DEFAULT_FORMATS: HeaderMagazineLink[] = [
  { label: "News", href: "/news" },
  { label: "Longreads", href: "/longreads" },
  { label: "Interviews", href: "/interview" },
  { label: "Video", href: "/video" },
  { label: "Special projects", href: "/special" },
]

const DEFAULT_MORE: HeaderMagazineLink[] = [
  { label: "Useful materials", href: "/useful" },
  { label: "Tools", href: "/tools" },
  { label: "All sections", href: "/all-sections" },
]

const DEFAULT_BRAND_COLOR = "#00dd53"

const defaultRenderLink = ({ children, ...props }: HeaderMagazineLinkProps) => (
  <a {...props}>{children}</a>
)

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function HeaderMagazine({
  brand = ["Business", "Partner"],
  categories = DEFAULT_CATEGORIES,
  featuredLinks = DEFAULT_FEATURED,
  formatLinks = DEFAULT_FORMATS,
  moreLinks = DEFAULT_MORE,
  labels: labelsProp,
  brandColor = DEFAULT_BRAND_COLOR,
  onSubscribe,
  renderLink = defaultRenderLink,
}: HeaderMagazineProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsProp }
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> }
    }
    if (doc.startViewTransition) {
      doc.startViewTransition(() => setTheme(next))
    } else {
      setTheme(next)
    }
  }

  const brandMark = (small?: boolean) => (
    <span
      className={cn(
        "flex items-center gap-2 font-black uppercase tracking-[-0.02em] text-foreground",
        small ? "text-[1.125rem] leading-6" : "text-[1.25rem] leading-7",
      )}
    >
      {brand[0]}
      <span
        aria-hidden="true"
        className={cn(
          "inline-block rounded-[2px]",
          small ? "size-2.5" : "size-3",
        )}
        style={{ backgroundColor: brandColor }}
      />
      {brand[1]}
    </span>
  )

  const megaCategories = categories.map((cat) => ({
    id: cat.slug,
    label: cat.name,
    links: (cat.articles ?? []).slice(0, 4).map((article) => ({
      label: article.title,
      href: `/${cat.slug}/${article.slug}`,
    })),
    footer: renderLink({
      href: `/${cat.slug}`,
      className:
        "inline-flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors hover:opacity-80",
      children: (
        <>
          {labels.goToSection}
          <ArrowRight className="size-3.5" />
        </>
      ),
    }),
  }))

  const barLink =
    "inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50"

  const iconButton =
    "cursor-pointer flex items-center justify-center p-2 rounded-full border border-foreground/15 text-foreground transition-colors duration-300 ease-in-out hover:border-[#00dd53]/40 hover:text-[#00dd53]/70"

  const subscribeStyle = { backgroundColor: brandColor }

  const simpleMenu = (title: string, links: HeaderMagazineLink[]) => (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(barLink, "gap-1")}>
        {title}
        <ChevronDown aria-hidden="true" className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 p-1">
        {links.map((link) => (
          <React.Fragment key={link.label}>
            {renderLink({
              href: link.href,
              role: "menuitem",
              tabIndex: -1,
              className:
                "block cursor-pointer rounded-md p-3 text-[0.9375rem] leading-5 font-bold text-foreground outline-none transition-colors hover:bg-foreground/5 focus:bg-foreground/5",
              children: link.label,
            })}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const mobileTitle = (title: string, index: number) => (
    <p
      key={title}
      className={cn(
        "px-4 pb-2 text-[0.6875rem] leading-4 font-bold uppercase tracking-[0.05em] text-foreground/56",
        index === 0 ? "pt-4" : "pt-6",
      )}
    >
      {title}
    </p>
  )

  const mobileLink = (key: string, href: string, label: string) => (
    <SheetClose key={key} asChild>
      {renderLink({
        href,
        className:
          "flex items-center px-4 py-3 text-[1rem] leading-5 tracking-[-0.01em] text-foreground cursor-pointer hover:bg-foreground/5 hover:text-[#00dd53] transition-colors",
        children: label,
      })}
    </SheetClose>
  )

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-foreground/10 backdrop-blur-md bg-background/80">
        <div className="flex items-center justify-between px-4 py-3 md:px-8 lg:px-12 lg:py-4">
          {renderLink({
            href: "/",
            className: "flex items-center cursor-pointer",
            children: (
              <>
                <span className="sr-only">{labels.home}</span>
                {brandMark()}
              </>
            ),
          })}

          {/* Desktop nav */}
          <nav className="hidden min-[1240px]:flex flex-1 items-center justify-center gap-1">
            <MegaMenu
              categories={megaCategories}
              layout="columns"
              labels={{ trigger: labels.categories }}
              renderLink={(_link, props) =>
                renderLink({
                  href: props.href,
                  className: props.className,
                  children: props.children,
                })
              }
            />
            {featuredLinks.map((link) => (
              <React.Fragment key={link.label}>
                {renderLink({
                  href: link.href,
                  className: barLink,
                  children: link.label,
                })}
              </React.Fragment>
            ))}
            {simpleMenu(labels.formats, formatLinks)}
            {simpleMenu(labels.more, moreLinks)}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              type="button"
              className={iconButton}
              aria-label={labels.toggleTheme}
              onClick={toggleTheme}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>

            <button
              type="button"
              className={iconButton}
              aria-label={labels.search}
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-4" />
            </button>

            <button
              type="button"
              className="hidden md:block px-4 py-3 lg:py-4 text-[0.6875rem] leading-4 tracking-[-0.01em] whitespace-nowrap font-bold text-black rounded-[0.375rem] transition-[filter] duration-300 hover:brightness-95 cursor-pointer"
              style={subscribeStyle}
              onClick={onSubscribe}
            >
              {labels.subscribe}
            </button>

            <button
              type="button"
              className="min-[1240px]:hidden cursor-pointer text-foreground transition-colors duration-300 ease-in-out hover:text-[#00dd53]/70"
              onClick={() => setMenuOpen(true)}
              aria-label={labels.openMenu}
              aria-expanded={menuOpen}
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="min-[1240px]:hidden w-[85vw] max-w-sm gap-0"
        >
          <SheetTitle className="sr-only">{labels.menuTitle}</SheetTitle>

          <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10">
            <SheetClose asChild>
              {renderLink({
                href: "/",
                className: "flex items-center cursor-pointer",
                children: (
                  <>
                    <span className="sr-only">{labels.home}</span>
                    {brandMark(true)}
                  </>
                ),
              })}
            </SheetClose>
            <SheetClose asChild>
              <button
                type="button"
                className="cursor-pointer size-9 -mr-2 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                aria-label={labels.closeMenu}
              >
                <X className="size-6 text-foreground" />
              </button>
            </SheetClose>
          </div>

          <nav className="flex-1 overflow-y-auto py-2">
            {mobileTitle(labels.categories, 0)}
            {categories.map((cat) =>
              mobileLink(cat.slug, `/${cat.slug}`, cat.name),
            )}
            {mobileTitle(labels.formats, 1)}
            {formatLinks.map((link) =>
              mobileLink(link.label, link.href, link.label),
            )}
            {mobileTitle(labels.more, 2)}
            {moreLinks.map((link) =>
              mobileLink(link.label, link.href, link.label),
            )}
          </nav>

          <div className="p-4 border-t border-foreground/10">
            <button
              type="button"
              className="cursor-pointer w-full rounded-[0.375rem] px-4 py-4 text-[0.75rem] leading-4 tracking-[-0.01em] uppercase font-bold text-black"
              style={subscribeStyle}
              onClick={onSubscribe}
            >
              {labels.subscribe}
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Search overlay (stub) */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-2xl p-6 sm:max-w-2xl"
        >
          <DialogTitle className="sr-only">{labels.search}</DialogTitle>
          <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
            <Search className="size-5 text-foreground/56" />
            <input
              type="search"
              placeholder={labels.searchPlaceholder}
              className="flex-1 bg-transparent text-[1rem] leading-6 text-foreground placeholder:text-foreground/40 outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="cursor-pointer size-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
              aria-label={labels.closeSearch}
            >
              <X className="size-4 text-foreground" />
            </button>
          </div>
          <p className="text-[0.875rem] leading-5 text-foreground/56">
            {labels.searchHint}
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}
