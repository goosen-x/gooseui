import { getLocale } from "next-intl/server"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { getBaselineStatus } from "@/lib/baseline"
import { getComponentBaselineFeatures } from "@/lib/config/baseline-features"
import { BaselineStatusStatic } from "@/registry/gooseui/ui/baseline-status"

const content: Dict<{ title: string; before: string; after: string }> = {
  en: {
    title: "Browser Support",
    before: "Learn more about",
    after: "browser support.",
  },
  ru: {
    title: "Поддержка браузеров",
    before: "Подробнее о",
    after: "поддержке браузеров.",
  },
}

interface ComponentBaselineProps {
  slug: string
}

/**
 * Server Component that displays browser support status for a component
 * Only renders if the component is listed in baseline-features.ts
 */
export async function ComponentBaseline({ slug }: ComponentBaselineProps) {
  const t = content[(await getLocale()) as Locale]
  const features = getComponentBaselineFeatures(slug)

  // Not in config → don't show section
  if (!features?.length) return null

  const statuses = await Promise.all(features.map((f) => getBaselineStatus(f)))

  return (
    <div className="space-y-4">
      <h2
        id="browser-support"
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      >
        {t.title}
      </h2>
      <div className="flex flex-wrap gap-4">
        {features.map((featureId, i) => (
          <div
            key={featureId}
            className="flex items-center gap-2 rounded-lg border bg-card p-3"
          >
            <BaselineStatusStatic
              status={statuses[i].status}
              year={statuses[i].year}
              size="sm"
            />
            <span className="text-sm text-muted-foreground font-mono">
              {featureId}
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        {t.before}{" "}
        <a
          href="https://web.dev/baseline"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          Baseline
        </a>{" "}
        {t.after}
      </p>
    </div>
  )
}
