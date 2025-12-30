"use client"

import Link from "next/link"
import { useEffect } from "react"
import { SiteHeader } from "@/components/site/header"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { Button } from "@/registry/new-york/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <SiteHeader />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <h1 className="text-[10rem] font-bold leading-none tracking-tighter text-primary/10">
              500
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold tracking-tighter text-primary">
                500
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Something went wrong
          </h2>
          <p className="max-w-md text-muted-foreground">
            An unexpected error occurred. Please try again later.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/60">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
          <Button onClick={reset}>Try again</Button>
        </div>

        <ThemeCustomizer />
      </div>
    </>
  )
}
