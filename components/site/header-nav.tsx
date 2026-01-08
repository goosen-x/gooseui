"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const mainNav = [
  { href: "/docs", title: "Docs" },
  { href: "/docs/components", title: "Components" },
]

// Add Blocks only in development
if (process.env.NODE_ENV === "development") {
  mainNav.push({ href: "/docs/blocks", title: "Blocks" })
}

export function HeaderNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
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
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
