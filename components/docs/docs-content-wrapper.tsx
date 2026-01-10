"use client"

import { usePathname } from "next/navigation"
import { TableOfContents } from "./table-of-contents"
import { TocProvider } from "./toc-context"

interface DocsContentWrapperProps {
  children: React.ReactNode
}

export function DocsContentWrapper({ children }: DocsContentWrapperProps) {
  const pathname = usePathname()
  const isBlocksPage = pathname?.startsWith("/docs/blocks")

  // Blocks pages - full width, no ToC
  if (isBlocksPage) {
    return <div className="mx-auto w-full max-w-6xl">{children}</div>
  }

  // Regular docs pages - with ToC
  return (
    <TocProvider>
      <div className="mx-auto flex w-full max-w-6xl gap-16 items-start min-h-[calc(100svh-10rem)]">
        <div className="min-w-0 flex-1 max-w-3xl" data-docs-content>
          {children}
        </div>
        <TableOfContents />
      </div>
    </TocProvider>
  )
}
