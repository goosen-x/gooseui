import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  ButtonPreview,
  ButtonSizesDemo,
  ButtonVariantDemo,
} from "./button-demo"

export const metadata = {
  title: "Button",
  description: "A button with various variants and sizes",
}

export default function ButtonPage() {
  return (
    <div className="space-y-6">
      <DocsPageNav
        title="Button"
        prevHref="/docs/components"
        nextHref="/docs/components/card"
      />
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
        <ButtonVariantDemo label="Button" />
        <CodeBlock>{`<Button>Button</Button>`}</CodeBlock>

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
          id="props"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">variant</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  &quot;default&quot; | &quot;destructive&quot; |
                  &quot;outline&quot; | &quot;secondary&quot; |
                  &quot;ghost&quot; | &quot;link&quot;
                </td>
                <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">size</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  &quot;default&quot; | &quot;sm&quot; | &quot;lg&quot; |
                  &quot;icon&quot;
                </td>
                <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">asChild</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  boolean
                </td>
                <td className="py-3 px-4 font-mono">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
