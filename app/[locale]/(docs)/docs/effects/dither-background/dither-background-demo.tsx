"use client"

import { useLocale } from "next-intl"
import { useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  DitherBackground,
  type DitherPattern,
} from "@/registry/gooseui/effects/dither-background"
import { OptionPicker } from "@/registry/gooseui/ui/option-picker"

const en = {
  pattern: "Pattern",
  pixel: "Pixel size",
  speed: "Speed",
  heading: "Ship in pixels",
  text: "Bayer dithering over a moving field",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    pattern: "Рисунок",
    pixel: "Размер пикселя",
    speed: "Скорость",
    heading: "Пиксель к пикселю",
    text: "Dithering по матрице Байера поверх движущегося поля",
  },
}

const patterns: DitherPattern[] = ["waves", "noise", "radial"]
const sizes = [2, 3, 5]
const speeds = [0.5, 1, 2]

function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: T[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">{label}</legend>
      <span aria-hidden className="text-xs text-muted-foreground">
        {label}
      </span>
      <OptionPicker
        aria-label={label}
        variant="segment"
        options={options.map((option) => ({
          value: String(option),
          label: String(option),
        }))}
        value={String(value)}
        onValueChange={(next) => {
          const option = options.find((item) => String(item) === next)
          if (option !== undefined) onChange(option)
        }}
      />
    </fieldset>
  )
}

export function DitherBackgroundDemo() {
  const t = content[useLocale() as Locale]
  const [pattern, setPattern] = useState<DitherPattern>("waves")
  const [pixelSize, setPixelSize] = useState(3)
  const [speed, setSpeed] = useState(1)

  return (
    <div className="w-full space-y-4 px-4">
      <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-lg border">
        <DitherBackground
          pattern={pattern}
          pixelSize={pixelSize}
          speed={speed}
        />
        <div className="relative rounded-md bg-background/85 px-5 py-3 text-center backdrop-blur-sm">
          <p className="font-semibold">{t.heading}</p>
          <p className="text-sm text-muted-foreground">{t.text}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Segmented
          label={t.pattern}
          options={patterns}
          value={pattern}
          onChange={setPattern}
        />
        <Segmented
          label={t.pixel}
          options={sizes}
          value={pixelSize}
          onChange={setPixelSize}
        />
        <Segmented
          label={t.speed}
          options={speeds}
          value={speed}
          onChange={setSpeed}
        />
      </div>
    </div>
  )
}
