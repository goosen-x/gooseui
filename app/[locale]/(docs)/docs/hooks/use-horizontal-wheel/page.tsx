import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { UseHorizontalWheelDemo } from "./use-horizontal-wheel-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Vertical mouse wheel scrolls a horizontal row",
  intro:
    "useHorizontalWheel turns the vertical mouse wheel into horizontal scrolling of a row: carousels, tabs, card strips. Mouse users can scroll the row without Shift, and it never traps the page.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  parameters: "Parameters",
  returns: "Returns",
  features: "Features",
  browserSupport: "Browser Support",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  ex0Title: "Instant scrolling",
  ex0Text:
    "By default the row eases toward the target. Turn smoothing off to move by the exact wheel step. With prefers-reduced-motion it is off anyway.",
  ex1Title: "Pause while dragging",
  ex1Text:
    "Use disabled to switch the behavior off without detaching the ref, for example while a drag is in progress.",
  param0:
    "Ease toward the target position. Ignored with prefers-reduced-motion",
  param1: "Leave the wheel alone",
  return0: "Callback ref for the scrollable element",
  feature0: "Releases at the edges",
  feature0Text:
    "At the start or end of the row the wheel scrolls the page as usual",
  feature1: "Leaves trackpads alone",
  feature1Text:
    "Gestures with a horizontal part already scroll the row natively and are not touched",
  feature2: "Respects modifiers",
  feature2Text:
    "Shift + wheel and Ctrl + wheel (zoom) keep the browser behavior",
  feature3: "Line and page modes",
  feature3Text: "Wheel deltas in lines or pages are converted to pixels",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Вертикальное колесо мыши прокручивает горизонтальный ряд",
    intro:
      "useHorizontalWheel превращает вертикальное колесо мыши в горизонтальную прокрутку ряда: каруселей, вкладок, лент карточек. Ряд можно листать мышью без Shift, и страница при этом не застревает.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    parameters: "Параметры",
    returns: "Возвращает",
    features: "Возможности",
    browserSupport: "Поддержка браузеров",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    ex0Title: "Без плавности",
    ex0Text:
      "По умолчанию ряд плавно доезжает до цели. Выключите плавность, чтобы двигать ровно на шаг колеса. При prefers-reduced-motion она выключена и так.",
    ex1Title: "Пауза на время перетаскивания",
    ex1Text:
      "Через disabled поведение выключается без отвязки ref, например на время перетаскивания.",
    param0: "Плавно доезжать до цели. При prefers-reduced-motion не действует",
    param1: "Не трогать колесо",
    return0: "Callback ref для прокручиваемого элемента",
    feature0: "Отпускает у краёв",
    feature0Text: "В начале и в конце ряда колесо снова прокручивает страницу",
    feature1: "Не мешает тачпаду",
    feature1Text:
      "Жесты с горизонтальной составляющей и так листают ряд, их хук не трогает",
    feature2: "Учитывает модификаторы",
    feature2Text:
      "Shift + колесо и Ctrl + колесо (масштаб) работают как в браузере",
    feature3: "Режимы строк и страниц",
    feature3Text: "Шаги колеса в строках и страницах пересчитываются в пиксели",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useHorizontalWheel", description: t.description }
}

export default async function UseHorizontalWheelPage({ params }: Props) {
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

  const parameters = [
    ["options.smooth", "boolean", "true", t.param0],
    ["options.disabled", "boolean", "false", t.param1],
  ]
  const returns = [["ref", "RefCallback<T>", t.return0]]
  const features = [
    [t.feature0, t.feature0Text],
    [t.feature1, t.feature1Text],
    [t.feature2, t.feature2Text],
    [t.feature3, t.feature3Text],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useHorizontalWheel" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseHorizontalWheelDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-horizontal-wheel" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { useHorizontalWheel } from "@/hooks/use-horizontal-wheel"

export function CardRow({ items }: { items: Item[] }) {
  const ref = useHorizontalWheel()

  return (
    <div ref={ref} className="flex gap-4 overflow-x-auto">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
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
              <h3 className="text-lg font-medium mb-3">{t.ex0Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex0Text}</p>
              <CodeBlock>{`const ref = useHorizontalWheel({ smooth: false })`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex1Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex1Text}</p>
              <CodeBlock>{`const [dragging, setDragging] = useState(false)
const ref = useHorizontalWheel({ disabled: dragging })`}</CodeBlock>
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
                {parameters.map(([name, type, value, description]) => (
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
