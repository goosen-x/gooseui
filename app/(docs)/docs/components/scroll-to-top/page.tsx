import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  ScrollToTopPreview,
  ScrollToTopDefaultDemo,
  ScrollToTopPillDemo,
  ScrollToTopMinimalDemo,
  ScrollToTopProgressDemo,
} from "./scroll-to-top-demo"

export const metadata = {
  title: "Scroll To Top",
  description:
    "Floating scroll-to-top button with 4 variants: default, pill, minimal, and progress indicator",
}

export default function ScrollToTopPage() {
  return (
    <div className="space-y-8">
      {/* 1. Navigation */}
      <DocsPageNav title="Scroll To Top" />

      {/* 2. Description */}
      <p className="text-muted-foreground">
        A floating button that appears after scrolling and smoothly scrolls the
        page back to the top. Available in 4 variants: default circle, pill with
        text, minimal icon-only, and progress indicator.
      </p>

      {/* 3. Preview */}
      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
          <ScrollToTopPreview />
        </div>
      </div>

      {/* 4. Installation */}
      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/scroll-to-top.json" />
      </div>

      {/* 5. Usage */}
      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <CodeBlock>{`import { ScrollToTop } from "@/components/ui/scroll-to-top"

export default function Page() {
  return (
    <main>
      {/* Your page content */}
      <ScrollToTop />
    </main>
  )
}`}</CodeBlock>
      </div>

      {/* 6. Variants */}
      <div className="space-y-4">
        <h2
          id="variants"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Variants
        </h2>

        <div className="space-y-8">
          {/* Default */}
          <div>
            <h3 className="text-lg font-medium mb-3">Default</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Circular button with arrow icon. Supports 3 sizes: sm, md, lg.
            </p>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              <ScrollToTopDefaultDemo />
            </div>
            <CodeBlock className="mt-4">{`import { ScrollToTop } from "@/components/ui/scroll-to-top"

<ScrollToTop />
<ScrollToTop size="sm" />
<ScrollToTop size="lg" />`}</CodeBlock>
          </div>

          {/* Pill */}
          <div>
            <h3 className="text-lg font-medium mb-3">Pill</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Elongated button with customizable text label.
            </p>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              <ScrollToTopPillDemo />
            </div>
            <CodeBlock className="mt-4">{`import { ScrollToTopPill } from "@/components/ui/scroll-to-top"

<ScrollToTopPill />
<ScrollToTopPill label="Back to top" />`}</CodeBlock>
          </div>

          {/* Minimal */}
          <div>
            <h3 className="text-lg font-medium mb-3">Minimal</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Icon-only button without background. Subtle and unobtrusive.
            </p>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              <ScrollToTopMinimalDemo />
            </div>
            <CodeBlock className="mt-4">{`import { ScrollToTopMinimal } from "@/components/ui/scroll-to-top"

<ScrollToTopMinimal />`}</CodeBlock>
          </div>

          {/* Progress */}
          <div>
            <h3 className="text-lg font-medium mb-3">Progress</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Circular button with scroll progress indicator. Shows how far
              user has scrolled on the page.
            </p>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              <ScrollToTopProgressDemo />
            </div>
            <CodeBlock className="mt-4">{`import { ScrollToTopProgress } from "@/components/ui/scroll-to-top"

<ScrollToTopProgress />
<ScrollToTopProgress progressColor="#10b981" />
<ScrollToTopProgress strokeWidth={4} />`}</CodeBlock>
          </div>
        </div>
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
          {/* Custom threshold */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Threshold</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Adjust the scroll distance before the button appears.
            </p>
            <CodeBlock>{`// Button appears after scrolling 500px
<ScrollToTop threshold={500} />

// Button appears after scrolling 100px
<ScrollToTop threshold={100} />`}</CodeBlock>
          </div>

          {/* Custom position */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Position</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Override default positioning with custom classes.
            </p>
            <CodeBlock>{`// Bottom left corner
<ScrollToTop className="left-6 right-auto" />

// Higher position
<ScrollToTop className="bottom-20" />`}</CodeBlock>
          </div>

          {/* With hook */}
          <div>
            <h3 className="text-lg font-medium mb-3">Using the Hook</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use the <code className="text-xs bg-muted px-1 py-0.5 rounded">useScrollToTop</code> hook
              for custom implementations.
            </p>
            <CodeBlock>{`import { useScrollToTop } from "@/components/ui/scroll-to-top"

function CustomScrollButton() {
  const { isVisible, scrollProgress, scrollToTop } = useScrollToTop(300)

  if (!isVisible) return null

  return (
    <button onClick={() => scrollToTop()}>
      {Math.round(scrollProgress)}% scrolled - Click to go up
    </button>
  )
}`}</CodeBlock>
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

        <h3 className="text-lg font-medium mt-6 mb-3">ScrollToTop (Default)</h3>
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
                <td className="p-3 font-mono text-xs">threshold</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">300</td>
                <td className="p-3">Scroll distance (px) before button appears</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">behavior</td>
                <td className="p-3 font-mono text-xs">ScrollBehavior</td>
                <td className="p-3 font-mono text-xs">&quot;smooth&quot;</td>
                <td className="p-3">Scroll animation behavior</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">size</td>
                <td className="p-3 font-mono text-xs">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="p-3 font-mono text-xs">&quot;md&quot;</td>
                <td className="p-3">Button size</td>
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

        <h3 className="text-lg font-medium mt-6 mb-3">ScrollToTopPill</h3>
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
                <td className="p-3 font-mono text-xs">label</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">&quot;Scroll to top&quot;</td>
                <td className="p-3">Button text label</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">threshold</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">300</td>
                <td className="p-3">Scroll distance (px) before button appears</td>
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

        <h3 className="text-lg font-medium mt-6 mb-3">ScrollToTopProgress</h3>
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
                <td className="p-3 font-mono text-xs">progressColor</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">primary</td>
                <td className="p-3">Progress circle color</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">progressBgColor</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">muted</td>
                <td className="p-3">Progress background circle color</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">strokeWidth</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">3</td>
                <td className="p-3">Circle stroke width in px</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">threshold</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">300</td>
                <td className="p-3">Scroll distance (px) before button appears</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 9. Hook */}
      <div className="space-y-4">
        <h2
          id="hook"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          useScrollToTop Hook
        </h2>
        <p className="text-muted-foreground">
          Use the hook for custom scroll-to-top implementations:
        </p>
        <CodeBlock>{`import { useScrollToTop } from "@/components/ui/scroll-to-top"

function MyComponent() {
  const {
    isVisible,     // boolean - whether threshold is passed
    scrollProgress, // number 0-100 - scroll progress percentage
    scrollToTop,    // (behavior?: ScrollBehavior) => void
  } = useScrollToTop(300) // threshold in px

  return (
    <div>
      <p>Progress: {scrollProgress.toFixed(0)}%</p>
      {isVisible && (
        <button onClick={() => scrollToTop("smooth")}>
          Go to top
        </button>
      )}
    </div>
  )
}`}</CodeBlock>
      </div>

      {/* 10. Features */}
      <div className="space-y-4">
        <h2
          id="features"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">4 Variants</strong> — default,
            pill, minimal, and progress styles
          </li>
          <li>
            <strong className="text-foreground">Smooth animations</strong> —
            fade and slide transitions on show/hide
          </li>
          <li>
            <strong className="text-foreground">Configurable threshold</strong>{" "}
            — control when button appears
          </li>
          <li>
            <strong className="text-foreground">Progress indicator</strong> —
            visual scroll progress feedback
          </li>
          <li>
            <strong className="text-foreground">Accessible</strong> — proper
            aria-label and focus states
          </li>
          <li>
            <strong className="text-foreground">Hook export</strong> — build
            custom implementations
          </li>
          <li>
            <strong className="text-foreground">Customizable</strong> — override
            position, colors, and more via className
          </li>
        </ul>
      </div>
    </div>
  )
}
