"use client"

import { CurvedText } from "@/registry/new-york/ui/curved-text"

/**
 * Curved Text Marquee Block
 *
 * Animated curved text that scrolls horizontally
 * Perfect for branding sections and visual interest
 */
export function CurvedTextMarquee() {
  return (
    <section className="py-4 sm:py-8">
      <CurvedText
        text="GooseUI ✦ Premium Components ✦ shadcn/ui ✦ React ✦ Tailwind CSS ✦ "
        duration={80}
        direction="right"
        fontSize={40}
        flatness={2.0}
        height={300}
        curve="up"
        className="text-primary/80 [&_text]:[font-size:28px] sm:[&_text]:[font-size:40px]"
        separator="✦"
        separatorClassName="fill-foreground"
      />
    </section>
  )
}
