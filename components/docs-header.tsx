import { Suspense } from "react"
import { DocsHeaderNav } from "@/components/docs-header-nav"
import { GitHubStars } from "@/components/github-stars"
import { GitHubStarsSkeleton } from "@/components/github-stars-skeleton"
import { HeaderNav } from "@/components/site/header-nav"
import { SiteSearch } from "@/components/site/site-search"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        <DocsHeaderNav />
        <div className="flex flex-1 items-center justify-end space-x-6">
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
