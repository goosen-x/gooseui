import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { UseDeferredInteractionDemo } from "./use-deferred-interaction-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description:
    "Flag that turns on after the first user interaction or a timeout",
  intro:
    "useDeferredInteraction returns true after the first user action on the page or after a timeout. Load chats, analytics and maps behind it, and they stay out of the page load window that Lighthouse and Core Web Vitals measure.",
  previewText:
    "If you have already scrolled, the flag is on. Press Reset and the chat waits for your next scroll, key press or tap.",
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
  ex0Title: "Interaction only",
  ex0Text:
    "Pass null to drop the fallback timer. Synthetic test runs never scroll or click, so the script will not load during the audit at all.",
  ex1Title: "Several widgets, one flag",
  ex1Text:
    "The interaction is shared: the first scroll turns the flag on for every component on the page. Each call keeps its own timeout.",
  ex2Title: "With next/script",
  ex2Text: "In Next.js render the Script component behind the flag.",
  param0:
    "Milliseconds after mount when the flag turns on anyway. null waits for an interaction only",
  return0:
    "true after the first scroll, pointerdown, keydown or touchstart on the page, or after the timeout",
  return1: "Separate export that forgets the interaction. For tests and demos",
  feature0: "Shared state",
  feature0Text:
    "One set of listeners for the whole page, removed right after the first interaction",
  feature1: "Remembers across navigation",
  feature1Text:
    "After client-side navigation the flag stays on, widgets do not wait again",
  feature2: "Hydration-safe",
  feature2Text: "Built on useSyncExternalStore and returns false on the server",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Флаг, который включается после первого действия или по таймауту",
    intro:
      "useDeferredInteraction возвращает true после первого действия пользователя на странице или по таймауту. Чаты, аналитика и карты, подключённые по этому флагу, не попадают в окно загрузки, которое меряют Lighthouse и Core Web Vitals.",
    previewText:
      "Если вы уже прокручивали страницу, флаг включён. Нажмите «Сбросить», и чат подождёт следующую прокрутку, нажатие клавиши или касание.",
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
    ex0Title: "Только по действию",
    ex0Text:
      "Передайте null, чтобы убрать запасной таймер. Синтетические прогоны не прокручивают и не кликают, поэтому скрипт во время замера не загрузится вообще.",
    ex1Title: "Несколько виджетов, один флаг",
    ex1Text:
      "Действие пользователя общее: первая прокрутка включает флаг во всех компонентах страницы. Таймаут у каждого вызова свой.",
    ex2Title: "Вместе с next/script",
    ex2Text: "В Next.js рендерите компонент Script по флагу.",
    param0:
      "Через сколько мс после монтирования флаг включится в любом случае. null ждёт только действия",
    return0:
      "true после первого scroll, pointerdown, keydown или touchstart на странице либо по таймауту",
    return1:
      "Отдельный экспорт, который забывает действие пользователя. Для тестов и демо",
    feature0: "Общее состояние",
    feature0Text:
      "Один набор слушателей на всю страницу, снимается сразу после первого действия",
    feature1: "Помнит между переходами",
    feature1Text:
      "После клиентского перехода флаг остаётся включённым, виджеты не ждут заново",
    feature2: "Без ошибок гидрации",
    feature2Text:
      "Работает на useSyncExternalStore, на сервере возвращает false",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useDeferredInteraction", description: t.description }
}

export default async function UseDeferredInteractionPage({ params }: Props) {
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

  const parameters = [["timeout", "number | null", "5000", t.param0]]
  const returns = [
    ["ready", "boolean", t.return0],
    ["resetDeferredInteraction()", "() => void", t.return1],
  ]
  const features = [
    [t.feature0, t.feature0Text],
    [t.feature1, t.feature1Text],
    [t.feature2, t.feature2Text],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useDeferredInteraction" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseDeferredInteractionDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-deferred-interaction" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { useDeferredInteraction } from "@/hooks/use-deferred-interaction"

export function SupportChat() {
  const ready = useDeferredInteraction()

  useEffect(() => {
    if (!ready) return
    const script = document.createElement("script")
    script.src = "https://chat.example.com/widget.js"
    script.async = true
    document.body.append(script)
  }, [ready])

  return null
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
              <CodeBlock>{`const ready = useDeferredInteraction(null)`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex1Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex1Text}</p>
              <CodeBlock>{`function Analytics() {
  const ready = useDeferredInteraction(3000)
  return ready ? <AnalyticsScript /> : null
}

function MapBlock() {
  // waits longer, but still switches on with the first scroll
  const ready = useDeferredInteraction(10_000)
  return ready ? <InteractiveMap /> : <MapPreviewImage />
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex2Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex2Text}</p>
              <CodeBlock>{`const ready = useDeferredInteraction()

return ready ? (
  <Script src="https://widget.example.com/embed.js" strategy="afterInteractive" />
) : null`}</CodeBlock>
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
