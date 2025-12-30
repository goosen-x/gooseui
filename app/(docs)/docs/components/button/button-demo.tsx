"use client"

import { Button } from "@/registry/new-york/ui/button"
import { customToast } from "@/lib/toast"

export function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border p-6">
      <Button onClick={() => customToast.success("Primary button clicked")}>
        Primary
      </Button>
      <Button
        variant="secondary"
        onClick={() => customToast.info("Secondary button clicked")}
      >
        Secondary
      </Button>
      <Button
        variant="destructive"
        onClick={() => customToast.error("Destructive button clicked")}
      >
        Destructive
      </Button>
      <Button
        variant="outline"
        onClick={() => customToast.info("Outline button clicked")}
      >
        Outline
      </Button>
      <Button
        variant="ghost"
        onClick={() => customToast.info("Ghost button clicked")}
      >
        Ghost
      </Button>
      <Button
        variant="link"
        onClick={() => customToast.info("Link button clicked")}
      >
        Link
      </Button>
    </div>
  )
}

export function ButtonVariantDemo({
  variant,
  label,
}: {
  variant?: "secondary" | "destructive" | "outline" | "ghost" | "link"
  label: string
}) {
  const getToast = () => {
    switch (variant) {
      case "destructive":
        return customToast.error(`${label} button clicked`)
      case "secondary":
      case "outline":
      case "ghost":
      case "link":
        return customToast.info(`${label} button clicked`)
      default:
        return customToast.success(`${label} button clicked`)
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Button variant={variant} onClick={getToast}>
        {label}
      </Button>
    </div>
  )
}

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border p-6">
      <Button size="sm" onClick={() => customToast.info("Small button clicked")}>
        Small
      </Button>
      <Button
        size="default"
        onClick={() => customToast.info("Default button clicked")}
      >
        Default
      </Button>
      <Button size="lg" onClick={() => customToast.info("Large button clicked")}>
        Large
      </Button>
      <Button
        size="icon"
        onClick={() => customToast.info("Icon button clicked")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Button>
    </div>
  )
}
