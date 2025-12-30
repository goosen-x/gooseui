import { Suspense } from "react"
import { DocsHeaderNav } from "@/components/docs-header-nav"
import { GitHubStars } from "@/components/github-stars"
import { GitHubStarsSkeleton } from "@/components/github-stars-skeleton"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <DocsHeaderNav />
        <Suspense
          fallback={<GitHubStarsSkeleton className="hidden sm:flex ml-6" />}
        >
          <GitHubStars
            owner="goosen-x"
            repo="gooseui"
            className="hidden sm:flex ml-6"
          />
        </Suspense>
      </div>
    </header>
  )
}
