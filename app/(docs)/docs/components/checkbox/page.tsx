import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  CheckboxPreview,
  CheckboxSizes,
  CheckboxVariants,
  CheckboxWithoutLabel,
} from "./checkbox-demo"

export const metadata = {
  title: "Checkbox",
  description: "A checkbox with smooth SVG path animation when checked",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "variants", title: "Variants", level: 2 },
  { id: "sizes", title: "Sizes", level: 2 },
  { id: "without-label", title: "Without Label", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function CheckboxPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Checkbox" />
        <p className="text-lg text-muted-foreground">
          A checkbox with smooth SVG path animation when checked. Zero
          dependencies, pure CSS animation.
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <CheckboxPreview />
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="@gooseui/checkbox" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { Checkbox } from "@/components/ui/checkbox"

export function MyComponent() {
  return <Checkbox label="Accept terms" />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="variants"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Variants
          </h2>
          <CheckboxVariants />
          <CodeBlock>{`<Checkbox variant="default" label="Default" />
<Checkbox variant="destructive" label="Destructive" />
<Checkbox variant="success" label="Success" />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="sizes"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Sizes
          </h2>
          <CheckboxSizes />
          <CodeBlock>{`<Checkbox size="sm" label="Small" />
<Checkbox size="default" label="Default" />
<Checkbox size="lg" label="Large" />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="without-label"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Without Label
          </h2>
          <CheckboxWithoutLabel />
          <CodeBlock>{`<Checkbox size="sm" />
<Checkbox size="default" />
<Checkbox size="lg" />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Props
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Prop</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Default</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">variant</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;default&quot; | &quot;destructive&quot; |
                    &quot;success&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                  <td className="p-3">Visual style variant</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                  <td className="p-3">Size of the checkbox</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">label</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">undefined</td>
                  <td className="p-3">Label text displayed next to checkbox</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
