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
        const items: TocItem[] = Array.from(elements).map((element) => ({
          id: element.id,
          title: element.textContent || "",
          level: element.tagName === "H2" ? 2 : 3,
        }))
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isLoading && headings.length === 0) {
    return null
  }

  return (
    <nav className="order-last hidden w-56 shrink-0 lg:block">
      <div className="sticky top-[100px] h-[calc(100vh-120px)]">
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
                href="https://github.com/goosen-x/gooseui"
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
                className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                type="button"
              >
                Scroll to top
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
                    d="M7.25 10.75V11.5H8.75V10.75V6.56066L10.2197 8.03033L10.75 8.56066L11.8107 7.5L11.2803 6.96967L8.53033 4.21967C8.23744 3.92678 7.76256 3.92678 7.46967 4.21967L4.71967 6.96967L4.18934 7.5L5.25 8.56066L5.78033 8.03033L7.25 6.56066V10.75ZM14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                    fill="currentColor"
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
