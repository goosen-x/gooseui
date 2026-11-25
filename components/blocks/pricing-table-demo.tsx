"use client"

import { useLocale } from "next-intl"
import {
  type PricingPlan,
  PricingTable,
} from "@/registry/gooseui/blocks/marketing/pricing-table"

const en = {
  currency: "USD",
  numberLocale: "en-US",
  discount: "Save 20%",
  popular: "Most popular",
  trial: "Start free trial",
  sales: "Talk to sales",
  plans: [
    {
      name: "Starter",
      description: "For freelancers sending their first invoices.",
      monthly: 12,
      yearly: 115,
      features: [
        "1 user",
        "50 invoices a month",
        "Stripe and PayPal payouts",
        "Email support",
      ],
    },
    {
      name: "Growth",
      description:
        "For small teams that bill every week and want reminders on autopilot.",
      monthly: 30,
      yearly: 288,
      features: [
        "5 users",
        "Unlimited invoices",
        "Automatic payment reminders",
        "38 currencies",
        "QuickBooks and Xero sync",
        "Priority chat support",
      ],
    },
    {
      name: "Scale",
      description: "For finance teams with approvals and audits.",
      monthly: 79,
      yearly: 758,
      features: [
        "Unlimited users",
        "Approval workflows",
        "SAML single sign-on",
        "Audit log kept for 7 years",
        "Dedicated success manager",
      ],
    },
  ],
  labels: {},
}

const ru = {
  currency: "RUB",
  numberLocale: "ru-RU",
  discount: "−20%",
  popular: "Чаще всего берут",
  trial: "Попробовать бесплатно",
  sales: "Связаться с отделом продаж",
  plans: [
    {
      name: "Старт",
      description: "Для фрилансеров, которые выставляют первые счета.",
      monthly: 990,
      yearly: 9500,
      features: [
        "1 пользователь",
        "50 счетов в месяц",
        "Оплата картой и по СБП",
        "Поддержка по почте",
      ],
    },
    {
      name: "Рост",
      description:
        "Для небольших команд, которые выставляют счета каждую неделю и не хотят напоминать о них вручную.",
      monthly: 2490,
      yearly: 23900,
      features: [
        "5 пользователей",
        "Без лимита на счета",
        "Автоматические напоминания об оплате",
        "38 валют",
        "Синхронизация с 1С и МоёДело",
        "Приоритетная поддержка в чате",
      ],
    },
    {
      name: "Масштаб",
      description: "Для финансовых отделов с согласованиями и аудитом.",
      monthly: 6490,
      yearly: 62300,
      features: [
        "Сколько угодно пользователей",
        "Цепочки согласования",
        "Вход через SAML SSO",
        "Журнал действий хранится 7 лет",
        "Персональный менеджер",
      ],
    },
  ],
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
}

/** Demo of the Pricing Table block: three plans in the language of the page. */
export function PricingTableDemo() {
  const t = useLocale() === "ru" ? ru : en
  const plans: PricingPlan[] = t.plans.map((plan, index) => ({
    id: ["starter", "growth", "scale"][index],
    name: plan.name,
    description: plan.description,
    price: { monthly: plan.monthly, yearly: plan.yearly },
    currency: t.currency,
    features: plan.features,
    highlighted: index === 1,
    badge: index === 1 ? t.popular : undefined,
    cta: {
      label: index === 2 ? t.sales : t.trial,
      href: `#plan-${index}`,
    },
  }))
  return (
    <div className="px-4 pb-10 pt-12">
      <PricingTable
        plans={plans}
        yearlyDiscountLabel={t.discount}
        locale={t.numberLocale}
        labels={t.labels}
      />
    </div>
  )
}
