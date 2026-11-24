import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  GanttCollapsedDemo,
  GanttDatesDemo,
  GanttPreviewDemo,
} from "./gantt-chart-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "Gantt chart for a day with plan and fact, rendered on the server",
  intro:
    'A Gantt chart for one day or any span of hours. Each row shows the planned interval and the actual one as two bars of different weight. The server computes every bar, groups collapse on native <details>, and chosen intervals such as off hours get hatched. The only client part is the live "now" line. On narrow screens the scale scrolls sideways while the name column stays put.',
  browserSupport: "Browser Support",
  supportDescription0: "Expands and collapses task groups.",
  supportDescription1: "Mixes the group label background.",
  browserSupportText:
    'Groups are plain <details> and the name column uses position: sticky, both work everywhere. The opaque background of group names is mixed with color-mix(). Without JavaScript everything works except the live "now" line; a pinned now is drawn on the server.',
  preview: "Preview",
  previewHint:
    'Click a group header to collapse it, this works without JavaScript. The "now" line follows your local clock and appears after the page loads.',
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  datesTitle: "Range with Date objects",
  datesText:
    "When start is a Date, Date values in items are measured from it. timeZone and locale control the labels, and a fixed now pins the line without any client code. Set timeZone: the chart is computed on the server, and without it Dates are read in the server zone.",
  collapsedTitle: "Fact only, collapsed group",
  collapsedText:
    "Rows may have only planned or only actual. defaultCollapsed renders groups closed, and now={null} hides the line and drops the client part.",
  features: "Features",
  featureList: [
    [
      "Minutes or Dates",
      "numbers are minutes from the range start, Dates are measured from a Date start",
    ],
    [
      "Plan and fact",
      "a light dashed bar for the plan and a solid thin bar for the fact",
    ],
    [
      "Groups on <details>",
      "headers collapse rows without JavaScript and show the overall span",
    ],
    [
      "Now line",
      'the only client part: with now="auto" it follows the clock after mount',
    ],
    ["Sticky names", "the name column stays in place while the scale scrolls"],
    ["Screen readers", "every row has hidden text with its intervals"],
  ],
  p: {
    items: "Rows: id, label, group, planned and actual intervals, status",
    start: "Range start: minutes or a Date",
    end: "Range end: minutes or a Date",
    groups: "Group titles and order",
    defaultCollapsed: "Group ids rendered closed",
    tickStep: "Tick step in minutes",
    now: '"auto" follows the clock, a time pins the line, null hides it',
    shaded: "Hatched intervals",
    locale: "Locale for time labels with a Date range",
    timeZone:
      "IANA time zone for reading Dates and labels. Without it the server zone is used",
    rowHeight: "Row height in px",
    labelWidth: "Width of the name column in px",
    minTimelineWidth:
      "Scale width at which horizontal scroll starts, px. Tick labels are thinned for it",
    showLegend: "Show the legend",
    labels: "Column, legend and status texts",
    className: "Additional CSS classes",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Диаграмма Ганта на день с планом и фактом, собранная на сервере",
    intro:
      "Диаграмма Ганта на один день или любой отрезок часов. В каждой строке плановый и фактический интервал: два бара разной плотности. Все бары считает сервер, группы сворачиваются на нативном <details>, а заданные интервалы, например нерабочие часы, заштрихованы. На клиенте работает только живая линия «сейчас». На узком экране шкала прокручивается вбок, а колонка названий остаётся на месте.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Разворачивает и сворачивает группы задач.",
    supportDescription1: "Смешивает цвет фона заголовков групп.",
    browserSupportText:
      "Группы сделаны на обычном <details>, колонка названий на position: sticky, это работает везде. Непрозрачный фон названий групп смешивается через color-mix(). Без JavaScript работает всё, кроме живой линии «сейчас»; закреплённое время сервер рисует сам.",
    preview: "Превью",
    previewHint:
      "Нажмите на заголовок группы, чтобы свернуть её: это работает и без JavaScript. Линия «сейчас» идёт по вашим часам и появляется после загрузки страницы.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    datesTitle: "Отрезок в объектах Date",
    datesText:
      "Если start задан как Date, значения Date в items отсчитываются от него. timeZone и locale управляют подписями, а фиксированный now закрепляет линию без клиентского кода. Задайте timeZone: диаграмма считается на сервере, и без него Date читаются в поясе сервера.",
    collapsedTitle: "Только факт и свёрнутая группа",
    collapsedText:
      "У строки может быть только план или только факт. defaultCollapsed отдаёт группы свёрнутыми, а now={null} прячет линию и убирает клиентскую часть.",
    features: "Возможности",
    featureList: [
      [
        "Минуты или Date",
        "числа это минуты от начала отрезка, Date отсчитывается от start типа Date",
      ],
      [
        "План и факт",
        "светлый пунктирный бар для плана и тонкий сплошной для факта",
      ],
      [
        "Группы на <details>",
        "заголовки сворачивают строки без JavaScript и показывают общий интервал",
      ],
      [
        "Линия «сейчас»",
        'единственная клиентская часть: при now="auto" идёт по часам после монтирования',
      ],
      [
        "Закреплённые названия",
        "колонка названий стоит на месте, пока шкала прокручивается",
      ],
      ["Скринридеры", "в каждой строке скрытый текст с интервалами"],
    ],
    p: {
      items:
        "Строки: id, label, group, плановый и фактический интервал, статус",
      start: "Начало отрезка: минуты или Date",
      end: "Конец отрезка: минуты или Date",
      groups: "Названия и порядок групп",
      defaultCollapsed: "id групп, которые приходят свёрнутыми",
      tickStep: "Шаг делений в минутах",
      now: '"auto" идёт по часам, конкретное время закрепляет линию, null прячет её',
      shaded: "Заштрихованные интервалы",
      locale: "Локаль подписей времени для отрезка в Date",
      timeZone:
        "Часовой пояс IANA для чтения Date и подписей. Без него берётся пояс сервера",
      rowHeight: "Высота строки, px",
      labelWidth: "Ширина колонки названий, px",
      minTimelineWidth:
        "Ширина шкалы, после которой включается прокрутка, px. Под неё прореживаются подписи",
      showLegend: "Показывать легенду",
      labels: "Тексты колонки, легенды и статусов",
      className: "Дополнительные CSS-классы",
    },
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Gantt Chart", description: t.description }
}

export default async function GanttChartPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Gantt Chart" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "details",
              description: t.supportDescription0,
            },
            {
              featureId: "color-mix",
              description: t.supportDescription1,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <GanttPreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/gantt-chart" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { GanttChart } from "@/components/ui/gantt-chart"

const h = (hours: number, minutes = 0) => hours * 60 + minutes

export default function Example() {
  return (
    <GanttChart
      shaded={[[0, h(7)], [h(23), h(24)]]}
      items={[
        { id: "backup", label: "Database backup", group: "Night", planned: [h(2), h(3)], actual: [h(2, 5), h(3, 20)], status: "done" },
        { id: "reports", label: "Daily reports", group: "Day", planned: [h(8), h(9)], actual: [h(8, 40), h(10, 10)], status: "delayed" },
        { id: "digest", label: "Email digest", planned: [h(18), h(18, 30)], status: "planned" },
      ]}
    />
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.datesTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.datesText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <GanttDatesDemo />
              </div>
              <CodeBlock className="mt-4">{`const at = (hh: number, mm = 0) => new Date(Date.UTC(2026, 10, 23, hh, mm))

<GanttChart
  start={at(8)}
  end={at(20)}
  timeZone="UTC"
  tickStep={120}
  now={at(13, 15)}
  shaded={[[at(12), at(13)]]}
  labels={{ name: "Station", shaded: "Break" }}
  items={[
    { id: "a", label: "Assembly", planned: [at(8), at(12)], actual: [at(8, 10), at(11, 50)] },
    { id: "b", label: "Painting", planned: [at(10), at(15)], actual: [at(10, 30), at(13, 15)] },
    { id: "c", label: "Packing", planned: [at(14), at(19)] },
  ]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.collapsedTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.collapsedText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <GanttCollapsedDemo />
              </div>
              <CodeBlock className="mt-4">{`<GanttChart
  now={null}
  tickStep={180}
  defaultCollapsed={["night"]}
  showLegend={false}
  groups={[
    { id: "night", label: "Night jobs" },
    { id: "day", label: "Daytime" },
  ]}
  items={[
    { id: "backup", label: "Database backup", group: "night", actual: [120, 195] },
    { id: "reports", label: "Daily reports", group: "day", actual: [510, 600] },
  ]}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            { name: "items", type: "GanttItem[]", description: t.p.items },
            {
              name: "start",
              type: "number | Date",
              default: "0",
              description: t.p.start,
            },
            {
              name: "end",
              type: "number | Date",
              default: "1440",
              description: t.p.end,
            },
            {
              name: "groups",
              type: "{ id: string; label: string }[]",
              description: t.p.groups,
            },
            {
              name: "defaultCollapsed",
              type: "string[]",
              description: t.p.defaultCollapsed,
            },
            {
              name: "tickStep",
              type: "number",
              default: "60",
              description: t.p.tickStep,
            },
            {
              name: "now",
              type: '"auto" | number | Date | null',
              default: '"auto"',
              description: t.p.now,
            },
            {
              name: "shaded",
              type: "[number | Date, number | Date][]",
              description: t.p.shaded,
            },
            {
              name: "locale",
              type: "string",
              default: '"en-US"',
              description: t.p.locale,
            },
            { name: "timeZone", type: "string", description: t.p.timeZone },
            {
              name: "rowHeight",
              type: "number",
              default: "36",
              description: t.p.rowHeight,
            },
            {
              name: "labelWidth",
              type: "number",
              default: "200",
              description: t.p.labelWidth,
            },
            {
              name: "minTimelineWidth",
              type: "number",
              default: "640",
              description: t.p.minTimelineWidth,
            },
            {
              name: "showLegend",
              type: "boolean",
              default: "true",
              description: t.p.showLegend,
            },
            {
              name: "labels",
              type: "{ name?; planned?; actual?; now?; shaded?; status? }",
              description: t.p.labels,
            },
            { name: "className", type: "string", description: t.p.className },
          ]}
        />

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong>: {text}
              </li>
            ))}
          </ul>
          <CodeBlock>{`type GanttItem = {
  id: string
  label: string
  group?: string
  planned?: [number | Date, number | Date]
  actual?: [number | Date, number | Date]
  status?: "planned" | "running" | "done" | "delayed" | "failed"
}`}</CodeBlock>
        </div>
      </div>
    </DocsPage>
  )
}
