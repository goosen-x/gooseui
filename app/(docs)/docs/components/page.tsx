import {
  ArrowRightIcon,
  ArrowUp,
  CircleCheck,
  Expand,
  Moon,
  Palette,
  X,
} from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { Badge } from "@/components/ui/badge"
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
import { Checkbox } from "@/registry/new-york/ui/checkbox"
import { DigitalClock } from "@/registry/new-york/ui/digital-clock"
import { Input } from "@/registry/new-york/ui/input"
import { Typography } from "@/registry/new-york/ui/typography"

// Preview components mapping (slug -> preview element)
const componentPreviews: Record<string, ReactNode> = {
  "animated-timer": (
    <div className="flex items-center justify-center scale-50 origin-center">
      <AnimatedTimer showSeconds={false} />
    </div>
  ),
  badge: (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="beta">Beta</Badge>
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
    <Card className="w-full h-full max-w-[200px] p-4 flex flex-col justify-center">
      <div className="text-sm font-medium">Card Title</div>
      <div className="text-xs text-muted-foreground mt-1">Card content here</div>
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
  checkbox: <Checkbox label="Accept terms" defaultChecked />,
  "digital-clock": (
    <div className="scale-[0.28] @sm:scale-[0.32] @md:scale-[0.38] origin-center">
      <DigitalClock showSeconds={false} />
    </div>
  ),
  input: <Input placeholder="Enter text..." className="max-w-[200px]" />,
  "morphing-dialog": (
    <div className="relative w-full max-w-[180px] overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="h-20 w-full bg-gradient-to-br from-blue-400 to-purple-500" />
      <div className="p-2">
        <p className="text-xs font-medium">Swiss Alps</p>
        <p className="text-[10px] text-muted-foreground">Click to expand</p>
      </div>
      <Expand className="absolute top-2 right-2 size-3 text-white/70" />
    </div>
  ),
  "promo-banner": (
    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 px-3 py-2 text-white">
      <span className="text-xs font-bold">SALE 50% OFF</span>
    </div>
  ),
  "theme-customizer": (
    <div className="flex gap-1 rounded-full border bg-background/70 p-1 shadow-lg backdrop-blur-xl">
      <div className="flex size-9 items-center justify-center rounded-full hover:bg-accent">
        <Moon className="size-5" />
      </div>
      <div className="flex size-9 items-center justify-center rounded-full hover:bg-accent">
        <Palette className="size-5" />
      </div>
    </div>
  ),
  toast: (
    <div className="relative flex w-full max-w-[220px] items-start gap-2 overflow-hidden rounded-lg border border-l-4 border-l-green-500 bg-popover p-3 shadow-lg">
      <CircleCheck className="mt-0.5 size-4 shrink-0 text-green-500" />
      <div className="flex-1 space-y-0.5">
        <p className="text-xs font-medium">Success</p>
        <p className="text-[10px] text-muted-foreground">Changes saved</p>
      </div>
      <X className="size-3 shrink-0 opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted/50">
        <div className="h-full w-[70%] bg-green-500" />
      </div>
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
  "scroll-to-top": (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
        <ArrowUp className="size-5" />
      </div>
      <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg">
        <ArrowUp className="size-4" />
        <span>Top</span>
      </div>
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
        <DocsPageNav title="Components" />
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
                      <Badge variant="beta" className="absolute top-2 right-2 z-10">
                        New
                      </Badge>
                    )}

                    {/* Preview Area */}
                    <div className="@container flex h-[140px] items-center justify-center overflow-hidden border-b bg-muted/30 p-4 max-w-full">
                      {component.preview || (
                        <span className="text-sm text-muted-foreground">
                          Preview
                        </span>
                      )}
                    </div>

                    {/* Info Area */}
                    <div className="flex flex-col gap-1 p-4 min-h-[88px]">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{component.name}</h3>
                        <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
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
                <div className="flex flex-col gap-1 p-4 min-h-[88px]">
                  <h3 className="font-semibold">{component.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
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
