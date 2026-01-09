"use client"

import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"

export function HeroClassic() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24 md:py-32 min-h-[600px] flex items-center">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Badge */}
            <div className="inline-flex w-fit">
              <span className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-sm font-medium">
                <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                New Release v2.0
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Build beautiful <span className="text-primary">products</span>{" "}
                faster
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
                The modern platform for building exceptional digital
                experiences. Ship faster with pre-built components and powerful
                tools.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="cursor-pointer group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer group"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">2,000+</span>{" "}
                developers building with us
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative md:ml-auto">
            <div className="relative aspect-square min-h-[20rem] max-w-lg mx-auto md:max-w-none">
              {/* Decorative elements */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-2xl" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent" />

              {/* Main image placeholder */}
              <div className="relative h-full min-h-[20rem] rounded-2xl border bg-muted/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="h-16 w-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        UI
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your hero image here
                    </p>
                  </div>
                </div>

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -right-4 top-1/4 hidden md:block">
                <div className="rounded-lg border bg-background p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-500 text-xs">✓</span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Build completed</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 bottom-1/4 hidden md:block">
                <div className="rounded-lg border bg-background p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs">⚡</span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">99.9% uptime</p>
                      <p className="text-xs text-muted-foreground">
                        Last 30 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
