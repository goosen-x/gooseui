import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  QuantitySliderPlainDemo,
  QuantitySliderPreviewDemo,
  QuantitySliderUnitsDemo,
} from "./quantity-slider-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Styles elements based on their contents",
  auditFeature1Description: "Highlights the focused quantity field",
  description: "Quantity input with stepper buttons, a slider and a live total",
  intro:
    "A quantity picker for carts, plans and order forms. It combines minus and plus buttons, a number field you can type into, a slider with clickable ticks and a total whose digits flip one by one through Sliding Number. Optional units convert the amount when the buyer switches between them. The field, the slider and the unit switch are native inputs, and the slider fill is CSS. Client code keeps the field and the slider in sync, converts units and counts the total, because CSS can't do arithmetic on input values.",
  browserSupport: "Browser Support",
  supportDescription0: "Highlights the selected unit.",
  browserSupportText:
    "The unit switch is styled through :has(:checked). Without JavaScript the number field still works and submits on its own when there are no units.",
  preview: "Preview",
  previewText:
    "Use the buttons, type a number, drag the slider or click a tick.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  unitsTitle: "Unit switching",
  unitsText:
    "Each unit has a factor: how many base units it holds. value, min, max and unitPrice stay in base units, so switching units keeps the same amount and only changes what is shown. A unit can set its own step.",
  plainTitle: "Without a total",
  plainText:
    "Leave out unitPrice and the total disappears. ticks sets how many shortcut labels appear under the slider, 0 hides them.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pValue: "Quantity in base units, controlled mode",
  pDefaultValue: "Initial quantity in uncontrolled mode",
  pOnValueChange: "Called with the new quantity in base units",
  pMin: "Lowest quantity in base units",
  pMax: "Highest quantity in base units",
  pStep: "Step in base units",
  pUnitPrice: "Price of one base unit. Without it there is no total",
  pFormatTotal: "Formats the total",
  pFormatValue: "Formats tick labels and aria-valuetext",
  pUnits: "Units to switch between: { id, label, factor, step? }[]",
  pUnit: "Selected unit id in controlled mode",
  pDefaultUnit: "Initial unit id",
  pOnUnitChange: "Called with the new unit id",
  pTicks: "Number of tick labels under the slider",
  pDisabled: "Turns off interaction",
  pName:
    "Form field name. Without units the number field carries it, with units a hidden input sends the base quantity",
  pLabels: "Texts: quantity, decrease, increase, total, unit",
  pClassName: "Additional CSS classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Меняет стиль по содержимому",
    auditFeature1Description: "Подсвечивает поле количества при фокусе",
    description: "Поле количества с кнопками, ползунком и итоговой суммой",
    intro:
      "Выбор количества для корзины, тарифа или формы заказа. Кнопки «−» и «+», числовое поле, в которое можно печатать, ползунок с кликабельными делениями и итоговая сумма, цифры которой перелистываются через Sliding Number. Если передать единицы, количество пересчитывается при переключении между ними. Поле, ползунок и переключатель единиц сделаны на нативных input, заливка ползунка на CSS. Клиентский код держит поле и ползунок в согласии, пересчитывает единицы и считает сумму: арифметику над значениями полей CSS не умеет.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Выделяет выбранную единицу измерения.",
    browserSupportText:
      "Переключатель единиц оформлен через :has(:checked). Без JavaScript числовое поле продолжает работать и само уходит в форму, если единиц нет.",
    preview: "Превью",
    previewText:
      "Нажимайте кнопки, введите число, потяните ползунок или кликните по делению.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    unitsTitle: "Переключение единиц",
    unitsText:
      "У каждой единицы есть factor: сколько базовых единиц в ней помещается. value, min, max и unitPrice всегда в базовых единицах, поэтому при переключении количество остаётся тем же, меняется только то, что видно на экране. Шаг у единицы может быть свой.",
    plainTitle: "Без суммы",
    plainText:
      "Без unitPrice итог не показывается. ticks задаёт, сколько подписей-подсказок стоит под ползунком, 0 их убирает.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pValue: "Количество в базовых единицах, контролируемый режим",
    pDefaultValue: "Начальное количество в неконтролируемом режиме",
    pOnValueChange: "Вызывается с новым количеством в базовых единицах",
    pMin: "Минимум в базовых единицах",
    pMax: "Максимум в базовых единицах",
    pStep: "Шаг в базовых единицах",
    pUnitPrice: "Цена одной базовой единицы. Без неё итога нет",
    pFormatTotal: "Форматирует итоговую сумму",
    pFormatValue: "Форматирует подписи делений и aria-valuetext",
    pUnits: "Единицы для переключения: { id, label, factor, step? }[]",
    pUnit: "id выбранной единицы в контролируемом режиме",
    pDefaultUnit: "id начальной единицы",
    pOnUnitChange: "Вызывается с id новой единицы",
    pTicks: "Сколько подписей делений показать под ползунком",
    pDisabled: "Отключает взаимодействие",
    pName:
      "Имя поля формы. Без единиц его носит само числовое поле, с единицами скрытое поле отправляет количество в базовых единицах",
    pLabels: "Тексты: количество, уменьшить, увеличить, итого, единица",
    pClassName: "Дополнительные CSS-классы",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Quantity Slider", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function QuantitySliderPage({ params }: Props) {
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

  const props: [string, string, string, string][] = [
    ["value", "number", "-", t.pValue],
    ["defaultValue", "number", "min", t.pDefaultValue],
    ["onValueChange", "(value: number) => void", "-", t.pOnValueChange],
    ["min", "number", "1", t.pMin],
    ["max", "number", "100", t.pMax],
    ["step", "number", "1", t.pStep],
    ["unitPrice", "number", "-", t.pUnitPrice],
    ["formatTotal", "(total: number) => string", "USD", t.pFormatTotal],
    [
      "formatValue",
      "(value: number) => string",
      "toLocaleString",
      t.pFormatValue,
    ],
    ["units", "QuantityUnit[]", "-", t.pUnits],
    ["unit", "string", "-", t.pUnit],
    ["defaultUnit", "string", "units[0].id", t.pDefaultUnit],
    ["onUnitChange", "(unitId: string) => void", "-", t.pOnUnitChange],
    ["ticks", "number", "5", t.pTicks],
    ["disabled", "boolean", "false", t.pDisabled],
    ["name", "string", "-", t.pName],
    ["labels", "Partial<QuantitySliderLabels>", "-", t.pLabels],
    ["className", "string", "-", t.pClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Quantity Slider" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
            },
            {
              featureId: "focus-within",
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
            <QuantitySliderPreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/quantity-slider" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { QuantitySlider } from "@/components/ui/quantity-slider"

export default function Example() {
  const [seats, setSeats] = useState(8)

  return (
    <QuantitySlider
      min={1}
      max={50}
      value={seats}
      onValueChange={setSeats}
      unitPrice={12}
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
              <h3 className="text-lg font-medium mb-3">{t.unitsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.unitsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <QuantitySliderUnitsDemo />
              </div>
              <CodeBlock className="mt-4">{`const units = [
  { id: "kg", label: "kg", factor: 1, step: 0.25 },
  { id: "bag", label: "bags", factor: 0.25, step: 1 },
  { id: "sack", label: "sacks", factor: 5, step: 1 },
]

<QuantitySlider
  min={0.25}
  max={50}
  step={0.25}
  value={kg}
  onValueChange={setKg}
  units={units}
  unitPrice={18.5}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.plainTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.plainText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <QuantitySliderPlainDemo />
              </div>
              <CodeBlock className="mt-4">{`<QuantitySlider min={0} max={1000} step={10} defaultValue={250} ticks={3} />`}</CodeBlock>
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
      </div>
    </DocsPage>
  )
}
