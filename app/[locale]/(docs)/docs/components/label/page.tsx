import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Input } from "@/registry/gooseui/ui/input"
import { Label } from "@/registry/gooseui/ui/label"

const en = {
  description: "A label for a form control",
  intro:
    "Label renders a native label and accepts attributes such as htmlFor. Associate it with a control by matching htmlFor to the control id. Disabled peer and group states reduce its opacity; use Checkbox when the control needs a built-in label.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Подпись для поля формы",
    intro:
      "Label создаёт нативный элемент label и принимает его атрибуты, в том числе htmlFor. Чтобы связать подпись с полем, укажите в htmlFor значение его id. Для отключённого соседнего поля или группы подпись становится бледнее; у Checkbox подпись уже встроена.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
  },
}
type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return { title: "Label", description: content[locale as Locale].description }
}
export default async function LabelPage({ params }: Props) {
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
        <DocsPageNav title="Label" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <p className="text-muted-foreground">{t.intro}</p>
        <section className="space-y-4">
          <h2 id="preview" className="text-2xl font-semibold">
            {t.preview}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <h2 id="installation" className="text-2xl font-semibold">
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/label" />
        </section>
        <section className="space-y-4">
          <h2 id="usage" className="text-2xl font-semibold">
            {t.usage}
          </h2>
          <CodeBlock>{`import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />`}</CodeBlock>
        </section>
      </div>
    </DocsPage>
  )
}
