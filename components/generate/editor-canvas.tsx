"use client"

/**
 * Editor Canvas - Preview area with viewport sizing and section rendering
 */

import { useEffect, useState } from "react"
import { fonts, useDesignStore } from "@/lib/generate/design-store"
import { useEditorStore } from "@/lib/generate/store"
import { cn } from "@/lib/utils"
import { SectionSlider } from "./section-slider"

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

  const { font, radius } = useDesignStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get CSS values for design settings
  const fontValue = fonts.find((f) => f.name === font)?.value || "Inter"

  // Preview styles applied to the landing page preview
  const previewStyles = mounted
    ? {
        "--font-sans": `"${fontValue}", ui-sans-serif, system-ui, sans-serif`,
        "--radius": `${radius}px`,
        fontFamily: `"${fontValue}", ui-sans-serif, system-ui, sans-serif`,
      }
    : {}

  return (
    <div className="flex h-full items-start justify-center bg-muted/30 p-6">
      <div
        className={cn(
          "mx-auto bg-background shadow-xl transition-all duration-300",
          viewport !== "desktop" && "rounded-lg border",
        )}
        style={
          {
            width: viewportWidths[viewport],
            ...previewStyles,
          } as React.CSSProperties
        }
      >
        {/* Render sections */}
        <div className="flex flex-col">
          {sections.map((section) => (
            <div
              key={section.id}
              className={cn(
                "relative group cursor-pointer",
                selectedId === section.id &&
                  "z-10 outline outline-[3px] outline-primary outline-offset-4 rounded",
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
