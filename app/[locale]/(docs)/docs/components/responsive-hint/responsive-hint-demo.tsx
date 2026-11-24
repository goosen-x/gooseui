import type { Locale } from "@/i18n/routing"
import { ResponsiveHint } from "@/registry/gooseui/ui/responsive-hint"

const ruLabels = { trigger: "Подробнее", close: "Закрыть" }

type DemoProps = { locale: Locale }

function Info() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  )
}

export function ResponsiveHintDemo({ locale }: DemoProps) {
  const ru = locale === "ru"
  return (
    <div className="w-full max-w-sm rounded-lg border bg-background p-5 text-sm">
      <div className="flex items-center justify-between border-b pb-3">
        <span className="flex items-center gap-1.5">
          {ru ? "Доставка" : "Shipping"}
          <ResponsiveHint
            title={ru ? "Как считаем доставку" : "How shipping is calculated"}
            labels={ru ? ruLabels : undefined}
          >
            {ru
              ? "Цена зависит от веса посылки и расстояния. От 50 у.е. доставка бесплатная."
              : "The price depends on parcel weight and distance. Orders over 50 units ship free."}
          </ResponsiveHint>
        </span>
        <span className="font-medium">4.90</span>
      </div>
      <div className="flex items-center justify-between pt-3">
        <span className="flex items-center gap-1.5">
          {ru ? "Сервисный сбор" : "Service fee"}
          <ResponsiveHint labels={ru ? ruLabels : undefined}>
            {ru
              ? "Покрывает оплату картой и поддержку."
              : "Covers card processing and support."}
          </ResponsiveHint>
        </span>
        <span className="font-medium">0.99</span>
      </div>
    </div>
  )
}

export function ResponsiveHintSheetDemo({ locale }: DemoProps) {
  const ru = locale === "ru"
  return (
    <div className="flex items-center gap-2 text-sm">
      {ru ? "Нажмите на значок" : "Press the icon"}
      <ResponsiveHint
        mode="sheet"
        title={ru ? "Возврат" : "Returns"}
        labels={ru ? ruLabels : undefined}
      >
        {ru
          ? "Товар можно вернуть в течение 30 дней. Сохраните упаковку и чек."
          : "You can return the item within 30 days. Keep the box and the receipt."}
      </ResponsiveHint>
    </div>
  )
}

export function ResponsiveHintIconDemo({ locale }: DemoProps) {
  const ru = locale === "ru"
  return (
    <div className="flex items-center gap-2 text-sm">
      {ru ? "Подсказка справа" : "Hint on the right"}
      <ResponsiveHint
        side="right"
        icon={<Info />}
        breakpoint={1024}
        labels={ru ? ruLabels : undefined}
      >
        {ru
          ? "На экранах уже 1024px это будет шторка."
          : "Below 1024px this becomes a sheet."}
      </ResponsiveHint>
    </div>
  )
}
