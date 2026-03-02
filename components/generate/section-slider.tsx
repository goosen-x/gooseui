"use client"

/**
 * Section Slider - Renders a section with CSS transform-based variant switching
 *
 * Features:
 * - Smooth CSS transform animations
 * - Circular navigation buttons on hover
 * - Dots indicator for current variant
 */

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getVariantIndex, getVariants } from "@/lib/generate/registry"
import { useEditorStore } from "@/lib/generate/store"
import type { SectionSchema } from "@/lib/generate/types"
import { cn } from "@/lib/utils"

interface SectionSliderProps {
  section: SectionSchema
  isSelected?: boolean
}

export function SectionSlider({ section, isSelected }: SectionSliderProps) {
  const nextVariant = useEditorStore((state) => state.nextVariant)
  const prevVariant = useEditorStore((state) => state.prevVariant)

  const variants = getVariants(section.type)
  const currentIndex = getVariantIndex(section.type, section.variant)
  const hasMultipleVariants = variants.length > 1

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    prevVariant(section.id)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    nextVariant(section.id)
  }

  // No variants available
  if (variants.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No variants available for {section.type}
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Variants container with CSS transform */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {variants.map((variant) => {
          const Component = variant.component
          return (
            <div key={variant.id} className="w-full shrink-0">
              <Component {...section.props} />
            </div>
          )
        })}
      </div>

      {/* Navigation buttons - visible on hover when multiple variants */}
      {hasMultipleVariants && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-10",
              "h-10 w-10 rounded-full shadow-lg cursor-pointer",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "bg-background/90 backdrop-blur-sm hover:bg-background",
            )}
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10",
              "h-10 w-10 rounded-full shadow-lg cursor-pointer",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "bg-background/90 backdrop-blur-sm hover:bg-background",
            )}
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {hasMultipleVariants && (
        <div
          className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 z-10",
            "flex items-center gap-2 rounded-full bg-background/90 px-3 py-2 backdrop-blur-sm shadow-lg",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          )}
        >
          {variants.map((variant, index) => (
            <button
              key={variant.id}
              className={cn(
                "h-2 w-2 rounded-full transition-all cursor-pointer",
                index === currentIndex
                  ? "bg-primary w-4"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              onClick={(e) => {
                e.stopPropagation()
                useEditorStore.getState().setVariant(section.id, variant.id)
              }}
            />
          ))}
        </div>
      )}

      {/* Section type label */}
      <div
        className={cn(
          "absolute top-2 left-2 z-10",
          "rounded-md bg-background/90 px-2 py-1 text-xs font-medium backdrop-blur-sm shadow-sm",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          isSelected && "opacity-100",
        )}
      >
        {section.type}
        {hasMultipleVariants && (
          <span className="ml-1 text-muted-foreground">
            ({currentIndex + 1}/{variants.length})
          </span>
        )}
      </div>
    </div>
  )
}
