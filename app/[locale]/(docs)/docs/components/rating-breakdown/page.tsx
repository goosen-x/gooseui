import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import {
  RatingBreakdownLiveDemo,
  RatingBreakdownPreviewDemo,
  RatingBreakdownTenDemo,
} from "./rating-breakdown-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Average score with stars and a per-score vote distribution",
  introBefore:
    "A summary of reviews: the average score in large type, stars from ",
  introAfter:
    " in read-only mode and one bar per score from the highest to the lowest. Pass raw vote counts and the component works out the average and the total. It is a Server Component with no JavaScript: the bars are full by default and grow once on first paint with a CSS transition.",
  browserSupport: "Browser Support",
  supportDescription0: "Grows the bars from zero on first paint.",
  browserSupportText:
    "The growth runs on a CSS transition with @starting-style. Browsers without it, no JavaScript and prefers-reduced-motion all show the bars full right away.",
  preview: "Preview",
  previewText: "The bars grow once when the block first renders.",
  installation: "Installation",
  installationText: "The command also installs Rating, which draws the stars.",
  usage: "Usage",
  usageText:
    "counts takes an array ordered from the lowest score, or an object keyed by score.",
  examples: "Examples",
  liveTitle: "Live counts",
  liveText:
    "Feed it new counts from a client component and the average, the stars and the bars update. animate={false} turns the growth animation off.",
  tenTitle: "Ten-point scale",
  tenText:
    "With an array, max is taken from its length. formatAverage changes how the big number looks.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pCounts: "Votes per score: an array from the lowest score or an object",
  pMax: "Highest score. Taken from the array length, otherwise 5",
  pShape: "Star shape, passed to Rating",
  pFormatAverage: "Formats the average number",
  pFormatCount: "Formats the count at the end of each row",
  pAnimate: "Grow the bars from zero once on first render",
  pLabels: "Texts: total under the average, row description, stars summary",
  pClassName: "Additional CSS classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Средняя оценка со звёздами и распределение голосов по баллам",
    introBefore: "Сводка отзывов: средняя оценка крупно, звёзды из ",
    introAfter:
      " в режиме чтения и по полосе на каждый балл, от высшего к низшему. На вход идут просто количества голосов, среднее и итог компонент считает сам. Это серверный компонент без JavaScript: полосы сразу показывают нужную ширину и один раз плавно вырастают при первой отрисовке на CSS-переходе.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Растит полосы от нуля при первой отрисовке.",
    browserSupportText:
      "Рост работает на CSS-переходе с @starting-style. В браузерах без него, без JavaScript и при prefers-reduced-motion полосы сразу полные.",
    preview: "Превью",
    previewText: "Полосы один раз вырастают, когда блок впервые отрисован.",
    installation: "Установка",
    installationText: "Команда заодно поставит Rating, который рисует звёзды.",
    usage: "Использование",
    usageText:
      "counts принимает массив, упорядоченный от низшего балла, или объект с баллами в ключах.",
    examples: "Примеры",
    liveTitle: "Живые данные",
    liveText:
      "Передайте новые количества из клиентского компонента, и среднее, звёзды и полосы пересчитаются. animate={false} выключает анимацию роста.",
    tenTitle: "Десятибалльная шкала",
    tenText:
      "Если counts массив, max берётся из его длины. formatAverage меняет вид крупного числа.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pCounts: "Голоса по баллам: массив от низшего балла или объект",
    pMax: "Высший балл. Берётся из длины массива, иначе 5",
    pShape: "Форма звезды, передаётся в Rating",
    pFormatAverage: "Форматирует среднее",
    pFormatCount: "Форматирует число в конце строки",
    pAnimate: "Один раз растить полосы от нуля при первой отрисовке",
    pLabels: "Тексты: итог под средним, описание строки, подпись звёзд",
    pClassName: "Дополнительные CSS-классы",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Rating Breakdown", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function RatingBreakdownPage({ params }: Props) {
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
    ["counts", "number[] | Record<number, number>", "-", t.pCounts],
    ["max", "number", "5", t.pMax],
    ["shape", '"star" | "sparkle"', '"star"', t.pShape],
    [
      "formatAverage",
      "(average: number) => string",
      "toFixed(1)",
      t.pFormatAverage,
    ],
    [
      "formatCount",
      "(count: number) => string",
      "toLocaleString",
      t.pFormatCount,
    ],
    ["animate", "boolean", "true", t.pAnimate],
    ["labels", "Partial<RatingBreakdownLabels>", "-", t.pLabels],
    ["className", "string", "-", t.pClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Rating Breakdown" />

        <p className="text-muted-foreground">
          {t.introBefore}
          <Link
            href="/docs/components/rating"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Rating
          </Link>
          {t.introAfter}
        </p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "starting-style",
              description: t.supportDescription0,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <RatingBreakdownPreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/rating-breakdown" />
          <p className="text-sm text-muted-foreground">{t.installationText}</p>
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <p className="text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`import { RatingBreakdown } from "@/components/ui/rating-breakdown"

export default function Example() {
  return <RatingBreakdown counts={{ 5: 812, 4: 264, 3: 91, 2: 38, 1: 54 }} />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.liveTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.liveText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RatingBreakdownLiveDemo />
              </div>
              <CodeBlock className="mt-4">{`const [counts, setCounts] = useState([1, 2, 4, 9, 14])

<RatingBreakdown counts={counts} animate={false} />
<Rating
  value={null}
  onValueChange={(v) =>
    v && setCounts((prev) => prev.map((c, i) => (i === v - 1 ? c + 1 : c)))
  }
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.tenTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.tenText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RatingBreakdownTenDemo />
              </div>
              <CodeBlock className="mt-4">{`<RatingBreakdown
  counts={[0, 1, 1, 2, 4, 7, 12, 18, 9, 5]}
  shape="sparkle"
  formatAverage={(avg) => \`\${avg.toFixed(1)}/10\`}
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
      </div>
    </DocsPage>
  )
}
