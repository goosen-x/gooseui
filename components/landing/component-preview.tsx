"use client"

import Link from "next/link"
import { BorderBeam } from "@/registry/new-york/effects/border-beam"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"

export function ComponentPreview() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Component Library
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            UI components and effects, ready to use
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Button Preview */}
          <div className="relative overflow-hidden rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-6 flex gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Card Preview */}
          <div className="relative overflow-hidden rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Cards</h3>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Notifications</CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </CardContent>
            </Card>
          </div>

          {/* Input Preview */}
          <div className="relative overflow-hidden rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Inputs</h3>
            <div className="space-y-3 max-w-sm">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
              <Input placeholder="Disabled" disabled />
            </div>
          </div>

          {/* Border Beam Preview */}
          <div className="relative overflow-hidden rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">Border Beam</h3>
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                NEW
              </span>
            </div>
            <div className="relative overflow-hidden rounded-lg border p-8 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Animated beam of light
              </p>
              <BorderBeam duration={6} />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs/components/button">View All Components</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
