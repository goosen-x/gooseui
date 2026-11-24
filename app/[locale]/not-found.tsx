import { useLocale } from "next-intl"
import { SiteHeader } from "@/components/site/header"
import { SiteSearch } from "@/components/site/site-search"
import { ThemeCustomizer } from "@/components/theme-customizer"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"

const en = {
  title: "Page not found",
  description: "The page you are looking for doesn't exist or has been moved.",
  home: "Go home",
  docs: "Documentation",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Страница не найдена",
    description: "Такой страницы нет или её перенесли.",
    home: "На главную",
    docs: "Документация",
  },
}

export default function NotFound() {
  const t = content[useLocale() as Locale]
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-4 pt-8 pb-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            {/* Background - Cyan */}
            <h1 className="text-[16rem] font-bold leading-none tracking-tighter text-cyan-500/[0.03] select-none translate-x-1.5">
              404
            </h1>
            {/* Background - Red */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16rem] font-bold leading-none tracking-tighter text-red-500/[0.03] -translate-x-1.5">
                404
              </span>
            </div>
            {/* Background - Main */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16rem] font-bold leading-none tracking-tighter text-primary/10">
                404
              </span>
            </div>
            {/* Front - Cyan */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold tracking-tighter text-cyan-500/30 translate-x-[3px]">
                404
              </span>
            </div>
            {/* Front - Red */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold tracking-tighter text-red-500/30 -translate-x-[3px]">
                404
              </span>
            </div>
            {/* Front - Main */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold tracking-tighter text-foreground">
                404
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{t.title}</h2>
          <p className="max-w-md text-muted-foreground">{t.description}</p>
        </div>
        {/* Search */}
        <div className="w-full max-w-md flex justify-center">
          <SiteSearch />
        </div>

        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/">{t.home}</Link>
          </Button>
          <Button asChild>
            <Link href="/docs">{t.docs}</Link>
          </Button>
        </div>

        <ThemeCustomizer />
      </div>
    </>
  )
}
