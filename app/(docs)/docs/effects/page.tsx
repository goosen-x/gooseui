import { ArrowRightIcon, Sparkles } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const effects = [
  {
    name: "Border Beam",
    slug: "border-beam",
    description:
      "An animated beam effect that travels along the border of a container.",
    isNew: true,
    preview: (
      <div className="relative flex h-20 w-32 items-center justify-center rounded-lg border bg-background">
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            animation: "border-beam 3s linear infinite",
          }}
        />
        <span className="text-xs text-muted-foreground">Hover me</span>
      </div>
    ),
  },
]

const comingSoon = [
  "Spotlight",
  "Glow",
  "Shimmer",
  "Ripple",
  "Particles",
  "Aurora",
]

export const metadata = {
  title: "Effects",
  description:
    "Visual effects and animations to enhance your UI. Add polish and delight to your applications.",
}

export default function EffectsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Effects
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Visual effects and animations to enhance your UI. Add polish and
          delight to your applications.
        </p>
      </div>

      {/* Effects Grid */}
      <div className="space-y-6">
        <h2
          id="available"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Available Effects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {effects.map((effect) => (
            <Link
              key={effect.slug}
              href={`/docs/effects/${effect.slug}`}
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
                  {effect.preview}
                </div>

                {/* Info Area */}
                <div className="flex flex-col gap-1 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{effect.name}</h3>
                      {effect.isNew && (
                        <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {effect.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="space-y-6">
        <h2
          id="coming-soon"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Coming Soon
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoon.map((name) => (
            <div
              key={name}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-xl border bg-background opacity-60",
              )}
            >
              <div className="flex h-[140px] items-center justify-center border-b bg-muted/30 p-4">
                <Sparkles className="size-8 text-muted-foreground/50" />
              </div>
              <div className="flex flex-col gap-1 p-4">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">
                  Effect in development
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
