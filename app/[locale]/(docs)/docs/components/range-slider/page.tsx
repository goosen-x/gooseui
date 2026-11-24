import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  RangeSliderFieldsDemo,
  RangeSliderFormatDemo,
  RangeSliderPreviewDemo,
} from "./range-slider-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Groups related styles",
  auditFeature1Description: "Colors the slider focus ring",
  description: "Two-thumb range slider built on native range inputs",
  intro:
    "Picks a range with two thumbs. Under the hood there are two native range inputs stacked on top of each other, so keyboard, touch and screen readers work the way the browser already handles them. The fill between the thumbs is pure CSS: each thumb paints a band with border-image, so the slider looks right and submits its values before hydration. A few lines of client code keep the thumbs from crossing, update the value labels and call onValueChange. An edge value can be reported as null, meaning no limit.",
  browserSupport: "Browser Support",
  supportDescription0: "Groups the slider styles.",
  browserSupportText:
    "The styles use CSS nesting, Baseline widely available. CSS can't read the live value of a range input or stop one thumb at another, so that part stays in JavaScript; without it the thumbs work but can pass each other.",
  preview: "Preview",
  previewText: "Drag the thumbs or focus one and use the arrow keys.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  fieldsTitle: "With number fields and open edges",
  fieldsText:
    "With nullableEdges a thumb resting on its edge reports null, which fits filters like price from or price up to. The fields and the slider share one state, so typing a number moves a thumb and dragging updates the field.",
  formatTitle: "Formatted values",
  formatText:
    "formatValue changes the labels under the track and the aria-valuetext that screen readers announce. Here minGap keeps the range at least two hours long.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pValue: "Current range in controlled mode",
  pDefaultValue: "Initial range in uncontrolled mode",
  pOnValueChange: "Called with the new range on every move",
  pMin: "Lowest value",
  pMax: "Highest value",
  pStep: "Step of both thumbs",
  pMinGap: "Smallest allowed distance between the thumbs",
  pNullable: "Report a thumb on its edge as null",
  pFormatValue: "Formats value labels and aria-valuetext",
  pShowValues: "Show formatted values under the track",
  pName: "Form field prefix: inputs get name-min and name-max",
  pDisabled: "Turns off interaction",
  pLabels: "Accessible names of the lower and upper thumb",
  pClassName: "Additional CSS classes",
  features: "Features",
  featureList: [
    [
      "Native inputs",
      "arrow keys, Page Up and Page Down, Home and End work without extra code",
    ],
    [
      "No crossing",
      "each thumb stops at the other one plus minGap. The upper thumb is always on top, so when both sit at the end, drag the upper one first",
    ],
    [
      "CSS fill",
      "the thumbs paint the fill themselves, no width math in JavaScript and no jump on hydration",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Группирует связанные стили",
    auditFeature1Description: "Окрашивает кольцо фокуса ползунка",
    description: "Слайдер диапазона с двумя ручками на нативных range-полях",
    intro:
      "Выбор диапазона двумя ручками. Внутри два нативных поля type=range, наложенных друг на друга, поэтому клавиатура, касания и скринридеры работают так, как их уже обрабатывает браузер. Заливку между ручками рисует CSS: каждая ручка тянет за собой полосу через border-image, поэтому слайдер выглядит правильно и отправляет значения ещё до гидратации. Несколько строк клиентского кода не дают ручкам перескочить друг через друга, обновляют подписи и вызывают onValueChange. Значение на краю можно получать как null, то есть «без ограничения».",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Группирует стили ползунка.",
    browserSupportText:
      "Стили написаны с CSS nesting, это Baseline widely available. Живое значение range-поля CSS прочитать не может и остановить одну ручку о другую тоже, поэтому эта часть осталась на JavaScript. Без него ручки работают, но могут разойтись крест-накрест.",
    preview: "Превью",
    previewText:
      "Перетащите ручки или выберите одну по Tab и нажимайте стрелки.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    fieldsTitle: "С числовыми полями и открытыми краями",
    fieldsText:
      "С nullableEdges ручка на краю отдаёт null. Это удобно для фильтров «цена от» и «цена до». У полей и слайдера общее состояние: введёте число, и ручка сдвинется, потянете ручку, и обновится поле.",
    formatTitle: "Форматирование значений",
    formatText:
      "formatValue меняет подписи под дорожкой и aria-valuetext, который зачитывает скринридер. Здесь minGap не даёт сделать диапазон короче двух часов.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pValue: "Текущий диапазон в контролируемом режиме",
    pDefaultValue: "Начальный диапазон в неконтролируемом режиме",
    pOnValueChange: "Вызывается с новым диапазоном при каждом движении",
    pMin: "Нижняя граница",
    pMax: "Верхняя граница",
    pStep: "Шаг обеих ручек",
    pMinGap: "Минимальное расстояние между ручками",
    pNullable: "Отдавать null, когда ручка стоит на краю",
    pFormatValue: "Форматирует подписи и aria-valuetext",
    pShowValues: "Показывать значения под дорожкой",
    pName: "Префикс для формы: поля получат name-min и name-max",
    pDisabled: "Отключает взаимодействие",
    pLabels: "Имена нижней и верхней ручки для скринридера",
    pClassName: "Дополнительные CSS-классы",
    features: "Возможности",
    featureList: [
      [
        "Нативные поля",
        "стрелки, Page Up и Page Down, Home и End работают без лишнего кода",
      ],
      [
        "Без перескоков",
        "ручка упирается в соседнюю с учётом minGap. Верхняя ручка всегда сверху, поэтому если обе стоят в конце, сначала сдвиньте верхнюю",
      ],
      [
        "Заливка на CSS",
        "полосу рисуют сами ручки: никаких расчётов ширины в JavaScript и скачка при гидратации",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Range Slider", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function RangeSliderPage({ params }: Props) {
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

  const props: [string, string, string, string][] = [
    ["value", "RangeValue | NullableRangeValue", "-", t.pValue],
    [
      "defaultValue",
      "RangeValue | NullableRangeValue",
      "[min, max]",
      t.pDefaultValue,
    ],
    ["onValueChange", "(value) => void", "-", t.pOnValueChange],
    ["min", "number", "0", t.pMin],
    ["max", "number", "100", t.pMax],
    ["step", "number", "1", t.pStep],
    ["minGap", "number", "0", t.pMinGap],
    ["nullableEdges", "boolean", "false", t.pNullable],
    ["formatValue", "(value: number) => string", "String", t.pFormatValue],
    ["showValues", "boolean", "true", t.pShowValues],
    ["name", "string", "-", t.pName],
    ["disabled", "boolean", "false", t.pDisabled],
    ["labels", "{ min?: string; max?: string }", "-", t.pLabels],
    ["className", "string", "-", t.pClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Range Slider" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "nesting",
              description: t.auditFeature0Description,
            },
            {
              featureId: "color-mix",
              description: t.auditFeature1Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <RangeSliderPreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/range-slider" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { RangeSlider } from "@/components/ui/range-slider"

export default function Example() {
  const [value, setValue] = useState<[number, number]>([20, 80])

  return <RangeSlider value={value} onValueChange={setValue} />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.fieldsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.fieldsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RangeSliderFieldsDemo />
              </div>
              <CodeBlock className="mt-4">{`const [value, setValue] = useState<NullableRangeValue>([250, null])
const [from, to] = value

<RangeSlider
  nullableEdges
  min={0}
  max={2000}
  step={50}
  minGap={100}
  value={value}
  onValueChange={setValue}
  showValues={false}
/>
<Input
  type="number"
  placeholder="0"
  value={from ?? ""}
  onChange={(e) => setValue([e.target.value ? Number(e.target.value) : null, to])}
/>
<Input
  type="number"
  placeholder="2000"
  value={to ?? ""}
  onChange={(e) => setValue([from, e.target.value ? Number(e.target.value) : null])}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.formatTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.formatText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RangeSliderFormatDemo />
              </div>
              <CodeBlock className="mt-4">{`<RangeSlider
  min={0}
  max={24}
  minGap={2}
  defaultValue={[9, 18]}
  formatValue={(v) => \`\${String(v).padStart(2, "0")}:00\`}
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
                    {t.propsHeaders.prop}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.map(([name, type, def, desc]) => (
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
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {t.featureList.map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
