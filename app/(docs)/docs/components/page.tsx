import { ArrowRightIcon, Palette, Sun, Bell, LayoutGrid } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { AnimatedTimer } from "@/registry/new-york/ui/animated-timer"
import { Button } from "@/registry/new-york/ui/button"
import { Card } from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"
import { Typography } from "@/registry/new-york/ui/typography"

// Component definitions
const components = [
  {
    name: "Animated Timer",
    slug: "animated-timer",
    description: "A beautiful animated countdown timer with flip animation.",
    category: "Display",
    preview: (
      <div className="scale-[0.35] origin-center">
        <AnimatedTimer showSeconds={false} />
      </div>
    ),
  },
  {
    name: "Button",
    slug: "button",
    description: "Displays a button or a component that looks like a button.",
    category: "Inputs",
    preview: (
      <div className="flex items-center gap-2">
        <Button size="sm">Button</Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
      </div>
    ),
  },
  {
    name: "Card",
    slug: "card",
    description: "Displays a card with header, content, and footer.",
    category: "Layout",
    preview: (
      <Card className="w-full max-w-[200px] p-3">
        <div className="text-sm font-medium">Card Title</div>
        <div className="text-xs text-muted-foreground">Card content</div>
      </Card>
    ),
  },
  {
    name: "Carousel",
    slug: "carousel",
    description: "A carousel with motion and swipe gestures built on Embla.",
    category: "Display",
    isNew: true,
    preview: (
      <div className="flex items-center gap-1">
        <div className="h-16 w-12 rounded bg-primary/20" />
        <div className="h-16 w-12 rounded bg-primary/40" />
        <div className="h-16 w-12 rounded bg-primary" />
        <div className="h-16 w-12 rounded bg-primary/40" />
        <div className="h-16 w-12 rounded bg-primary/20" />
      </div>
    ),
  },
  {
    name: "Input",
    slug: "input",
    description:
      "Displays a form input field or a component that looks like an input.",
    category: "Inputs",
    preview: <Input placeholder="Enter text..." className="max-w-[200px]" />,
  },
  {
    name: "Theme Customizer",
    slug: "theme-customizer",
    description: "Customize colors, radius, and appearance of your theme.",
    category: "Theme",
    isNew: true,
    preview: (
      <div className="flex items-center gap-2">
        <Palette className="h-8 w-8 text-primary" />
        <div className="flex gap-1">
          <div className="h-4 w-4 rounded-full bg-red-500" />
          <div className="h-4 w-4 rounded-full bg-blue-500" />
          <div className="h-4 w-4 rounded-full bg-green-500" />
        </div>
      </div>
    ),
  },
  {
    name: "Theme Switcher",
    slug: "theme-switcher",
    description: "Toggle between light, dark, and system themes.",
    category: "Theme",
    isNew: true,
    preview: (
      <div className="flex items-center gap-2">
        <Sun className="h-6 w-6 text-yellow-500" />
      </div>
    ),
  },
  {
    name: "Toast",
    slug: "toast",
    description: "A toast notification component powered by Sonner.",
    category: "Feedback",
    preview: (
      <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm">
        <Bell className="h-4 w-4" />
        <span className="text-xs">Toast message</span>
      </div>
    ),
  },
  {
    name: "Typography",
    slug: "typography",
    description:
      "Consistent text styling with semantic variants and gradient effects.",
    category: "Typography",
    preview: (
      <div className="flex flex-col items-center gap-1 text-center">
        <Typography variant="h4">Heading</Typography>
        <Typography variant="gradient" as="span" className="text-sm">
          Gradient
        </Typography>
      </div>
    ),
  },
]

// Group components by category
const groupedComponents = components.reduce(
  (acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = []
    }
    acc[component.category].push(component)
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
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Components
        </h1>
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
                  className="group"
                >
                  <div
                    className={cn(
                      "relative flex flex-col overflow-hidden rounded-xl border bg-background",
                      "transition-all duration-200",
                      "hover:border-foreground/20 hover:shadow-md",
                    )}
                  >
                    {/* Preview Area */}
                    <div className="flex h-[140px] items-center justify-center border-b bg-muted/30 p-4">
                      {component.preview}
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
      <div className="space-y-6">
        <h2
          id="coming-soon"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Coming Soon
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Select", "Checkbox", "Radio", "Switch", "Slider", "Tabs"].map(
            (name) => (
              <div
                key={name}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-xl border bg-background opacity-60",
                )}
              >
                <div className="flex h-[140px] items-center justify-center border-b bg-muted/30 p-4">
                  <span className="text-sm text-muted-foreground">
                    Preview coming soon
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Component in development
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
