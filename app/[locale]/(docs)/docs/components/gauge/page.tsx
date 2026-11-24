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
  GaugeBarDemo,
  GaugeCompactDemo,
  GaugePreviewDemo,
  GaugeThresholdsDemo,
} from "./gauge-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Animates the initial appearance",
  auditFeature1Description: "Mixes gauge and background colors",
  description: "Value meter as a half-circle arc or a linear scale",
  intro:
    "A meter for a single value: a half-circle arc with the number in the middle, or a linear scale with a gradient and a marker. The color and level caption come from thresholds. It is a server component with no client JavaScript: the fill and the marker position are CSS custom properties, so a new value moves them with a CSS transition, and on first paint the arc grows from zero through @starting-style.",
  browserSupport: "Browser Support",
  supportDescription0: "Animates the initial gauge fill.",
  browserSupportText:
    "The grow-in on first paint needs @starting-style; without it the gauge appears already filled. Transitions on a new value and everything else work everywhere. The number on screen switches to the new value at once, since formatValue can return any string.",
  preview: "Preview",
  previewHint: "Press the button: both views move to the new value.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  thresholdsTitle: "Custom thresholds",
  thresholdsText:
    "Thresholds set where each level starts, its color and caption. The arc is painted with a gradient through the threshold colors. Here a high value is bad, so the colors go the other way.",
  barTitle: "Linear scale",
  barText:
    'variant="bar" draws a gradient built from the threshold colors. One threshold gives a solid bar.',
  compactTitle: "Compact",
  compactText:
    "The number scales with the gauge width, so small gauges fit in tables and cards.",
  features: "Features",
  featureList: [
    ["Two views", "half-circle arc or linear scale with a marker"],
    ["Thresholds", "color and level caption change with the value"],
    [
      "Smooth motion",
      "the arc and the marker ease to a new value, instantly with reduced motion",
    ],
    ["No JavaScript", "works in Server Components, nothing to hydrate"],
    [
      "Accessible",
      'role="meter" with aria-valuenow, min, max and aria-valuetext',
    ],
  ],
  p: {
    value: "Current value, clamped to min and max",
    min: "Scale minimum",
    max: "Scale maximum",
    variant: "Arc or linear scale",
    thresholds:
      "Levels: where each starts, its color and caption. By default three levels from destructive to primary",
    label: "Accessible name of the meter",
    showValue: "Show the number",
    showLevel: "Show the level caption",
    showRange: "Show min and max under the scale",
    formatValue: "Formats the number on screen",
    valueText: "Builds aria-valuetext. By default the number and the level",
    duration: "Transition duration of the arc and the marker in ms",
    thickness: "Arc stroke or bar height in px",
    className: "Additional CSS classes",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Анимирует появление",
    auditFeature1Description: "Смешивает цвета шкалы и фона",
    description: "Датчик значения: полукруглая дуга или линейная шкала",
    intro:
      "Датчик одного значения: полукруг с числом в центре или линейная шкала с градиентом и маркером. Цвет и подпись уровня берутся из порогов, а при смене значения дуга плавно доезжает до нового. Это серверный компонент без клиентского JavaScript: заполнение и положение маркера заданы CSS-переменными, новое значение двигает их CSS-переходом, а при первой отрисовке дуга вырастает из нуля через @starting-style.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Анимирует первое заполнение шкалы.",
    browserSupportText:
      "Рост дуги при первой отрисовке требует @starting-style; без него датчик появляется уже заполненным. Переходы к новому значению и всё остальное работают везде. Число на экране меняется сразу, потому что formatValue может вернуть любую строку.",
    preview: "Превью",
    previewHint: "Нажмите кнопку: оба датчика переедут к новому значению.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    thresholdsTitle: "Свои пороги",
    thresholdsText:
      "Пороги задают, где начинается уровень, его цвет и подпись. Дуга закрашена градиентом через цвета порогов. Здесь высокое значение плохо, поэтому цвета идут наоборот.",
    barTitle: "Линейная шкала",
    barText:
      'variant="bar" рисует градиент из цветов порогов. Если порог один, полоса сплошная.',
    compactTitle: "Компактный вид",
    compactText:
      "Число масштабируется по ширине датчика, поэтому маленькие датчики помещаются в таблицы и карточки.",
    features: "Возможности",
    featureList: [
      ["Два вида", "полукруглая дуга или линейная шкала с маркером"],
      ["Пороги", "цвет и подпись уровня меняются вместе со значением"],
      [
        "Плавное движение",
        "дуга и маркер доезжают до нового значения, при reduced motion сразу",
      ],
      ["Без JavaScript", "работает в Server Components, гидратировать нечего"],
      [
        "Доступность",
        'role="meter" с aria-valuenow, min, max и aria-valuetext',
      ],
    ],
    p: {
      value: "Текущее значение, обрезается по min и max",
      min: "Минимум шкалы",
      max: "Максимум шкалы",
      variant: "Дуга или линейная шкала",
      thresholds:
        "Уровни: где начинается каждый, цвет и подпись. По умолчанию три уровня от destructive до primary",
      label: "Доступное имя датчика",
      showValue: "Показывать число",
      showLevel: "Показывать подпись уровня",
      showRange: "Показывать min и max под шкалой",
      formatValue: "Форматирует число на экране",
      valueText: "Собирает aria-valuetext. По умолчанию число и уровень",
      duration: "Длительность перехода дуги и маркера, мс",
      thickness: "Толщина дуги или высота полосы, px",
      className: "Дополнительные CSS-классы",
    },
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Gauge", description: t.description }
}

export default async function GaugePage({ params }: Props) {
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
        <DocsPageNav title="Gauge" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "starting-style",
              description: t.auditFeature0Description,
            },
            {
              featureId: "color-mix",
              description: t.auditFeature1Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <GaugePreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/gauge" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Gauge } from "@/components/ui/gauge"

export default function Example() {
  return <Gauge value={72} label="Score" />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.thresholdsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.thresholdsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <GaugeThresholdsDemo />
              </div>
              <CodeBlock className="mt-4">{`<Gauge
  value={cpu}
  label="CPU load"
  formatValue={(v) => \`\${Math.round(v)}%\`}
  thresholds={[
    { from: 0, color: "var(--primary)", label: "Normal" },
    { from: 60, color: "color-mix(in oklch, var(--destructive) 55%, var(--primary))", label: "Busy" },
    { from: 85, color: "var(--destructive)", label: "Critical" },
  ]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.barTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.barText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <GaugeBarDemo />
              </div>
              <CodeBlock className="mt-4">{`<Gauge
  variant="bar"
  value={23}
  label="Market mood"
  thresholds={[
    { from: 0, color: "var(--destructive)", label: "Fear" },
    { from: 45, color: "var(--muted-foreground)", label: "Neutral" },
    { from: 60, color: "var(--primary)", label: "Greed" },
  ]}
/>

<Gauge
  variant="bar"
  value={412}
  max={512}
  showLevel={false}
  showRange
  formatValue={(v) => \`\${Math.round(v)} GB\`}
  thresholds={[{ from: 0, color: "var(--primary)" }]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.compactTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.compactText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <GaugeCompactDemo />
              </div>
              <CodeBlock className="mt-4">{`<Gauge value={64} thickness={10} showLevel={false} className="w-28" />`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            { name: "value", type: "number", description: t.p.value },
            { name: "min", type: "number", default: "0", description: t.p.min },
            {
              name: "max",
              type: "number",
              default: "100",
              description: t.p.max,
            },
            {
              name: "variant",
              type: '"arc" | "bar"',
              default: '"arc"',
              description: t.p.variant,
            },
            {
              name: "thresholds",
              type: "{ from: number; color: string; label?: string }[]",
              description: t.p.thresholds,
            },
            { name: "label", type: "string", description: t.p.label },
            {
              name: "showValue",
              type: "boolean",
              default: "true",
              description: t.p.showValue,
            },
            {
              name: "showLevel",
              type: "boolean",
              default: "true",
              description: t.p.showLevel,
            },
            {
              name: "showRange",
              type: "boolean",
              default: "false",
              description: t.p.showRange,
            },
            {
              name: "formatValue",
              type: "(value: number) => string",
              default: "Math.round",
              description: t.p.formatValue,
            },
            {
              name: "valueText",
              type: "(value: number, level?: string) => string",
              description: t.p.valueText,
            },
            {
              name: "duration",
              type: "number",
              default: "700",
              description: t.p.duration,
            },
            {
              name: "thickness",
              type: "number",
              default: "20 / 10",
              description: t.p.thickness,
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
