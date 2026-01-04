import { CodeBlock } from "@/components/docs/code-block"
import { ComponentBaseline } from "@/components/docs/component-baseline"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  CarouselAutoPlay,
  CarouselDemo,
  CarouselMultiple,
  CarouselVertical,
  CarouselWithLines,
  CarouselWithNumbers,
  CarouselWithProgress,
} from "./carousel-demo"

export const metadata = {
  title: "Carousel",
  description:
    "A zero-dependency carousel with drag-to-scroll, auto-play, and accessible navigation built on CSS scroll-snap.",
}

export default function CarouselPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav
        title="Carousel"
        prevHref="/docs/components/theme-customizer"
      />
      <p className="text-muted-foreground">
        A zero-dependency carousel with drag-to-scroll, auto-play, and
        accessible navigation built on CSS scroll-snap.
      </p>

      <div className="space-y-4">
        <h2
          id="demo"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Demo
        </h2>
        <CarouselDemo />
      </div>

      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/carousel.json" />
      </div>

      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <CodeBlock>{`import {
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel"

export default function Example() {
  return (
    <Carousel>
      <CarouselItem>Slide 1</CarouselItem>
      <CarouselItem>Slide 2</CarouselItem>
      <CarouselItem>Slide 3</CarouselItem>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
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
            <h3 className="text-lg font-medium mb-3">With Progress Bar</h3>
            <CarouselWithProgress />
            <CodeBlock className="mt-4">{`<Carousel>
  {items.map((item) => (
    <CarouselItem key={item.id}>{item.content}</CarouselItem>
  ))}
  <CarouselPrevious />
  <CarouselNext />
  <CarouselProgress />
  <CarouselCounter />
</Carousel>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Number Indicators</h3>
            <CarouselWithNumbers />
            <CodeBlock className="mt-4">{`<CarouselDots variant="numbers" />`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Line Indicators</h3>
            <CarouselWithLines />
            <CodeBlock className="mt-4">{`<CarouselDots variant="line" />`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Multiple Items</h3>
            <CarouselMultiple />
            <CodeBlock className="mt-4">{`<CarouselItem size="1/3">
  {/* Shows 3 items at once */}
</CarouselItem>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Auto-Play with Loop</h3>
            <CarouselAutoPlay />
            <CodeBlock className="mt-4">{`<Carousel autoPlay={3000} loop>
  {/* Auto-advances every 3 seconds */}
</Carousel>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Vertical</h3>
            <CarouselVertical />
            <CodeBlock className="mt-4">{`<Carousel orientation="vertical" className="h-[400px]">
  {/* Vertical scrolling */}
</Carousel>`}</CodeBlock>
          </div>
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
            <strong className="text-foreground">CSS Scroll Snap</strong> —
            Native scroll snapping for smooth, performant scrolling (96.4%
            browser support)
          </li>
          <li>
            <strong className="text-foreground">Drag to Scroll</strong> — Mouse
            drag support with click prevention after dragging
          </li>
          <li>
            <strong className="text-foreground">Keyboard Navigation</strong> —
            Arrow keys for prev/next slide
          </li>
          <li>
            <strong className="text-foreground">Auto-Play</strong> — Optional
            auto-advance with pause on hover
          </li>
          <li>
            <strong className="text-foreground">Loop</strong> — Optional
            infinite loop mode
          </li>
          <li>
            <strong className="text-foreground">Multiple Indicators</strong> —
            Dots, lines, numbers, progress bar, counter
          </li>
          <li>
            <strong className="text-foreground">Accessible</strong> — ARIA
            roles, labels, and keyboard support
          </li>
          <li>
            <strong className="text-foreground">Vertical Mode</strong> —
            Supports both horizontal and vertical orientation
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Props
        </h2>

        <h3 className="text-lg font-medium mt-6">Carousel</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
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
                <td className="p-3 font-mono text-xs">orientation</td>
                <td className="p-3 font-mono text-xs">
                  &quot;horizontal&quot; | &quot;vertical&quot;
                </td>
                <td className="p-3 font-mono text-xs">
                  &quot;horizontal&quot;
                </td>
                <td className="p-3">Scroll direction</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">draggable</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3 font-mono text-xs">true</td>
                <td className="p-3">Enable drag-to-scroll</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">loop</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3 font-mono text-xs">false</td>
                <td className="p-3">Loop to start/end</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">autoPlay</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">0</td>
                <td className="p-3">Auto-play interval in ms</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">pauseOnHover</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3 font-mono text-xs">true</td>
                <td className="p-3">Pause auto-play on hover</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mt-6">CarouselItem</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
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
                <td className="p-3 font-mono text-xs">size</td>
                <td className="p-3 font-mono text-xs">
                  &quot;full&quot; | &quot;1/2&quot; | &quot;1/3&quot; |
                  &quot;1/4&quot; | &quot;auto&quot;
                </td>
                <td className="p-3 font-mono text-xs">&quot;full&quot;</td>
                <td className="p-3">Item width</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mt-6">CarouselDots</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
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
                  &quot;dots&quot; | &quot;line&quot; | &quot;numbers&quot;
                </td>
                <td className="p-3 font-mono text-xs">&quot;dots&quot;</td>
                <td className="p-3">Indicator style</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2
          id="hook"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          useCarousel Hook
        </h2>
        <p className="text-muted-foreground">
          Access carousel state and controls programmatically:
        </p>
        <CodeBlock>{`import { useCarousel } from "@/components/ui/carousel"

function CustomControls() {
  const {
    scrollPrev,
    scrollNext,
    scrollTo,
    activeIndex,
    itemCount,
    canScrollPrev,
    canScrollNext,
  } = useCarousel()

  return (
    <div>
      <button onClick={scrollPrev} disabled={!canScrollPrev}>
        Previous
      </button>
      <span>{activeIndex + 1} / {itemCount}</span>
      <button onClick={scrollNext} disabled={!canScrollNext}>
        Next
      </button>
    </div>
  )
}`}</CodeBlock>
      </div>

      <ComponentBaseline slug="carousel" />

      <div className="space-y-4">
        <h2
          id="implementation-notes"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Implementation Notes
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            This carousel uses{" "}
            <strong className="text-foreground">CSS Scroll Snap</strong> for
            native scroll snapping with JavaScript for navigation controls. This
            approach ensures{" "}
            <strong className="text-foreground">96.4% browser support</strong>{" "}
            while providing smooth, performant scrolling.
          </p>
          <div className="rounded-lg border bg-card p-4">
            <h4 className="font-medium text-foreground mb-2">
              CSS Features Used
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  scroll-snap-type: x mandatory
                </code>{" "}
                — Snap alignment
              </li>
              <li>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  snap-start
                </code>{" "}
                — Item snap points
              </li>
              <li>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  overscroll-behavior: contain
                </code>{" "}
                — Prevent page scroll
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-dashed p-4">
            <h4 className="font-medium text-foreground mb-2">
              Future CSS Carousels (Chrome 135+)
            </h4>
            <p className="text-sm mb-2">
              New CSS features like{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                ::scroll-button
              </code>
              ,{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                ::scroll-marker
              </code>
              , and{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                scroll-state()
              </code>{" "}
              queries enable pure-CSS carousels but are not yet Baseline.
            </p>
            <a
              href="https://chrome.dev/carousel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline"
            >
              See Chrome CSS Carousel demos
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
