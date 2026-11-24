"use client"

import { useLocale } from "next-intl"
import type { Localized } from "@/i18n/dict"
import { pick } from "@/i18n/dict"
import { Link, usePathname } from "@/i18n/navigation"
import { BLOCKS_ENABLED } from "@/lib/config/features"
import { cn } from "@/lib/utils"

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

export function HeaderNav({ className }: { className?: string }) {
  const pathname = usePathname()
  const locale = useLocale()

  return (
    <nav
      className={cn(
        "hidden lg:flex items-center space-x-6 text-sm font-medium",
        className,
      )}
    >
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith(item.href)
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          {pick(item.title, locale)}
        </Link>
      ))}
    </nav>
  )
}
