"use client"

import { PartyPopper } from "lucide-react"
import { ConfettiButton } from "@/registry/gooseui/effects/confetti"

const pieces = [
  { left: "14%", top: "18%", rotate: 20, className: "bg-chart-1 w-2 h-3" },
  { left: "28%", top: "62%", rotate: -35, className: "bg-chart-2 w-1 h-3" },
  {
    left: "22%",
    top: "38%",
    rotate: 0,
    className: "bg-chart-4 size-2 rounded-full",
  },
  { left: "74%", top: "20%", rotate: 50, className: "bg-chart-5 w-1 h-3" },
  {
    left: "84%",
    top: "52%",
    rotate: -15,
    className: "bg-chart-1 size-2 rounded-full",
  },
  { left: "66%", top: "70%", rotate: 30, className: "bg-chart-3 w-2 h-3" },
  { left: "50%", top: "12%", rotate: -60, className: "bg-primary w-1 h-3" },
  { left: "40%", top: "80%", rotate: 75, className: "bg-chart-4 w-2 h-2" },
]

export default function CardPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {pieces.map((p) => (
        <span
          key={`${p.left}-${p.top}`}
          aria-hidden
          className={`absolute rounded-[1px] ${p.className}`}
          style={{
            left: p.left,
            top: p.top,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
      <ConfettiButton options={{ preset: "low" }} className="relative">
        <PartyPopper aria-hidden className="size-4" />
        Pop
      </ConfettiButton>
    </div>
  )
}
