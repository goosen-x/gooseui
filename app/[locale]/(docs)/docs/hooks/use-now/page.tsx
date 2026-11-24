import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  UseNowCountdownDemo,
  UseNowDemo,
  UseNowSharedDemo,
} from "./use-now-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Current time that re-renders on a shared interval",
  intro:
    "useNow returns the current time and refreshes it on an interval. All components that ask for the same interval share one timer, and the server render never disagrees with the client.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  countdownTitle: "Countdown",
  countdownText:
    "Compute the remaining time from now on every render. No local state or effects needed.",
  sharedTitle: "One timer for many components",
  sharedText:
    "Each tile calls useNow(1000) on its own, but there is only one setInterval behind them, so they tick in sync.",
  coarseTitle: "Coarse updates",
  coarseText:
    "Labels like “5 minutes ago” do not need a tick every second. Pass a larger interval to re-render less often.",
  parameters: "Parameters",
  returns: "Returns",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  paramInterval:
    "Refresh period in ms. Components with the same interval share one timer",
  returnValue:
    "Current time in ms (like Date.now()). null on the server and during hydration",
  features: "Features",
  featureShared: "Shared ticker",
  featureSharedText:
    "One setInterval per interval value, stopped when the last subscriber unmounts",
  featureHydration: "Hydration-safe",
  featureHydrationText:
    "Built on useSyncExternalStore with a null server snapshot, so markup always matches",
  featureVisible: "Catches up after background",
  featureVisibleText:
    "Browsers throttle timers in hidden tabs, so the value refreshes as soon as the tab is visible again",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Текущее время с перерисовкой по общему таймеру",
    intro:
      "useNow отдаёт текущее время и обновляет его с заданным интервалом. Все компоненты с одинаковым интервалом работают от одного таймера, а серверная разметка совпадает с клиентской.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    countdownTitle: "Обратный отсчёт",
    countdownText:
      "Оставшееся время считается от now на каждом рендере. Ни своего состояния, ни эффектов не нужно.",
    sharedTitle: "Один таймер на много компонентов",
    sharedText:
      "Каждая плитка сама вызывает useNow(1000), но за ними стоит один setInterval, поэтому они тикают одновременно.",
    coarseTitle: "Редкие обновления",
    coarseText:
      "Подписям вроде «5 минут назад» не нужен тик каждую секунду. Передайте интервал побольше, и перерисовок станет меньше.",
    parameters: "Параметры",
    returns: "Возвращает",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    paramInterval:
      "Период обновления в мс. Компоненты с одинаковым интервалом делят один таймер",
    returnValue:
      "Текущее время в мс, как Date.now(). На сервере и во время гидрации null",
    features: "Возможности",
    featureShared: "Общий таймер",
    featureSharedText:
      "Один setInterval на каждое значение интервала, останавливается, когда отписался последний компонент",
    featureHydration: "Без ошибок гидрации",
    featureHydrationText:
      "Работает на useSyncExternalStore, на сервере отдаёт null, поэтому разметка всегда совпадает",
    featureVisible: "Догоняет после фона",
    featureVisibleText:
      "В скрытой вкладке браузер замедляет таймеры, поэтому значение обновляется сразу, как только вкладку снова видно",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useNow", description: t.description }
}

export default async function UseNowPage({ params }: Props) {
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

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useNow" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseNowDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-now" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { useNow } from "@/hooks/use-now"

export function Clock() {
  const now = useNow(1000)

  // null on the server and during hydration
  if (now === null) return <span>--:--:--</span>

  return <span>{new Date(now).toLocaleTimeString()}</span>
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.countdownTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.countdownText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <UseNowCountdownDemo />
              </div>
              <CodeBlock className="mt-4">{`function Countdown({ deadline }: { deadline: number }) {
  const now = useNow(1000)
  if (now === null) return null

  const left = Math.max(0, deadline - now)
  const minutes = Math.floor(left / 60_000)
  const seconds = Math.floor((left % 60_000) / 1000)

  return <span>{minutes}:{String(seconds).padStart(2, "0")}</span>
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.sharedTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.sharedText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <UseNowSharedDemo />
              </div>
              <CodeBlock className="mt-4">{`function Tile() {
  const now = useNow(1000)
  return <div>{now === null ? "00" : new Date(now).getSeconds()}</div>
}

// three components, one timer
<Tile />
<Tile />
<Tile />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.coarseTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.coarseText}
              </p>
              <CodeBlock>{`function LastSeen({ at }: { at: number }) {
  // re-render once a minute
  const now = useNow(60_000)
  if (now === null) return null

  const minutes = Math.round((now - at) / 60_000)
  return <span>{minutes} min ago</span>
}`}</CodeBlock>
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
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">interval</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">1000</td>
                  <td className="p-3">{t.paramInterval}</td>
                </tr>
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
                    {t.headers.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">number | null</td>
                  <td className="p-3">{t.returnValue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">{t.featureShared}.</strong>{" "}
              {t.featureSharedText}
            </li>
            <li>
              <strong className="text-foreground">{t.featureHydration}.</strong>{" "}
              {t.featureHydrationText}
            </li>
            <li>
              <strong className="text-foreground">{t.featureVisible}.</strong>{" "}
              {t.featureVisibleText}
            </li>
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
