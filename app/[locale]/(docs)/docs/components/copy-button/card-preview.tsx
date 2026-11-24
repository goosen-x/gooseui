"use client"

import { useCopyToast } from "@/hooks/use-copy-toast"
import { CopyButton } from "@/registry/gooseui/ui/copy-button"

export default function CardPreview() {
  const copyToast = useCopyToast()
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-2 rounded-md border bg-background py-1 pr-1 pl-3">
        <code className="font-mono text-xs">pnpm add motion</code>
        <CopyButton value="pnpm add motion" size="sm" {...copyToast()} />
      </div>
      <CopyButton
        value="https://example.com"
        variant="label"
        size="sm"
        {...copyToast()}
      />
    </div>
  )
}
