import type * as React from "react"
import { cn } from "@/lib/utils"

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<"hr"> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}) {
  return (
    <hr
      data-slot="separator"
      data-orientation={orientation}
      role={decorative ? "none" : "separator"}
      aria-orientation={
        !decorative && orientation === "vertical" ? "vertical" : undefined
      }
      className={cn(
        "shrink-0 border-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  )
}
