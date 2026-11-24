"use client"

import { useEffect, useState } from "react"

export default function CardPreview() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => setOpen((v) => !v), 1600)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[100px] w-[170px] overflow-hidden rounded-lg border bg-background shadow-sm">
        <div className="space-y-2 p-3">
          <div className="h-2 w-16 rounded-full bg-foreground/80" />
          <div className="h-2 w-24 rounded-full bg-muted-foreground/40" />
          <div className="h-2 w-20 rounded-full bg-muted-foreground/40" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-foreground p-3 transition-[clip-path] duration-700 ease-in-out motion-reduce:transition-none"
          style={{
            clipPath: open
              ? "circle(150% at 88% 80%)"
              : "circle(0% at 88% 80%)",
          }}
        >
          <div className="space-y-2">
            <div className="h-2 w-16 rounded-full bg-background/90" />
            <div className="h-2 w-24 rounded-full bg-background/40" />
            <div className="h-2 w-20 rounded-full bg-background/40" />
          </div>
        </div>
        <div className="absolute right-2 bottom-2 size-6 rounded-full border bg-background" />
      </div>
    </div>
  )
}
