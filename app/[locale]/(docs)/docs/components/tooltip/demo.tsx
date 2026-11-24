"use client"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/gooseui/ui/tooltip"

export function TooltipDemo({
  label = "Hover or focus",
  hint = "Helpful information",
  side = "top",
}: {
  label?: string
  hint?: string
  side?: "top" | "bottom" | "left" | "right"
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">{label}</Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{hint}</TooltipContent>
    </Tooltip>
  )
}
