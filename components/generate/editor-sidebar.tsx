"use client"

/**
 * Editor Sidebar - Section list with drag & drop reordering
 */

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Lock,
  Plus,
  Trash2,
} from "lucide-react"
import { useEffect, useId, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  componentRegistry,
  getOptionalSectionTypes,
  getVariantCount,
  getVariantIndex,
} from "@/lib/generate/registry"
import { useEditorStore } from "@/lib/generate/store"
import type { SectionSchema, SectionType } from "@/lib/generate/types"
import { cn } from "@/lib/utils"

interface SortableSectionItemProps {
  section: SectionSchema
}

function SortableSectionItem({ section }: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const selectedId = useEditorStore((state) => state.selectedId)
  const selectSection = useEditorStore((state) => state.selectSection)
  const removeSection = useEditorStore((state) => state.removeSection)
  const nextVariant = useEditorStore((state) => state.nextVariant)
  const prevVariant = useEditorStore((state) => state.prevVariant)

  const variantIndex = getVariantIndex(section.type, section.variant)
  const variantCount = getVariantCount(section.type)
  const isSelected = selectedId === section.id
  const definition = componentRegistry[section.type]

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-2 rounded-lg border bg-card p-3 transition-all",
        isDragging && "opacity-50 shadow-lg",
        isSelected && "border-primary ring-1 ring-primary",
      )}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {/* Section info */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => selectSection(section.id)}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium capitalize">
            {definition?.name || section.type}
          </span>
          {section.isRequired && (
            <Lock className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
        {variantCount > 1 && (
          <p className="text-xs text-muted-foreground">
            Variant {variantIndex + 1} of {variantCount}
          </p>
        )}
      </div>

      {/* Variant navigation */}
      {variantCount > 1 && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 cursor-pointer"
            onClick={() => prevVariant(section.id)}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 cursor-pointer"
            onClick={() => nextVariant(section.id)}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Delete button (only for non-required sections) */}
      {!section.isRequired && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive cursor-pointer"
          onClick={() => removeSection(section.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}

export function EditorSidebar() {
  const [isMounted, setIsMounted] = useState(false)
  const dndId = useId()

  const sections = useEditorStore((state) => state.page.sections)
  const reorderSections = useEditorStore((state) => state.reorderSections)
  const addSection = useEditorStore((state) => state.addSection)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Prevent hydration mismatch with dnd-kit
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id)
      const newIndex = sections.findIndex((s) => s.id === over.id)
      reorderSections(oldIndex, newIndex)
    }
  }

  const optionalSections = getOptionalSectionTypes()

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">Sections</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {optionalSections.map((type) => {
              const definition = componentRegistry[type]
              return (
                <DropdownMenuItem
                  key={type}
                  onClick={() => addSection(type)}
                  className="cursor-pointer"
                >
                  <div>
                    <div className="font-medium">{definition.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {definition.description}
                    </div>
                  </div>
                </DropdownMenuItem>
              )
            })}
            {optionalSections.length === 0 && (
              <DropdownMenuItem disabled>
                No additional sections available
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sections list */}
      <div className="flex-1 overflow-auto p-4">
        {isMounted ? (
          <DndContext
            id={dndId}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {sections.map((section) => (
                  <SortableSectionItem key={section.id} section={section} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="space-y-2">
            {sections.map((section) => (
              <div
                key={section.id}
                className="flex items-center gap-2 rounded-lg border bg-card p-3"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium capitalize">
                  {componentRegistry[section.type]?.name || section.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          Drag sections to reorder. Click to select and edit properties.
        </p>
      </div>
    </div>
  )
}
