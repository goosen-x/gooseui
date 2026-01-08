import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  AnimatedCheckboxPreview,
  AnimatedCheckboxSizes,
  AnimatedCheckboxVariants,
  AnimatedCheckboxWithoutLabel,
} from "./animated-checkbox-demo"

export const metadata = {
  title: "Checkbox",
  description: "A checkbox with smooth SVG path animation when checked",
}

export default function AnimatedCheckboxPage() {
  return (
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
        <AnimatedCheckboxPreview />
      </div>

      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/checkbox.json" />
      </div>

      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <CodeBlock>{`import { AnimatedCheckbox } from "@/components/ui/animated-checkbox"

export function MyComponent() {
  return <AnimatedCheckbox label="Accept terms" />
}`}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2
          id="variants"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Variants
        </h2>
        <AnimatedCheckboxVariants />
        <CodeBlock>{`<AnimatedCheckbox variant="default" label="Default" />
<AnimatedCheckbox variant="destructive" label="Destructive" />
<AnimatedCheckbox variant="success" label="Success" />`}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2
          id="sizes"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Sizes
        </h2>
        <AnimatedCheckboxSizes />
        <CodeBlock>{`<AnimatedCheckbox size="sm" label="Small" />
<AnimatedCheckbox size="default" label="Default" />
<AnimatedCheckbox size="lg" label="Large" />`}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2
          id="without-label"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Without Label
        </h2>
        <AnimatedCheckboxWithoutLabel />
        <CodeBlock>{`<AnimatedCheckbox size="sm" />
<AnimatedCheckbox size="default" />
<AnimatedCheckbox size="lg" />`}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Props
        </h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
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
  )
}
