import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  InstallCommandCustomDemo,
  InstallCommandDemo,
  InstallCommandSyncDemo,
} from "./install-command-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description:
    "Install command with npm, pnpm, yarn and bun tabs and a gliding pill",
  intro:
    "Shows a shadcn add command with tabs for npm, pnpm, yarn and bun. You pass the package once, and each manager gets its own runner: npx, pnpm dlx, yarn dlx, bunx. Built on Tabs, so the pill glides to the chosen tab and the command cross-fades without moving the layout. With storageKey the choice is remembered and every block on the page, and in other browser tabs, follows it.",
  browserSupport: "Browser Support",
  supportDescription0:
    "Anchor positioning moves the pill; the visible command is picked with :has(:checked).",
  browserSupportText:
    "The pill uses CSS anchor positioning, as in Tabs. Where it is missing, the active tab paints its own background and the switch is instant. Before hydration the native radios still switch the command.",
  preview: "Preview",
  previewHint:
    "Use the arrow keys to switch managers. The focus ring shows only for keyboard focus.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  customTitle: "Custom commands",
  customText:
    "commands replaces the generated command for any manager. Use it for packages that are not added with shadcn.",
  syncTitle: "Commands and sync",
  syncText:
    "Blocks with the same storageKey switch together. Pick a tab in one and the other follows.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pPackageName: "Package or registry URL to add, e.g. @gooseui/tabs",
  pDefaultPm: "Tab shown before the user picks one",
  pStorageKey:
    "localStorage key. When set, the choice is remembered and blocks with the same key stay in sync",
  pCommands: "Exact commands that replace the generated ones",
  pLabels: "Texts for the tab list and the copy button",
  pOnCopy: "Called after the command is copied",
  pOnCopyError: "Called when the browser refuses to copy",
  pClassName: "Additional CSS classes",
  features: "Features",
  f1: "One description",
  f1Text:
    "npx, pnpm dlx, yarn dlx and bunx shadcn@latest add for the package you pass.",
  f2: "Shared choice",
  f2Text:
    "the choice goes to localStorage and a custom event, so blocks and other open browser tabs stay in step.",
  f3: "Keyboard",
  f3Text:
    "native radios: Tab enters the group once, the arrow keys switch the manager. The focus ring shows for keyboard only.",
  f4: "Exports",
  f4Text:
    "getInstallCommand is exported too, if you need the same strings elsewhere.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Команда установки с вкладками npm, pnpm, yarn и bun и переезжающей подложкой",
    intro:
      "Показывает команду shadcn add с вкладками npm, pnpm, yarn и bun. Пакет вы передаёте один раз, а для каждого менеджера берётся свой запуск: npx, pnpm dlx, yarn dlx, bunx. Собран на Tabs: подложка плавно переезжает к выбранной вкладке, команда сменяется кроссфейдом, вёрстка не прыгает. Если задан storageKey, выбор запоминается, и все блоки на странице и в других вкладках браузера переключаются вместе.",
    browserSupport: "Поддержка браузеров",
    supportDescription0:
      "Подложку двигает anchor positioning, видимую команду выбирает :has(:checked).",
    browserSupportText:
      "Подложка использует CSS anchor positioning, как в Tabs. Где его нет, активная вкладка рисует свой фон и переключение мгновенное. До гидратации команду переключают нативные радиокнопки.",
    preview: "Превью",
    previewHint:
      "Менеджеры переключаются стрелками. Рамка фокуса видна только при управлении с клавиатуры.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    customTitle: "Свои команды",
    customText:
      "commands заменяет сгенерированную команду для любого менеджера. Пригодится для пакетов, которые ставятся не через shadcn.",
    syncTitle: "Команды и синхронизация",
    syncText:
      "Блоки с одним storageKey переключаются вместе. Выберите вкладку в одном, и второй последует за ней.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pPackageName: "Пакет или URL реестра, например @gooseui/tabs",
    pDefaultPm: "Вкладка, которая открыта, пока пользователь ничего не выбрал",
    pStorageKey:
      "Ключ в localStorage. Если задан, выбор запоминается, а блоки с одним ключом переключаются вместе",
    pCommands: "Готовые команды, которые заменяют сгенерированные",
    pLabels: "Тексты для списка вкладок и кнопки копирования",
    pOnCopy: "Вызывается после копирования команды",
    pOnCopyError: "Вызывается, если браузер не дал скопировать",
    pClassName: "Дополнительные CSS-классы",
    features: "Возможности",
    f1: "Одно описание",
    f1Text:
      "npx, pnpm dlx, yarn dlx и bunx shadcn@latest add для переданного пакета.",
    f2: "Общий выбор",
    f2Text:
      "выбор пишется в localStorage и в событие, поэтому блоки и соседние вкладки браузера остаются в одном состоянии.",
    f3: "Клавиатура",
    f3Text:
      "нативные радиокнопки: Tab попадает в группу один раз, стрелки переключают менеджер. Рамка фокуса только для клавиатуры.",
    f4: "Экспорт",
    f4Text:
      "getInstallCommand тоже экспортируется, если те же строки нужны где-то ещё.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Install Command", description: t.description }
}

export default async function InstallCommandPage({ params }: Props) {
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

  const rows: [string, string, string, string][] = [
    ["packageName", "string", "-", t.pPackageName],
    ["defaultPm", "PackageManager", '"npm"', t.pDefaultPm],
    ["storageKey", "string", "-", t.pStorageKey],
    ["commands", "Partial<Record<PackageManager, string>>", "-", t.pCommands],
    ["labels", "{ tabs?, copy?, copied? }", "-", t.pLabels],
    ["onCopy", "(command, manager) => void", "-", t.pOnCopy],
    ["onCopyError", "(error: Error) => void", "-", t.pOnCopyError],
    ["className", "string", "-", t.pClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Install Command" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.supportDescription0,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <InstallCommandDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/install-command" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { InstallCommand } from "@/components/ui/install-command"

export function GettingStarted() {
  return <InstallCommand packageName="@gooseui/button" storageKey="package-manager" />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.customTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.customText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <InstallCommandCustomDemo />
              </div>
              <CodeBlock className="mt-4">{`<InstallCommand
  packageName="motion"
  commands={{
    npm: "npm install motion",
    pnpm: "pnpm add motion",
    yarn: "yarn add motion",
    bun: "bun add motion",
  }}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.syncTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.syncText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <InstallCommandSyncDemo />
              </div>
              <CodeBlock className="mt-4">{`<InstallCommand packageName="@gooseui/tabs" storageKey="pm" />
<InstallCommand packageName="@gooseui/timeline" storageKey="pm" />
// pnpm dlx shadcn@latest add @gooseui/timeline
// yarn dlx shadcn@latest add @gooseui/timeline`}</CodeBlock>
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

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {[
              [t.f1, t.f1Text],
              [t.f2, t.f2Text],
              [t.f3, t.f3Text],
              [t.f4, t.f4Text],
            ].map(([title, text]) => (
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
