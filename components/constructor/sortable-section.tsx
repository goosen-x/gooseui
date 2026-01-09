"use client"

import { GripVertical, X } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { SectionSlider } from "./section-slider"
import { sectionsRegistry } from "@/lib/constructor/sections-registry"
import type { SectionConfig } from "@/lib/constructor/types"
import { cn } from "@/lib/utils"

interface SortableSectionProps {
  section: SectionConfig
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  onVariantChange: (variant: string) => void
  isDragging?: boolean
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>
}

export function SortableSection({
  section,
  isSelected,
  onSelect,
  onRemove,
  onVariantChange,
  isDragging,
  dragHandleProps,
}: SortableSectionProps) {
  const definition = sectionsRegistry[section.type]

  return (
    <div
      className={cn(
        "group rounded-lg border bg-card transition-all",
        isSelected && "ring-2 ring-primary",
        isDragging && "opacity-50",
      )}
    >
      <div
        className="flex items-center gap-2 p-3 cursor-pointer"
        onClick={onSelect}
        onKeyDown={(e) => e.key === "Enter" && onSelect()}
        role="button"
        tabIndex={0}
      >
        {/* Drag Handle */}
        <button
          type="button"
          className="shrink-0 cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
          {...dragHandleProps}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Section Name */}
        <span className="flex-1 text-sm font-medium">{definition.name}</span>

        {/* Variant Slider */}
        <SectionSlider
          type={section.type}
          currentVariant={section.variant}
          onVariantChange={onVariantChange}
          compact
        />

        {/* Remove Button (only for optional sections) */}
        {!section.isRequired && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}
