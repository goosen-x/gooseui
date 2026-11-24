"use client"

import { CalendarDays, MapPin } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ColorPicker,
  type ColorPickerLabels,
  oklchToHex,
  parseColor,
  readableTextColor,
} from "@/registry/gooseui/ui/color-picker"

const ruLabels: ColorPickerLabels = {
  area: "Светлота и насыщенность",
  lightness: "Светлота",
  chroma: "насыщенность",
  hue: "Тон",
  degrees: "градусов",
  opacity: "Прозрачность",
  input: "Значение цвета (oklch или hex)",
  swatches: "Образцы",
  p3: "На этом экране цвет показан в Display P3",
  widerThanSrgb: "Шире sRGB",
  outsideSrgb: "Вне sRGB",
  outsideSrgbAndP3: "Вне sRGB и P3",
  fitToSrgb: "Вписать в sRGB",
}

const en = {
  labels: undefined as Partial<ColorPickerLabels> | undefined,
  plan: "Pro plan",
  product: "Northwind Analytics",
  pitch:
    "Unlimited dashboards, scheduled exports and SSO for teams up to 50 seats.",
  trial: "Start free trial",
  compare: "Compare plans",
  events: [
    ["review", "Design review", "Tue 10:00", "Room 4B", "#7c3aed"],
    ["standup", "Platform standup", "Daily 09:30", "Video call", "#0ea5e9"],
    ["launch", "Spring launch", "Mar 18", "Main stage", "#f97316"],
  ],
  labelColor: "Label color for",
  pickFor: "Pick a color for",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    labels: ruLabels,
    plan: "Тариф Pro",
    product: "Northwind Analytics",
    pitch:
      "Безлимитные дашборды, выгрузки по расписанию и SSO для команд до 50 человек.",
    trial: "Попробовать бесплатно",
    compare: "Сравнить тарифы",
    events: [
      ["review", "Дизайн-ревью", "Вт 10:00", "Переговорная 4B", "#7c3aed"],
      [
        "standup",
        "Стендап платформы",
        "Ежедневно 09:30",
        "Видеозвонок",
        "#0ea5e9",
      ],
      ["launch", "Весенний запуск", "18 марта", "Главная сцена", "#f97316"],
    ],
    labelColor: "Цвет метки для",
    pickFor: "Выберите цвет для",
  },
}

function useContent() {
  return content[useLocale() as Locale]
}

function textOn(color: string) {
  const parsed = parseColor(color)
  return parsed ? readableTextColor({ ...parsed, alpha: 1 }) : "#fff"
}

const brandPalette = [
  "oklch(0.62 0.19 255)",
  "oklch(0.55 0.22 285)",
  "oklch(0.65 0.24 340)",
  "oklch(0.64 0.21 25)",
  "oklch(0.75 0.17 60)",
  "oklch(0.72 0.19 145)",
  "oklch(0.68 0.13 195)",
  "oklch(0.3 0.02 260)",
]

/** Brand color editor: the picker drives a live card through a CSS variable */
export function ColorPickerBrandDemo() {
  const t = useContent()
  const [brand, setBrand] = React.useState("oklch(0.62 0.19 255)")

  return (
    <div className="grid w-full max-w-3xl gap-6 px-4 md:grid-cols-[auto_1fr]">
      <ColorPicker
        value={brand}
        onValueChange={setBrand}
        swatches={brandPalette}
        showAlpha
        labels={t.labels}
        className="mx-auto"
      />

      <div
        className="flex min-w-0 flex-col gap-4"
        style={
          {
            "--brand": brand,
            "--brand-fg": textOn(brand),
          } as React.CSSProperties
        }
      >
        <article className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="h-20 bg-[var(--brand)]" />
          <div className="space-y-3 p-5">
            <span className="inline-flex rounded-full bg-[color-mix(in_oklch,var(--brand)_15%,transparent)] px-2.5 py-0.5 text-xs font-medium text-[color-mix(in_oklch,var(--brand)_80%,var(--foreground))]">
              {t.plan}
            </span>
            <h3 className="text-lg font-semibold">{t.product}</h3>
            <p className="text-sm text-muted-foreground">{t.pitch}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="h-9 cursor-pointer rounded-md bg-[var(--brand)] px-4 text-sm font-medium text-[var(--brand-fg)] transition-colors hover:bg-[color-mix(in_oklch,var(--brand),black_12%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
              >
                {t.trial}
              </button>
              <button
                type="button"
                className="h-9 cursor-pointer rounded-md border border-[var(--brand)] px-4 text-sm font-medium text-foreground transition-colors hover:bg-[color-mix(in_oklch,var(--brand)_10%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
              >
                {t.compare}
              </button>
            </div>
          </div>
        </article>

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-lg border bg-background p-3 font-mono text-xs">
          <dt className="text-muted-foreground">--brand</dt>
          <dd className="truncate">{brand}</dd>
          <dt className="text-muted-foreground">hex</dt>
          <dd>{oklchToHex(brand)}</dd>
        </dl>
      </div>
    </div>
  )
}

const labelSwatches = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#0ea5e9",
  "#7c3aed",
  "#ec4899",
  "#64748b",
]

function LabelColor({
  id,
  title,
  time,
  place,
  initial,
}: {
  id: string
  title: string
  time: string
  place: string
  initial: string
}) {
  const t = useContent()
  const [color, setColor] = React.useState(initial)
  const popoverId = `label-color-${id}`
  const anchor = `--label-color-${id}`

  return (
    <li className="flex items-center gap-3 rounded-lg border bg-card p-3">
      <button
        type="button"
        popoverTarget={popoverId}
        aria-label={`${t.labelColor} ${title}: ${color}`}
        className="size-8 shrink-0 cursor-pointer rounded-full border-2 border-background shadow-[0_0_0_1px_var(--border)] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        style={{ background: color, anchorName: anchor } as React.CSSProperties}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3" /> {time}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" /> {place}
          </span>
        </p>
      </div>
      <span
        className="rounded-full px-2 py-0.5 font-mono text-[11px]"
        style={{ background: color, color: textOn(color) }}
      >
        {color}
      </span>
      {/* Native popover: light dismiss and Escape for free. Without anchor positioning it opens centered */}
      <div
        id={popoverId}
        popover="auto"
        aria-label={`${t.pickFor} ${title}`}
        className="rounded-lg border bg-popover p-3 text-popover-foreground shadow-lg supports-[position-area:bottom]:m-0 supports-[position-area:bottom]:mt-2 supports-[position-area:bottom]:[inset:auto] supports-[position-area:bottom]:[position-area:bottom_span-right] supports-[position-area:bottom]:[position-try-fallbacks:flip-block,flip-inline]"
        style={{ positionAnchor: anchor } as React.CSSProperties}
      >
        <ColorPicker
          value={color}
          onValueChange={setColor}
          format="hex"
          swatches={labelSwatches}
          labels={t.labels}
        />
      </div>
    </li>
  )
}

/** Swatch button that opens the picker in a native popover, hex output */
export function ColorPickerPopoverDemo() {
  const t = useContent()
  return (
    <ul className="grid w-full max-w-lg gap-2 px-4">
      {t.events.map(([id, title, time, place, color]) => (
        <LabelColor
          key={id}
          id={id}
          title={title}
          time={time}
          place={place}
          initial={color}
        />
      ))}
    </ul>
  )
}

/** Starts outside sRGB: a P3 badge on wide-gamut screens, a warning elsewhere */
export function ColorPickerGamutDemo() {
  const t = useContent()
  return <ColorPicker defaultValue="oklch(0.72 0.27 145)" labels={t.labels} />
}
