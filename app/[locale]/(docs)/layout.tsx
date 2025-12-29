import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"
import { FloatingNav } from "@/components/docs/floating-nav"
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
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </SidebarInset>
      <FloatingNav />
    </SidebarProvider>
  )
}
