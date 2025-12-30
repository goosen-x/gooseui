"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/registry/new-york/ui/button"
import { BorderBeam } from "@/registry/new-york/effects/border-beam"
import { cn } from "@/lib/utils"
import { customToast } from "@/lib/toast"

export function Hero() {
  const router = useRouter()

  const handleGetStarted = () => {
    customToast.success("Welcome to GooseUI!", {
      description: "Let's build something beautiful together",
    })
    router.push("/docs")
  }

  const handleComponents = () => {
    customToast.info("Exploring Components", {
      description: "Check out our collection of UI components",
    })
    router.push("/docs/components/button")
  }

  return (
    <div className="relative min-h-[calc(100svh-5rem)] flex items-center">
      {/* Dot background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient fade */}
      <div className="pointer-events-none absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 py-20 max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">
          {/* Left side - Text content */}
          <div className="flex-1">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-[1px] bg-background/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-4 mr-2"><rect width="256" height="256" fill="none"/><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
              <span>Custom shadcn/ui Registry</span>
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-bold tracking-tight text-balance">
              Build Modern Interfaces Faster
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground text-balance max-w-xl">
              A collection of beautiful components and effects for React. Copy
              the code, customize it, ship to production.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleGetStarted}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="backdrop-blur-[1px] bg-background/20" onClick={handleComponents}>
                Components
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Tailwind CSS</span>
              </div>
            </div>
          </div>

          {/* Right side - Card preview */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <div className="relative overflow-hidden rounded-xl border bg-muted/30 backdrop-blur-sm p-2">
              <div className="rounded-lg border bg-background overflow-hidden">
                <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <code className="text-xs text-muted-foreground ml-2">
                    npx shadcn@latest add @gooseui/button
                  </code>
                </div>
                <div className="p-8 flex items-center justify-center gap-4 min-h-[200px]">
                  <Button onClick={() => customToast.success("Primary Button", { description: "Default button style" })}>Primary</Button>
                  <Button variant="secondary" onClick={() => customToast.info("Secondary Button", { description: "Secondary button style" })}>Secondary</Button>
                  <Button variant="outline" onClick={() => customToast.warning("Outline Button", { description: "Outline button style" })}>Outline</Button>
                  <Button variant="ghost" onClick={() => customToast.error("Ghost Button", { description: "Ghost button style" })}>Ghost</Button>
                </div>
              </div>
              <BorderBeam duration={8} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
