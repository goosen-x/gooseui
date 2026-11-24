import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  FadeScrollerChipsDemo,
  FadeScrollerTableDemo,
  FadeScrollerVerticalDemo,
} from "./fade-scroller-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Animates elements while scrolling",
  auditFeature1Description: "Animates the fading edges",
  auditFeature2Description: "Creates fading edges",
  auditFeature3Description: "Styles the focused scroller",
  auditFeature4Description: "Adapts scrolling to JavaScript availability",
  auditFeature5Description: "Hides the scrollbar",
  auditFeature6Description: "Contains scroll gestures",
  description:
    "Scroll container that fades its edges when there is more to scroll, on CSS",
  intro:
    "Scroll container that fades the edge on the side where there is more to scroll, so users see that the content continues. The fade is a CSS mask driven by a scroll timeline, no JavaScript. Works horizontally and vertically. With a mouse the row scrolls with the wheel and the arrow buttons at the edges, with a trackpad or a finger by swipe, with the keyboard by the arrow keys after Tab. The wheel handler and the arrows are the only client part: a ref callback and a small island that calls scrollBy on click.",
  browserSupport: "Browser Support",
  supportDescription0: "Updates fades and arrows while scrolling.",
  browserSupportText:
    "The fades and the arrow visibility follow the scroll position through scroll-driven animations and timeline-scope. Without them the content scrolls as usual with no fades, and the arrows stay visible. With scripts turned off the arrows are hidden, the region still scrolls with the touch and the keyboard, and the mouse wheel needs Shift.",
  preview: "Preview",
  previewHint:
    "Scroll the table sideways: the left edge fades in, the right one fades out at the end. Scroll with the wheel or the arrows over a mouse, with a swipe on touch screens, or focus the table with Tab and use the arrow keys.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  chipsTitle: "Row of chips",
  chipsText:
    "A wider fade and a hidden scrollbar suit tags and filters. Narrow the window to see the edges.",
  verticalTitle: "Vertical list",
  verticalText:
    'orientation="vertical" fades the top and bottom edges. The root needs a fixed height.',
  stylingTitle: "Arrow step",
  stylingText:
    "scrollStep sets how far one arrow click scrolls, as a share of the visible size. 1 turns the list page by page.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  p: {
    orientation: "Scroll axis",
    fadeSize: "Width of the faded edge in px",
    showArrows:
      '"auto" shows the arrows only on devices with a mouse and only when there is more to scroll, true shows them everywhere, false hides them',
    wheel:
      "The vertical mouse wheel scrolls a horizontal row. Gives the wheel back to the page at the edges and leaves trackpads, Shift and Ctrl alone",
    scrollStep: "Arrow step as a fraction of the visible size",
    hideScrollbar: "Hide the native scrollbar",
    label: "Name of the scroll region for screen readers",
    labels: "Arrow button labels",
    viewportClassName: "Classes for the scrolling element",
    className: "Classes for the root",
  },
  features: "Features",
  featureList: [
    [
      "No JavaScript for the fades",
      "a scroll timeline drives the mask, the browser does it off the main thread",
    ],
    [
      "Mask instead of overlay",
      "the fade works on any background, no gradient color to match",
    ],
    [
      "Keyboard",
      'the area always has tabIndex, role="region" and a label, so it scrolls with the arrow keys',
    ],
    [
      "Mouse, trackpad, keyboard",
      "the wheel scrolls the row sideways, trackpads and touch work natively, the arrow keys scroll the focused area, no drag so clicks on the content stay intact",
    ],
    ["RTL", "start and end follow the text direction"],
    ["Reduced motion", "arrow clicks scroll instantly instead of smoothly"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Анимирует элементы при прокрутке",
    auditFeature1Description: "Анимирует затухающие края",
    auditFeature2Description: "Создаёт затухающие края",
    auditFeature3Description: "Оформляет прокрутку при фокусе",
    auditFeature4Description: "Меняет прокрутку в зависимости от JavaScript",
    auditFeature5Description: "Скрывает полосу прокрутки",
    auditFeature6Description: "Ограничивает передачу прокрутки",
    description:
      "Контейнер с прокруткой, края которого затухают, если есть что листать, на CSS",
    intro:
      "Контейнер с прокруткой, который затухает с той стороны, куда ещё можно листать, чтобы было видно, что содержимое продолжается. Затухание делает CSS-маска на шкале прокрутки, без JavaScript. Работает по горизонтали и по вертикали. Мышью ряд листается колесом и стрелками по краям, трекпадом и пальцем свайпом, с клавиатуры стрелками после Tab. Колесо и стрелки это единственная клиентская часть: ref-колбэк и маленький островок, который по клику вызывает scrollBy.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Меняет затухание и стрелки при прокрутке.",
    browserSupportText:
      "Затухание и видимость стрелок следуют за прокруткой через scroll-driven анимации и timeline-scope. Без них содержимое листается как обычно, но без затухания, а стрелки видны всегда. С отключёнными скриптами стрелки скрыты, область листается пальцем и клавиатурой, а колесу мыши нужен Shift.",
    preview: "Превью",
    previewHint:
      "Прокрутите таблицу вбок: левый край начнёт затухать, а правый перестанет, когда дойдёте до конца. Мышью листайте колесом или стрелками, на сенсорном экране свайпом, с клавиатуры выберите таблицу через Tab и листайте стрелками.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    chipsTitle: "Ряд чипов",
    chipsText:
      "Для тегов и фильтров подходит затухание пошире и скрытая полоса прокрутки. Сузьте окно, чтобы увидеть края.",
    verticalTitle: "Вертикальный список",
    verticalText:
      'orientation="vertical" затухает сверху и снизу. Корневому блоку нужна фиксированная высота.',
    stylingTitle: "Шаг стрелки",
    stylingText:
      "scrollStep задаёт, на сколько прокручивает один клик по стрелке, в долях видимой области. При 1 список листается постранично.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    p: {
      orientation: "Ось прокрутки",
      fadeSize: "Ширина затухания в px",
      showArrows:
        '"auto" показывает стрелки только на устройствах с мышью и только когда есть что листать, true показывает везде, false скрывает',
      wheel:
        "Вертикальное колесо мыши листает горизонтальный ряд. На краях отдаёт колесо странице, трекпад, Shift и Ctrl не трогает",
      scrollStep: "Шаг стрелки как доля видимой области",
      hideScrollbar: "Скрыть системную полосу прокрутки",
      label: "Название области для скринридеров",
      labels: "Подписи стрелок",
      viewportClassName: "Классы прокручиваемого элемента",
      className: "Классы корневого блока",
    },
    features: "Возможности",
    featureList: [
      [
        "Затухание без JavaScript",
        "маской управляет шкала прокрутки, браузер считает её вне основного потока",
      ],
      [
        "Маска вместо наложения",
        "затухание работает на любом фоне, цвет градиента подбирать не нужно",
      ],
      [
        "Клавиатура",
        'у области всегда есть tabIndex, role="region" и подпись, её можно листать стрелками',
      ],
      [
        "Мышь, трекпад, клавиатура",
        "колесо листает ряд вбок, трекпад и палец работают нативно, стрелки на клавиатуре листают выбранную область, перетаскивания нет, поэтому клики по содержимому не ломаются",
      ],
      ["RTL", "начало и конец следуют направлению текста"],
      ["Reduced motion", "клик по стрелке прокручивает сразу, без плавности"],
    ],
  },
}

const rows: [string, string, string, keyof typeof en.p][] = [
  ["orientation", '"horizontal" | "vertical"', '"horizontal"', "orientation"],
  ["fadeSize", "number", "40", "fadeSize"],
  ["showArrows", '"auto" | boolean', '"auto"', "showArrows"],
  ["wheel", "boolean", "true", "wheel"],
  ["scrollStep", "number", "0.8", "scrollStep"],
  ["hideScrollbar", "boolean", "false", "hideScrollbar"],
  ["label", "string", '"Scrollable content"', "label"],
  ["labels", "Partial<FadeScrollerLabels>", "English", "labels"],
  ["viewportClassName", "string", "-", "viewportClassName"],
  ["className", "string", "-", "className"],
]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Fade Scroller", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function FadeScrollerPage({ params }: Props) {
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
        <DocsPageNav title="Fade Scroller" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "scroll-driven-animations",
              description: t.auditFeature0Description,
            },
            {
              featureId: "registered-custom-properties",
              description: t.auditFeature1Description,
            },
            {
              featureId: "masks",
              description: t.auditFeature2Description,
            },
            {
              featureId: "has",
              description: t.auditFeature3Description,
            },
            {
              featureId: "scripting",
              description: t.auditFeature4Description,
            },
            {
              featureId: "scrollbar-width",
              description: t.auditFeature5Description,
            },
            {
              featureId: "overscroll-behavior",
              description: t.auditFeature6Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center p-4 sm:p-8 bg-muted/30 rounded-lg">
            <FadeScrollerTableDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/fade-scroller" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { FadeScroller } from "@/components/ui/fade-scroller"

export default function Example() {
  return (
    <FadeScroller label="Pricing table" className="rounded-lg border">
      <table className="w-full text-sm">{/* wide table */}</table>
    </FadeScroller>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.chipsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.chipsText}
              </p>
              <div className="flex justify-center p-4 sm:p-8 bg-muted/30 rounded-lg">
                <FadeScrollerChipsDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Button } from "@/components/ui/button"

<FadeScroller label="Topics" hideScrollbar fadeSize={56}>
  <div className="flex gap-2">
    {topics.map((topic) => (
      <Button key={topic} className="shrink-0 rounded-full border px-3">
        {topic}
      </Button>
    ))}
  </div>
</FadeScroller>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.verticalTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.verticalText}
              </p>
              <div className="flex justify-center p-4 sm:p-8 bg-muted/30 rounded-lg">
                <FadeScrollerVerticalDemo />
              </div>
              <CodeBlock className="mt-4">{`<FadeScroller orientation="vertical" label="Activity" className="h-64">
  <ul className="divide-y">{/* items */}</ul>
</FadeScroller>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.stylingTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.stylingText}
              </p>
              <CodeBlock>{`<FadeScroller
  orientation="vertical"
  label="Terms of service"
  scrollStep={1}
  className="h-80 rounded-lg border"
>
  <article className="prose p-4">{terms}</article>
</FadeScroller>`}</CodeBlock>
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
                {rows.map(([name, type, def, key]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.p[key]}</td>
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
