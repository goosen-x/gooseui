import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  PromptInputChatDemo,
  PromptInputCompactDemo,
  PromptInputDefaultDemo,
  PromptInputFeedbackDemo,
} from "./prompt-input-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description:
    "Chat composer with a growing textarea, file attachments and a send button that turns into stop",
  intro:
    "The message box of a chat with an AI assistant. The textarea grows with the text up to a maximum height, Enter sends and Shift+Enter adds a line (or Ctrl/⌘+Enter sends, if you prefer). Files are attached with the paperclip, by drag and drop or by pasting a screenshot. While a reply streams, the send button becomes a stop button. Parts are composable: put your own model picker or toggles into the toolbar.",
  browserSupport: "Browser Support",
  fieldSizing:
    "The textarea grows with its text up to max-height. Without it a small script sets the height from scrollHeight on every change.",
  has: "Draws the focus ring around the whole box when the textarea has keyboard focus, and the red border when the text is over maxLength. Without it the border still changes colour through :focus-within, and the counter turns red.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  compactTitle: "Compact reply",
  compactText:
    "The same parts in one row: className on PromptInput turns the column into a wrapping row, and the attachments take a full line above it.",
  feedbackTitle: "Feedback with Ctrl/⌘ + Enter",
  feedbackText:
    'submitOn="mod+enter" leaves Enter for new lines. Above maxLength the counter turns red and sending is blocked.',
  defaultTitle: "Default layout",
  defaultText:
    "Without children PromptInput renders the attachments, the textarea and a toolbar with the attach button, the counter and send. accept limits the picker, drop and paste to images and PDF.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pValue: "Controlled text",
  pDefaultValue: "Initial text when uncontrolled",
  pOnValueChange: "Called on every change of the text",
  pOnSubmit:
    "Called with the trimmed text and the attached files. The field is cleared afterwards",
  pStatus:
    "submitting shows a spinner, streaming turns the send button into stop. Both block sending",
  pOnStop: "Called by the stop button while streaming",
  pPlaceholder: "Placeholder of the textarea",
  pMaxLength:
    "Soft limit: the counter turns red and sending is blocked above it, the text itself is not cut",
  pSubmitOn: "Which shortcut sends. With enter, Shift+Enter adds a new line",
  pAccept:
    "File types for the picker, drop and paste, as in the accept attribute",
  pMaxFiles: "Maximum number of attachments",
  pDisabled: "Disables the whole box",
  pLabels: "Texts for screen readers and the drop overlay",
  pClassName: "Additional CSS classes for the form",
  components: "Components",
  componentHeader: "Component",
  cPromptInput:
    "The form and its state. Without children renders the default layout",
  cTextarea:
    "Growing textarea. Handles Enter, IME composition and pasted files",
  cAttachments: "Chips of attached files with image previews",
  cToolbar: "Row for buttons and your own controls. Server component",
  cAttach: "Paperclip button that opens the file picker",
  cCounter: "“12 / 500” counter, only with maxLength",
  cSubmit: "Send button, spinner while submitting, stop while streaming",
  cHook: "State and actions for your own parts: text, attachments, submit…",
  features: "Features",
  f1: "IME safe",
  f1Text:
    "Enter that confirms a Chinese or Japanese composition does not send the message.",
  f2: "Paste and drop",
  f2Text:
    "A pasted screenshot becomes an attachment; when the clipboard also has text, the text is kept. Dropping is handled by useFileDrop.",
  f3: "Server parts",
  f3Text:
    "PromptInput with its default layout and the toolbar are server components; state, keys and files live in prompt-input.client.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Поле сообщения для чата: растущий textarea, вложения и кнопка отправки, которая превращается в «Стоп»",
    intro:
      "Поле ввода для чата с ИИ-ассистентом. Textarea растёт вместе с текстом до предельной высоты, Enter отправляет, а Shift+Enter переносит строку (или отправка по Ctrl/⌘+Enter, если так удобнее). Файлы прикрепляются скрепкой, перетаскиванием или вставкой скриншота из буфера. Пока ответ печатается, кнопка отправки становится кнопкой «Стоп». Части собираются как угодно: в панель можно добавить свой выбор модели или переключатели.",
    browserSupport: "Поддержка браузеров",
    fieldSizing:
      "Textarea растёт вместе с текстом до max-height. Без поддержки небольшой скрипт выставляет высоту по scrollHeight при каждом изменении.",
    has: "Рисует кольцо фокуса вокруг всего поля, когда textarea в фокусе с клавиатуры, и красную рамку, когда текст длиннее maxLength. Без поддержки рамка всё равно меняет цвет через :focus-within, а счётчик краснеет.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    compactTitle: "Короткий ответ",
    compactText:
      "Те же части в одну строку: className у PromptInput превращает колонку в строку с переносом, а вложения занимают отдельную строку сверху.",
    feedbackTitle: "Отзыв с отправкой по Ctrl/⌘ + Enter",
    feedbackText:
      'submitOn="mod+enter" оставляет Enter для переноса строки. Если текст длиннее maxLength, счётчик краснеет и отправить нельзя.',
    defaultTitle: "Раскладка по умолчанию",
    defaultText:
      "Без children PromptInput выводит вложения, textarea и панель со скрепкой, счётчиком и кнопкой отправки. accept оставляет для выбора, перетаскивания и вставки только картинки и PDF.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pValue: "Текст в контролируемом режиме",
    pDefaultValue: "Начальный текст в неконтролируемом режиме",
    pOnValueChange: "Вызывается при каждом изменении текста",
    pOnSubmit:
      "Получает текст без пробелов по краям и прикреплённые файлы. После этого поле очищается",
    pStatus:
      "submitting показывает спиннер, streaming превращает кнопку отправки в «Стоп». В обоих случаях отправить нельзя",
    pOnStop: "Вызывается кнопкой «Стоп», пока идёт ответ",
    pPlaceholder: "Плейсхолдер textarea",
    pMaxLength:
      "Мягкий лимит: сверх него счётчик краснеет и отправка блокируется, сам текст не обрезается",
    pSubmitOn:
      "Какое сочетание отправляет. При enter перенос строки — Shift+Enter",
    pAccept:
      "Типы файлов для выбора, перетаскивания и вставки, как в атрибуте accept",
    pMaxFiles: "Максимальное число вложений",
    pDisabled: "Отключает всё поле",
    pLabels: "Тексты для скринридеров и подсказки при перетаскивании",
    pClassName: "Дополнительные CSS-классы формы",
    components: "Компоненты",
    componentHeader: "Компонент",
    cPromptInput:
      "Форма и её состояние. Без children выводит раскладку по умолчанию",
    cTextarea:
      "Растущий textarea. Обрабатывает Enter, ввод через IME и вставку файлов",
    cAttachments: "Плашки прикреплённых файлов с превью картинок",
    cToolbar: "Строка для кнопок и своих элементов. Серверный компонент",
    cAttach: "Кнопка-скрепка, открывает выбор файлов",
    cCounter: "Счётчик «12 / 500», только при maxLength",
    cSubmit:
      "Кнопка отправки: спиннер во время отправки, «Стоп» во время ответа",
    cHook: "Состояние и действия для своих частей: текст, вложения, submit…",
    features: "Возможности",
    f1: "Дружит с IME",
    f1Text:
      "Enter, которым подтверждают ввод китайских или японских символов, сообщение не отправляет.",
    f2: "Вставка и перетаскивание",
    f2Text:
      "Вставленный скриншот становится вложением; если в буфере есть ещё и текст, он тоже вставится. Перетаскивание обрабатывает useFileDrop.",
    f3: "Серверные части",
    f3Text:
      "PromptInput с раскладкой по умолчанию и панель — серверные компоненты; состояние, клавиши и файлы живут в prompt-input.client.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Prompt Input", description: t.description }
}

export default async function PromptInputPage({ params }: Props) {
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
    { id: "components", title: t.components, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const rows: [string, string, string, string][] = [
    ["value", "string", "-", t.pValue],
    ["defaultValue", "string", '""', t.pDefaultValue],
    ["onValueChange", "(value: string) => void", "-", t.pOnValueChange],
    [
      "onSubmit",
      "(message: { text: string; files: File[] }) => void",
      "-",
      t.pOnSubmit,
    ],
    ["status", '"idle" | "submitting" | "streaming"', '"idle"', t.pStatus],
    ["onStop", "() => void", "-", t.pOnStop],
    ["placeholder", "string", '"Send a message…"', t.pPlaceholder],
    ["maxLength", "number", "-", t.pMaxLength],
    ["submitOn", '"enter" | "mod+enter"', '"enter"', t.pSubmitOn],
    ["accept", "string", "-", t.pAccept],
    ["maxFiles", "number", "10", t.pMaxFiles],
    ["disabled", "boolean", "false", t.pDisabled],
    ["labels", "Partial<PromptInputLabels>", "English", t.pLabels],
    ["className", "string", "-", t.pClassName],
  ]

  const parts: [string, string][] = [
    ["PromptInput", t.cPromptInput],
    ["PromptInputTextarea", t.cTextarea],
    ["PromptInputAttachments", t.cAttachments],
    ["PromptInputToolbar", t.cToolbar],
    ["PromptInputAttachButton", t.cAttach],
    ["PromptInputCounter", t.cCounter],
    ["PromptInputSubmit", t.cSubmit],
    ["usePromptInput()", t.cHook],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Prompt Input" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            { featureId: "field-sizing", description: t.fieldSizing },
            { featureId: "has", description: t.has },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <PromptInputChatDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/prompt-input" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`"use client"

import { useRef, useState } from "react"
import {
  PromptInput,
  PromptInputAttachButton,
  PromptInputAttachments,
  PromptInputCounter,
  type PromptInputStatus,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ui/prompt-input"

export function Composer() {
  const [status, setStatus] = useState<PromptInputStatus>("idle")
  const controller = useRef<AbortController | null>(null)

  return (
    <PromptInput
      status={status}
      maxLength={2000}
      onStop={() => controller.current?.abort()}
      onSubmit={async ({ text, files }) => {
        controller.current = new AbortController()
        setStatus("streaming")
        try {
          await sendToModel(text, files, controller.current.signal)
        } finally {
          setStatus("idle")
        }
      }}
    >
      <PromptInputAttachments />
      <PromptInputTextarea />
      <PromptInputToolbar>
        <PromptInputAttachButton />
        <PromptInputCounter className="ml-auto" />
        <PromptInputSubmit />
      </PromptInputToolbar>
    </PromptInput>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.compactTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.compactText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <PromptInputCompactDemo />
              </div>
              <CodeBlock className="mt-4">{`<PromptInput
  onSubmit={({ text }) => reply(text)}
  placeholder="Reply to Priya"
  className="flex-row flex-wrap items-end gap-1 rounded-3xl p-1"
>
  <PromptInputAttachments className="basis-full" />
  <PromptInputAttachButton />
  <PromptInputTextarea className="max-h-32 min-h-8 min-w-0 flex-1 basis-0 px-1 py-1.5" />
  <PromptInputSubmit />
</PromptInput>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.feedbackTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.feedbackText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <PromptInputFeedbackDemo />
              </div>
              <CodeBlock className="mt-4">{`<PromptInput
  submitOn="mod+enter"
  maxLength={280}
  placeholder="What should we improve in the checkout flow?"
  onSubmit={({ text }) => sendFeedback(text)}
>
  <PromptInputTextarea className="min-h-20" />
  <PromptInputToolbar>
    <span className="text-muted-foreground text-xs">Ctrl/⌘ + Enter to send</span>
    <PromptInputCounter className="ml-auto" />
    <PromptInputSubmit />
  </PromptInputToolbar>
</PromptInput>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.defaultTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.defaultText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <PromptInputDefaultDemo />
              </div>
              <CodeBlock className="mt-4">{`<PromptInput
  accept="image/*,.pdf"
  placeholder="Describe the bug, attach a screenshot or PDF"
  onSubmit={({ text, files }) => createIssue(text, files)}
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
          <h2 id="components" className={h2}>
            {t.components}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.componentHeader}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {parts.map(([name, description]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
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
