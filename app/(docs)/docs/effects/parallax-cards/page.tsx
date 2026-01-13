import { CodeBlock } from "@/components/docs/code-block"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { InstallCommand } from "@/components/docs/install-command"
import { ParallaxCardsDemo } from "./demo"

export const metadata = {
  title: "Parallax Cards",
  description:
    "Cards with parallax effect on scroll using CSS scroll-driven animations",
}

const toc = [
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "css-feature", title: "CSS Feature", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function ParallaxCardsPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        {/* 1. Navigation */}
        <DocsPageNav title="Parallax Cards" />

        {/* 2. Description */}
        <p className="text-muted-foreground">
          Cards with parallax effect on scroll using CSS scroll-driven
          animations.
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
          to trigger animation based on element&apos;s position in the viewport.
        </DocsBrowserSupport>

        {/* 4. Preview */}
        <DocsPreview description="Scroll inside the container to see the parallax effect.">
          <ParallaxCardsDemo />
        </DocsPreview>

        {/* 5. Installation */}
        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="@gooseui/parallax-cards" />
        </div>

        {/* 6. Usage */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { ParallaxCards, ParallaxCard } from "@/components/effects/parallax-cards"

<ParallaxCards>
  <ParallaxCard>Card 1 content</ParallaxCard>
  <ParallaxCard>Card 2 content</ParallaxCard>
  <ParallaxCard>Card 3 content</ParallaxCard>
</ParallaxCards>`}</CodeBlock>
        </div>

        {/* 7. CSS Feature */}
        <div className="space-y-4">
          <h2
            id="css-feature"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            CSS Feature
          </h2>
          <CodeBlock>{`.parallax-card {
  animation: parallax-reveal linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes parallax-reveal {
  from {
    opacity: 0;
    transform: translateY(50px);
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
                  <td className="p-3 font-mono text-xs">intensity</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0.3</td>
                  <td className="p-3">Parallax intensity (0-1)</td>
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
