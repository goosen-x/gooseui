import { ArrowRightIcon } from "lucide-react"
import { setRequestLocale } from "next-intl/server"
import { DocsPage } from "@/components/docs/docs-page"
import { ReviewStatusDot } from "@/components/docs/review-status-dot"
import { type Dict, pick } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import {
  docsNavigation,
  filterDraftItems,
  navTitle,
} from "@/lib/config/docs-navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"

type Props = { params: Promise<{ locale: string }> }

const en = {
  metaTitle: "Hooks",
  description:
    "React hooks for common UI tasks. Install one with the CLI and use it in your components.",
  all: "All hooks",
  isNew: "NEW",
  draft: "Draft",
  empty: "Hooks will show up here soon.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    metaTitle: "Хуки",
    description:
      "React-хуки для частых задач интерфейса. Ставятся через CLI и сразу работают в ваших компонентах.",
    all: "Все хуки",
    isNew: "НОВОЕ",
    draft: "Черновик",
    empty: "Хуки скоро появятся здесь.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.metaTitle, description: t.description }
}

export default async function HooksPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const hooks = (
    filterDraftItems(docsNavigation).find((s) => s.slug === "hooks")?.items ??
    []
  ).filter((item) => !item.isComingSoon)

  const toc = hooks.length > 0 ? [{ id: "all", title: t.all, level: 2 }] : []

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
        </div>

        {hooks.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            {t.empty}
          </div>
        ) : (
          <div className="space-y-6">
            <h2
              id="all"
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
            >
              {t.all}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hooks.map((hook) => (
                <Link
                  key={hook.slug}
                  href={hook.href}
                  className="group min-w-0 cursor-pointer"
                >
                  <div
                    className={cn(
                      "flex h-full flex-col gap-1 rounded-xl border bg-background p-4",
                      "transition-all duration-200",
                      "hover:border-foreground/20 hover:shadow-md",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <h3 className="truncate font-mono text-sm font-semibold">
                          {navTitle(hook, locale)}
                        </h3>
                        <ReviewStatusDot status={hook.reviewStatus} />
                        {hook.isDraft && (
                          <Badge variant="draft">{t.draft}</Badge>
                        )}
                        {hook.isNew && !hook.isDraft && (
                          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-white">
                            {t.isNew}
                          </span>
                        )}
                      </div>
                      <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {hook.description && pick(hook.description, locale)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </DocsPage>
  )
}
