import { DocsHeaderNav } from "@/components/docs-header-nav"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <DocsHeaderNav />
      </div>
    </header>
  )
}
