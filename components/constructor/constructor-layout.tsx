"use client";

import * as React from "react";
import { ConstructorPreview } from "./constructor-preview";
import { ConstructorSidebar } from "./constructor-sidebar";
import { useConstructor } from "@/lib/constructor/use-constructor";

export function ConstructorLayout() {
  const {
    sections,
    viewport,
    selectedSectionId,
    addSection,
    removeSection,
    updateVariant,
    reorderSections,
    setViewport,
    selectSection,
  } = useConstructor();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Preview Area */}
      <div className="flex-1">
        <ConstructorPreview
          sections={sections}
          viewport={viewport}
          onViewportChange={setViewport}
        />
      </div>

      {/* Sidebar */}
      <div className="w-80 shrink-0">
        <ConstructorSidebar
          sections={sections}
          selectedSectionId={selectedSectionId}
          onSelectSection={selectSection}
          onRemoveSection={removeSection}
          onUpdateVariant={updateVariant}
          onAddSection={addSection}
          onReorderSections={reorderSections}
        />
      </div>
    </div>
  );
}
