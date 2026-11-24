import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ConvertLayoutDemo,
  UseKeyboardLayoutDemo,
} from "./use-keyboard-layout-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Spot text typed on the wrong keyboard layout and fix it",
  intro:
    'useKeyboardLayout notices when text was typed with the wrong layout switched on, Russian (JCUKEN) instead of English (QWERTY) or the other way round, and offers the corrected text. "ghbdtn" turns into the Russian word for "hello". The conversion and the check are pure functions you can use without React.',
  preview: "Preview",
  previewHint:
    "Pick a sample or type with the wrong layout. The hint appears when most words look mistyped.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  convertTitle: "Plain conversion",
  convertText:
    "convertLayout maps every character to the same key on the other layout, with no guessing. Shift characters are covered too: ? on one layout is , on the other.",
  blurTitle: "Fix on blur",
  blurText:
    "For search boxes you can fix the query quietly when the field loses focus, and keep the original in case the user wants it back.",
  detectTitle: "Check without the hook",
  detectText:
    "detectLayoutMismatch converts only the words that look mistyped and leaves the rest alone, so mixed text keeps its real English words.",
  parameters: "Parameters",
  returns: "Returns",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  paramValue: "Current text of the field",
  paramExpected:
    "Layout the field expects. Only words in the other script are checked. Omit to check both directions",
  paramMinLength:
    "Ignore text with fewer letters, so one key press does not trigger a hint",
  paramOnFix: "Receives the corrected text when fix() is called",
  returnMismatch: "Most words look typed on the wrong layout",
  returnSuggestion: "Corrected text, or null when there is nothing to fix",
  returnTyped: "Layout the text was actually typed on",
  returnFix: "Sends the suggestion to onFix and returns it",
  functions: "Functions",
  fnConvert: "Convert every character to the other layout",
  fnDetect: "Check the text and build the corrected version",
  fnDetectLayout: "Which script dominates the text, or null without letters",
  features: "How it decides",
  featureText:
    "Each word gets a score for how unlike a real word it looks: no vowels, long consonant runs, letter pairs that never occur, punctuation between letters. If the converted word scores better than the original, the word counts as mistyped. The text is flagged when more than half of the checked words are.",
  limitsText:
    "Without a dictionary, short words that make sense on both layouts can slip through. That is the price of a few kilobytes instead of a word list.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Находит текст, набранный не в той раскладке, и исправляет его",
    intro:
      "useKeyboardLayout замечает, что текст набран не в той раскладке, русской (ЙЦУКЕН) вместо английской (QWERTY) или наоборот, и предлагает исправленный вариант: «ghbdtn» превращается в «привет». Перевод и проверка сделаны чистыми функциями, их можно вызывать и без React.",
    preview: "Превью",
    previewHint:
      "Выберите пример или наберите текст в другой раскладке. Подсказка появляется, когда большинство слов похожи на ошибку раскладки.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    convertTitle: "Простой перевод",
    convertText:
      "convertLayout заменяет каждый символ на тот, что стоит на той же клавише в другой раскладке, ничего не угадывая. Символы с Shift тоже учтены: ? в одной раскладке — это , в другой.",
    blurTitle: "Исправление при потере фокуса",
    blurText:
      "В поиске запрос можно тихо исправить, когда поле теряет фокус, и сохранить исходный на случай, если человек захочет вернуть его.",
    detectTitle: "Проверка без хука",
    detectText:
      "detectLayoutMismatch переводит только те слова, что похожи на ошибку, а остальные не трогает. Настоящие английские слова в смешанном тексте остаются как есть.",
    parameters: "Параметры",
    returns: "Возвращает",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    paramValue: "Текущий текст поля",
    paramExpected:
      "Раскладка, которую ждёт поле. Проверяются только слова в другом алфавите. Без него проверка идёт в обе стороны",
    paramMinLength:
      "Текст короче этого числа букв не проверяется, чтобы подсказка не мигала с первой клавиши",
    paramOnFix: "Получает исправленный текст при вызове fix()",
    returnMismatch: "Большинство слов похожи на набранные не в той раскладке",
    returnSuggestion: "Исправленный текст или null, если исправлять нечего",
    returnTyped: "Раскладка, в которой текст был набран на самом деле",
    returnFix: "Передаёт исправленный текст в onFix и возвращает его",
    functions: "Функции",
    fnConvert: "Перевести каждый символ в другую раскладку",
    fnDetect: "Проверить текст и собрать исправленный вариант",
    fnDetectLayout:
      "Какой алфавит преобладает в тексте, или null, если букв нет",
    features: "Как принимается решение",
    featureText:
      "Каждое слово получает оценку того, насколько оно не похоже на настоящее: нет гласных, длинные цепочки согласных, буквосочетания, которых не бывает, знаки препинания между буквами. Если переведённое слово выглядит правдоподобнее исходного, слово считается ошибкой раскладки. Текст помечается, когда таких слов больше половины.",
    limitsText:
      "Словаря нет, поэтому короткие слова, осмысленные в обеих раскладках, иногда проскакивают. Это плата за несколько килобайт вместо списка слов.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useKeyboardLayout", description: t.description }
}

export default async function UseKeyboardLayoutPage({ params }: Props) {
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
    { id: "functions", title: t.functions, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const params4: [string, string, string, string][] = [
    ["value", "string", "-", t.paramValue],
    ["options.expected", '"en" | "ru"', "-", t.paramExpected],
    ["options.minLength", "number", "2", t.paramMinLength],
    ["options.onFix", "(fixed: string) => void", "-", t.paramOnFix],
  ]

  const returns: [string, string, string][] = [
    ["mismatch", "boolean", t.returnMismatch],
    ["suggestion", "string | null", t.returnSuggestion],
    ["typedLayout", '"en" | "ru" | null', t.returnTyped],
    ["fix", "() => string", t.returnFix],
  ]

  const functions: [string, string][] = [
    ["convertLayout(text, to)", t.fnConvert],
    [
      "detectLayoutMismatch(text, expected?) → { mismatch, fixed, from }",
      t.fnDetect,
    ],
    ["detectLayout(text)", t.fnDetectLayout],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useKeyboardLayout" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseKeyboardLayoutDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-keyboard-layout" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useKeyboardLayout } from "@/hooks/use-keyboard-layout"

export function NameField() {
  const [value, setValue] = useState("")
  const { mismatch, suggestion, fix } = useKeyboardLayout(value, {
    expected: "ru",
    onFix: setValue,
  })

  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      {mismatch && (
        <Button type="button" onClick={fix}>
          Did you mean {suggestion}?
        </Button>
      )}
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
              <h3 className="text-lg font-medium mb-3">{t.convertTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.convertText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ConvertLayoutDemo />
              </div>
              <CodeBlock className="mt-4">{`import { convertLayout } from "@/hooks/use-keyboard-layout"

convertLayout("ghbdtn", "ru") // the Russian word for "hello"
convertLayout(input, "en")    // Cyrillic keys back to QWERTY`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.blurTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.blurText}</p>
              <CodeBlock>{`import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const [query, setQuery] = useState("")
const [original, setOriginal] = useState<string | null>(null)
const { mismatch, fix } = useKeyboardLayout(query, {
  onFix: (fixed) => {
    setOriginal(query)
    setQuery(fixed)
  },
})

<Input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onBlur={() => mismatch && fix()}
/>
{original && (
  <Button type="button" onClick={() => setQuery(original)}>
    Search for "{original}" instead
  </Button>
)}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.detectTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.detectText}
              </p>
              <CodeBlock>{`import { detectLayoutMismatch } from "@/hooks/use-keyboard-layout"

const result = detectLayoutMismatch("ghbdtn vbh", "ru")
// result.mismatch → true
// result.from     → "en"
// result.fixed    → the same phrase on the Russian layout

detectLayoutMismatch("hello", "ru").mismatch
// → false: "hello" is a real word, it stays as is`}</CodeBlock>
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
                {params4.map(([name, type, def, desc]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{desc}</td>
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
                {returns.map(([name, type, desc]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="functions" className={h2}>
            {t.functions}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {functions.map(([name, desc]) => (
                  <tr key={name} className="border-t first:border-t-0">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3">{desc}</td>
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
          <p className="text-muted-foreground">{t.featureText}</p>
          <p className="text-muted-foreground">{t.limitsText}</p>
        </div>
      </div>
    </DocsPage>
  )
}
