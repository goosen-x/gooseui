"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type * as React from "react"
import { Badge } from "@/components/ui/badge"
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

export function BlocksSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const categories = BLOCK_CATEGORIES

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
                  <span className="text-xs text-muted-foreground">Blocks</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {/* All Blocks link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                className="font-medium"
                asChild
                isActive={pathname === "/blocks"}
              >
                <Link href="/blocks">All Blocks</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Categories */}
            <SidebarMenuItem>
              <SidebarMenuButton className="font-medium">
                Categories
              </SidebarMenuButton>
              <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                {categories.map((category) => {
                  const Icon = category.icon
                  const blockCount = countBlocksInCategory(category.slug)
                  const isActive = pathname === `/blocks/${category.slug}`

                  return (
                    <SidebarMenuSubItem key={category.slug}>
                      <SidebarMenuSubButton asChild isActive={isActive}>
                        <Link
                          href={`/blocks/${category.slug}`}
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
            </SidebarMenuItem>

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
      </SidebarContent>
    </Sidebar>
  )
}
