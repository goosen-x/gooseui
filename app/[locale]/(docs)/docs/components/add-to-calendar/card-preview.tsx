const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

function CalendarPlus({ className }: { className?: string }) {
  return (
    <svg {...svg} className={className}>
      <path d="M8 2v4M16 2v4M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8M3 10h18M16 19h6M19 16v6" />
    </svg>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg {...svg} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function Download({ className }: { className?: string }) {
  return (
    <svg {...svg} className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}

const ITEMS = [
  { id: "google", label: "Google Calendar" },
  { id: "apple", label: "Apple Calendar" },
  { id: "outlook", label: "Outlook.com" },
] as const

const LOGOS = {
  google: {
    fill: "#4285F4",
    d: "M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z",
  },
  apple: {
    fill: "currentColor",
    d: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
  },
  outlook: {
    fill: "#0078D4",
    d: "M24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25z",
  },
} as const

function Logo({ id }: { id: (typeof ITEMS)[number]["id"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={LOGOS[id].fill}
      aria-hidden="true"
      className="size-3.5 shrink-0 text-foreground"
    >
      <path d={LOGOS[id].d} />
    </svg>
  )
}

export default function CardPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5">
      <div className="inline-flex h-7 items-center gap-1.5 rounded-md bg-primary px-2.5 text-[11px] font-medium text-primary-foreground shadow-xs">
        <CalendarPlus className="size-3.5" />
        Add to calendar
        <ChevronDown className="size-3 rotate-180 opacity-70" />
      </div>
      <div className="w-44 rounded-md border bg-popover p-1 text-[11px] text-popover-foreground shadow-md">
        {ITEMS.map((item, index) => (
          <div
            key={item.id}
            className={
              index === 0
                ? "flex items-center gap-2 rounded-sm bg-accent px-1.5 py-1 text-accent-foreground"
                : "flex items-center gap-2 px-1.5 py-1"
            }
          >
            <Logo id={item.id} />
            {item.label}
          </div>
        ))}
        <div className="flex items-center gap-2 px-1.5 py-1">
          <Download className="size-3.5 text-muted-foreground" />
          Other calendar (.ics)
        </div>
      </div>
    </div>
  )
}
