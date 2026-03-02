/**
 * COMPONENT DOCUMENTATION TEMPLATE
 *
 * Copy this file when creating documentation for a new component.
 * Rename to: {component-name}/page.tsx
 *
 * STRUCTURE ORDER (follow strictly):
 * 1. DocsPageNav - title and navigation
 * 2. Description - short description
 * 3. Browser Support - BaselineStatus (if component uses modern APIs)
 * 4. Preview - interactive demo
 * 5. Installation - InstallCommand
 * 6. Usage - basic code example
 * 7. Examples - different use cases
 * 8. Props - properties table (4 columns: Prop, Type, Default, Description)
 * 9. [Components] - for compound components (optional)
 * 10. [Features] - feature list (optional)
 * 11. [Hook] - hook documentation (optional)
 * 12. [References] - external links (optional)
 */

import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { BaselineStatus } from "@/registry/new-york/ui/baseline-status"
// import { ComponentName } from "@/registry/new-york/ui/component-name"
// import { ComponentDemo } from "./component-demo"

export const metadata = {
  title: "Component Name",
  description: "Short description of the component",
}

export default function ComponentNamePage() {
  return (
    <div className="space-y-8">
      {/* 1. Navigation - prev/next links are auto-generated from docs-navigation.ts */}
      <DocsPageNav title="Component Name" />

      {/* 2. Description */}
      <p className="text-muted-foreground">
        Short description of the component and its purpose.
      </p>

      {/* 3. Browser Support (if uses modern APIs) */}
      {/* Remove this section if component doesn't use modern browser APIs */}
      <div className="space-y-4">
        <h2
          id="browser-support"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Browser Support
        </h2>
        <BaselineStatus
          featureId="feature-id"
          browserCheck="view-transitions" // or "popover" | "anchor-positioning"
        />
        <p className="text-sm text-muted-foreground">
          Description of browser support and graceful degradation behavior.
        </p>
      </div>

      {/* 4. Preview */}
      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
          {/* <ComponentDemo /> */}
          <p className="text-muted-foreground">Component preview here</p>
        </div>
      </div>

      {/* 5. Installation */}
      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="@gooseui/component-name" />
      </div>

      {/* 6. Usage */}
      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <CodeBlock>{`import { ComponentName } from "@/components/ui/component-name"

export default function Example() {
  return <ComponentName />
}`}</CodeBlock>
      </div>

      {/* 7. Examples */}
      <div className="space-y-4">
        <h2
          id="examples"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <div className="space-y-8">
          {/* Example 1 */}
          <div>
            <h3 className="text-lg font-medium mb-3">Example Title</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Description of this example.
            </p>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              {/* <ExampleDemo /> */}
              <p className="text-muted-foreground">Example preview</p>
            </div>
            <CodeBlock className="mt-4">{`<ComponentName variant="example" />`}</CodeBlock>
          </div>

          {/* Example 2 */}
          <div>
            <h3 className="text-lg font-medium mb-3">Another Example</h3>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              {/* <AnotherExampleDemo /> */}
              <p className="text-muted-foreground">Another example preview</p>
            </div>
            <CodeBlock className="mt-4">{`<ComponentName size="lg" />`}</CodeBlock>
          </div>
        </div>
      </div>

      {/* 8. Props */}
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
                  &quot;default&quot; | &quot;secondary&quot;
                </td>
                <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                <td className="p-3">Visual style variant</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">size</td>
                <td className="p-3 font-mono text-xs">
                  &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                </td>
                <td className="p-3 font-mono text-xs">&quot;md&quot;</td>
                <td className="p-3">Size of the component</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">-</td>
                <td className="p-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 9. Components (for compound components) - OPTIONAL */}
      {/* Uncomment if component has multiple sub-components */}
      {/*
      <div className="space-y-4">
        <h2
          id="components"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Components
        </h2>
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Component</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">ComponentRoot</td>
                <td className="p-3">Root component, manages state</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">ComponentItem</td>
                <td className="p-3">Individual item</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      */}

      {/* 10. Features - OPTIONAL */}
      {/* Uncomment if component has notable features worth highlighting */}
      {/*
      <div className="space-y-4">
        <h2
          id="features"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Feature 1</strong> — description
          </li>
          <li>
            <strong className="text-foreground">Feature 2</strong> — description
          </li>
        </ul>
      </div>
      */}

      {/* 11. Hook - OPTIONAL */}
      {/* Uncomment if component exposes a hook */}
      {/*
      <div className="space-y-4">
        <h2
          id="hook"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          useComponentName Hook
        </h2>
        <p className="text-muted-foreground">
          Access component state and controls programmatically:
        </p>
        <CodeBlock>{`import { useComponentName } from "@/components/ui/component-name"

function CustomControls() {
  const { state, action } = useComponentName()
  return <button onClick={action}>{state}</button>
}`}</CodeBlock>
      </div>
      */}

      {/* Baseline component for automatic feature detection - OPTIONAL */}
      {/* <ComponentBaseline slug="component-name" /> */}

      {/* 12. References - OPTIONAL */}
      {/* Uncomment if there are useful external resources */}
      {/*
      <div className="space-y-4">
        <h2
          id="references"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          References
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Resource Name
            </a>
          </li>
        </ul>
      </div>
      */}
    </div>
  )
}
