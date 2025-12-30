import Link from "next/link"
import { Suspense } from "react"
import { GitHubStars } from "@/components/github-stars"
import { GitHubStarsSkeleton } from "@/components/github-stars-skeleton"
import { siteConfig } from "@/lib/config/navigation"
import { HeaderNav } from "./header-nav"
import { SiteSearch } from "./site-search"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/favicon/favicon.svg"
            alt=""
            className="h-5 w-auto dark:invert"
          />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <HeaderNav />
          <SiteSearch />
          <Suspense
            fallback={<GitHubStarsSkeleton className="hidden sm:flex" />}
          >
            <GitHubStars
              owner="goosen-x"
              repo="gooseui"
              className="hidden sm:flex"
            />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
