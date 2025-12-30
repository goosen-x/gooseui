"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

const pathNames: Record<string, string> = {
  docs: "Docs",
  components: "Components",
  effects: "Effects",
  installation: "Installation",
  cli: "CLI",
  "animated-timer": "Animated Timer",
  button: "Button",
  card: "Card",
  input: "Input",
  toast: "Toast",
  "border-beam": "Border Beam",
}

const mainNav = [
  { href: "/docs", title: "Docs" },
  { href: "/docs/components/button", title: "Components" },
  { href: "/docs/effects/border-beam", title: "Effects" },
]

export function DocsHeaderNav() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const isLast = index === segments.length - 1
    const name = pathNames[segment] || segment

    return { href, name, isLast }
  })

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
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
    </>
  )
}
