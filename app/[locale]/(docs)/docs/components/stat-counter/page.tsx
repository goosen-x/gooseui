import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  StatCounterFormatDemo,
  StatCounterPreviewDemo,
  StatCounterRepeatDemo,
} from "./stat-counter-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "Number that counts up on first paint or with the scroll of a container, in CSS",
  intro:
    'A number that counts up to its value. It is a server component with no client JavaScript: a registered custom property is animated and every digit is printed with a CSS counter. Two triggers: "mount" counts once by time on first paint, "scroll" ties the count to the scroll of the nearest scrollable container. The final value is in the server HTML, so search engines, screen readers and browsers without the needed CSS get it as is.',
  browserSupport: "Browser Support",
  supportDescription0: 'Ties the count to scroll (trigger="scroll").',
  supportDescription1: "Animates the counter value.",
  browserSupportText:
    'The count needs registered custom properties; trigger="scroll" also needs scroll-driven animations. Where either is missing, or with reduced motion, the final number is shown right away. With "scroll" the count runs while the block comes into view inside its scroll container, from first appearance until the block is 65% of the way through its pass (see scrollRange), and goes back when you scroll up. If the page itself is the container, a block that already sits mid-screen on load shows an intermediate number, so use "mount" there.',
  preview: "Preview",
  previewHint:
    "Scroll the window: the counters finish counting as they come into its visible area.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  formatTitle: "Currency and compact notation",
  formatText:
    "formatOptions goes straight to Intl.NumberFormat, and locale picks separators and symbols. Currency signs, percent and compact suffixes stay as static text around the counting digits. Thousand separators come from the locale in groups of three; formats CSS cannot rebuild (negative numbers, exponents, other grouping schemes) show the final value without a count.",
  repeatTitle: "Count on mount, with replay",
  repeatText:
    'trigger="mount" counts once by time and does not depend on scroll. The button remounts the counter with a new key.',
  features: "Features",
  featureList: [
    ["No JavaScript", "works in Server Components, nothing to hydrate"],
    ["SEO friendly", "the final value is in the server HTML"],
    [
      "Stable width",
      "tabular-nums and a hidden copy of the final value hold the width",
    ],
    ["Reduced motion", "shows the final value right away"],
    ["Screen readers", "hear only the final value, not every frame"],
  ],
  p: {
    value: "Final value",
    from: "Value the count starts from",
    prefix: "Content before the number",
    suffix: "Content after the number",
    decimals: "Digits after the decimal point",
    locale: "Locale for Intl.NumberFormat",
    formatOptions: "Extra Intl.NumberFormat options",
    trigger:
      "mount: once by time on first paint. scroll: follows the nearest scrollable container",
    duration: "Count duration in ms (mount only, default 2500)",
    scrollRange: 'animation-range for scroll, default "entry 0% cover 65%"',
    className: "Additional CSS classes",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Число досчитывает при первой отрисовке или по прокрутке контейнера, на CSS",
    intro:
      'Число досчитывает до значения. Это серверный компонент без клиентского JavaScript: зарегистрированное CSS-свойство анимируется, а каждую цифру печатает CSS-счётчик. Два триггера: "mount" считает один раз по времени при первой отрисовке, "scroll" привязывает счёт к прокрутке ближайшего прокручиваемого контейнера. Конечное значение уже лежит в HTML с сервера, его получают поисковики, скринридеры и браузеры без нужного CSS.',
    browserSupport: "Поддержка браузеров",
    supportDescription0: 'Привязывает счёт к прокрутке (trigger="scroll").',
    supportDescription1: "Анимирует значение счётчика.",
    browserSupportText:
      'Счёту нужны зарегистрированные CSS-свойства, а trigger="scroll" ещё и анимации по скроллу. Если чего-то нет или включено уменьшение движения, сразу видно конечное число. В режиме "scroll" счёт идёт, пока блок въезжает в видимую область своего прокручиваемого контейнера, до 65% его прохода (см. scrollRange), и откатывается назад при прокрутке вверх. Если контейнер — сама страница, блок, который при загрузке уже стоит посреди экрана, покажет промежуточное число, поэтому там берите "mount".',
    preview: "Превью",
    previewHint:
      "Прокрутите окно: счётчики досчитывают, пока въезжают в его видимую область.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    formatTitle: "Валюта и короткая запись",
    formatText:
      "formatOptions уходит прямо в Intl.NumberFormat, а locale задаёт разделители и символы. Знак валюты, процент и короткий суффикс остаются статичным текстом вокруг цифр. Разделитель тысяч берётся из локали, группы по три цифры. Форматы, которые CSS не повторит (отрицательные числа, экспонента, другие схемы группировки), показывают конечное значение без счёта.",
    repeatTitle: "Счёт при монтировании и повтор",
    repeatText:
      'trigger="mount" считает один раз по времени и не зависит от прокрутки. Кнопка перемонтирует счётчик через новый key.',
    features: "Возможности",
    featureList: [
      ["Без JavaScript", "работает в Server Components, гидратировать нечего"],
      ["Для поисковиков", "конечное значение есть в HTML с сервера"],
      [
        "Ширина не прыгает",
        "tabular-nums и скрытая копия конечного значения держат ширину",
      ],
      ["Reduced motion", "сразу показывает конечное значение"],
      ["Скринридеры", "слышат только конечное значение, а не каждый кадр"],
    ],
    p: {
      value: "Конечное значение",
      from: "С какого значения начинается счёт",
      prefix: "Что стоит перед числом",
      suffix: "Что стоит после числа",
      decimals: "Знаков после запятой",
      locale: "Локаль для Intl.NumberFormat",
      formatOptions: "Дополнительные опции Intl.NumberFormat",
      trigger:
        "mount: один раз по времени при первой отрисовке. scroll: по прокрутке ближайшего прокручиваемого контейнера",
      duration: "Длительность счёта, мс (только для mount, по умолчанию 2500)",
      scrollRange:
        'animation-range для scroll, по умолчанию "entry 0% cover 65%"',
      className: "Дополнительные CSS-классы",
    },
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Stat Counter", description: t.description }
}

export default async function StatCounterPage({ params }: Props) {
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

  const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Stat Counter" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "scroll-driven-animations",
              description: t.supportDescription0,
            },
            {
              featureId: "registered-custom-properties",
              description: t.supportDescription1,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
            <StatCounterPreviewDemo locale={locale as Locale} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/stat-counter" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { StatCounter } from "@/components/ui/stat-counter"

export default function Example() {
  return (
    <div className="text-center">
      <StatCounter value={12480} suffix="+" className="text-4xl font-bold" />
      {/* or follow the scroll of the nearest scroll container: */}
      {/* <StatCounter trigger="scroll" value={12480} /> */}
      <p className="text-sm text-muted-foreground">Active users</p>
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
              <h3 className="text-lg font-medium mb-3">{t.formatTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.formatText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <StatCounterFormatDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`<StatCounter
  value={84250}
  locale="de-DE"
  formatOptions={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
/>

<StatCounter
  value={2400000}
  formatOptions={{ notation: "compact", maximumFractionDigits: 1 }}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.repeatTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.repeatText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <StatCounterRepeatDemo locale={locale as Locale} />
              </div>
              <CodeBlock className="mt-4">{`const [run, setRun] = useState(0)

<StatCounter key={run} trigger="mount" value={1284} />
<Button onClick={() => setRun((n) => n + 1)}>Replay</Button>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            { name: "value", type: "number", description: t.p.value },
            {
              name: "from",
              type: "number",
              default: "0",
              description: t.p.from,
            },
            { name: "prefix", type: "ReactNode", description: t.p.prefix },
            { name: "suffix", type: "ReactNode", description: t.p.suffix },
            {
              name: "decimals",
              type: "number",
              default: "0",
              description: t.p.decimals,
            },
            {
              name: "locale",
              type: "string",
              default: '"en-US"',
              description: t.p.locale,
            },
            {
              name: "formatOptions",
              type: "Intl.NumberFormatOptions",
              description: t.p.formatOptions,
            },
            {
              name: "trigger",
              type: '"mount" | "scroll"',
              default: '"mount"',
              description: t.p.trigger,
            },
            {
              name: "duration",
              type: "number",
              default: "2500",
              description: t.p.duration,
            },
            {
              name: "scrollRange",
              type: "string",
              default: '"entry 0% cover 65%"',
              description: t.p.scrollRange,
            },
            { name: "className", type: "string", description: t.p.className },
          ]}
        />

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
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
