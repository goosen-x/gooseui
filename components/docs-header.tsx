import { Suspense } from "react"
import { DocsHeaderNav } from "@/components/docs-header-nav"
import { GitHubStars } from "@/components/github-stars"
import { GitHubStarsSkeleton } from "@/components/github-stars-skeleton"
import { HeaderNav } from "@/components/site/header-nav"
import { LanguageSwitcher } from "@/components/site/language-switcher"
import { MobileNav } from "@/components/site/mobile-nav"
import { SiteSearch } from "@/components/site/site-search"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/lib/config/navigation"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden border-b bg-background [-webkit-backdrop-filter:blur(12px)_saturate(1.5)] [backdrop-filter:blur(12px)_saturate(1.5)] supports-[backdrop-filter]:bg-background/90 supports-[-webkit-backdrop-filter]:bg-background/90">
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
          {/* 1024–1279px: the sidebar takes 256px, so search and GitHub shrink to icons */}
          <HeaderNav className="lg:max-xl:space-x-4" />
          <div className="hidden lg:flex lg:max-xl:[&>button]:w-auto lg:max-xl:[&>button>span:not(:last-child)]:hidden">
            <SiteSearch />
          </div>
          <Suspense
            fallback={
              <GitHubStarsSkeleton className="hidden sm:flex lg:max-xl:min-w-0 lg:max-xl:[&>span]:hidden" />
            }
          >
            <GitHubStars
              owner="goosen-x"
              repo="gooseui"
              className="hidden sm:flex lg:max-xl:min-w-0 lg:max-xl:[&>span]:hidden"
            />
          </Suspense>
          <LanguageSwitcher className="hidden lg:inline-flex" />
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
