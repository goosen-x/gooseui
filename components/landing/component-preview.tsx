"use client"

import { ArrowUp, CircleCheck, Expand, X } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BaselineStatus } from "@/registry/new-york/ui/baseline-status"
import { Button } from "@/registry/new-york/ui/button"
import { DigitalClock } from "@/registry/new-york/ui/digital-clock"

export function ComponentPreview() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Component Library
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium UI components and effects for modern React apps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Digital Clock - Hero component */}
          <div
            className="relative overflow-hidden border bg-card p-6 md:col-span-2"
            style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 mb-6">
              <h3 className="font-semibold">Digital Clock</h3>
              <Badge variant="beta">New</Badge>
            </div>
            <div className="flex justify-center py-4 bg-muted/50 rounded-lg">
              <div className="scale-[0.6] sm:scale-75 md:scale-100 origin-center">
                <DigitalClock showSeconds />
              </div>
            </div>
          </div>

          {/* Morphing Dialog Preview */}
          <div
            className="relative overflow-hidden border bg-card p-6"
            style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">Morphing Dialog</h3>
              <Badge variant="beta">New</Badge>
            </div>
            <div className="relative w-full max-w-[220px] mx-auto overflow-hidden rounded-xl border bg-card shadow-sm cursor-pointer hover:scale-105 transition-transform">
              <div className="h-24 w-full bg-gradient-to-br from-blue-400 to-purple-500" />
              <div className="p-3">
                <p className="text-sm font-medium">Swiss Alps</p>
                <p className="text-xs text-muted-foreground">Click to expand</p>
              </div>
              <Expand className="absolute top-2 right-2 size-4 text-white/70" />
            </div>
          </div>

          {/* Toast Preview */}
          <div
            className="relative overflow-hidden border bg-card p-6"
            style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">Toast Notifications</h3>
            </div>
            <div className="space-y-3">
              <div className="relative flex items-start gap-3 overflow-hidden rounded-lg border border-l-4 border-l-green-500 bg-popover p-3 shadow-lg">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-green-500" />
                <div className="flex-1 space-y-0.5">
                  <p className="text-sm font-medium">Success</p>
                  <p className="text-xs text-muted-foreground">Changes saved successfully</p>
                </div>
                <X className="size-4 shrink-0 opacity-50 cursor-pointer" />
              </div>
              <div className="relative flex items-start gap-3 overflow-hidden rounded-lg border border-l-4 border-l-blue-500 bg-popover p-3 shadow-lg">
                <div className="mt-0.5 size-4 shrink-0 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">i</span>
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="text-sm font-medium">Info</p>
                  <p className="text-xs text-muted-foreground">New update available</p>
                </div>
                <X className="size-4 shrink-0 opacity-50 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Badge Preview */}
          <div
            className="relative overflow-hidden border bg-card p-6"
            style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
          >
            <h3 className="font-semibold mb-4">Badge</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="beta">Beta</Badge>
            </div>
          </div>

          {/* Baseline Status Preview */}
          <div
            className="relative overflow-hidden border bg-card p-6"
            style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">Baseline Status</h3>
              <Badge variant="beta">New</Badge>
            </div>
            <div className="space-y-3">
              <BaselineStatus status="widely" year={2023} />
              <BaselineStatus status="newly" year={2024} />
              <BaselineStatus status="limited" />
            </div>
          </div>

          {/* Scroll To Top Preview */}
          <div
            className="relative overflow-hidden border bg-card p-6 md:col-span-2"
            style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">Scroll To Top</h3>
              <Badge variant="beta">New</Badge>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 py-4">
              {/* Default */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <ArrowUp className="size-5 text-white" />
                </div>
                <span className="text-xs text-muted-foreground">Default</span>
              </div>
              {/* Pill */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg cursor-pointer hover:bg-primary/90 transition-colors">
                  <ArrowUp className="size-4" />
                  <span>Back to top</span>
                </div>
                <span className="text-xs text-muted-foreground">Pill</span>
              </div>
              {/* Progress */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative flex size-12 items-center justify-center rounded-full bg-background shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <svg className="absolute inset-0 -rotate-90" width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted" />
                    <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="132" strokeDashoffset="44" className="text-primary" />
                  </svg>
                  <ArrowUp className="size-5 relative z-10" />
                </div>
                <span className="text-xs text-muted-foreground">Progress</span>
              </div>
              {/* Text */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <span className="text-sm font-medium">Scroll to top</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="overflow-visible">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-20" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="63" strokeDashoffset="21" style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
                    <path d="M12 16V8M8 12l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="text-xs text-muted-foreground">Text</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs/components">View All Components</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
