"use client"

import { BellRing } from "lucide-react"
import { Button } from "@/registry/gooseui/ui/button"
import { Toaster, toast } from "@/registry/gooseui/ui/toast"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Changes saved", {
            description: "Hover the stack to expand it.",
          })
        }
      >
        <BellRing />
        Show toast
      </Button>
      <Toaster />
    </div>
  )
}
