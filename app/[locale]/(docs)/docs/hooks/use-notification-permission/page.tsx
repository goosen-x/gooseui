import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { UseNotificationPermissionDemo } from "./use-notification-permission-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Browser notification permission with quiet days",
  intro:
    "useNotificationPermission reads the browser's notification permission, keeps it in sync when the user changes it in the site settings, and remembers when the user said no. Build your own offer on top of it, or use the ready",
  introLink: "Notification Prompt",
  introEnd: "banner.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  buttonTitle: "Your own button",
  buttonText:
    "Call request() from a click. The promise resolves to the final permission, or to “unsupported” where the browser has no Notification API.",
  quietTitle: "Quiet period",
  quietText:
    "After dismiss() the hook keeps shouldOffer false for dismissDays. Blocking the browser dialog does not count as a dismissal, the permission is simply “denied”.",
  parameters: "Parameters",
  returns: "Returns",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pDismissDays: "Days to stay quiet after a dismissal",
  pStorageKey: "localStorage key for the dismissal time",
  rPermission:
    '"default", "granted", "denied", or "unsupported" without the Notification API and on the server',
  rIsSupported: "The browser has the Notification API",
  rIsDismissed: "The user dismissed the offer less than dismissDays ago",
  rShouldOffer: "The permission is undecided and the user has not dismissed",
  rRequest: "Opens the browser dialog and resolves to the resulting permission",
  rDismiss: "Saves the dismissal time and hides the offer",
  rResetDismiss: "Forgets the dismissal",
  notes: "Notes",
  n1: "request() works only from a click or another user action. Browsers ignore or block it otherwise.",
  n2: "Once the permission is “denied”, the page cannot ask again. The user has to change it in the site settings.",
  n3: "iPhone Safari has the Notification API only for a site added to the home screen. Elsewhere permission is “unsupported”.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Разрешение на уведомления в браузере с периодом тишины",
    intro:
      "useNotificationPermission читает разрешение на уведомления, следит за ним, если пользователь поменял его в настройках сайта, и помнит, когда пользователь отказался. На нём можно собрать своё предложение или взять готовую плашку",
    introLink: "Notification Prompt",
    introEnd: ".",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    buttonTitle: "Своя кнопка",
    buttonText:
      "Вызывайте request() из клика. Промис вернёт итоговое разрешение или «unsupported», если в браузере нет Notification API.",
    quietTitle: "Период тишины",
    quietText:
      "После dismiss() хук держит shouldOffer равным false в течение dismissDays. Блокировка в окне браузера отказом не считается, разрешение просто становится «denied».",
    parameters: "Параметры",
    returns: "Возвращает",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pDismissDays: "Сколько дней молчать после отказа",
    pStorageKey: "Ключ в localStorage для времени отказа",
    rPermission:
      '"default", "granted", "denied" или "unsupported", если нет Notification API и на сервере',
    rIsSupported: "В браузере есть Notification API",
    rIsDismissed: "Пользователь отказался меньше dismissDays назад",
    rShouldOffer: "Разрешение не выбрано и отказа не было",
    rRequest: "Открывает окно браузера и возвращает итоговое разрешение",
    rDismiss: "Запоминает время отказа и прячет предложение",
    rResetDismiss: "Забывает отказ",
    notes: "Заметки",
    n1: "request() работает только из клика или другого действия пользователя. Иначе браузеры игнорируют запрос или блокируют его.",
    n2: "Когда разрешение стало «denied», страница не может спросить снова. Пользователь меняет его в настройках сайта.",
    n3: "В Safari на iPhone Notification API есть только у сайта, добавленного на главный экран. В остальных случаях разрешение «unsupported».",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useNotificationPermission", description: t.description }
}

export default async function UseNotificationPermissionPage({ params }: Props) {
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
    { id: "notes", title: t.notes, level: 2 },
  ]

  const params4: [string, string, string, string][] = [
    ["dismissDays", "number", "7", t.pDismissDays],
    [
      "storageKey",
      "string",
      '"notification-prompt-dismissed-at"',
      t.pStorageKey,
    ],
  ]
  const returns: [string, string, string][] = [
    [
      "permission",
      '"default" | "granted" | "denied" | "unsupported"',
      t.rPermission,
    ],
    ["isSupported", "boolean", t.rIsSupported],
    ["isDismissed", "boolean", t.rIsDismissed],
    ["shouldOffer", "boolean", t.rShouldOffer],
    ["request", "() => Promise<NotificationPermissionState>", t.rRequest],
    ["dismiss", "() => void", t.rDismiss],
    ["resetDismiss", "() => void", t.rResetDismiss],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useNotificationPermission" />

        <p className="text-muted-foreground">
          {t.intro}{" "}
          <Link
            href="/docs/components/notification-prompt"
            className="text-foreground underline underline-offset-4"
          >
            {t.introLink}
          </Link>
          {t.introEnd === "." ? "" : " "}
          {t.introEnd}
        </p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseNotificationPermissionDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-notification-permission" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

import { useNotificationPermission } from "@/hooks/use-notification-permission"

export function EnableNotifications() {
  const { shouldOffer, request } = useNotificationPermission()
  if (!shouldOffer) return null

  return (
    <Button type="button" onClick={() => request()}>
      Turn on notifications
    </Button>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.buttonTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.buttonText}
              </p>
              <CodeBlock>{`const { request } = useNotificationPermission()

async function enable() {
  const permission = await request()
  if (permission === "granted") {
    new Notification("Notifications are on")
  }
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.quietTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.quietText}
              </p>
              <CodeBlock>{`// ask again in a month
const notifications = useNotificationPermission({
  dismissDays: 30,
  storageKey: "my-app:notifications-dismissed",
})`}</CodeBlock>
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
                {params4.map(([name, type, def, description]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
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
          <h2 id="notes" className={h2}>
            {t.notes}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>{t.n1}</li>
            <li>{t.n2}</li>
            <li>{t.n3}</li>
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
