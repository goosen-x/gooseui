"use client"

import { useCopyToast } from "@/hooks/use-copy-toast"
import { CopyField } from "@/registry/gooseui/ui/copy-field"

export default function CardPreview() {
  const copyToast = useCopyToast()
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-56 space-y-1 rounded-lg border bg-background px-3 py-2 text-xs">
        <CopyField
          label="Email"
          value="sam@example.com"
          labelClassName="w-12"
          className="text-xs"
          {...copyToast()}
        />
        <CopyField
          label="Order"
          value="ORD-2048-7731"
          mono
          labelClassName="w-12"
          className="text-xs"
          {...copyToast()}
        />
        <CopyField
          label="Key"
          value="demo_key_7f3k29qd4mvb0r8n"
          mono
          labelClassName="w-12"
          className="text-xs"
          {...copyToast()}
        />
      </div>
    </div>
  )
}
