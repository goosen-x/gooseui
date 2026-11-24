import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { ActivityHeatmapMondayDemo } from "./activity-heatmap-click-demo"
import {
  ActivityHeatmapLevelsDemo,
  ActivityHeatmapPreviewDemo,
} from "./activity-heatmap-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "Yearly activity grid rendered on the server, tooltips in pure CSS",
  intro:
    "A grid of days for a chosen range: one column per week, five intensity levels, month and weekday labels from Intl. The server computes the whole grid, tooltips show on hover and focus through CSS. A small client part only moves focus with the arrow keys and calls onCellClick.",
  browserSupport: "Browser Support",
  supportDescription0: "Mixes colors for activity levels.",
  browserSupportText:
    "Nothing beyond plain CSS: the tooltip is a hidden element inside the cell that :hover and :focus-visible reveal. Levels mix colors through color-mix(). Without JavaScript the grid and tooltips still work, only the arrow keys do not.",
  preview: "Preview",
  previewHint:
    "Hover a day to see its value, or press Tab and move with the arrows: left and right jump a week, up and down a day.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  mondayTitle: "Week from Monday, custom range",
  mondayText:
    "weekStartsOn moves the first row, from and to cut the range, and onCellClick makes days clickable (Enter and Space work too). onCellClick is a function, so this example renders the heatmap from a client component.",
  levelsTitle: "Own levels",
  levelsText:
    "By default the levels are quarters of the largest value. getLevel sets fixed steps instead.",
  features: "Features",
  featureList: [
    [
      "Server rendering",
      "the grid and tooltips are HTML and CSS, the client part is under 1 kB",
    ],
    ["Intl labels", "months, weekdays and dates follow the locale prop"],
    [
      "Theme colors",
      "levels mix --primary into the background, so any theme works",
    ],
    [
      "Keyboard",
      "an ARIA grid with one tab stop; arrows, Home, End, PageUp and PageDown",
    ],
    [
      "UTC dates",
      "without to and data the range ends on the render date of the server",
    ],
  ],
  p: {
    data: "Days with values; repeated dates are summed",
    from: "First day. By default 364 days before to",
    to: "Last day. By default the latest date in data, otherwise the render date",
    weekStartsOn: "First day of the week, 0 is Sunday",
    locale: "Locale for months, weekdays and dates",
    getLevel: "Maps a value to a level 0–4",
    cellSize: "Cell size in px",
    gap: "Gap between cells in px",
    showWeekdays: "Show weekday labels",
    showMonths: "Show month labels",
    showLegend: "Show the legend",
    labels: "Legend texts, grid name and cell text",
    onCellClick:
      "Called on click, Enter or Space. Pass it from a client component",
    className: "Additional CSS classes",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Сетка активности за год, собранная на сервере, подсказки на чистом CSS",
    intro:
      "Сетка дней за выбранный период: столбец на неделю, пять уровней интенсивности, подписи месяцев и дней недели через Intl. Всю сетку считает сервер, подсказки появляются при наведении и фокусе средствами CSS. Маленькая клиентская часть только водит фокус стрелками и вызывает onCellClick.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Смешивает цвета для уровней активности.",
    browserSupportText:
      "Ничего сверх обычного CSS: подсказка лежит скрытой внутри клетки, её показывают :hover и :focus-visible. Уровни смешивают цвета через color-mix(). Без JavaScript сетка и подсказки работают, не работают только стрелки.",
    preview: "Превью",
    previewHint:
      "Наведите на день, чтобы увидеть значение, или нажмите Tab и двигайтесь стрелками: влево и вправо на неделю, вверх и вниз на день.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    mondayTitle: "Неделя с понедельника и свой период",
    mondayText:
      "weekStartsOn сдвигает первую строку, from и to задают период, а onCellClick делает дни кликабельными (Enter и пробел тоже работают). onCellClick это функция, поэтому в примере сетка рендерится из клиентского компонента.",
    levelsTitle: "Свои уровни",
    levelsText:
      "По умолчанию уровни делят наибольшее значение на четверти. getLevel задаёт фиксированные шаги.",
    features: "Возможности",
    featureList: [
      [
        "Рендер на сервере",
        "сетка и подсказки сделаны на HTML и CSS, клиентская часть меньше 1 кБ",
      ],
      ["Подписи через Intl", "месяцы, дни недели и даты следуют пропу locale"],
      [
        "Цвета темы",
        "уровни смешивают --primary с фоном и работают в любой теме",
      ],
      [
        "Клавиатура",
        "ARIA-сетка с одной остановкой Tab; стрелки, Home, End, PageUp и PageDown",
      ],
      [
        "Даты в UTC",
        "если нет ни to, ни данных, период заканчивается датой рендера на сервере",
      ],
    ],
    p: {
      data: "Дни со значениями; повторы одной даты складываются",
      from: "Первый день. По умолчанию за 364 дня до to",
      to: "Последний день. По умолчанию самая поздняя дата в data, иначе дата рендера",
      weekStartsOn: "Первый день недели, 0 это воскресенье",
      locale: "Локаль для месяцев, дней недели и дат",
      getLevel: "Переводит значение в уровень 0–4",
      cellSize: "Размер клетки, px",
      gap: "Зазор между клетками, px",
      showWeekdays: "Показывать дни недели",
      showMonths: "Показывать месяцы",
      showLegend: "Показывать легенду",
      labels: "Тексты легенды, имя сетки и текст клетки",
      onCellClick:
        "Вызывается по клику, Enter или пробелу. Передавайте из клиентского компонента",
      className: "Дополнительные CSS-классы",
    },
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Activity Heatmap", description: t.description }
}

export default async function ActivityHeatmapPage({ params }: Props) {
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
        <DocsPageNav title="Activity Heatmap" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "color-mix",
              description: t.supportDescription0,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <ActivityHeatmapPreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/activity-heatmap" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { ActivityHeatmap } from "@/components/ui/activity-heatmap"

const data = [
  { date: "2026-11-20", count: 4 },
  { date: "2026-11-21", count: 9 },
  { date: "2026-11-22", count: 1 },
]

export default function Example() {
  return <ActivityHeatmap data={data} to="2026-11-22" />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.mondayTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.mondayText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ActivityHeatmapMondayDemo />
              </div>
              <CodeBlock className="mt-4">{`<ActivityHeatmap
  data={workouts}
  from="2026-06-01"
  to="2026-08-31"
  weekStartsOn={1}
  cellSize={16}
  gap={4}
  locale="de-DE"
  labels={{
    cell: (count, date) => (count === 0 ? \`Rest day, \${date}\` : \`\${count} min, \${date}\`),
  }}
  onCellClick={(day) => console.log(day.date, day.count)}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.levelsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.levelsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ActivityHeatmapLevelsDemo />
              </div>
              <CodeBlock className="mt-4">{`<ActivityHeatmap
  data={data}
  from="2026-05-25"
  to="2026-11-22"
  showWeekdays={false}
  getLevel={(count) => (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4)}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            {
              name: "data",
              type: "{ date: string; count: number }[]",
              description: t.p.data,
            },
            { name: "from", type: "string", description: t.p.from },
            { name: "to", type: "string", description: t.p.to },
            {
              name: "weekStartsOn",
              type: "0 | 1 | 2 | 3 | 4 | 5 | 6",
              default: "0",
              description: t.p.weekStartsOn,
            },
            {
              name: "locale",
              type: "string",
              default: '"en-US"',
              description: t.p.locale,
            },
            {
              name: "getLevel",
              type: "(count: number, max: number) => 0 | 1 | 2 | 3 | 4",
              description: t.p.getLevel,
            },
            {
              name: "cellSize",
              type: "number",
              default: "12",
              description: t.p.cellSize,
            },
            { name: "gap", type: "number", default: "3", description: t.p.gap },
            {
              name: "showWeekdays",
              type: "boolean",
              default: "true",
              description: t.p.showWeekdays,
            },
            {
              name: "showMonths",
              type: "boolean",
              default: "true",
              description: t.p.showMonths,
            },
            {
              name: "showLegend",
              type: "boolean",
              default: "true",
              description: t.p.showLegend,
            },
            {
              name: "labels",
              type: "{ less?; more?; grid?; cell?: (count, date) => string }",
              description: t.p.labels,
            },
            {
              name: "onCellClick",
              type: "(day: { date: string; count: number }) => void",
              description: t.p.onCellClick,
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
        </div>
      </div>
    </DocsPage>
  )
}
