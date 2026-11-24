import { setRequestLocale } from "next-intl/server"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { getAvailableComponents } from "@/lib/config/docs-navigation"
import { getInstallPackageName } from "@/lib/config/registry"
import { Badge } from "@/registry/gooseui/ui/badge"

// Get components from single source of truth
const availableComponents = getAvailableComponents()

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Using shadcn CLI to install components",
  addOne: "Adding a Component",
  addOneText: "Use the add command to install a component:",
  addMany: "Adding Multiple Components",
  addManyText: "You can install multiple components at once:",
  available: "Available Components",
  availableText: "List of all available components:",
  new: "New",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Установка компонентов через shadcn CLI",
    addOne: "Добавление компонента",
    addOneText: "Установите компонент командой add:",
    addMany: "Добавление нескольких компонентов",
    addManyText: "Можно установить сразу несколько компонентов:",
    available: "Доступные компоненты",
    availableText: "Список всех доступных компонентов:",
    new: "Новое",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "CLI", description: t.description }
}

export default async function CLIPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "adding-a-component", title: t.addOne, level: 2 },
    { id: "adding-multiple-components", title: t.addMany, level: 2 },
    { id: "available-components", title: t.available, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-6">
        <DocsPageNav title="CLI" />
        <p className="text-lg text-muted-foreground">{t.description}</p>

        <div className="space-y-4">
          <h2
            id="adding-a-component"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.addOne}
          </h2>
          <p className="leading-7">{t.addOneText}</p>
          <InstallCommand packageName={getInstallPackageName("button")} />
        </div>

        <div className="space-y-4">
          <h2
            id="adding-multiple-components"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.addMany}
          </h2>
          <p className="leading-7">{t.addManyText}</p>
          <InstallCommand
            packageName=""
            commands={{
              npm: `npx shadcn@latest add ${getInstallPackageName("button")} ${getInstallPackageName("card")} ${getInstallPackageName("input")}`,
              pnpm: `pnpm dlx shadcn@latest add ${getInstallPackageName("button")} ${getInstallPackageName("card")} ${getInstallPackageName("input")}`,
              yarn: `npx shadcn@latest add ${getInstallPackageName("button")} ${getInstallPackageName("card")} ${getInstallPackageName("input")}`,
              bun: `bunx --bun shadcn@latest add ${getInstallPackageName("button")} ${getInstallPackageName("card")} ${getInstallPackageName("input")}`,
            }}
          />
        </div>

        <div className="space-y-4">
          <h2
            id="available-components"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.available}
          </h2>
          <p className="leading-7">{t.availableText}</p>
          <div className="grid gap-2">
            {availableComponents.map((component) => (
              <Link
                key={component.slug}
                href={component.href}
                className="flex cursor-pointer flex-col gap-2 rounded-lg border p-3 transition-colors hover:border-foreground/20 hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{component.slug}</span>
                  {component.isNew && !component.isDraft && (
                    <Badge className="h-5 bg-primary px-1.5 text-[10px] text-white">
                      {t.new}
                    </Badge>
                  )}
                </div>
                <code className="w-fit rounded bg-muted px-2 py-1 text-xs break-all">
                  {getInstallPackageName(component.slug)}
                </code>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
