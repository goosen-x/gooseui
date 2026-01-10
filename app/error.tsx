"use client"

import { Check, Copy } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { Button } from "@/registry/new-york/ui/button"

const isDev = process.env.NODE_ENV === "development"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    console.error(error)
  }, [error])

  const copyError = async () => {
    const text = `${error.name}: ${error.message}\n\n${error.stack || ""}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            {/* Background - Cyan */}
            <h1 className="text-[16rem] font-bold leading-none tracking-tighter text-cyan-500/[0.03] select-none translate-x-1.5">
              500
            </h1>
            {/* Background - Red */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16rem] font-bold leading-none tracking-tighter text-red-500/[0.03] -translate-x-1.5">
                500
              </span>
            </div>
            {/* Background - Main */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16rem] font-bold leading-none tracking-tighter text-primary/10">
                500
              </span>
            </div>
            {/* Front - Cyan */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold tracking-tighter text-cyan-500/30 translate-x-[3px]">
                500
              </span>
            </div>
            {/* Front - Red */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold tracking-tighter text-red-500/30 -translate-x-[3px]">
                500
              </span>
            </div>
            {/* Front - Main */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold tracking-tighter text-foreground">
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

        {/* Dev mode error details */}
        {isDev && (
          <div className="relative w-full max-w-2xl rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-left">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 cursor-pointer"
              onClick={copyError}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <p className="mb-2 pr-10 font-mono text-sm font-semibold text-destructive">
              {error.name}: {error.message}
            </p>
            {error.stack && (
              <pre className="max-h-64 overflow-auto whitespace-pre-wrap font-mono text-xs text-muted-foreground">
                {error.stack}
              </pre>
            )}
          </div>
        )}

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
