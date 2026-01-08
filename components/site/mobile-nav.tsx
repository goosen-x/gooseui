"use client"

import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  docsNavigation,
  filterDraftItems,
  type NavItem,
} from "@/lib/config/docs-navigation"
import { siteConfig } from "@/lib/config/navigation"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

const mainNav = [
  { href: "/docs", title: "Docs" },
  { href: "/docs/components", title: "Components" },
]

// Add Blocks only in development
if (process.env.NODE_ENV === "development") {
  mainNav.push({ href: "/docs/blocks", title: "Blocks" })
}

export function MobileNav() {
  const pathname = usePathname()
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
          aria-label="Open menu"
          className="flex size-9 cursor-pointer items-center justify-center rounded-md md:hidden hover:bg-accent"
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
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="h-px bg-border" />

          {/* Docs Navigation */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2 text-sm font-semibold">{section.title}</h4>
              <nav className="flex flex-col gap-1">
                {section.items.map((item: NavItem) => (
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
                    {item.title}
                    {item.isDraft && (
                      <Badge className="h-5 bg-orange-500 px-1.5 text-[10px] text-white">
                        Draft
                      </Badge>
                    )}
                    {item.isNew && !item.isDraft && (
                      <Badge className="h-5 bg-primary px-1.5 text-[10px] text-white">
                        New
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
