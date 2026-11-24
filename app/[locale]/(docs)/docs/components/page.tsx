import {
  ArrowRightIcon,
  ArrowUp,
  CircleCheck,
  Expand,
  Gauge,
  Layers,
  Moon,
  Palette,
  X,
} from "lucide-react"
import { setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"
import { CARD_PREVIEWS } from "@/components/docs/card-previews"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { ReviewStatusDot } from "@/components/docs/review-status-dot"
import { type Dict, pick } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import {
  COMPONENT_GROUPS,
  getAvailableComponents,
  getComingSoonComponents,
  groupAnchor,
  groupNavItems,
  navTitle,
} from "@/lib/config/docs-navigation"
import { cn } from "@/lib/utils"
import { AnimatedTimer } from "@/registry/gooseui/ui/animated-timer"
import { Badge } from "@/registry/gooseui/ui/badge"
import { BaselineStatus } from "@/registry/gooseui/ui/baseline-status"
import { Button } from "@/registry/gooseui/ui/button"
import { Card } from "@/registry/gooseui/ui/card"
import { Checkbox } from "@/registry/gooseui/ui/checkbox"
import { DigitalClock } from "@/registry/gooseui/ui/digital-clock"
import { Input } from "@/registry/gooseui/ui/input"
import { Typography } from "@/registry/gooseui/ui/typography"

// Preview components mapping (slug -> preview element)
function getComponentPreviews(
  t: (typeof content)["en"],
): Record<string, ReactNode> {
  return {
    "adaptive-grid": (
      <div className="grid grid-cols-3 gap-1 w-full max-w-[180px]">
        <div className="h-8 rounded bg-primary/80" />
        <div className="h-8 rounded bg-primary/60" />
        <div className="h-8 rounded bg-primary/40" />
        <div className="h-8 rounded bg-primary/40" />
        <div className="h-8 rounded bg-primary/60" />
        <div className="h-8 rounded bg-primary/80" />
      </div>
    ),
    "animated-timer": (
      <div className="flex items-center justify-center scale-50 origin-center">
        <AnimatedTimer showSeconds={false} />
      </div>
    ),
    badge: (
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="beta">Beta</Badge>
      </div>
    ),
    "baseline-status": (
      <div className="flex flex-col gap-2">
        <BaselineStatus status="widely" year={2023} size="sm" />
        <BaselineStatus status="newly" year={2024} size="sm" />
      </div>
    ),
    button: (
      <div className="flex items-center gap-2">
        <Button size="sm">Button</Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
      </div>
    ),
    card: (
      <Card className="w-full h-full max-w-[200px] p-4 flex flex-col justify-center">
        <div className="text-sm font-medium">{t.cardTitle}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {t.cardContent}
        </div>
      </Card>
    ),
    carousel: (
      <div className="flex items-center gap-1">
        <div className="h-16 w-12 rounded bg-primary/20" />
        <div className="h-16 w-12 rounded bg-primary/40" />
        <div className="h-16 w-12 rounded bg-primary" />
        <div className="h-16 w-12 rounded bg-primary/40" />
        <div className="h-16 w-12 rounded bg-primary/20" />
      </div>
    ),
    checkbox: <Checkbox label={t.acceptTerms} defaultChecked />,
    "digital-clock": (
      <div className="scale-[0.28] @sm:scale-[0.32] @md:scale-[0.38] origin-center">
        <DigitalClock showSeconds={false} />
      </div>
    ),
    input: <Input placeholder={t.enterText} className="max-w-[200px]" />,
    "morphing-dialog": (
      <div className="relative w-full max-w-[180px] overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="h-20 w-full bg-gradient-to-br from-blue-400 to-purple-500" />
        <div className="p-2">
          <p className="text-xs font-medium">{t.alps}</p>
          <p className="text-[10px] text-muted-foreground">{t.clickExpand}</p>
        </div>
        <Expand className="absolute top-2 right-2 size-3 text-white/70" />
      </div>
    ),
    "github-star-dialog": (
      <div className="w-full max-w-[11.25rem] overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex h-12 items-center justify-center bg-[#12152b]">
          <span className="text-xl text-yellow-400 drop-shadow-[0_0_0.375rem_rgba(250,204,21,0.7)]">
            ★
          </span>
        </div>
        <div className="space-y-1.5 p-2">
          <p className="text-center text-[0.625rem] font-semibold">
            {t.starHelp} <span className="text-amber-500">{t.starCount}</span>
          </p>
          <div className="h-1 rounded-full bg-muted">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300" />
          </div>
        </div>
      </div>
    ),
    "promo-banner": (
      <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 px-3 py-2 text-white">
        <span className="text-xs font-bold">{t.sale}</span>
      </div>
    ),
    "theme-customizer": (
      <div className="flex gap-1 rounded-full border bg-background/70 p-1 shadow-lg backdrop-blur-xl">
        <div className="flex size-9 items-center justify-center rounded-full hover:bg-accent">
          <Moon className="size-5" />
        </div>
        <div className="flex size-9 items-center justify-center rounded-full hover:bg-accent">
          <Palette className="size-5" />
        </div>
      </div>
    ),
    toast: (
      <div className="relative flex w-full max-w-[220px] items-start gap-2 overflow-hidden rounded-lg border border-l-4 border-l-green-500 bg-popover p-3 shadow-lg">
        <CircleCheck className="mt-0.5 size-4 shrink-0 text-green-500" />
        <div className="flex-1 space-y-0.5">
          <p className="text-xs font-medium">{t.success}</p>
          <p className="text-[10px] text-muted-foreground">{t.saved}</p>
        </div>
        <X className="size-3 shrink-0 opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted/50">
          <div className="h-full w-[70%] bg-green-500" />
        </div>
      </div>
    ),
    typography: (
      <div className="flex flex-col items-center gap-1 text-center">
        <Typography variant="h4">{t.heading}</Typography>
        <Typography variant="muted" as="span">
          Muted
        </Typography>
      </div>
    ),
    "scroll-to-top": (
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <ArrowUp className="size-5" />
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg">
          <ArrowUp className="size-4" />
          <span>{t.top}</span>
        </div>
      </div>
    ),
    // Draft components
    "scroll-progress": (
      <div className="w-full max-w-[180px] space-y-2">
        <div className="h-1 w-full rounded-full bg-muted">
          <div className="h-full w-[65%] rounded-full bg-primary" />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Gauge className="size-3" />
          <span>{t.scrolled}</span>
        </div>
      </div>
    ),
    "scroll-container": (
      <div className="h-20 w-full max-w-[180px] overflow-hidden rounded-lg border bg-muted/30">
        <div className="flex h-full">
          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            <div className="h-3 w-full rounded bg-primary/20" />
            <div className="h-3 w-3/4 rounded bg-primary/20" />
            <div className="h-3 w-full rounded bg-primary/20" />
            <div className="h-3 w-2/3 rounded bg-primary/20" />
            <div className="h-3 w-full rounded bg-primary/20" />
          </div>
          <div className="w-1.5 bg-muted">
            <div className="h-8 w-full rounded-full bg-primary/40" />
          </div>
        </div>
      </div>
    ),
    "stacking-cards": (
      <div className="relative h-20 w-full max-w-[160px]">
        <div className="absolute top-0 left-1/2 h-14 w-28 -translate-x-1/2 rounded-lg border bg-card shadow-sm" />
        <div className="absolute top-2 left-1/2 h-14 w-32 -translate-x-1/2 rounded-lg border bg-card shadow-md" />
        <div className="absolute top-4 left-1/2 h-14 w-36 -translate-x-1/2 rounded-lg border bg-card shadow-lg">
          <Layers className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    ),
    slider: (
      <div className="w-full max-w-[180px] space-y-3">
        <div className="relative h-2 w-full rounded-full bg-muted">
          <div className="absolute h-full w-[60%] rounded-full bg-primary" />
          <div className="absolute top-1/2 left-[60%] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow" />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>0</span>
          <span>60</span>
          <span>100</span>
        </div>
      </div>
    ),
  }
}

// Get components from single source of truth
const availableComponents = getAvailableComponents()
const comingSoonComponents = getComingSoonComponents()

type Props = { params: Promise<{ locale: string }> }

const en = {
  metaTitle: "Components",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS. Copy and paste into your apps. Open source.",
  new: "New",
  draft: "Draft",
  preview: "Preview",
  comingSoon: "Coming Soon",
  previewSoon: "Preview coming soon",
  inDevelopment: "Component in development",
  cardTitle: "Card Title",
  cardContent: "Card content here",
  acceptTerms: "Accept terms",
  enterText: "Enter text...",
  alps: "Swiss Alps",
  clickExpand: "Click to expand",
  starHelp: "Help us reach",
  starCount: "1,000",
  sale: "SALE 50% OFF",
  success: "Success",
  saved: "Changes saved",
  heading: "Heading",
  top: "Top",
  scrolled: "65% scrolled",
  groupsLabel: "Component groups",
}

type Content = Dict<typeof en>

const content: Content = {
  en,
  ru: {
    metaTitle: "Компоненты",
    description:
      "Красиво оформленные компоненты на Radix UI и Tailwind CSS. Копируйте в свои приложения. Открытый код.",
    new: "Новое",
    draft: "Черновик",
    preview: "Превью",
    comingSoon: "Скоро",
    previewSoon: "Превью скоро появится",
    inDevelopment: "Компонент в разработке",
    cardTitle: "Заголовок карточки",
    cardContent: "Содержимое карточки",
    acceptTerms: "Принимаю условия",
    enterText: "Введите текст...",
    alps: "Швейцарские Альпы",
    clickExpand: "Нажмите, чтобы раскрыть",
    starHelp: "Поможем набрать",
    starCount: "1 000",
    sale: "СКИДКА 50%",
    success: "Успешно",
    saved: "Изменения сохранены",
    heading: "Заголовок",
    top: "Наверх",
    scrolled: "65% прокручено",
    groupsLabel: "Группы компонентов",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.metaTitle, description: t.description }
}

export default async function ComponentsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const componentPreviews = getComponentPreviews(t)

  // Merge navigation data with previews: generated map first, inline map second
  const components = availableComponents.map((item) => {
    const Preview = CARD_PREVIEWS[item.slug]
    return {
      ...item,
      name: navTitle(item, locale),
      preview: Preview ? <Preview /> : componentPreviews[item.slug] || null,
    }
  })

  const groups = groupNavItems(components, COMPONENT_GROUPS)

  const toc = [
    ...groups.map(({ group }) => ({
      id: groupAnchor(group.id),
      title: pick(group.title, locale),
      level: 2,
    })),
    ...(comingSoonComponents.length > 0
      ? [{ id: "coming-soon", title: t.comingSoon, level: 2 }]
      : []),
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-10 overflow-x-hidden">
        {/* Header */}
        <div className="space-y-4">
          <DocsPageNav title={t.metaTitle} />
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

        {/* Components Grid by Group */}
        {groups.map(({ group, items: groupComponents }) => (
          <div key={group.id} className="space-y-6">
            <h2
              id={groupAnchor(group.id)}
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {pick(group.title, locale)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupComponents.map((component) => (
                <Link
                  key={component.slug}
                  href={`/docs/components/${component.slug}`}
                  className="group min-w-0 cursor-pointer"
                >
                  <div
                    className={cn(
                      "relative flex flex-col overflow-hidden rounded-xl border bg-background h-full",
                      "transition-all duration-200",
                      "hover:border-foreground/20 hover:shadow-md",
                    )}
                  >
                    <span className="absolute left-2 top-2 z-10">
                      <ReviewStatusDot status={component.reviewStatus} />
                    </span>
                    {/* Draft Badge */}
                    {component.isDraft && (
                      <Badge
                        variant="draft"
                        className="absolute top-2 right-2 z-10"
                      >
                        {t.draft}
                      </Badge>
                    )}

                    {/* Preview Area */}
                    <div className="@container flex h-[140px] items-center justify-center overflow-hidden border-b bg-muted/30 p-4 max-w-full">
                      {component.preview || (
                        <span className="text-sm text-muted-foreground">
                          {t.preview}
                        </span>
                      )}
                    </div>

                    {/* Info Area */}
                    <div className="flex flex-col gap-1 p-4 min-h-[88px]">
                      <div className="flex items-center justify-between">
                        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="font-semibold">{component.name}</h3>
                          {/* The badge sits by the title: over the preview it covered the content */}
                          {component.isNew && !component.isDraft && (
                            <Badge variant="beta" className="shrink-0">
                              {t.new}
                            </Badge>
                          )}
                        </div>
                        <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {component.description &&
                          pick(component.description, locale)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Coming Soon Section */}
        {comingSoonComponents.length > 0 && (
          <div className="space-y-6">
            <h2
              id="coming-soon"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.comingSoon}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoonComponents.map((component) => (
                <div
                  key={component.slug}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-xl border bg-background opacity-60 min-w-0",
                  )}
                >
                  <div className="flex h-[140px] items-center justify-center border-b bg-muted/30 p-4">
                    <span className="text-sm text-muted-foreground">
                      {t.previewSoon}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 min-h-[88px]">
                    <h3 className="font-semibold">
                      {navTitle(component, locale)}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {component.description
                        ? pick(component.description, locale)
                        : t.inDevelopment}
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
