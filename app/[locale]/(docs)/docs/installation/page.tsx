import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

const en = {
  title: "Installation",
  description: "How to install and configure GooseUI in your project",
  requirements: "Requirements",
  requirementsNote:
    "Component dependencies are installed automatically when you add a component via CLI.",
  method1: "Method 1: Direct URL",
  method1Text: "Install a component directly via URL:",
  method2: "Method 2: Via namespace",
  method2Text: "Add the GooseUI namespace to your components.json:",
  method2Text2: "Now you can install components:",
  structure: "Project Structure",
  structureText: "After installation, components will appear in:",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Установка",
    description: "Как установить и настроить GooseUI в проекте",
    requirements: "Требования",
    requirementsNote:
      "Зависимости компонента ставятся автоматически, когда вы добавляете его через CLI.",
    method1: "Способ 1: прямой URL",
    method1Text: "Установите компонент напрямую по URL:",
    method2: "Способ 2: через namespace",
    method2Text: "Добавьте namespace GooseUI в components.json:",
    method2Text2: "Теперь можно устанавливать компоненты:",
    structure: "Структура проекта",
    structureText: "После установки компоненты появятся здесь:",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

export default async function InstallationPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "requirements", title: t.requirements, level: 2 },
    { id: "method-1-direct-url", title: t.method1, level: 2 },
    { id: "method-2-via-namespace", title: t.method2, level: 2 },
    { id: "project-structure", title: t.structure, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-6">
        <DocsPageNav title={t.title} />
        <p className="text-lg text-muted-foreground">{t.description}</p>

        <div className="space-y-4">
          <h2
            id="requirements"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.requirements}
          </h2>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>React 18+</li>
            <li>Next.js 13+ (App Router)</li>
            <li>Tailwind CSS 4+</li>
            <li>TypeScript</li>
          </ul>
          <p className="text-sm text-muted-foreground">{t.requirementsNote}</p>
        </div>

        <div className="space-y-4">
          <h2
            id="method-1-direct-url"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.method1}
          </h2>
          <p className="leading-7">{t.method1Text}</p>
          <InstallCommand packageName="@gooseui/button" />
        </div>

        <div className="space-y-4">
          <h2
            id="method-2-via-namespace"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.method2}
          </h2>
          <p className="leading-7">{t.method2Text}</p>
          <CodeBlock>{`{
  "registries": {
    "@gooseui": "https://gooseui.pro/r/{name}.json"
  }
}`}</CodeBlock>
          <p className="leading-7">{t.method2Text2}</p>
          <InstallCommand packageName="@gooseui/button" />
        </div>

        <div className="space-y-4">
          <h2
            id="project-structure"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.structure}
          </h2>
          <p className="leading-7">{t.structureText}</p>
          <CodeBlock>{`your-project/
├── components/
│   └── ui/
│       └── button.tsx
├── lib/
│   └── utils.ts
└── ...`}</CodeBlock>
        </div>
      </div>
    </DocsPage>
  )
}
