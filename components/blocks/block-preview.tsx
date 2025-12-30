"use client"

import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import {
  BlockPreviewToolbar,
  type PreviewTab,
  type ViewportSize,
} from "./block-preview-toolbar"

const VIEWPORT_WIDTHS: Record<ViewportSize, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
}

interface BlockPreviewProps {
  /** Block name for display */
  name: string
  /** Install command */
  installCommand?: string
  /** Source code to display */
  sourceCode?: string
  /** Preview content (React component) */
  children?: React.ReactNode
  /** Additional class name */
  className?: string
}

export function BlockPreview({
  name,
  installCommand,
  sourceCode,
  children,
  className,
}: BlockPreviewProps) {
  const [viewport, setViewport] = useState<ViewportSize>("desktop")
  const [activeTab, setActiveTab] = useState<PreviewTab>("preview")
  const [key, setKey] = useState(0)

  const handleRefresh = useCallback(() => {
    setKey((k) => k + 1)
  }, [])

  const handleCopy = useCallback(async () => {
    if (sourceCode) {
      await navigator.clipboard.writeText(sourceCode)
    }
  }, [sourceCode])

  return (
    <div className={cn("rounded-lg border", className)}>
      <BlockPreviewToolbar
        viewport={viewport}
        onViewportChange={setViewport}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRefresh={handleRefresh}
        onCopy={handleCopy}
        installCommand={installCommand}
      />

      {/* Preview area */}
      {activeTab === "preview" && (
        <div className="relative min-h-[400px] overflow-auto bg-background p-4">
          <div
            key={key}
            className="mx-auto transition-all duration-300"
            style={{ maxWidth: VIEWPORT_WIDTHS[viewport] }}
          >
            {children || (
              <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
                Preview: {name}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Code area */}
      {activeTab === "code" && (
        <div className="max-h-[500px] overflow-auto bg-zinc-950 p-4">
          <pre className="text-sm">
            <code className="text-zinc-100">
              {sourceCode || `// Source code for ${name}`}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}
