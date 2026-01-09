/**
 * Block components registry
 *
 * Maps block IDs to their React components for dynamic rendering.
 * This allows the preview system to render blocks by ID.
 */

import type { ComponentType } from "react"
// ===== BRANDS =====
import {
  BrandsCarousel,
  BrandsCarouselDouble,
} from "@/registry/new-york/blocks/brands/brands-carousel"
import { FooterColumns } from "@/registry/new-york/blocks/footers/footer-columns"
import { FooterNewsletter } from "@/registry/new-york/blocks/footers/footer-newsletter"
// ===== FOOTERS =====
import { FooterSimple } from "@/registry/new-york/blocks/footers/footer-simple"
import { HeaderAuth } from "@/registry/new-york/blocks/headers/header-auth"
// ===== HEADERS =====
import { HeaderSimple } from "@/registry/new-york/blocks/headers/header-simple"
import { HeaderWithCta } from "@/registry/new-york/blocks/headers/header-with-cta"
// ===== HERO =====
import { HeroClassic } from "@/registry/new-york/blocks/hero/hero-classic"
import { HeroSplit } from "@/registry/new-york/blocks/hero/hero-split"
// ===== SERVICES =====
import {
  ServicesGrid,
  ServicesMarquee,
} from "@/registry/new-york/blocks/services/services-marquee"
// ===== FAQ =====
import { FAQAccordion } from "@/registry/new-york/blocks/faq/faq-accordion"

/**
 * Component registry mapping block IDs to React components
 */
export const blocksComponents: Record<string, ComponentType> = {
  // Headers
  "header-01": HeaderSimple,
  "header-02": HeaderWithCta,
  "header-03": HeaderAuth,

  // Footers
  "footer-01": FooterSimple,
  "footer-02": FooterColumns,
  "footer-03": FooterNewsletter,

  // Hero
  "hero-01": HeroClassic,
  "hero-02": HeroSplit,

  // Brands
  "brands-01": BrandsCarousel,
  "brands-02": BrandsCarouselDouble,

  // Services
  "services-01": ServicesMarquee,
  "services-02": ServicesGrid,

  // FAQ
  "faq-01": FAQAccordion,
}

/**
 * Get component by block ID
 */
export function getBlockComponent(id: string): ComponentType | undefined {
  return blocksComponents[id]
}

/**
 * Check if block has a component
 */
export function hasBlockComponent(id: string): boolean {
  return id in blocksComponents
}

/**
 * Get all registered block IDs
 */
export function getRegisteredBlockIds(): string[] {
  return Object.keys(blocksComponents)
}
