"use client"

/**
 * Landing Page Generator - Zustand Store
 *
 * State management with Immer for immutable updates and zundo for undo/redo
 */

import { temporal } from "zundo"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import {
  getDefaultVariant,
  getNextVariantId,
  getPrevVariantId,
  getVariantCount,
} from "./registry"
import type {
  EditorState,
  EditorStore,
  PageSchema,
  PageSettings,
  SectionSchema,
  SectionType,
} from "./types"

/**
 * Generate unique ID
 */
function generateId(): string {
  return crypto.randomUUID()
}

/**
 * Create a new section with default values
 */
function createSection(type: SectionType, variant?: string): SectionSchema {
  return {
    id: generateId(),
    type,
    variant: variant || getDefaultVariant(type),
    props: {},
    isRequired: type === "header" || type === "hero" || type === "footer",
  }
}

/**
 * Default page settings
 */
const defaultPageSettings: PageSettings = {
  title: "My Landing Page",
  description: "A beautiful landing page built with GooseUI",
}

/**
 * Initial page state with required sections
 */
const initialPage: PageSchema = {
  id: generateId(),
  name: "Untitled Landing",
  sections: [
    createSection("header"),
    createSection("hero"),
    createSection("footer"),
  ],
  settings: defaultPageSettings,
}

/**
 * Initial editor state
 */
const initialState: EditorState = {
  page: initialPage,
  selectedId: null,
  hoveredId: null,
  viewport: "desktop",
  isDragging: false,
  isSidebarOpen: true,
  isPropertyPanelOpen: true,
}

/**
 * Create the editor store with all middleware
 */
export const useEditorStore = create<EditorStore>()(
  devtools(
    persist(
      temporal(
        immer((set, get) => ({
          // Initial state
          ...initialState,

          // ============================================
          // Section Management
          // ============================================

          addSection: (type, variant, index) =>
            set((state) => {
              const newSection = createSection(type, variant)

              if (index !== undefined) {
                state.page.sections.splice(index, 0, newSection)
              } else {
                // Insert before footer if exists, otherwise at end
                const footerIndex = state.page.sections.findIndex(
                  (s) => s.type === "footer",
                )
                if (footerIndex !== -1) {
                  state.page.sections.splice(footerIndex, 0, newSection)
                } else {
                  state.page.sections.push(newSection)
                }
              }

              state.selectedId = newSection.id
            }),

          removeSection: (id) =>
            set((state) => {
              const section = state.page.sections.find((s) => s.id === id)
              // Don't remove required sections
              if (section?.isRequired) return

              state.page.sections = state.page.sections.filter(
                (s) => s.id !== id,
              )

              if (state.selectedId === id) {
                state.selectedId = null
              }
            }),

          updateSection: (id, updates) =>
            set((state) => {
              const section = state.page.sections.find((s) => s.id === id)
              if (section) {
                Object.assign(section, updates)
              }
            }),

          updateSectionProps: (id, props) =>
            set((state) => {
              const section = state.page.sections.find((s) => s.id === id)
              if (section) {
                section.props = { ...section.props, ...props }
              }
            }),

          reorderSections: (fromIndex, toIndex) =>
            set((state) => {
              const sections = state.page.sections
              const [removed] = sections.splice(fromIndex, 1)
              sections.splice(toIndex, 0, removed)
            }),

          duplicateSection: (id) =>
            set((state) => {
              const index = state.page.sections.findIndex((s) => s.id === id)
              if (index === -1) return

              const original = state.page.sections[index]
              const duplicate: SectionSchema = {
                ...original,
                id: generateId(),
                isRequired: false, // Duplicates are never required
              }

              state.page.sections.splice(index + 1, 0, duplicate)
              state.selectedId = duplicate.id
            }),

          // ============================================
          // Variant Management
          // ============================================

          setVariant: (id, variant) =>
            set((state) => {
              const section = state.page.sections.find((s) => s.id === id)
              if (section) {
                section.variant = variant
              }
            }),

          nextVariant: (id) =>
            set((state) => {
              const section = state.page.sections.find((s) => s.id === id)
              if (section && getVariantCount(section.type) > 1) {
                section.variant = getNextVariantId(
                  section.type,
                  section.variant,
                )
              }
            }),

          prevVariant: (id) =>
            set((state) => {
              const section = state.page.sections.find((s) => s.id === id)
              if (section && getVariantCount(section.type) > 1) {
                section.variant = getPrevVariantId(
                  section.type,
                  section.variant,
                )
              }
            }),

          // ============================================
          // Selection
          // ============================================

          selectSection: (id) =>
            set((state) => {
              state.selectedId = id
            }),

          hoverSection: (id) =>
            set((state) => {
              state.hoveredId = id
            }),

          // ============================================
          // Viewport
          // ============================================

          setViewport: (viewport) =>
            set((state) => {
              state.viewport = viewport
            }),

          // ============================================
          // Page Settings
          // ============================================

          updatePageSettings: (settings) =>
            set((state) => {
              state.page.settings = { ...state.page.settings, ...settings }
            }),

          setPageName: (name) =>
            set((state) => {
              state.page.name = name
            }),

          // ============================================
          // Serialization
          // ============================================

          toJSON: () => {
            const { page } = get()
            return JSON.stringify(page, null, 2)
          },

          fromJSON: (json) =>
            set((state) => {
              try {
                const page = JSON.parse(json) as PageSchema
                state.page = page
                state.selectedId = null
              } catch (e) {
                console.error("Failed to parse JSON:", e)
              }
            }),

          reset: () =>
            set((state) => {
              state.page = {
                ...initialPage,
                id: generateId(),
                sections: [
                  createSection("header"),
                  createSection("hero"),
                  createSection("footer"),
                ],
              }
              state.selectedId = null
              state.hoveredId = null
            }),

          // ============================================
          // Panels
          // ============================================

          toggleSidebar: () =>
            set((state) => {
              state.isSidebarOpen = !state.isSidebarOpen
            }),

          togglePropertyPanel: () =>
            set((state) => {
              state.isPropertyPanelOpen = !state.isPropertyPanelOpen
            }),
        })),
        {
          // zundo options - limit history to 50 states
          limit: 50,
          // Only track page changes, not UI state
          partialize: (state) => ({
            page: state.page,
          }),
        },
      ),
      {
        // persist options
        name: "gooseui-editor",
        partialize: (state) => ({
          page: state.page,
          viewport: state.viewport,
        }),
      },
    ),
    {
      name: "GooseUI Editor",
    },
  ),
)

/**
 * Hook to access undo/redo functionality
 */
export function useEditorHistory() {
  const { undo, redo, pastStates, futureStates } =
    useEditorStore.temporal.getState()

  return {
    undo,
    redo,
    canUndo: pastStates.length > 0,
    canRedo: futureStates.length > 0,
    historyLength: pastStates.length,
  }
}

/**
 * Hook to get selected section
 */
export function useSelectedSection() {
  const selectedId = useEditorStore((state) => state.selectedId)
  const sections = useEditorStore((state) => state.page.sections)

  return sections.find((s) => s.id === selectedId) || null
}

/**
 * Hook to get section by ID
 */
export function useSection(id: string) {
  return useEditorStore((state) => state.page.sections.find((s) => s.id === id))
}

/**
 * Selector for sections array
 */
export const selectSections = (state: EditorStore) => state.page.sections

/**
 * Selector for viewport
 */
export const selectViewport = (state: EditorStore) => state.viewport

/**
 * Selector for selected ID
 */
export const selectSelectedId = (state: EditorStore) => state.selectedId
