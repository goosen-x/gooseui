import Link from "next/link"
import { Suspense } from "react"
import { DocsHeaderNav } from "@/components/docs-header-nav"
import { GitHubStars } from "@/components/github-stars"
import { GitHubStarsSkeleton } from "@/components/github-stars-skeleton"
import { HeaderNav } from "@/components/site/header-nav"
import { MobileNav } from "@/components/site/mobile-nav"
import { SiteSearch } from "@/components/site/site-search"
import { siteConfig } from "@/lib/config/navigation"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Main header row */}
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        {/* Logo - visible when sidebar is hidden (<1024px) */}
        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <img
            src="/favicon/favicon.svg"
            alt=""
            className="h-5 w-auto dark:invert"
          />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        {/* Breadcrumbs - visible only on large screens (≥1440px) */}
        <div className="hidden min-[1440px]:block">
          <DocsHeaderNav />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <HeaderNav />
          <div className="hidden lg:flex">
            <SiteSearch />
          </div>
          <Suspense
            fallback={<GitHubStarsSkeleton className="hidden sm:flex" />}
          >
            <GitHubStars
              owner="goosen-x"
              repo="gooseui"
              className="hidden sm:flex"
            />
          </Suspense>
          <MobileNav />
        </div>
      </div>

      {/* Breadcrumbs row - visible below 1440px */}
      <div className="mx-auto max-w-screen-2xl border-t px-4 py-2 md:px-8 min-[1440px]:hidden">
        <DocsHeaderNav />
      </div>
    </header>
  )
}
