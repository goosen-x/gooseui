import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Separator } from "@/registry/gooseui/ui/separator"

const en = {
  description:
    "Separator divides related sections of content. It renders a native horizontal rule and works without JavaScript. Use a vertical orientation between items in a row. Set decorative to false when the division has semantic meaning.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  example: "Example",
  above: "Above the divider",
  below: "Below the divider",
  prop: "Direction of the divider.",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Separator разделяет связанные части содержимого. Компонент отображает нативный hr и работает без JavaScript. Вертикальная ориентация подходит для элементов в строке. Установите decorative в false, если разделение имеет смысловое значение.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    example: "Пример",
    above: "Над разделителем",
    below: "Под разделителем",
    prop: "Направление разделителя.",
  },
}
type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return {
    title: "Separator",
    description: content[locale as Locale].description,
  }
}
export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    ["preview", t.preview],
    ["installation", t.installation],
    ["usage", t.usage],
    ["examples", t.examples],
    ["props", t.props],
  ].map(([id, title]) => ({ id, title, level: 2 }))
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Separator" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <DocsSection id="preview" title={t.preview}>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <div className="w-full max-w-xs space-y-3 text-sm">
              <p>{t.above}</p>
              <Separator />
              <p>{t.below}</p>
            </div>
          </div>
        </DocsSection>
        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/separator" />
        </DocsSection>
        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { Separator } from "@/components/ui/separator"

<Separator />`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={t.examples}>
          <h3 className="mb-3 text-lg font-medium">{t.example}</h3>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <div className="w-full max-w-xs space-y-3 text-sm">
              <p>{t.above}</p>
              <Separator />
              <p>{t.below}</p>
            </div>
          </div>
          <CodeBlock>{`<Separator />`}</CodeBlock>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "orientation",
              type: "string",
              default: "horizontal",
              description: t.prop,
            },
            {
              name: "decorative",
              type: "boolean",
              default: "true",
              description:
                "Hide decorative dividers from assistive technology.",
            },
            { name: "className", type: "string", description: "CSS class" },
          ]}
        />
      </div>
    </DocsPage>
  )
}
