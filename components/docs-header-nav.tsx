"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import { pick } from "@/i18n/dict"
import { Link, usePathname } from "@/i18n/navigation"
import { getSlugTitle } from "@/lib/config/docs-navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/gooseui/ui/breadcrumb"

export function DocsHeaderNav() {
  const pathname = usePathname()
  const locale = useLocale()
  const segments = pathname.split("/").filter(Boolean)

  // Filter out locale segment (e.g., "en", "ru")
  const filteredSegments = segments.filter(
    (segment) => !["en", "ru"].includes(segment),
  )

  const breadcrumbs = filteredSegments.map((segment, index) => {
    const href = "/" + filteredSegments.slice(0, index + 1).join("/")
    const isLast = index === filteredSegments.length - 1
    const name = pick(getSlugTitle(segment), locale)

    return { href, name, isLast }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                <Link
                  href={crumb.href}
                  className="cursor-pointer transition-colors hover:text-foreground"
                >
                  {crumb.name}
                </Link>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
