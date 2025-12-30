"use client"

import { useEffect } from "react"
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-8xl font-bold tracking-tighter text-destructive">500</h1>
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
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          Go home
        </Button>
        <Button onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  )
}
