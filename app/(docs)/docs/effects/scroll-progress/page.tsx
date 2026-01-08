import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"

export const metadata = {
  title: "Scroll Progress",
  description: "Page scroll progress bar using CSS scroll-driven animations",
}

export default function ScrollProgressPage() {
  return (
    <div className="space-y-8">
      {/* 1. Navigation */}
      <DocsPageNav
        title="Scroll Progress"
        prevHref="/docs/effects/border-beam"
        nextHref="/docs/effects/parallax-cards"
      />

      {/* 2. Description */}
      <p className="text-muted-foreground">
        Page scroll progress bar using CSS scroll-driven animations.
        No JavaScript calculations needed — the browser handles everything.
      </p>

      {/* 3. Browser Support */}
      <DocsBrowserSupport
        features={{ featureId: "scroll-driven-animations", browserCheck: "scroll-driven-animations" }}
      >
        Uses <code className="bg-muted px-1.5 py-0.5 rounded">animation-timeline: scroll()</code> to
        drive animation based on scroll position. Falls back gracefully in unsupported browsers.
      </DocsBrowserSupport>

      {/* 4. Preview */}
      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">
            The scroll progress bar appears at the top of the page as you scroll.
          </p>
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
        <InstallCommand packageName="https://gooseui.pro/r/scroll-progress.json" />
      </div>

      {/* 6. Usage */}
      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <CodeBlock>{`import { ScrollProgress, ScrollProgressStyles } from "@/components/effects/scroll-progress"

// Add styles once in your layout
<ScrollProgressStyles />

// Add progress bar
<ScrollProgress />`}</CodeBlock>
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
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Color</h3>
            <CodeBlock>{`<ScrollProgress color="hsl(var(--primary))" />`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Custom Height</h3>
            <CodeBlock>{`<ScrollProgress height={4} />`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Bottom Position</h3>
            <CodeBlock>{`<ScrollProgress position="bottom" />`}</CodeBlock>
          </div>
        </div>
      </div>

      {/* 8. CSS Feature */}
      <div className="space-y-4">
        <h2
          id="css-feature"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          CSS Feature
        </h2>
        <p className="text-muted-foreground mb-4">
          The component uses CSS scroll-driven animations specification:
        </p>
        <CodeBlock>{`.scroll-progress {
  animation: progress linear;
  animation-timeline: scroll();
  transform: scaleX(0);
}

@keyframes progress {
  to { transform: scaleX(1); }
}`}</CodeBlock>
      </div>

      {/* 9. Props */}
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
                <td className="p-3 font-mono text-xs">color</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">primary</td>
                <td className="p-3">Progress bar color</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">height</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">3</td>
                <td className="p-3">Height in pixels</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">position</td>
                <td className="p-3 font-mono text-xs">&quot;top&quot; | &quot;bottom&quot;</td>
                <td className="p-3 font-mono text-xs">&quot;top&quot;</td>
                <td className="p-3">Position on screen</td>
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

      {/* 10. References */}
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
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              MDN: animation-timeline
            </a>
          </li>
          <li>
            <a
              href="https://scroll-driven-animations.style/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Scroll-driven Animations
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
