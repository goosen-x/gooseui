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
  TocScrollspyDemo,
  TocScrollspySelectorDemo,
} from "./toc-scrollspy-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Tracks when scrolling ends",
  description: "Sticky table of contents that highlights the current section",
  intro:
    "The table of contents of a page, with the current section highlighted as you scroll. The list is rendered on the server as plain anchor links, so navigation works without JavaScript. A small client island adds the rest: it highlights exactly one current section, scrolls smoothly with an offset and updates the hash without a jump. Nested headings render as nested lists.",
  browserSupport: "Browser Support",
  supportDescription0: "Tracks the visible section.",
  supportDescription1: "Detects when scrolling stops.",
  browserSupportText:
    "The links are plain HTML. The island watches sections with IntersectionObserver and uses scrollend to release the clicked item after a smooth scroll; without scrollend it falls back to a timer.",
  preview: "Preview",
  previewText: "Scroll the article inside the box.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  propsTitle: "Props",
  selectorTitle: "Collect headings from a container",
  selectorText:
    "Skip items and pass selector instead: headings are read from container, and missing ids are generated from the text. In this mode the island renders a flat list after hydration, so it needs JavaScript.",
  headerTitle: "Page with a sticky header",
  headerText:
    "With the window as the scroll root, set offset to the header height. It moves the activation line and the scroll target, and also sets the sticky top.",
  props: {
    items: "Items: id, title and level. Deeper levels are nested",
    selector: "CSS selector for headings when items are not passed",
    container: "Where to look for headings. The document by default",
    root: "Scroll container. The window by default",
    offset:
      "Space above the target in px: sticky top, scroll offset and activation line",
    sticky: "Stick to the top of the scroll area",
    updateHash: "Write #id to the URL on click via history.replaceState",
    title: "Heading above the list. null hides it",
    listClassName:
      "Classes for the list wrapper, e.g. max-h-[70vh] overflow-y-auto",
    footer: "Extra content under the list, e.g. an edit link",
    labels: "Texts: nav (aria-label) and title",
    onNavigate: "Called with the id after a click",
    className: "Additional CSS classes",
  },
  features: "Features",
  featureList: [
    [
      "One active item",
      "exactly one link is highlighted at a time, bold and in the foreground color",
    ],
    [
      "No jump on click",
      "smooth scroll, the hash is updated with replaceState and focus moves to the heading",
    ],
    ["Nested levels", "h3 under h2 are rendered as a nested list"],
    [
      "Works without JS",
      "with items passed, the server renders regular anchor links",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Определяет окончание прокрутки",
    description: "Липкое оглавление, которое подсвечивает текущий раздел",
    intro:
      "Оглавление страницы с подсветкой текущего раздела при прокрутке. Список рендерится на сервере обычными ссылками-якорями, поэтому навигация работает и без JavaScript. Остальное добавляет маленький клиентский островок: подсвечивает ровно один текущий раздел, плавно прокручивает с отступом и меняет hash в адресе без прыжка. Вложенные заголовки выводятся вложенными списками.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Отслеживает видимый раздел.",
    supportDescription1: "Определяет окончание прокрутки.",
    browserSupportText:
      "Ссылки это обычный HTML. Островок следит за разделами через IntersectionObserver и по событию scrollend отпускает выбранный пункт после плавной прокрутки; без scrollend его заменяет таймер.",
    preview: "Превью",
    previewText: "Прокрутите статью внутри блока.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    propsTitle: "Пропсы",
    selectorTitle: "Заголовки из контейнера",
    selectorText:
      "Вместо items передайте selector: заголовки соберутся из container, а недостающие id сгенерируются из текста. В этом режиме островок рисует плоский список после гидрации, то есть без JavaScript его не будет.",
    headerTitle: "Страница с липкой шапкой",
    headerText:
      "Если прокручивается окно, передайте в offset высоту шапки. От него зависят линия активации, точка прокрутки и отступ sticky сверху.",
    props: {
      items: "Пункты: id, title и level. Более глубокие уровни вкладываются",
      selector: "CSS-селектор заголовков, если items не переданы",
      container: "Где искать заголовки. По умолчанию весь документ",
      root: "Контейнер прокрутки. По умолчанию окно",
      offset:
        "Отступ над целью в px: top для sticky, отступ прокрутки и линия активации",
      sticky: "Прилипать к верху области прокрутки",
      updateHash: "Записывать #id в адрес по клику через history.replaceState",
      title: "Заголовок над списком. null скрывает его",
      listClassName:
        "Классы обёртки списка, например max-h-[70vh] overflow-y-auto",
      footer:
        "Дополнительное содержимое под списком, например ссылка «Править»",
      labels: "Тексты: nav (aria-label) и title",
      onNavigate: "Вызывается с id после клика",
      className: "Дополнительные CSS-классы",
    },
    features: "Возможности",
    featureList: [
      [
        "Один активный пункт",
        "подсвечена ровно одна ссылка: жирным и основным цветом текста",
      ],
      [
        "Клик без прыжка",
        "плавная прокрутка, hash обновляется через replaceState, фокус переходит на заголовок",
      ],
      ["Вложенные уровни", "h3 внутри h2 выводятся вложенным списком"],
      [
        "Работает без JS",
        "если переданы items, сервер отдаёт обычные ссылки-якоря",
      ],
    ],
  },
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Table of Contents", description: t.description }
}

export default async function TocScrollspyPage({ params }: Props) {
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
        <DocsPageNav title="Table of Contents" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "scrollend",
              description: t.auditFeature0Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <TocScrollspyDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/toc-scrollspy" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { TocScrollspy } from "@/components/ui/toc-scrollspy"

const items = [
  { id: "intro", title: "Introduction", level: 2 },
  { id: "install", title: "Installation", level: 2 },
  { id: "cli", title: "Using the CLI", level: 3 },
  { id: "faq", title: "FAQ", level: 2 },
]

export default function Article() {
  return (
    <div className="grid grid-cols-[1fr_14rem] gap-10">
      <article>{/* headings with matching ids */}</article>
      <TocScrollspy items={items} offset={80} />
    </div>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.selectorTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.selectorText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <TocScrollspySelectorDemo />
              </div>
              <CodeBlock className="mt-4">{`const articleRef = useRef<HTMLDivElement>(null)

<article ref={articleRef}>…</article>
<TocScrollspy selector="h2, h3" container={articleRef} title={null} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.headerTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.headerText}
              </p>
              <CodeBlock>{`// Header is 64px tall, keep 16px of air
<TocScrollspy
  items={items}
  offset={80}
  labels={{ nav: "Article contents", title: "Contents" }}
  onNavigate={(id) => console.log("go to", id)}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            {
              name: "items",
              type: "TocScrollspyItem[]",
              description: t.props.items,
            },
            { name: "selector", type: "string", description: t.props.selector },
            {
              name: "container",
              type: "HTMLElement | RefObject",
              default: "document",
              description: t.props.container,
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
              default: "16",
              description: t.props.offset,
            },
            {
              name: "sticky",
              type: "boolean",
              default: "true",
              description: t.props.sticky,
            },
            {
              name: "updateHash",
              type: "boolean",
              default: "true",
              description: t.props.updateHash,
            },
            {
              name: "title",
              type: "ReactNode | null",
              default: '"On this page"',
              description: t.props.title,
            },
            {
              name: "listClassName",
              type: "string",
              description: t.props.listClassName,
            },
            {
              name: "footer",
              type: "ReactNode",
              description: t.props.footer,
            },
            {
              name: "labels",
              type: "{ nav?: string; title?: string }",
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
