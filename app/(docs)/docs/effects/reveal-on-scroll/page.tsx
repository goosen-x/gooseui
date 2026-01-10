import { CodeBlock } from "@/components/docs/code-block"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"

export const metadata = {
  title: "Reveal on Scroll",
  description:
    "Elements reveal with animation as they enter the viewport using CSS scroll-driven animations",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "css-feature", title: "CSS Feature", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function RevealOnScrollPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        {/* 1. Navigation */}
        <DocsPageNav title="Reveal on Scroll" />

        {/* 2. Description */}
        <p className="text-muted-foreground">
          Elements reveal with animation as they enter the viewport using CSS
          scroll-driven animations with view() timeline.
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
            animation-timeline: view()
          </code>{" "}
          with{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">
            animation-range: entry
          </code>{" "}
          to trigger animation as element enters viewport.
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
              Scroll down to see elements animate into view.
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
          <InstallCommand packageName="https://gooseui.pro/r/reveal-on-scroll.json" />
        </div>

        {/* 6. Usage */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { RevealOnScroll, RevealOnScrollStyles } from "@/components/effects/reveal-on-scroll"

// Add styles once in your layout
<RevealOnScrollStyles />

// Use component
<RevealOnScroll direction="up">
  <div>This reveals from below</div>
</RevealOnScroll>

<RevealOnScroll direction="left" delay={200}>
  <div>This reveals from right with delay</div>
</RevealOnScroll>`}</CodeBlock>
        </div>

        {/* 7. CSS Feature */}
        <div className="space-y-4">
          <h2
            id="css-feature"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            CSS Feature
          </h2>
          <CodeBlock>{`.reveal-on-scroll {
  animation: reveal-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}</CodeBlock>
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
                  <td className="p-3 font-mono text-xs">direction</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;up&quot; | &quot;down&quot; | &quot;left&quot; |
                    &quot;right&quot; | &quot;fade&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;up&quot;</td>
                  <td className="p-3">Animation direction</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">delay</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">Animation delay in ms</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">duration</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">600</td>
                  <td className="p-3">Animation duration in ms</td>
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
      </div>
    </DocsPage>
  )
}
