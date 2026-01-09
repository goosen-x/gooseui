"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { sectionsRegistry } from "@/lib/constructor/sections-registry"
import type { SectionType } from "@/lib/constructor/types"
import { cn } from "@/lib/utils"

interface SectionSliderProps {
  type: SectionType
  currentVariant: string
  onVariantChange: (variant: string) => void
  compact?: boolean
}

export function SectionSlider({
  type,
  currentVariant,
  onVariantChange,
  compact = false,
}: SectionSliderProps) {
  const definition = sectionsRegistry[type]
  const variants = definition.variants
  const currentIndex = variants.findIndex((v) => v.id === currentVariant)

  const goToPrev = () => {
    const newIndex = currentIndex <= 0 ? variants.length - 1 : currentIndex - 1
    onVariantChange(variants[newIndex].id)
  }

  const goToNext = () => {
    const newIndex = currentIndex >= variants.length - 1 ? 0 : currentIndex + 1
    onVariantChange(variants[newIndex].id)
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 cursor-pointer"
          onClick={goToPrev}
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        <div className="flex gap-1">
          {variants.map((variant, index) => (
            <button
              type="button"
              key={variant.id}
              onClick={() => onVariantChange(variant.id)}
              className={cn(
                "h-6 min-w-6 rounded px-1.5 text-xs font-medium transition-colors cursor-pointer",
                currentVariant === variant.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 cursor-pointer"
          onClick={goToNext}
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Select {definition.name}</span>
        <span className="text-xs text-muted-foreground">
          {currentIndex + 1} / {variants.length}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 cursor-pointer"
          onClick={goToPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-1 gap-2 overflow-x-auto py-1 no-scrollbar">
          {variants.map((variant) => (
            <button
              type="button"
              key={variant.id}
              onClick={() => onVariantChange(variant.id)}
              className={cn(
                "flex shrink-0 flex-col items-center gap-1 rounded-lg border p-2 transition-all cursor-pointer",
                currentVariant === variant.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-muted hover:border-muted-foreground/50",
              )}
            >
              <div className="h-12 w-20 rounded bg-muted" />
              <span className="text-xs font-medium">{variant.name}</span>
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 cursor-pointer"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
