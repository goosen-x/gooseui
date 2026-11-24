import { getLocale } from "next-intl/server"
import { BrowserCheckCell } from "@/components/docs/browser-check-cell"
import { getBaselineStatus } from "@/lib/baseline"
import { BaselineStatus } from "@/registry/gooseui/ui/baseline-status"

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
  },
  ru: {
    feature: "Возможность",
    baseline: "Baseline",
    browser: "Ваш браузер",
    supported: "Ваш браузер поддерживает",
    notSupported: "Ваш браузер не поддерживает",
  },
} as const

export async function BrowserSupport({ title, features }: BrowserSupportProps) {
  const locale = await getLocale()
  const t = locale === "ru" ? LABELS.ru : LABELS.en
  const resolved = await Promise.all(
    features.map(async (feature) => ({
      ...feature,
      name:
        feature.name ??
        (await getBaselineStatus(feature.featureId)).name ??
        feature.featureId,
    })),
  )

  const cell = "sm:p-3 sm:align-top"

  return (
    <div className="space-y-4">
      <h2
        id="browser-support"
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>
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
    </div>
  )
}
