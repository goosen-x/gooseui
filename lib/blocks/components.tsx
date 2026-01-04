/**
 * Block components registry
 *
 * Maps block IDs to their React components for dynamic rendering.
 * This allows the preview system to render blocks by ID.
 */

import type { ComponentType } from "react"

// ===== HEADERS =====
import { HeaderSimple } from "@/registry/new-york/blocks/headers/header-simple"
import { HeaderWithCta } from "@/registry/new-york/blocks/headers/header-with-cta"
import { HeaderAuth } from "@/registry/new-york/blocks/headers/header-auth"

// ===== FOOTERS =====
import { FooterSimple } from "@/registry/new-york/blocks/footers/footer-simple"
import { FooterColumns } from "@/registry/new-york/blocks/footers/footer-columns"
import { FooterNewsletter } from "@/registry/new-york/blocks/footers/footer-newsletter"

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
