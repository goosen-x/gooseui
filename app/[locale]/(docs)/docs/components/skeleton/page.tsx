import { setRequestLocale } from "next-intl/server"
import type * as React from "react"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Skeleton, SkeletonGroup } from "@/registry/gooseui/ui/skeleton"
import { SkeletonSwapDemo } from "./demo"
import {
  ArticleCard,
  CommentsList,
  DataTable,
  ProfileCompare,
} from "./examples"

const en = {
  description:
    "Placeholders for content that is still loading. Three animations (pulse, shimmer, wave), ready-made shapes, a group that runs one shimmer across all its blocks, and a fade-in for the real content. Plain CSS in a server component, no JavaScript. With reduced motion the blocks stay still.",
  metaDescription: "Skeleton loaders with pulse, shimmer and wave animations",
  browserSupport: "Browser Support",
  startingStyleDescription:
    "SkeletonReveal fades content in through @starting-style. Browsers without it show the content at once, nothing breaks.",
  preview: "Preview",
  previewHint: "One shimmer crosses the avatar, both lines and the button.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  components: "Components",
  loadingPreview: "Loading…",
  profileTitle: "Profile card: pulse, shimmer, wave",
  profileText:
    "The same card with three animations. Pulse fades every block together, shimmer sends one highlight across the group, wave lights the rows up from top to bottom.",
  commentsTitle: "Comment feed",
  commentsText:
    "All rows sit in one SkeletonGroup, so the shimmer passes through avatars and lines as one wave instead of restarting in every block.",
  articleTitle: "Article card with a 16:9 cover",
  articleText:
    "The cover keeps its ratio with aspect-video, the corners match the real card.",
  tableTitle: "Table 4 × 5",
  tableText:
    "The header is real, the cells are placeholders. In a wave group the rows light up one after another. Cell widths are fixed classes, so the markup is the same on the server and in the browser.",
  liveTitle: "Live: skeleton and content of the same shape",
  liveText:
    "The switch swaps the placeholder for content. The rows keep their heights, so the card does not jump. The numbers use Skeleton with loading: they stay in layout, invisible, and the placeholder is exactly as wide as the value.",
  props: "Props",
  skeletonVariant:
    "Animation. Without a value it follows the surrounding SkeletonGroup, and without a group it is pulse.",
  skeletonShape:
    "Ready-made shape: text is a full-width line, circle is a 40px round block, rect has no size, like shadcn.",
  skeletonLoading:
    "Works with children. true shows the placeholder and keeps the children invisible but laid out, so the size matches the content. false fades the children in.",
  skeletonClass:
    "Size, radius and color. Overrides the shape, so h-4 w-32 works as in shadcn.",
  groupText:
    "Wraps blocks so shimmer and wave run as one sweep across all of them. Adds role=status, aria-busy and a hidden label. The band has one angle and one speed for all blocks, like a mask with holes. The group uses transform, so position: fixed inside it is relative to the group.",
  groupVariant: "Animation of every block inside. A block can override it.",
  groupLabel: "Text for screen readers.",
  textText:
    "A paragraph of lines. Widths are fixed (the last line is 62%), not random, so the server and the browser render the same markup.",
  textLines: "Number of lines.",
  textVariant: "Animation of every line.",
  textLineClass: "Classes for every line, for example a height.",
  revealText:
    "Wrapper for the real content that replaces a placeholder, for example in a Suspense boundary. The content fades in on mount.",
  revealClass: "Additional CSS classes.",
  additionalClasses: "Additional CSS classes.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Заглушки для контента, который ещё грузится. Три анимации (pulse, shimmer, wave), готовые формы, группа с одним бликом на все блоки и плавное появление настоящего содержимого. Чистый CSS в серверном компоненте, без JavaScript. При reduced motion блоки стоят на месте.",
    metaDescription: "Skeleton-заглушки с анимациями pulse, shimmer и wave",
    browserSupport: "Поддержка браузеров",
    startingStyleDescription:
      "SkeletonReveal проявляет контент через @starting-style. Без него браузер просто покажет контент сразу, ничего не ломается.",
    preview: "Превью",
    previewHint: "Один блик проходит через аватар, обе строки и кнопку.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    components: "Компоненты",
    loadingPreview: "Загрузка…",
    profileTitle: "Карточка профиля: pulse, shimmer, wave",
    profileText:
      "Одна карточка с тремя анимациями. Pulse мигает всеми блоками разом, shimmer пускает один блик через группу, wave зажигает строки сверху вниз.",
    commentsTitle: "Лента комментариев",
    commentsText:
      "Все строки лежат в одной SkeletonGroup, поэтому блик идёт через аватары и строки одной волной, а не стартует заново в каждом блоке.",
    articleTitle: "Карточка статьи с обложкой 16:9",
    articleText:
      "Обложка держит пропорцию через aspect-video, скругления совпадают с настоящей карточкой.",
    tableTitle: "Таблица 4 × 5",
    tableText:
      "Заголовок настоящий, ячейки заглушки. В группе с wave строки загораются по очереди. Ширины ячеек заданы классами, поэтому разметка на сервере и в браузере одинаковая.",
    liveTitle: "Живой пример: скелетон и контент одной формы",
    liveText:
      "Переключатель меняет заглушку на контент. Высота строк совпадает, поэтому карточка не прыгает. Числа сделаны через Skeleton с loading: они остаются в потоке невидимыми, и заглушка ровно по ширине значения.",
    props: "Пропсы",
    skeletonVariant:
      "Анимация. Без значения берётся из ближайшей SkeletonGroup, а без группы это pulse.",
    skeletonShape:
      "Готовая форма: text это строка на всю ширину, circle круг 40px, rect без размера, как в shadcn.",
    skeletonLoading:
      "Работает с children. true показывает заглушку, а children остаются в потоке невидимыми, так что размер совпадает с контентом. false плавно проявляет children.",
    skeletonClass:
      "Размер, скругление и цвет. Перекрывает форму, так что h-4 w-32 работает как в shadcn.",
    groupText:
      "Объединяет блоки, чтобы shimmer и wave шли одним проходом через все. Добавляет role=status, aria-busy и скрытую подпись. Блик один, с одним углом и одной скоростью на все блоки, как маска с окошками. Группа использует transform, поэтому position: fixed внутри неё считается от группы.",
    groupVariant: "Анимация всех блоков внутри. Блок может задать свою.",
    groupLabel: "Текст для скринридеров.",
    textText:
      "Абзац из строк. Ширины фиксированные (последняя 62%), не случайные, так что сервер и браузер рисуют одну и ту же разметку.",
    textLines: "Количество строк.",
    textVariant: "Анимация всех строк.",
    textLineClass: "Классы для каждой строки, например высота.",
    revealText:
      "Обёртка для настоящего контента, который заменяет заглушку, например в границе Suspense. Контент проявляется при монтировании.",
    revealClass: "Дополнительные CSS-классы.",
    additionalClasses: "Дополнительные CSS-классы.",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return {
    title: "Skeleton",
    description: content[locale as Locale].metaDescription,
  }
}

function SubProps({
  title,
  text,
  rows,
}: {
  title: string
  text: string
  rows: { name: string; type: string; default?: string; description: string }[]
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{text}</p>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[500px] text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left font-medium">Prop</th>
              <th className="p-3 text-left font-medium">Type</th>
              <th className="p-3 text-left font-medium">Default</th>
              <th className="p-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.name} className={index > 0 ? "border-t" : ""}>
                <td className="p-3 font-mono text-xs">{row.name}</td>
                <td className="p-3 font-mono text-xs">{row.type}</td>
                <td className="p-3 font-mono text-xs">{row.default ?? "-"}</td>
                <td className="p-3">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Example({
  title,
  text,
  code,
  children,
}: {
  title: string
  text: string
  code: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-medium">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{text}</p>
      <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
        {children}
      </div>
      <CodeBlock className="mt-4">{code}</CodeBlock>
    </div>
  )
}

export default async function SkeletonPage({ params }: Props) {
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
    { id: "components", title: t.components, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Skeleton" />
        <p className="text-lg text-muted-foreground">{t.description}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "starting-style",
              description: t.startingStyleDescription,
            },
          ]}
        />

        <DocsSection id="preview" title={t.preview}>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <SkeletonGroup
              label={t.loadingPreview}
              className="flex w-full max-w-sm items-center gap-3"
            >
              <Skeleton shape="circle" className="size-12" />
              <div className="flex-1 space-y-2">
                <Skeleton shape="text" className="w-3/4" />
                <Skeleton shape="text" className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-9 w-20" />
            </SkeletonGroup>
          </div>
        </DocsSection>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/skeleton" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import {
  Skeleton,
  SkeletonGroup,
  SkeletonText,
} from "@/components/ui/skeleton"

// Same as shadcn: size it with classes
<Skeleton className="h-4 w-32" />

// One shimmer across all blocks, with a label for screen readers
<SkeletonGroup variant="shimmer" label="Loading profile…" className="flex gap-3">
  <Skeleton shape="circle" className="size-12" />
  <div className="flex-1 space-y-2">
    <Skeleton shape="text" className="w-2/5" />
    <SkeletonText lines={2} />
  </div>
</SkeletonGroup>`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-10">
            <Example
              title={t.profileTitle}
              text={t.profileText}
              code={`{(["pulse", "shimmer", "wave"] as const).map((variant) => (
  <Card key={variant} className="gap-0 p-5">
    <SkeletonGroup variant={variant} className="space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="size-12" />
        <div className="flex-1 space-y-2">
          <Skeleton shape="text" className="w-2/5" />
          <Skeleton shape="text" className="h-3 w-3/5" />
        </div>
      </div>
      <SkeletonText lines={2} lineClassName="h-3" />
    </SkeletonGroup>
  </Card>
))}`}
            >
              <ProfileCompare />
            </Example>

            <Example
              title={t.commentsTitle}
              text={t.commentsText}
              code={`<SkeletonGroup label="Loading comments…" className="space-y-6">
  {[2, 1, 3, 2].map((lines, index) => (
    <div key={index} className="flex items-start gap-4">
      <Skeleton shape="circle" />
      <div className="flex-1 space-y-3">
        <Skeleton shape="text" className="h-3.5 w-28" />
        <SkeletonText lines={lines} lineClassName="h-3" />
      </div>
    </div>
  ))}
</SkeletonGroup>`}
            >
              <CommentsList />
            </Example>

            <Example
              title={t.articleTitle}
              text={t.articleText}
              code={`<Card className="gap-0 p-4">
  <SkeletonGroup className="space-y-4">
    <Skeleton className="aspect-video w-full rounded-lg" />
    <div className="space-y-3">
      <Skeleton shape="text" className="h-5 w-16 rounded-full" />
      <Skeleton shape="text" className="h-5 w-4/5" />
      <SkeletonText lines={2} lineClassName="h-3" />
    </div>
    <div className="flex items-center gap-3">
      <Skeleton shape="circle" className="size-8" />
      <div className="flex-1 space-y-1.5">
        <Skeleton shape="text" className="h-3 w-24" />
        <Skeleton shape="text" className="h-3 w-16" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  </SkeletonGroup>
</Card>`}
            >
              <ArticleCard />
            </Example>

            <Example
              title={t.tableTitle}
              text={t.tableText}
              code={`<SkeletonGroup variant="wave" className="overflow-hidden rounded-lg border">
  <table className="w-full text-sm">
    <thead>…real header…</thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index} className="border-t">
          <td className="h-14 px-4">
            <div className="flex items-center gap-3">
              <Skeleton shape="circle" className="size-8" />
              <Skeleton shape="text" className={\`h-3.5 \${row.name}\`} />
            </div>
          </td>
          <td className="px-4"><Skeleton className={\`h-5 rounded-full \${row.status}\`} /></td>
          <td className="px-4"><Skeleton className={\`h-3.5 \${row.role}\`} /></td>
          <td className="px-4"><Skeleton className={\`ml-auto h-3.5 \${row.amount}\`} /></td>
        </tr>
      ))}
    </tbody>
  </table>
</SkeletonGroup>`}
            >
              <DataTable />
            </Example>

            <Example
              title={t.liveTitle}
              text={t.liveText}
              code={`const [loading, setLoading] = useState(true)

// Rows have fixed heights in both states, so the card keeps its size
{loading ? (
  <SkeletonGroup label="Loading profile…">…placeholders…</SkeletonGroup>
) : (
  <SkeletonReveal>…real content…</SkeletonReveal>
)}

// The value stays in layout: the placeholder is as wide as the text
<Skeleton loading={loading} className="w-fit rounded-sm text-lg font-semibold">
  12.4k
</Skeleton>`}
            >
              <SkeletonSwapDemo />
            </Example>
          </div>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "variant",
              type: '"pulse" | "shimmer" | "wave"',
              default: '"pulse"',
              description: t.skeletonVariant,
            },
            {
              name: "shape",
              type: '"rect" | "text" | "circle"',
              default: '"rect"',
              description: t.skeletonShape,
            },
            {
              name: "loading",
              type: "boolean",
              default: "true",
              description: t.skeletonLoading,
            },
            {
              name: "className",
              type: "string",
              description: t.skeletonClass,
            },
          ]}
        />

        <DocsSection id="components" title={t.components}>
          <div className="space-y-8">
            <SubProps
              title="SkeletonGroup"
              text={t.groupText}
              rows={[
                {
                  name: "variant",
                  type: '"pulse" | "shimmer" | "wave"',
                  default: '"shimmer"',
                  description: t.groupVariant,
                },
                {
                  name: "label",
                  type: "string",
                  default: '"Loading…"',
                  description: t.groupLabel,
                },
                {
                  name: "className",
                  type: "string",
                  description: t.additionalClasses,
                },
              ]}
            />
            <SubProps
              title="SkeletonText"
              text={t.textText}
              rows={[
                {
                  name: "lines",
                  type: "number",
                  default: "3",
                  description: t.textLines,
                },
                {
                  name: "variant",
                  type: '"pulse" | "shimmer" | "wave"',
                  description: t.textVariant,
                },
                {
                  name: "lineClassName",
                  type: "string",
                  description: t.textLineClass,
                },
                {
                  name: "className",
                  type: "string",
                  description: t.additionalClasses,
                },
              ]}
            />
            <SubProps
              title="SkeletonReveal"
              text={t.revealText}
              rows={[
                {
                  name: "className",
                  type: "string",
                  description: t.revealClass,
                },
              ]}
            />
          </div>
        </DocsSection>
      </div>
    </DocsPage>
  )
}
