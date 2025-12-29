"use client"

import * as React from "react"
import { Link, usePathname } from "@/i18n/routing"
import { useTranslations } from "next-intl"

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

type NavItem = {
  titleKey: string
  href: string
  isNew?: boolean
}

type NavSection = {
  titleKey: string
  href?: string // Link for section header
  items: NavItem[]
}

const docsNavConfig: NavSection[] = [
  {
    titleKey: "gettingStarted",
    items: [
      { titleKey: "introduction", href: "/docs" },
      { titleKey: "installation", href: "/docs/installation" },
      { titleKey: "cli", href: "/docs/cli" },
    ],
  },
  {
    titleKey: "components",
    href: "/docs/components",
    items: [
      { titleKey: "animatedTimer", href: "/docs/components/animated-timer", isNew: true },
      { titleKey: "button", href: "/docs/components/button" },
      { titleKey: "card", href: "/docs/components/card" },
      { titleKey: "input", href: "/docs/components/input" },
    ],
  },
  {
    titleKey: "effects",
    items: [
      { titleKey: "borderBeam", href: "/docs/effects/border-beam", isNew: true },
    ],
  },
]

const itemTitles: Record<string, string> = {
  animatedTimer: "Animated Timer",
  button: "Button",
  card: "Card",
  input: "Input",
  borderBeam: "Border Beam",
}

export function DocsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const t = useTranslations("navigation")

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
            {docsNavConfig.map((section) => (
              <SidebarMenuItem key={section.titleKey}>
                {section.href ? (
                  <SidebarMenuButton className="font-medium" asChild>
                    <Link href={section.href}>{t(section.titleKey)}</Link>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton className="font-medium">
                    {t(section.titleKey)}
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
                            {itemTitles[item.titleKey] || t(item.titleKey)}
                            {item.isNew && (
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
