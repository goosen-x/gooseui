import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  AnimatedCheckboxPreview,
  AnimatedCheckboxSizes,
  AnimatedCheckboxVariants,
  AnimatedCheckboxWithoutLabel,
} from "./animated-checkbox-demo"

export const metadata = {
  title: "Animated Checkbox",
  description: "A checkbox with smooth SVG path animation when checked",
}

export default function AnimatedCheckboxPage() {
  return (
    <div className="space-y-6">
      <DocsPageNav title="Animated Checkbox" />
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
        <InstallCommand packageName="https://gooseui.pro/r/animated-checkbox.json" />
      </div>

      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import { AnimatedCheckbox } from "@/components/ui/animated-checkbox"

export function MyComponent() {
  return <AnimatedCheckbox label="Accept terms" />
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2
          id="variants"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Variants
        </h2>
        <AnimatedCheckboxVariants />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<AnimatedCheckbox variant="default" label="Default" />
<AnimatedCheckbox variant="destructive" label="Destructive" />
<AnimatedCheckbox variant="success" label="Success" />`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2
          id="sizes"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Sizes
        </h2>
        <AnimatedCheckboxSizes />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<AnimatedCheckbox size="sm" label="Small" />
<AnimatedCheckbox size="default" label="Default" />
<AnimatedCheckbox size="lg" label="Large" />`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2
          id="without-label"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Without Label
        </h2>
        <AnimatedCheckboxWithoutLabel />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<AnimatedCheckbox size="sm" />
<AnimatedCheckbox size="default" />
<AnimatedCheckbox size="lg" />`}
        </pre>
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
                  &quot;success&quot;
                </td>
                <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">size</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  &quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;
                </td>
                <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">label</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  string
                </td>
                <td className="py-3 px-4 font-mono">undefined</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
