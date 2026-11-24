import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Textarea } from "@/registry/gooseui/ui/textarea"

const en = {
  description: "A multiline text field",
  intro:
    "Textarea renders a native textarea and accepts attributes such as name, rows, required and disabled. Its height follows the content, while aria-invalid changes the border and focus ring. Use it for longer text; Input is suited to a single line.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Многострочное текстовое поле",
    intro:
      "Textarea создаёт нативное многострочное поле и принимает атрибуты name, rows, required и disabled. Высота подстраивается под содержимое, а aria-invalid меняет цвет рамки и обводки фокуса. Поле подходит для длинного текста; для одной строки используйте Input.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
  },
}
type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return {
    title: "Textarea",
    description: content[locale as Locale].description,
  }
}
export default async function TextareaPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  return (
    <DocsPage
      toc={[
        { id: "preview", title: t.preview, level: 2 },
        { id: "installation", title: t.installation, level: 2 },
        { id: "usage", title: t.usage, level: 2 },
      ]}
    >
      <div className="space-y-8">
        <DocsPageNav title="Textarea" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <p className="text-muted-foreground">{t.intro}</p>
        <section className="space-y-4">
          <h2 id="preview" className="text-2xl font-semibold">
            {t.preview}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <div className="w-full max-w-sm space-y-2">
              <Textarea
                aria-label="Message"
                placeholder="Message"
                className="max-w-sm"
              />
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <h2 id="installation" className="text-2xl font-semibold">
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/textarea" />
        </section>
        <section className="space-y-4">
          <h2 id="usage" className="text-2xl font-semibold">
            {t.usage}
          </h2>
          <CodeBlock>{`import { Textarea } from "@/components/ui/textarea"

<Textarea aria-label="Message" placeholder="Message" className="max-w-sm" />`}</CodeBlock>
        </section>
      </div>
    </DocsPage>
  )
}
