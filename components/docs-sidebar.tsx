"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type * as React from "react"

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
import {
  docsNavigation,
  filterDraftItems,
} from "@/lib/config/docs-navigation"

const isDev = process.env.NODE_ENV === "development"

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {filterDraftItems(docsNavigation).map((section) => (
              <SidebarMenuItem key={section.title}>
                {section.href ? (
                  <SidebarMenuButton className="font-medium" asChild>
                    <Link href={section.href}>{section.title}</Link>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton className="font-medium">
                    {section.title}
                  </SidebarMenuButton>
                )}
                {section.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {section.items.map((item) => (
                      <SidebarMenuSubItem key={item.href}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === item.href}
                        >
                          <Link href={item.href}>
                            {item.title}
                            {item.isDraft && isDev && (
                              <span className="ml-auto text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full">
                                DRAFT
                              </span>
                            )}
                            {item.isNew && !item.isDraft && (
                              <span className="ml-auto text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                                NEW
                              </span>
                            )}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
