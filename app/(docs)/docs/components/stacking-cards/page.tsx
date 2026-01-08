import { CodeBlock } from "@/components/docs/code-block"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { InstallCommand } from "@/components/docs/install-command"
import { StackingCardsDemo } from "./demo"

export const metadata = {
  title: "Stacking Cards",
  description:
    "Cards that stack on top of each other as user scrolls using CSS position: sticky",
}

export default function StackingCardsPage() {
  return (
    <div className="space-y-8">
      {/* 1. Navigation */}
      <DocsPageNav title="Stacking Cards" />

      {/* 2. Description */}
      <p className="text-muted-foreground">
        Cards that stack on top of each other as user scrolls, using CSS
        position: sticky and scroll-driven animations.
      </p>

      {/* 3. Browser Support */}
      <DocsBrowserSupport
        features={{
          featureId: "scroll-driven-animations",
          browserCheck: "scroll-driven-animations",
        }}
      >
        Combines{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">position: sticky</code>{" "}
        with scroll-driven animations to create stacking effect. Cards scale
        down slightly as they stack.
      </DocsBrowserSupport>

      {/* 4. Preview */}
      <DocsPreview description="Scroll inside the container to see cards stack.">
        <StackingCardsDemo />
      </DocsPreview>

      {/* 5. Installation */}
      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/stacking-cards.json" />
      </div>

      {/* 6. Usage */}
      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <CodeBlock>{`import { StackingCardsContainer, StackingCard } from "@/components/effects/stacking-cards"

// Basic usage
<StackingCardsContainer>
  <StackingCard>
    <div className="p-6">Card 1</div>
  </StackingCard>
  <StackingCard>
    <div className="p-6">Card 2</div>
  </StackingCard>
  <StackingCard>
    <div className="p-6">Card 3</div>
  </StackingCard>
</StackingCardsContainer>

// With scroll-driven animation
import { StackingCardsAnimated, StackingCardsStyles } from "@/components/effects/stacking-cards"

<StackingCardsStyles />
<StackingCardsAnimated>
  <div className="p-6 rounded-xl border bg-card">Card 1</div>
  <div className="p-6 rounded-xl border bg-card">Card 2</div>
</StackingCardsAnimated>`}</CodeBlock>
      </div>

      {/* 7. CSS Feature */}
      <div className="space-y-4">
        <h2
          id="css-feature"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          CSS Feature
        </h2>
        <CodeBlock>{`.stacking-card {
  position: sticky;
  top: calc(100px + var(--index) * 20px);
  transform: scale(calc(1 - var(--index) * 0.02));
}

/* With scroll animation */
.stacking-card-wrapper {
  animation: stack-scale linear;
  animation-timeline: view();
  animation-range: exit -100px exit 100px;
}

@keyframes stack-scale {
  to {
    transform: scale(0.95);
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
                <td className="p-3 font-mono text-xs">index</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">auto</td>
                <td className="p-3">
                  Card index for stacking offset (auto-assigned)
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">stickyTop</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">100</td>
                <td className="p-3">Base sticky top position in pixels</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">stackOffset</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">20</td>
                <td className="p-3">Offset between stacked cards in pixels</td>
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
  )
}
