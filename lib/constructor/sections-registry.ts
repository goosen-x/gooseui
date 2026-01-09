/**
 * Sections Registry for Landing Constructor
 *
 * Defines all available sections and their variants
 */

import type { SectionDefinition, SectionType } from "./types"

export const sectionsRegistry: Record<SectionType, SectionDefinition> = {
  header: {
    type: "header",
    name: "Header",
    isRequired: true,
    variants: [
      {
        id: "header-01",
        name: "Simple",
        description: "Minimal header with logo and navigation",
        previewUrl: "/blocks/preview/header-01",
      },
      {
        id: "header-02",
        name: "With CTA",
        description: "Navigation with call-to-action button",
        previewUrl: "/blocks/preview/header-02",
      },
      {
        id: "header-03",
        name: "With Auth",
        description: "Navigation with login/signup buttons",
        previewUrl: "/blocks/preview/header-03",
      },
    ],
  },
  hero: {
    type: "hero",
    name: "Hero",
    isRequired: true,
    variants: [
      {
        id: "hero-01",
        name: "Classic",
        description: "Hero with headline, CTA and side image",
        previewUrl: "/blocks/preview/hero-01",
      },
      {
        id: "hero-02",
        name: "Split",
        description: "Full-height split layout",
        previewUrl: "/blocks/preview/hero-02",
      },
    ],
  },
  brands: {
    type: "brands",
    name: "Brands",
    isRequired: false,
    variants: [
      {
        id: "brands-01",
        name: "Carousel",
        description: "Infinite marquee of logos",
        previewUrl: "/blocks/preview/brands-01",
      },
      {
        id: "brands-02",
        name: "Double Row",
        description: "Two-row marquee in opposite directions",
        previewUrl: "/blocks/preview/brands-02",
      },
    ],
  },
  services: {
    type: "services",
    name: "Services",
    isRequired: false,
    variants: [
      {
        id: "services-01",
        name: "Marquee",
        description: "Scrolling service cards",
        previewUrl: "/blocks/preview/services-01",
      },
      {
        id: "services-02",
        name: "Grid",
        description: "Static grid of service cards",
        previewUrl: "/blocks/preview/services-02",
      },
    ],
  },
  footer: {
    type: "footer",
    name: "Footer",
    isRequired: true,
    variants: [
      {
        id: "footer-01",
        name: "Simple",
        description: "Minimal footer with links",
        previewUrl: "/blocks/preview/footer-01",
      },
      {
        id: "footer-02",
        name: "Columns",
        description: "Multi-column footer",
        previewUrl: "/blocks/preview/footer-02",
      },
      {
        id: "footer-03",
        name: "Newsletter",
        description: "Footer with email subscription",
        previewUrl: "/blocks/preview/footer-03",
      },
    ],
  },
}

/**
 * Get section definition by type
 */
export function getSectionDefinition(
  type: SectionType,
): SectionDefinition | undefined {
  return sectionsRegistry[type]
}

/**
 * Get all section types
 */
export function getAllSectionTypes(): SectionType[] {
  return Object.keys(sectionsRegistry) as SectionType[]
}

/**
 * Get required section types
 */
export function getRequiredSectionTypes(): SectionType[] {
  return getAllSectionTypes().filter((type) => sectionsRegistry[type].isRequired)
}

/**
 * Get optional section types
 */
export function getOptionalSectionTypes(): SectionType[] {
  return getAllSectionTypes().filter(
    (type) => !sectionsRegistry[type].isRequired,
  )
}

/**
 * Get default variant for a section type
 */
export function getDefaultVariant(type: SectionType): string {
  return sectionsRegistry[type].variants[0].id
}
