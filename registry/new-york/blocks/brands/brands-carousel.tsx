"use client"

import { cn } from "@/lib/utils"

const brands = [
  { name: "Vercel", logo: "▲" },
  { name: "Stripe", logo: "S" },
  { name: "GitHub", logo: "⬡" },
  { name: "Notion", logo: "N" },
  { name: "Linear", logo: "◇" },
  { name: "Figma", logo: "F" },
  { name: "Slack", logo: "#" },
  { name: "Discord", logo: "◯" },
]

interface BrandsCarouselProps {
  className?: string
  reverse?: boolean
  speed?: "slow" | "normal" | "fast"
}

export function BrandsCarousel({
  className,
  reverse = false,
  speed = "normal",
}: BrandsCarouselProps) {
  const speedMap = {
    slow: "40s",
    normal: "25s",
    fast: "15s",
  }

  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by industry leaders
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

          {/* Marquee Track */}
          <div
            className={cn(
              "flex gap-8 w-fit",
              "animate-marquee",
              reverse && "[animation-direction:reverse]",
            )}
            style={{ "--duration": speedMap[speed] } as React.CSSProperties}
          >
            {/* First set */}
            {brands.map((brand, i) => (
              <BrandLogo key={`brand-1-${i}`} brand={brand} />
            ))}
            {/* Duplicate for seamless loop */}
            {brands.map((brand, i) => (
              <BrandLogo key={`brand-2-${i}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandLogo({ brand }: { brand: { name: string; logo: string } }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-lg font-bold">
        {brand.logo}
      </div>
      <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
        {brand.name}
      </span>
    </div>
  )
}

/**
 * Double row variant with opposite directions
 */
export function BrandsCarouselDouble({ className }: { className?: string }) {
  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Powering the best teams worldwide
          </p>
        </div>

        {/* Double Marquee */}
        <div className="space-y-4">
          <BrandsCarousel className="py-0" speed="normal" />
          <BrandsCarousel className="py-0" speed="normal" reverse />
        </div>
      </div>
    </section>
  )
}
