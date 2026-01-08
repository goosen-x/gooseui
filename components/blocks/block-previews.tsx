"use client"

import type * as React from "react"
import { FooterColumns } from "@/registry/new-york/blocks/footers/footer-columns"
import { FooterNewsletter } from "@/registry/new-york/blocks/footers/footer-newsletter"
// Footers
import { FooterSimple } from "@/registry/new-york/blocks/footers/footer-simple"
import { HeaderAuth } from "@/registry/new-york/blocks/headers/header-auth"
// Headers
import { HeaderSimple } from "@/registry/new-york/blocks/headers/header-simple"
import { HeaderWithCta } from "@/registry/new-york/blocks/headers/header-with-cta"

/**
 * Map of block slugs to their preview components
 */
export const blockPreviews: Record<string, React.ReactNode> = {
  // Headers
  "header-simple": (
    <div className="w-full max-w-4xl scale-75 origin-top">
      <HeaderSimple />
    </div>
  ),
  "header-with-cta": (
    <div className="w-full max-w-4xl scale-75 origin-top">
      <HeaderWithCta />
    </div>
  ),
  "header-auth": (
    <div className="w-full max-w-4xl scale-75 origin-top">
      <HeaderAuth />
    </div>
  ),

  // Footers
  "footer-simple": (
    <div className="w-full max-w-4xl scale-75 origin-bottom">
      <FooterSimple />
    </div>
  ),
  "footer-columns": (
    <div className="w-full max-w-4xl scale-[0.6] origin-top">
      <FooterColumns />
    </div>
  ),
  "footer-newsletter": (
    <div className="w-full max-w-4xl scale-[0.6] origin-top">
      <FooterNewsletter />
    </div>
  ),
}

/**
 * Get preview component for a block
 */
export function getBlockPreview(slug: string): React.ReactNode | undefined {
  return blockPreviews[slug]
}
