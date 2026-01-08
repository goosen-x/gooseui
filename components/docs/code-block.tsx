"use client"

import { highlight } from "sugar-high"
import { cn } from "@/lib/utils"
import { AnimatedCopyButton } from "./animated-copy-button"

interface CodeBlockProps {
  children: string
  className?: string
  enableHighlight?: boolean
}

export function CodeBlock({
  children,
  className,
  enableHighlight = true,
}: CodeBlockProps) {
  const html = enableHighlight ? highlight(children) : null

  return (
    <div className={cn("relative rounded-lg border bg-muted/30", className)}>
      <div className="overflow-auto p-4 pt-10 md:pt-4 max-h-[25rem]">
        <pre className="w-fit min-w-full">
          {enableHighlight ? (
            <code
              className="text-sm font-mono leading-relaxed inline-block"
              dangerouslySetInnerHTML={{ __html: html! }}
            />
          ) : (
            <code className="text-sm font-mono leading-relaxed inline-block">
              {children}
            </code>
          )}
        </pre>
      </div>

      <AnimatedCopyButton
        text={children}
        className="absolute right-2 top-2 z-10"
      />
    </div>
  )
}
