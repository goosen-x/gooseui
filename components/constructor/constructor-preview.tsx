"use client"

import { Monitor, Smartphone, Tablet } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import type { SectionConfig, ViewportSize } from "@/lib/constructor/types"
import { cn } from "@/lib/utils"

interface ConstructorPreviewProps {
  sections: SectionConfig[]
  viewport: ViewportSize
  onViewportChange: (viewport: ViewportSize) => void
}

const viewportSizes: Record<ViewportSize, { width: string; icon: React.ReactNode }> = {
  desktop: { width: "100%", icon: <Monitor className="h-4 w-4" /> },
  tablet: { width: "768px", icon: <Tablet className="h-4 w-4" /> },
  mobile: { width: "375px", icon: <Smartphone className="h-4 w-4" /> },
}

export function ConstructorPreview({
  sections,
  viewport,
  onViewportChange,
}: ConstructorPreviewProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  // Build preview URL with section variants
  const previewUrl = React.useMemo(() => {
    const params = sections.map((s) => s.variant).join(",")
    return `/constructor/preview?sections=${encodeURIComponent(params)}`
  }, [sections])

  return (
    <div className="flex h-full flex-col">
      {/* Viewport Controls */}
      <div className="flex items-center justify-center gap-1 border-b bg-muted/30 p-2">
        {(Object.keys(viewportSizes) as ViewportSize[]).map((size) => (
          <Button
            key={size}
            variant={viewport === size ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0 cursor-pointer"
            onClick={() => onViewportChange(size)}
          >
            {viewportSizes[size].icon}
          </Button>
        ))}
      </div>

      {/* Preview Container */}
      <div className="relative flex-1 overflow-auto bg-muted/20 p-4">
        <div
          className={cn(
            "mx-auto h-full transition-all duration-300",
            viewport !== "desktop" && "rounded-lg border bg-background shadow-lg",
          )}
          style={{
            width: viewportSizes[viewport].width,
            maxWidth: "100%",
          }}
        >
          <iframe
            ref={iframeRef}
            src={previewUrl}
            className="h-full w-full border-0"
            title="Landing Preview"
          />
        </div>
      </div>
    </div>
  )
}
