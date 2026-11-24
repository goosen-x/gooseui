import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { DitherBackground } from "@/registry/gooseui/effects/dither-background"
import { DitherBackgroundDemo } from "./dither-background-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Animated background with ordered Bayer dithering",
  intro:
    "An animated background that quantizes a smooth field into two colors with an 8x8 Bayer matrix. It renders to a 2D canvas at low resolution and scales up with crisp pixels. Default colors come from theme tokens and update when the theme changes.",
  preview: "Preview",
  previewText: "Switch the pattern, pixel size and speed.",
  installation: "Installation",
  usage: "Usage",
  usageText:
    "The background fills the nearest positioned parent. Put content after it with relative positioning.",
  examples: "Examples",
  noiseTitle: "Noise",
  noiseText: "Drifting value noise with a soft vertical gradient.",
  radialTitle: "Radial pulse",
  radialText: "Rings that spread from the center, with large pixels.",
  colorsTitle: "Custom colors",
  colorsText:
    "Pass any CSS colors or theme variables. Here the field uses muted tones for a quiet section background.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propPattern: "Shape of the smooth field before quantization",
  propPixelSize: "Size of one dither cell in CSS pixels",
  propSpeed: "Animation speed multiplier, 0 freezes the field",
  propColorFront: "Color of lit cells",
  propColorBack: "Color of unlit cells and the fallback background",
  propScale: "Field zoom, higher values give larger shapes",
  propFps: "Frame rate cap",
  propClassName: "Additional CSS classes for the wrapper",
  features: "Features",
  featureList: [
    ["Pauses when hidden", "the loop stops off screen and in a background tab"],
    [
      "Bounded cost",
      "work depends on CSS pixels, not devicePixelRatio, and the cell count is capped",
    ],
    [
      "Theme aware",
      "colors are re-read when the html class or color scheme changes",
    ],
    [
      "Reduced motion",
      "with prefers-reduced-motion a single static frame is drawn",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Анимированный фон с упорядоченным dithering по матрице Байера",
    intro:
      "Анимированный фон: плавное поле квантуется в два цвета по матрице Байера 8x8. Рисуется на 2D canvas в низком разрешении и растягивается с чёткими пикселями. Цвета по умолчанию берутся из токенов темы и обновляются при её смене.",
    preview: "Превью",
    previewText: "Переключайте рисунок, размер пикселя и скорость.",
    installation: "Установка",
    usage: "Использование",
    usageText:
      "Фон заполняет ближайшего позиционированного родителя. Содержимое кладите после него с relative.",
    examples: "Примеры",
    noiseTitle: "Шум",
    noiseText: "Плывущий шум с мягким вертикальным градиентом.",
    radialTitle: "Радиальная пульсация",
    radialText: "Кольца расходятся от центра, пиксели крупные.",
    colorsTitle: "Свои цвета",
    colorsText:
      "Подойдут любые CSS-цвета и переменные темы. Здесь приглушённые тона для спокойного фона секции.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propPattern: "Форма плавного поля до квантования",
    propPixelSize: "Размер одной ячейки в CSS-пикселях",
    propSpeed: "Множитель скорости, 0 останавливает поле",
    propColorFront: "Цвет закрашенных ячеек",
    propColorBack: "Цвет пустых ячеек и запасной фон",
    propScale: "Масштаб поля: чем больше, тем крупнее фигуры",
    propFps: "Ограничение частоты кадров",
    propClassName: "Дополнительные CSS-классы обёртки",
    features: "Возможности",
    featureList: [
      [
        "Пауза, когда не видно",
        "цикл останавливается за пределами экрана и в фоновой вкладке",
      ],
      [
        "Предсказуемая нагрузка",
        "объём работы зависит от CSS-пикселей, а не от devicePixelRatio, число ячеек ограничено",
      ],
      [
        "Следит за темой",
        "цвета перечитываются, когда меняется класс html или цветовая схема",
      ],
      [
        "Reduced motion",
        "при prefers-reduced-motion рисуется один статичный кадр",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Dither Background", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function DitherBackgroundPage({ params }: Props) {
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
    ["pattern", '"waves" | "noise" | "radial"', '"waves"', t.propPattern],
    ["pixelSize", "number", "3", t.propPixelSize],
    ["speed", "number", "1", t.propSpeed],
    ["colorFront", "string", '"var(--primary)"', t.propColorFront],
    ["colorBack", "string", '"var(--background)"', t.propColorBack],
    ["scale", "number", "1", t.propScale],
    ["fps", "number", "30", t.propFps],
    ["className", "string", "-", t.propClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Dither Background" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <DitherBackgroundDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/dither-background" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <p className="text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`import { DitherBackground } from "@/components/ui/dither-background"

export default function Hero() {
  return (
    <section className="relative h-96 overflow-hidden">
      <DitherBackground />
      <div className="relative">Your content</div>
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
              <h3 className="text-lg font-medium mb-3">{t.noiseTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.noiseText}
              </p>
              <div className="relative h-48 overflow-hidden bg-muted/30 rounded-lg">
                <DitherBackground pattern="noise" pixelSize={2} />
              </div>
              <CodeBlock className="mt-4">{`<DitherBackground pattern="noise" pixelSize={2} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.radialTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.radialText}
              </p>
              <div className="relative h-48 overflow-hidden bg-muted/30 rounded-lg">
                <DitherBackground pattern="radial" pixelSize={6} speed={0.6} />
              </div>
              <CodeBlock className="mt-4">{`<DitherBackground pattern="radial" pixelSize={6} speed={0.6} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.colorsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.colorsText}
              </p>
              <div className="relative h-48 overflow-hidden bg-muted/30 rounded-lg">
                <DitherBackground
                  colorFront="var(--muted-foreground)"
                  colorBack="var(--muted)"
                  scale={1.6}
                />
              </div>
              <CodeBlock className="mt-4">{`<DitherBackground
  colorFront="var(--muted-foreground)"
  colorBack="var(--muted)"
  scale={1.6}
/>`}</CodeBlock>
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
