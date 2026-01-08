import { CodeBlock } from "@/components/docs/code-block"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { ScrollProgress } from "@/registry/new-york/ui/scroll-progress"

export const metadata = {
  title: "Scroll Progress",
  description: "Page scroll progress bar using CSS scroll-driven animations",
}

export default function ScrollProgressPage() {
  return (
    <>
      {/* Live demo - scroll progress bar */}
      <ScrollProgress />

      <div className="space-y-8">
        {/* 1. Navigation */}
        <DocsPageNav title="Scroll Progress" />

      {/* 2. Description */}
      <p className="text-muted-foreground">
        Page scroll progress bar using CSS scroll-driven animations. No
        JavaScript calculations needed — the browser handles everything.
      </p>

      {/* 3. Browser Support */}
      <DocsBrowserSupport
        features={{
          featureId: "scroll-driven-animations",
          browserCheck: "scroll-driven-animations",
        }}
      >
        Uses{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">
          animation-timeline: scroll()
        </code>{" "}
        to drive animation based on scroll position. Falls back gracefully in
        unsupported browsers.
      </DocsBrowserSupport>

      {/* 4. Preview */}
      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <div className="flex flex-col items-center gap-3 p-6 bg-muted/30 rounded-lg text-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">↑</span>
            <div className="h-1 w-16 bg-primary rounded-full" />
          </div>
          <p className="text-sm text-muted-foreground">
            Scroll this page to see the progress bar at the top.
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
        <CodeBlock>{`import { ScrollProgress } from "@/components/ui/scroll-progress"

// Add progress bar to your page/layout
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
            <CodeBlock>{`<ScrollProgress color="#e11d48" />`}</CodeBlock>
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
        <CodeBlock>{`.scroll-progress-bar {
  animation: scroll-progress linear;
  animation-timeline: scroll(root);
  transform: scaleX(0);
  transform-origin: left;
}

@keyframes scroll-progress {
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
                <td className="p-3 font-mono text-xs">
                  &quot;top&quot; | &quot;bottom&quot;
                </td>
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
    </>
  )
}
