import { ArrowRightIcon, Bell, Check, Palette } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import {
  getAvailableComponents,
  getComingSoonComponents,
  type NavItem,
} from "@/lib/config/docs-navigation"
import { cn } from "@/lib/utils"
import { AnimatedTimer } from "@/registry/new-york/ui/animated-timer"
import { BaselineStatus } from "@/registry/new-york/ui/baseline-status"
import { Button } from "@/registry/new-york/ui/button"
import { Card } from "@/registry/new-york/ui/card"
import { DigitalClock } from "@/registry/new-york/ui/digital-clock"
import { Input } from "@/registry/new-york/ui/input"
import { Typography } from "@/registry/new-york/ui/typography"

// Preview components mapping (slug -> preview element)
const componentPreviews: Record<string, ReactNode> = {
  "animated-timer": (
    <div className="scale-[0.35] origin-center">
      <AnimatedTimer showSeconds={false} />
    </div>
  ),
  "baseline-status": (
    <div className="flex flex-col gap-2">
      <BaselineStatus status="widely" year={2023} size="sm" />
      <BaselineStatus status="newly" year={2024} size="sm" />
    </div>
  ),
  button: (
    <div className="flex items-center gap-2">
      <Button size="sm">Button</Button>
      <Button size="sm" variant="outline">
        Outline
      </Button>
    </div>
  ),
  card: (
    <Card className="w-full max-w-[200px] p-3">
      <div className="text-sm font-medium">Card Title</div>
      <div className="text-xs text-muted-foreground">Card content</div>
    </Card>
  ),
  carousel: (
    <div className="flex items-center gap-1">
      <div className="h-16 w-12 rounded bg-primary/20" />
      <div className="h-16 w-12 rounded bg-primary/40" />
      <div className="h-16 w-12 rounded bg-primary" />
      <div className="h-16 w-12 rounded bg-primary/40" />
      <div className="h-16 w-12 rounded bg-primary/20" />
    </div>
  ),
  checkbox: (
    <div className="flex items-center gap-3">
      <div className="h-4 w-4 rounded border-2 border-primary flex items-center justify-center">
        <Check className="h-3 w-3 text-primary" />
      </div>
      <span className="text-sm">Accept terms</span>
    </div>
  ),
  "digital-clock": (
    <div className="scale-[0.25] origin-center">
      <DigitalClock showSeconds={false} />
    </div>
  ),
  input: <Input placeholder="Enter text..." className="max-w-[200px]" />,
  "promo-banner": (
    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 px-3 py-2 text-white">
      <span className="text-xs font-bold">SALE 50% OFF</span>
    </div>
  ),
  "theme-customizer": (
    <div className="flex items-center gap-2">
      <Palette className="h-8 w-8 text-primary" />
      <div className="flex gap-1">
        <div className="h-4 w-4 rounded-full bg-red-500" />
        <div className="h-4 w-4 rounded-full bg-blue-500" />
        <div className="h-4 w-4 rounded-full bg-green-500" />
      </div>
    </div>
  ),
  toast: (
    <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm">
      <Bell className="h-4 w-4" />
      <span className="text-xs">Toast message</span>
    </div>
  ),
  typography: (
    <div className="flex flex-col items-center gap-1 text-center">
      <Typography variant="h4">Heading</Typography>
      <Typography variant="gradient" as="span" className="text-sm">
        Gradient
      </Typography>
    </div>
  ),
}

// Get components from single source of truth
const availableComponents = getAvailableComponents()
const comingSoonComponents = getComingSoonComponents()

// Merge navigation data with previews
const components = availableComponents.map((item) => ({
  ...item,
  name: item.title,
  preview: componentPreviews[item.slug] || null,
}))

// Group components by category
const groupedComponents = components.reduce(
  (acc, component) => {
    const category = component.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(component)
    return acc
  },
  {} as Record<string, typeof components>,
)

export const metadata = {
  title: "Components",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS. Copy and paste into your apps. Open source.",
}

export default function ComponentsPage() {
  return (
    <div className="space-y-10 overflow-x-hidden">
      {/* Header */}
      <div className="space-y-4">
        <DocsPageNav
          title="Components"
          prevHref="/docs/cli"
          nextHref="/docs/components/animated-timer"
        />
        <p className="text-lg text-muted-foreground max-w-3xl">
          Beautifully designed components built with Radix UI and Tailwind CSS.
          Copy and paste into your apps. Open source.
        </p>
      </div>

      {/* Components Grid by Category */}
      {Object.entries(groupedComponents).map(
        ([category, categoryComponents]) => (
          <div key={category} className="space-y-6">
            <h2
              id={category.toLowerCase().replace(/\s+/g, "-")}
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryComponents.map((component) => (
                <Link
                  key={component.slug}
                  href={`/docs/components/${component.slug}`}
                  className="group min-w-0"
                >
                  <div
                    className={cn(
                      "relative flex flex-col overflow-hidden rounded-xl border bg-background",
                      "transition-all duration-200",
                      "hover:border-foreground/20 hover:shadow-md",
                    )}
                  >
                    {/* New Badge */}
                    {component.isNew && !component.isDraft && (
                      <Badge className="absolute top-2 right-2 z-10 h-5 bg-primary px-1.5 text-[10px] text-white">
                        New
                      </Badge>
                    )}

                    {/* Preview Area */}
                    <div className="flex h-[140px] items-center justify-center overflow-hidden border-b bg-muted/30 p-4 max-w-full">
                      {component.preview || (
                        <span className="text-sm text-muted-foreground">
                          Preview
                        </span>
                      )}
                    </div>

                    {/* Info Area */}
                    <div className="flex flex-col gap-1 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{component.name}</h3>
                        <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {component.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ),
      )}

      {/* Coming Soon Section */}
      {comingSoonComponents.length > 0 && (
        <div className="space-y-6">
          <h2
            id="coming-soon"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Coming Soon
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoonComponents.map((component) => (
              <div
                key={component.slug}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-xl border bg-background opacity-60 min-w-0",
                )}
              >
                <div className="flex h-[140px] items-center justify-center border-b bg-muted/30 p-4">
                  <span className="text-sm text-muted-foreground">
                    Preview coming soon
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="font-semibold">{component.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {component.description || "Component in development"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
