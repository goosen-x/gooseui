"use client"
import * as React from "react"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/gooseui/ui/dialog"
import { Input } from "@/registry/gooseui/ui/input"

export function Demo({
  locale,
  form = false,
  controlled = false,
}: {
  locale: string
  form?: boolean
  controlled?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const ru = locale === "ru"
  return (
    <Dialog {...(controlled ? { open, onOpenChange: setOpen } : {})}>
      <DialogTrigger asChild>
        <Button variant="outline">{ru ? "Открыть" : "Open"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {ru ? "Настройки профиля" : "Profile settings"}
          </DialogTitle>
          <DialogDescription>
            {ru
              ? "Измените настройки и сохраните результат."
              : "Update your settings and save your changes."}
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{ru ? "Закрыть" : "Close"}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
