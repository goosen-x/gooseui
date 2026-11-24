import { useLocale } from "next-intl"
import type { ReactNode } from "react"
import type { Locale } from "@/i18n/routing"
import { Marquee } from "@/registry/gooseui/ui/marquee"

// Made-up brands drawn with simple shapes
const brands: { name: string; shape: ReactNode }[] = [
  { name: "Orbitly", shape: <circle cx="12" cy="12" r="9" /> },
  {
    name: "Squarely",
    shape: <rect x="3" y="3" width="18" height="18" rx="4" />,
  },
  { name: "Trigon", shape: <path d="M12 3 L21 20 H3 Z" /> },
  { name: "Hexwork", shape: <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" /> },
  {
    name: "Starfold",
    shape: (
      <path d="M12 2 L14.6 8.6 L21.5 9 L16.2 13.4 L18 20.2 L12 16.4 L6 20.2 L7.8 13.4 L2.5 9 L9.4 8.6 Z" />
    ),
  },
  {
    name: "Pillbox",
    shape: <rect x="2" y="7" width="20" height="10" rx="5" />,
  },
  { name: "Diamondo", shape: <path d="M12 2 L22 12 L12 22 L2 12 Z" /> },
  {
    name: "Ringside",
    shape: (
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        strokeWidth="3"
        stroke="currentColor"
      />
    ),
  },
]

function Brand({ name, shape }: { name: string; shape: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
      <svg
        viewBox="0 0 24 24"
        className="size-6 fill-current"
        aria-hidden="true"
      >
        {shape}
      </svg>
      <span className="text-lg font-semibold tracking-tight whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function MarqueeDemo() {
  return (
    <Marquee className="w-full" pauseOnHover>
      {brands.map((b) => (
        <Brand key={b.name} {...b} />
      ))}
    </Marquee>
  )
}

export function MarqueeRowsDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Marquee duration={12} repeat={4} gap={16}>
        {brands.slice(0, 4).map((b) => (
          <span
            key={b.name}
            className="rounded-full border bg-background px-4 py-1.5 text-sm"
          >
            {b.name}
          </span>
        ))}
      </Marquee>
      <Marquee duration={8} repeat={4} gap={16} reverse>
        {brands.slice(4).map((b) => (
          <span
            key={b.name}
            className="rounded-full border bg-background px-4 py-1.5 text-sm"
          >
            {b.name}
          </span>
        ))}
      </Marquee>
    </div>
  )
}

const updates = {
  en: [
    "Release 2.4 is out",
    "New regions in Asia",
    "Dark mode for reports",
    "Faster exports",
    "Audit log for teams",
  ],
  ru: [
    "Вышел релиз 2.4",
    "Новые регионы в Азии",
    "Тёмная тема для отчётов",
    "Экспорт стал быстрее",
    "Журнал действий для команд",
  ],
}

export function MarqueeVerticalDemo() {
  const items = updates[useLocale() as Locale]
  return (
    <Marquee vertical duration={14} gap={12} pauseOnHover className="h-56 w-64">
      {items.map((text) => (
        <div
          key={text}
          className="rounded-lg border bg-card px-4 py-3 text-sm shadow-xs"
        >
          {text}
        </div>
      ))}
    </Marquee>
  )
}

export function MarqueeShortDemo() {
  return (
    <Marquee className="w-full" duration={8} repeat={8} gap={48}>
      {brands.slice(0, 2).map((b) => (
        <Brand key={b.name} {...b} />
      ))}
    </Marquee>
  )
}
