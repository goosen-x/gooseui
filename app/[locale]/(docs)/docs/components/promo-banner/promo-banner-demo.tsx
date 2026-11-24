"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { PromoBanner } from "@/registry/gooseui/ui/promo-banner"

const en = {
  showPromoBanner: "Show Promo Banner",
  winterCampaign: "Winter Campaign",
  headline: "START THE NEW YEAR WITH A BANG!",
  getBundle: "Get Bundle",
  n3DaysLeftFirst100: "3 DAYS LEFT • FIRST 100 ONLY",
  topLeft: "Top Left",
  topRight: "Top Right",
  bottomLeft: "Bottom Left",
  bottomRight: "Bottom Right",
  flashSale: "Flash Sale",
  n50OffEverything: "50% OFF EVERYTHING!",
  shopNow: "Shop Now",
  limitedTimeOffer: "LIMITED TIME OFFER",
  themeTint: "Theme tint",
  deepTint: "Deep tint",
  neutral: "Neutral",
  solid: "Solid",
  newYearSale: "New Year Sale",
  saveBigToday: "SAVE BIG TODAY!",
  claimOffer: "Claim Offer",
  endsMidnight: "ENDS MIDNIGHT",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    showPromoBanner: "Показать промо-баннер",
    winterCampaign: "Зимняя акция",
    headline: "НАЧНИТЕ НОВЫЙ ГОД С ВЫГОДОЙ!",
    getBundle: "Забрать набор",
    n3DaysLeftFirst100: "ОСТАЛОСЬ 3 ДНЯ • ТОЛЬКО ПЕРВЫМ 100",
    topLeft: "Слева сверху",
    topRight: "Справа сверху",
    bottomLeft: "Слева снизу",
    bottomRight: "Справа снизу",
    flashSale: "Быстрая распродажа",
    n50OffEverything: "СКИДКА 50% НА ВСЁ!",
    shopNow: "В магазин",
    limitedTimeOffer: "ПРЕДЛОЖЕНИЕ ОГРАНИЧЕНО ПО ВРЕМЕНИ",
    themeTint: "Оттенок темы",
    deepTint: "Насыщенный",
    neutral: "Нейтральный",
    solid: "Сплошной",
    newYearSale: "Новогодняя распродажа",
    saveBigToday: "СЭКОНОМЬТЕ СЕГОДНЯ!",
    claimOffer: "Получить скидку",
    endsMidnight: "ДО ПОЛУНОЧИ",
  },
}

export function PromoBannerDemo() {
  const t = content[useLocale() as Locale]

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setIsOpen(true)}>{t.showPromoBanner}</Button>

      {isOpen && (
        <PromoBanner
          title={t.winterCampaign}
          headline={t.headline}
          price={229}
          originalPrice={1444}
          ctaText={t.getBundle}
          ctaHref="#"
          marqueeText={t.n3DaysLeftFirst100}
          position="bottom-right"
          onClose={() => setIsOpen(false)}
          defaultOpen={true}
        />
      )}
    </div>
  )
}

export function PromoBannerPositions() {
  const t = content[useLocale() as Locale]

  const [position, setPosition] = React.useState<
    "bottom-right" | "bottom-left" | "top-right" | "top-left" | null
  >(null)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setPosition("top-left")}
        >
          {t.topLeft}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setPosition("top-right")}
        >
          {t.topRight}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setPosition("bottom-left")}
        >
          {t.bottomLeft}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setPosition("bottom-right")}
        >
          {t.bottomRight}
        </Button>
      </div>

      {position && (
        <PromoBanner
          title={t.flashSale}
          headline={t.n50OffEverything}
          price={49}
          originalPrice={99}
          ctaText={t.shopNow}
          ctaHref="#"
          marqueeText={t.limitedTimeOffer}
          position={position}
          onClose={() => setPosition(null)}
          defaultOpen={true}
        />
      )}
    </div>
  )
}

export function PromoBannerGradients() {
  const t = content[useLocale() as Locale]

  const [variant, setVariant] = React.useState<string | null>(null)

  const gradients = [
    {
      name: t.themeTint,
      from: "from-foreground",
      to: "to-[color-mix(in_oklab,var(--foreground)_55%,var(--primary))]",
    },
    {
      name: t.deepTint,
      from: "from-foreground",
      to: "to-[color-mix(in_oklab,var(--foreground)_40%,var(--primary))]",
    },
    {
      name: t.neutral,
      from: "from-foreground",
      to: "to-[color-mix(in_oklab,var(--foreground)_80%,var(--background))]",
    },
    { name: t.solid, from: "from-foreground", to: "to-foreground" },
  ]

  const selected = gradients.find((g) => g.name === variant)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {gradients.map((g) => (
          <Button
            variant="secondary"
            size="sm"
            key={g.name}
            onClick={() => setVariant(g.name)}
          >
            {g.name}
          </Button>
        ))}
      </div>

      {selected && (
        <PromoBanner
          title={t.newYearSale}
          headline={t.saveBigToday}
          price={199}
          originalPrice={599}
          ctaText={t.claimOffer}
          ctaHref="#"
          marqueeText={t.endsMidnight}
          position="bottom-right"
          gradientFrom={selected.from}
          gradientTo={selected.to}
          onClose={() => setVariant(null)}
          defaultOpen={true}
        />
      )}
    </div>
  )
}
