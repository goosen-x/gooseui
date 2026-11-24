"use client"
import * as React from "react"
import { Button } from "@/registry/gooseui/ui/button"
import { Input } from "@/registry/gooseui/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/gooseui/ui/sheet"

export function Demo({
  locale,
  form = false,
  controlled = false,
  side = "right",
}: {
  locale: string
  form?: boolean
  controlled?: boolean
  side?: "top" | "right" | "bottom" | "left"
}) {
  const [open, setOpen] = React.useState(false)
  const ru = locale === "ru"
  return (
    <Sheet {...(controlled ? { open, onOpenChange: setOpen } : {})}>
      <SheetTrigger asChild>
        <Button variant="outline">
          {ru ? "Открыть" : "Open"} {side}
        </Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>
            {ru ? "Настройки профиля" : "Profile settings"}
          </SheetTitle>
          <SheetDescription>
            {ru
              ? "Измените настройки и сохраните результат."
              : "Update your settings and save your changes."}
          </SheetDescription>
        </SheetHeader>
        {form && (
          <form
            className="space-y-4 px-4"
            onSubmit={(event) => {
              event.preventDefault()
              if (controlled) setOpen(false)
            }}
          >
            <label className="grid gap-2 text-sm">
              {ru ? "Имя" : "Name"}
              <Input name="name" defaultValue="Alex" />
            </label>
            <Button type="submit">{ru ? "Сохранить" : "Save"}</Button>
          </form>
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">{ru ? "Закрыть" : "Close"}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
