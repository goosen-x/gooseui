"use client"

/**
 * Editor Toolbar - Top toolbar with viewport controls, undo/redo, templates, export
 */

import {
  Download,
  Keyboard,
  Layout,
  Monitor,
  PanelRight,
  Redo2,
  RotateCcw,
  Smartphone,
  Sparkles,
  Tablet,
  Undo2,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatShortcut, getShortcutsList } from "@/hooks/use-editor-shortcuts"
import { useFeatureAccess } from "@/hooks/use-feature-access"
import { downloadHTML } from "@/lib/generate/export/html"
import { downloadReact } from "@/lib/generate/export/react"
import { downloadRegistry } from "@/lib/generate/export/registry"
import { useEditorHistory, useEditorStore } from "@/lib/generate/store"
import type { ViewportSize } from "@/lib/generate/types"
import { cn } from "@/lib/utils"
import { TemplatesGallery } from "./templates-gallery"
import { UpgradeModal } from "./upgrade-modal"

const viewportOptions: {
  value: ViewportSize
  icon: React.ReactNode
  label: string
}[] = [
  { value: "desktop", icon: <Monitor className="h-4 w-4" />, label: "Desktop" },
  { value: "tablet", icon: <Tablet className="h-4 w-4" />, label: "Tablet" },
  {
    value: "mobile",
    icon: <Smartphone className="h-4 w-4" />,
    label: "Mobile",
  },
]

function ShortcutsDialog() {
  const shortcuts = getShortcutsList()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these shortcuts to work faster in the editor.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <span className="text-sm">{shortcut.description}</span>
              <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded">
                {formatShortcut(shortcut)}
              </kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function EditorToolbar() {
  const [templatesOpen, setTemplatesOpen] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState("default")

  const viewport = useEditorStore((state) => state.viewport)
  const setViewport = useEditorStore((state) => state.setViewport)
  const toggleSidebar = useEditorStore((state) => state.toggleSidebar)
  const isSidebarOpen = useEditorStore((state) => state.isSidebarOpen)
  const reset = useEditorStore((state) => state.reset)
  const page = useEditorStore((state) => state.page)
  const toJSON = useEditorStore((state) => state.toJSON)
  const { undo, redo, canUndo, canRedo } = useEditorHistory()

  const {
    canExportHTML,
    canExportReact,
    canExportRegistry,
    canRemoveWatermark,
    isFreePlan,
  } = useFeatureAccess()

  const handleExportJSON = () => {
    const json = toJSON()
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${page.name.toLowerCase().replace(/\s+/g, "-")}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportHTML = () => {
    if (!canExportHTML) {
      setUpgradeFeature("html")
      setUpgradeOpen(true)
      return
    }
    downloadHTML(page, { includeWatermark: !canRemoveWatermark })
  }

  const handleExportReact = () => {
    if (!canExportReact) {
      setUpgradeFeature("react")
      setUpgradeOpen(true)
      return
    }
    downloadReact(page)
  }

  const handleExportRegistry = () => {
    if (!canExportRegistry) {
      setUpgradeFeature("registry")
      setUpgradeOpen(true)
      return
    }
    downloadRegistry(page)
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-14 items-center justify-between border-b px-4">
        {/* Left: Logo + Templates */}
        <div className="flex items-center gap-3">
          <span className="font-semibold">GooseUI Generator</span>

          <div className="h-6 w-px bg-border" />

          {/* Templates Button */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 cursor-pointer"
            onClick={() => setTemplatesOpen(true)}
          >
            <Layout className="h-4 w-4" />
            Templates
          </Button>
        </div>

        {/* Center: Viewport Switcher */}
        <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-1">
          {viewportOptions.map((option) => (
            <Tooltip key={option.value}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 cursor-pointer",
                    viewport === option.value && "bg-background shadow-sm",
                  )}
                  onClick={() => setViewport(option.value)}
                >
                  {option.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{option.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => undo()}
                  disabled={!canUndo}
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => redo()}
                  disabled={!canRedo}
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Redo (Ctrl+Shift+Z)</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-6 w-px bg-border" />

          {/* Reset */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer"
                onClick={reset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Reset to Default</TooltipContent>
          </Tooltip>

          {/* Shortcuts */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ShortcutsDialog />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">Keyboard Shortcuts</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border" />

          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleExportJSON}
                className="cursor-pointer"
              >
                Export JSON
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleExportHTML}
                className="cursor-pointer"
              >
                Export HTML
                {!canRemoveWatermark && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    + watermark
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleExportReact}
                className="cursor-pointer"
              >
                Export React
                {!canExportReact && (
                  <Sparkles className="ml-auto h-3 w-3 text-primary" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleExportRegistry}
                className="cursor-pointer"
              >
                Export shadcn Registry
                {!canExportRegistry && (
                  <Sparkles className="ml-auto h-3 w-3 text-primary" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Upgrade button for free users */}
          {isFreePlan && (
            <>
              <div className="h-6 w-px bg-border" />
              <Button
                variant="default"
                size="sm"
                className="gap-2 cursor-pointer"
                onClick={() => {
                  setUpgradeFeature("default")
                  setUpgradeOpen(true)
                }}
              >
                <Sparkles className="h-4 w-4" />
                Upgrade
              </Button>
            </>
          )}

          <div className="h-6 w-px bg-border" />

          {/* Toggle Sidebar */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 cursor-pointer",
                  isSidebarOpen && "bg-muted",
                )}
                onClick={toggleSidebar}
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Toggle Sidebar (Ctrl+B)
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Templates Gallery Modal */}
      <TemplatesGallery open={templatesOpen} onOpenChange={setTemplatesOpen} />

      {/* Upgrade Modal */}
      <UpgradeModal
        feature={upgradeFeature}
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
      />
    </TooltipProvider>
  )
}
