import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { BaselineStatus } from "@/registry/new-york/ui/baseline-status"
import {
  ButtonPreview,
  ButtonSizesDemo,
  ButtonSquircleDemo,
  ButtonVariantDemo,
} from "./button-demo"

export const metadata = {
  title: "Button",
  description: "A button with various variants and sizes",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "variants", title: "Variants", level: 2 },
  { id: "sizes", title: "Sizes", level: 2 },
  { id: "squircle", title: "Squircle", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function ButtonPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Button" />
        <p className="text-lg text-muted-foreground">
          A button with various variants and sizes
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <ButtonPreview />
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="https://gooseui.pro/r/button.json" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

export function MyComponent() {
  return <Button>Click me</Button>
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="variants"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Variants
          </h2>

          <h3
            id="variant-default"
            className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
          >
            Default
          </h3>
          <ButtonVariantDemo label="Default" />
          <CodeBlock>{`<Button>Default</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Secondary
          </h3>
          <ButtonVariantDemo variant="secondary" label="Secondary" />
          <CodeBlock>{`<Button variant="secondary">Secondary</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Destructive
          </h3>
          <ButtonVariantDemo variant="destructive" label="Destructive" />
          <CodeBlock>{`<Button variant="destructive">Destructive</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Outline
          </h3>
          <ButtonVariantDemo variant="outline" label="Outline" />
          <CodeBlock>{`<Button variant="outline">Outline</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Ghost
          </h3>
          <ButtonVariantDemo variant="ghost" label="Ghost" />
          <CodeBlock>{`<Button variant="ghost">Ghost</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Link
          </h3>
          <ButtonVariantDemo variant="link" label="Link" />
          <CodeBlock>{`<Button variant="link">Link</Button>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="sizes"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Sizes
          </h2>
          <ButtonSizesDemo />
          <CodeBlock>{`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">...</Button>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="squircle"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Squircle
          </h2>
          <p className="text-sm text-muted-foreground">
            iOS-style squircle corners using CSS{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              corner-shape: squircle
            </code>
            .
          </p>
          <BaselineStatus
            featureId="corner-shape"
            browserCheck="corner-shape"
          />
          <ButtonSquircleDemo />
          <CodeBlock>{`<Button squircle>Squircle</Button>
<Button squircle variant="secondary">Secondary</Button>
<Button squircle variant="outline">Outline</Button>`}</CodeBlock>
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
                    &quot;outline&quot; | &quot;secondary&quot; |
                    &quot;ghost&quot; | &quot;link&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                  <td className="p-3">Visual style variant</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;default&quot; | &quot;sm&quot; | &quot;lg&quot; |
                    &quot;icon&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                  <td className="p-3">Size of the button</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">asChild</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">Render as child element</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">squircle</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">
                    Apply iOS-style squircle corners (Chrome 139+)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
