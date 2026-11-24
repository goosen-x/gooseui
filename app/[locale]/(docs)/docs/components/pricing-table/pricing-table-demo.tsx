"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import {
  type PricingPlan,
  PricingTable,
} from "@/registry/gooseui/ui/pricing-table"

const en = {
  locale: "en-US",
  submitted: "Form submitted",
  result: "plan={plan}, billing={billing}",
  discount: "Save 15%",
  labels: {
    billingPeriod: "Billing period",
    monthly: "Monthly",
    yearly: "Yearly",
    perMonth: "/ month",
    billedMonthly: "Billed monthly",
    billedYearly: "{total} billed yearly",
    free: "Free forever",
    included: "Included:",
    notIncluded: "Not included:",
    was: "was",
  },
  plans: [
    {
      name: "Personal",
      description: "Meal plans for one, delivered on Mondays.",
      features: ["5 dinners a week", "Swap any dish until Friday"],
      cta: "Subscribe",
    },
    {
      name: "Family",
      description: "Bigger portions and a kids menu.",
      features: [
        "5 dinners for four",
        "Kids menu",
        "Swap any dish until Friday",
      ],
      cta: "Subscribe",
    },
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    locale: "ru-RU",
    submitted: "Форма отправлена",
    result: "plan={plan}, billing={billing}",
    discount: "−15%",
    labels: {
      billingPeriod: "Период оплаты",
      monthly: "Месяц",
      yearly: "Год",
      perMonth: "/ мес.",
      billedMonthly: "Оплата раз в месяц",
      billedYearly: "{total} при оплате за год",
      free: "Бесплатно навсегда",
      included: "Входит:",
      notIncluded: "Не входит:",
      was: "было",
    },
    plans: [
      {
        name: "Для себя",
        description: "Ужины на одного, привозим по понедельникам.",
        features: [
          "5 ужинов в неделю",
          "Любое блюдо можно заменить до пятницы",
        ],
        cta: "Оформить",
      },
      {
        name: "Семейный",
        description: "Порции побольше и детское меню.",
        features: [
          "5 ужинов на четверых",
          "Детское меню",
          "Любое блюдо можно заменить до пятницы",
        ],
        cta: "Оформить",
      },
    ],
  },
}

const prices = [
  { monthly: 49, yearly: 499 },
  { monthly: 129, yearly: 1316 },
]

/** The table itself has no state: the form reads the radio group and the clicked button. */
export function PricingTableFormDemo() {
  const t = content[useLocale() as Locale]
  const plans: PricingPlan[] = t.plans.map((plan, index) => ({
    id: index === 0 ? "personal" : "family",
    name: plan.name,
    description: plan.description,
    price: prices[index],
    currency: "USD",
    features: plan.features,
    highlighted: index === 1,
    cta: { label: plan.cta },
  }))

  return (
    <form
      className="mx-auto max-w-3xl"
      onSubmit={(event) => {
        event.preventDefault()
        const submitter = (event.nativeEvent as SubmitEvent).submitter
        const data = new FormData(event.currentTarget, submitter)
        customToast.success(t.submitted, {
          description: t.result
            .replace("{plan}", String(data.get("plan")))
            .replace("{billing}", String(data.get("billing"))),
        })
      }}
    >
      <PricingTable
        name="billing"
        plans={plans}
        defaultBilling="yearly"
        yearlyDiscountLabel={t.discount}
        locale={t.locale}
        labels={t.labels}
      />
    </form>
  )
}
