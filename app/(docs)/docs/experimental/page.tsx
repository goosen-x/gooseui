import { ArrowRightIcon, FlaskConical } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BaselineStatus } from "@/registry/new-york/ui/baseline-status"

const experiments = [
  {
    name: "Anchor Tooltip",
    slug: "anchor-tooltip",
    description:
      "CSS-only tooltips using the Anchor Positioning API. No JavaScript required.",
    preview: (
      <div className="relative flex items-center justify-center">
        <div className="relative">
          <button className="px-4 py-2 rounded-md border bg-background text-sm">
            Hover me
          </button>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground text-background text-xs whitespace-nowrap">
            Tooltip
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
          </div>
        </div>
      </div>
    ),
  },
]

export const metadata = {
  title: "Experimental",
  description:
    "Experimental components using cutting-edge browser APIs. Limited browser support.",
}

export default function ExperimentalPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Experimental
          </h1>
          <Badge variant="experimental">Limited Availability</Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Components using cutting-edge browser APIs that may have limited
          browser support. These features are experimental and may change or be
          removed in future versions.
        </p>
      </div>

      {/* Warning */}
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/50 dark:bg-orange-500/10">
        <div className="flex gap-3">
          <FlaskConical className="size-5 text-orange-600 shrink-0 mt-0.5 dark:text-orange-500" />
          <div className="space-y-1">
            <p className="font-medium text-orange-600 dark:text-orange-500">Experimental Features</p>
            <p className="text-sm text-muted-foreground">
              These components use modern CSS APIs like Anchor Positioning that
              are not yet supported in all browsers. Check browser compatibility
              before using in production.
            </p>
          </div>
        </div>
      </div>

      {/* Browser Support */}
      <div className="space-y-6">
        <h2
          id="browser-support"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Browser Support
        </h2>
        <p className="text-sm text-muted-foreground">
          Experimental components use the following CSS features with limited
          browser support:
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">CSS Anchor Positioning</h3>
            <BaselineStatus
              featureId="anchor-positioning"
              browserCheck="anchor-positioning"
            />
            <p className="text-sm text-muted-foreground">
              Used by: <code className="text-xs bg-muted px-1 py-0.5 rounded">Anchor Tooltip</code>
            </p>
          </div>
        </div>
        <div className="rounded-lg border p-4 bg-muted/30">
          <h4 className="font-medium mb-2">Unsupported Properties</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              <code className="text-xs bg-muted px-1 py-0.5 rounded">anchor-name</code> — defines an anchor element
            </li>
            <li>
              <code className="text-xs bg-muted px-1 py-0.5 rounded">position-anchor</code> — references an anchor
            </li>
            <li>
              <code className="text-xs bg-muted px-1 py-0.5 rounded">anchor()</code> — positions relative to anchor
            </li>
            <li>
              <code className="text-xs bg-muted px-1 py-0.5 rounded">@position-try</code> — fallback positioning
            </li>
          </ul>
        </div>
      </div>

      {/* Experiments Grid */}
      <div className="space-y-6">
        <h2
          id="available"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Available Experiments
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment) => (
            <Link
              key={experiment.slug}
              href={`/docs/experimental/${experiment.slug}`}
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
                  {experiment.preview}
                </div>

                {/* Info Area */}
                <div className="flex flex-col gap-1 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{experiment.name}</h3>
                      <Badge variant="experimental">Exp</Badge>
                    </div>
                    <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {experiment.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
