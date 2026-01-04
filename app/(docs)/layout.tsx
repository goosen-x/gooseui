import { DocsContentWrapper } from "@/components/docs/docs-content-wrapper"
import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"
import { ThemeCustomizerToolbar } from "@/components/theme-customizer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        <DocsHeader />
        <main className="flex-1 px-6 py-6 lg:px-8 lg:py-8">
          <DocsContentWrapper>{children}</DocsContentWrapper>
        </main>
      </SidebarInset>
      <ThemeCustomizerToolbar />
    </SidebarProvider>
  )
}
