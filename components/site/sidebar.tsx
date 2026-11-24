"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
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
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"

const en = { new: "New" }
const content: Dict<typeof en> = {
  en,
  ru: { new: "Новое" },
}

export function DocsSidebar() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = content[locale as Locale]

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
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8">
        <nav className="w-full">
          {sections.map((section) => (
            <div key={section.slug} className="pb-4">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {pick(section.title, locale)}
              </h4>
              {(section.groups
                ? groupNavItems(section.items, section.groups)
                : [{ group: null, items: section.items }]
              ).map(({ group, items }) => (
                <div
                  key={group?.id ?? "all"}
                  className="grid grid-flow-row auto-rows-max text-sm"
                >
                  {group && (
                    <div className="px-2 pt-2 pb-1 text-xs text-muted-foreground/70">
                      {pick(group.title, locale)}
                    </div>
                  )}
                  {items.map((item: NavItem) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex w-full cursor-pointer items-center gap-2 rounded-md border border-transparent px-2 py-1 hover:underline",
                        pathname === item.href
                          ? "font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {navTitle(item, locale)}
                      {item.isNew && !item.isDraft && (
                        <Badge className="h-5 bg-primary px-1.5 text-[10px] text-white">
                          {t.new}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
