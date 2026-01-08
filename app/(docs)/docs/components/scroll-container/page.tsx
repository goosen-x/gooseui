import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import { ScrollContainerDemo } from "./demo"

export const metadata = {
  title: "Scroll Container",
  description: "Container with custom styled scrollbar",
}

export default function ScrollContainerPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav title="Scroll Container" />

      <p className="text-muted-foreground">
        Container with custom styled scrollbar. Works in Chrome, Firefox, and Safari.
      </p>

      <DocsPreview description="Left: auto-hide scrollbar (hover to show). Right: always visible scrollbar.">
        <ScrollContainerDemo />
      </DocsPreview>

      <DocsSection id="installation" title="Installation">
        <InstallCommand packageName="https://gooseui.pro/r/scroll-container.json" />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <CodeBlock>{`import { ScrollContainer } from "@/components/ui/scroll-container"

<ScrollContainer height="20rem">
  <div className="p-4 space-y-4">
    {/* Your scrollable content */}
  </div>
</ScrollContainer>`}</CodeBlock>
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Auto-hide scrollbar</h3>
            <CodeBlock>{`<ScrollContainer height={300} autoHide>
  {/* Scrollbar appears only on hover */}
</ScrollContainer>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Different sizes</h3>
            <CodeBlock>{`<ScrollContainer scrollbarSize="sm" />
<ScrollContainer scrollbarSize="md" /> {/* default */}
<ScrollContainer scrollbarSize="lg" />`}</CodeBlock>
          </div>
        </div>
      </DocsSection>

      <DocsPropsTable
        props={[
          {
            name: "height",
            type: "string | number",
            default: '"100%"',
            description: "Container height",
          },
          {
            name: "autoHide",
            type: "boolean",
            default: "true",
            description: "Show scrollbar only on hover",
          },
          {
            name: "scrollbarSize",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: "Scrollbar width",
          },
          {
            name: "className",
            type: "string",
            description: "Additional CSS classes",
          },
        ]}
      />
    </div>
  )
}
