import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"
import { SiteHeader } from "@/components/site/header"
import { ThemeCustomizer } from "@/components/theme-customizer"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <h1 className="text-[10rem] font-bold leading-none tracking-tighter text-primary/10">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold tracking-tighter text-primary">
                404
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Page not found
          </h2>
          <p className="max-w-md text-muted-foreground">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild>
            <Link href="/docs">Documentation</Link>
          </Button>
        </div>

        <ThemeCustomizer />
      </div>
    </>
  )
}
