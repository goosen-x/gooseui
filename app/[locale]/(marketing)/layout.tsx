import { setRequestLocale } from "next-intl/server"
import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import { ScrollToTopProgress } from "@/registry/gooseui/ui/scroll-to-top"

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Без этого серверная шапка читает язык из headers() и главная перестаёт быть статической
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ScrollToTopProgress threshold={400} />
    </div>
  )
}
