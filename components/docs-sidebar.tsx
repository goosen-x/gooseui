"use client"

import { ChevronRight } from "lucide-react"
import { useLocale } from "next-intl"
import type * as React from "react"
import { ReviewStatusDot } from "@/components/docs/review-status-dot"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import type { Dict } from "@/i18n/dict"
import { pick } from "@/i18n/dict"
import { Link, usePathname } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { BLOCK_CATEGORIES } from "@/lib/config/blocks-categories"
import { countBlocksInCategory } from "@/lib/config/blocks-registry"
import {
  docsNavigation,
  filterDraftItems,
  groupNavItems,
  type NavItem,
  navTitle,
} from "@/lib/config/docs-navigation"
import { BLOCKS_ENABLED } from "@/lib/config/features"
import { Badge } from "@/registry/gooseui/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/gooseui/ui/collapsible"

const isDev = process.env.NODE_ENV === "development"

type ViewMode = "components" | "blocks"

const en = {
  components: "Components",
  blocks: "Blocks",
  allBlocks: "All Blocks",
  categories: "Categories",
  draft: "Draft",
  soon: "Soon",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    components: "Компоненты",
    blocks: "Блоки",
    allBlocks: "Все блоки",
    categories: "Категории",
    draft: "Черновик",
    soon: "Скоро",
  },
}

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const t = content[useLocale() as Locale]

  // Determine active view based on current path
  const isBlocksPath = BLOCKS_ENABLED && pathname.startsWith("/docs/blocks")
  const activeView: ViewMode = isBlocksPath ? "blocks" : "components"

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <img
                  src="/favicon/favicon.svg"
                  alt="GooseUI"
                  className="size-8 dark:invert"
                />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">GooseUI</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* View Switcher - Only show in development */}
        {isDev && BLOCKS_ENABLED && (
          <div className="px-2 pt-2">
            <div className="relative flex h-10 w-full items-center rounded-full bg-muted p-1 dark:bg-zinc-800">
              {/* Sliding indicator */}
              <div
                className={`absolute h-8 w-[calc(50%-4px)] rounded-full bg-primary transition-transform duration-300 ${
                  activeView === "blocks" && "translate-x-full"
                }`}
              />
              {/* Components option */}
              <Link
                href="/docs/components"
                className={`relative z-10 flex flex-1 items-center justify-center text-xs font-medium transition-colors duration-300 ${
                  activeView === "components"
                    ? "text-primary-foreground"
                    : "text-muted-foreground dark:text-white"
                }`}
              >
                {t.components}
              </Link>
              {/* Blocks option */}
              <Link
                href="/docs/blocks"
                className={`relative z-10 flex flex-1 items-center justify-center text-xs font-medium transition-colors duration-300 ${
                  activeView === "blocks"
                    ? "text-primary-foreground"
                    : "text-muted-foreground dark:text-white"
                }`}
              >
                {t.blocks}
              </Link>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {activeView === "components" ? (
          <ComponentsNav pathname={pathname} />
        ) : (
          <BlocksNav pathname={pathname} />
        )}
      </SidebarContent>
    </Sidebar>
  )
}

function ComponentsNav({ pathname }: { pathname: string }) {
  const locale = useLocale()
  // Filter out coming soon items and hide sections without items
  const filteredNavigation = filterDraftItems(docsNavigation)
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.isComingSoon),
    }))
    .filter((section) => section.items.length > 0)

  // Check if current path is in a section
  const isSectionActive = (section: (typeof filteredNavigation)[0]) =>
    section.items.some((item) => pathname === item.href)

  const renderItem = (item: NavItem, showIcon: boolean) => {
    const Icon = item.icon
    return (
      <SidebarMenuSubItem key={item.href}>
        <SidebarMenuSubButton asChild isActive={pathname === item.href}>
          <Link href={item.href} className="flex items-center gap-2">
            {showIcon && Icon && (
              <Icon className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="min-w-0 flex-1 truncate">
              {navTitle(item, locale)}
            </span>
            {isDev && <ReviewStatusDot status={item.reviewStatus} />}
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {filteredNavigation.map((section) => {
          const showIcon = section.slug === "getting-started"
          return (
            <Collapsible
              key={section.slug}
              asChild
              defaultOpen={
                isSectionActive(section) || section.slug === "getting-started"
              }
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {section.href ? (
                  <div className="flex h-8 items-center rounded-md hover:bg-sidebar-accent">
                    <Link
                      href={section.href}
                      className="flex h-full min-w-0 flex-1 cursor-pointer items-center px-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {pick(section.title, locale)}
                    </Link>
                    <CollapsibleTrigger
                      className="flex size-8 shrink-0 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-ring"
                      aria-label={`${pick(section.title, locale)} — ${locale === "ru" ? "раскрыть или свернуть" : "expand or collapse"}`}
                    >
                      <ChevronRight className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </div>
                ) : (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="font-medium cursor-pointer">
                      <span className="flex-1">
                        {pick(section.title, locale)}
                      </span>
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                )}
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {section.groups
                      ? groupNavItems(section.items, section.groups).map(
                          ({ group, items }) => (
                            <li key={group.id} className="list-none">
                              <div className="px-2 pt-2 pb-1 text-[11px] font-medium text-muted-foreground/70">
                                {pick(group.title, locale)}
                              </div>
                              <ul className="flex flex-col gap-1">
                                {items.map((item) => renderItem(item, false))}
                              </ul>
                            </li>
                          ),
                        )
                      : section.items.map((item) => renderItem(item, showIcon))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function BlocksNav({ pathname }: { pathname: string }) {
  const locale = useLocale()
  const t = content[locale as Locale]
  const isCategoryActive = BLOCK_CATEGORIES.some(
    (cat) => pathname === `/docs/blocks/${cat.slug}`,
  )

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {/* All Blocks link */}
        <SidebarMenuItem>
          <SidebarMenuButton
            className="font-medium"
            asChild
            isActive={pathname === "/docs/blocks"}
          >
            <Link href="/docs/blocks">{t.allBlocks}</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Categories */}
        <Collapsible
          asChild
          defaultOpen={isCategoryActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="font-medium cursor-pointer">
                <span className="flex-1">{t.categories}</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                {BLOCK_CATEGORIES.map((category) => {
                  const Icon = category.icon
                  const blockCount = countBlocksInCategory(category.slug)
                  const isActive = pathname === `/docs/blocks/${category.slug}`

                  return (
                    <SidebarMenuSubItem key={category.slug}>
                      <SidebarMenuSubButton asChild isActive={isActive}>
                        <Link
                          href={`/docs/blocks/${category.slug}`}
                          className="flex items-center gap-2"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">
                            {pick(category.name, locale)}
                          </span>
                          {category.isComingSoon ? (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0"
                            >
                              {t.soon}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              {blockCount}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
