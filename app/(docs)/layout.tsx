import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"
import { FloatingNav } from "@/components/docs/floating-nav"
import { TableOfContents } from "@/components/docs/table-of-contents"
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
          <div className="mx-auto flex w-full max-w-6xl gap-10">
            <div className="min-w-0 flex-1 max-w-3xl">{children}</div>
            <TableOfContents />
          </div>
        </main>
      </SidebarInset>
      <FloatingNav />
    </SidebarProvider>
  )
}
