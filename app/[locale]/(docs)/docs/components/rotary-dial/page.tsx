import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  RotaryDialCipherDemo,
  RotaryDialLockDemo,
  RotaryDialMonthDemo,
} from "./rotary-dial-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Circular selector that snaps to the nearest item",
  intro:
    "RotaryDial puts any items on a ring: letters, numbers or short labels. Turn it by dragging around the centre, with the mouse wheel or the arrow keys. On release the ring snaps to the nearest item, and the item under the pointer at the top is the value.",
  preview: "Preview",
  previewHint:
    "Drag the ring, scroll over it or focus it and press the arrows.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  cipherTitle: "Caesar cipher",
  cipherText:
    "outerItems adds a fixed ring. Each letter of the outer ring sits above its replacement on the inner one, so the shift is just the angle of the wheel.",
  lockTitle: "Combination lock",
  lockText:
    "Several small dials with digits. The value is an index, so it is easy to compare with a code.",
  centerTitle: "Custom centre",
  centerText:
    "renderCenter replaces the hub content. Short labels stay on the ring, the full name goes in the middle and in aria-valuetext.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propItems: "Items on the rotating ring, clockwise",
  propValue: "Index of the item under the pointer (controlled)",
  propDefaultValue: "Initial index when uncontrolled",
  propOnValueChange: "Called with the new index while turning and on release",
  propOuterItems: "Fixed outer ring to read against the rotating one",
  propSize: "Size in px",
  propRenderCenter: "Content of the hub. Shows the current item by default",
  propPageStep: "How many items PageUp and PageDown skip",
  propDisabled: "Turns off all interaction",
  propLabels: "aria-label of the dial and the announced value text",
  propClassName: "Additional CSS classes",
  varEasing:
    "CSS variable. Easing of snapping and stepping. Default is a damped spring in linear() with ~8% overshoot, cubic-bezier(0.34, 1.56, 0.64, 1) where linear() is unsupported",
  varDuration:
    "CSS variable. Duration of the turn. Under prefers-reduced-motion it becomes 120ms ease-out with no bounce",
  keyboard: "Keyboard",
  keyboardHeaders: { key: "Key", action: "Action" },
  keyArrows: "One item clockwise or counter-clockwise",
  keyPage: "Skip pageStep items",
  keyHome: "First item",
  keyEnd: "Last item",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Круговой селектор, который защёлкивается на ближайшем элементе",
    intro:
      "RotaryDial раскладывает элементы по кольцу: буквы, числа или короткие подписи. Кольцо крутят перетаскиванием вокруг центра, колесом мыши или стрелками. После отпускания оно встаёт на ближайший элемент. Значение — тот элемент, что оказался под меткой сверху.",
    preview: "Превью",
    previewHint:
      "Потяните кольцо, прокрутите колесо над ним или выберите его табом и нажимайте стрелки.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    cipherTitle: "Шифр Цезаря",
    cipherText:
      "outerItems добавляет неподвижное внешнее кольцо. Каждая буква снаружи стоит над своей заменой на внутреннем кольце, и сдвиг шифра превращается в угол поворота.",
    lockTitle: "Кодовый замок",
    lockText:
      "Несколько маленьких дисков с цифрами. Значение — индекс, его легко сравнить с кодом.",
    centerTitle: "Своя середина",
    centerText:
      "renderCenter заменяет содержимое ступицы. На кольце остаются короткие подписи, а полное название показывается в центре и попадает в aria-valuetext.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propItems: "Элементы вращающегося кольца по часовой стрелке",
    propValue: "Индекс элемента под меткой (контролируемый режим)",
    propDefaultValue: "Начальный индекс без контроля снаружи",
    propOnValueChange:
      "Получает новый индекс во время вращения и после отпускания",
    propOuterItems: "Неподвижное внешнее кольцо для сопоставления",
    propSize: "Размер в px",
    propRenderCenter: "Содержимое ступицы. По умолчанию текущий элемент",
    propPageStep: "На сколько элементов прыгают PageUp и PageDown",
    propDisabled: "Отключает всё управление",
    propLabels: "aria-label диска и текст, который озвучивает скринридер",
    propClassName: "Дополнительные CSS-классы",
    varEasing:
      "CSS-переменная. Кривая защёлкивания и шага. По умолчанию затухающая пружина в linear() с перелётом около 8%, где linear() не поддерживается — cubic-bezier(0.34, 1.56, 0.64, 1)",
    varDuration:
      "CSS-переменная. Длительность поворота. При prefers-reduced-motion становится 120ms ease-out без отскока",
    keyboard: "Клавиатура",
    keyboardHeaders: { key: "Клавиша", action: "Действие" },
    keyArrows: "На один элемент по часовой или против",
    keyPage: "На pageStep элементов",
    keyHome: "Первый элемент",
    keyEnd: "Последний элемент",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Rotary Dial", description: t.description }
}

export default async function RotaryDialPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "keyboard", title: t.keyboard, level: 2 },
  ]

  const rows: [string, string, string, string][] = [
    ["items", "readonly string[]", "-", t.propItems],
    ["value", "number", "-", t.propValue],
    ["defaultValue", "number", "0", t.propDefaultValue],
    ["onValueChange", "(index: number) => void", "-", t.propOnValueChange],
    ["outerItems", "readonly string[]", "-", t.propOuterItems],
    ["size", "number", "260", t.propSize],
    [
      "renderCenter",
      "(item: string, index: number) => ReactNode",
      "-",
      t.propRenderCenter,
    ],
    ["pageStep", "number", "5", t.propPageStep],
    ["disabled", "boolean", "false", t.propDisabled],
    [
      "labels",
      "{ label?: string; valueText?: (item, index) => string }",
      '{ label: "Dial" }',
      t.propLabels,
    ],
    ["className", "string", "-", t.propClassName],
    ["--rotary-dial-easing", "<easing-function>", "linear(…)", t.varEasing],
    ["--rotary-dial-duration", "<time>", "520ms", t.varDuration],
  ]

  const keys: [string, string][] = [
    ["← → ↑ ↓", t.keyArrows],
    ["PageUp / PageDown", t.keyPage],
    ["Home", t.keyHome],
    ["End", t.keyEnd],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Rotary Dial" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <RotaryDialMonthDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/rotary-dial" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { RotaryDial } from "@/components/ui/rotary-dial"

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

export default function Example() {
  const [index, setIndex] = useState(2)

  return (
    <RotaryDial
      items={sizes}
      value={index}
      onValueChange={setIndex}
      labels={{ label: "Size" }}
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
              <h3 className="text-lg font-medium mb-3">{t.cipherTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.cipherText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RotaryDialCipherDemo />
              </div>
              <CodeBlock className="mt-4">{`const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
)

const [shift, setShift] = useState(3)

<RotaryDial
  items={alphabet}
  outerItems={alphabet}
  value={shift}
  onValueChange={setShift}
  labels={{
    label: "Cipher wheel",
    valueText: (to, i) => \`Shift \${i}, A becomes \${to}\`,
  }}
  renderCenter={(to, i) => (
    <>
      <span className="font-mono text-2xl font-bold">{i}</span>
      <span className="font-mono text-xs">A → {to}</span>
    </>
  )}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.lockTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.lockText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RotaryDialLockDemo />
              </div>
              <CodeBlock className="mt-4">{`const digits = Array.from({ length: 10 }, (_, i) => String(i))
const [code, setCode] = useState([0, 0, 0])

{code.map((digit, slot) => (
  <RotaryDial
    key={slot}
    items={digits}
    value={digit}
    size={140}
    onValueChange={(d) =>
      setCode((prev) => prev.map((v, i) => (i === slot ? d : v)))
    }
    labels={{ label: \`Digit \${slot + 1}\` }}
  />
))}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.centerTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.centerText}
              </p>
              <CodeBlock>{`const short = ["Jan", "Feb", "Mar", /* … */ "Dec"]
const full = ["January", "February", "March", /* … */ "December"]

<RotaryDial
  items={short}
  defaultValue={5}
  labels={{ label: "Month", valueText: (_, i) => full[i] }}
  renderCenter={(_, i) => (
    <span className="text-lg font-semibold">{full[i]}</span>
  )}
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
                {rows.map(([prop, type, def, desc]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
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
          <h2 id="keyboard" className={h2}>
            {t.keyboard}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.keyboardHeaders.key}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.keyboardHeaders.action}
                  </th>
                </tr>
              </thead>
              <tbody>
                {keys.map(([key, action]) => (
                  <tr key={key} className="border-t">
                    <td className="p-3 font-mono text-xs">{key}</td>
                    <td className="p-3">{action}</td>
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
