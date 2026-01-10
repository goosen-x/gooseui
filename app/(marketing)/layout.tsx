import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import { ScrollToTopProgress } from "@/registry/new-york/ui/scroll-to-top"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ScrollToTopProgress threshold={400} />
    </div>
  )
}
