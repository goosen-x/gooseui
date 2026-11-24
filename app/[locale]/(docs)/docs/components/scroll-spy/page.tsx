import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { ScrollSpyDemo, ScrollSpyRightDemo } from "./scroll-spy-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "Floating section navigation: a compact icon rail that expands on hover",
  intro:
    "A floating navigation for long pages. It appears after the page is scrolled a bit, shows one icon per section and highlights the section in view. Hover or focus the panel and it expands: labels slide out and the active section gets a pulsing dot. The active section comes from an IntersectionObserver (the useScrollSpy hook). All animations are CSS transitions, and the items are plain anchor links.",
  browserSupport: "Browser Support",
  supportDescription0:
    "Labels grow from zero width to their natural width. Without it they appear without the slide.",
  supportDescription1: "Keyboard focus expands the panel like hover does.",
  preview: "Preview",
  previewText:
    "Scroll the window and hover the panel. The page itself does not move.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  propsTitle: "Props",
  rightTitle: "Right side, always visible",
  rightText:
    'side="right" moves the panel to the right edge. With showAfter={0} it is visible from the start.',
  containerTitle: "Inside a scroll container",
  containerText:
    "Pass root and fixed={false} to track a scrollable block instead of the window. The parent needs position: relative.",
  pageTitle: "Whole page",
  pageText:
    "Without root the component listens to the window and is fixed to the viewport. Put it once in the layout, next to sections that have ids. Hide it on narrow screens with a class.",
  props: {
    items: "Sections: id, label and icon",
    showAfter: "Scroll distance in px after which the panel appears",
    side: "Which edge the panel sticks to",
    fixed: "position: fixed. false places it inside a relative parent",
    root: "Scroll container. The window by default",
    offset: "Activation line and scroll offset in px from the top of the root",
    labels: "Texts: nav (aria-label of the navigation)",
    onNavigate: "Called with the id after a click",
    className: "Classes for the panel wrapper, for example hidden lg:block",
  },
  features: "Features",
  featureList: [
    [
      "Expands on hover",
      "icons only at rest, labels and the active dot show up when the pointer or focus is inside",
    ],
    [
      "Accessible",
      "nav with aria-label, aria-current on the active link, full keyboard support",
    ],
    ["Shared hook", "section tracking comes from useScrollSpy"],
    ["Reduced motion", "transitions and the pulsing dot are turned off"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Плавающая навигация по разделам: компактная колонка иконок, раскрывается при наведении",
    intro:
      "Плавающая навигация для длинных страниц. Появляется, когда страницу немного прокрутили, показывает по иконке на раздел и подсвечивает раздел на экране. При наведении или фокусе панель раскрывается: выезжают подписи, а у активного раздела пульсирует точка. Активный раздел определяет IntersectionObserver (хук useScrollSpy). Все анимации это CSS-переходы, а пункты обычные ссылки-якоря.",
    browserSupport: "Поддержка браузеров",
    supportDescription0:
      "Подписи растут от нулевой ширины до своей. Без этого они появляются без выезда.",
    supportDescription1:
      "Фокус с клавиатуры раскрывает панель так же, как наведение.",
    preview: "Превью",
    previewText:
      "Прокрутите окно и наведите курсор на панель. Сама страница не двигается.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    propsTitle: "Пропсы",
    rightTitle: "Справа, видна сразу",
    rightText:
      'side="right" переносит панель к правому краю. С showAfter={0} она видна с самого начала.',
    containerTitle: "Внутри прокручиваемого блока",
    containerText:
      "Передайте root и fixed={false}, чтобы следить за блоком, а не за окном. Родителю нужен position: relative.",
    pageTitle: "На всю страницу",
    pageText:
      "Без root компонент слушает окно и закреплён на экране. Поставьте его один раз в layout рядом с разделами, у которых есть id. На узких экранах скройте классом.",
    props: {
      items: "Разделы: id, label и icon",
      showAfter: "Сколько px нужно прокрутить, чтобы панель появилась",
      side: "К какому краю прижата панель",
      fixed: "position: fixed. false ставит панель внутри relative-родителя",
      root: "Контейнер прокрутки. По умолчанию окно",
      offset: "Линия активации и отступ прокрутки в px от верха root",
      labels: "Тексты: nav (aria-label навигации)",
      onNavigate: "Вызывается с id после клика",
      className: "Классы обёртки панели, например hidden lg:block",
    },
    features: "Возможности",
    featureList: [
      [
        "Раскрытие по наведению",
        "в покое только иконки, подписи и точка активного пункта появляются при наведении или фокусе",
      ],
      [
        "Доступность",
        "nav с aria-label, aria-current у активной ссылки, управление с клавиатуры",
      ],
      ["Общий хук", "активный раздел определяет useScrollSpy"],
      ["Меньше движения", "переходы и пульсация точки отключаются"],
    ],
  },
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "ScrollSpy", description: t.description }
}

export default async function ScrollSpyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.propsTitle, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="ScrollSpy" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "interpolate-size",
              description: t.supportDescription0,
            },
            {
              featureId: "focus-within",
              description: t.supportDescription1,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <ScrollSpyDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/scroll-spy" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Briefcase, Home, Mail } from "lucide-react"
import { ScrollSpy } from "@/components/ui/scroll-spy"

const sections = [
  { id: "home", label: "Home", icon: <Home /> },
  { id: "work", label: "Work", icon: <Briefcase /> },
  { id: "contact", label: "Contact", icon: <Mail /> },
]

export default function Page() {
  return (
    <>
      <section id="home">…</section>
      <section id="work">…</section>
      <section id="contact">…</section>
      <ScrollSpy items={sections} />
    </>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.pageTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.pageText}</p>
              <CodeBlock>{`// app/layout.tsx, next to the page content
<ScrollSpy
  items={sections}
  showAfter={200}
  offset={200}
  className="hidden lg:block"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.rightTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.rightText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <ScrollSpyRightDemo />
              </div>
              <CodeBlock className="mt-4">{`<ScrollSpy items={sections} side="right" showAfter={0} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.containerTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.containerText}
              </p>
              <CodeBlock>{`const ref = useRef<HTMLDivElement>(null)

<div className="relative">
  <div ref={ref} className="h-96 overflow-y-auto">…</div>
  <ScrollSpy items={sections} root={ref} fixed={false} showAfter={60} />
</div>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            {
              name: "items",
              type: "ScrollSpyItem[]",
              description: t.props.items,
            },
            {
              name: "showAfter",
              type: "number",
              default: "200",
              description: t.props.showAfter,
            },
            {
              name: "side",
              type: '"left" | "right"',
              default: '"left"',
              description: t.props.side,
            },
            {
              name: "fixed",
              type: "boolean",
              default: "true",
              description: t.props.fixed,
            },
            {
              name: "root",
              type: "HTMLElement | RefObject",
              default: "window",
              description: t.props.root,
            },
            {
              name: "offset",
              type: "number",
              default: "200",
              description: t.props.offset,
            },
            {
              name: "labels",
              type: "{ nav?: string }",
              description: t.props.labels,
            },
            {
              name: "onNavigate",
              type: "(id: string) => void",
              description: t.props.onNavigate,
            },
            {
              name: "className",
              type: "string",
              description: t.props.className,
            },
          ]}
        />

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
