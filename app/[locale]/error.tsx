"use client"

import { useLocale } from "next-intl"
import { useEffect } from "react"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { useCopyToast } from "@/hooks/use-copy-toast"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { CopyButton } from "@/registry/gooseui/ui/copy-button"

const isDev = process.env.NODE_ENV === "development"

const en = {
  title: "Something went wrong",
  description: "An unexpected error occurred. Please try again later.",
  errorId: "Error ID:",
  home: "Go home",
  retry: "Try again",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Что-то пошло не так",
    description: "Произошла непредвиденная ошибка. Попробуйте ещё раз позже.",
    errorId: "ID ошибки:",
    home: "На главную",
    retry: "Повторить",
  },
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = content[useLocale() as Locale]
  const copyToast = useCopyToast()

  useEffect(() => {
    console.error(error)
  }, [error])

  const errorText = () =>
    `${error.name}: ${error.message}\n\n${error.stack || ""}`

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 pt-8 pb-32">
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
        <h2 className="text-2xl font-semibold tracking-tight">{t.title}</h2>
        <p className="max-w-md text-muted-foreground">{t.description}</p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/60">
            {t.errorId} {error.digest}
          </p>
        )}
      </div>

      {/* Dev mode error details */}
      {isDev && (
        <div className="relative w-full max-w-2xl rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-left">
          <CopyButton
            value={errorText}
            {...copyToast()}
            className="absolute right-2 top-2"
          />
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
          <Link href="/">{t.home}</Link>
        </Button>
        <Button onClick={reset}>{t.retry}</Button>
      </div>

      <ThemeCustomizer />
    </div>
  )
}
