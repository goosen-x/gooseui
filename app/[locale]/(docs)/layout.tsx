import dynamic from "next/dynamic"
import { setRequestLocale } from "next-intl/server"
import { DocsContentWrapper } from "@/components/docs/docs-content-wrapper"
import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"
import { ThemeCustomizerToolbar } from "@/components/theme-customizer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ScrollToTopText } from "@/registry/gooseui/ui/scroll-to-top"

const ReviewPanel =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("@/components/docs/review-panel"))
    : null

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        <DocsHeader />
        <div
          className="flex-1 px-6 py-6 pb-24 lg:px-8 lg:py-8 lg:pb-24"
          style={
            process.env.NODE_ENV === "development"
              ? { paddingBottom: "16rem" }
              : undefined
          }
        >
          <DocsContentWrapper>{children}</DocsContentWrapper>
        </div>
      </SidebarInset>
      {ReviewPanel && <ReviewPanel />}
      <ThemeCustomizerToolbar className="max-lg:bottom-[calc(1rem+var(--review-panel-h,0px))]" />
      <ScrollToTopText threshold={300} className="hidden sm:flex" />
    </SidebarProvider>
  )
}
