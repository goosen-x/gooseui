"use client"

import { Menu } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import { LanguageSwitcher } from "@/components/site/language-switcher"
import type { Dict, Localized } from "@/i18n/dict"
import { pick } from "@/i18n/dict"
import { Link, usePathname } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import {
  docsNavigation,
  filterDraftItems,
  groupNavItems,
  type NavItem,
  navTitle,
} from "@/lib/config/docs-navigation"
import { BLOCKS_ENABLED } from "@/lib/config/features"
import { siteConfig } from "@/lib/config/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/gooseui/ui/sheet"

const en = {
  openMenu: "Open menu",
  draft: "Draft",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    openMenu: "Открыть меню",
    draft: "Черновик",
  },
}

const mainNav: { href: string; title: Localized }[] = [
  { href: "/docs", title: { en: "Docs", ru: "Документация" } },
  {
    href: "/docs/components",
    title: { en: "Components", ru: "Компоненты" },
  },
]

// Add Blocks only in development
if (BLOCKS_ENABLED) {
  mainNav.push({ href: "/docs/blocks", title: { en: "Blocks", ru: "Блоки" } })
}

export function MobileNav() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = content[locale as Locale]
  const [open, setOpen] = React.useState(false)

  // Filter out drafts in production, exclude Coming Soon, and remove empty sections
  const sections = React.useMemo(() => {
    const filtered = filterDraftItems(docsNavigation)
    return filtered
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => !item.isComingSoon),
      }))
      .filter((section) => section.items.length > 0)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={t.openMenu}
          className="flex size-9 cursor-pointer items-center justify-center rounded-md lg:hidden hover:bg-accent"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <img
                src="/favicon/favicon.svg"
                alt=""
                className="h-5 w-auto dark:invert"
              />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-4">
          {/* Main Navigation */}
          <nav className="flex flex-col gap-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname?.startsWith(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {pick(item.title, locale)}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher className="self-start" />

          <div className="h-px bg-border" />

          {/* Docs Navigation */}
          {sections.map((section) => (
            <div key={section.slug}>
              <h4 className="mb-2 text-sm font-semibold">
                {pick(section.title, locale)}
              </h4>
              <nav className="flex flex-col gap-1">
                {(section.groups
                  ? groupNavItems(section.items, section.groups)
                  : [{ group: null, items: section.items }]
                ).map(({ group, items }) => (
                  <React.Fragment key={group?.id ?? "all"}>
                    {group && (
                      <div className="pt-2 text-xs text-muted-foreground/70">
                        {pick(group.title, locale)}
                      </div>
                    )}
                    {items.map((item: NavItem) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2 text-sm transition-colors hover:text-foreground",
                          pathname === item.href
                            ? "font-medium text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {navTitle(item, locale)}
                        {item.isDraft && (
                          <Badge className="h-5 bg-orange-500 px-1.5 text-[10px] text-white">
                            {t.draft}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
