"use client"

import { ScrollContainer } from "@/registry/new-york/ui/scroll-container"

const DemoContent = () => (
  <div className="p-4 space-y-3">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="rounded-lg border bg-background p-3">
        <div className="h-3 w-3/4 rounded bg-muted mb-2" />
        <div className="h-2 w-1/2 rounded bg-muted/60" />
      </div>
    ))}
  </div>
)

export function ScrollContainerDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Default variant */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Default</p>
        <ScrollContainer
          height="16rem"
          variant="default"
          className="rounded-lg border bg-muted/30"
        >
          <DemoContent />
        </ScrollContainer>
      </div>

      {/* Minimal variant */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Minimal</p>
        <ScrollContainer
          height="16rem"
          variant="minimal"
          className="rounded-lg border bg-muted/30"
        >
          <DemoContent />
        </ScrollContainer>
      </div>

      {/* Primary variant */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Primary</p>
        <ScrollContainer
          height="16rem"
          variant="primary"
          className="rounded-lg border bg-muted/30"
        >
          <DemoContent />
        </ScrollContainer>
      </div>

      {/* Auto-hide */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          Auto-hide (hover to show)
        </p>
        <ScrollContainer
          height="16rem"
          autoHide
          className="rounded-lg border bg-muted/30"
        >
          <DemoContent />
        </ScrollContainer>
      </div>

      {/* Auto-hide + Primary */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          Auto-hide + Primary
        </p>
        <ScrollContainer
          height="16rem"
          autoHide
          variant="primary"
          className="rounded-lg border bg-muted/30"
        >
          <DemoContent />
        </ScrollContainer>
      </div>

      {/* Minimal auto-hide */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          Minimal + Auto-hide
        </p>
        <ScrollContainer
          height="16rem"
          autoHide
          variant="minimal"
          className="rounded-lg border bg-muted/30"
        >
          <DemoContent />
        </ScrollContainer>
      </div>
    </div>
  )
}
