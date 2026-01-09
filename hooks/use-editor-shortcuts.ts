"use client"

/**
 * Editor Keyboard Shortcuts Hook
 *
 * Provides keyboard shortcuts for the landing page editor
 */

import { useEffect, useCallback } from "react"
import { useEditorStore, useEditorHistory } from "@/lib/generate/store"

interface ShortcutConfig {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  action: () => void
  description: string
}

/**
 * Hook to handle editor keyboard shortcuts
 */
export function useEditorShortcuts() {
  const selectedId = useEditorStore((state) => state.selectedId)
  const selectSection = useEditorStore((state) => state.selectSection)
  const removeSection = useEditorStore((state) => state.removeSection)
  const duplicateSection = useEditorStore((state) => state.duplicateSection)
  const nextVariant = useEditorStore((state) => state.nextVariant)
  const prevVariant = useEditorStore((state) => state.prevVariant)
  const sections = useEditorStore((state) => state.page.sections)
  const toggleSidebar = useEditorStore((state) => state.toggleSidebar)
  const { undo, redo, canUndo, canRedo } = useEditorHistory()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key, ctrlKey, metaKey, shiftKey, altKey } = event
      const modKey = ctrlKey || metaKey // Support both Ctrl and Cmd

      // Ignore if typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Undo: Ctrl/Cmd + Z
      if (modKey && !shiftKey && key.toLowerCase() === "z") {
        event.preventDefault()
        if (canUndo) undo()
        return
      }

      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if (modKey && shiftKey && key.toLowerCase() === "z") {
        event.preventDefault()
        if (canRedo) redo()
        return
      }
      if (modKey && key.toLowerCase() === "y") {
        event.preventDefault()
        if (canRedo) redo()
        return
      }

      // Delete selected section: Delete or Backspace
      if ((key === "Delete" || key === "Backspace") && selectedId) {
        event.preventDefault()
        const section = sections.find((s) => s.id === selectedId)
        if (section && !section.isRequired) {
          removeSection(selectedId)
        }
        return
      }

      // Duplicate: Ctrl/Cmd + D
      if (modKey && key.toLowerCase() === "d" && selectedId) {
        event.preventDefault()
        duplicateSection(selectedId)
        return
      }

      // Deselect: Escape
      if (key === "Escape") {
        event.preventDefault()
        selectSection(null)
        return
      }

      // Toggle sidebar: Ctrl/Cmd + B
      if (modKey && key.toLowerCase() === "b") {
        event.preventDefault()
        toggleSidebar()
        return
      }

      // Navigate variants: Left/Right arrows when section is selected
      if (selectedId && !modKey && !shiftKey && !altKey) {
        if (key === "ArrowLeft") {
          event.preventDefault()
          prevVariant(selectedId)
          return
        }
        if (key === "ArrowRight") {
          event.preventDefault()
          nextVariant(selectedId)
          return
        }
      }

      // Navigate sections: Up/Down arrows when no input focused
      if (!modKey && !shiftKey && !altKey) {
        if (key === "ArrowUp" || key === "ArrowDown") {
          event.preventDefault()
          const currentIndex = sections.findIndex((s) => s.id === selectedId)

          if (key === "ArrowUp") {
            const newIndex = currentIndex <= 0 ? sections.length - 1 : currentIndex - 1
            selectSection(sections[newIndex].id)
          } else {
            const newIndex = currentIndex >= sections.length - 1 ? 0 : currentIndex + 1
            selectSection(sections[newIndex].id)
          }
          return
        }
      }
    },
    [
      selectedId,
      sections,
      canUndo,
      canRedo,
      undo,
      redo,
      selectSection,
      removeSection,
      duplicateSection,
      nextVariant,
      prevVariant,
      toggleSidebar,
    ]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])
}

/**
 * Get list of available shortcuts for help display
 */
export function getShortcutsList(): ShortcutConfig[] {
  return [
    { key: "Z", ctrl: true, action: () => {}, description: "Undo" },
    { key: "Z", ctrl: true, shift: true, action: () => {}, description: "Redo" },
    { key: "D", ctrl: true, action: () => {}, description: "Duplicate section" },
    { key: "Delete", action: () => {}, description: "Delete selected section" },
    { key: "Escape", action: () => {}, description: "Deselect" },
    { key: "B", ctrl: true, action: () => {}, description: "Toggle sidebar" },
    { key: "←", action: () => {}, description: "Previous variant" },
    { key: "→", action: () => {}, description: "Next variant" },
    { key: "↑", action: () => {}, description: "Select previous section" },
    { key: "↓", action: () => {}, description: "Select next section" },
  ]
}

/**
 * Format shortcut for display
 */
export function formatShortcut(config: ShortcutConfig): string {
  const parts: string[] = []

  if (config.ctrl) {
    // Use Cmd symbol on Mac, Ctrl elsewhere
    const isMac = typeof window !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
    parts.push(isMac ? "⌘" : "Ctrl")
  }
  if (config.shift) parts.push("Shift")
  if (config.alt) parts.push("Alt")
  parts.push(config.key)

  return parts.join(" + ")
}
