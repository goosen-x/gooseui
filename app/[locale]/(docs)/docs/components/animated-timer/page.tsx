import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { AnimatedTimer } from "@/registry/gooseui/ui/animated-timer"

const en = {
  description:
    "Beautiful animated clock with smoothly sliding digits and gradient border",
  intro:
    "A clock with sliding digits and a gradient border. The markup and the animation are server HTML and CSS. A tiny client script reads the time in the visitor's time zone once a second and writes the digits into data attributes, so React never re-renders on a tick. Before the script runs, the clock shows dimmed zeros.",
  browserSupport: "Browser Support",
  supportDescription0: "Slides the digits into place.",
  browserSupportText:
    "Digits slide with the translate property and a CSS transition. The clock itself needs JavaScript: only the browser knows the visitor's time and time zone.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  withoutSeconds: "Without seconds",
  n12HourFormat: "12-hour format",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description2: "Description",
  showSeconds: "Show seconds",
  n24HourFormat: "24-hour format",
  additionalClasses: "Additional classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Красивые анимированные часы с плавно сменяющимися цифрами и градиентной рамкой",
    intro:
      "Часы с выезжающими цифрами и градиентной рамкой. Разметка и анимация отдаются сервером как HTML и CSS. Маленький клиентский скрипт раз в секунду берёт время в часовом поясе посетителя и пишет цифры в data-атрибуты, поэтому React не перерисовывает компонент на каждом тике. Пока скрипт не запустился, видны приглушённые нули.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Плавно перемещает цифры.",
    browserSupportText:
      "Цифры сдвигаются свойством translate с CSS-переходом. Самим часам JavaScript нужен: только браузер знает время и часовой пояс посетителя.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    withoutSeconds: "Без секунд",
    n12HourFormat: "12-часовой формат",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description2: "Описание",
    showSeconds: "Показывать секунды",
    n24HourFormat: "24-часовой формат",
    additionalClasses: "Дополнительные классы",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Animated Timer",
    description: t.description,
  }
}

export default async function AnimatedTimerPage({ params }: Props) {
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

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Animated Timer" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "individual-transforms",
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
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <AnimatedTimer />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/animated-timer" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { AnimatedTimer } from "@/components/ui/animated-timer"

export default function Page() {
  return <AnimatedTimer />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.withoutSeconds}</h3>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <AnimatedTimer showSeconds={false} />
              </div>
              <CodeBlock>{`<AnimatedTimer showSeconds={false} />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.n12HourFormat}</h3>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <AnimatedTimer use24Hour={false} />
              </div>
              <CodeBlock>{`<AnimatedTimer use24Hour={false} />`}</CodeBlock>
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
                  <td className="p-3">{t.showSeconds}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">use24Hour</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">{t.n24HourFormat}</td>
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
