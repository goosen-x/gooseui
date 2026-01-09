import {
  Code,
  LayoutGrid,
  Palette,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const demoFeatures = [
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
    icon: Code,
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
    icon: LayoutGrid,
    title: "Ready-made Blocks",
    description:
      "Sections for landing pages, forms, cards — assemble pages like building blocks",
  },
  {
    icon: Terminal,
    title: "shadcn CLI",
    description:
      "Full compatibility with shadcn CLI. Use familiar commands",
  },
]

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

interface FeaturesGridProps {
  title?: string
  subtitle?: string
  features?: Feature[]
  className?: string
}

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <div className="rounded-xl border bg-card p-6 transition-colors hover:bg-muted/50">
      <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-6 text-primary" />
      </div>
      <h3 className="mb-2 font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export function FeaturesGrid({
  title = "Everything for Modern Development",
  subtitle = "Components that save time and help you build quality products",
  features = demoFeatures,
  className,
}: FeaturesGridProps) {
  return (
    <section className={cn("py-20 px-6", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export type { Feature, FeaturesGridProps }
