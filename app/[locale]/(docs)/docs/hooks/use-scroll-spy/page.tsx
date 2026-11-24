import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ScrollSpyBasicDemo,
  ScrollSpyDynamicDemo,
  ScrollSpyOffsetDemo,
} from "./use-scroll-spy-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Returns the id of the section currently in view",
  intro:
    "useScrollSpy takes a list of section ids and returns the one under the activation line. It runs on IntersectionObserver, works with the window or any scroll container, makes the last section active at the very bottom and picks up sections that mount later.",
  preview: "Preview",
  previewText: "Scroll inside the box.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  offsetTitle: "Activation line in percent",
  offsetText:
    "offset accepts pixels or a percentage of the root height. Here a section becomes active when its top passes 40% of the box.",
  dynamicTitle: "Sections that appear later",
  dynamicText:
    "The hook watches the DOM, so sections added after the first render are tracked without extra code.",
  windowTitle: "Window and sticky header",
  windowText:
    "Without root the hook listens to the window. Set offset to the header height so a section counts as active right below it.",
  parameters: "Parameters",
  returns: "Returns",
  returnsText:
    "string | null: the id of the active section. null before mount, when no section is found, or when fallbackToFirst is false and nothing has reached the line yet.",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  rows: {
    ids: "Section ids in document order",
    root: "Scroll container: element or ref. The window by default",
    offset: "Activation line from the top of the root: px or percent",
    rootMargin:
      "Custom rootMargin for the observer. By default a 1px band at offset",
    bottomThreshold:
      "Distance to the bottom (px) at which the last section becomes active",
    fallbackToFirst:
      "Return the first id while no section has reached the line",
    watchDom: "Re-scan when sections are added or removed",
    enabled: "Turn tracking off without unmounting",
  },
  features: "Features",
  featureList: [
    [
      "IntersectionObserver",
      "plus a light scroll handler for fast jumps with Home and End",
    ],
    [
      "Bottom of the page",
      "the last section is activated even if it is too short to reach the line",
    ],
    [
      "Dynamic content",
      "a MutationObserver re-attaches the observer when sections change",
    ],
    [
      "Cleanup",
      "observers, listeners and animation frames are released on unmount",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Возвращает id раздела, который сейчас на экране",
    intro:
      "useScrollSpy принимает список id разделов и возвращает тот, что находится под линией активации. Работает на IntersectionObserver, с окном или любым прокручиваемым контейнером. В самом низу страницы активным становится последний раздел, а разделы, появившиеся позже, подхватываются сами.",
    preview: "Превью",
    previewText: "Прокрутите содержимое блока.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    offsetTitle: "Линия активации в процентах",
    offsetText:
      "offset принимает пиксели или процент от высоты контейнера. Здесь раздел становится активным, когда его верх проходит 40% высоты блока.",
    dynamicTitle: "Разделы, которые появляются позже",
    dynamicText:
      "Хук следит за DOM, поэтому разделы, добавленные после первого рендера, отслеживаются без дополнительного кода.",
    windowTitle: "Окно и липкая шапка",
    windowText:
      "Без root хук слушает окно. Укажите в offset высоту шапки, и раздел будет считаться активным сразу под ней.",
    parameters: "Параметры",
    returns: "Возвращает",
    returnsText:
      "string | null: id активного раздела. null до монтирования, если разделы не найдены или если fallbackToFirst выключен и линию ещё никто не пересёк.",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    rows: {
      ids: "id разделов в порядке документа",
      root: "Контейнер прокрутки: элемент или ref. По умолчанию окно",
      offset: "Линия активации от верха контейнера: px или проценты",
      rootMargin:
        "Свой rootMargin для observer. По умолчанию полоса в 1px на уровне offset",
      bottomThreshold:
        "Расстояние до низа (px), при котором активным становится последний раздел",
      fallbackToFirst: "Возвращать первый id, пока линию никто не пересёк",
      watchDom: "Пересобирать список при добавлении и удалении разделов",
      enabled: "Выключить отслеживание без размонтирования",
    },
    features: "Возможности",
    featureList: [
      [
        "IntersectionObserver",
        "и лёгкий обработчик прокрутки для быстрых прыжков по Home и End",
      ],
      [
        "Низ страницы",
        "последний раздел становится активным, даже если он слишком короткий и до линии не доходит",
      ],
      [
        "Динамический контент",
        "MutationObserver заново подключает observer, когда разделы меняются",
      ],
      [
        "Очистка",
        "observer, слушатели и кадры анимации снимаются при размонтировании",
      ],
    ],
  },
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useScrollSpy", description: t.description }
}

export default async function UseScrollSpyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "parameters", title: t.parameters, level: 2 },
    { id: "returns", title: t.returns, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const rows = [
    ["ids", "readonly string[]", "-", t.rows.ids],
    ["options.root", "HTMLElement | RefObject", "window", t.rows.root],
    ["options.offset", 'number | string ("40%")', "0", t.rows.offset],
    ["options.rootMargin", "string", "-", t.rows.rootMargin],
    ["options.bottomThreshold", "number", "4", t.rows.bottomThreshold],
    ["options.fallbackToFirst", "boolean", "true", t.rows.fallbackToFirst],
    ["options.watchDom", "boolean", "true", t.rows.watchDom],
    ["options.enabled", "boolean", "true", t.rows.enabled],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useScrollSpy" />
        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <ScrollSpyBasicDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-scroll-spy" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { useScrollSpy } from "@/hooks/use-scroll-spy"

const sections = ["intro", "setup", "faq"]

export function Nav() {
  const active = useScrollSpy(sections, { offset: 80 })

  return (
    <nav>
      {sections.map((id) => (
        <a key={id} href={\`#\${id}\`} aria-current={active === id ? "location" : undefined}>
          {id}
        </a>
      ))}
    </nav>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.offsetTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.offsetText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <ScrollSpyOffsetDemo />
              </div>
              <CodeBlock className="mt-4">{`const ref = useRef<HTMLDivElement>(null)
const active = useScrollSpy(ids, { root: ref, offset: "40%" })

<div ref={ref} className="h-72 overflow-y-auto">…</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.dynamicTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.dynamicText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <ScrollSpyDynamicDemo />
              </div>
              <CodeBlock className="mt-4">{`const ids = sections.map((s) => s.id)
const active = useScrollSpy(ids, { root: ref, offset: 24 })`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.windowTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.windowText}
              </p>
              <CodeBlock>{`// Header is 64px tall
const active = useScrollSpy(["pricing", "features", "faq"], {
  offset: 64,
  fallbackToFirst: false,
})`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="parameters" className={h2}>
            {t.parameters}
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.headers.name}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.type}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.default}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, type, def, desc], i) => (
                  <tr key={name} className={i > 0 ? "border-t" : ""}>
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
          <h2 id="returns" className={h2}>
            {t.returns}
          </h2>
          <p className="text-sm text-muted-foreground">{t.returnsText}</p>
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
