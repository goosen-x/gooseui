import { getLocale } from "next-intl/server"
import { BrowserCheckCell } from "@/components/docs/browser-check-cell"
import { BrowserCheckSummary } from "@/components/docs/browser-check-summary"
import {
  type BaselineStatus as BaselineStatusType,
  getBaselineStatus,
} from "@/lib/baseline"
import {
  BaselineStatus,
  BaselineStatusStatic,
} from "@/registry/gooseui/ui/baseline-status"
import { DetailsAccordionItem } from "@/registry/gooseui/ui/details-accordion"

interface BrowserSupportProps {
  title: string
  features: {
    featureId: string
    /**
     * Optional English override (same on every locale). By default the
     * official webstatus.dev name is shown; if the API is down, `featureId`.
     * Feature names are never translated.
     */
    name?: string
    description: string
    /**
     * The "Your browser supports …" line is shown automatically for every
     * feature that has a built-in check (registry/gooseui/lib/baseline-checks).
     * Pass `false` to hide it.
     */
    browserCheck?: false
  }[]
}

const LABELS = {
  en: {
    feature: "Feature",
    baseline: "Baseline",
    browser: "Your browser",
    supported: "Your browser supports",
    notSupported: "Your browser does not support",
    allSupported: "Your browser supports everything",
    details: "Details",
    count: (n: number) => `${n} ${n === 1 ? "feature" : "features"}`,
  },
  ru: {
    feature: "Возможность",
    baseline: "Baseline",
    browser: "Ваш браузер",
    supported: "Ваш браузер поддерживает",
    notSupported: "Ваш браузер не поддерживает",
    allSupported: "Ваш браузер поддерживает всё",
    details: "Подробнее",
    count: (n: number) => {
      const last = n % 10
      const tens = n % 100
      const form =
        last === 1 && tens !== 11
          ? "возможность"
          : last >= 2 && last <= 4 && (tens < 12 || tens > 14)
            ? "возможности"
            : "возможностей"
      return `${n} ${form}`
    },
  },
} as const

export async function BrowserSupport({ title, features }: BrowserSupportProps) {
  const locale = await getLocale()
  const t = locale === "ru" ? LABELS.ru : LABELS.en
  const resolved = await Promise.all(
    features.map(async (feature) => {
      const baseline = await getBaselineStatus(feature.featureId)
      return {
        ...feature,
        name: feature.name ?? baseline.name ?? feature.featureId,
        status: baseline.status,
      }
    }),
  )

  // Worst status wins: limited < newly < widely. "No data" is skipped
  const order: BaselineStatusType[] = ["limited", "newly", "widely"]
  const worst =
    order.find((status) => resolved.some((f) => f.status === status)) ??
    "no_data"

  const cell = "sm:p-3 sm:align-top"

  return (
    <div className="space-y-4">
      <h2
        id="browser-support"
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>
      <DetailsAccordionItem
        variant="card"
        className="[&>summary>span:first-child]:flex-1 [&>div]:text-foreground"
        title={
          <span className="flex items-center justify-between gap-4 text-sm">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {worst !== "no_data" && (
                <BaselineStatusStatic
                  status={worst}
                  showYear={false}
                  size="sm"
                  className="[&_svg]:h-4"
                />
              )}
              <span className="text-muted-foreground">
                {t.count(resolved.length)}
              </span>
              <BrowserCheckSummary
                features={resolved.map((f) => ({
                  featureId: f.featureId,
                  name: f.name,
                  enabled: f.browserCheck !== false,
                }))}
                labels={{
                  allSupported: t.allSupported,
                  notSupported: t.notSupported,
                }}
              />
            </span>
            <span className="shrink-0 text-muted-foreground">{t.details}</span>
          </span>
        }
      >
        {/* Table from sm up, cards below: the table elements are switched to
              block/grid and keep their semantics through explicit roles */}
        <div
          role="table"
          className="block w-full text-sm sm:table sm:border-collapse"
        >
          <div
            role="rowgroup"
            className="hidden border-b text-xs font-medium text-muted-foreground sm:table-header-group"
          >
            <div role="row" className="sm:table-row">
              <div role="columnheader" className="p-3 pl-0 sm:table-cell">
                {t.feature}
              </div>
              <div role="columnheader" className="p-3 sm:table-cell">
                {t.baseline}
              </div>
              <div
                role="columnheader"
                className="whitespace-nowrap p-3 pr-0 sm:table-cell"
              >
                {t.browser}
              </div>
            </div>
          </div>
          <div role="rowgroup" className="block divide-y sm:table-row-group">
            {resolved.map((feature) => (
              <div
                role="row"
                key={feature.featureId}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 py-4 first:pt-0 sm:table-row sm:border-b sm:py-0 sm:last:border-b-0"
              >
                <div
                  role="cell"
                  className={`col-span-2 min-w-0 space-y-1 ${cell} sm:table-cell sm:pl-0`}
                >
                  <strong className="block">{feature.name}</strong>
                  <p className="max-w-[60ch] text-pretty text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <div
                  role="cell"
                  className={`${cell} sm:table-cell sm:whitespace-nowrap`}
                >
                  <BaselineStatus
                    featureId={feature.featureId}
                    className="rounded-none border-0 bg-transparent p-0 sm:[&_span]:whitespace-nowrap [&_svg]:shrink-0"
                  />
                </div>
                <div
                  role="cell"
                  className={`${cell} justify-self-end whitespace-nowrap sm:table-cell sm:w-px sm:pr-0 sm:justify-self-auto`}
                >
                  <BrowserCheckCell
                    featureId={feature.featureId}
                    enabled={feature.browserCheck !== false}
                    name={feature.name}
                    labels={{
                      column: t.browser,
                      supported: t.supported,
                      notSupported: t.notSupported,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DetailsAccordionItem>
    </div>
  )
}
