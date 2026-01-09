"use client"

import { usePathname } from "next/navigation"
import * as React from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  title: string
  level: number
}

export function TableOfContents() {
  const pathname = usePathname()
  const [headings, setHeadings] = React.useState<TocItem[]>([])
  const [activeId, setActiveId] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(true)
    // Use requestAnimationFrame for faster detection
    const detectHeadings = () => {
      const elements = document.querySelectorAll("h2[id], h3[id]")
      if (elements.length > 0) {
        const seen = new Set<string>()
        const items: TocItem[] = Array.from(elements)
          .map((element) => ({
            id: element.id,
            title: element.textContent || "",
            level: element.tagName === "H2" ? 2 : 3,
          }))
          .filter((item) => {
            // Deduplicate by id
            if (seen.has(item.id)) return false
            seen.add(item.id)
            return true
          })
        setHeadings(items)
        setActiveId(items[0].id)
        setIsLoading(false)
      } else {
        // Retry on next frame if not found
        requestAnimationFrame(detectHeadings)
      }
    }
    requestAnimationFrame(detectHeadings)
  }, [pathname])

  React.useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0% -80% 0%",
        threshold: 0,
      },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  const [isScrolling, setIsScrolling] = React.useState(false)

  const scrollToTop = () => {
    setIsScrolling(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => setIsScrolling(false), 600)
  }

  // Generate GitHub edit URL based on current path
  const getGitHubEditUrl = () => {
    const basePath = "https://github.com/goosen-x/gooseui/edit/main/app/(docs)"
    // /docs -> /docs/page.tsx
    // /docs/components -> /docs/components/page.tsx
    // /docs/components/button -> /docs/components/button/page.tsx
    return `${basePath}${pathname}/page.tsx`
  }

  if (!isLoading && headings.length === 0) {
    return null
  }

  return (
    <nav className="order-last hidden w-56 shrink-0 xl:block sticky top-36 min-[1440px]:top-24 h-fit self-start">
      <div className="max-h-[calc(100vh-9rem)] min-[1440px]:max-h-[calc(100vh-6rem)]">
        <div className="text-foreground mb-2 text-sm font-medium">
          On this page
        </div>
        <div className="relative">
          <ul className="styled-scrollbar max-h-[70vh] space-y-2 overflow-y-auto py-1 text-sm">
            {isLoading ? (
              <>
                <li className="h-4 w-24 animate-pulse rounded bg-muted" />
                <li className="h-4 w-32 animate-pulse rounded bg-muted" />
                <li className="h-4 w-20 animate-pulse rounded bg-muted" />
              </>
            ) : (
              headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById(heading.id)
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" })
                        setActiveId(heading.id)
                      }
                    }}
                    className={cn(
                      "block leading-relaxed transition-colors hover:text-foreground",
                      heading.level === 3 && "pl-3",
                      activeId === heading.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground",
                    )}
                  >
                    {heading.title}
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="mt-4 space-y-2 border-t pt-4 text-sm">
          {isLoading ? (
            <>
              <div className="h-4 w-36 animate-pulse rounded bg-muted" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </>
          ) : (
            <>
              <a
                href={getGitHubEditUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
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
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                type="button"
              >
                Scroll to top
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="overflow-visible"
                >
                  {/* Circle */}
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    className={cn(
                      "stroke-current stroke-[1.5]",
                      "transition-all duration-500 ease-out",
                      "[stroke-dasharray:63]",
                      isScrolling
                        ? "[stroke-dashoffset:0]"
                        : "[stroke-dashoffset:63]",
                    )}
                  />
                  {/* Arrow */}
                  <path
                    d="M12 16V8M8 12l4-4 4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      "stroke-current stroke-[1.5]",
                      "transition-all duration-500 ease-out",
                      "[stroke-dasharray:20]",
                      isScrolling
                        ? "[stroke-dashoffset:0]"
                        : "[stroke-dashoffset:20]",
                    )}
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
