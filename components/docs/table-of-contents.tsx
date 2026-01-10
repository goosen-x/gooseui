"use client"

import { usePathname } from "next/navigation"
import * as React from "react"
import { cn } from "@/lib/utils"
import { useToc } from "./toc-context"

// Hook to track active heading using IntersectionObserver (shadcn pattern)
function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (itemIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" },
    )

    itemIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

export function TableOfContents() {
  const pathname = usePathname()
  const { items: headings } = useToc()

  // Memoize item IDs for IntersectionObserver
  const itemIds = React.useMemo(() => headings.map((h) => h.id), [headings])

  const activeId = useActiveItem(itemIds)

  // Generate GitHub edit URL
  const getGitHubEditUrl = () => {
    const basePath = "https://github.com/goosen-x/gooseui/edit/main/app/(docs)"
    return `${basePath}${pathname}/page.tsx`
  }

  // Handle smooth scroll
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", `#${id}`)
    }
  }

  // Skeleton while loading
  if (headings.length === 0) {
    return (
      <nav className="order-last hidden w-56 shrink-0 xl:block sticky top-36 min-[1440px]:top-24 h-fit self-start">
        <div className="max-h-[calc(100vh-9rem)] min-[1440px]:max-h-[calc(100vh-6rem)]">
          <p className="mb-2 text-sm font-medium">On This Page</p>
          <div className="space-y-2 py-1">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="order-last hidden w-56 shrink-0 xl:block sticky top-36 min-[1440px]:top-24 h-fit self-start">
      <div className="max-h-[calc(100vh-9rem)] min-[1440px]:max-h-[calc(100vh-6rem)]">
        <p className="mb-2 text-sm font-medium">On This Page</p>
        <ul className="styled-scrollbar max-h-[70vh] space-y-2 overflow-y-auto py-1 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                data-active={activeId === heading.id}
                data-depth={heading.level}
                className={cn(
                  "block text-[0.8rem] no-underline transition-colors cursor-pointer",
                  "text-muted-foreground hover:text-foreground",
                  "data-[active=true]:text-foreground data-[active=true]:font-medium",
                  "data-[depth=3]:pl-4 data-[depth=4]:pl-6",
                )}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t pt-4">
          <a
            href={getGitHubEditUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            Edit this page on GitHub
            <svg
              height="16"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              width="16"
              className="inline-block"
              style={{ color: "currentcolor" }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 9.75V11.25C11.5 11.3881 11.3881 11.5 11.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25L4.5 4.75C4.5 4.61193 4.61193 4.5 4.75 4.5H6.25H7V3H6.25H4.75C3.7835 3 3 3.7835 3 4.75V11.25C3 12.2165 3.7835 13 4.75 13H11.25C12.2165 13 13 12.2165 13 11.25V9.75V9H11.5V9.75ZM8.5 3H9.25H12.2495C12.6637 3 12.9995 3.33579 12.9995 3.75V6.75V7.5H11.4995V6.75V5.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L10.4388 4.5H9.25H8.5V3Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
