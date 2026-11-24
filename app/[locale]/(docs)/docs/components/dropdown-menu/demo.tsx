"use client"
import { Button } from "@/registry/gooseui/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/gooseui/ui/dropdown-menu"

export function DropdownMenuDemo({
  label = "Open menu",
  first = "Edit",
  second = "Duplicate",
  third = "Delete",
  align = "start",
  side = "top",
}: {
  label?: string
  first?: string
  second?: string
  third?: string
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align}>
        <DropdownMenuItem>{first}</DropdownMenuItem>
        <DropdownMenuItem>{second}</DropdownMenuItem>
        <DropdownMenuItem>{third}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
