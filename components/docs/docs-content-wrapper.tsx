"use client"

import { usePathname } from "next/navigation"
import { TableOfContents } from "./table-of-contents"

interface DocsContentWrapperProps {
  children: React.ReactNode
}

export function DocsContentWrapper({ children }: DocsContentWrapperProps) {
  const pathname = usePathname()
  const isBlocksPage = pathname?.startsWith("/docs/blocks")

  // Blocks pages - full width, no ToC
  if (isBlocksPage) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        {children}
      </div>
    )
  }

  // Regular docs pages - with ToC
  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10">
      <div className="min-w-0 flex-1 max-w-3xl">{children}</div>
      <TableOfContents />
    </div>
  )
}
