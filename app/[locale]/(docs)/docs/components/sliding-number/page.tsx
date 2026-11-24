import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  SlidingNumberCounterDemo,
  SlidingNumberDemo,
  SlidingNumberPriceDemo,
  SlidingNumberStatsDemo,
  SlidingNumberTimerDemo,
} from "./demo"

const en = {
  browserSupport: "Browser Support",
  supportDescription0: "Smooths the digit animation.",
  browserSupportText:
    "The spring curve uses linear() easing, Baseline widely available. With reduced motion the digits change instantly.",
  animatedNumberDisplayWith:
    "Animated number display with sliding digit transitions",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  features: "Features",
  animatedNumberDisplayWith2:
    "Animated number display with smooth sliding transitions for each digit. Perfect for counters, stats, prices, and any numeric values that change over time. It is a server component with no JavaScript of its own: every digit is a 0–9 column shifted by a CSS variable, and a CSS transition slides it when the value prop changes.",
  clickTheButtonsTo: "Click the buttons to see the sliding animation.",
  counterWithPadding: "Counter with Padding",
  usePadstartToMaintain:
    "Use padStart to maintain consistent width with leading zeros.",
  timer: "Timer",
  combineMultipleSlidingnumberComponents:
    "Combine multiple SlidingNumber components for MM:SS format.",
  priceDisplay: "Price Display",
  wrapWithCurrencySymbol: "Wrap with currency symbol and suffix for pricing.",
  statsDashboard: "Stats Dashboard",
  displayMultipleAnimatedStatistics: "Display multiple animated statistics.",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description: "Description",
  theNumberToDisplay: "The number to display",
  padWithLeadingZeros: "Pad with leading zeros to this length",
  characterUsedAsDecimal: "Character used as decimal separator",
  customMotionTransitionStiffness:
    'CSS transition for the digit columns, for example "transform 300ms ease-out". The default is a spring-like linear() curve',
  additionalCssClasses: "Additional CSS classes",
  smoothAnimations: "Smooth animations",
  springBasedTransitionsPowered:
    "— a spring-like CSS transition on a linear() curve, no animation library",
  perDigitAnimation: "Per-digit animation",
  eachDigitAnimatesIndependently:
    "— each digit animates independently for natural effect",
  leadingZeros: "Leading zeros",
  padstartForConsistentWidth: "— padStart for consistent width display",
  separatorSupport: "Separator support",
  handlesDecimalPointsAnd: "— handles decimal points and thousands separators",
  customTransitions: "Custom transitions",
  overrideSpringConfigFor:
    "— pass any CSS transition string to change the feel",
  tabularNums: "Tabular nums",
  usesTabularNumsFor: "— uses tabular-nums for aligned digit widths",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Смягчает анимацию цифр.",
    browserSupportText:
      "Пружинистая кривая сделана на linear(), это Baseline widely. При reduced motion цифры меняются сразу, без анимации.",
    animatedNumberDisplayWith:
      "Число с анимацией: цифры плавно скользят при изменении",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    features: "Возможности",
    animatedNumberDisplayWith2:
      "Число с плавной анимацией: каждая цифра скользит отдельно. Подходит для счётчиков, статистики, цен и любых значений, которые меняются со временем. Это серверный компонент без своего JavaScript: каждая цифра это колонка от 0 до 9, сдвинутая CSS-переменной, а при смене пропа value её двигает CSS-переход.",
    clickTheButtonsTo: "Нажимайте на кнопки, чтобы увидеть анимацию.",
    counterWithPadding: "Счётчик с нулями",
    usePadstartToMaintain:
      "padStart добавляет ведущие нули, чтобы ширина не прыгала.",
    timer: "Таймер",
    combineMultipleSlidingnumberComponents:
      "Несколько SlidingNumber подряд дают формат ММ:СС.",
    priceDisplay: "Цена",
    wrapWithCurrencySymbol:
      "Добавьте символ валюты и суффикс, чтобы получить цену.",
    statsDashboard: "Панель статистики",
    displayMultipleAnimatedStatistics: "Несколько анимированных показателей.",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description: "Описание",
    theNumberToDisplay: "Отображаемое число",
    padWithLeadingZeros: "Дополнить ведущими нулями до этой длины",
    characterUsedAsDecimal: "Символ десятичного разделителя",
    customMotionTransitionStiffness:
      "CSS-переход для колонок цифр, например «transform 300ms ease-out». По умолчанию пружинистая кривая linear()",
    additionalCssClasses: "Дополнительные CSS-классы",
    smoothAnimations: "Плавная анимация",
    springBasedTransitionsPowered:
      "— пружинистый CSS-переход на кривой linear(), без библиотек анимации",
    perDigitAnimation: "Анимация по цифрам",
    eachDigitAnimatesIndependently:
      "— каждая цифра движется независимо, выглядит естественно",
    leadingZeros: "Ведущие нули",
    padstartForConsistentWidth: "— padStart сохраняет постоянную ширину",
    separatorSupport: "Разделители",
    handlesDecimalPointsAnd: "— десятичная точка и разделители тысяч",
    customTransitions: "Свои переходы",
    overrideSpringConfigFor:
      "— передайте любую строку CSS transition, чтобы изменить характер движения",
    tabularNums: "Табличные цифры",
    usesTabularNumsFor: "— tabular-nums выравнивает ширину цифр",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Sliding Number", description: t.animatedNumberDisplayWith }
}

export default async function SlidingNumberPage({ params }: Props) {
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
        <DocsPageNav title="Sliding Number" />

        <p className="text-muted-foreground">{t.animatedNumberDisplayWith2}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "linear-easing",
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
          <p className="text-sm text-muted-foreground">{t.clickTheButtonsTo}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <SlidingNumberDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/sliding-number" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { SlidingNumber } from "@/components/ui/sliding-number"

export default function Example() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-4xl font-bold">
      <SlidingNumber value={count} />
    </div>
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
              <h3 className="text-lg font-medium mb-3">
                {t.counterWithPadding}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.usePadstartToMaintain}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SlidingNumberCounterDemo />
              </div>
              <CodeBlock className="mt-4">{`<SlidingNumber value={count} padStart={3} />
// 0 → "000", 5 → "005", 42 → "042", 100 → "100"`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.timer}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.combineMultipleSlidingnumberComponents}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SlidingNumberTimerDemo />
              </div>
              <CodeBlock className="mt-4">{`const minutes = Math.floor(seconds / 60)
const secs = seconds % 60

<div className="flex items-center font-mono">
  <SlidingNumber value={minutes} padStart={2} />
  <span>:</span>
  <SlidingNumber value={secs} padStart={2} />
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.priceDisplay}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.wrapWithCurrencySymbol}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SlidingNumberPriceDemo />
              </div>
              <CodeBlock className="mt-4">{`<div className="text-3xl font-bold">
  $<SlidingNumber value={price} />
  <span className="text-lg text-muted-foreground">/mo</span>
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.statsDashboard}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.displayMultipleAnimatedStatistics}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SlidingNumberStatsDemo />
              </div>
              <CodeBlock className="mt-4">{`<div className="grid grid-cols-3 gap-8">
  <div>
    <SlidingNumber value={users} />
    <span>Users</span>
  </div>
  <div>
    <SlidingNumber value={downloads} />
    <span>Downloads</span>
  </div>
</div>`}</CodeBlock>
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
                  <td className="p-3">{t.theNumberToDisplay}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">padStart</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">{t.padWithLeadingZeros}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">decimalSeparator</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">&quot;.&quot;</td>
                  <td className="p-3">{t.characterUsedAsDecimal}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">transition</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">spring linear()</td>
                  <td className="p-3">{t.customMotionTransitionStiffness}</td>
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
              <strong className="text-foreground">{t.smoothAnimations}</strong>{" "}
              {t.springBasedTransitionsPowered}
            </li>
            <li>
              <strong className="text-foreground">{t.perDigitAnimation}</strong>{" "}
              {t.eachDigitAnimatesIndependently}
            </li>
            <li>
              <strong className="text-foreground">{t.leadingZeros}</strong>{" "}
              {t.padstartForConsistentWidth}
            </li>
            <li>
              <strong className="text-foreground">{t.separatorSupport}</strong>{" "}
              {t.handlesDecimalPointsAnd}
            </li>
            <li>
              <strong className="text-foreground">{t.customTransitions}</strong>{" "}
              {t.overrideSpringConfigFor}
            </li>
            <li>
              <strong className="text-foreground">{t.tabularNums}</strong>{" "}
              {t.usesTabularNumsFor}
            </li>
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
