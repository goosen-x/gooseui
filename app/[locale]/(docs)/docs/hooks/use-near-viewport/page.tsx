import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { UseNearViewportDemo } from "./use-near-viewport-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "One-shot flag for elements that come close to the screen",
  intro:
    "useNearViewport turns true once an element comes within a set distance of the screen and stays true after that. Use it to postpone heavy widgets such as maps, video players and charts until the user is about to see them.",
  preview: "Preview",
  previewText:
    "The chart below is mounted only when its block gets within 120px of the scroll box edge. Scroll back up: it stays mounted.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  iframeTitle: "Lazy map or video embed",
  iframeText:
    "An iframe starts loading its scripts as soon as it is in the DOM. Render it only when the flag turns on and keep a placeholder of the same size until then.",
  containerTitle: "Inside a scroll container",
  containerText:
    "Pass the container element as root when the content scrolls inside a panel, not the page. The preview above works this way.",
  marginTitle: "Start earlier on slow widgets",
  marginText:
    "A bigger rootMargin starts loading sooner, so the widget is ready by the time it scrolls into view.",
  parameters: "Parameters",
  returns: "Returns",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  paramRootMargin:
    "How far from the screen edge the element counts as near, in CSS margin syntax",
  paramRoot: "Scroll container to watch instead of the viewport",
  paramDisabled: "Do not observe and keep returning false",
  returnRef: "Callback ref for the element to watch",
  returnNear:
    "true once the element has come near the screen. Never resets back to false",
  features: "Features",
  featureOnce: "Fires once",
  featureOnceText:
    "The observer disconnects right after the first hit, nothing keeps running on scroll",
  featureFallback: "Fallback",
  featureFallbackText:
    "Without IntersectionObserver the flag is true right away, so content is never stuck behind a placeholder",
  featureRef: "Callback ref",
  featureRefText:
    "Works with elements that mount later or change, no useRef and no extra effect needed",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Флаг, который один раз включается у элементов рядом с экраном",
    intro:
      "useNearViewport включается, когда элемент подходит к экрану на заданное расстояние, и больше не выключается. С ним тяжёлые виджеты вроде карт, видеоплееров и графиков грузятся только тогда, когда пользователь вот-вот до них докрутит.",
    preview: "Превью",
    previewText:
      "График ниже монтируется, только когда его блок подходит к краю прокручиваемой области на 120px. Если прокрутить обратно, он останется на месте.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    iframeTitle: "Отложенная карта или видео",
    iframeText:
      "iframe начинает грузить скрипты, как только попадает в DOM. Рендерите его по флагу, а до этого держите заглушку того же размера.",
    containerTitle: "Внутри прокручиваемого блока",
    containerText:
      "Если прокручивается не страница, а панель, передайте её элемент в root. Так устроено превью выше.",
    marginTitle: "Раньше для медленных виджетов",
    marginText:
      "Чем больше rootMargin, тем раньше начинается загрузка, и к моменту появления на экране виджет уже готов.",
    parameters: "Параметры",
    returns: "Возвращает",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    paramRootMargin:
      "На каком расстоянии от края экрана элемент считается близким, в синтаксисе CSS margin",
    paramRoot: "Прокручиваемый контейнер, за которым следить вместо окна",
    paramDisabled: "Не следить и всё время возвращать false",
    returnRef: "Callback ref для элемента, за которым следим",
    returnNear:
      "true, когда элемент подошёл к экрану. Обратно в false не сбрасывается",
    features: "Возможности",
    featureOnce: "Срабатывает один раз",
    featureOnceText:
      "После первого попадания observer отключается, на прокрутке ничего не работает",
    featureFallback: "Запасной вариант",
    featureFallbackText:
      "Без IntersectionObserver флаг сразу равен true, и контент не застревает за заглушкой",
    featureRef: "Callback ref",
    featureRefText:
      "Подходит для элементов, которые появляются позже или меняются, без useRef и лишних эффектов",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useNearViewport", description: t.description }
}

export default async function UseNearViewportPage({ params }: Props) {
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

  const params_ = [
    ["rootMargin", "string", '"200px"', t.paramRootMargin],
    ["root", "Element | null", "null", t.paramRoot],
    ["disabled", "boolean", "false", t.paramDisabled],
  ]
  const returns = [
    ["[0] ref", "RefCallback<T>", t.returnRef],
    ["[1] isNear", "boolean", t.returnNear],
  ]
  const features = [
    [t.featureOnce, t.featureOnceText],
    [t.featureFallback, t.featureFallbackText],
    [t.featureRef, t.featureRefText],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useNearViewport" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseNearViewportDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-near-viewport" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { useNearViewport } from "@/hooks/use-near-viewport"

export function ReviewsSection() {
  const [ref, isNear] = useNearViewport()

  return (
    <section ref={ref} className="min-h-96">
      {isNear ? <ReviewsCarousel /> : null}
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
              <h3 className="text-lg font-medium mb-3">{t.iframeTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.iframeText}
              </p>
              <CodeBlock>{`function MapEmbed({ src }: { src: string }) {
  const [ref, isNear] = useNearViewport({ rootMargin: "300px" })

  return (
    <div ref={ref} className="aspect-video rounded-lg bg-muted">
      {isNear && (
        <iframe src={src} title="Map" className="size-full rounded-lg" />
      )}
    </div>
  )
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.containerTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.containerText}
              </p>
              <CodeBlock>{`function Panel() {
  const [root, setRoot] = useState<HTMLDivElement | null>(null)

  return (
    <div ref={setRoot} className="h-80 overflow-y-auto">
      <Intro />
      {root && <LazyChart root={root} />}
    </div>
  )
}

function LazyChart({ root }: { root: HTMLElement }) {
  const [ref, isNear] = useNearViewport({ root, rootMargin: "120px" })
  return <div ref={ref}>{isNear ? <Chart /> : <ChartSkeleton />}</div>
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.marginTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.marginText}
              </p>
              <CodeBlock>{`// start loading a full screen before the player shows up
const [ref, isNear] = useNearViewport({ rootMargin: "100% 0px" })`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="parameters" className={h2}>
            {t.parameters}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.headers.name}
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
                {params_.map(([name, type, value, description]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{value}</td>
                    <td className="p-3">{description}</td>
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
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.headers.name}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {returns.map(([name, type, description]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3">{description}</td>
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
            {features.map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}.</strong> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
