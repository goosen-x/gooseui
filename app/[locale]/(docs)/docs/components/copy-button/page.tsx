import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  CopyButtonDemo,
  CopyButtonToastDemo,
  CopyButtonVariantsDemo,
} from "./copy-button-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Copy button whose icon turns into a check mark",
  intro:
    "One button for every place that copies text, in three variants: a square icon button, a button with a label, and a small inline icon for the end of a field. The copy icon fades into a check mark and back, the text for screen readers changes with it, and the label stays the same width. Copying goes through useCopyToClipboard, the icons are inline SVG with no icon library. The button never shows a toast: hook onCopy and onCopyError up to your own.",
  browserSupport: "Browser Support",
  supportDescription0: "Copies text to the clipboard.",
  browserSupportText:
    "Copying goes through useCopyToClipboard: the async Clipboard API, and where it is missing or blocked, for example over plain http, a hidden textarea and document.execCommand.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  variantsTitle: "Variants and sizes",
  variantsText:
    'variant="icon" for tight spots next to code or tokens, variant="label" when the action needs words, variant="inline" inside a field. The last two sizes are sm and md.',
  toastTitle: "Toast through a callback",
  toastText:
    "onCopy fires once after a successful copy and onCopyError once after a failed one. Show a toast or send an analytics event there; the component itself knows nothing about toasts.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pValue: "Text to copy, or a function that returns it at click time",
  pVariant:
    "Square icon button, button with a label, or a small icon for a field",
  pSize: "Button size",
  pTimeout: "How long the check mark stays, in ms",
  pLabels:
    "Texts for the label and screen readers. For icon and inline they become aria-label",
  pOnCopy: "Called after a successful copy",
  pOnCopyError: "Called when copying failed",
  pClassName: "Additional CSS classes",
  features: "Features",
  f1: "Accessible",
  f1Text:
    "The accessible name switches to “Copied”, and a polite live region announces it.",
  f2: "Stable width",
  f2Text: "Both labels share one grid cell, so the button does not jump.",
  f3: "Reduced motion",
  f3Text: "With prefers-reduced-motion the icons swap without a transition.",
  f4: "Works over http",
  f4Text:
    "useCopyToClipboard falls back to a hidden textarea when the Clipboard API is not available.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Кнопка копирования, иконка которой превращается в галочку",
    intro:
      "Одна кнопка для всех мест, где копируют текст, в трёх видах: квадратная кнопка с иконкой, кнопка с подписью и маленькая иконка в конце поля. Иконка копирования плавно сменяется галочкой и возвращается обратно, текст для скринридера меняется вместе с ней, а ширина подписи не прыгает. Копирует хук useCopyToClipboard, иконки нарисованы инлайн-SVG без библиотеки. Тосты кнопка не показывает: подключите onCopy и onCopyError к своим.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Копирует текст в буфер обмена.",
    browserSupportText:
      "Копирование идёт через useCopyToClipboard: асинхронный Clipboard API, а если его нет или он заблокирован, например на обычном http, скрытое поле textarea и document.execCommand.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    variantsTitle: "Виды и размеры",
    variantsText:
      'variant="icon" для тесных мест рядом с кодом или токеном, variant="label", когда действие нужно подписать, variant="inline" внутри поля. Размеры: sm и md.',
    toastTitle: "Тост через колбэк",
    toastText:
      "onCopy срабатывает один раз после успешного копирования, onCopyError один раз после неудачного. Здесь удобно показать тост или отправить событие в аналитику; сам компонент про тосты ничего не знает.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pValue:
      "Текст для копирования или функция, которая вернёт его в момент клика",
    pVariant:
      "Квадратная кнопка с иконкой, кнопка с подписью или маленькая иконка для поля",
    pSize: "Размер кнопки",
    pTimeout: "Сколько мс показывается галочка",
    pLabels:
      "Тексты подписи и для скринридера. У icon и inline они идут в aria-label",
    pOnCopy: "Вызывается после успешного копирования",
    pOnCopyError: "Вызывается, если скопировать не удалось",
    pClassName: "Дополнительные CSS-классы",
    features: "Возможности",
    f1: "Доступность",
    f1Text:
      "Доступное имя меняется на «Скопировано», а вежливый live-регион его зачитывает.",
    f2: "Ширина не прыгает",
    f2Text: "Обе подписи лежат в одной ячейке сетки, кнопка не дёргается.",
    f3: "Меньше движения",
    f3Text: "При prefers-reduced-motion иконки меняются без перехода.",
    f4: "Работает по http",
    f4Text:
      "useCopyToClipboard копирует через скрытое поле textarea, когда Clipboard API недоступен.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Copy Button", description: t.description }
}

export default async function CopyButtonPage({ params }: Props) {
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
    ["value", "string | (() => string)", "-", t.pValue],
    ["variant", '"icon" | "label" | "inline"', '"icon"', t.pVariant],
    ["size", '"sm" | "md"', '"md"', t.pSize],
    ["timeout", "number", "2000", t.pTimeout],
    [
      "labels",
      "{ copy?: string; copied?: string }",
      '{ copy: "Copy", copied: "Copied" }',
      t.pLabels,
    ],
    ["onCopy", "(value: string) => void", "-", t.pOnCopy],
    ["onCopyError", "(error: Error) => void", "-", t.pOnCopyError],
    ["className", "string", "-", t.pClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Copy Button" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "async-clipboard",
              description: t.supportDescription0,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <CopyButtonDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/copy-button" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { CopyButton } from "@/components/ui/copy-button"

export function Token({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-2">
      <code>{value}</code>
      <CopyButton value={value} />
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
              <h3 className="text-lg font-medium mb-3">{t.variantsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.variantsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <CopyButtonVariantsDemo />
              </div>
              <CodeBlock className="mt-4">{`<CopyButton value={value} size="sm" />
<CopyButton value={value} />
<CopyButton value={value} variant="label" size="sm" />
<CopyButton value={value} variant="label" />
<CopyButton value={value} variant="inline" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.toastTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.toastText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <CopyButtonToastDemo />
              </div>
              <CodeBlock className="mt-4">{`<CopyButton
  value={inviteUrl}
  variant="label"
  labels={{ copy: "Copy link", copied: "Link copied" }}
  onCopy={() => toast.success("Link copied")}
  onCopyError={() => toast.error("Couldn't copy")}
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
