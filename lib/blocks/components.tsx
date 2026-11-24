/**
 * Block components registry
 *
 * Maps block IDs to their React components for dynamic rendering.
 * This allows the preview system to render blocks by ID.
 */

import type { ComponentType } from "react"
import { HeaderMorphingDemo } from "@/components/blocks/block-demos"
// ===== BRANDS =====
import {
  BrandsCarousel,
  BrandsCarouselDouble,
} from "@/registry/gooseui/blocks/brands/brands-carousel"
// ===== FAQ =====
import { FAQAccordion } from "@/registry/gooseui/blocks/faq/faq-accordion"
import { FooterColumns } from "@/registry/gooseui/blocks/footers/footer-columns"
import { FooterNewsletter } from "@/registry/gooseui/blocks/footers/footer-newsletter"
// ===== FOOTERS =====
import { FooterSimple } from "@/registry/gooseui/blocks/footers/footer-simple"
import { HeaderAuth } from "@/registry/gooseui/blocks/headers/header-auth"
// ===== HEADERS =====
import { HeaderMegaMenu } from "@/registry/gooseui/blocks/headers/header-mega-menu"
import { HeaderSimple } from "@/registry/gooseui/blocks/headers/header-simple"
import { HeaderWithCta } from "@/registry/gooseui/blocks/headers/header-with-cta"
// ===== HERO =====
import { HeroClassic } from "@/registry/gooseui/blocks/hero/hero-classic"
import { HeroSplit } from "@/registry/gooseui/blocks/hero/hero-split"
// ===== SERVICES =====
import {
  ServicesGrid,
  ServicesMarquee,
} from "@/registry/gooseui/blocks/services/services-marquee"
// ===== WEB3 =====
import { TapToEarn } from "@/registry/gooseui/blocks/web3/tap-coin"

/**
 * Component registry mapping block IDs to React components
 */
export const blocksComponents: Record<string, ComponentType> = {
  // Headers
  "header-01": HeaderSimple,
  "header-02": HeaderWithCta,
  "header-03": HeaderAuth,
  "header-05": HeaderMegaMenu,
  "header-11": HeaderMorphingDemo,

  // Web3
  "web3-04": TapToEarn,

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
