import { CodeBlock } from "@/components/docs/code-block"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import {
  AdaptiveGrid,
  AdaptiveCard,
} from "@/registry/new-york/ui/adaptive-grid"

export const metadata = {
  title: "Adaptive Grid",
  description:
    "Grid that adapts layout based on container size and content using Container Queries and :has()",
}

export default function AdaptiveGridPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav title="Adaptive Grid" />

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
        Combines{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">@container</code>{" "}
        queries for responsive sizing with{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">:has(img)</code> to
        change layout based on content.
      </DocsBrowserSupport>

      {/* Preview section - custom layout for responsive demo */}
      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <p className="text-sm text-muted-foreground">
          Cards adapt layout based on container width and content.
        </p>

        {/* Mobile: Static examples */}
        <div className="space-y-6 md:hidden">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Wide container
            </p>
            <AdaptiveGrid className="w-full">
              <AdaptiveCard
                title="Card with Image"
                image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              >
                This card has an image, so it expands on wider containers.
              </AdaptiveCard>
              <AdaptiveCard title="Text Only Card">
                This card has no image, so the layout is compact.
              </AdaptiveCard>
            </AdaptiveGrid>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Narrow container
            </p>
            <div className="max-w-[12rem]">
              <AdaptiveCard
                title="With Image"
                image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop"
              >
                Image adapts to narrow space.
              </AdaptiveCard>
            </div>
          </div>
        </div>

        {/* Desktop: Resizable panels */}
        <div className="hidden md:block">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[30rem] w-full rounded-lg border bg-muted/30"
          >
            <ResizablePanel defaultSize={75} minSize={30}>
              <div className="h-full overflow-auto p-4">
                <AdaptiveGrid className="w-full">
                  <AdaptiveCard
                    title="Card with Image"
                    image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  >
                    This card has an image, so it expands to show the image
                    alongside the content on wider containers.
                  </AdaptiveCard>
                  <AdaptiveCard title="Text Only Card">
                    This card has no image, so the layout is compact and
                    vertical.
                  </AdaptiveCard>
                  <AdaptiveCard title="Another Text Card">
                    Content adjusts automatically based on what&apos;s inside
                    the card.
                  </AdaptiveCard>
                  <AdaptiveCard
                    title="Another Image Card"
                    image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"
                  >
                    The grid responds to both container size and card content.
                  </AdaptiveCard>
                </AdaptiveGrid>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="h-full overflow-auto p-4">
                <div className="flex flex-col gap-4">
                  <AdaptiveCard title="Narrow Card">
                    In a narrow container, cards stack vertically.
                  </AdaptiveCard>
                  <AdaptiveCard
                    title="With Image"
                    image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop"
                  >
                    Image cards also adapt to narrow space.
                  </AdaptiveCard>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <DocsSection id="installation" title="Installation">
        <InstallCommand packageName="https://gooseui.pro/r/adaptive-grid.json" />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <CodeBlock>{`import { AdaptiveGrid, AdaptiveCard } from "@/components/ui/adaptive-grid"

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
        <p className="text-muted-foreground mb-4">
          The component uses Tailwind&apos;s Container Queries plugin with the{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">:has()</code> selector:
        </p>
        <CodeBlock>{`// AdaptiveCard uses :has() to detect if it contains an image
className={cn(
  "@container group/card",
  // Layout changes based on content with :has()
  "has-[img]:grid has-[img]:@sm:grid-cols-[140px_1fr]",
  "[&:not(:has(img))]:flex [&:not(:has(img))]:flex-col",
)}

// AdaptiveGrid uses container queries for responsive columns
className={cn(
  "@container",
  "grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4",
)}`}</CodeBlock>
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
