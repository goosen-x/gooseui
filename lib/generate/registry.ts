/**
 * Landing Page Generator - Component Registry
 *
 * Centralized registry of all available components and their variants
 */

import { BrandsCarousel } from "@/registry/new-york/blocks/brands/brands-carousel"
import { FooterColumns } from "@/registry/new-york/blocks/footers/footer-columns"
import { FooterNewsletter } from "@/registry/new-york/blocks/footers/footer-newsletter"
import { FooterSimple } from "@/registry/new-york/blocks/footers/footer-simple"
import { HeaderAuth } from "@/registry/new-york/blocks/headers/header-auth"
// Import all block components
import { HeaderSimple } from "@/registry/new-york/blocks/headers/header-simple"
import { HeaderWithCta } from "@/registry/new-york/blocks/headers/header-with-cta"
import { HeroClassic } from "@/registry/new-york/blocks/hero/hero-classic"
import { HeroSplit } from "@/registry/new-york/blocks/hero/hero-split"
import { ServicesMarquee } from "@/registry/new-york/blocks/services/services-marquee"
import type {
  ComponentDefinition,
  SectionType,
  VariantDefinition,
} from "./types"

/**
 * Component Registry
 * Maps section types to their definitions and variants
 */
export const componentRegistry: Record<SectionType, ComponentDefinition> = {
  header: {
    type: "header",
    name: "Header",
    description: "Navigation header with logo and menu",
    category: "navigation",
    isRequired: true,
    variants: [
      {
        id: "header-simple",
        name: "Simple",
        description: "Clean header with logo and navigation links",
        component: HeaderSimple,
      },
      {
        id: "header-cta",
        name: "With CTA",
        description: "Header with call-to-action button",
        component: HeaderWithCta,
      },
      {
        id: "header-auth",
        name: "With Auth",
        description: "Header with login and signup buttons",
        component: HeaderAuth,
      },
    ],
    defaultProps: {},
  },

  hero: {
    type: "hero",
    name: "Hero",
    description: "Main hero section with headline and CTA",
    category: "hero",
    isRequired: true,
    variants: [
      {
        id: "hero-classic",
        name: "Classic",
        description: "Two-column layout with text and image",
        component: HeroClassic,
      },
      {
        id: "hero-split",
        name: "Split",
        description: "Full-height split layout",
        component: HeroSplit,
      },
    ],
    defaultProps: {},
  },

  brands: {
    type: "brands",
    name: "Brands",
    description: "Showcase partner or client logos",
    category: "social-proof",
    isRequired: false,
    variants: [
      {
        id: "brands-carousel",
        name: "Carousel",
        description: "Infinite scrolling logo carousel",
        component: BrandsCarousel,
      },
    ],
    defaultProps: {},
  },

  features: {
    type: "features",
    name: "Features",
    description: "Highlight product features",
    category: "content",
    isRequired: false,
    variants: [],
    defaultProps: {},
  },

  services: {
    type: "services",
    name: "Services",
    description: "Display services or offerings",
    category: "content",
    isRequired: false,
    variants: [
      {
        id: "services-marquee",
        name: "Marquee",
        description: "Scrolling service cards",
        component: ServicesMarquee,
      },
    ],
    defaultProps: {},
  },

  pricing: {
    type: "pricing",
    name: "Pricing",
    description: "Pricing plans and comparison",
    category: "conversion",
    isRequired: false,
    variants: [],
    defaultProps: {},
  },

  testimonials: {
    type: "testimonials",
    name: "Testimonials",
    description: "Customer testimonials and reviews",
    category: "social-proof",
    isRequired: false,
    variants: [],
    defaultProps: {},
  },

  faq: {
    type: "faq",
    name: "FAQ",
    description: "Frequently asked questions",
    category: "content",
    isRequired: false,
    variants: [],
    defaultProps: {},
  },

  cta: {
    type: "cta",
    name: "CTA",
    description: "Call-to-action section",
    category: "conversion",
    isRequired: false,
    variants: [],
    defaultProps: {},
  },

  footer: {
    type: "footer",
    name: "Footer",
    description: "Page footer with links and info",
    category: "footer",
    isRequired: true,
    variants: [
      {
        id: "footer-simple",
        name: "Simple",
        description: "Minimal footer with basic links",
        component: FooterSimple,
      },
      {
        id: "footer-columns",
        name: "Columns",
        description: "Multi-column footer with categories",
        component: FooterColumns,
      },
      {
        id: "footer-newsletter",
        name: "Newsletter",
        description: "Footer with email subscription form",
        component: FooterNewsletter,
      },
    ],
    defaultProps: {},
  },
}

/**
 * Get component definition by type
 */
export function getComponentDefinition(type: SectionType): ComponentDefinition {
  return componentRegistry[type]
}

/**
 * Get all variants for a section type
 */
export function getVariants(type: SectionType): VariantDefinition[] {
  return componentRegistry[type]?.variants || []
}

/**
 * Get a specific variant
 */
export function getVariant(
  type: SectionType,
  variantId: string,
): VariantDefinition | undefined {
  return componentRegistry[type]?.variants.find((v) => v.id === variantId)
}

/**
 * Get the component for a specific variant
 */
export function getComponent(
  type: SectionType,
  variantId: string,
): React.ComponentType<Record<string, unknown>> | undefined {
  return getVariant(type, variantId)?.component
}

/**
 * Get default variant ID for a section type
 */
export function getDefaultVariant(type: SectionType): string {
  const variants = componentRegistry[type]?.variants
  return variants?.[0]?.id || ""
}

/**
 * Get all section types
 */
export function getAllSectionTypes(): SectionType[] {
  return Object.keys(componentRegistry) as SectionType[]
}

/**
 * Get required section types
 */
export function getRequiredSectionTypes(): SectionType[] {
  return getAllSectionTypes().filter(
    (type) => componentRegistry[type].isRequired,
  )
}

/**
 * Get optional section types (with variants)
 */
export function getOptionalSectionTypes(): SectionType[] {
  return getAllSectionTypes().filter(
    (type) =>
      !componentRegistry[type].isRequired &&
      componentRegistry[type].variants.length > 0,
  )
}

/**
 * Get section types by category
 */
export function getSectionsByCategory(
  category: ComponentDefinition["category"],
): SectionType[] {
  return getAllSectionTypes().filter(
    (type) => componentRegistry[type].category === category,
  )
}

/**
 * Check if a section type has variants
 */
export function hasVariants(type: SectionType): boolean {
  return (componentRegistry[type]?.variants.length || 0) > 0
}

/**
 * Get total number of variants for a section type
 */
export function getVariantCount(type: SectionType): number {
  return componentRegistry[type]?.variants.length || 0
}

/**
 * Get variant index by ID
 */
export function getVariantIndex(type: SectionType, variantId: string): number {
  return (
    componentRegistry[type]?.variants.findIndex((v) => v.id === variantId) ?? -1
  )
}

/**
 * Get next variant ID (circular)
 */
export function getNextVariantId(
  type: SectionType,
  currentVariantId: string,
): string {
  const variants = componentRegistry[type]?.variants || []
  if (variants.length === 0) return currentVariantId

  const currentIndex = variants.findIndex((v) => v.id === currentVariantId)
  const nextIndex = (currentIndex + 1) % variants.length
  return variants[nextIndex].id
}

/**
 * Get previous variant ID (circular)
 */
export function getPrevVariantId(
  type: SectionType,
  currentVariantId: string,
): string {
  const variants = componentRegistry[type]?.variants || []
  if (variants.length === 0) return currentVariantId

  const currentIndex = variants.findIndex((v) => v.id === currentVariantId)
  const prevIndex = currentIndex === 0 ? variants.length - 1 : currentIndex - 1
  return variants[prevIndex].id
}
