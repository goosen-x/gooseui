import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { BaselineStatus } from "@/registry/new-york/ui/baseline-status"
import {
  MorphingDialogCardDemo,
  MorphingDialogDemo,
} from "./morphing-dialog-demo"

export const metadata = {
  title: "Morphing Dialog",
  description:
    "Dialog with morphing animation using native View Transitions API",
}

export default function MorphingDialogPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav
        title="Morphing Dialog"
        prevHref="/docs/components/promo-banner"
      />
      <p className="text-muted-foreground">
        A dialog component with smooth morphing animations powered by the native{" "}
        <strong>View Transitions API</strong>. Supports click-outside and Escape
        key for closing.
      </p>

      <div className="space-y-4">
        <h2
          id="browser-support"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Browser Support
        </h2>
        <BaselineStatus
          featureId="view-transitions"
          browserCheck="view-transitions"
        />
        <p className="text-sm text-muted-foreground mt-3">
          View Transitions API is supported in Chrome 111+, Edge 111+, Safari
          18+. Firefox support is in development. The component gracefully
          degrades to instant transitions in unsupported browsers.
        </p>
      </div>

      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <p className="text-sm text-muted-foreground">
          Click on the card to open the dialog with a morphing animation.
        </p>
        <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
          <MorphingDialogDemo />
        </div>
      </div>

      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/morphing-dialog.json" />
      </div>

      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <CodeBlock>{`import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
  MorphingDialogClose,
} from "@/components/ui/morphing-dialog"

export default function Example() {
  return (
    <MorphingDialog>
      <MorphingDialogTrigger>
        <MorphingDialogImage src="/image.jpg" alt="..." />
        <MorphingDialogTitle>Title</MorphingDialogTitle>
        <MorphingDialogSubtitle>Subtitle</MorphingDialogSubtitle>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent>
          <MorphingDialogClose />
          <MorphingDialogImage src="/image.jpg" alt="..." />
          <MorphingDialogTitle>Title</MorphingDialogTitle>
          <MorphingDialogSubtitle>Subtitle</MorphingDialogSubtitle>
          <MorphingDialogDescription>
            Full description here...
          </MorphingDialogDescription>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}`}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2
          id="examples"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Profile Card</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use with profile cards for a smooth expansion effect
            </p>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              <MorphingDialogCardDemo />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2
          id="components"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Components
        </h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Component</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">MorphingDialog</td>
                <td className="p-3">Root component, manages state</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">MorphingDialogTrigger</td>
                <td className="p-3">Clickable area that opens the dialog</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">
                  MorphingDialogContainer
                </td>
                <td className="p-3">Portal container with backdrop</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">MorphingDialogContent</td>
                <td className="p-3">Dialog content wrapper</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">MorphingDialogImage</td>
                <td className="p-3">Image with view transition</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">MorphingDialogTitle</td>
                <td className="p-3">Title with view transition</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">
                  MorphingDialogSubtitle
                </td>
                <td className="p-3">Subtitle with view transition</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">
                  MorphingDialogDescription
                </td>
                <td className="p-3">Description content</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">MorphingDialogClose</td>
                <td className="p-3">Close button (X icon)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2
          id="features"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <strong>Native View Transitions API</strong> — no external animation
            libraries
          </li>
          <li>
            <strong>Click-outside to close</strong> — click backdrop to dismiss
          </li>
          <li>
            <strong>Escape key support</strong> — keyboard accessible
          </li>
          <li>
            <strong>Focus trap</strong> — focus stays within dialog
          </li>
          <li>
            <strong>Body scroll lock</strong> — prevents background scrolling
          </li>
          <li>
            <strong>Graceful degradation</strong> — works without animations in
            older browsers
          </li>
          <li>
            <strong>Reduced motion support</strong> — respects{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              prefers-reduced-motion
            </code>
          </li>
        </ul>
      </div>
    </div>
  )
}
