"use client"

import { AnimateIcon } from "@/components/animate-ui/icons/icon"
import { Binary as BinaryAnimated } from "@/components/animate-ui/icons/binary"
import { Blocks as BlocksAnimated } from "@/components/animate-ui/icons/blocks"
import { BrushCleaning as BrushAnimated } from "@/components/animate-ui/icons/brush-cleaning"
import { Gauge as GaugeAnimated } from "@/components/animate-ui/icons/gauge"
import { PartyPopper as PartyPopperAnimated } from "@/components/animate-ui/icons/party-popper"
import { Terminal as TerminalAnimated } from "@/components/animate-ui/icons/terminal"

const features = [
  {
    icon: PartyPopperAnimated,
    title: "Animations & Effects",
    description:
      "Border Beam, text effects and other animations for attractive interfaces",
    animated: true,
  },
  {
    icon: GaugeAnimated,
    title: "Instant Installation",
    description:
      "One CLI command — and the component is in your project. No package dependencies",
    animated: true,
  },
  {
    icon: BinaryAnimated,
    title: "Full Control",
    description:
      "Code is copied to your project. Modify anything without restrictions",
    animated: true,
  },
  {
    icon: BrushAnimated,
    title: "Flexible Styling",
    description:
      "Tailwind CSS and CSS variables for easy customization to match your brand",
    animated: true,
  },
  {
    icon: BlocksAnimated,
    title: "Ready-made Blocks",
    description:
      "Sections for landing pages, forms, cards — assemble pages like building blocks",
    animated: true,
  },
  {
    icon: TerminalAnimated,
    title: "shadcn CLI",
    description: "Full compatibility with shadcn CLI. Use familiar commands",
    animated: true,
  },
]

export function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything for Modern Development
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Components that save time and help you build quality products
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            const isAnimated = "animated" in feature && feature.animated

            const cardContent = (
              <div className="flex gap-4 sm:block">
                <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 sm:mb-4">
                  {isAnimated ? (
                    <Icon size={24} className="text-primary" />
                  ) : (
                    <Icon className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            )

            if (isAnimated) {
              return (
                <AnimateIcon key={feature.title} animateOnHover animateOnTap asChild>
                  <div
                    className="relative group border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
                  >
                    {cardContent}
                  </div>
                </AnimateIcon>
              )
            }

            return (
              <div
                key={feature.title}
                className="relative group border bg-card p-6 hover:shadow-lg transition-shadow"
                style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
              >
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
