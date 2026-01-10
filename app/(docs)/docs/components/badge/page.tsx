import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Badge",
  description:
    "Small status indicator with variants for labels, tags, and status",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "variants", title: "Variants", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function BadgePage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav
          title="Badge"
          prevHref="/docs/components/animated-timer"
          nextHref="/docs/components/baseline-status"
        />
        <p className="text-lg text-muted-foreground">
          Small status indicator with variants for labels, tags, and status.
        </p>

        {/* Preview */}
        <section>
          <h2
            id="preview"
            className="mb-4 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-muted/30 p-8">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="beta">Beta</Badge>
          </div>
        </section>

        {/* Installation */}
        <section>
          <h2
            id="installation"
            className="mb-4 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="https://gooseui.pro/r/badge.json" />
        </section>

        {/* Usage */}
        <section>
          <h2 id="usage" className="mb-4 text-2xl font-semibold tracking-tight">
            Usage
          </h2>
          <CodeBlock>{`import { Badge } from "@/components/ui/badge"

export function Example() {
  return (
    <Badge variant="default">Badge</Badge>
  )
}`}</CodeBlock>
        </section>

        {/* Variants */}
        <section>
          <h2
            id="variants"
            className="mb-4 text-2xl font-semibold tracking-tight"
          >
            Variants
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-lg bg-muted/30 p-6">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="beta">Beta</Badge>
            </div>
            <CodeBlock>{`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="beta">Beta</Badge>`}</CodeBlock>
          </div>
        </section>

        {/* Props */}
        <section>
          <h2 id="props" className="mb-4 text-2xl font-semibold tracking-tight">
            Props
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 font-medium">Prop</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Default</th>
                  <th className="p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-mono text-xs">variant</td>
                  <td className="p-3 font-mono text-xs">
                    "default" | "secondary" | "destructive" | "outline" |
                    "warning" | "beta"
                  </td>
                  <td className="p-3 font-mono text-xs">"default"</td>
                  <td className="p-3">Visual style variant</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">asChild</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">Render as child element</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsPage>
  )
}
