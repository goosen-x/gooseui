import type { LucideIcon } from "lucide-react"
import { useLocale } from "next-intl"
import { type Dict, type Localized, pick } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"

const content: Dict<{ soon: string }> = {
  en: { soon: "Soon" },
  ru: { soon: "Скоро" },
}

interface CategoryCardProps {
  category: {
    id: string
    name: Localized
    description: Localized
    icon: LucideIcon
    count?: number
    isComingSoon?: boolean
  }
  showDevBadge?: boolean
  className?: string
}

export function CategoryCard({
  category,
  showDevBadge,
  className,
}: CategoryCardProps) {
  const locale = useLocale()
  const t = content[locale as Locale]
  const Icon = category.icon
  const href = `/docs/blocks/${category.id}`
  const isDisabled = category.isComingSoon && !showDevBadge

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-md cursor-pointer",
        isDisabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
        <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold tracking-tight">
            {pick(category.name, locale)}
          </p>
          {category.count !== undefined && category.count > 0 && (
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pick(category.description, locale)}
        </p>
      </div>

      {/* Dev badge */}
      {showDevBadge && (
        <Badge
          variant="outline"
          className="absolute right-3 top-3 text-xs border-amber-500/50 text-amber-600"
        >
          DEV
        </Badge>
      )}

      {/* Coming soon badge */}
      {category.isComingSoon && !showDevBadge && (
        <Badge
          variant="secondary"
          className="absolute right-3 top-3 text-xs bg-muted text-muted-foreground"
        >
          {t.soon}
        </Badge>
      )}
    </Link>
  )
}
