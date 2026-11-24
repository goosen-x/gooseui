import * as React from "react"
import { cn } from "@/lib/utils"

export type PricingBilling = "monthly" | "yearly"

export type PricingFeature =
  | string
  | {
      label: React.ReactNode
      included: boolean
      /** Small muted line under the label */
      hint?: React.ReactNode
    }

export type PricingPlan = {
  id: string
  name: React.ReactNode
  description?: React.ReactNode
  /** `monthly` is the price of one month; `yearly` is the total for one year (shown per month). */
  price: { monthly: number; yearly: number }
  /** ISO 4217 code, e.g. "USD" */
  currency: string
  features: PricingFeature[]
  cta: {
    label: React.ReactNode
    /**
     * Link target. Pass `{ monthly, yearly }` to send each period to its own
     * checkout: CSS shows the link of the selected period. Without `href` the
     * CTA is a submit button with `name="plan"` and `value={id}`, so inside a
     * `<form>` you receive both the plan and the billing period.
     */
    href?: string | { monthly: string; yearly: string }
  }
  /** Accent border, tint and filled CTA */
  highlighted?: boolean
  /** Label on top of the card, e.g. "Most popular" */
  badge?: React.ReactNode
}

export type PricingTableLabels = {
  /** Accessible name of the switch */
  billingPeriod: string
  monthly: React.ReactNode
  yearly: React.ReactNode
  perMonth: React.ReactNode
  billedMonthly: React.ReactNode
  /** `{total}` is replaced with the yearly total */
  billedYearly: string
  free: React.ReactNode
  /** Screen reader prefix of an included feature */
  included: string
  /** Screen reader prefix of a missing feature */
  notIncluded: string
  /** Screen reader text before the crossed out monthly price */
  was: string
}

export type PricingTableProps = Omit<
  React.ComponentProps<"div">,
  "children" | "defaultValue"
> & {
  plans: PricingPlan[]
  /** Period checked on first render */
  defaultBilling?: PricingBilling
  /**
   * Fixed period: no switch is rendered and only these prices are shown.
   * Use it when the period comes from the URL or your own control.
   */
  billing?: PricingBilling
  /** Name of the billing radio group, e.g. "billing" when the table sits in a form. Generated when omitted */
  name?: string
  /** Pill next to "Yearly" in the switch, e.g. "Save 20%". Hidden when empty */
  yearlyDiscountLabel?: React.ReactNode
  /** Any CSS color for the highlighted plan. Default: the theme primary */
  accentColor?: string
  /** Text color on the accent where `contrast-color()` is missing. Default: primary-foreground, or white with a custom accent */
  accentForeground?: string
  /** Locale for number formatting. Default "en-US" */
  locale?: string
  labels?: Partial<PricingTableLabels>
}

const defaultLabels: PricingTableLabels = {
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
}

// Billing: two radio inputs. :has() on the root reads the checked one and
// hides the elements of the other period, so the switch needs no JavaScript
// and works in Server Components. The two amounts share one grid cell and
// cross-fade with a transition (no animation on first paint, stable width).
// Without :has() the switch is hidden and the default period is shown.
// Layout: one column by default; from 44rem of container width every card spans
// four rows of the parent grid via subgrid, so titles, prices, CTAs and feature
// lists line up across cards. Without subgrid the cards are flex columns.
const css = `
[data-slot="pricing-table"] {
  container: pricing-table / inline-size;
  --pricing-accent: var(--primary);
  --pricing-accent-fg: var(--primary-foreground);
}

[data-slot="pricing-table"]:has(> [data-slot="pricing-table-switch"] input[value="yearly"]:checked) [data-billing-only="monthly"],
[data-slot="pricing-table"]:has(> [data-slot="pricing-table-switch"] input[value="monthly"]:checked) [data-billing-only="yearly"],
[data-slot="pricing-table"][data-billing="yearly"] [data-billing-only="monthly"],
[data-slot="pricing-table"][data-billing="monthly"] [data-billing-only="yearly"] {
  display: none;
}

[data-slot="pricing-card-amount"] { display: inline-grid; }
[data-slot="pricing-card-amount"] > [data-billing-price] {
  grid-area: 1 / 1;
  transition: opacity 220ms ease, translate 260ms cubic-bezier(0.2, 0.7, 0.2, 1), visibility 260ms;
}
[data-slot="pricing-table"]:has(> [data-slot="pricing-table-switch"] input[value="yearly"]:checked) [data-billing-price="monthly"],
[data-slot="pricing-table"]:has(> [data-slot="pricing-table-switch"] input[value="monthly"]:checked) [data-billing-price="yearly"],
[data-slot="pricing-table"][data-billing="yearly"] [data-billing-price="monthly"],
[data-slot="pricing-table"][data-billing="monthly"] [data-billing-price="yearly"] {
  visibility: hidden;
  opacity: 0;
  translate: 0 0.35em;
}

@supports not selector(:has(*)) {
  [data-slot="pricing-table-switch"] { display: none; }
  [data-default-billing="yearly"] [data-billing-only="monthly"],
  [data-default-billing="monthly"] [data-billing-only="yearly"] {
    display: none;
  }
  [data-default-billing="yearly"] [data-billing-price="monthly"],
  [data-default-billing="monthly"] [data-billing-price="yearly"] {
    visibility: hidden;
  }
}

[data-slot="pricing-table-grid"] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}
[data-slot="pricing-card"] {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
@container pricing-table (min-width: 44rem) {
  [data-slot="pricing-table-grid"] {
    grid-template-columns: repeat(var(--pricing-cols), minmax(0, 1fr));
    align-items: stretch;
  }
}
@supports (grid-template-rows: subgrid) {
  @container pricing-table (min-width: 44rem) {
    [data-slot="pricing-table-grid"] { row-gap: 0; }
    [data-slot="pricing-card"] {
      display: grid;
      grid-row: span 4;
      grid-template-rows: subgrid;
      row-gap: 1.25rem;
    }
  }
}
@supports not (container-type: inline-size) {
  @media (min-width: 48rem) {
    [data-slot="pricing-table-grid"] {
      grid-template-columns: repeat(var(--pricing-cols), minmax(0, 1fr));
    }
  }
}

[data-slot="pricing-card"][data-highlighted] {
  border-color: var(--pricing-accent);
  background: color-mix(in oklch, var(--pricing-accent) 6%, var(--card));
  box-shadow: 0 10px 30px -12px color-mix(in oklch, var(--pricing-accent) 45%, transparent);
}
[data-slot="pricing-card-badge"],
[data-slot="pricing-card"][data-highlighted] [data-slot="pricing-card-cta"] {
  border-color: transparent;
  background: var(--pricing-accent);
  color: var(--pricing-accent-fg);
}
@supports (color: contrast-color(red)) {
  [data-slot="pricing-card-badge"],
  [data-slot="pricing-card"][data-highlighted] [data-slot="pricing-card-cta"] {
    color: contrast-color(var(--pricing-accent));
  }
}
[data-slot="pricing-card"][data-highlighted] [data-slot="pricing-card-cta"]:hover {
  background: color-mix(in oklch, var(--pricing-accent) 88%, var(--foreground));
}
[data-slot="pricing-card"][data-highlighted] [data-slot="pricing-card-cta"]:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--pricing-accent) 45%, transparent);
}
[data-slot="pricing-card"] [data-feature-icon="included"] {
  color: var(--pricing-accent);
  background: color-mix(in oklch, var(--pricing-accent) 14%, transparent);
}
[data-slot="pricing-save"] {
  color: color-mix(in oklch, var(--pricing-accent) 80%, var(--foreground));
  background: color-mix(in oklch, var(--pricing-accent) 12%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  [data-slot="pricing-card-amount"] > [data-billing-price] { transition: none; }
}
`

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "size-3",
} as const

function CheckIcon() {
  return (
    <svg {...svg}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg {...svg}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function formatMoney(amount: number, currency: string, locale: string) {
  const whole = Number.isInteger(amount)
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(amount)
}

function perMonth(plan: PricingPlan, billing: PricingBilling) {
  const raw = billing === "yearly" ? plan.price.yearly / 12 : plan.price.monthly
  return Math.round(raw * 100) / 100
}

function savingPercent(plan: PricingPlan) {
  const full = plan.price.monthly * 12
  if (full <= 0) return 0
  return Math.round((1 - plan.price.yearly / full) * 100)
}

const ctaClass =
  "inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background px-4 text-sm font-medium shadow-xs outline-none transition-[background-color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50 cursor-pointer"

function PricingFeatureItem({
  feature,
  labels,
}: {
  feature: PricingFeature
  labels: PricingTableLabels
}) {
  const item =
    typeof feature === "string"
      ? { label: feature, included: true, hint: undefined }
      : feature
  return (
    <li
      data-slot="pricing-feature"
      data-included={item.included ? "" : undefined}
      className="flex gap-2.5 text-sm"
    >
      <span
        data-feature-icon={item.included ? "included" : "excluded"}
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
          !item.included && "bg-muted text-muted-foreground",
        )}
      >
        {item.included ? <CheckIcon /> : <XIcon />}
      </span>
      <span className="min-w-0">
        <span className="sr-only">
          {item.included ? labels.included : labels.notIncluded}{" "}
        </span>
        <span className={cn(!item.included && "text-muted-foreground")}>
          {item.label}
        </span>
        {item.hint ? (
          <span className="block text-xs text-muted-foreground">
            {item.hint}
          </span>
        ) : null}
      </span>
    </li>
  )
}

function PricingCard({
  plan,
  locale,
  labels,
}: {
  plan: PricingPlan
  locale: string
  labels: PricingTableLabels
}) {
  const headingId = React.useId()
  const monthly = perMonth(plan, "monthly")
  const yearly = perMonth(plan, "yearly")
  const saving = savingPercent(plan)
  const yearlyTotal = formatMoney(plan.price.yearly, plan.currency, locale)
  const free = plan.price.monthly === 0 && plan.price.yearly === 0
  const href = plan.cta.href

  const cta =
    typeof href === "string" ? (
      <a data-slot="pricing-card-cta" href={href} className={ctaClass}>
        {plan.cta.label}
      </a>
    ) : href ? (
      <>
        <a
          data-slot="pricing-card-cta"
          data-billing-only="monthly"
          href={href.monthly}
          className={ctaClass}
        >
          {plan.cta.label}
        </a>
        <a
          data-slot="pricing-card-cta"
          data-billing-only="yearly"
          href={href.yearly}
          className={ctaClass}
        >
          {plan.cta.label}
        </a>
      </>
    ) : (
      <button
        type="submit"
        name="plan"
        value={plan.id}
        data-slot="pricing-card-cta"
        className={ctaClass}
      >
        {plan.cta.label}
      </button>
    )

  return (
    <article
      data-slot="pricing-card"
      data-highlighted={plan.highlighted ? "" : undefined}
      aria-labelledby={headingId}
      className="relative rounded-xl border bg-card p-6 text-card-foreground shadow-xs"
    >
      {plan.badge ? (
        <span
          data-slot="pricing-card-badge"
          className="absolute -top-3 left-6 rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-sm"
        >
          {plan.badge}
        </span>
      ) : null}

      <header data-slot="pricing-card-header" className="space-y-1.5">
        <h3 id={headingId} className="text-lg font-semibold leading-tight">
          {plan.name}
        </h3>
        {plan.description ? (
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        ) : null}
      </header>

      <div data-slot="pricing-card-price" className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span
            data-slot="pricing-card-amount"
            className="text-4xl font-semibold tracking-tight tabular-nums"
          >
            <span data-billing-price="monthly">
              {formatMoney(monthly, plan.currency, locale)}
            </span>
            <span data-billing-price="yearly">
              {formatMoney(yearly, plan.currency, locale)}
            </span>
          </span>
          {!free ? (
            <span className="text-sm text-muted-foreground">
              {labels.perMonth}
            </span>
          ) : null}
          {!free && saving > 0 ? (
            <s
              data-billing-only="yearly"
              className="text-sm text-muted-foreground tabular-nums"
            >
              <span className="sr-only">{labels.was} </span>
              {formatMoney(monthly, plan.currency, locale)}
            </s>
          ) : null}
        </div>
        <p className="text-xs text-muted-foreground">
          {free ? (
            labels.free
          ) : (
            <>
              <span data-billing-only="monthly">{labels.billedMonthly}</span>
              <span data-billing-only="yearly">
                {labels.billedYearly.replace("{total}", yearlyTotal)}
                {saving > 0 ? (
                  <span
                    data-slot="pricing-save"
                    className="ml-1.5 rounded-full px-1.5 py-px font-medium"
                  >
                    −{saving}%
                  </span>
                ) : null}
              </span>
            </>
          )}
        </p>
      </div>

      <div data-slot="pricing-card-action">{cta}</div>

      <ul data-slot="pricing-card-features" className="space-y-2.5">
        {plan.features.map((feature, index) => (
          <PricingFeatureItem key={index} feature={feature} labels={labels} />
        ))}
      </ul>
    </article>
  )
}

const optionClass =
  "relative inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-[background-color,color,box-shadow] hover:text-foreground has-[:checked]:bg-background has-[:checked]:text-foreground has-[:checked]:shadow-sm has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 dark:has-[:checked]:bg-input/50 motion-reduce:transition-none"

/**
 * Plan cards with a monthly/yearly switch built on radio inputs: CSS swaps the
 * prices, so the whole table is a Server Component with no JavaScript. Card
 * rows (title, price, CTA, features) line up across columns through subgrid;
 * cards stack in narrow containers.
 */
function PricingTable({
  plans,
  defaultBilling = "monthly",
  billing,
  name,
  yearlyDiscountLabel,
  accentColor,
  accentForeground,
  locale = "en-US",
  labels: labelsProp,
  className,
  style,
  ...props
}: PricingTableProps) {
  const generatedName = React.useId()
  const groupName = name ?? `pricing-billing-${generatedName}`
  const labels = { ...defaultLabels, ...labelsProp }
  const initial = billing ?? defaultBilling

  return (
    <div
      data-slot="pricing-table"
      data-default-billing={initial}
      data-billing={billing}
      className={cn("flex flex-col items-center gap-8", className)}
      style={
        {
          "--pricing-cols": Math.max(plans.length, 1),
          ...(accentColor ? { "--pricing-accent": accentColor } : null),
          ...(accentColor || accentForeground
            ? { "--pricing-accent-fg": accentForeground ?? "white" }
            : null),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <style href="gooseui-pricing-table" precedence="default">
        {css}
      </style>
      {billing ? null : (
        <fieldset
          data-slot="pricing-table-switch"
          className="m-0 inline-flex min-w-0 gap-1 rounded-full border bg-muted p-1"
        >
          <legend className="sr-only">{labels.billingPeriod}</legend>
          <label className={optionClass}>
            <input
              type="radio"
              name={groupName}
              value="monthly"
              defaultChecked={initial === "monthly"}
              className="sr-only"
            />
            {labels.monthly}
          </label>
          <label className={optionClass}>
            <input
              type="radio"
              name={groupName}
              value="yearly"
              defaultChecked={initial === "yearly"}
              className="sr-only"
            />
            {labels.yearly}
            {yearlyDiscountLabel ? (
              <span className="rounded-full border border-current/30 px-1.5 text-[0.6875rem] font-semibold leading-4">
                {yearlyDiscountLabel}
              </span>
            ) : null}
          </label>
        </fieldset>
      )}
      <div data-slot="pricing-table-grid" className="w-full">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            locale={locale}
            labels={labels}
          />
        ))}
      </div>
    </div>
  )
}

export { PricingTable }
