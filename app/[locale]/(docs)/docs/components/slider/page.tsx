import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  SliderAnimatedValueDemo,
  SliderCustomFormatDemo,
  SliderDemo,
  SliderDisabledDemo,
  SliderGradientDemo,
  SliderSizesDemo,
  SliderStepDemo,
  SliderValueDisplayDemo,
} from "./demo"

const en = {
  intro:
    "Slider uses a native range input with min, max, step, name and disabled. It supports three sizes, controlled or uncontrolled values, and an optional formatted value label. Use it for selecting a number from a range; Input is better when an exact value needs to be typed.",
  browserSupport: "Browser Support",
  supportDescription0: "Colors the hover halo around the thumb.",
  browserSupportText:
    "The slider relies on long-supported CSS. Only the hover halo of the thumb uses color-mix(), Baseline widely available.",
  rangeSliderInputComponent:
    "Range slider input component with customizable styling",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  features: "Features",
  rangeSliderInputComponent2:
    'A native <input type="range"> with a styled track, thumb and fill. The fill is pure CSS: in Chrome and Safari the thumb paints it with a border-image that stretches to the left, Firefox has ::-moz-range-progress. The small client part only mirrors the value for the label and onValueChange, the input itself works without JavaScript and sends its value with the form through name.',
  dragTheSliderTo: "Drag the slider to change the value.",
  withValueDisplay: "With Value Display",
  showTheCurrentValue:
    "Show the current value next to the slider with custom formatting.",
  animatedSlidingValue: "Animated Sliding Value",
  useAnimatevalueForSmooth:
    "Use animateValue for smooth digit transitions powered by",
  sizeVariants: "Size Variants",
  threeSizeVariantsSmall:
    "Three size variants: small, medium (default), and large.",
  stepIncrements: "Step Increments",
  controlTheStepSize: "Control the step size for discrete value selection.",
  customFormatting: "Custom Formatting",
  useFormatvalueToDisplay:
    "Use formatValue to display units like temperature or currency.",
  customGradientTrack: "Custom Gradient Track",
  overrideTrackStylingWith:
    "Set the --slider-track, --slider-fill and --slider-thumb CSS variables on the wrapper to restyle the slider.",
  disabledState: "Disabled State",
  disabledSliderWithReduced:
    "Disabled slider with reduced opacity and non-interactive state.",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description: "Description",
  controlledValue: "Controlled value",
  defaultValueForUncontrolled: "Default value for uncontrolled mode",
  minimumValue: "Minimum value",
  maximumValue: "Maximum value",
  stepIncrement: "Step increment",
  callbackWhenValueChanges: "Callback when value changes",
  showValueLabelNext: "Show value label next to slider",
  animateValueWithSliding:
    "Animate value with sliding digits (requires showValue)",
  customValueFormatter: "Custom value formatter",
  sliderSize: "Slider size",
  disabledState2: "Disabled state",
  accessibleLabelForScreen: "Accessible label for screen readers (aria-label)",
  additionalCssClasses: "Additional CSS classes",
  fieldName: "Field name, so the value goes to FormData",
  pureCss: "Pure CSS",
  noExternalAnimationOr: "— no external animation or UI libraries required",
  crossBrowser: "Cross-browser",
  worksInChromeFirefox:
    "— works in Chrome, Firefox, Safari, Edge via vendor prefixes",
  progressFill: "Progress fill",
  nativeFirefoxSupportGradient:
    "— CSS only: border-image on the thumb in WebKit, ::-moz-range-progress in Firefox",
  keyboardAccessible: "Keyboard accessible",
  fullArrowKeyAnd: "— full arrow key and focus support",
  ariaAttributes: "ARIA attributes",
  customizable: "Customizable",
  sizeVariantsCustomFormatting:
    "— size variants, custom formatting, gradient tracks",
  animatedValues: "Animated values",
  optionalSlidingnumberIntegrationFor:
    "— optional SlidingNumber integration for smooth digit transitions",
  controlledUncontrolled: "Controlled & uncontrolled",
  worksWithValueOnvaluechange:
    "— works with value/onValueChange or defaultValue",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    intro:
      "Slider построен на нативном поле range и поддерживает min, max, step, name и disabled. Есть три размера, управляемый и неуправляемый режимы и необязательная подпись с форматированным значением. Ползунок подходит для выбора числа из диапазона; для точного ввода удобнее Input.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Задаёт цвет ореола при наведении.",
    browserSupportText:
      "Ползунок держится на давно поддерживаемом CSS. Только ореол бегунка при наведении сделан через color-mix(), это Baseline widely.",
    rangeSliderInputComponent:
      "Ползунок для выбора значения из диапазона с настраиваемым видом",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    features: "Возможности",
    rangeSliderInputComponent2:
      'Нативный <input type="range"> со стилизованной дорожкой, бегунком и заливкой. Заливка сделана на чистом CSS: в Chrome и Safari её рисует сам бегунок через border-image, вытянутый влево, в Firefox есть ::-moz-range-progress. Маленькая клиентская часть только показывает значение рядом и вызывает onValueChange, а сам ползунок работает и без JavaScript и отправляет значение с формой через name.',
    dragTheSliderTo: "Перетащите ползунок, чтобы изменить значение.",
    withValueDisplay: "Со значением",
    showTheCurrentValue:
      "Текущее значение рядом с ползунком, с произвольным форматом.",
    animatedSlidingValue: "Анимированное значение",
    useAnimatevalueForSmooth:
      "Проп animateValue включает плавную смену цифр на базе",
    sizeVariants: "Размеры",
    threeSizeVariantsSmall:
      "Три размера: маленький, средний (по умолчанию) и большой.",
    stepIncrements: "Шаг значения",
    controlTheStepSize:
      "Задайте шаг, чтобы выбирать только дискретные значения.",
    customFormatting: "Свой формат",
    useFormatvalueToDisplay:
      "formatValue выводит значение с единицами: градусы, валюта и т. д.",
    customGradientTrack: "Градиентная дорожка",
    overrideTrackStylingWith:
      "Задайте на обёртке CSS-переменные --slider-track, --slider-fill и --slider-thumb, чтобы перекрасить ползунок.",
    disabledState: "Отключённое состояние",
    disabledSliderWithReduced:
      "Отключённый ползунок: пониженная непрозрачность, взаимодействие недоступно.",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description: "Описание",
    controlledValue: "Управляемое значение",
    defaultValueForUncontrolled: "Начальное значение в неуправляемом режиме",
    minimumValue: "Минимальное значение",
    maximumValue: "Максимальное значение",
    stepIncrement: "Шаг изменения значения",
    callbackWhenValueChanges: "Колбэк при изменении значения",
    showValueLabelNext: "Показывать значение рядом с ползунком",
    animateValueWithSliding:
      "Анимировать значение скользящими цифрами (нужен showValue)",
    customValueFormatter: "Свой форматтер значения",
    sliderSize: "Размер ползунка",
    disabledState2: "Отключённое состояние",
    accessibleLabelForScreen: "Подпись для скринридеров (aria-label)",
    additionalCssClasses: "Дополнительные CSS-классы",
    fieldName: "Имя поля, чтобы значение попало в FormData",
    pureCss: "Чистый CSS",
    noExternalAnimationOr: "— без внешних библиотек анимации и UI",
    crossBrowser: "Кроссбраузерность",
    worksInChromeFirefox:
      "— работает в Chrome, Firefox, Safari и Edge через вендорные префиксы",
    progressFill: "Заливка прогресса",
    nativeFirefoxSupportGradient:
      "— только CSS: border-image на бегунке в WebKit, ::-moz-range-progress в Firefox",
    keyboardAccessible: "Управление с клавиатуры",
    fullArrowKeyAnd: "— стрелки и фокус работают полностью",
    ariaAttributes: "ARIA-атрибуты",
    customizable: "Настраиваемость",
    sizeVariantsCustomFormatting: "— размеры, свой формат, градиентные дорожки",
    animatedValues: "Анимированные значения",
    optionalSlidingnumberIntegrationFor:
      "— опциональная интеграция с SlidingNumber для плавной смены цифр",
    controlledUncontrolled: "Управляемый и неуправляемый режим",
    worksWithValueOnvaluechange:
      "— работает через value/onValueChange или defaultValue",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Slider", description: t.rangeSliderInputComponent }
}

export default async function SliderPage({ params }: Props) {
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
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Slider" />

        <p className="text-lg text-muted-foreground">
          {t.rangeSliderInputComponent}
        </p>
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "color-mix",
              description: t.supportDescription0,
            },
          ]}
        />

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.dragTheSliderTo}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <SliderDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/slider" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { Slider } from "@/components/ui/slider"

export default function Example() {
  const [value, setValue] = useState(50)

  return (
    <Slider
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
    />
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.withValueDisplay}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.showTheCurrentValue}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <SliderValueDisplayDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider
  value={value}
  onValueChange={setValue}
  showValue
  formatValue={(v) => \`\${v}%\`}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                {t.animatedSlidingValue}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.useAnimatevalueForSmooth}{" "}
                <a
                  href="/docs/components/sliding-number"
                  className="text-primary underline underline-offset-4"
                >
                  SlidingNumber
                </a>
                .
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <SliderAnimatedValueDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider
  value={value}
  onValueChange={setValue}
  showValue
  animateValue
  formatValue={(v) => \`\${v}%\`}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.sizeVariants}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.threeSizeVariantsSmall}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <SliderSizesDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider size="sm" defaultValue={30} />
<Slider size="md" defaultValue={50} />
<Slider size="lg" defaultValue={70} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.stepIncrements}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.controlTheStepSize}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <SliderStepDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider
  min={0}
  max={100}
  step={10}
  showValue
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.customFormatting}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.useFormatvalueToDisplay}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <SliderCustomFormatDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider
  min={16}
  max={30}
  showValue
  formatValue={(v) => \`\${v}°C\`}
/>

<Slider
  min={0}
  max={500}
  step={10}
  showValue
  formatValue={(v) => \`$\${v}\`}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                {t.customGradientTrack}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.overrideTrackStylingWith}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <SliderGradientDemo />
              </div>
              <CodeBlock className="mt-4">{`/* Any background works for the track */
.gradient-slider {
  --slider-track: linear-gradient(
    to right,
    var(--chart-1),
    var(--chart-2),
    var(--chart-3),
    var(--chart-4),
    var(--chart-5)
  );
  --slider-fill: transparent;
}

<Slider className="gradient-slider" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.disabledState}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.disabledSliderWithReduced}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <SliderDisabledDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider defaultValue={40} disabled />`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.props}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.prop}</th>
                  <th className="text-left p-3 font-medium">{t.type}</th>
                  <th className="text-left p-3 font-medium">{t.default}</th>
                  <th className="text-left p-3 font-medium">{t.description}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">value</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.controlledValue}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">defaultValue</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">50</td>
                  <td className="p-3">{t.defaultValueForUncontrolled}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">min</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">{t.minimumValue}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">max</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">100</td>
                  <td className="p-3">{t.maximumValue}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">step</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">1</td>
                  <td className="p-3">{t.stepIncrement}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">onValueChange</td>
                  <td className="p-3 font-mono text-xs">
                    (value: number) =&gt; void
                  </td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.callbackWhenValueChanges}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">showValue</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">{t.showValueLabelNext}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">animateValue</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">{t.animateValueWithSliding}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">formatValue</td>
                  <td className="p-3 font-mono text-xs">
                    (value: number) =&gt; string
                  </td>
                  <td className="p-3 font-mono text-xs">String(v)</td>
                  <td className="p-3">{t.customValueFormatter}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;md&quot;</td>
                  <td className="p-3">{t.sliderSize}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">disabled</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">{t.disabledState2}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">label</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.accessibleLabelForScreen}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">name</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.fieldName}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.additionalCssClasses}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="features"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">{t.pureCss}</strong>{" "}
              {t.noExternalAnimationOr}
            </li>
            <li>
              <strong className="text-foreground">{t.crossBrowser}</strong>{" "}
              {t.worksInChromeFirefox}
            </li>
            <li>
              <strong className="text-foreground">{t.progressFill}</strong>{" "}
              {t.nativeFirefoxSupportGradient}
            </li>
            <li>
              <strong className="text-foreground">
                {t.keyboardAccessible}
              </strong>{" "}
              {t.fullArrowKeyAnd}
            </li>
            <li>
              <strong className="text-foreground">{t.ariaAttributes}</strong> —
              aria-valuemin, aria-valuemax, aria-valuenow, aria-valuetext
            </li>
            <li>
              <strong className="text-foreground">{t.customizable}</strong>{" "}
              {t.sizeVariantsCustomFormatting}
            </li>
            <li>
              <strong className="text-foreground">{t.animatedValues}</strong>{" "}
              {t.optionalSlidingnumberIntegrationFor}
            </li>
            <li>
              <strong className="text-foreground">
                {t.controlledUncontrolled}
              </strong>{" "}
              {t.worksWithValueOnvaluechange}
            </li>
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
