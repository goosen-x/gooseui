import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ComboboxAsyncDemo,
  ComboboxFrameworkDemo,
  ComboboxTagsDemo,
} from "./combobox-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description:
    "Autocomplete field with a filtered list: one value, several as chips, or your own",
  intro:
    "A text field that filters a list of options as you type, following the WAI-ARIA combobox pattern. It picks one value, several values shown as removable chips, or text that matches no option. The list opens in the top layer and sits under the field through CSS anchor positioning, so overflow: hidden on a parent does not cut it. With a name, the value goes into the form through hidden inputs. The icons are inline SVG, there are no dependencies besides React.",
  browserSupport: "Browser Support",
  supportAnchor:
    "Places the list under the field and flips it up when there is no room below. Without it the list is a plain block under the field, inside the page flow.",
  supportPopover:
    "Puts the list in the top layer, above dialogs and clipped containers. Used together with anchor positioning only.",
  supportStarting:
    "Fades the list in when it opens. Without it the list appears at once.",
  supportTransition:
    "Fades the list out when it closes. Without it the list disappears at once.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  tagsTitle: "Several values, custom values, form",
  tagsText:
    "multiple shows the picked values as chips and keeps the list open after a pick. allowCustomValue adds an “Add” row for text that matches nothing. Options come from ComboboxOption children here, and name sends one hidden input per value.",
  asyncTitle: "Search on the server",
  asyncText:
    "filter={false} shows options exactly as you pass them. Control the typed text with inputValue and onInputValueChange, fetch results and show loading while the request runs.",
  textsTitle: "Your own texts",
  textsText:
    "All visible and announced texts are props. The functions have to come from a client component, as in this page’s demos.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pOptions: "Options as data. Ignored when ComboboxOption children are given",
  pChildren: "ComboboxOption elements, for custom content in a row",
  pMultiple: "Pick several values, shown as removable chips",
  pValue: "Selected value (controlled): a string, or an array with multiple",
  pDefaultValue: "Initial value when uncontrolled",
  pOnValueChange: "Called with the new value or array of values",
  pName: "Form field name. The value goes into hidden inputs",
  pPlaceholder: "Placeholder of the input",
  pDisabled: "Disables the field",
  pRequired: "The form will not submit while nothing is picked",
  pAllowCustom: "Accept text that matches no option (Enter or the Add row)",
  pInputValue: "Typed text (controlled)",
  pOnInputValueChange: "Called on every keystroke",
  pFilter:
    "Built-in filter by words of the label, your own function, or false for server-side search",
  pLoading: "Show a loading row instead of results",
  pLoadingMessage: "Text of the loading row",
  pEmptyMessage: "Text when nothing matches",
  pAddMessage: "Content of the Add row",
  pResultsMessage: "Result count for screen readers",
  pRemoveLabel: "Accessible name of the chip remove button",
  pInputProps: "Props for the inner <input>: id, aria-label, autoFocus…",
  components: "Components",
  componentHeader: "Component",
  cCombobox: "The field, chips, hidden inputs and the list",
  cOption:
    "Declarative option: value, label, description, disabled. Children replace the label in the list",
  features: "Features",
  featureList: [
    [
      "Keyboard",
      "arrows, Home/End, Enter, Escape clears the field, Backspace removes the last chip; focus stays in the input",
    ],
    [
      "Screen readers",
      "role combobox with aria-activedescendant, a listbox and a polite count of results",
    ],
    ["Highlighted matches", "typed words are marked in every option label"],
    [
      "Native forms",
      "hidden inputs with name, required while empty, reset through your own state",
    ],
    [
      "No positioning script",
      "anchor positioning in CSS; older browsers get a block under the field",
    ],
    ["Reduced motion", "the list opens without the fade and slide"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Поле с автодополнением: одно значение, несколько в виде чипов или своё",
    intro:
      "Текстовое поле, которое фильтрует список вариантов по мере ввода, по шаблону combobox из WAI-ARIA. Можно выбрать одно значение, несколько (они показываются чипами с крестиком) или ввести текст, которого нет в списке. Список открывается в верхнем слое и держится под полем благодаря CSS anchor positioning, поэтому overflow: hidden у родителя его не обрежет. Если задан name, значение уходит в форму через скрытые поля. Иконки нарисованы инлайн-SVG, зависимостей кроме React нет.",
    browserSupport: "Поддержка браузеров",
    supportAnchor:
      "Ставит список под поле и переворачивает наверх, если внизу нет места. Без него список становится обычным блоком под полем в потоке страницы.",
    supportPopover:
      "Выносит список в верхний слой, поверх диалогов и обрезающих контейнеров. Используется только вместе с anchor positioning.",
    supportStarting:
      "Плавно показывает список при открытии. Без него список появляется сразу.",
    supportTransition:
      "Плавно прячет список при закрытии. Без него список исчезает сразу.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    tagsTitle: "Несколько значений, свои значения, форма",
    tagsText:
      "multiple показывает выбранное чипами и не закрывает список после выбора. allowCustomValue добавляет строку «Добавить» для текста, которого нет в списке. Здесь варианты заданы детьми ComboboxOption, а name отправляет по скрытому полю на каждое значение.",
    asyncTitle: "Поиск на сервере",
    asyncText:
      "filter={false} показывает варианты ровно в том виде, в каком вы их передали. Управляйте введённым текстом через inputValue и onInputValueChange, запрашивайте результаты и включайте loading на время запроса.",
    textsTitle: "Свои тексты",
    textsText:
      "Все видимые и озвучиваемые тексты задаются пропсами. Функции нужно передавать из клиентского компонента, как в демо на этой странице.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pOptions:
      "Варианты в виде данных. Не используются, если переданы дети ComboboxOption",
    pChildren: "Элементы ComboboxOption, если в строке нужна своя разметка",
    pMultiple: "Выбор нескольких значений, показываются чипами с крестиком",
    pValue:
      "Выбранное значение (управляемый режим): строка, а с multiple массив",
    pDefaultValue: "Начальное значение в неуправляемом режиме",
    pOnValueChange: "Вызывается с новым значением или массивом значений",
    pName: "Имя поля формы. Значение уходит в скрытые поля",
    pPlaceholder: "Плейсхолдер поля ввода",
    pDisabled: "Делает поле недоступным",
    pRequired: "Форма не отправится, пока ничего не выбрано",
    pAllowCustom:
      "Принимать текст, которого нет в списке (Enter или строка «Добавить»)",
    pInputValue: "Введённый текст (управляемый режим)",
    pOnInputValueChange: "Вызывается на каждое нажатие",
    pFilter:
      "Встроенный фильтр по словам подписи, своя функция или false для поиска на сервере",
    pLoading: "Показать строку загрузки вместо результатов",
    pLoadingMessage: "Текст строки загрузки",
    pEmptyMessage: "Текст, когда ничего не нашлось",
    pAddMessage: "Содержимое строки «Добавить»",
    pResultsMessage: "Число результатов для скринридера",
    pRemoveLabel: "Доступное имя кнопки удаления чипа",
    pInputProps: "Пропсы внутреннего <input>: id, aria-label, autoFocus…",
    components: "Компоненты",
    componentHeader: "Компонент",
    cCombobox: "Поле, чипы, скрытые поля формы и список",
    cOption:
      "Вариант в разметке: value, label, description, disabled. Дети заменяют подпись в списке",
    features: "Возможности",
    featureList: [
      [
        "Клавиатура",
        "стрелки, Home/End, Enter, Escape очищает поле, Backspace удаляет последний чип; фокус всегда остаётся в поле",
      ],
      [
        "Скринридеры",
        "роль combobox с aria-activedescendant, listbox и вежливое объявление числа результатов",
      ],
      [
        "Подсветка совпадений",
        "введённые слова выделяются в подписи каждого варианта",
      ],
      [
        "Нативные формы",
        "скрытые поля с name, required, пока ничего не выбрано, сброс через ваше состояние",
      ],
      [
        "Без скрипта позиционирования",
        "anchor positioning на CSS; в старых браузерах блок под полем",
      ],
      ["Меньше движения", "список открывается без затухания и сдвига"],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Combobox", description: t.description }
}

export default async function ComboboxPage({ params }: Props) {
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
    ["options", "ComboboxOptionData[]", "-", t.pOptions],
    ["children", "ComboboxOption[]", "-", t.pChildren],
    ["multiple", "boolean", "false", t.pMultiple],
    ["value", "string | string[]", "-", t.pValue],
    ["defaultValue", "string | string[]", "-", t.pDefaultValue],
    [
      "onValueChange",
      "(value: string | string[]) => void",
      "-",
      t.pOnValueChange,
    ],
    ["name", "string", "-", t.pName],
    ["placeholder", "string", "-", t.pPlaceholder],
    ["disabled", "boolean", "false", t.pDisabled],
    ["required", "boolean", "false", t.pRequired],
    ["allowCustomValue", "boolean", "false", t.pAllowCustom],
    ["inputValue", "string", "-", t.pInputValue],
    [
      "onInputValueChange",
      "(text: string) => void",
      "-",
      t.pOnInputValueChange,
    ],
    ["filter", "boolean | (option, query) => boolean", "true", t.pFilter],
    ["loading", "boolean", "false", t.pLoading],
    ["loadingMessage", "ReactNode", '"Loading…"', t.pLoadingMessage],
    ["emptyMessage", "ReactNode", '"No results"', t.pEmptyMessage],
    ["addMessage", "(query: string) => ReactNode", "Add “…”", t.pAddMessage],
    [
      "resultsMessage",
      "(count: number) => string",
      '"N results"',
      t.pResultsMessage,
    ],
    ["removeLabel", "(label: string) => string", '"Remove …"', t.pRemoveLabel],
    ["inputProps", 'ComponentProps<"input">', "-", t.pInputProps],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Combobox" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            { featureId: "anchor-positioning", description: t.supportAnchor },
            { featureId: "popover", description: t.supportPopover },
            { featureId: "starting-style", description: t.supportStarting },
            {
              featureId: "transition-behavior",
              description: t.supportTransition,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <ComboboxFrameworkDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/combobox" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`"use client"

import * as React from "react"
import { Combobox } from "@/components/ui/combobox"

const frameworks = [
  { value: "next", label: "Next.js", description: "React, full-stack" },
  { value: "astro", label: "Astro", description: "Content sites, islands" },
  { value: "nuxt", label: "Nuxt", description: "Vue, full-stack" },
]

export function FrameworkPicker() {
  const [value, setValue] = React.useState("next")
  return (
    <Combobox
      options={frameworks}
      value={value}
      onValueChange={setValue}
      placeholder="Search frameworks…"
      inputProps={{ "aria-label": "Framework" }}
    />
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.tagsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.tagsText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <ComboboxTagsDemo />
              </div>
              <CodeBlock className="mt-4">{`<form action={saveLabels}>
  <Combobox
    multiple
    name="tags"
    allowCustomValue
    defaultValue={["bug", "needs-triage"]}
    placeholder="Add labels…"
  >
    <ComboboxOption value="bug" description="Something isn't working">bug</ComboboxOption>
    <ComboboxOption value="docs" description="Improvements to documentation">documentation</ComboboxOption>
    <ComboboxOption value="needs-triage">needs triage</ComboboxOption>
    <ComboboxOption value="wontfix" disabled>wontfix</ComboboxOption>
  </Combobox>
  <Button type="submit">Save labels</Button>
</form>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.asyncTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.asyncText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <ComboboxAsyncDemo />
              </div>
              <CodeBlock className="mt-4">{`const [text, setText] = React.useState("")
const [value, setValue] = React.useState("")
const { results, loading } = useCitySearch(text) // your fetch with debounce

<Combobox
  options={results}
  filter={false}
  loading={loading}
  loadingMessage="Searching cities…"
  emptyMessage={text ? "No city found" : "Type to search"}
  inputValue={text}
  onInputValueChange={setText}
  value={value}
  onValueChange={setValue}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.textsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.textsText}
              </p>
              <CodeBlock>{`<Combobox
  options={options}
  emptyMessage="Ничего не найдено"
  loadingMessage="Загрузка…"
  addMessage={(query) => <>Добавить «{query}»</>}
  resultsMessage={(count) => \`Найдено: \${count}\`}
  removeLabel={(label) => \`Удалить \${label}\`}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.headers.prop}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.type}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.default}
                  </th>
                  <th className="p-3 text-left font-medium">
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
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.componentHeader}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">Combobox</td>
                  <td className="p-3">{t.cCombobox}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">ComboboxOption</td>
                  <td className="p-3">{t.cOption}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
