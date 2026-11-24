import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import {
  RelativeTimeDemo,
  RelativeTimeLocalesDemo,
  RelativeTimeShortDemo,
  RelativeTimeStaleDemo,
} from "./relative-time-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "“5 minutes ago” that updates itself and flags stale data",
  intro:
    "Shows a date as “5 minutes ago” and keeps it current. The text comes from Intl.RelativeTimeFormat, so any locale works without translation files. Hover to see the exact time.",
  preview: "Preview",
  installation: "Installation",
  installNote: "The component refreshes itself with the",
  installNoteHook: "useNow",
  installNoteEnd: "hook, which is installed along with it.",
  usage: "Usage",
  examples: "Examples",
  localesTitle: "Locales",
  localesText:
    "Pass any BCP 47 locale. The browser already knows how to say “3 days ago” in it.",
  staleTitle: "Stale data",
  staleText:
    "With staleAfter the value gets the staleClassName and a data-stale attribute once it is older than the threshold.",
  styleTitle: "Short format",
  styleText: "formatStyle shortens units for tight spaces like tables.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDate: "The moment to describe",
  propLocale: "Locale for Intl.RelativeTimeFormat and the tooltip",
  propStaleAfter: "Age in ms after which the value is marked stale",
  propUpdateInterval: "How often the text refreshes, in ms",
  propNumeric: "“auto” gives “yesterday”, “always” gives “1 day ago”",
  propFormatStyle: "Length of the unit names",
  propTitleFormat: "Intl.DateTimeFormat options for the tooltip",
  propStaleClassName: "Classes added when the value is stale",
  propClassName: "Additional CSS classes",
  features: "Features",
  f1: "Semantic markup",
  f1Text:
    "Renders <time dateTime> with the ISO date, and the absolute time in title.",
  f2: "No hydration mismatch",
  f2Text:
    "Before hydration it shows the date in UTC, then switches to the relative text.",
  f3: "One timer",
  f3Text: "A hundred labels on a page share one interval through useNow.",
  f4: "Future dates",
  f4Text: "Dates ahead read as “in 2 days”.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "«5 минут назад», которое обновляется само и видит устаревшие данные",
    intro:
      "Показывает дату в виде «5 минут назад» и держит её актуальной. Текст строит Intl.RelativeTimeFormat, так что подходит любой язык без файлов перевода. Точное время видно при наведении.",
    preview: "Превью",
    installation: "Установка",
    installNote: "Компонент обновляется сам через хук",
    installNoteHook: "useNow",
    installNoteEnd: ", он ставится вместе с ним.",
    usage: "Использование",
    examples: "Примеры",
    localesTitle: "Языки",
    localesText:
      "Передайте любую локаль BCP 47. Браузер уже знает, как на ней сказать «3 дня назад».",
    staleTitle: "Устаревшие данные",
    staleText:
      "Со staleAfter значение получает staleClassName и атрибут data-stale, как только становится старше порога.",
    styleTitle: "Короткий формат",
    styleText: "formatStyle сокращает единицы для тесных мест вроде таблиц.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDate: "Момент, который нужно описать",
    propLocale: "Локаль для Intl.RelativeTimeFormat и подсказки",
    propStaleAfter:
      "Возраст в мс, после которого значение считается устаревшим",
    propUpdateInterval: "Как часто обновлять текст, в мс",
    propNumeric: "«auto» даёт «вчера», «always» даёт «1 день назад»",
    propFormatStyle: "Длина названий единиц",
    propTitleFormat: "Опции Intl.DateTimeFormat для подсказки",
    propStaleClassName: "Классы, которые добавляются к устаревшему значению",
    propClassName: "Дополнительные CSS-классы",
    features: "Возможности",
    f1: "Семантичная разметка",
    f1Text:
      "Рендерит <time dateTime> с датой в ISO, а точное время кладёт в title.",
    f2: "Без ошибок гидрации",
    f2Text:
      "До гидрации показывает дату в UTC, потом переключается на относительный текст.",
    f3: "Один таймер",
    f3Text:
      "Сотня подписей на странице обновляется от одного интервала через useNow.",
    f4: "Будущие даты",
    f4Text: "Даты впереди читаются как «через 2 дня».",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Relative Time", description: t.description }
}

export default async function RelativeTimePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const rows: [string, string, string, string][] = [
    ["date", "Date | string | number", "-", t.propDate],
    ["locale", "string", '"en"', t.propLocale],
    ["staleAfter", "number", "-", t.propStaleAfter],
    ["updateInterval", "number", "15000", t.propUpdateInterval],
    ["numeric", '"auto" | "always"', '"auto"', t.propNumeric],
    ["formatStyle", '"long" | "short" | "narrow"', '"long"', t.propFormatStyle],
    [
      "titleFormat",
      "Intl.DateTimeFormatOptions",
      '{ dateStyle: "medium", timeStyle: "short" }',
      t.propTitleFormat,
    ],
    ["staleClassName", "string", '"text-destructive"', t.propStaleClassName],
    ["className", "string", "-", t.propClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Relative Time" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg px-4">
            <RelativeTimeDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/relative-time" />
          <p className="text-sm text-muted-foreground">
            {t.installNote}{" "}
            <Link
              href="/docs/hooks/use-now"
              className="underline underline-offset-4"
            >
              {t.installNoteHook}
            </Link>
            {t.installNoteEnd.startsWith(",") ? "" : " "}
            {t.installNoteEnd}
          </p>
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { RelativeTime } from "@/components/ui/relative-time"

export function LastUpdated({ at }: { at: string }) {
  return (
    <p className="text-sm text-muted-foreground">
      Updated <RelativeTime date={at} />
    </p>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.localesTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.localesText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RelativeTimeLocalesDemo />
              </div>
              <CodeBlock className="mt-4">{`<RelativeTime date={date} locale="de" />  // vor 3 Tagen
<RelativeTime date={date} locale="ja" />  // 3 日前`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.staleTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.staleText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RelativeTimeStaleDemo />
              </div>
              <CodeBlock className="mt-4">{`<RelativeTime
  date={syncedAt}
  staleAfter={60_000}
  updateInterval={5000}
  staleClassName="text-destructive font-semibold"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.styleTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.styleText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RelativeTimeShortDemo />
              </div>
              <CodeBlock className="mt-4">{`<RelativeTime date={date} formatStyle="short" />  // 2 hr. ago
<RelativeTime date={date} formatStyle="narrow" /> // 2h ago`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.headers.prop}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([prop, type, def, description]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {[
              [t.f1, t.f1Text],
              [t.f2, t.f2Text],
              [t.f3, t.f3Text],
              [t.f4, t.f4Text],
            ].map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}.</strong> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
