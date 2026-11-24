import { ArrowUp, Bell, Check, Star, TriangleAlert } from "lucide-react"
import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Badge, BadgeCount } from "@/registry/gooseui/ui/badge"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/gooseui/ui/card"
import { TagFilters } from "./badge-demo"

const en = {
  description:
    "Badge shows a short label or status next to other content. It is a server component and works without JavaScript. It has soft state variants, icons, a status dot, three sizes, a link form, a removable tag and a round counter.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  states: "States",
  statesText: "Soft background, same-hue text and a thin border.",
  icons: "With an icon",
  iconsText:
    "An svg child gets the right size and spacing. Put it on either side.",
  dot: "Status dot",
  dotText:
    "The dot takes the text color. pulse adds a ring that stops under reduced motion.",
  sizes: "Sizes",
  link: "Link badge",
  linkText:
    "asChild gives the badge styles to a link or a button and adds hover and focus.",
  tags: "Removable tags",
  tagsText:
    "BadgeRemove is a plain button. Handle removal in your own client component.",
  counter: "Counter",
  counterText:
    "BadgeCount is a round counter. Position it over an icon or a button.",
  inTable: "Status in a card and a table",
  live: "Live",
  online: "Online",
  published: "Published",
  failed: "Failed",
  pending: "Pending",
  info: "Info",
  neutral: "Neutral",
  paid: "Paid",
  waiting: "Pending",
  cancelled: "Cancelled",
  order: "Order",
  status: "Status",
  invoices: "Invoices",
  invoicesText: "Payment status for the last orders",
  notifications: "Notifications",
  readDocs: "Read the docs",
  variantProp:
    "Visual style: default, secondary, outline, destructive, success, warning, info, neutral, beta, draft, experimental.",
  sizeProp: "Size of the badge.",
  dotProp: "Status dot before the text. pulse adds a pulsing ring.",
  asChildProp:
    "Render the only child (a, button) with badge styles. The dot is not added in this mode.",
  removeProp: "Accessible label of the cross button.",
  countProp: "Number to show. Above max it renders as max+.",
  maxProp: "Upper limit before the plus sign.",
  extraProp: "Extra CSS classes.",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Badge показывает короткую метку или статус рядом с содержимым. Это серверный компонент, он работает без JavaScript. Есть мягкие варианты состояний, иконки, точка статуса, три размера, форма ссылки, удаляемый тег и круглый счётчик.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    states: "Состояния",
    statesText: "Мягкий фон, текст того же оттенка и тонкая рамка.",
    icons: "С иконкой",
    iconsText:
      "Дочерний svg получает нужный размер и отступ. Можно ставить с любой стороны.",
    dot: "Точка статуса",
    dotText:
      "Точка берёт цвет текста. pulse добавляет кольцо, при reduced motion оно не анимируется.",
    sizes: "Размеры",
    link: "Бейдж-ссылка",
    linkText:
      "asChild переносит стили бейджа на ссылку или кнопку и добавляет hover и фокус.",
    tags: "Удаляемые теги",
    tagsText:
      "BadgeRemove это обычная кнопка. Удаление обработайте в своём клиентском компоненте.",
    counter: "Счётчик",
    counterText:
      "BadgeCount это круглый счётчик. Расположите его поверх иконки или кнопки.",
    inTable: "Статус в карточке и таблице",
    live: "В эфире",
    online: "Онлайн",
    published: "Опубликовано",
    failed: "Ошибка",
    pending: "Ожидает",
    info: "Инфо",
    neutral: "Нейтральный",
    paid: "Оплачен",
    waiting: "Ожидает",
    cancelled: "Отменён",
    order: "Заказ",
    status: "Статус",
    invoices: "Счета",
    invoicesText: "Статус оплаты последних заказов",
    notifications: "Уведомления",
    readDocs: "Читать документацию",
    variantProp:
      "Стиль: default, secondary, outline, destructive, success, warning, info, neutral, beta, draft, experimental.",
    sizeProp: "Размер бейджа.",
    dotProp:
      "Точка статуса перед текстом. pulse добавляет пульсирующее кольцо.",
    asChildProp:
      "Отрисовать единственного потомка (a, button) со стилями бейджа. Точка в этом режиме не добавляется.",
    removeProp: "Доступная подпись кнопки с крестиком.",
    countProp: "Число для показа. Больше max выводится как max+.",
    maxProp: "Верхний предел перед плюсом.",
    extraProp: "Дополнительные CSS-классы.",
  },
}

type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return { title: "Badge", description: content[locale as Locale].description }
}

const box =
  "flex flex-wrap items-center justify-center gap-3 rounded-lg bg-muted/30 px-4 py-10"

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    ["preview", t.preview],
    ["installation", t.installation],
    ["usage", t.usage],
    ["examples", t.examples],
    ["props", t.props],
  ].map(([id, title]) => ({ id, title, level: 2 }))
  const states = [
    "default",
    "secondary",
    "outline",
    "destructive",
    "success",
    "warning",
    "info",
    "neutral",
  ] as const
  const rows = [
    ["#1042", t.paid, "success"],
    ["#1043", t.waiting, "warning"],
    ["#1044", t.cancelled, "destructive"],
  ] as const
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Badge" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <DocsSection id="preview" title={t.preview}>
          <div className={box}>
            <Badge variant="success">
              <Check />
              {t.published}
            </Badge>
            <Badge variant="info" dot="pulse">
              {t.live}
            </Badge>
            <Badge variant="warning">
              <TriangleAlert />
              {t.pending}
            </Badge>
            <Badge variant="secondary">New</Badge>
          </div>
        </DocsSection>
        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/badge" />
        </DocsSection>
        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { Badge } from "@/components/ui/badge"

<Badge variant="success">Published</Badge>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-10">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.states}</h3>
              <p className="text-sm text-muted-foreground">{t.statesText}</p>
              <div className={box}>
                {states.map((v) => (
                  <Badge key={v} variant={v}>
                    {v}
                  </Badge>
                ))}
              </div>
              <CodeBlock>{`<Badge variant="default">default</Badge>
<Badge variant="secondary">secondary</Badge>
<Badge variant="outline">outline</Badge>
<Badge variant="destructive">destructive</Badge>
<Badge variant="success">success</Badge>
<Badge variant="warning">warning</Badge>
<Badge variant="info">info</Badge>
<Badge variant="neutral">neutral</Badge>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.icons}</h3>
              <p className="text-sm text-muted-foreground">{t.iconsText}</p>
              <div className={box}>
                <Badge variant="success">
                  <Check />
                  {t.published}
                </Badge>
                <Badge variant="warning">
                  <TriangleAlert />
                  {t.pending}
                </Badge>
                <Badge variant="secondary">
                  <Star />
                  4.9
                </Badge>
                <Badge variant="success">
                  <ArrowUp />
                  +12%
                </Badge>
                <Badge variant="outline">
                  {t.readDocs}
                  <ArrowUp className="rotate-45" />
                </Badge>
              </div>
              <CodeBlock>{`import { ArrowUp, Check, Star, TriangleAlert } from "lucide-react"

<Badge variant="success"><Check />Published</Badge>
<Badge variant="warning"><TriangleAlert />Pending</Badge>
<Badge variant="secondary"><Star />4.9</Badge>
<Badge variant="success"><ArrowUp />+12%</Badge>
<Badge variant="outline">Read the docs<ArrowUp className="rotate-45" /></Badge>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.dot}</h3>
              <p className="text-sm text-muted-foreground">{t.dotText}</p>
              <div className={box}>
                <Badge variant="success" dot>
                  {t.online}
                </Badge>
                <Badge variant="destructive" dot="pulse">
                  {t.live}
                </Badge>
                <Badge variant="warning" dot>
                  {t.pending}
                </Badge>
                <Badge variant="neutral" dot>
                  {t.neutral}
                </Badge>
                <Badge variant="info" dot="pulse">
                  {t.info}
                </Badge>
              </div>
              <CodeBlock>{`<Badge variant="success" dot>Online</Badge>
<Badge variant="destructive" dot="pulse">Live</Badge>
<Badge variant="warning" dot>Pending</Badge>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.sizes}</h3>
              <div className={box}>
                <Badge size="sm" variant="info">
                  Small
                </Badge>
                <Badge variant="info">Default</Badge>
                <Badge size="lg" variant="info">
                  Large
                </Badge>
              </div>
              <CodeBlock>{`<Badge size="sm" variant="info">Small</Badge>
<Badge variant="info">Default</Badge>
<Badge size="lg" variant="info">Large</Badge>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.link}</h3>
              <p className="text-sm text-muted-foreground">{t.linkText}</p>
              <div className={box}>
                <Badge asChild variant="info">
                  <a href="#preview">{t.readDocs}</a>
                </Badge>
                <Badge asChild variant="outline">
                  <button type="button">
                    <Star />
                    Star
                  </button>
                </Badge>
              </div>
              <CodeBlock>{`<Badge asChild variant="info">
  <a href="/docs">Read the docs</a>
</Badge>

<Badge asChild variant="outline">
  <button type="button"><Star />Star</button>
</Badge>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.tags}</h3>
              <p className="text-sm text-muted-foreground">{t.tagsText}</p>
              <div className={box}>
                <TagFilters />
              </div>
              <CodeBlock>{`"use client"

import { useState } from "react"
import { Badge, BadgeRemove } from "@/components/ui/badge"

export function TagFilters() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"])
  return tags.map((tag) => (
    <Badge key={tag} variant="secondary" size="lg">
      {tag}
      <BadgeRemove
        aria-label={\`Remove \${tag}\`}
        onClick={() => setTags((p) => p.filter((x) => x !== tag))}
      />
    </Badge>
  ))
}`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.counter}</h3>
              <p className="text-sm text-muted-foreground">{t.counterText}</p>
              <div className={`${box} gap-8`}>
                <span className="relative inline-flex">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={t.notifications}
                  >
                    <Bell />
                  </Button>
                  <BadgeCount count={3} className="absolute -top-2 -right-2" />
                </span>
                <span className="relative inline-flex">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={t.notifications}
                  >
                    <Bell />
                  </Button>
                  <BadgeCount
                    count={128}
                    className="absolute -top-2 -right-2"
                  />
                </span>
                <Button variant="secondary">
                  {t.notifications}
                  <BadgeCount count={7} className="ring-0" />
                </Button>
              </div>
              <CodeBlock>{`import { Bell } from "lucide-react"
import { BadgeCount } from "@/components/ui/badge"

<span className="relative inline-flex">
  <Button variant="outline" size="icon" aria-label="Notifications">
    <Bell />
  </Button>
  <BadgeCount count={128} className="absolute -top-2 -right-2" />
</span>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.inTable}</h3>
              <div className="rounded-lg bg-muted/30 px-4 py-10">
                <Card className="mx-auto max-w-sm">
                  <CardHeader>
                    <CardTitle>{t.invoices}</CardTitle>
                    <CardDescription>{t.invoicesText}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-muted-foreground">
                          <th className="pb-2 font-medium">{t.order}</th>
                          <th className="pb-2 font-medium">{t.status}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map(([id, label, variant]) => (
                          <tr key={id} className="border-b last:border-0">
                            <td className="py-2 tabular-nums">{id}</td>
                            <td className="py-2">
                              <Badge variant={variant} dot>
                                {label}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
              <CodeBlock>{`<Card>
  <CardHeader><CardTitle>Invoices</CardTitle></CardHeader>
  <CardContent>
    <table>
      <tr><td>#1042</td><td><Badge variant="success" dot>Paid</Badge></td></tr>
      <tr><td>#1043</td><td><Badge variant="warning" dot>Pending</Badge></td></tr>
      <tr><td>#1044</td><td><Badge variant="destructive" dot>Cancelled</Badge></td></tr>
    </table>
  </CardContent>
</Card>`}</CodeBlock>
            </div>
          </div>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "variant",
              type: "string",
              default: "default",
              description: t.variantProp,
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              default: "default",
              description: t.sizeProp,
            },
            {
              name: "dot",
              type: 'boolean | "pulse"',
              default: "false",
              description: t.dotProp,
            },
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: t.asChildProp,
            },
            { name: "className", type: "string", description: t.extraProp },
            {
              name: "BadgeRemove aria-label",
              type: "string",
              default: "Remove",
              description: t.removeProp,
            },
            {
              name: "BadgeCount count",
              type: "number",
              description: t.countProp,
            },
            {
              name: "BadgeCount max",
              type: "number",
              default: "99",
              description: t.maxProp,
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
