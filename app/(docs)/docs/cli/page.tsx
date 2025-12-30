import { InstallCommand } from "@/components/docs/install-command"

export const metadata = {
  title: "CLI",
  description: "Using shadcn CLI to install components",
}

export default function CLIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">CLI</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Using shadcn CLI to install components
        </p>
      </div>

      <div className="space-y-4">
        <h2
          id="adding-a-component"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Adding a Component
        </h2>
        <p className="leading-7">Use the add command to install a component:</p>
        <InstallCommand packageName="@gooseui/button" />
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
            npm: "npx shadcn@latest add @gooseui/button @gooseui/card @gooseui/input",
            pnpm: "pnpm dlx shadcn@latest add @gooseui/button @gooseui/card @gooseui/input",
            yarn: "npx shadcn@latest add @gooseui/button @gooseui/card @gooseui/input",
            bun: "bunx --bun shadcn@latest add @gooseui/button @gooseui/card @gooseui/input",
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
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">border-beam</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">
              @gooseui/border-beam
            </code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">button</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">
              @gooseui/button
            </code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">card</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">
              @gooseui/card
            </code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">input</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">
              @gooseui/input
            </code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">label</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">
              @gooseui/label
            </code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">textarea</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">
              @gooseui/textarea
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
