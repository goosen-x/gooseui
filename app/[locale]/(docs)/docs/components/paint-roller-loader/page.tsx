import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  PaintRollerLoaderColorsDemo,
  PaintRollerLoaderDemo,
  PaintRollerLoaderSizesDemo,
} from "./paint-roller-loader-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Mixes paint and highlight colors",
  browserSupport: "Browser Support",
  description: "CSS loader where a paint roller covers a stripe",
  intro:
    "A paint roller rolls across a stripe and leaves color behind it, then the paint fades and the stroke starts over. Pure CSS, no animation library. The paint takes the primary token and can be changed with a CSS variable.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  sizesTitle: "Size and speed",
  sizesText:
    "size sets the width in px, everything else scales with it. duration is one stroke in ms.",
  colorsTitle: "Colors",
  colorsText:
    "Override --paint-roller-color for the paint, --paint-roller-frame for the handle and --paint-roller-track for the unpainted stripe.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDescs: {
    size: "Width of the illustration in px",
    duration: "One stroke cycle, ms",
    label: "Visible caption under the roller",
    srLabel: "Screen reader text when there is no caption",
    className: "Additional CSS classes",
    style: "Inline styles, a place for the CSS variables",
  },
  variables: "CSS variables",
  variableHeaders: {
    name: "Variable",
    default: "Default",
    description: "Description",
  },
  variableDescs: {
    paint: "Paint color",
    frame: "Handle and roller outline",
    track: "Unpainted stripe",
  },
  features: "Features",
  featureList: [
    ["Pure CSS", "three keyframes, no JavaScript and no motion"],
    ["Scales", "geometry is in em, one font-size resizes the drawing"],
    ["Accessible", 'role="status", the caption or srLabel is announced'],
    ["Reduced motion", "the roller stops halfway along a painted stripe"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Смешивает цвета краски и блика",
    browserSupport: "Поддержка браузеров",
    description: "CSS-лоадер: малярный валик закрашивает полосу",
    intro:
      "Малярный валик прокатывается по полосе и оставляет за собой краску, потом краска гаснет, и всё начинается заново. Только CSS, без библиотек анимации. Краска берёт токен primary, его можно заменить через CSS-переменную.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    sizesTitle: "Размер и скорость",
    sizesText:
      "size задаёт ширину в px, остальное масштабируется вместе с ней. duration задаёт длительность одного прохода в мс.",
    colorsTitle: "Цвета",
    colorsText:
      "--paint-roller-color меняет краску, --paint-roller-frame ручку, а --paint-roller-track незакрашенную полосу.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDescs: {
      size: "Ширина рисунка в px",
      duration: "Длительность одного прохода, мс",
      label: "Видимая подпись под валиком",
      srLabel: "Текст для скринридера, если подписи нет",
      className: "Дополнительные CSS-классы",
      style: "Inline-стили, сюда же CSS-переменные",
    },
    variables: "CSS-переменные",
    variableHeaders: {
      name: "Переменная",
      default: "По умолчанию",
      description: "Описание",
    },
    variableDescs: {
      paint: "Цвет краски",
      frame: "Ручка и контур валика",
      track: "Незакрашенная полоса",
    },
    features: "Возможности",
    featureList: [
      ["Только CSS", "три keyframes, без JavaScript и motion"],
      ["Масштаб", "размеры в em, один font-size меняет весь рисунок"],
      ["Доступность", 'role="status", скринридер читает подпись или srLabel'],
      ["Reduced motion", "валик стоит на середине закрашенной полосы"],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Paint Roller Loader", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function PaintRollerLoaderPage({ params }: Props) {
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
    { id: "css-variables", title: t.variables, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const d = t.propDescs
  const rows: [string, string, string, string][] = [
    ["size", "number", "160", d.size],
    ["duration", "number", "2400", d.duration],
    ["label", "ReactNode", "-", d.label],
    ["srLabel", "string", '"Loading"', d.srLabel],
    ["className", "string", "-", d.className],
    ["style", "CSSProperties", "-", d.style],
  ]
  const vars: [string, string, string][] = [
    ["--paint-roller-color", "var(--primary)", t.variableDescs.paint],
    ["--paint-roller-frame", "var(--foreground)", t.variableDescs.frame],
    ["--paint-roller-track", "var(--muted)", t.variableDescs.track],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Paint Roller Loader" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "color-mix",
              description: t.auditFeature0Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <PaintRollerLoaderDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/paint-roller-loader" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { PaintRollerLoader } from "@/components/ui/paint-roller-loader"

export default function Example() {
  return <PaintRollerLoader size={220} label="Preparing your workspace" />
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
                <PaintRollerLoaderSizesDemo />
              </div>
              <CodeBlock className="mt-4">{`<PaintRollerLoader size={80} />
<PaintRollerLoader size={140} duration={1800} />
<PaintRollerLoader size={200} duration={3200} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.colorsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.colorsText}
              </p>
              <div className="flex justify-center py-8 px-4 bg-muted/30 rounded-lg">
                <PaintRollerLoaderColorsDemo />
              </div>
              <CodeBlock className="mt-4">{`<PaintRollerLoader
  style={{ "--paint-roller-color": "var(--chart-1)" } as React.CSSProperties}
/>

// or with Tailwind
<PaintRollerLoader className="[--paint-roller-color:var(--chart-2)]" />`}</CodeBlock>
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
          <h2 id="css-variables" className={h2}>
            {t.variables}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.variableHeaders.name}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.variableHeaders.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.variableHeaders.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {vars.map(([name, def, desc]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
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
