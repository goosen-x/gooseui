import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ProgressRingContentDemo,
  ProgressRingDemo,
  ProgressRingIndeterminateDemo,
  ProgressRingSizesDemo,
  ProgressRingThresholdsDemo,
} from "./progress-ring-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "SVG progress ring with thresholds and indeterminate mode",
  intro:
    "Circular progress on SVG. Shows the percentage or your own content in the center, animates the arc when the value changes, switches color by thresholds and has an indeterminate mode for unknown durations.",
  preview: "Preview",
  previewHint: "Change the value to see the arc move.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  sizesTitle: "Size and thickness",
  sizesText:
    "size sets the diameter, thickness the stroke. rounded={false} gives flat ends.",
  thresholdsTitle: "Color by thresholds",
  thresholdsText:
    "Each threshold applies from its from percentage. Here the ring turns warning at 70% and destructive at 90%.",
  contentTitle: "Custom content",
  contentText:
    "Children replace the percentage. max lets you pass the value in your own units.",
  indeterminateTitle: "Indeterminate",
  indeterminateText:
    "When the duration is unknown, the arc spins and aria-valuenow is omitted.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDescs: {
    value: "Current value",
    max: "Maximum value",
    size: "Diameter in px",
    thickness: "Stroke width in px",
    indeterminate: "Spinning arc without a value",
    thresholds: "Colors by percentage, the highest matching from wins",
    color: "Indicator color when no threshold matches",
    showValue: "Show the percentage in the center",
    animateValue: "Roll the digits of the percentage when the value changes",
    formatValue: "Custom formatter for the center value",
    children: "Custom center content",
    label: "Accessible name (aria-label)",
    rounded: "Round stroke ends",
    trackClassName: "Classes for the track circle",
    indicatorClassName: "Classes for the indicator circle",
    className: "Additional CSS classes",
  },
  features: "Features",
  featureList: [
    [
      "Accessible",
      'role="progressbar" with aria-valuenow, aria-valuemin and aria-valuemax',
    ],
    [
      "Smooth",
      "the arc animates with a CSS transition, turned off for reduced motion",
    ],
    [
      "Theme colors",
      "the track uses muted, the indicator primary, thresholds take any CSS color",
    ],
    ["Server friendly", "no client hooks, works in server components"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Кольцо прогресса на SVG с порогами и бесконечным режимом",
    intro:
      "Круговой прогресс на SVG. В центре процент или ваш контент, дуга плавно меняется вместе со значением, цвет переключается по порогам, а для задач неизвестной длины есть режим indeterminate.",
    preview: "Превью",
    previewHint: "Меняйте значение и смотрите, как движется дуга.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    sizesTitle: "Размер и толщина",
    sizesText:
      "size задаёт диаметр, thickness толщину линии. rounded={false} делает концы плоскими.",
    thresholdsTitle: "Цвет по порогам",
    thresholdsText:
      "Каждый порог действует начиная со своего процента from. Здесь кольцо желтеет на 70% и краснеет на 90%.",
    contentTitle: "Свой контент",
    contentText:
      "children заменяют процент. Через max значение можно передавать в своих единицах.",
    indeterminateTitle: "Без значения",
    indeterminateText:
      "Когда длительность неизвестна, дуга крутится, а aria-valuenow не выставляется.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDescs: {
      value: "Текущее значение",
      max: "Максимальное значение",
      size: "Диаметр в px",
      thickness: "Толщина линии в px",
      indeterminate: "Крутящаяся дуга без значения",
      thresholds: "Цвета по процентам, побеждает наибольший подходящий from",
      color: "Цвет индикатора, если ни один порог не подошёл",
      showValue: "Показывать процент в центре",
      animateValue: "Прокатывать цифры процента при смене значения",
      formatValue: "Своё форматирование значения в центре",
      children: "Свой контент в центре",
      label: "Доступное имя (aria-label)",
      rounded: "Скруглённые концы линии",
      trackClassName: "Классы для круга-подложки",
      indicatorClassName: "Классы для круга-индикатора",
      className: "Дополнительные CSS-классы",
    },
    features: "Возможности",
    featureList: [
      [
        "Доступность",
        'role="progressbar" с aria-valuenow, aria-valuemin и aria-valuemax',
      ],
      [
        "Плавность",
        "дуга анимируется CSS-переходом, при reduced motion он отключается",
      ],
      [
        "Цвета темы",
        "подложка muted, индикатор primary, в порогах любой CSS-цвет",
      ],
      [
        "Работает на сервере",
        "без клиентских хуков, подходит для серверных компонентов",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Progress Ring", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function ProgressRingPage({ params }: Props) {
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

  const d = t.propDescs
  const rows: [string, string, string, string][] = [
    ["value", "number", "0", d.value],
    ["max", "number", "100", d.max],
    ["size", "number", "64", d.size],
    ["thickness", "number", "6", d.thickness],
    ["indeterminate", "boolean", "false", d.indeterminate],
    ["thresholds", "{ from: number; color: string }[]", "-", d.thresholds],
    ["color", "string", '"var(--primary)"', d.color],
    ["showValue", "boolean", "true", d.showValue],
    ["animateValue", "boolean", "true", d.animateValue],
    [
      "formatValue",
      "(value: number, max: number) => ReactNode",
      "-",
      d.formatValue,
    ],
    ["children", "ReactNode", "-", d.children],
    ["label", "string", '"Progress"', d.label],
    ["rounded", "boolean", "true", d.rounded],
    ["trackClassName", "string", "-", d.trackClassName],
    ["indicatorClassName", "string", "-", d.indicatorClassName],
    ["className", "string", "-", d.className],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Progress Ring" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <ProgressRingDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/progress-ring" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { ProgressRing } from "@/components/ui/progress-ring"

export default function Example() {
  return <ProgressRing value={64} size={120} thickness={10} label="Upload progress" />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.sizesTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.sizesText}
              </p>
              <div className="flex justify-center py-8 px-4 bg-muted/30 rounded-lg">
                <ProgressRingSizesDemo />
              </div>
              <CodeBlock className="mt-4">{`<ProgressRing value={25} size={40} thickness={4} />
<ProgressRing value={50} size={64} thickness={6} />
<ProgressRing value={75} size={96} thickness={12} />
<ProgressRing value={90} size={128} thickness={4} rounded={false} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.thresholdsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.thresholdsText}
              </p>
              <div className="flex justify-center py-8 px-4 bg-muted/30 rounded-lg">
                <ProgressRingThresholdsDemo />
              </div>
              <CodeBlock className="mt-4">{`<ProgressRing
  value={usage}
  thresholds={[
    { from: 0, color: "var(--primary)" },
    { from: 70, color: "var(--chart-4)" },
    { from: 90, color: "var(--destructive)" },
  ]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.contentTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.contentText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ProgressRingContentDemo />
              </div>
              <CodeBlock className="mt-4">{`<ProgressRing value={done} max={5} size={112} thickness={9}>
  <span className="text-2xl">{done}/5</span>
  <span className="text-xs text-muted-foreground">tasks</span>
</ProgressRing>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                {t.indeterminateTitle}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.indeterminateText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ProgressRingIndeterminateDemo />
              </div>
              <CodeBlock className="mt-4">{`<ProgressRing indeterminate size={48} thickness={5} label="Loading" />`}</CodeBlock>
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
                    {t.propsHeaders.prop}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, type, def, desc]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{desc}</td>
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
            {t.featureList.map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
