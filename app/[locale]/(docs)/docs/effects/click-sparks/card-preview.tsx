"use client"

import { ClickSparks } from "@/registry/gooseui/effects/click-sparks"

const rays = [0, 45, 90, 135, 180, 225, 270, 315]

export default function CardPreview() {
  return (
    <ClickSparks
      radius={30}
      className="flex h-full w-full cursor-pointer items-center justify-center text-primary"
    >
      <div aria-hidden className="relative size-16">
        {rays.map((deg) => (
          <span
            key={deg}
            className="absolute top-1/2 left-1/2 h-0.5 w-3 rounded-full bg-current"
            style={{
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(22px)`,
            }}
          />
        ))}
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
      </div>
    </ClickSparks>
  )
}
