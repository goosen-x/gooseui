"use client"

/**
 * Editor Layout - Main layout component for the landing page generator
 *
 * Structure:
 * ┌────────────────────────────────────────────────────────────┐
 * │  Toolbar (viewport, undo/redo, save, export)               │
 * ├────────────────────────────────────────────┬───────────────┤
 * │                                            │               │
 * │     Canvas (preview)                       │   Sidebar     │
 * │                                            │               │
 * └────────────────────────────────────────────┴───────────────┘
 */

import { useEditorShortcuts } from "@/hooks/use-editor-shortcuts"
import { useEditorStore } from "@/lib/generate/store"
import { cn } from "@/lib/utils"
import { EditorCanvas } from "./editor-canvas"
import { EditorSidebar } from "./editor-sidebar"
import { EditorToolbar } from "./editor-toolbar"

export function EditorLayout() {
  const isSidebarOpen = useEditorStore((state) => state.isSidebarOpen)

  // Enable keyboard shortcuts
  useEditorShortcuts()

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Toolbar */}
      <EditorToolbar />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 overflow-auto">
          <EditorCanvas />
        </div>

        {/* Sidebar */}
        <div
          className={cn(
            "border-l bg-background transition-all duration-300",
            isSidebarOpen ? "w-80" : "w-0",
          )}
        >
          {isSidebarOpen && <EditorSidebar />}
        </div>
      </div>
    </div>
  )
}
