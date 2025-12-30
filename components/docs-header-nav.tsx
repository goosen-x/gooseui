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
import { getSlugTitle } from "@/lib/config/docs-navigation"

export function DocsHeaderNav() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Filter out locale segment (e.g., "en", "ru")
  const filteredSegments = segments.filter(
    (segment) => !["en", "ru"].includes(segment),
  )

  const breadcrumbs = filteredSegments.map((segment, index) => {
    const href = "/" + filteredSegments.slice(0, index + 1).join("/")
    const isLast = index === filteredSegments.length - 1
    const name = getSlugTitle(segment)

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
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
