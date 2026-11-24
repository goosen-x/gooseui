"use client"

import { RotaryDial } from "@/registry/gooseui/ui/rotary-dial"

const DIGITS = Array.from({ length: 12 }, (_, i) => String(i * 5))

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center">
      <RotaryDial items={DIGITS} defaultValue={3} size={124} />
    </div>
  )
}
