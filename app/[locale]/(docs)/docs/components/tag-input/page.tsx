import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  TagInputDemo,
  TagInputDisabledDemo,
  TagInputEmailDemo,
  TagInputFormDemo,
} from "./tag-input-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Text field that turns typed or pasted text into removable tags",
  intro:
    "A text field that turns what you type into tags. Enter, comma or Tab adds a tag, pasting “a, b; c” adds several at once. Backspace in an empty field selects the last tag and a second Backspace removes it; the arrow keys, Home and End move between tags. Duplicates, a tag limit and your own validation show an error under the field, suggestions open as a listbox, and with name the tags are sent with an ordinary form.",
  browserSupport: "Browser Support",
  fieldSizing:
    "The text input grows with its text. Without it the input starts at 8ch and stretches to the end of the row, long text scrolls inside it.",
  has: "Draws the focus ring around the whole box when the inner input has keyboard focus. Without it the border still changes colour through :focus-within.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  emailTitle: "Email recipients with validation",
  emailText:
    "validate returns true or an error message. Rejected parts of a paste stay in the field so they can be fixed, valid ones become tags.",
  formTitle: "Limit and form submission",
  formText:
    "maxTags stops adding at five. name renders one hidden input per tag, so FormData.getAll returns the list.",
  disabledTitle: "Disabled",
  disabledText: "Tags lose the remove buttons and the field cannot be focused.",
  keyboardTitle: "Keyboard",
  keys: [
    ["Enter , Tab", "Adds the typed text, or the highlighted suggestion"],
    [
      "Backspace",
      "In an empty field selects the last tag, on a tag removes it",
    ],
    ["Delete", "Removes the selected tag"],
    ["← → Home End", "Move between tags and back to the field"],
    ["↓ ↑ Esc", "Open, move through and close the suggestions"],
  ] as [string, string][],
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pValue: "Controlled list of tags",
  pDefaultValue: "Initial tags when uncontrolled",
  pOnValueChange: "Called with the new list after a tag is added or removed",
  pDelimiters:
    "Keys that add a tag. Single characters also split pasted text (comma, semicolon, new line and tab always do)",
  pMaxTags: "Maximum number of tags",
  pValidate: "Return true to accept a tag or a message to reject it",
  pCaseSensitive: "Treat “React” and “react” as different tags",
  pSuggestions: "Options shown under the field while typing",
  pName: "Name for the hidden inputs, one per tag",
  pPlaceholder: "Shown while there are no tags",
  pId: "Id of the text input, for <label htmlFor>",
  pDisabled: "Disables the field and hides the remove buttons",
  pLabels:
    "Texts for the errors, the live region and the remove buttons, to translate them",
  pClassName: "Additional CSS classes",
  features: "Features",
  f1: "Screen readers",
  f1Text:
    "Added and removed tags are announced in a polite live region, the error is linked with aria-describedby, the suggestions are a combobox with aria-activedescendant.",
  f2: "IME and mobile keyboards",
  f2Text:
    "Enter during composition does not add a tag, and a comma typed on a keyboard that reports “Unidentified” is caught in the change event.",
  f3: "Roving focus",
  f3Text:
    "Only the text input is in the Tab order. Tags are reached with the arrows, so the field takes one Tab stop.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Поле, которое превращает введённый или вставленный текст в теги",
    intro:
      "Поле ввода, в котором текст превращается в теги. Enter, запятая или Tab добавляют тег, вставка «a, b; c» добавляет сразу несколько. Backspace в пустом поле выделяет последний тег, второй Backspace его удаляет; стрелки, Home и End переходят между тегами. Повторы, лимит и ваша проверка показывают ошибку под полем, подсказки открываются списком, а с name теги уходят вместе с обычной формой.",
    browserSupport: "Поддержка браузеров",
    fieldSizing:
      "Поле ввода растёт вместе с текстом. Без этого оно начинается с ширины 8ch и растягивается до конца строки, длинный текст прокручивается внутри.",
    has: "Рисует кольцо фокуса вокруг всего поля, когда внутренний input в фокусе с клавиатуры. Без поддержки рамка всё равно меняет цвет через :focus-within.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    emailTitle: "Получатели письма с проверкой",
    emailText:
      "validate возвращает true или текст ошибки. Отклонённые части вставки остаются в поле, чтобы их можно было поправить, а корректные становятся тегами.",
    formTitle: "Лимит и отправка формы",
    formText:
      "maxTags не даёт добавить больше пяти тегов. name выводит по скрытому input на каждый тег, поэтому FormData.getAll возвращает весь список.",
    disabledTitle: "Отключённое поле",
    disabledText: "У тегов пропадают крестики, поле не получает фокус.",
    keyboardTitle: "Клавиатура",
    keys: [
      ["Enter , Tab", "Добавляют введённый текст или подсвеченную подсказку"],
      [
        "Backspace",
        "В пустом поле выделяет последний тег, на теге удаляет его",
      ],
      ["Delete", "Удаляет выделенный тег"],
      ["← → Home End", "Переход между тегами и обратно в поле"],
      ["↓ ↑ Esc", "Открывают подсказки, двигаются по ним и закрывают"],
    ],
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pValue: "Список тегов в контролируемом режиме",
    pDefaultValue: "Начальные теги в неконтролируемом режиме",
    pOnValueChange: "Получает новый список после добавления или удаления тега",
    pDelimiters:
      "Клавиши, которые добавляют тег. Одиночные символы ещё и разбивают вставленный текст (запятая, точка с запятой, перевод строки и табуляция разбивают всегда)",
    pMaxTags: "Максимальное число тегов",
    pValidate:
      "Верните true, чтобы принять тег, или текст ошибки, чтобы отклонить",
    pCaseSensitive: "Считать «React» и «react» разными тегами",
    pSuggestions: "Варианты, которые показываются под полем при вводе",
    pName: "Имя скрытых input, по одному на тег",
    pPlaceholder: "Виден, пока тегов нет",
    pId: "id текстового поля для <label htmlFor>",
    pDisabled: "Отключает поле и прячет кнопки удаления",
    pLabels:
      "Тексты ошибок, live-региона и кнопок удаления, чтобы их перевести",
    pClassName: "Дополнительные CSS-классы",
    features: "Возможности",
    f1: "Скринридеры",
    f1Text:
      "О добавленных и удалённых тегах сообщает вежливый live-регион, ошибка связана с полем через aria-describedby, подсказки устроены как combobox с aria-activedescendant.",
    f2: "IME и мобильные клавиатуры",
    f2Text:
      "Enter во время набора через IME не добавляет тег, а запятую с клавиатуры, которая присылает «Unidentified», ловит событие change.",
    f3: "Один шаг Tab",
    f3Text:
      "В порядке Tab только текстовое поле. До тегов добираются стрелками, поэтому всё поле занимает одну остановку Tab.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Tag Input", description: t.description }
}

export default async function TagInputPage({ params }: Props) {
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
    ["value", "string[]", "-", t.pValue],
    ["defaultValue", "string[]", "[]", t.pDefaultValue],
    ["onValueChange", "(value: string[]) => void", "-", t.pOnValueChange],
    ["delimiters", "string[]", '["Enter", ",", "Tab"]', t.pDelimiters],
    ["maxTags", "number", "-", t.pMaxTags],
    ["validate", "(tag: string) => string | true", "-", t.pValidate],
    ["caseSensitive", "boolean", "false", t.pCaseSensitive],
    ["suggestions", "string[]", "-", t.pSuggestions],
    ["name", "string", "-", t.pName],
    ["placeholder", "string", "-", t.pPlaceholder],
    ["id", "string", "-", t.pId],
    ["disabled", "boolean", "false", t.pDisabled],
    ["labels", "Partial<TagInputLabels>", "English", t.pLabels],
    ["className", "string", "-", t.pClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Tag Input" />

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
            <TagInputDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/tag-input" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { TagInput } from "@/components/ui/tag-input"

export function SkillsField() {
  const [skills, setSkills] = useState(["React", "TypeScript"])
  return (
    <div className="grid gap-2">
      <Label htmlFor="skills">Skills</Label>
      <TagInput
        id="skills"
        value={skills}
        onValueChange={setSkills}
        suggestions={["Next.js", "Node.js", "PostgreSQL", "Figma"]}
        placeholder="Add a skill"
      />
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
              <h3 className="text-lg font-medium mb-3">{t.emailTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.emailText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <TagInputEmailDemo />
              </div>
              <CodeBlock className="mt-4">{`const EMAIL = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/

<TagInput
  id="recipients"
  value={recipients}
  onValueChange={setRecipients}
  placeholder="name@company.com"
  validate={(tag) =>
    EMAIL.test(tag) ? true : \`“\${tag}” is not a valid email address\`
  }
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.formTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.formText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <TagInputFormDemo />
              </div>
              <CodeBlock className="mt-4">{`<form
  onSubmit={(event) => {
    event.preventDefault()
    const topics = new FormData(event.currentTarget).getAll("topics")
  }}
>
  <TagInput
    name="topics"
    maxTags={5}
    defaultValue={["css", "web platform"]}
    placeholder="Add a topic"
  />
  <Button type="submit">Save topics</Button>
</form>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.disabledTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.disabledText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <TagInputDisabledDemo />
              </div>
              <CodeBlock className="mt-4">{`<TagInput
  aria-label="Labels"
  defaultValue={["billing", "priority: high"]}
  disabled
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
            ].map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}.</strong> {text}
              </li>
            ))}
          </ul>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <caption className="bg-muted p-3 text-left font-medium">
                {t.keyboardTitle}
              </caption>
              <tbody>
                {t.keys.map(([keys, text]) => (
                  <tr key={keys} className="border-t">
                    <td className="p-3 font-mono text-xs whitespace-nowrap">
                      {keys}
                    </td>
                    <td className="p-3">{text}</td>
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
