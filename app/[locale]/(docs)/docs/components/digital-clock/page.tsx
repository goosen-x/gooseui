import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { DigitalClock } from "@/registry/gooseui/ui/digital-clock"

const en = {
  description: "A retro 7-segment LED digital clock with customizable colors.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  aRetro7SegmentLed:
    "A retro 7-segment LED digital clock built with CSS gradients. Features customizable colors, optional seconds display, and scalable size.",
  withoutSeconds: "Without seconds",
  customColors: "Custom colors",
  n12HourFormat: "12-hour format",
  differentSizes: "Different sizes",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description2: "Description",
  showSecondsDigits: "Show seconds digits",
  n24HourFormat: "24-hour format",
  ledSegmentColor: "LED segment color",
  sizeScaleFactor: "Size scale factor",
  additionalClasses: "Additional classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Ретро-часы на 7-сегментных LED-индикаторах с настраиваемыми цветами.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    aRetro7SegmentLed:
      "Ретро-часы на 7-сегментных LED-индикаторах, построенные на CSS-градиентах. Настраиваемые цвета, необязательные секунды и масштабируемый размер.",
    withoutSeconds: "Без секунд",
    customColors: "Свои цвета",
    n12HourFormat: "12-часовой формат",
    differentSizes: "Разные размеры",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description2: "Описание",
    showSecondsDigits: "Показывать цифры секунд",
    n24HourFormat: "24-часовой формат",
    ledSegmentColor: "Цвет LED-сегментов",
    sizeScaleFactor: "Коэффициент масштаба",
    additionalClasses: "Дополнительные классы",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Digital Clock",
    description: t.description,
  }
}

export default async function DigitalClockPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Digital Clock" />
        <p className="text-muted-foreground">{t.aRetro7SegmentLed}</p>

        {/* Preview */}
        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <div className="flex justify-center py-8 bg-muted/30 rounded-lg overflow-hidden">
            <DigitalClock scale={0.5} />
            <span className="sr-only">Digital Clock</span>
          </div>
        </div>

        {/* Installation */}
        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/digital-clock" />
        </div>

        {/* Usage */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { DigitalClock } from "@/components/ui/digital-clock"

export default function Example() {
  return <DigitalClock />
}`}</CodeBlock>
        </div>

        {/* Examples */}
        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.withoutSeconds}</h3>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg overflow-hidden">
                <DigitalClock showSeconds={false} scale={0.5} />
              </div>
              <CodeBlock>{`<DigitalClock showSeconds={false} />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.customColors}</h3>
              <div className="flex flex-wrap justify-center gap-4 py-8 bg-muted/30 rounded-lg overflow-hidden">
                <DigitalClock
                  showSeconds={false}
                  color="#00BFFF"
                  scale={0.35}
                />
                <DigitalClock
                  showSeconds={false}
                  color="#FF6B6B"
                  scale={0.35}
                />
                <DigitalClock
                  showSeconds={false}
                  color="#FFD93D"
                  scale={0.35}
                />
              </div>
              <CodeBlock>{`<DigitalClock color="#00BFFF" />
<DigitalClock color="#FF6B6B" />
<DigitalClock color="#FFD93D" />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.n12HourFormat}</h3>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg overflow-hidden">
                <DigitalClock use24Hour={false} scale={0.5} />
              </div>
              <CodeBlock>{`<DigitalClock use24Hour={false} />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.differentSizes}</h3>
              <div className="flex flex-wrap items-end justify-center gap-4 py-8 bg-muted/30 rounded-lg overflow-hidden">
                <DigitalClock showSeconds={false} scale={0.3} />
                <DigitalClock showSeconds={false} scale={0.5} />
                <DigitalClock showSeconds={false} scale={0.7} />
              </div>
              <CodeBlock>{`<DigitalClock scale={0.3} />
<DigitalClock scale={0.5} />
<DigitalClock scale={0.7} />`}</CodeBlock>
            </div>
          </div>
        </div>

        {/* Props */}
        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.props}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[31.25rem]">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">{t.prop}</th>
                  <th className="text-left p-3 font-medium">{t.type}</th>
                  <th className="text-left p-3 font-medium">{t.default}</th>
                  <th className="text-left p-3 font-medium">
                    {t.description2}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">showSeconds</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">{t.showSecondsDigits}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">use24Hour</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">{t.n24HourFormat}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">color</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">#82FA58</td>
                  <td className="p-3">{t.ledSegmentColor}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">scale</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">1</td>
                  <td className="p-3">{t.sizeScaleFactor}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.additionalClasses}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
