"use client"

/**
 * Editor Canvas - Preview area with viewport sizing and section rendering
 */

import { useEditorStore } from "@/lib/generate/store"
import { SectionSlider } from "./section-slider"
import { cn } from "@/lib/utils"

const viewportWidths = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
}

export function EditorCanvas() {
  const viewport = useEditorStore((state) => state.viewport)
  const sections = useEditorStore((state) => state.page.sections)
  const selectedId = useEditorStore((state) => state.selectedId)
  const selectSection = useEditorStore((state) => state.selectSection)

  return (
    <div className="flex h-full items-start justify-center bg-muted/30 p-6">
      <div
        className={cn(
          "mx-auto bg-background shadow-xl transition-all duration-300",
          viewport !== "desktop" && "rounded-lg border"
        )}
        style={{ width: viewportWidths[viewport] }}
      >
        {/* Render sections */}
        <div className="flex flex-col">
          {sections.map((section) => (
            <div
              key={section.id}
              className={cn(
                "relative group cursor-pointer",
                selectedId === section.id && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => selectSection(section.id)}
            >
              <SectionSlider
                section={section}
                isSelected={selectedId === section.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
