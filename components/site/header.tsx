import Link from "next/link"
import { GitHubStars } from "@/components/github-stars"
import { siteConfig } from "@/lib/config/navigation"
import { getGitHubStars } from "@/lib/github"
import { HeaderNav } from "./header-nav"
import { MobileNav } from "./mobile-nav"
import { SiteSearch } from "./site-search"

export async function SiteHeader() {
  const stars = await getGitHubStars("goosen-x", "gooseui")

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
          <div className="hidden md:flex">
            <SiteSearch />
          </div>
          <GitHubStars
            owner="goosen-x"
            repo="gooseui"
            initialStars={stars}
            className="hidden sm:flex"
          />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
