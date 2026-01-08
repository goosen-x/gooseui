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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Main header row */}
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        {/* Logo - visible on mobile */}
        <Link href="/" className="flex items-center gap-2 md:hidden">
          <img
            src="/favicon/favicon.svg"
            alt=""
            className="h-5 w-auto dark:invert"
          />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        {/* Breadcrumbs - hidden on mobile */}
        <div className="hidden md:block">
          <DocsHeaderNav />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <HeaderNav />
          <div className="hidden md:flex">
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

      {/* Breadcrumbs row - mobile only */}
      <div className="border-t px-4 py-2 md:hidden">
        <DocsHeaderNav />
      </div>
    </header>
  )
}
