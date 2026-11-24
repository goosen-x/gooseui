import type * as React from "react"

/** Window frame shared by all mockups: neutral surface, thin border. */
function Window({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[320px] overflow-hidden rounded-lg border bg-background shadow-sm"
    >
      <div className="flex items-center gap-1.5 border-b bg-muted/50 px-3 py-2">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-2 text-[10px] font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function Bar({ className }: { className?: string }) {
  return <div className={`h-2 rounded-full bg-border ${className ?? ""}`} />
}

/** 01: window with a form. */
export function IdeaIllustration({ label }: { label: string }) {
  return (
    <Window label={label}>
      <div className="space-y-3 p-4">
        <div className="space-y-1.5">
          <Bar className="w-16" />
          <div className="h-8 rounded-md border bg-card px-2.5 py-2">
            <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Bar className="w-24" />
          <div className="h-14 rounded-md border bg-card p-2.5">
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-border" />
              <div className="h-1.5 w-5/6 rounded-full bg-border" />
              <div className="h-1.5 w-2/5 rounded-full bg-border" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-1.5">
            <span className="h-5 w-12 rounded-full border bg-muted/50" />
            <span className="h-5 w-10 rounded-full border bg-muted/50" />
          </div>
          <span className="h-7 w-20 rounded-md bg-primary" />
        </div>
      </div>
    </Window>
  )
}

/** 02: layout editor with a selected block. */
export function DesignIllustration({ label }: { label: string }) {
  return (
    <Window label={label}>
      <div className="grid grid-cols-[56px_1fr] gap-3 p-3">
        <div className="space-y-2 rounded-md border bg-muted/40 p-2">
          <div className="h-1.5 w-full rounded-full bg-muted-foreground/30" />
          <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/20" />
          <div className="h-1.5 w-5/6 rounded-full bg-muted-foreground/20" />
          <div className="mt-3 flex gap-1">
            <span className="size-3 rounded-full bg-primary" />
            <span className="size-3 rounded-full bg-foreground/80" />
            <span className="size-3 rounded-full border bg-card" />
          </div>
        </div>
        <div className="space-y-2 rounded-md border bg-card p-2.5">
          <Bar className="w-1/2" />
          <div className="relative h-14 rounded-md border-2 border-primary bg-primary/10">
            <span className="absolute -left-1 -top-1 size-2 rounded-[2px] border border-primary bg-background" />
            <span className="absolute -right-1 -top-1 size-2 rounded-[2px] border border-primary bg-background" />
            <span className="absolute -bottom-1 -left-1 size-2 rounded-[2px] border border-primary bg-background" />
            <span className="absolute -bottom-1 -right-1 size-2 rounded-[2px] border border-primary bg-background" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 rounded-md border bg-muted/40" />
            <div className="h-9 rounded-md border bg-muted/40" />
          </div>
        </div>
      </div>
    </Window>
  )
}

/** 03: code editor with a passing check. */
export function BuildIllustration({ label }: { label: string }) {
  const lines: Array<[number, string, string]> = [
    [0, "w-10", "bg-primary"],
    [0, "w-20", "bg-muted-foreground/30"],
    [1, "w-24", "bg-muted-foreground/30"],
    [1, "w-14", "bg-primary/60"],
    [2, "w-28", "bg-muted-foreground/30"],
    [1, "w-8", "bg-muted-foreground/20"],
    [0, "w-6", "bg-primary"],
  ]
  return (
    <Window label={label}>
      <div className="p-3">
        <div className="space-y-2 font-mono">
          {lines.map(([indent, width, tone], i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-3 text-right text-[9px] text-muted-foreground/60">
                {i + 1}
              </span>
              <span
                className={`h-1.5 rounded-full ${width} ${tone}`}
                style={{ marginLeft: indent * 14 }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-md border bg-muted/40 px-2.5 py-1.5">
          <svg
            viewBox="0 0 16 16"
            className="size-3.5 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
          <span className="h-1.5 w-20 rounded-full bg-muted-foreground/30" />
          <span className="ml-auto text-[10px] font-medium text-muted-foreground">
            24/24
          </span>
        </div>
      </div>
    </Window>
  )
}

/** 04: growth chart with a metric badge. */
export function LaunchIllustration({ label }: { label: string }) {
  const bars = [18, 26, 22, 34, 44, 58]
  return (
    <Window label={label}>
      <div className="space-y-3 p-4">
        <div className="flex items-end justify-between">
          <div className="space-y-1.5">
            <Bar className="w-14" />
            <div className="h-4 w-20 rounded bg-foreground/80" />
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            +128%
          </span>
        </div>
        <div className="relative h-24">
          <div className="absolute inset-0 flex items-end gap-2">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-[3px] ${
                  i === bars.length - 1 ? "bg-primary" : "bg-border"
                }`}
                style={{ height: `${h + 20}%` }}
              />
            ))}
          </div>
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full text-primary"
            fill="none"
          >
            <path
              d="M2 34 L20 30 L38 33 L56 22 L74 14 L94 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </Window>
  )
}
