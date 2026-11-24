import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  RippleLoaderButtonDemo,
  RippleLoaderDemo,
  RippleLoaderGridDemo,
  RippleLoaderOriginsDemo,
} from "./ripple-loader-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Grid of dots lit by a wave from the center or a corner",
  intro:
    "Loader made of a grid of cells that light up one after another. The wave starts in the center or in any corner, the grid size is configurable, and the color comes from currentColor, so a text-* class is enough to recolor it.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  originsTitle: "Wave origin",
  originsText:
    "origin picks where the wave starts. From the center it spreads in rings, from a corner it runs along the diagonal.",
  gridTitle: "Grid, shape and color",
  gridText:
    "grid sets the cells per side, shape the cell form. The color is inherited from the text, so use any text-* class.",
  buttonTitle: "Inside a button",
  buttonText: "At 16 px it fits next to a button label.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDescs: {
    size: "Width and height of the grid in px",
    grid: "Cells per side",
    origin: "Where the wave starts",
    duration: "One wave cycle, ms",
    gap: "Gap between cells in px",
    shape: "Cell shape",
    label: "Text for screen readers",
    className: "Additional CSS classes, text-* sets the color",
  },
  features: "Features",
  featureList: [
    ["Pure CSS", "one keyframe and per-cell delays, no JavaScript timers"],
    ["currentColor", "inherits the text color and fits any theme"],
    ["Accessible", 'role="status" with a visually hidden label'],
    [
      "Reduced motion",
      "the wave stops and the grid shows a static gradient instead",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Сетка точек, которые зажигаются волной от центра или угла",
    intro:
      "Лоадер из сетки ячеек, которые загораются по очереди. Волна идёт от центра или от любого угла, размер сетки настраивается, а цвет берётся из currentColor, поэтому перекрасить его можно обычным классом text-*.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    originsTitle: "Откуда идёт волна",
    originsText:
      "origin задаёт точку старта. От центра волна расходится кольцами, из угла бежит по диагонали.",
    gridTitle: "Сетка, форма и цвет",
    gridText:
      "grid задаёт число ячеек на сторону, shape их форму. Цвет наследуется от текста, подойдёт любой класс text-*.",
    buttonTitle: "В кнопке",
    buttonText: "В размере 16 px помещается рядом с текстом кнопки.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDescs: {
      size: "Ширина и высота сетки в px",
      grid: "Ячеек на сторону",
      origin: "Откуда начинается волна",
      duration: "Длительность одного цикла, мс",
      gap: "Расстояние между ячейками в px",
      shape: "Форма ячейки",
      label: "Текст для скринридера",
      className: "Дополнительные CSS-классы, text-* задаёт цвет",
    },
    features: "Возможности",
    featureList: [
      [
        "Только CSS",
        "один keyframe и задержки на ячейках, без таймеров в JavaScript",
      ],
      ["currentColor", "берёт цвет текста и подходит к любой теме"],
      ["Доступность", 'role="status" и скрытая подпись для скринридера'],
      [
        "Reduced motion",
        "волна останавливается, вместо неё статичный градиент",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Ripple Loader", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function RippleLoaderPage({ params }: Props) {
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
    ["size", "number", "48", d.size],
    ["grid", "number", "3", d.grid],
    [
      "origin",
      '"center" | "top-left" | "top-right" | "bottom-left" | "bottom-right"',
      '"center"',
      d.origin,
    ],
    ["duration", "number", "1500", d.duration],
    ["gap", "number", "2", d.gap],
    ["shape", '"square" | "rounded" | "circle"', '"rounded"', d.shape],
    ["label", "string", '"Loading"', d.label],
    ["className", "string", "-", d.className],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Ripple Loader" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <RippleLoaderDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/ripple-loader" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { RippleLoader } from "@/components/ui/ripple-loader"

export default function Example() {
  return <RippleLoader size={96} gap={4} />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.originsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.originsText}
              </p>
              <div className="flex justify-center py-8 px-4 bg-muted/30 rounded-lg">
                <RippleLoaderOriginsDemo />
              </div>
              <CodeBlock className="mt-4">{`<RippleLoader origin="center" />
<RippleLoader origin="top-left" />
<RippleLoader origin="bottom-right" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.gridTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.gridText}</p>
              <div className="flex justify-center py-8 px-4 bg-muted/30 rounded-lg">
                <RippleLoaderGridDemo />
              </div>
              <CodeBlock className="mt-4">{`<RippleLoader grid={3} size={56} shape="square" gap={0} />
<RippleLoader grid={4} size={64} shape="circle" origin="top-left" className="text-foreground" />
<RippleLoader grid={5} size={72} gap={3} duration={2000} className="text-muted-foreground" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.buttonTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.buttonText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RippleLoaderButtonDemo />
              </div>
              <CodeBlock className="mt-4">{`<Button disabled={saving}>
  {saving && (
    <RippleLoader size={16} gap={1} className="text-primary-foreground" label="Saving" />
  )}
  {saving ? "Saving" : "Save"}
</Button>`}</CodeBlock>
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
