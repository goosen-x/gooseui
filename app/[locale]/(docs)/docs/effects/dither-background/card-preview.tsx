"use client"

import { DitherBackground } from "@/registry/gooseui/effects/dither-background"

export default function CardPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md">
      <DitherBackground pixelSize={3} speed={0.8} fps={24} />
    </div>
  )
}
