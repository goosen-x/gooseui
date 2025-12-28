import { SiteHeader } from "@/components/site/header"
import { DocsSidebar } from "@/components/docs-sidebar"
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
        <SiteHeader />
        <main className="flex-1 px-6 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
