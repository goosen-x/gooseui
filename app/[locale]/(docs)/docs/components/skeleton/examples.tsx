import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Card } from "@/registry/gooseui/ui/card"
import {
  Skeleton,
  SkeletonGroup,
  SkeletonText,
  type SkeletonVariant,
} from "@/registry/gooseui/ui/skeleton"

const en = {
  loadingProfile: "Loading profile…",
  loadingComments: "Loading comments…",
  loadingArticle: "Loading article…",
  loadingTable: "Loading table…",
  name: "Name",
  status: "Status",
  role: "Role",
  amount: "Amount",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    loadingProfile: "Загрузка профиля…",
    loadingComments: "Загрузка комментариев…",
    loadingArticle: "Загрузка статьи…",
    loadingTable: "Загрузка таблицы…",
    name: "Имя",
    status: "Статус",
    role: "Роль",
    amount: "Сумма",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

const VARIANTS: SkeletonVariant[] = ["pulse", "shimmer", "wave"]

/** Profile card: avatar, name and two lines, once per variant. */
export function ProfileCompare() {
  const t = useT()
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">{variant}</p>
          <Card className="gap-0 p-5">
            <SkeletonGroup
              variant={variant}
              label={t.loadingProfile}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton shape="circle" className="size-12" />
                <div className="flex-1 space-y-2">
                  <Skeleton shape="text" className="w-2/5" />
                  <Skeleton shape="text" className="h-3 w-3/5" />
                </div>
              </div>
              <SkeletonText lines={2} lineClassName="h-3" />
            </SkeletonGroup>
          </Card>
        </div>
      ))}
    </div>
  )
}

const COMMENT_LINES = [2, 1, 3, 2]

/** A comment feed inside one group: the shimmer crosses every row in one wave. */
export function CommentsList() {
  const t = useT()
  return (
    <SkeletonGroup
      label={t.loadingComments}
      className="w-full max-w-2xl space-y-6"
    >
      {COMMENT_LINES.map((lines, index) => (
        <div key={index} className="flex items-start gap-4">
          <Skeleton shape="circle" />
          <div className="flex-1 space-y-3">
            <Skeleton shape="text" className="h-3.5 w-28" />
            <SkeletonText lines={lines} lineClassName="h-3" />
          </div>
        </div>
      ))}
    </SkeletonGroup>
  )
}

/** Article card with a 16:9 cover. */
export function ArticleCard() {
  const t = useT()
  return (
    <Card className="w-full max-w-sm gap-0 p-4">
      <SkeletonGroup label={t.loadingArticle} className="space-y-4">
        <Skeleton className="aspect-video w-full rounded-lg" />
        <div className="space-y-3">
          <Skeleton shape="text" className="h-5 w-16 rounded-full" />
          <Skeleton shape="text" className="h-5 w-4/5" />
          <SkeletonText lines={2} lineClassName="h-3" />
        </div>
        <div className="flex items-center gap-3 pt-1">
          <Skeleton shape="circle" className="size-8" />
          <div className="flex-1 space-y-1.5">
            <Skeleton shape="text" className="h-3 w-24" />
            <Skeleton shape="text" className="h-3 w-16" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      </SkeletonGroup>
    </Card>
  )
}

const ROWS = [
  { name: "w-24", role: "w-20", amount: "w-12", status: "w-16" },
  { name: "w-28", role: "w-16", amount: "w-14", status: "w-14" },
  { name: "w-20", role: "w-24", amount: "w-10", status: "w-16" },
  { name: "w-32", role: "w-20", amount: "w-14", status: "w-12" },
  { name: "w-24", role: "w-14", amount: "w-12", status: "w-16" },
]

/** A 4x5 table: wave lights the rows up one after another. */
export function DataTable() {
  const t = useT()
  return (
    <SkeletonGroup
      variant="wave"
      label={t.loadingTable}
      className="w-full max-w-2xl overflow-hidden rounded-lg border bg-card"
    >
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
          <tr>
            <th className="h-10 px-4 font-medium">{t.name}</th>
            <th className="h-10 px-4 font-medium">{t.status}</th>
            <th className="h-10 px-4 font-medium">{t.role}</th>
            <th className="h-10 px-4 text-right font-medium">{t.amount}</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, index) => (
            <tr key={index} className="border-t">
              <td className="h-14 px-4">
                <div className="flex items-center gap-3">
                  <Skeleton shape="circle" className="size-8" />
                  <Skeleton shape="text" className={`h-3.5 ${row.name}`} />
                </div>
              </td>
              <td className="px-4">
                <Skeleton
                  shape="text"
                  className={`h-5 rounded-full ${row.status}`}
                />
              </td>
              <td className="px-4">
                <Skeleton shape="text" className={`h-3.5 ${row.role}`} />
              </td>
              <td className="px-4">
                <Skeleton
                  shape="text"
                  className={`ml-auto h-3.5 ${row.amount}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SkeletonGroup>
  )
}
