"use client"

import * as React from "react"
import { RelativeTime } from "@/registry/gooseui/ui/relative-time"

const rows = [
  { label: "Deployed", offset: -4 * 60_000 },
  { label: "Synced", offset: -3 * 3_600_000 },
  { label: "Backup", offset: -9 * 86_400_000 },
]

export default function CardPreview() {
  const [base] = React.useState(() => Date.now())
  return (
    <div className="flex h-full items-center justify-center">
      <ul className="w-48 space-y-1.5 rounded-lg border bg-background p-3 text-xs">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-foreground">{row.label}</span>
            <RelativeTime
              date={base + row.offset}
              staleAfter={7 * 86_400_000}
              updateInterval={60_000}
              className="text-muted-foreground"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
