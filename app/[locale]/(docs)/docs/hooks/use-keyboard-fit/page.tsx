import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  UseKeyboardFitDemo,
  UseKeyboardFitSimulation,
} from "./use-keyboard-fit-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description:
    "On-screen keyboard height from visualViewport, as a value and CSS vars",
  intro:
    "useKeyboardFit watches visualViewport and reports how much of the screen the on-screen keyboard covers. The same numbers go to CSS variables on <html>, so bottom bars and chat inputs can sit above the iOS keyboard, which overlays the page instead of resizing it.",
  browserSupportText:
    "VisualViewport is available in all current browsers. Where it is missing, the hook does nothing and returns a closed keyboard, so layouts fall back to their normal position.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  parameters: "Parameters",
  returns: "Returns",
  features: "Features",
  browserSupport: "Browser Support",
  supportDescription0: "Tracks the viewport when the keyboard opens.",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  ex0Title: "Pinned bar above the keyboard",
  ex0Text:
    "Drag the slider to see what --keyboard-height does to a fixed bar. On a real phone the hook sets the value for you.",
  ex1Title: "Fit a screen into the visible area",
  ex1Text:
    "--viewport-height and --viewport-top describe the part of the page you can see. Size a full-screen form with them to keep the task and the field in view.",
  ex2Title: "Any focused element",
  ex2Text:
    "By default the keyboard counts as open only while a text field has focus, which filters out zoom and toolbars. Turn it off for custom editors.",
  param0: "Smaller overlaps count as browser toolbars, not a keyboard",
  param1: "Count the keyboard as open only while a text field is focused",
  param2: "Stop tracking and remove the CSS variables",
  return0: "Height of the screen covered by the keyboard, in px. 0 when closed",
  return1: "Whether the keyboard is open",
  return2: "Same as height, on <html>",
  return3: "Size and offset of the visible area",
  return4: "Present on <html> while the keyboard is open",
  feature0: "Ignores pinch zoom",
  feature0Text:
    "Zooming in also shrinks the visible area, but scale above 1 is not treated as a keyboard",
  feature1: "Works in installed web apps",
  feature1Text:
    "Compares against the tallest height seen at the current width, which also covers apps launched from the home screen",
  feature2: "Cleans up",
  feature2Text:
    "On unmount the variables and the attribute are removed from <html>",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Высота экранной клавиатуры из visualViewport: значение и CSS-переменные",
    intro:
      "useKeyboardFit следит за visualViewport и сообщает, какую часть экрана закрыла экранная клавиатура. Те же числа попадают в CSS-переменные на <html>, и нижние панели и поле ввода чата встают над клавиатурой iOS, которая не сжимает страницу, а ложится поверх.",
    browserSupportText:
      "VisualViewport есть во всех актуальных браузерах. Если его нет, хук ничего не делает и считает клавиатуру закрытой, а вёрстка остаётся на обычном месте.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    parameters: "Параметры",
    returns: "Возвращает",
    features: "Возможности",
    browserSupport: "Поддержка браузеров",
    supportDescription0:
      "Отслеживает область просмотра при открытии клавиатуры.",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    ex0Title: "Панель над клавиатурой",
    ex0Text:
      "Подвигайте ползунок, чтобы увидеть, что --keyboard-height делает с прижатой панелью. На телефоне значение выставит хук.",
    ex1Title: "Экран по видимой области",
    ex1Text:
      "--viewport-height и --viewport-top описывают видимую часть страницы. Задайте по ним размер полноэкранной формы, и задание с полем останутся на виду.",
    ex2Title: "Любой элемент в фокусе",
    ex2Text:
      "По умолчанию клавиатура считается открытой, только пока фокус в текстовом поле: так не мешают масштаб и панели браузера. Для своих редакторов это можно отключить.",
    param0:
      "Перекрытие меньше этого считается панелью браузера, а не клавиатурой",
    param1: "Считать клавиатуру открытой, только пока в фокусе текстовое поле",
    param2: "Перестать следить и убрать CSS-переменные",
    return0: "Сколько px экрана закрыла клавиатура. 0, если закрыта",
    return1: "Открыта ли клавиатура",
    return2: "То же, что height, на <html>",
    return3: "Размер и сдвиг видимой области",
    return4: "Висит на <html>, пока клавиатура открыта",
    feature0: "Не путает с масштабом",
    feature0Text:
      "При увеличении пальцами видимая область тоже уменьшается, но это не клавиатура",
    feature1: "Работает в установленном приложении",
    feature1Text:
      "Сравнивает с самой большой высотой при текущей ширине, поэтому работает и в приложении с экрана «Домой»",
    feature2: "Убирает за собой",
    feature2Text: "При размонтировании переменные и атрибут снимаются с <html>",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useKeyboardFit", description: t.description }
}

export default async function UseKeyboardFitPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "parameters", title: t.parameters, level: 2 },
    { id: "returns", title: t.returns, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const parameters = [
    ["options.minHeight", "number", "120", t.param0],
    ["options.requireFocus", "boolean", "true", t.param1],
    ["options.disabled", "boolean", "false", t.param2],
  ]
  const returns = [
    ["height", "number", t.return0],
    ["open", "boolean", t.return1],
    ["--keyboard-height", "CSS", t.return2],
    ["--viewport-height / --viewport-top", "CSS", t.return3],
    ["data-keyboard-open", "attribute", t.return4],
  ]
  const features = [
    [t.feature0, t.feature0Text],
    [t.feature1, t.feature1Text],
    [t.feature2, t.feature2Text],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useKeyboardFit" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "visual-viewport",
              description: t.supportDescription0,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseKeyboardFitDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-keyboard-fit" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Input } from "@/components/ui/input"

import { useKeyboardFit } from "@/hooks/use-keyboard-fit"

export function ChatComposer() {
  // call it once, high in the tree; it also sets the CSS variables
  const { open } = useKeyboardFit()

  return (
    <form
      className="fixed inset-x-0 bottom-[var(--keyboard-height,0px)] border-t bg-background p-2"
      data-raised={open}
    >
      <Input className="w-full" placeholder="Message" />
    </form>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex0Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex0Text}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <UseKeyboardFitSimulation />
              </div>
              <CodeBlock className="mt-4">{`.composer {
  position: fixed;
  inset-inline: 0;
  bottom: var(--keyboard-height, 0px);
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex1Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex1Text}</p>
              <CodeBlock>{`html[data-keyboard-open] .quiz-screen {
  position: fixed;
  top: var(--viewport-top);
  height: var(--viewport-height);
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex2Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex2Text}</p>
              <CodeBlock>{`const { height } = useKeyboardFit({ requireFocus: false, minHeight: 80 })`}</CodeBlock>
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
                {parameters.map(([name, type, value, description]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{value}</td>
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
            {features.map(([title, text]) => (
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
