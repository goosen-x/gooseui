import { ArrowRightIcon, Sparkles } from "lucide-react"
import { setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"
import { CARD_PREVIEWS } from "@/components/docs/card-previews"
import { DocsPage } from "@/components/docs/docs-page"
import { ReviewStatusDot } from "@/components/docs/review-status-dot"
import { type Dict, pick } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import {
  docsNavigation,
  EFFECT_GROUPS,
  filterDraftItems,
  groupAnchor,
  groupNavItems,
  navTitle,
} from "@/lib/config/docs-navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"

type Props = { params: Promise<{ locale: string }> }

// Inline previews (fallback when CARD_PREVIEWS has no entry)
function getEffectPreviews(t: Content): Record<string, ReactNode> {
  return {
    "border-beam": (
      <div className="relative flex h-20 w-32 items-center justify-center rounded-lg border bg-background">
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            animation: "border-beam 3s linear infinite",
          }}
        />
        <span className="text-xs text-muted-foreground">{t.hoverMe}</span>
      </div>
    ),
  }
}

const comingSoon = [
  "Spotlight",
  "Glow",
  "Shimmer",
  "Ripple",
  "Particles",
  "Aurora",
]

const en = {
  metaTitle: "Effects",
  description:
    "Visual effects and animations to enhance your UI. Add polish and delight to your applications.",
  isNew: "NEW",
  draft: "Draft",
  preview: "Preview",
  groupsLabel: "Effect groups",
  comingSoon: "Coming Soon",
  inDevelopment: "Effect in development",
  hoverMe: "Hover me",
}

type Content = typeof en

const content: Dict<Content> = {
  en,
  ru: {
    metaTitle: "Эффекты",
    description:
      "Визуальные эффекты и анимации для вашего интерфейса. Добавьте приложению лоска и изюминки.",
    isNew: "НОВОЕ",
    draft: "Черновик",
    preview: "Превью",
    groupsLabel: "Группы эффектов",
    comingSoon: "Скоро",
    inDevelopment: "Эффект в разработке",
    hoverMe: "Наведите курсор",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.metaTitle, description: t.description }
}

export default async function EffectsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const inlinePreviews = getEffectPreviews(t)

  const section = filterDraftItems(docsNavigation).find(
    (s) => s.slug === "effects",
  )
  const effects = (section?.items ?? [])
    .filter((item) => !item.isComingSoon)
    .map((item) => {
      const Preview = CARD_PREVIEWS[item.slug]
      return {
        ...item,
        name: navTitle(item, locale),
        preview: Preview ? <Preview /> : inlinePreviews[item.slug] || null,
      }
    })
  const groups = groupNavItems(effects, EFFECT_GROUPS)
  // Placeholders that already shipped as real effects are dropped
  const pending = comingSoon.filter(
    (name) => !effects.some((effect) => effect.name === name),
  )

  const toc = [
    ...groups.map(({ group }) => ({
      id: groupAnchor(group.id),
      title: pick(group.title, locale),
      level: 2,
    })),
    ...(pending.length > 0
      ? [{ id: "coming-soon", title: t.comingSoon, level: 2 }]
      : []),
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-10 overflow-x-hidden">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {t.metaTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {t.description}
          </p>
          <nav aria-label={t.groupsLabel} className="flex flex-wrap gap-2">
            {groups.map(({ group, items }) => (
              <a
                key={group.id}
                href={`#${groupAnchor(group.id)}`}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {pick(group.title, locale)}
                <span className="text-xs text-muted-foreground tabular-nums">
                  {items.length}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Effects Grid by Group */}
        {groups.map(({ group, items }) => (
          <div key={group.id} className="space-y-6">
            <h2
              id={groupAnchor(group.id)}
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {pick(group.title, locale)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((effect) => (
                <Link
                  key={effect.slug}
                  href={effect.href}
                  className="group min-w-0 cursor-pointer"
                >
                  <div
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-xl border bg-background",
                      "transition-all duration-200",
                      "hover:border-foreground/20 hover:shadow-md",
                    )}
                  >
                    <span className="absolute left-2 top-2 z-10">
                      <ReviewStatusDot status={effect.reviewStatus} />
                    </span>
                    {effect.isDraft && (
                      <Badge
                        variant="draft"
                        className="absolute top-2 right-2 z-10"
                      >
                        {t.draft}
                      </Badge>
                    )}

                    {/* Preview Area */}
                    <div className="@container flex h-[140px] max-w-full items-center justify-center overflow-hidden border-b bg-muted/30 p-4">
                      {effect.preview || (
                        <span className="text-sm text-muted-foreground">
                          {t.preview}
                        </span>
                      )}
                    </div>

                    {/* Info Area */}
                    <div className="flex flex-col gap-1 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="font-semibold">{effect.name}</h3>
                          {effect.isNew && !effect.isDraft && (
                            <Badge variant="beta" className="shrink-0">
                              {t.isNew}
                            </Badge>
                          )}
                        </div>
                        <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {effect.description && pick(effect.description, locale)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Coming Soon Section */}
        {pending.length > 0 && (
          <div className="space-y-6">
            <h2
              id="coming-soon"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.comingSoon}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pending.map((name) => (
                <div
                  key={name}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-xl border bg-background opacity-60",
                  )}
                >
                  <div className="flex h-[140px] items-center justify-center border-b bg-muted/30 p-4">
                    <Sparkles className="size-8 text-muted-foreground/50" />
                  </div>
                  <div className="flex flex-col gap-1 p-4">
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.inDevelopment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DocsPage>
  )
}
