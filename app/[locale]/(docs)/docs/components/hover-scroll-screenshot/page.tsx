import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  HoverScrollScreenshotCardDemo,
  HoverScrollScreenshotDemo,
  HoverScrollScreenshotSpeedDemo,
  HoverScrollScreenshotVariantsDemo,
} from "./hover-scroll-screenshot-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Tall screenshot that scrolls inside a fixed frame on hover",
  intro:
    "A full-page screenshot in a frame with fixed proportions. On hover it scrolls down, and if the pointer leaves halfway it goes back from where it stopped and noticeably faster. It is a server component with no JavaScript: a CSS transition on translate, and the frame is a size container, so the end offset is calc(100cqh - 100%) with no measuring. Keyboard focus starts the scroll too, and on touch screens a tap focuses the frame.",
  browserSupport: "Browser Support",
  supportDescription0: "Sizes the screenshot frame.",
  supportDescription1: "Shapes the scroll animation.",
  browserSupportText:
    "Container query units give the frame height, cubic-bezier() and linear() easings draw the glide and bounce paths. Both are widely available. With prefers-reduced-motion the image stays still.",
  preview: "Preview",
  previewHint: "Hover the frame, or tap it on a phone.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  variantsTitle: "Motion variants",
  variantsText:
    "Three ways to move. The duration is shared, only the path changes.",
  speedTitle: "Speed and duration",
  speedText:
    "duration is the time from top to bottom. CSS cannot read the image height, so it does not adapt to the page length: give long screenshots a longer duration.",
  cardTitle: "Inside a card",
  cardText: "Override the frame with className: aspect ratio, border, radius.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDesc: {
    src: "URL of the tall screenshot",
    alt: "Image description, also the accessible name of the frame",
    variant: "Motion style",
    duration: "Scroll time from top to bottom, ms",
    returnSpeedup: "How many times faster the way back is",
    "--hss-easing":
      "CSS variable, set via style: easing of the way in. Slow start, long deceleration at the edge",
    "--hss-easing-out":
      "CSS variable, set via style: easing of the way back, softens the stop at the top",
    imageClassName: "Classes for the img element",
    className: "Frame classes; the default ratio is aspect-[4/3]",
  },
  features: "Features",
  featureList: [
    [
      "Resumes from the current point",
      "an interrupted scroll reverses from the frame you see, without a jump",
    ],
    ["No JavaScript", "hover, focus and transitions do all the work"],
    [
      "Touch and keyboard",
      "focus with Tab or a tap starts the scroll; moving focus away scrolls back",
    ],
    ["Reduced motion", "with prefers-reduced-motion the image stays still"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Длинный скриншот прокручивается в рамке при наведении",
    intro:
      "Скриншот всей страницы в рамке с фиксированными пропорциями. При наведении он прокручивается вниз, а если увести курсор на полпути, вернётся из той точки, где остановился, и заметно быстрее. Это серверный компонент без JavaScript: CSS-переход по translate, а рамка служит size-контейнером, поэтому конечный сдвиг равен calc(100cqh - 100%) и ничего не надо мерить. Прокрутку запускает и фокус с клавиатуры, а на сенсорном экране тап фокусирует рамку.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Задаёт размер рамки скриншота.",
    supportDescription1: "Задаёт характер анимации прокрутки.",
    browserSupportText:
      "Единицы контейнерных запросов дают высоту рамки, а кривые cubic-bezier() и linear() рисуют траектории glide и bounce. Обе технологии давно поддерживаются везде. При prefers-reduced-motion картинка стоит на месте.",
    preview: "Превью",
    previewHint: "Наведите курсор на рамку или коснитесь её на телефоне.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    variantsTitle: "Варианты движения",
    variantsText:
      "Три способа прокрутки. Длительность общая, меняется только траектория.",
    speedTitle: "Скорость и длительность",
    speedText:
      "duration задаёт время пути сверху вниз. CSS не знает высоту картинки, поэтому длительность не подстраивается под длину страницы: длинным скриншотам дайте duration побольше.",
    cardTitle: "Внутри карточки",
    cardText: "Рамку переопределяет className: пропорции, бордер, скругление.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDesc: {
      src: "Адрес длинного скриншота",
      alt: "Описание картинки, оно же доступное имя рамки",
      variant: "Вариант движения",
      duration: "Время прокрутки сверху вниз, мс",
      returnSpeedup: "Во сколько раз обратный путь быстрее",
      "--hss-easing":
        "CSS-переменная через style: кривая пути вниз. Мягкий разгон и долгое торможение у края",
      "--hss-easing-out":
        "CSS-переменная через style: кривая обратного пути, смягчает остановку у верхнего края",
      imageClassName: "Классы для элемента img",
      className: "Классы рамки; пропорции по умолчанию aspect-[4/3]",
    },
    features: "Возможности",
    featureList: [
      [
        "Возврат из текущей точки",
        "прерванная прокрутка разворачивается с того кадра, который видно, без скачка",
      ],
      ["Без JavaScript", "всю работу делают наведение, фокус и CSS-переходы"],
      [
        "Тап и клавиатура",
        "фокус через Tab или тап запускает прокрутку, уход фокуса возвращает картинку",
      ],
      ["Reduced motion", "при prefers-reduced-motion картинка стоит на месте"],
    ],
  },
}

const propRows: [keyof typeof en.propDesc, string, string][] = [
  ["src", "string", "-"],
  ["alt", "string", "-"],
  ["variant", '"glide" | "bounce" | "zoom"', '"glide"'],
  ["duration", "number", "6000"],
  ["returnSpeedup", "number", "6"],
  ["--hss-easing", "timing-function", "cubic-bezier(.45,0,.15,1)"],
  ["--hss-easing-out", "timing-function", "cubic-bezier(.3,0,.1,1)"],
  ["imageClassName", "string", "-"],
  ["className", "string", "-"],
]

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Hover Scroll Screenshot", description: t.description }
}

export default async function HoverScrollScreenshotPage({ params }: Props) {
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

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Hover Scroll Screenshot" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "container-queries",
              description: t.supportDescription0,
            },
            {
              featureId: "linear-easing",
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
            <HoverScrollScreenshotDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/hover-scroll-screenshot" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { HoverScrollScreenshot } from "@/components/ui/hover-scroll-screenshot"

export default function Example() {
  return (
    <HoverScrollScreenshot
      src="/screenshots/landing-full.png"
      alt="Landing page"
      className="max-w-md"
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
              <h3 className="text-lg font-medium mb-3">{t.variantsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.variantsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <HoverScrollScreenshotVariantsDemo />
              </div>
              <CodeBlock className="mt-4">{`<HoverScrollScreenshot src={src} alt="Landing" variant="glide" />
<HoverScrollScreenshot src={src} alt="Landing" variant="bounce" />
<HoverScrollScreenshot src={src} alt="Landing" variant="zoom" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.speedTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.speedText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <HoverScrollScreenshotSpeedDemo />
              </div>
              <CodeBlock className="mt-4">{`<HoverScrollScreenshot src={src} alt="Landing" duration={10000} />
<HoverScrollScreenshot src={src} alt="Landing" duration={3000} returnSpeedup={4} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.cardTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.cardText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <HoverScrollScreenshotCardDemo />
              </div>
              <CodeBlock className="mt-4">{`<div className="overflow-hidden rounded-xl border bg-card">
  <HoverScrollScreenshot
    src={src}
    alt="Studio landing page"
    variant="zoom"
    className="aspect-[16/10] rounded-none border-0 border-b"
  />
  <div className="p-4">
    <p className="font-medium">Studio landing page</p>
  </div>
</div>`}</CodeBlock>
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
                {propRows.map(([name, type, def]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.propDesc[name]}</td>
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
