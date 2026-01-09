"use client"

import { Download, Plus, Sparkles } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  getOptionalSectionTypes,
  sectionsRegistry,
} from "@/lib/constructor/sections-registry"
import type { SectionConfig, SectionType } from "@/lib/constructor/types"
import { SortableSection } from "./sortable-section"

interface ConstructorSidebarProps {
  sections: SectionConfig[]
  selectedSectionId: string | null
  onSelectSection: (id: string | null) => void
  onRemoveSection: (id: string) => void
  onUpdateVariant: (id: string, variant: string) => void
  onAddSection: (type: SectionType) => void
  onReorderSections: (sections: SectionConfig[]) => void
}

export function ConstructorSidebar({
  sections,
  selectedSectionId,
  onSelectSection,
  onRemoveSection,
  onUpdateVariant,
  onAddSection,
  onReorderSections,
}: ConstructorSidebarProps) {
  // Get section types that can be added (optional and not already in the list)
  const existingTypes = new Set(sections.map((s) => s.type))
  const availableTypes = getOptionalSectionTypes().filter(
    (type) => !existingTypes.has(type),
  )

  // Simple drag and drop state
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newSections = [...sections]
    const [draggedSection] = newSections.splice(draggedIndex, 1)
    newSections.splice(index, 0, draggedSection)
    onReorderSections(newSections)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="flex h-full flex-col border-l bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">Sections</h2>
        {availableTypes.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 cursor-pointer"
              >
                <Plus className="mr-1 h-3 w-3" />
                Add
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => onAddSection(type)}
                  className="cursor-pointer"
                >
                  {sectionsRegistry[type].name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Sections List */}
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <SortableSection
              section={section}
              isSelected={selectedSectionId === section.id}
              onSelect={() =>
                onSelectSection(
                  selectedSectionId === section.id ? null : section.id,
                )
              }
              onRemove={() => onRemoveSection(section.id)}
              onVariantChange={(variant) =>
                onUpdateVariant(section.id, variant)
              }
              isDragging={draggedIndex === index}
            />
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="space-y-2 border-t p-4">
        <Button className="w-full cursor-pointer" variant="default">
          <Download className="mr-2 h-4 w-4" />
          Download Landing
        </Button>
        <Button className="w-full cursor-pointer" variant="outline">
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </Button>
      </div>
    </div>
  )
}
