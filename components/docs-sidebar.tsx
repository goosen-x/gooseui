"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
import { BLOCK_CATEGORIES } from "@/lib/config/blocks-categories"
import { countBlocksInCategory } from "@/lib/config/blocks-registry"
import { docsNavigation, filterDraftItems } from "@/lib/config/docs-navigation"

const isDev = process.env.NODE_ENV === "development"

type ViewMode = "components" | "blocks"

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Determine active view based on current path
  const isBlocksPath = pathname.startsWith("/docs/blocks")
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
        {isDev && (
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
                    ? "text-white"
                    : "text-muted-foreground dark:text-white"
                }`}
              >
                Components
              </Link>
              {/* Blocks option */}
              <Link
                href="/docs/blocks"
                className={`relative z-10 flex flex-1 items-center justify-center text-xs font-medium transition-colors duration-300 ${
                  activeView === "blocks"
                    ? "text-white"
                    : "text-muted-foreground dark:text-white"
                }`}
              >
                Blocks
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
  // Filter out coming soon items from navigation
  const filteredNavigation = filterDraftItems(docsNavigation).map(
    (section) => ({
      ...section,
      items: section.items.filter((item) => !item.isComingSoon),
    }),
  )

  // Check if current path is in a section
  const isSectionActive = (section: typeof filteredNavigation[0]) =>
    section.items.some((item) => pathname === item.href)

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {filteredNavigation.map((section) => (
          <Collapsible
            key={section.title}
            asChild
            defaultOpen={isSectionActive(section) || section.slug === "getting-started"}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="font-medium cursor-pointer">
                  {section.href ? (
                    <Link href={section.href} className="flex-1">
                      {section.title}
                    </Link>
                  ) : (
                    <span className="flex-1">{section.title}</span>
                  )}
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {section.items?.length ? (
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {section.items.map((item) => {
                      const Icon = item.icon
                      const showIcon = section.slug === "getting-started"
                      return (
                        <SidebarMenuSubItem key={item.href}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === item.href}
                          >
                            <Link href={item.href} className="flex items-center gap-2">
                              {showIcon && Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                              <span className="flex-1">{item.title}</span>
                              {item.isDraft && isDev && (
                                <Badge variant="draft">Draft</Badge>
                              )}
                              {item.isExperimental && !item.isDraft && (
                                <Badge variant="experimental">Exp</Badge>
                              )}
                              {item.isNew && !item.isDraft && !item.isExperimental && (
                                <Badge variant="beta">New</Badge>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function BlocksNav({ pathname }: { pathname: string }) {
  const isCategoryActive = BLOCK_CATEGORIES.some(
    (cat) => pathname === `/docs/blocks/${cat.slug}`
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
            <Link href="/docs/blocks">All Blocks</Link>
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
                <span className="flex-1">Categories</span>
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
                          <span className="flex-1">{category.name}</span>
                          {category.isComingSoon ? (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0"
                            >
                              Soon
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

        {/* Pricing link */}
        <SidebarMenuItem>
          <SidebarMenuButton
            className="font-medium"
            asChild
            isActive={pathname === "/pricing"}
          >
            <Link href="/pricing">Pricing</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
