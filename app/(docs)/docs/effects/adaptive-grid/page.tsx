import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsSection } from "@/components/docs/docs-section"
import { DocsPropsTable } from "@/components/docs/docs-props-table"

export const metadata = {
  title: "Adaptive Grid",
  description:
    "Grid that adapts layout based on container size and content using Container Queries and :has()",
}

export default function AdaptiveGridPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav
        title="Adaptive Grid"
        prevHref="/docs/effects/smart-form"
        nextHref="/docs/effects/reveal-on-scroll"
      />

      <p className="text-muted-foreground">
        Grid that adapts layout based on container size and content using
        Container Queries and :has() selector.
      </p>

      <DocsBrowserSupport
        features={[
          { featureId: "container-queries", browserCheck: "container-queries" },
          { featureId: "has", browserCheck: "has" },
        ]}
      >
        Combines <code className="bg-muted px-1.5 py-0.5 rounded">@container</code>{" "}
        queries for responsive sizing with{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">:has(img)</code> to change
        layout based on content.
      </DocsBrowserSupport>

      <DocsPreview description="Cards automatically adjust layout based on container width and content.">
        <p className="text-muted-foreground">
          Interactive demo coming soon.
        </p>
      </DocsPreview>

      <DocsSection id="installation" title="Installation">
        <InstallCommand packageName="https://gooseui.pro/r/adaptive-grid.json" />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <CodeBlock>{`import { AdaptiveGrid, AdaptiveCard } from "@/components/effects/adaptive-grid"

<AdaptiveGrid>
  <AdaptiveCard title="Card with image" image="/image.jpg">
    Description text
  </AdaptiveCard>
  <AdaptiveCard title="Card without image">
    This card has no image, so layout adjusts automatically.
  </AdaptiveCard>
</AdaptiveGrid>`}</CodeBlock>
      </DocsSection>

      <DocsSection id="css-feature" title="CSS Feature">
        <CodeBlock>{`.adaptive-grid {
  container-type: inline-size;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

@container (min-width: 600px) {
  .adaptive-card:has(img) {
    grid-column: span 2;
    flex-direction: row;
  }
}

.adaptive-card:has(img) {
  display: flex;
  flex-direction: column;
}`}</CodeBlock>
      </DocsSection>

      <DocsPropsTable
        props={[
          {
            name: "image",
            type: "string",
            description: "Optional image URL",
          },
          {
            name: "title",
            type: "string",
            description: "Card title",
          },
          {
            name: "minCardWidth",
            type: "number",
            default: "280",
            description: "Minimum card width (AdaptiveGrid)",
          },
          {
            name: "className",
            type: "string",
            description: "Additional CSS classes",
          },
        ]}
      />
    </div>
  )
}
