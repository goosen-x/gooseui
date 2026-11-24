"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Slider } from "@/registry/gooseui/ui/slider"

const en = {
  volumeControl: "Volume control",
  small: "Small",
  smallSlider: "Small slider",
  medium: "Medium",
  mediumSlider: "Medium slider",
  large: "Large",
  largeSlider: "Large slider",
  step25: "Step: 25",
  stepSlider: "Step slider",
  mediumDefault: "Medium (default)",
  step10Values0: "Step: 10 (values: 0, 10, 20, ... 100)",
  disabledSlider: "Disabled slider",
  temperature: "Temperature",
  temperatureControl: "Temperature control",
  priceRange: "Price Range",
  priceFilter: "Price filter",
  gradientSlider: "Gradient slider",
  customGradientTrackUsing: "Custom gradient track using CSS overrides",
  animatedValueSlider: "Animated value slider",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    volumeControl: "Громкость",
    small: "Маленький",
    smallSlider: "Маленький ползунок",
    medium: "Средний",
    mediumSlider: "Средний ползунок",
    large: "Большой",
    largeSlider: "Большой ползунок",
    step25: "Шаг: 25",
    stepSlider: "Ползунок с шагом",
    mediumDefault: "Средний (по умолчанию)",
    step10Values0: "Шаг: 10 (значения: 0, 10, 20, ... 100)",
    disabledSlider: "Отключённый ползунок",
    temperature: "Температура",
    temperatureControl: "Температура",
    priceRange: "Диапазон цены",
    priceFilter: "Фильтр по цене",
    gradientSlider: "Ползунок с градиентом",
    customGradientTrackUsing: "Градиентная дорожка через переопределение CSS",
    animatedValueSlider: "Ползунок с анимированным значением",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function SliderDemo() {
  const t = useT()
  const [value, setValue] = React.useState(53)

  return (
    <div className="w-full max-w-sm space-y-8">
      {/* Basic with value display */}
      <Slider
        value={value}
        onValueChange={setValue}
        showValue
        formatValue={(v) => `${v}%`}
        label={t.volumeControl}
      />

      {/* Sizes */}
      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">{t.small}</span>
          <Slider defaultValue={30} size="sm" label={t.smallSlider} />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">{t.medium}</span>
          <Slider defaultValue={50} size="md" label={t.mediumSlider} />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">{t.large}</span>
          <Slider defaultValue={70} size="lg" label={t.largeSlider} />
        </div>
      </div>

      {/* With step */}
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">{t.step25}</span>
        <Slider
          defaultValue={50}
          min={0}
          max={100}
          step={25}
          showValue
          label={t.stepSlider}
        />
      </div>
    </div>
  )
}

export function SliderSizesDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">{t.small}</span>
        <Slider defaultValue={30} size="sm" label={t.smallSlider} />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">{t.mediumDefault}</span>
        <Slider defaultValue={50} size="md" label={t.mediumSlider} />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">{t.large}</span>
        <Slider defaultValue={70} size="lg" label={t.largeSlider} />
      </div>
    </div>
  )
}

export function SliderStepDemo() {
  const t = useT()
  const [value, setValue] = React.useState(50)

  return (
    <div className="w-full max-w-sm space-y-2">
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={10}
        showValue
        label={t.stepSlider}
      />
      <p className="text-xs text-muted-foreground text-center">
        {t.step10Values0}
      </p>
    </div>
  )
}

export function SliderDisabledDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={40} disabled label={t.disabledSlider} />
    </div>
  )
}

export function SliderCustomFormatDemo() {
  const t = useT()
  const [temperature, setTemperature] = React.useState(22)
  const [price, setPrice] = React.useState(150)

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">{t.temperature}</span>
        <Slider
          value={temperature}
          onValueChange={setTemperature}
          min={16}
          max={30}
          showValue
          formatValue={(v) => `${v}°C`}
          label={t.temperatureControl}
        />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">{t.priceRange}</span>
        <Slider
          value={price}
          onValueChange={setPrice}
          min={0}
          max={500}
          step={10}
          showValue
          formatValue={(v) => `$${v}`}
          label={t.priceFilter}
        />
      </div>
    </div>
  )
}

export function SliderGradientDemo() {
  const t = useT()
  const [value, setValue] = React.useState(50)

  return (
    <div className="w-full max-w-sm space-y-4">
      <style>{`
        .gradient-slider {
          --slider-track: linear-gradient(
            to right,
            var(--chart-1),
            var(--chart-2),
            var(--chart-3),
            var(--chart-4),
            var(--chart-5)
          );
          --slider-fill: transparent;
        }
      `}</style>
      <Slider
        value={value}
        onValueChange={setValue}
        showValue
        label={t.gradientSlider}
        className="gradient-slider"
      />
      <p className="text-xs text-muted-foreground text-center">
        {t.customGradientTrackUsing}
      </p>
    </div>
  )
}

export function SliderValueDisplayDemo() {
  const t = useT()
  const [value, setValue] = React.useState(75)

  return (
    <div className="w-full max-w-sm">
      <Slider
        value={value}
        onValueChange={setValue}
        showValue
        formatValue={(v) => `${v}%`}
        label={t.volumeControl}
      />
    </div>
  )
}

export function SliderAnimatedValueDemo() {
  const t = useT()
  const [value, setValue] = React.useState(50)

  return (
    <div className="w-full max-w-sm">
      <Slider
        value={value}
        onValueChange={setValue}
        showValue
        animateValue
        formatValue={(v) => `${v}%`}
        label={t.animatedValueSlider}
      />
    </div>
  )
}

export function SliderAnimatedPriceDemo() {
  const t = useT()
  const [price, setPrice] = React.useState(150)

  return (
    <div className="w-full max-w-sm">
      <Slider
        value={price}
        onValueChange={setPrice}
        min={0}
        max={500}
        step={10}
        showValue
        animateValue
        formatValue={(v) => `$${v}`}
        label={t.priceFilter}
      />
    </div>
  )
}
