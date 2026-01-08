import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { getAvailableComponents } from "@/lib/config/docs-navigation"
import { getInstallPackageName } from "@/lib/config/registry"

export const metadata = {
  title: "CLI",
  description: "Using shadcn CLI to install components",
}

// Get components from single source of truth
const availableComponents = getAvailableComponents()

export default function CLIPage() {
  return (
    <div className="space-y-6">
      <DocsPageNav
        title="CLI"
        prevHref="/docs/installation"
        nextHref="/docs/components"
      />
      <p className="text-lg text-muted-foreground">
        Using shadcn CLI to install components
      </p>

      <div className="space-y-4">
        <h2
          id="adding-a-component"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Adding a Component
        </h2>
        <p className="leading-7">Use the add command to install a component:</p>
        <InstallCommand packageName={getInstallPackageName("button")} />
      </div>

      <div className="space-y-4">
        <h2
          id="adding-multiple-components"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Adding Multiple Components
        </h2>
        <p className="leading-7">
          You can install multiple components at once:
        </p>
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
          Available Components
        </h2>
        <p className="leading-7">List of all available components:</p>
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
                    New
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
  )
}
