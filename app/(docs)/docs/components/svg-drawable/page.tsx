import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import { SVGDrawableDemo } from "./demo"

export const metadata = {
  title: "SVG Drawable",
  description: "Animate SVG path drawing with CSS-only solution",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "draw-property", title: "Draw Property", level: 2 },
  { id: "keyframes", title: "Keyframe Animation", level: 2 },
  { id: "stagger", title: "Stagger Delays", level: 2 },
  { id: "anime-style", title: "anime.js Style Animation", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "css-technique", title: "CSS Technique", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function SVGDrawablePage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="SVG Drawable" />

        <p className="text-muted-foreground">
          Animate SVG path/line/circle drawing using CSS. Similar to anime.js{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">
            createDrawable()
          </code>{" "}
          but without dependencies. Supports keyframe arrays and stagger delays.
        </p>

        <DocsPreview description="Click 'Replay Animation' to see the effect again.">
          <SVGDrawableDemo />
        </DocsPreview>

        <DocsSection id="installation" title="Installation">
          <InstallCommand packageName="@gooseui/svg-drawable" />
        </DocsSection>

        <DocsSection id="usage" title="Usage">
          <CodeBlock>{`import { SVGDrawable } from "@/components/ui/svg-drawable"

<SVGDrawable draw="0 1" duration={1000}>
  <svg viewBox="0 0 100 50">
    <path
      d="M10,40 Q30,10 50,25 T90,10"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
  </svg>
</SVGDrawable>`}</CodeBlock>
        </DocsSection>

        <DocsSection id="draw-property" title="Draw Property">
          <p className="text-muted-foreground mb-4">
            The <code className="bg-muted px-1.5 py-0.5 rounded">draw</code>{" "}
            prop accepts a string with start and end values (0-1):
          </p>
          <CodeBlock>{`// Full line (0% to 100%)
draw="0 1"      |[-------------------]|

// First half (0% to 50%)
draw="0 0.5"    |[---------]          |

// Middle section (25% to 75%)
draw="0.25 0.75"|     [---------]     |

// Second half (50% to 100%)
draw="0.5 1"    |          [---------]|`}</CodeBlock>
        </DocsSection>

        <DocsSection id="keyframes" title="Keyframe Animation">
          <p className="text-muted-foreground mb-4">
            Pass an array to create multi-step animations (like anime.js):
          </p>
          <CodeBlock>{`// Draw → Full → Erase animation
<SVGDrawable draw={['0 0', '0 1', '1 1']} duration={2000} loop>
  <svg>...</svg>
</SVGDrawable>

// Keyframe sequence:
// '0 0' → hidden (nothing visible)
// '0 1' → full draw (entire line visible)
// '1 1' → erased (line disappears from start)`}</CodeBlock>
        </DocsSection>

        <DocsSection id="stagger" title="Stagger Delays">
          <p className="text-muted-foreground mb-4">
            Add sequential delays between multiple paths:
          </p>
          <CodeBlock>{`// Each path starts 100ms after the previous
<SVGDrawable draw="0 1" duration={1000} stagger={100}>
  <svg viewBox="0 0 100 60">
    <line x1="10" y1="10" x2="90" y2="10" stroke="currentColor" />
    <line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" />
    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" />
  </svg>
</SVGDrawable>

// Result: line 1 = 0ms, line 2 = 100ms, line 3 = 200ms`}</CodeBlock>
        </DocsSection>

        <DocsSection id="anime-style" title="anime.js Style Animation">
          <p className="text-muted-foreground mb-4">
            Combine keyframes and stagger for anime.js-like effects:
          </p>
          <CodeBlock>{`<SVGDrawable
  draw={['0 0', '0 1', '1 1']}
  duration={2000}
  stagger={100}
  ease="ease-in-out"
  loop
>
  <svg viewBox="0 0 304 112">
    <path d="M59 90V56.136..." />
    <polyline points="59 22.035..." />
    {/* More paths... */}
  </svg>
</SVGDrawable>`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title="Examples">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Animate on scroll</h3>
              <CodeBlock>{`<SVGDrawable animateOnView duration={1500}>
  <svg>...</svg>
</SVGDrawable>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Loop animation</h3>
              <CodeBlock>{`<SVGDrawable loop duration={2000}>
  <svg>...</svg>
</SVGDrawable>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">With delay</h3>
              <CodeBlock>{`<SVGDrawable delay={500} duration={1000}>
  <svg>...</svg>
</SVGDrawable>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Alternate direction</h3>
              <CodeBlock>{`<SVGDrawable direction="alternate" loop duration={1000}>
  <svg>...</svg>
</SVGDrawable>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Hook usage</h3>
              <CodeBlock>{`import { useDrawable } from "@/components/ui/svg-drawable"

function MyComponent() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { animate, reset, isAnimating } = useDrawable(svgRef, {
    draw: ['0 0', '0 1'],
    duration: 1000,
    stagger: 50,
  })

  return (
    <>
      <svg ref={svgRef}>...</svg>
      <button onClick={animate}>Animate</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}`}</CodeBlock>
            </div>
          </div>
        </DocsSection>

        <DocsSection id="css-technique" title="CSS Technique">
          <p className="text-muted-foreground mb-4">
            Uses{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded">
              stroke-dasharray
            </code>{" "}
            and{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded">
              stroke-dashoffset
            </code>{" "}
            to animate the visible portion of SVG paths:
          </p>
          <CodeBlock>{`.path {
  stroke-dasharray: 1000;   /* Total path length */
  stroke-dashoffset: 1000;  /* Start hidden */
  animation: draw 1s ease forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;   /* Fully visible */
  }
}`}</CodeBlock>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "draw",
              type: "string | string[]",
              default: '"0 1"',
              description: 'Draw range "start end" or keyframe array',
            },
            {
              name: "duration",
              type: "number",
              default: "1000",
              description: "Animation duration in ms",
            },
            {
              name: "delay",
              type: "number",
              default: "0",
              description: "Animation delay in ms",
            },
            {
              name: "stagger",
              type: "number",
              default: "0",
              description: "Delay between paths in ms",
            },
            {
              name: "ease",
              type: '"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out"',
              default: '"ease-in-out"',
              description: "Easing function",
            },
            {
              name: "direction",
              type: '"normal" | "reverse" | "alternate"',
              default: '"normal"',
              description: "Animation direction",
            },
            {
              name: "animateOnMount",
              type: "boolean",
              default: "true",
              description: "Start animation on mount",
            },
            {
              name: "animateOnView",
              type: "boolean",
              default: "false",
              description: "Start animation when element is in viewport",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop animation infinitely",
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
