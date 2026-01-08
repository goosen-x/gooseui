import * as React from "react"

interface DocsSectionProps {
  id: string
  title: string
  children: React.ReactNode
}

/**
 * Standard documentation section with h2 heading
 *
 * Usage:
 * ```tsx
 * <DocsSection id="preview" title="Preview">
 *   <p>Content here</p>
 * </DocsSection>
 * ```
 */
export function DocsSection({ id, title, children }: DocsSectionProps) {
  return (
    <div className="space-y-4">
      <h2
        id={id}
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>
      {children}
    </div>
  )
}
