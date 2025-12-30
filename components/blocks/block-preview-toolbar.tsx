"use client"

import {
  Check,
  ChevronDown,
  Copy,
  Monitor,
  RotateCcw,
  Smartphone,
  Tablet,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

export type ViewportSize = "desktop" | "tablet" | "mobile"
export type PreviewTab = "preview" | "code"

interface BlockPreviewToolbarProps {
  viewport: ViewportSize
  onViewportChange: (viewport: ViewportSize) => void
  activeTab: PreviewTab
  onTabChange: (tab: PreviewTab) => void
  onRefresh?: () => void
  onCopy?: () => void
  installCommand?: string
  className?: string
}

export function BlockPreviewToolbar({
  viewport,
  onViewportChange,
  activeTab,
  onTabChange,
  onRefresh,
  onCopy,
  installCommand,
  className,
}: BlockPreviewToolbarProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (installCommand) {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    onCopy?.()
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-t-lg border border-b-0 bg-muted/50 px-4 py-2",
        className,
      )}
    >
      {/* Left: Install command */}
      {installCommand && (
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md bg-background px-3 py-1.5 font-mono text-sm hover:bg-accent"
        >
          <span className="text-muted-foreground">$</span>
          <span className="max-w-[200px] truncate">{installCommand}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
      )}

      {/* Center: Viewport + Tabs */}
      <div className="flex items-center gap-2">
        {/* Viewport switcher */}
        <ToggleGroup
          type="single"
          value={viewport}
          onValueChange={(v) => v && onViewportChange(v as ViewportSize)}
          className="bg-background rounded-md border"
        >
          <ToggleGroupItem value="desktop" size="sm" aria-label="Desktop">
            <Monitor className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="tablet" size="sm" aria-label="Tablet">
            <Tablet className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="mobile" size="sm" aria-label="Mobile">
            <Smartphone className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Refresh button */}
        {onRefresh && (
          <Button variant="ghost" size="icon" onClick={onRefresh}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}

        {/* Divider */}
        <div className="h-6 w-px bg-border" />

        {/* Preview/Code tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => onTabChange(v as PreviewTab)}
        >
          <TabsList className="h-8">
            <TabsTrigger value="preview" className="text-xs">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs">
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Right: Actions dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Select
            <ChevronDown className="ml-1 h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Open in v0</DropdownMenuItem>
          <DropdownMenuItem>Copy to Claude</DropdownMenuItem>
          <DropdownMenuItem>Copy to ChatGPT</DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>Copy code</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
