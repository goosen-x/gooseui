"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import {
  QuantitySlider,
  type QuantityUnit,
} from "@/registry/gooseui/ui/quantity-slider"

const en = {
  quantity: "Quantity",
  decrease: "Decrease",
  increase: "Increase",
  total: "Total",
  unit: "Unit",
  seats: "Seats",
  perSeat: "$12 per seat a month",
  order: "Add to order",
  added: "Added to order",
  addedText: (v: string) => `Coffee beans, ${v} kg`,
  kg: "kg",
  bag: "bags",
  sack: "sacks",
  weight: "Weight",
  inKg: (v: number) => `${v} kg in base units`,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    quantity: "Количество",
    decrease: "Уменьшить",
    increase: "Увеличить",
    total: "Итого",
    unit: "Единица",
    seats: "Места",
    perSeat: "$12 за место в месяц",
    order: "Добавить в заказ",
    added: "Добавлено в заказ",
    addedText: (v: string) => `Кофе в зёрнах, ${v} кг`,
    kg: "кг",
    bag: "пачки",
    sack: "мешки",
    weight: "Вес",
    inKg: (v: number) => `${v} кг в базовых единицах`,
  },
}

function useT() {
  return content[useLocale() as Locale]
}

const usd = (v: number) =>
  v.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

export function QuantitySliderPreviewDemo() {
  const t = useT()
  const [seats, setSeats] = React.useState(8)
  return (
    <div className="w-full max-w-md space-y-2 px-4">
      <QuantitySlider
        min={1}
        max={50}
        value={seats}
        onValueChange={setSeats}
        unitPrice={12}
        formatTotal={usd}
        labels={{
          quantity: t.seats,
          decrease: t.decrease,
          increase: t.increase,
          total: t.total,
        }}
      />
      <p className="text-xs text-muted-foreground">{t.perSeat}</p>
    </div>
  )
}

export function QuantitySliderUnitsDemo() {
  const t = useT()
  const units: QuantityUnit[] = [
    { id: "kg", label: t.kg, factor: 1, step: 0.25 },
    { id: "bag", label: t.bag, factor: 0.25, step: 1 },
    { id: "sack", label: t.sack, factor: 5, step: 1 },
  ]
  const [kg, setKg] = React.useState(2)
  return (
    <div className="w-full max-w-md space-y-4 px-4">
      <QuantitySlider
        min={0.25}
        max={50}
        step={0.25}
        value={kg}
        onValueChange={setKg}
        units={units}
        unitPrice={18.5}
        formatTotal={(v) =>
          v.toLocaleString("en-US", { style: "currency", currency: "USD" })
        }
        labels={{
          quantity: t.weight,
          decrease: t.decrease,
          increase: t.increase,
          total: t.total,
          unit: t.unit,
        }}
      />
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground">
          {t.inKg(kg)}
        </span>
        <Button
          size="sm"
          className="cursor-pointer"
          onClick={() =>
            customToast.success(t.added, {
              description: t.addedText(String(kg)),
            })
          }
        >
          {t.order}
        </Button>
      </div>
    </div>
  )
}

export function QuantitySliderPlainDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-md px-4">
      <QuantitySlider
        min={0}
        max={1000}
        step={10}
        defaultValue={250}
        ticks={3}
        labels={{
          quantity: t.quantity,
          decrease: t.decrease,
          increase: t.increase,
        }}
      />
    </div>
  )
}
