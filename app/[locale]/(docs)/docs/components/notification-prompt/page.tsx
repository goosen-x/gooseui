import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import {
  NotificationPromptCompactDemo,
  NotificationPromptDemo,
  NotificationPromptDeniedDemo,
} from "./notification-prompt-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Banner that asks the user to turn on browser notifications",
  intro:
    "A quiet banner that offers to turn on notifications. The browser dialog opens only after a click on “Allow”, because browsers ignore or block a request without a user gesture. “Not now” hides the banner for 7 days. When the permission is already granted, or the browser has no Notification API (iPhone Safari outside an installed app, for example), nothing is shown. JavaScript here only reads the permission and remembers the dismissal; the banner slides in with @starting-style and slides out with a discrete display transition.",
  browserSupport: "Browser Support",
  auditFeature0Description: "Shows the permission dialog and system messages",
  auditFeature1Description: "Animates the initial appearance",
  auditFeature2Description: "Animates closing",
  browserSupportText:
    "Without @starting-style and transition-behavior: allow-discrete the banner just appears and disappears.",
  preview: "Preview",
  previewNote:
    "The demo uses forceShow, so the banner is visible even when this browser has already answered. The button asks the browser for real, and a granted permission sends a test message.",
  installation: "Installation",
  installNote: "The banner is built on the",
  installNoteHook: "useNotificationPermission",
  installNoteEnd: "hook, which is installed along with it.",
  usage: "Usage",
  usageText:
    "The banner decides on its own. It shows up after a second, only while the permission is undecided and the user has not declined recently. To show it on an event instead of a timer, render it conditionally.",
  examples: "Examples",
  deniedTitle: "Hint when blocked",
  deniedText:
    "By default a blocked permission hides the banner, since the page cannot ask again. With whenDenied=“hint” the banner explains where to change it.",
  compactTitle: "Compact",
  compactText:
    "compact turns the banner into one row. For toolbars, sidebars and narrow places.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pDelay: "Milliseconds to wait before the banner appears",
  pWhenDenied: "What to do when the permission is already blocked",
  pCompact: "One row, no description",
  pFloating: "Pin to the bottom of the viewport",
  pIcon: "Icon on the left",
  pLabels: "All texts, including the hint for a blocked permission",
  pDismissDays: "Days to stay hidden after “Not now”",
  pStorageKey: "localStorage key for the dismissal time",
  pForceShow:
    "Show the banner whatever the permission is. For demos and design reviews, nothing is saved",
  pOnGranted: "Called when the user allows notifications",
  pOnDenied: "Called when the user blocks notifications",
  pOnDismiss: "Called when the user closes the banner",
  pClassName: "Additional CSS classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Плашка с просьбой включить уведомления в браузере",
    intro:
      "Ненавязчивая плашка с предложением включить уведомления. Системное окно браузера открывается только после клика по «Разрешить»: без жеста пользователя браузеры игнорируют запрос или блокируют его. «Не сейчас» прячет плашку на 7 дней. Если разрешение уже выдано или в браузере нет Notification API (например, Safari на iPhone вне установленного приложения), ничего не показывается. JavaScript здесь только читает разрешение и запоминает отказ, а плашка въезжает через @starting-style и уезжает через дискретный переход display.",
    browserSupport: "Поддержка браузеров",
    auditFeature0Description: "Показывает окно запроса разрешения и сообщения",
    auditFeature1Description: "Анимирует появление",
    auditFeature2Description: "Анимирует закрытие",
    browserSupportText:
      "Без @starting-style и transition-behavior: allow-discrete плашка просто появляется и исчезает.",
    preview: "Превью",
    previewNote:
      "В демо включён forceShow, поэтому плашка видна, даже если браузер уже ответил. Кнопка по-настоящему спрашивает браузер, а при выданном разрешении отправляет тестовое сообщение.",
    installation: "Установка",
    installNote: "Плашка работает на хуке",
    installNoteHook: "useNotificationPermission",
    installNoteEnd: ", он ставится вместе с ней.",
    usage: "Использование",
    usageText:
      "Плашка решает сама. Она появляется через секунду, только пока разрешение не выбрано и пользователь недавно не отказывался. Чтобы показать её по событию, а не по таймеру, рендерите её условно.",
    examples: "Примеры",
    deniedTitle: "Подсказка при блокировке",
    deniedText:
      "По умолчанию при заблокированном разрешении плашка скрыта: спросить повторно страница не может. С whenDenied=«hint» плашка объясняет, где это изменить.",
    compactTitle: "Компактная",
    compactText:
      "compact превращает плашку в одну строку. Для панелей, сайдбаров и узких мест.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pDelay: "Сколько миллисекунд ждать до появления плашки",
    pWhenDenied: "Что делать, если разрешение уже заблокировано",
    pCompact: "Одна строка, без описания",
    pFloating: "Прижать к низу окна",
    pIcon: "Иконка слева",
    pLabels: "Все тексты, включая подсказку для заблокированного разрешения",
    pDismissDays: "Сколько дней не показываться после «Не сейчас»",
    pStorageKey: "Ключ в localStorage для времени отказа",
    pForceShow:
      "Показать плашку при любом разрешении. Для демо и проверки дизайна, ничего не сохраняется",
    pOnGranted: "Вызывается, когда пользователь разрешил уведомления",
    pOnDenied: "Вызывается, когда пользователь заблокировал уведомления",
    pOnDismiss: "Вызывается, когда пользователь закрыл плашку",
    pClassName: "Дополнительные CSS-классы",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Notification Prompt", description: t.description }
}

export default async function NotificationPromptPage({ params }: Props) {
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
  ]

  const rows: [string, string, string, string][] = [
    ["delay", "number", "1000", t.pDelay],
    ["whenDenied", '"hide" | "hint"', '"hide"', t.pWhenDenied],
    ["compact", "boolean", "false", t.pCompact],
    ["floating", "boolean", "false", t.pFloating],
    ["icon", "ReactNode", "bell icon", t.pIcon],
    ["labels", "Partial<NotificationPromptLabels>", "-", t.pLabels],
    ["dismissDays", "number", "7", t.pDismissDays],
    [
      "storageKey",
      "string",
      '"notification-prompt-dismissed-at"',
      t.pStorageKey,
    ],
    ["forceShow", '"default" | "denied"', "-", t.pForceShow],
    ["onGranted", "() => void", "-", t.pOnGranted],
    ["onDenied", "() => void", "-", t.pOnDenied],
    ["onDismiss", "() => void", "-", t.pOnDismiss],
    ["className", "string", "-", t.pClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Notification Prompt" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "notifications",
              description: t.auditFeature0Description,
            },
            {
              featureId: "starting-style",
              description: t.auditFeature1Description,
            },
            {
              featureId: "transition-behavior",
              description: t.auditFeature2Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewNote}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <NotificationPromptDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/notification-prompt" />
          <p className="text-sm text-muted-foreground">
            {t.installNote}{" "}
            <Link
              href="/docs/hooks/use-notification-permission"
              className="underline underline-offset-4"
            >
              {t.installNoteHook}
            </Link>
            {t.installNoteEnd.startsWith(",") ? "" : " "}
            {t.installNoteEnd}
          </p>
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <p className="text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`import { NotificationPrompt } from "@/components/ui/notification-prompt"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NotificationPrompt
        floating
        onGranted={() => new Notification("Notifications are on")}
      />
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
              <h3 className="text-lg font-medium mb-3">{t.deniedTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.deniedText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <NotificationPromptDeniedDemo />
              </div>
              <CodeBlock className="mt-4">{`// forceShow="denied" is only for the demo; in a real app the banner
// switches to the hint on its own once the permission is blocked
<NotificationPrompt whenDenied="hint" forceShow="denied" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.compactTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.compactText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <NotificationPromptCompactDemo />
              </div>
              <CodeBlock className="mt-4">{`<NotificationPrompt
  compact
  delay={3000}
  dismissDays={30}
  labels={{ title: "Get a ping when your build finishes" }}
/>`}</CodeBlock>
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
                {rows.map(([prop, type, def, description]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
