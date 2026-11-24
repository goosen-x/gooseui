"use client"

import * as React from "react"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/gooseui/ui/collapsible"

export function CollapsibleControlledDemo({
  label,
  text,
  state,
}: {
  label: string
  text: string
  state: [string, string]
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-72 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          {open ? state[0] : state[1]}
        </span>
        <CollapsibleTrigger asChild>
          <Button variant="outline">{label}</Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <p className="rounded-md border p-3 text-sm">{text}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}
