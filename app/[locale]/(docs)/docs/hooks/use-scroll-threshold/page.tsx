import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { UseScrollThresholdDemo } from "./use-scroll-threshold-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Scrolled-past-threshold flag with separate on and off points",
  intro:
    "useScrollThreshold tells you whether the page has been scrolled past a threshold. It turns on and off at different offsets, so a sticky header that shrinks on scroll does not flicker when the user stops right at the boundary.",
  previewText:
    "The header turns compact below 80px and goes back only above 32px. Stop between the two marks and nothing jumps.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  parameters: "Parameters",
  returns: "Returns",
  features: "Features",
  browserSupport: "Browser Support",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  ex0Title: "Custom release point",
  ex0Text:
    "By default the flag turns off at half the threshold. Set releaseAt when the header changes height a lot and you need a wider gap.",
  ex1Title: "Scroll container",
  ex1Text:
    "Pass a ref to watch an element with its own scroll instead of the window, as in the preview.",
  ex2Title: "Show a back-to-top button",
  ex2Text:
    "The same flag works for anything that appears after some scrolling.",
  param0: "Offset in px past which the flag turns on while scrolling down",
  param1:
    "Offset in px below which the flag turns off. Never higher than threshold",
  param2: "Element to watch instead of the window",
  return0: "true while the scroll position is past the threshold",
  feature0: "Hysteresis",
  feature0Text:
    "Two boundaries instead of one, so the state does not flip back and forth at the edge",
  feature1: "Passive listener",
  feature1Text: "The scroll handler never blocks scrolling",
  feature2: "One read per frame",
  feature2Text:
    "Updates go through requestAnimationFrame and re-render only when the flag changes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Флаг прокрутки за порог с разными точками включения и выключения",
    intro:
      "useScrollThreshold сообщает, прокручена ли страница дальше порога. Флаг включается и выключается на разной высоте, поэтому липкая шапка, которая сжимается при прокрутке, не дёргается, если пользователь остановился прямо на границе.",
    previewText:
      "Шапка сжимается после 80px и возвращается только выше 32px. Остановитесь между отметками, и ничего не прыгает.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    parameters: "Параметры",
    returns: "Возвращает",
    features: "Возможности",
    browserSupport: "Поддержка браузеров",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    ex0Title: "Своя точка выключения",
    ex0Text:
      "По умолчанию флаг выключается на половине порога. Задайте releaseAt, если шапка сильно меняет высоту и зазор нужен шире.",
    ex1Title: "Прокручиваемый контейнер",
    ex1Text:
      "Передайте ref, чтобы следить за элементом со своей прокруткой, а не за окном, как в превью.",
    ex2Title: "Кнопка «Наверх»",
    ex2Text: "Тот же флаг подходит для всего, что появляется после прокрутки.",
    param0: "Смещение в px, после которого флаг включается при прокрутке вниз",
    param1:
      "Смещение в px, ниже которого флаг выключается. Не больше threshold",
    param2: "Элемент, за которым следить вместо окна",
    return0: "true, пока прокрутка за порогом",
    feature0: "Гистерезис",
    feature0Text:
      "Две границы вместо одной, поэтому на краю состояние не скачет туда-обратно",
    feature1: "Пассивный слушатель",
    feature1Text: "Обработчик не тормозит прокрутку",
    feature2: "Одно чтение за кадр",
    feature2Text:
      "Обновления идут через requestAnimationFrame, перерисовка только при смене флага",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useScrollThreshold", description: t.description }
}

export default async function UseScrollThresholdPage({ params }: Props) {
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
    { id: "features", title: t.features, level: 2 },
  ]

  const parameters = [
    ["threshold", "number", "64", t.param0],
    ["options.releaseAt", "number", "threshold / 2", t.param1],
    ["options.container", "RefObject<HTMLElement | null>", "-", t.param2],
  ]
  const returns = [["passed", "boolean", t.return0]]
  const features = [
    [t.feature0, t.feature0Text],
    [t.feature1, t.feature1Text],
    [t.feature2, t.feature2Text],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useScrollThreshold" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseScrollThresholdDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-scroll-threshold" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { useScrollThreshold } from "@/hooks/use-scroll-threshold"

export function SiteHeader() {
  const compact = useScrollThreshold(80)

  return (
    <header
      data-compact={compact}
      className="sticky top-0 h-16 transition-all data-[compact=true]:h-12 data-[compact=true]:shadow"
    >
      <Logo />
    </header>
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
              <CodeBlock>{`// on after 200px, off only above 60px
const pastHero = useScrollThreshold(200, { releaseAt: 60 })`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex1Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex1Text}</p>
              <CodeBlock>{`function Panel() {
  const container = useRef<HTMLDivElement>(null)
  const compact = useScrollThreshold(80, { releaseAt: 32, container })

  return (
    <div ref={container} className="h-96 overflow-y-auto">
      <PanelHeader compact={compact} />
      <PanelBody />
    </div>
  )
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex2Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex2Text}</p>
              <CodeBlock>{`const visible = useScrollThreshold(600)

return visible ? <ScrollToTopButton /> : null`}</CodeBlock>
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
