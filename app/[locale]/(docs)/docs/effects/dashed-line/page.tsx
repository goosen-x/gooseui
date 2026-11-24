import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { DashedLine } from "@/registry/gooseui/effects/dashed-line"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Creates the dashed line",
  browserSupport: "Browser Support",
  description: "Dashed divider with faded ends and moving dashes",
  intro:
    "A horizontal or vertical dashed line that fades out at both ends and can move its dashes along. It is plain CSS without client code, so it works in server components. The color comes from currentColor, and with reduced motion the dashes stand still.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  verticalTitle: "Vertical connector",
  verticalText:
    'In a vertical line the dashes move down, or up with direction="reverse". The parent sets the length.',
  steps: ["Request", "Review", "Release"],
  styleTitle: "Dash shape and color",
  styleText:
    "Long dashes, a wide gap and a thicker line turn it into a road marking. The color is any text color class.",
  sectionTitle: "Section divider",
  sectionText: "A static line with short fades separates blocks of content.",
  sectionA: "Plans and pricing",
  sectionB: "Frequently asked questions",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propOrientation: "Line direction",
  propDash: "Dash length, in px",
  propGap: "Gap between dashes, in px",
  propThickness: "Line thickness, in px",
  propFade: "Fade at each end, in percent of the length. 0 turns it off",
  propAnimated: "Move the dashes along the line",
  propSpeed: "Dash speed, in px per second",
  propDirection: "forward moves right or down, reverse moves left or up",
  propClassName: "Additional classes. Set the color with text-*",
  propStyle: "Inline styles",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Создаёт пунктирную линию",
    browserSupport: "Поддержка браузеров",
    description:
      "Пунктирный разделитель с затуханием на концах и бегущими штрихами",
    intro:
      "Горизонтальная или вертикальная пунктирная линия, которая затухает к концам и умеет двигать штрихи. Это чистый CSS без клиентского кода, поэтому линия работает в серверных компонентах. Цвет берётся из currentColor, а при reduced motion штрихи стоят на месте.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    verticalTitle: "Вертикальная связка",
    verticalText:
      'В вертикальной линии штрихи бегут вниз, а с direction="reverse" вверх. Длину задаёт родитель.',
    steps: ["Заявка", "Проверка", "Релиз"],
    styleTitle: "Форма штриха и цвет",
    styleText:
      "Длинные штрихи, широкий промежуток и толстая линия похожи на дорожную разметку. Цвет задаётся любым классом цвета текста.",
    sectionTitle: "Разделитель секций",
    sectionText:
      "Неподвижная линия с короткими краями отделяет блоки контента.",
    sectionA: "Тарифы и цены",
    sectionB: "Частые вопросы",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propOrientation: "Направление линии",
    propDash: "Длина штриха, в px",
    propGap: "Промежуток между штрихами, в px",
    propThickness: "Толщина линии, в px",
    propFade: "Затухание на каждом конце, в процентах длины. 0 выключает",
    propAnimated: "Двигать штрихи вдоль линии",
    propSpeed: "Скорость штрихов, в px в секунду",
    propDirection: "forward двигает вправо или вниз, reverse влево или вверх",
    propClassName: "Дополнительные классы. Цвет задаётся через text-*",
    propStyle: "Инлайн-стили",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Dashed Line", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function DashedLinePage({ params }: Props) {
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

  const rows: [string, string, string, string][] = [
    [
      "orientation",
      '"horizontal" | "vertical"',
      '"horizontal"',
      t.propOrientation,
    ],
    ["dash", "number", "6", t.propDash],
    ["gap", "number", "4", t.propGap],
    ["thickness", "number", "1", t.propThickness],
    ["fade", "number", "15", t.propFade],
    ["animated", "boolean", "false", t.propAnimated],
    ["speed", "number", "20", t.propSpeed],
    ["direction", '"forward" | "reverse"', '"forward"', t.propDirection],
    ["className", "string", "-", t.propClassName],
    ["style", "CSSProperties", "-", t.propStyle],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Dashed Line" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "masks",
              description: t.auditFeature0Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex flex-col items-center gap-8 px-8 py-16 bg-muted/30 rounded-lg">
            <span className="sr-only">{t.description}</span>
            <DashedLine animated />
            <DashedLine
              animated
              direction="reverse"
              speed={40}
              className="text-primary"
              thickness={2}
            />
            <DashedLine animated fade={30} dash={2} gap={6} thickness={2} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/dashed-line" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { DashedLine } from "@/components/ui/dashed-line"

export default function Divider() {
  return <DashedLine animated />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.verticalTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.verticalText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ol className="flex flex-col items-center text-sm">
                  {t.steps.map((step, i) => (
                    <li key={step} className="flex flex-col items-center">
                      {i > 0 ? (
                        <div className="h-12">
                          <DashedLine
                            orientation="vertical"
                            animated
                            fade={0}
                            dash={4}
                            gap={4}
                            thickness={2}
                          />
                        </div>
                      ) : null}
                      <span className="rounded-full border bg-background px-4 py-1.5 font-medium">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <CodeBlock className="mt-4">{`<div className="h-12">
  <DashedLine orientation="vertical" animated fade={0} dash={4} gap={4} thickness={2} />
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.styleTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.styleText}
              </p>
              <div className="flex justify-center px-8 py-12 bg-muted/30 rounded-lg">
                <DashedLine
                  animated
                  dash={24}
                  gap={16}
                  thickness={4}
                  speed={60}
                  fade={10}
                  className="text-foreground"
                />
              </div>
              <CodeBlock className="mt-4">{`<DashedLine
  animated
  dash={24}
  gap={16}
  thickness={4}
  speed={60}
  fade={10}
  className="text-foreground"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.sectionTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.sectionText}
              </p>
              <div className="space-y-6 px-8 py-8 bg-muted/30 rounded-lg">
                <p className="font-medium">{t.sectionA}</p>
                <DashedLine fade={5} className="text-border" />
                <p className="font-medium">{t.sectionB}</p>
              </div>
              <CodeBlock className="mt-4">{`<DashedLine fade={5} className="text-border" />`}</CodeBlock>
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
      </div>
    </DocsPage>
  )
}
