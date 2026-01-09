"use client"

import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"

const features = [
  "Lightning fast performance",
  "Built-in accessibility",
  "Fully customizable",
  "Free updates forever",
]

export function HeroSplit() {
  return (
    <section className="relative min-h-[600px] flex">
      {/* Left Side - Content */}
      <div className="flex w-full flex-col justify-center px-6 py-16 md:w-1/2 md:px-12 lg:px-24">
        <div className="mx-auto max-w-xl space-y-8">
          {/* Eyebrow */}
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Introducing v2.0
          </p>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              The future of web development is here
            </h1>
            <p className="text-lg text-muted-foreground lg:text-xl">
              Build stunning websites in minutes, not months. Our platform gives
              you everything you need to launch your next big idea.
            </p>
          </div>

          {/* Feature List */}
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="cursor-pointer group">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="ghost" className="cursor-pointer">
              View Documentation
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-4 border-t pt-8">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4.9/5</span> from
              1,200+ reviews
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20" />

        {/* Placeholder image area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-2xl aspect-[4/3] mx-8">
            {/* Mock browser window */}
            <div className="relative rounded-xl border bg-background shadow-2xl overflow-hidden">
              {/* Browser header */}
              <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 rounded-md bg-muted flex items-center px-3">
                    <span className="text-xs text-muted-foreground">
                      https://yoursite.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Browser content */}
              <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted p-8">
                <div className="h-full rounded-lg border border-dashed border-muted-foreground/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">✦</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your product screenshot
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 rounded-lg border bg-background p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold">Deployed!</p>
                  <p className="text-xs text-muted-foreground">2 seconds ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </section>
  )
}
