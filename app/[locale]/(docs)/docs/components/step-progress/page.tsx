import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  StepProgressColorDemo,
  StepProgressDemo,
  StepProgressVariantsDemo,
} from "./step-progress-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  title: "Step Progress",
  description:
    "Step bar with running dashes, a marker dot, a percentage and a 04 / 05 counter",
  intro:
    "A thin progress line for multi-step forms. The completed part is drawn with running dashes, a dot marks the current position, the counter on the left shows the step and the percentage sits on the right. It is a server component with no client JavaScript.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  partsTitle: "Counter, percentage, animation",
  partsText:
    "Hide the counter or the percentage when the layout already shows them, and stop the dashes with animated={false}. With prefers-reduced-motion the dashes stand still anyway.",
  colorTitle: "Color",
  colorText:
    "Dashes are drawn with currentColor, so a text color class on the component repaints the line.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDescriptions: {
    step: "Current step, starting from 1",
    total: "Total number of steps",
    showCounter: "Show the 04 / 05 counter",
    showPercent: "Show the percentage",
    animated: "Run the dashes on the completed part",
    label: "Accessible label, {step} and {total} are replaced",
    className: "Additional CSS classes",
  },
  features: "Features",
  featureList: [
    [
      "progressbar role",
      "aria-valuenow in percent and a readable aria-valuetext",
    ],
    ["Reduced motion", "the dash animation runs only under motion-safe"],
    ["No client code", "the keyframes ship in a deduplicated style tag"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Step Progress",
    description:
      "Полоса шагов с бегущим пунктиром, точкой, процентами и счётчиком 04 / 05",
    intro:
      "Тонкая линия прогресса для многошаговых форм. Пройденная часть нарисована бегущим пунктиром, точка отмечает текущее место, слева счётчик шагов, справа проценты. Это серверный компонент без клиентского JavaScript.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    partsTitle: "Счётчик, проценты, анимация",
    partsText:
      "Счётчик и проценты можно скрыть, если они уже есть рядом, а пунктир остановить через animated={false}. При prefers-reduced-motion пунктир и так стоит на месте.",
    colorTitle: "Цвет",
    colorText:
      "Пунктир рисуется через currentColor, поэтому класс цвета текста на компоненте перекрашивает линию.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDescriptions: {
      step: "Текущий шаг, считается с 1",
      total: "Всего шагов",
      showCounter: "Показывать счётчик 04 / 05",
      showPercent: "Показывать проценты",
      animated: "Анимировать пунктир на пройденной части",
      label: "Подпись для скринридеров, {step} и {total} подставляются",
      className: "Дополнительные CSS-классы",
    },
    features: "Возможности",
    featureList: [
      [
        "Роль progressbar",
        "aria-valuenow в процентах и понятный aria-valuetext",
      ],
      ["Reduced motion", "пунктир анимируется только под motion-safe"],
      ["Без клиентского кода", "keyframes приходят в style-теге без дублей"],
    ],
  },
}

const propRows: [keyof typeof en.propDescriptions, string, string][] = [
  ["step", "number", "-"],
  ["total", "number", "-"],
  ["showCounter", "boolean", "true"],
  ["showPercent", "boolean", "true"],
  ["animated", "boolean", "true"],
  ["label", "string", '"Step {step} of {total}"'],
  ["className", "string", "-"],
]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
const th = "p-3 text-left font-medium"

export default async function StepProgressPage({ params }: Props) {
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

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title={t.title} />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <StepProgressDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/step-progress" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { StepProgress } from "@/components/ui/step-progress"

export default function Example() {
  return <StepProgress step={4} total={5} />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.partsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.partsText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <StepProgressVariantsDemo />
              </div>
              <CodeBlock className="mt-4">{`<StepProgress step={1} total={4} showCounter={false} />
<StepProgress step={3} total={8} showPercent={false} />
<StepProgress step={6} total={6} animated={false} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.colorTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.colorText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <StepProgressColorDemo />
              </div>
              <CodeBlock className="mt-4">{`<StepProgress step={2} total={5} className="text-primary" />
<StepProgress step={4} total={5} label="Uploading files" className="text-muted-foreground" />`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className={th}>{t.headers.prop}</th>
                  <th className={th}>{t.headers.type}</th>
                  <th className={th}>{t.headers.default}</th>
                  <th className={th}>{t.headers.description}</th>
                </tr>
              </thead>
              <tbody>
                {propRows.map(([prop, type, def]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.propDescriptions[prop]}</td>
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
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
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
