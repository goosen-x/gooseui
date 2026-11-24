import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { MeshGradient } from "@/registry/gooseui/effects/mesh-gradient"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Blurred color blobs drifting under a film grain layer",
  intro:
    "Blurred color blobs that drift slowly under a layer of SVG grain. The motion is pure CSS, so it works as a server component and costs no JavaScript. Colors default to the theme primary colour and its neighbours on the hue wheel, so they always go together.",
  preview: "Preview",
  heading: "Quiet motion",
  subheading: "A soft backdrop for hero sections and cards",
  installation: "Installation",
  usage: "Usage",
  usageText:
    "The gradient fills the nearest positioned parent. Give the parent a background color, the blobs are blended over it.",
  examples: "Examples",
  colorsTitle: "Custom colors",
  colorsText: "Pass any number of colors. They cycle through five blob slots.",
  sharpTitle: "Less blur, more grain",
  sharpText:
    "A smaller blur keeps the shapes visible, a stronger grain adds texture.",
  fastTitle: "Faster and lighter",
  fastText:
    "Speed scales every blob duration. Lower blobOpacity for a subtle tint.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propColors: "Blob colors, any CSS color or var()",
  propSpeed: "Animation speed multiplier, 0 pauses it",
  propBlur: "Blur radius of the blobs in pixels",
  propBlobOpacity: "Opacity of the blobs from 0 to 1",
  propGrain: "Opacity of the grain layer, 0 disables it",
  propClassName: "Additional CSS classes for the wrapper",
  features: "Features",
  featureList: [
    ["No JavaScript", "keyframes live in a deduplicated style tag"],
    ["Grain without images", "feTurbulence noise in an inline data URI"],
    [
      "Theme aware",
      "default colors are CSS variables, so they follow the theme",
    ],
    ["Reduced motion", "with prefers-reduced-motion the blobs stand still"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Размытые цветные пятна плавают под слоем зерна",
    intro:
      "Размытые цветные пятна медленно плавают под слоем SVG-зерна. Движение сделано на CSS, поэтому это серверный компонент без JavaScript. По умолчанию цвета берутся от основного цвета темы и его соседей по цветовому кругу, поэтому всегда сочетаются.",
    preview: "Превью",
    heading: "Спокойное движение",
    subheading: "Мягкий фон для первого экрана и карточек",
    installation: "Установка",
    usage: "Использование",
    usageText:
      "Градиент заполняет ближайшего позиционированного родителя. Задайте родителю цвет фона, пятна ложатся поверх него.",
    examples: "Примеры",
    colorsTitle: "Свои цвета",
    colorsText:
      "Цветов может быть сколько угодно, они распределяются по пяти позициям пятен.",
    sharpTitle: "Меньше размытия, больше зерна",
    sharpText:
      "С малым размытием видны формы, а сильное зерно добавляет фактуру.",
    fastTitle: "Быстрее и прозрачнее",
    fastText:
      "speed меняет длительность всех пятен. Уменьшите blobOpacity, чтобы получить лёгкий оттенок.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propColors: "Цвета пятен, любой CSS-цвет или var()",
    propSpeed: "Множитель скорости, 0 ставит анимацию на паузу",
    propBlur: "Радиус размытия пятен в пикселях",
    propBlobOpacity: "Прозрачность пятен от 0 до 1",
    propGrain: "Прозрачность слоя зерна, 0 отключает его",
    propClassName: "Дополнительные CSS-классы обёртки",
    features: "Возможности",
    featureList: [
      ["Без JavaScript", "keyframes лежат в style-теге, React убирает дубли"],
      ["Зерно без картинок", "шум feTurbulence во встроенном data URI"],
      ["Следит за темой", "цвета по умолчанию заданы CSS-переменными"],
      ["Reduced motion", "при prefers-reduced-motion пятна стоят на месте"],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Mesh Gradient", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function MeshGradientPage({ params }: Props) {
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
    ["colors", "string[]", "var(--primary) ± hue", t.propColors],
    ["speed", "number", "1", t.propSpeed],
    ["blur", "number", "80", t.propBlur],
    ["blobOpacity", "number", "0.7", t.propBlobOpacity],
    ["grain", "number", "0.15", t.propGrain],
    ["className", "string", "-", t.propClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Mesh Gradient" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="relative flex h-80 items-center justify-center overflow-hidden bg-background rounded-lg border">
            <MeshGradient />
            <div className="relative mx-4 rounded-xl bg-background/80 px-8 py-6 text-center shadow-sm backdrop-blur-md">
              <p className="text-3xl font-semibold tracking-tight">
                {t.heading}
              </p>
              <p className="mt-2 text-muted-foreground">{t.subheading}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/mesh-gradient" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <p className="text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`import { MeshGradient } from "@/components/ui/mesh-gradient"

export default function Hero() {
  return (
    <section className="relative h-96 overflow-hidden bg-background">
      <MeshGradient />
      <h1 className="relative">Your headline</h1>
    </section>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.colorsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.colorsText}
              </p>
              <div className="relative h-48 overflow-hidden bg-background rounded-lg border">
                <MeshGradient colors={["#f97316", "#fb7185", "#fbbf24"]} />
              </div>
              <CodeBlock className="mt-4">{`<MeshGradient
  colors={["#f97316", "#fb7185", "#fbbf24"]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.sharpTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.sharpText}
              </p>
              <div className="relative h-48 overflow-hidden bg-background rounded-lg border">
                <MeshGradient blur={30} grain={0.35} />
              </div>
              <CodeBlock className="mt-4">{`<MeshGradient blur={30} grain={0.35} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.fastTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.fastText}</p>
              <div className="relative h-48 overflow-hidden bg-background rounded-lg border">
                <MeshGradient speed={3} blobOpacity={0.35} grain={0} />
              </div>
              <CodeBlock className="mt-4">{`<MeshGradient speed={3} blobOpacity={0.35} grain={0} />`}</CodeBlock>
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
