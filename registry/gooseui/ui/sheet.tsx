"use client"

import type * as React from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const Sheet = Dialog
const SheetTrigger = DialogTrigger
const SheetClose = DialogClose
function SheetContent({
  className,
  side = "right",
  children,
  ...props
}: React.ComponentProps<typeof DialogContent> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <>
      <style href="goose-sheet" precedence="default">{`
      dialog[data-goose-dialog][data-goose-sheet] { scale: 1; translate: var(--sheet-offset); transition: translate 300ms ease-in-out, opacity 300ms, display 300ms allow-discrete, overlay 300ms allow-discrete; }
      dialog[data-goose-dialog][data-goose-sheet][open] { display: flex; translate: 0 0; }
      dialog[data-goose-sheet][data-side="right"] { --sheet-offset: 100% 0; }
      dialog[data-goose-sheet][data-side="left"] { --sheet-offset: -100% 0; }
      dialog[data-goose-sheet][data-side="top"] { --sheet-offset: 0 -100%; }
      dialog[data-goose-sheet][data-side="bottom"] { --sheet-offset: 0 100%; }
      @starting-style { dialog[data-goose-dialog][data-goose-sheet][open] { scale: 1; translate: var(--sheet-offset); } }
      @media (prefers-reduced-motion: reduce) { dialog[data-goose-sheet] { transition: none; } }
    `}</style>
      <DialogContent
        data-goose-sheet=""
        data-side={side}
        className={cn(
          "m-0 flex max-h-none max-w-none flex-col gap-4 rounded-none p-0 sm:max-w-none",
          side === "right" &&
            "inset-y-0 right-0 left-auto h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "inset-y-0 right-auto left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "inset-x-0 top-0 bottom-auto h-auto w-full border-b",
          side === "bottom" &&
            "inset-x-0 top-auto bottom-0 h-auto w-full border-t",
          className,
        )}
        {...props}
      >
        {children}
      </DialogContent>
    </>
  )
}
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}
const SheetTitle = DialogTitle
const SheetDescription = DialogDescription
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
