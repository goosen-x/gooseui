import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  UseCopyListDemo,
  UseCopyToastDemo,
  UseCopyToClipboardDemo,
} from "./use-copy-to-clipboard-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Copy text to the clipboard with a copied state that resets",
  intro:
    "useCopyToClipboard copies text and tells you it worked. The copied flag resets on a timer, and over plain http or in old browsers the hook falls back to a hidden textarea. It shows no toasts by itself, so you decide how to confirm.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  toastTitle: "With a toast",
  toastText:
    "Use onCopy and onError to show your own notification. The hook stays silent otherwise.",
  listTitle: "Many items, one hook",
  listText:
    "copiedText holds the last copied string, so a list can mark exactly the item that was copied.",
  parameters: "Parameters",
  returns: "Returns",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pTimeout: "How long copied stays true, in ms. 0 keeps it until the next copy",
  pOnCopy: "Called after a successful copy",
  pOnError: "Called when both the Clipboard API and the fallback fail",
  rCopy: "Copies the text. Resolves to true on success",
  rCopied: "true right after a successful copy",
  rCopiedText: "The last copied string while copied is true",
  rError: "The last error, cleared by the next successful copy",
  rReset: "Clears the state and the timer",
  features: "Features",
  f1: "Fallback",
  f1Text:
    "Without a secure context or navigator.clipboard it copies through a hidden textarea and puts focus and selection back.",
  f2: "No side effects",
  f2Text: "No toasts or styles inside. The hook only reports what happened.",
  f3: "Clean timers",
  f3Text: "A new copy restarts the reset timer, and unmounting clears it.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Копирование в буфер обмена с состоянием, которое сбрасывается само",
    intro:
      "useCopyToClipboard копирует текст и сообщает, что всё получилось. Флаг copied сбрасывается по таймеру, а на http без TLS или в старом браузере хук копирует через скрытое поле textarea. Тостов внутри нет, подтверждение вы показываете сами.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    toastTitle: "С уведомлением",
    toastText:
      "onCopy и onError позволяют показать своё уведомление. Без них хук ничего не выводит.",
    listTitle: "Много элементов, один хук",
    listText:
      "В copiedText лежит последняя скопированная строка, поэтому в списке можно отметить именно тот элемент, который скопировали.",
    parameters: "Параметры",
    returns: "Возвращает",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pTimeout:
      "Сколько мс copied остаётся true. При 0 держится до следующего копирования",
    pOnCopy: "Вызывается после успешного копирования",
    pOnError:
      "Вызывается, если не сработали ни Clipboard API, ни запасной способ",
    rCopy: "Копирует текст. Возвращает true, если получилось",
    rCopied: "true сразу после успешного копирования",
    rCopiedText: "Последняя скопированная строка, пока copied равно true",
    rError: "Последняя ошибка, очищается при следующем успешном копировании",
    rReset: "Сбрасывает состояние и таймер",
    features: "Возможности",
    f1: "Запасной способ",
    f1Text:
      "Без защищённого контекста или navigator.clipboard копирует через скрытое поле textarea и возвращает фокус и выделение на место.",
    f2: "Без побочных эффектов",
    f2Text: "Внутри нет тостов и стилей. Хук только сообщает, что произошло.",
    f3: "Аккуратные таймеры",
    f3Text:
      "Новое копирование перезапускает таймер сброса, а при размонтировании он очищается.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useCopyToClipboard", description: t.description }
}

export default async function UseCopyToClipboardPage({ params }: Props) {
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

  const params4: [string, string, string, string][] = [
    ["timeout", "number", "2000", t.pTimeout],
    ["onCopy", "(text: string) => void", "-", t.pOnCopy],
    ["onError", "(error: Error) => void", "-", t.pOnError],
  ]
  const returns: [string, string, string][] = [
    ["copy", "(text: string) => Promise<boolean>", t.rCopy],
    ["copied", "boolean", t.rCopied],
    ["copiedText", "string | null", t.rCopiedText],
    ["error", "Error | null", t.rError],
    ["reset", "() => void", t.rReset],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useCopyToClipboard" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseCopyToClipboardDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-copy-to-clipboard" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

export function CopyLink({ url }: { url: string }) {
  const { copy, copied } = useCopyToClipboard()

  return (
    <Button type="button" onClick={() => copy(url)}>
      {copied ? "Copied" : "Copy link"}
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
              <h3 className="text-lg font-medium mb-3">{t.toastTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.toastText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <UseCopyToastDemo />
              </div>
              <CodeBlock className="mt-4">{`import { toast } from "@/components/ui/toast"

const { copy } = useCopyToClipboard({
  onCopy: () => toast.success("Copied to clipboard"),
  onError: () => toast.error("Could not copy"),
})`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.listTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.listText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <UseCopyListDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Button } from "@/components/ui/button"

const { copy, copiedText } = useCopyToClipboard({ timeout: 1500 })

{colors.map((hex) => (
  <Button key={hex} type="button" onClick={() => copy(hex)}>
    {copiedText === hex ? "Copied" : hex}
  </Button>
))}`}</CodeBlock>
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
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {[
              [t.f1, t.f1Text],
              [t.f2, t.f2Text],
              [t.f3, t.f3Text],
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
