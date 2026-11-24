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
  RadarCircleDemo,
  RadarPreviewDemo,
  RadarSingleDemo,
} from "./radar-chart-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "SVG radar chart with series, legend and tooltips, no JavaScript",
  intro:
    "A radar chart without JavaScript: the server computes the SVG, tooltips and highlighting work through :hover, :focus-visible and :has(). Axis labels sit outside the plot and never get clipped, series grow from the center as the chart scrolls into view, and a hidden table repeats the data for screen readers.",
  browserSupport: "Browser Support",
  supportDescription0: "Dims the other series on interaction.",
  supportDescription1: "Draws the chart as it enters view.",
  browserSupportText:
    "Dimming the other series relies on :has(). The draw-in follows the scroll through animation-timeline: view(); where it is missing, series grow once on page load. Tooltips and values work everywhere.",
  preview: "Preview",
  previewHint:
    "Hover a point or move between points with Tab: the tooltip and highlighting work without JavaScript. Hover a legend item to highlight its series.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  circleTitle: "Circular grid",
  circleText:
    'grid="circle" draws rings instead of polygons. A series can take its own color, otherwise it gets --chart-1…5 in order.',
  singleTitle: "Single series",
  singleText:
    "Without max the scale follows the largest value. The legend can be turned off.",
  features: "Features",
  featureList: [
    ["No JavaScript", "a Server Component, nothing is sent to the browser"],
    ["No dependencies", "hand-written SVG, colors from --chart-1…5"],
    ["Labels outside the plot", "anchored by direction, long labels wrap"],
    [
      "Draw-in",
      "series grow from the center as the chart scrolls in, off with reduced motion",
    ],
    ["Keyboard", "every point is a Tab stop and shows its tooltip on focus"],
    ["Screen readers", "a visually hidden table holds every value"],
  ],
  p: {
    axes: "Axes in clockwise order starting from the top",
    series: "Series: name, values by axis key and an optional color",
    max: "Scale maximum. By default the largest value",
    levels: "Number of grid rings",
    grid: "Grid shape",
    showLegend: "Show the legend",
    formatValue: "Formats values in the tooltip and the table",
    title: "Accessible name and caption of the hidden table",
    axisHeader: "First column header of the hidden table",
    duration:
      "Draw-in duration in ms for browsers without scroll-driven animations",
    plotClassName:
      "Classes for the plot box; its padding is the room for labels",
    className: "Additional CSS classes",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Радар-диаграмма на SVG без JavaScript: серии, легенда, подсказки",
    intro:
      "Радар-диаграмма без JavaScript: SVG считается на сервере, подсказки и подсветка работают через :hover, :focus-visible и :has(). Подписи осей стоят снаружи и не обрезаются, серии вырастают из центра, пока диаграмма въезжает в экран, а скрытая таблица дублирует данные для скринридеров.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Приглушает остальные серии при взаимодействии.",
    supportDescription1: "Рисует диаграмму при появлении на экране.",
    browserSupportText:
      "Остальные серии гаснут благодаря :has(). Отрисовка идёт вслед за прокруткой через animation-timeline: view(); где его нет, серии один раз вырастают при загрузке. Подсказки и значения работают везде.",
    preview: "Превью",
    previewHint:
      "Наведите на точку или пройдите по точкам клавишей Tab: подсказка и подсветка работают без JavaScript. Наведите на пункт легенды, чтобы выделить серию.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    circleTitle: "Круглая сетка",
    circleText:
      'grid="circle" рисует кольца вместо многоугольников. Серии можно задать свой цвет, иначе она по порядку берёт --chart-1…5.',
    singleTitle: "Одна серия",
    singleText:
      "Без max шкала подстраивается под наибольшее значение. Легенду можно отключить.",
    features: "Возможности",
    featureList: [
      ["Без JavaScript", "серверный компонент, в браузер ничего не уходит"],
      ["Без зависимостей", "SVG вручную, цвета из --chart-1…5"],
      ["Подписи снаружи", "привязаны по направлению оси, длинные переносятся"],
      [
        "Отрисовка при появлении",
        "серии вырастают из центра вслед за прокруткой, при reduced motion сразу",
      ],
      [
        "Клавиатура",
        "каждая точка доступна по Tab и в фокусе показывает подсказку",
      ],
      ["Скринридеры", "все значения есть в скрытой таблице"],
    ],
    p: {
      axes: "Оси по часовой стрелке, начиная сверху",
      series: "Серии: название, значения по ключам осей и необязательный цвет",
      max: "Максимум шкалы. По умолчанию наибольшее значение",
      levels: "Сколько колец у сетки",
      grid: "Форма сетки",
      showLegend: "Показывать легенду",
      formatValue: "Форматирует значения в подсказке и таблице",
      title: "Доступное имя и подпись скрытой таблицы",
      axisHeader: "Заголовок первого столбца скрытой таблицы",
      duration:
        "Длительность отрисовки в мс там, где нет анимаций по прокрутке",
      plotClassName:
        "Классы блока с графиком; его отступы оставляют место под подписи",
      className: "Дополнительные CSS-классы",
    },
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Radar Chart", description: t.description }
}

export default async function RadarChartPage({ params }: Props) {
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
        <DocsPageNav title="Radar Chart" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.supportDescription0,
            },
            {
              featureId: "scroll-driven-animations",
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
            <RadarPreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/radar-chart" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { RadarChart } from "@/components/ui/radar-chart"

const axes = [
  { key: "layout", label: "Layout" },
  { key: "typography", label: "Typography" },
  { key: "accessibility", label: "Accessibility" },
  { key: "performance", label: "Performance" },
  { key: "testing", label: "Testing" },
]

export default function Example() {
  return (
    <RadarChart
      title="Skill profile"
      axes={axes}
      max={10}
      series={[
        { name: "Junior", values: { layout: 7, typography: 5, accessibility: 3, performance: 4, testing: 2 } },
        { name: "Senior", values: { layout: 9, typography: 8, accessibility: 8, performance: 9, testing: 7 } },
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
              <h3 className="text-lg font-medium mb-3">{t.circleTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.circleText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RadarCircleDemo />
              </div>
              <CodeBlock className="mt-4">{`<RadarChart
  grid="circle"
  levels={5}
  max={5}
  axes={axes}
  formatValue={(v) => \`\${v} / 5\`}
  series={[
    { name: "Model A", values: { battery: 4, camera: 5, screen: 4, price: 2, weight: 3 } },
    { name: "Model B", color: "var(--primary)", values: { battery: 5, camera: 3, screen: 3, price: 4, weight: 4 } },
  ]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.singleTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.singleText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RadarSingleDemo />
              </div>
              <CodeBlock className="mt-4">{`<RadarChart
  showLegend={false}
  levels={3}
  axes={axes}
  series={[{ name: "Model A", color: "var(--foreground)", values }]}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            {
              name: "axes",
              type: "{ key: string; label: string }[]",
              description: t.p.axes,
            },
            {
              name: "series",
              type: "{ name: string; values: Record<string, number>; color?: string }[]",
              description: t.p.series,
            },
            { name: "max", type: "number", description: t.p.max },
            {
              name: "levels",
              type: "number",
              default: "4",
              description: t.p.levels,
            },
            {
              name: "grid",
              type: '"polygon" | "circle"',
              default: '"polygon"',
              description: t.p.grid,
            },
            {
              name: "showLegend",
              type: "boolean",
              default: "true",
              description: t.p.showLegend,
            },
            {
              name: "formatValue",
              type: "(value: number) => string",
              default: "String",
              description: t.p.formatValue,
            },
            {
              name: "title",
              type: "string",
              default: '"Radar chart"',
              description: t.p.title,
            },
            {
              name: "axisHeader",
              type: "string",
              default: '"Axis"',
              description: t.p.axisHeader,
            },
            {
              name: "duration",
              type: "number",
              default: "700",
              description: t.p.duration,
            },
            {
              name: "plotClassName",
              type: "string",
              description: t.p.plotClassName,
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
