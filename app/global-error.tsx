"use client"

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <h1 className="text-[10rem] font-bold leading-none tracking-tighter text-neutral-900/10 dark:text-neutral-100/10">
                500
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold tracking-tighter text-neutral-900 dark:text-neutral-100">
                  500
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Critical error
            </h2>
            <p className="max-w-md text-neutral-500 dark:text-neutral-400">
              A critical error occurred. Please refresh the page.
            </p>
            {error.digest && (
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Error ID: {error.digest}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              Go home
            </button>
            <button
              onClick={reset}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
