import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  CopyFieldDemo,
  CopyFieldMaskedDemo,
  CopyFieldTruncateDemo,
} from "./copy-field-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Label and value row with an inline copy button",
  intro:
    'A “label: value” row for details pages and admin panels. The value sits in a field with a CopyButton (variant="inline") at its end: the icon turns into a check mark after copying. CopyField only adds the label, truncation and masking, copying itself is done by CopyButton and useCopyToClipboard.',
  browserSupport: "Browser Support",
  supportDescription0: "Copies the field value.",
  browserSupportText:
    "Copying goes through useCopyToClipboard: the async Clipboard API, and where it is missing or blocked, for example over plain http, a hidden textarea and document.execCommand.",
  preview: "Preview",
  previewHint:
    "Click the icon at the end of a field, or move to it with Tab and press Enter.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  truncateTitle: "Long values",
  truncateText:
    "By default a long value is cut to one line and the full text goes to the tooltip. With truncate={false} it wraps instead.",
  maskedTitle: "Masked value",
  maskedText:
    "displayValue changes what is shown, while the full value is still what gets copied.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pLabel: "Text before the value",
  pValue: "Value to show and copy",
  pDisplayValue: "What to show instead of value. Copying still uses value",
  pMono: "Monospace font for IDs, keys and codes",
  pTruncate: "Cut to one line with the full value in title",
  pTimeout: "How long the confirmation stays, in ms",
  pLabels: "Accessible names of the copy button before and after copying",
  pLabelClassName: "Classes for the label, e.g. a fixed width to align rows",
  pValueClassName: "Classes for the value",
  pOnCopy: "Called after a successful copy",
  pOnCopyError: "Called when the browser refuses to copy",
  pClassName: "Additional CSS classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Строка «подпись: значение» с кнопкой копирования в поле",
    intro:
      'Строка «подпись: значение» для карточек и админок. Значение лежит в поле, а в его конце стоит CopyButton (variant="inline"): после копирования иконка превращается в галочку. CopyField добавляет только подпись, обрезку и маскирование, а копирует CopyButton через useCopyToClipboard.',
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Копирует значение поля.",
    browserSupportText:
      "Копирование идёт через useCopyToClipboard: асинхронный Clipboard API, а если его нет или он заблокирован, например на обычном http, скрытое поле textarea и document.execCommand.",
    preview: "Превью",
    previewHint:
      "Кликните по иконке в конце поля или перейдите к ней по Tab и нажмите Enter.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    truncateTitle: "Длинные значения",
    truncateText:
      "По умолчанию длинное значение обрезается в одну строку, полный текст виден в подсказке. С truncate={false} оно переносится.",
    maskedTitle: "Скрытое значение",
    maskedText:
      "displayValue меняет то, что видно на экране, а копируется всё равно полное значение.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pLabel: "Подпись перед значением",
    pValue: "Значение, которое показывается и копируется",
    pDisplayValue: "Что показать вместо value. Копируется всё равно value",
    pMono: "Моноширинный шрифт для идентификаторов, ключей и кодов",
    pTruncate: "Обрезать в одну строку, полный текст в title",
    pTimeout: "Сколько мс видно подтверждение",
    pLabels: "Доступные имена кнопки копирования до и после копирования",
    pLabelClassName:
      "Классы подписи, например фиксированная ширина, чтобы строки выровнялись",
    pValueClassName: "Классы значения",
    pOnCopy: "Вызывается после успешного копирования",
    pOnCopyError: "Вызывается, если браузер не дал скопировать",
    pClassName: "Дополнительные CSS-классы",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Copy Field", description: t.description }
}

export default async function CopyFieldPage({ params }: Props) {
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
    ["label", "string", "-", t.pLabel],
    ["value", "string", "-", t.pValue],
    ["displayValue", "ReactNode", "-", t.pDisplayValue],
    ["mono", "boolean", "false", t.pMono],
    ["truncate", "boolean", "true", t.pTruncate],
    ["timeout", "number", "2000", t.pTimeout],
    [
      "labels",
      "{ copy?: string; copied?: string }",
      '{ copy: "Copy", copied: "Copied" }',
      t.pLabels,
    ],
    ["labelClassName", "string", "-", t.pLabelClassName],
    ["valueClassName", "string", "-", t.pValueClassName],
    ["onCopy", "(value: string) => void", "-", t.pOnCopy],
    ["onCopyError", "(error: Error) => void", "-", t.pOnCopyError],
    ["className", "string", "-", t.pClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Copy Field" />

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
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg px-4">
            <CopyFieldDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/copy-field" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { CopyField } from "@/components/ui/copy-field"

export function CustomerCard() {
  return (
    <div className="space-y-1">
      <CopyField label="Email" value="alex.morgan@example.com" labelClassName="w-20" />
      <CopyField label="Order" value="ORD-2048-7731" mono labelClassName="w-20" />
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
              <h3 className="text-lg font-medium mb-3">{t.truncateTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.truncateText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg px-4">
                <CopyFieldTruncateDemo />
              </div>
              <CodeBlock className="mt-4">{`<CopyField label="Address" value={address} />
<CopyField label="Address" value={address} truncate={false} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.maskedTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.maskedText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg px-4">
                <CopyFieldMaskedDemo />
              </div>
              <CodeBlock className="mt-4">{`<CopyField
  label="API key"
  value={apiKey}
  displayValue={\`\${apiKey.slice(0, 8)}••••••••\${apiKey.slice(-4)}\`}
  mono
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
