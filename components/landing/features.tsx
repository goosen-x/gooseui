"use client"

import { Blocks, Code2, Palette, Sparkles, Terminal, Zap } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Animations & Effects",
    description:
      "Border Beam, text effects and other animations for attractive interfaces",
  },
  {
    icon: Zap,
    title: "Instant Installation",
    description:
      "One CLI command — and the component is in your project. No package dependencies",
  },
  {
    icon: Code2,
    title: "Full Control",
    description:
      "Code is copied to your project. Modify anything without restrictions",
  },
  {
    icon: Palette,
    title: "Flexible Styling",
    description:
      "Tailwind CSS and CSS variables for easy customization to match your brand",
  },
  {
    icon: Blocks,
    title: "Ready-made Blocks",
    description:
      "Sections for landing pages, forms, cards — assemble pages like building blocks",
  },
  {
    icon: Terminal,
    title: "shadcn CLI",
    description: "Full compatibility with shadcn CLI. Use familiar commands",
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
            return (
              <div
                key={feature.title}
                className="relative group rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
