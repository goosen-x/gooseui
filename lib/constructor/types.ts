/**
 * Landing Constructor Types
 */

export type SectionType =
  | "header"
  | "hero"
  | "brands"
  | "services"
  | "footer"

export interface SectionConfig {
  id: string
  type: SectionType
  variant: string // e.g., "header-01", "hero-02"
  isRequired: boolean
}

export interface LandingConfig {
  id: string
  sections: SectionConfig[]
  createdAt: Date
  updatedAt: Date
}

export interface SectionVariant {
  id: string
  name: string
  description: string
  previewUrl: string
}

export interface SectionDefinition {
  type: SectionType
  name: string
  isRequired: boolean
  variants: SectionVariant[]
}

export type ViewportSize = "desktop" | "tablet" | "mobile"

export interface ConstructorState {
  sections: SectionConfig[]
  viewport: ViewportSize
  selectedSectionId: string | null
}

export type ConstructorAction =
  | { type: "ADD_SECTION"; payload: { type: SectionType; variant: string } }
  | { type: "REMOVE_SECTION"; payload: { id: string } }
  | { type: "UPDATE_VARIANT"; payload: { id: string; variant: string } }
  | { type: "REORDER_SECTIONS"; payload: { sections: SectionConfig[] } }
  | { type: "SET_VIEWPORT"; payload: ViewportSize }
  | { type: "SELECT_SECTION"; payload: string | null }
  | { type: "RESET" }
