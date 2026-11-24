"use client"

import { NotificationPrompt } from "@/registry/gooseui/ui/notification-prompt"

export default function CardPreview() {
  return (
    <div className="flex h-full items-center justify-center">
      {/* Laid out at full size, then scaled down to fit the card */}
      <div className="w-[290px] shrink-0 scale-[0.76]">
        <NotificationPrompt
          forceShow="default"
          delay={0}
          labels={{ description: "Know when something happens." }}
          className="shadow-md"
        />
      </div>
    </div>
  )
}
