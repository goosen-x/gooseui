"use client"

import { Mouse } from "lucide-react"
import { ScrollContainer } from "@/registry/new-york/ui/scroll-container"

export function ScrollContainerDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Auto-hide example */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Mouse className="size-3.5" />
          Auto-hide (hover to show)
        </p>
        <ScrollContainer
          height="16rem"
          autoHide
          className="rounded-lg border bg-muted/30 cursor-ns-resize"
        >
          <div className="p-4 space-y-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-background p-3">
                <div className="h-3 w-3/4 rounded bg-muted mb-2" />
                <div className="h-2 w-1/2 rounded bg-muted/60" />
              </div>
            ))}
          </div>
        </ScrollContainer>
      </div>

      {/* Always visible example */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Mouse className="size-3.5" />
          Always visible
        </p>
        <ScrollContainer
          height="16rem"
          autoHide={false}
          className="rounded-lg border bg-muted/30 cursor-ns-resize"
        >
          <div className="p-4 space-y-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-background p-3">
                <div className="h-3 w-3/4 rounded bg-muted mb-2" />
                <div className="h-2 w-1/2 rounded bg-muted/60" />
              </div>
            ))}
          </div>
        </ScrollContainer>
      </div>
    </div>
  )
}
