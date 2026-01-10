"use client"

import { useEffect } from "react"
import { useToc, TocItem } from "./toc-context"

interface DocsPageProps {
  toc: TocItem[]
  children: React.ReactNode
}

export function DocsPage({ toc, children }: DocsPageProps) {
  const { setItems } = useToc()

  useEffect(() => {
    setItems(toc)
    return () => setItems([])
  }, [toc, setItems])

  return <>{children}</>
}

export type { TocItem }
