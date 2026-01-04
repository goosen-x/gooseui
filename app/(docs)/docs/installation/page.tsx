import { CodeBlock } from "@/components/docs/code-block"
import { InstallCommand } from "@/components/docs/install-command"

export const metadata = {
  title: "Installation",
  description: "How to install and configure GooseUI in your project",
}

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          How to install and configure GooseUI in your project
        </p>
      </div>

      <div className="space-y-4">
        <h2
          id="requirements"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Requirements
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>React 18+</li>
          <li>Next.js 13+ (App Router)</li>
          <li>Tailwind CSS 4+</li>
          <li>TypeScript</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Component dependencies are installed automatically when you add a
          component via CLI.
        </p>
      </div>

      <div className="space-y-4">
        <h2
          id="method-1-direct-url"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Method 1: Direct URL
        </h2>
        <p className="leading-7">Install a component directly via URL:</p>
        <InstallCommand packageName="https://gooseui.pro/r/button.json" />
      </div>

      <div className="space-y-4">
        <h2
          id="method-2-via-namespace"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Method 2: Via namespace
        </h2>
        <p className="leading-7">
          Add the GooseUI namespace to your components.json:
        </p>
        <CodeBlock>{`{
  "registries": {
    "@gooseui": "https://gooseui.pro/r/{name}.json"
  }
}`}</CodeBlock>
        <p className="leading-7">Now you can install components:</p>
        <InstallCommand packageName="@gooseui/button" />
      </div>

      <div className="space-y-4">
        <h2
          id="project-structure"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Project Structure
        </h2>
        <p className="leading-7">
          After installation, components will appear in:
        </p>
        <CodeBlock>{`your-project/
├── components/
│   └── ui/
│       └── button.tsx
├── lib/
│   └── utils.ts
└── ...`}</CodeBlock>
      </div>
    </div>
  )
}
