"use client"

import * as React from "react"
import { PromoBanner } from "@/registry/new-york/ui/promo-banner"

export function PromoBannerDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
      >
        Show Promo Banner
      </button>

      {isOpen && (
        <PromoBanner
          title="Winter Campaign"
          headline="START 2025 WITH A BANG!"
          price={229}
          originalPrice={1444}
          ctaText="Get Bundle"
          ctaHref="#"
          marqueeText="3 DAYS LEFT • FIRST 100 ONLY"
          position="bottom-right"
          onClose={() => setIsOpen(false)}
          defaultOpen={true}
        />
      )}
    </div>
  )
}

export function PromoBannerPositions() {
  const [position, setPosition] = React.useState<
    "bottom-right" | "bottom-left" | "top-right" | "top-left" | null
  >(null)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setPosition("top-left")}
          className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 cursor-pointer"
        >
          Top Left
        </button>
        <button
          onClick={() => setPosition("top-right")}
          className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 cursor-pointer"
        >
          Top Right
        </button>
        <button
          onClick={() => setPosition("bottom-left")}
          className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 cursor-pointer"
        >
          Bottom Left
        </button>
        <button
          onClick={() => setPosition("bottom-right")}
          className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 cursor-pointer"
        >
          Bottom Right
        </button>
      </div>

      {position && (
        <PromoBanner
          title="Flash Sale"
          headline="50% OFF EVERYTHING!"
          price={49}
          originalPrice={99}
          ctaText="Shop Now"
          ctaHref="#"
          marqueeText="LIMITED TIME OFFER"
          position={position}
          gradientFrom="from-orange-500"
          gradientTo="to-red-600"
          onClose={() => setPosition(null)}
          defaultOpen={true}
        />
      )}
    </div>
  )
}

export function PromoBannerGradients() {
  const [variant, setVariant] = React.useState<string | null>(null)

  const gradients = [
    { name: "Violet-Pink", from: "from-violet-600", to: "to-pink-600" },
    { name: "Blue-Cyan", from: "from-blue-600", to: "to-cyan-500" },
    { name: "Green-Teal", from: "from-green-500", to: "to-teal-500" },
    { name: "Orange-Red", from: "from-orange-500", to: "to-red-600" },
  ]

  const selected = gradients.find((g) => g.name === variant)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {gradients.map((g) => (
          <button
            key={g.name}
            onClick={() => setVariant(g.name)}
            className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 cursor-pointer"
          >
            {g.name}
          </button>
        ))}
      </div>

      {selected && (
        <PromoBanner
          title="New Year Sale"
          headline="SAVE BIG TODAY!"
          price={199}
          originalPrice={599}
          ctaText="Claim Offer"
          ctaHref="#"
          marqueeText="ENDS MIDNIGHT"
          position="bottom-right"
          gradientFrom={selected.from}
          gradientTo={selected.to}
          onClose={() => setVariant(null)}
          defaultOpen={true}
        />
      )}
    </div>
  )
}
