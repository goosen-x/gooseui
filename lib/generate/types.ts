/**
 * Landing Page Generator - Types
 */

// Section types available in the editor
export type SectionType =
  | "header"
  | "hero"
  | "brands"
  | "features"
  | "services"
  | "pricing"
  | "testimonials"
  | "faq"
  | "cta"
  | "footer"

// Viewport sizes for preview
export type ViewportSize = "desktop" | "tablet" | "mobile"

// Section schema - represents a single section in the page
export interface SectionSchema {
  id: string
  type: SectionType
  variant: string
  props: Record<string, unknown>
  isRequired?: boolean
}

// Page schema - the complete page structure
export interface PageSchema {
  id: string
  name: string
  description?: string
  sections: SectionSchema[]
  settings: PageSettings
  createdAt?: string
  updatedAt?: string
}

// Page-level settings
export interface PageSettings {
  title: string
  description: string
  favicon?: string
  ogImage?: string
  fonts?: string[]
  colors?: ThemeColors
}

// Theme color configuration
export interface ThemeColors {
  primary?: string
  secondary?: string
  accent?: string
  background?: string
  foreground?: string
}

// Variant definition for a component
export interface VariantDefinition {
  id: string
  name: string
  description: string
  thumbnail?: string
  component: React.ComponentType<Record<string, unknown>>
}

// Component definition in the registry
export interface ComponentDefinition {
  type: SectionType
  name: string
  description: string
  category:
    | "navigation"
    | "hero"
    | "content"
    | "social-proof"
    | "conversion"
    | "footer"
  isRequired: boolean
  variants: VariantDefinition[]
  defaultProps: Record<string, unknown>
  propsSchema?: PropsSchema
}

// Props schema for property panel
export interface PropsSchema {
  [key: string]: PropDefinition
}

export interface PropDefinition {
  type:
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "boolean"
    | "image"
    | "color"
    | "link"
  label: string
  description?: string
  defaultValue?: unknown
  required?: boolean
  options?: { value: string; label: string }[]
  placeholder?: string
}

// Editor state
export interface EditorState {
  // Page data
  page: PageSchema

  // UI state
  selectedId: string | null
  hoveredId: string | null
  viewport: ViewportSize
  isDragging: boolean

  // Panels
  isSidebarOpen: boolean
  isPropertyPanelOpen: boolean
}

// Editor actions
export interface EditorActions {
  // Section management
  addSection: (type: SectionType, variant?: string, index?: number) => void
  removeSection: (id: string) => void
  updateSection: (id: string, updates: Partial<SectionSchema>) => void
  updateSectionProps: (id: string, props: Record<string, unknown>) => void
  reorderSections: (fromIndex: number, toIndex: number) => void
  duplicateSection: (id: string) => void

  // Variant management
  setVariant: (id: string, variant: string) => void
  nextVariant: (id: string) => void
  prevVariant: (id: string) => void

  // Selection
  selectSection: (id: string | null) => void
  hoverSection: (id: string | null) => void

  // Viewport
  setViewport: (viewport: ViewportSize) => void

  // Page settings
  updatePageSettings: (settings: Partial<PageSettings>) => void
  setPageName: (name: string) => void

  // Serialization
  toJSON: () => string
  fromJSON: (json: string) => void
  reset: () => void

  // Panels
  toggleSidebar: () => void
  togglePropertyPanel: () => void
}

// Combined store type
export type EditorStore = EditorState & EditorActions

// Export format options
export type ExportFormat = "html" | "react" | "nextjs" | "registry"

export interface ExportOptions {
  format: ExportFormat
  includeStyles: boolean
  minify: boolean
  removeWatermark: boolean
}

// User subscription plan
export type PlanTier = "free" | "pro" | "team" | "enterprise"

export interface UserPlan {
  tier: PlanTier
  limits: {
    projects: number
    exportsPerMonth: number
    teamMembers: number
  }
  features: string[]
}

// Project for persistence
export interface Project {
  id: string
  userId: string
  name: string
  data: PageSchema
  thumbnail?: string
  isPublished: boolean
  publishedUrl?: string
  createdAt: string
  updatedAt: string
}
