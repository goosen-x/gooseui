import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { BaselineStatus } from "@/registry/gooseui/ui/baseline-status"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/gooseui/ui/card"
import { CardDemo } from "./card-demo"

const en = {
  intro:
    "Card and its sections render div elements and accept standard div attributes. Compose a header, title, description, action, content and footer as needed; squircle changes the outer corners. Use it to group related content, and Badge for a compact status label.",
  auditFeature0Description: "Changes the header grid when an action exists",
  auditFeature1Description: "Creates a container for header content",
  browserSupport: "Browser Support",
  description: "Displays a card with header, content and footer",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  components: "Components",
  props: "Props",
  iosStyleSquircleCorners: "iOS-style squircle corners using CSS",
  regular: "Regular",
  component: "Component",
  description2: "Description",
  cardContainer: "Card container",
  cardHeaderSection: "Card header section",
  cardTitleText: "Card title text",
  cardDescriptionText: "Card description text",
  mainContentArea: "Main content area",
  cardFooterSection: "Card footer section",
  prop: "Prop",
  type: "Type",
  default: "Default",
  applyIosStyleSquircle: "Apply iOS-style squircle corners (Chrome 139+)",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    intro:
      "Card и его секции создают элементы div и принимают их стандартные атрибуты. Карточку можно собрать из заголовка, описания, действия, содержимого и нижней части; squircle меняет форму внешних углов. Используйте её для группы связанного содержимого, а Badge — для короткой метки статуса.",
    auditFeature0Description: "Меняет сетку заголовка при наличии действия",
    auditFeature1Description: "Создаёт контейнер для содержимого заголовка",
    browserSupport: "Поддержка браузеров",
    description: "Карточка с заголовком, содержимым и футером",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    components: "Компоненты",
    props: "Пропсы",
    iosStyleSquircleCorners: "Углы squircle в стиле iOS через CSS",
    regular: "Обычная",
    component: "Компонент",
    description2: "Описание",
    cardContainer: "Контейнер карточки",
    cardHeaderSection: "Секция заголовка карточки",
    cardTitleText: "Текст заголовка карточки",
    cardDescriptionText: "Текст описания карточки",
    mainContentArea: "Основная область содержимого",
    cardFooterSection: "Секция футера карточки",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    applyIosStyleSquircle: "Углы squircle в стиле iOS (Chrome 139+)",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Card",
    description: t.description,
  }
}

export default async function CardPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "squircle", title: "Squircle", level: 2 },
    { id: "components", title: t.components, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Card" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
            },
            {
              featureId: "container-queries",
              description: t.auditFeature1Description,
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
          <div className="flex items-center justify-center rounded-lg bg-muted/30 px-4 py-12">
            <CardDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/card" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <p>Footer</p>
      </CardFooter>
    </Card>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="squircle"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Squircle
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.iosStyleSquircleCorners}{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              corner-shape: squircle
            </code>
            .
          </p>
          <BaselineStatus
            featureId="corner-shape"
            browserCheck="corner-shape"
          />
          <div className="flex flex-wrap items-start justify-center gap-6 rounded-lg bg-muted/30 px-4 py-8">
            <div className="flex flex-col items-center gap-2">
              <Card className="w-[200px]">
                <CardHeader>
                  <CardTitle className="text-base">{t.regular}</CardTitle>
                  <CardDescription className="text-xs">
                    border-radius
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Card squircle className="w-[200px]">
                <CardHeader>
                  <CardTitle className="text-base">Squircle</CardTitle>
                  <CardDescription className="text-xs">
                    corner-shape
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
          <CodeBlock>{`<Card squircle>
  <CardHeader>
    <CardTitle>Squircle Card</CardTitle>
  </CardHeader>
</Card>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="components"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.components}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.component}</th>
                  <th className="text-left p-3 font-medium">
                    {t.description2}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">Card</td>
                  <td className="p-3">{t.cardContainer}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardHeader</td>
                  <td className="p-3">{t.cardHeaderSection}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardTitle</td>
                  <td className="p-3">{t.cardTitleText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardDescription</td>
                  <td className="p-3">{t.cardDescriptionText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardContent</td>
                  <td className="p-3">{t.mainContentArea}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardFooter</td>
                  <td className="p-3">{t.cardFooterSection}</td>
                </tr>
              </tbody>
            </table>
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
                  <td className="p-3 font-mono text-xs">squircle</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">{t.applyIosStyleSquircle}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
