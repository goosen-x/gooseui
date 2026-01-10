import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import {
  GlitchTextColorDemo,
  GlitchTextDemo,
  GlitchTextHeroDemo,
  GlitchTextIntensityDemo,
  GlitchTextMinimalDemo,
} from "./demo"

export const metadata = {
  title: "Glitch Text",
  description: "Animated glitch text effect with chromatic aberration",
}

const toc = [
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
  { id: "features", title: "Features", level: 2 },
]

export default function GlitchTextPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Glitch Text" />

        <p className="text-muted-foreground">
          Animated glitch text effect with chromatic aberration, scanlines, and
          distortion. Pure CSS implementation using clip-path and
          mix-blend-mode. Respects reduced motion preferences.
        </p>

        <DocsPreview description="Hover to see the effect in action.">
          <GlitchTextDemo />
        </DocsPreview>

        <DocsSection id="installation" title="Installation">
          <InstallCommand packageName="https://gooseui.pro/r/glitch-text.json" />
        </DocsSection>

        <DocsSection id="usage" title="Usage">
          <CodeBlock>{`import { GlitchText } from "@/components/effects/glitch-text"

export default function Page() {
  return (
    <div className="bg-black p-8">
      <GlitchText
        text="GLITCH"
        className="text-6xl text-white"
      />
    </div>
  )
}`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title="Examples">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Intensity Variants</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Control the intensity of the glitch effect: low, medium, or
                high.
              </p>
              <GlitchTextIntensityDemo />
              <CodeBlock className="mt-4">{`<GlitchText text="SUBTLE" intensity="low" />
<GlitchText text="DEFAULT" intensity="medium" />
<GlitchText text="INTENSE" intensity="high" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Custom Colors</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use the color prop for custom text colors.
              </p>
              <GlitchTextColorDemo />
              <CodeBlock className="mt-4">{`<GlitchText text="NEON" color="#00ff88" />
<GlitchText text="CYBER" color="#ff0080" />
<GlitchText text="PUNK" color="#ffcc00" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Minimal Effect</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Disable scanlines and glow for a cleaner look.
              </p>
              <GlitchTextMinimalDemo />
              <CodeBlock className="mt-4">{`<GlitchText
  text="CLEAN"
  showScanlines={false}
  showGlow={false}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Hero Section</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Example usage in a hero section.
              </p>
              <GlitchTextHeroDemo />
              <CodeBlock className="mt-4">{`<div className="bg-black py-16">
  <GlitchText
    text="GOOSEUI"
    intensity="medium"
    className="text-8xl text-white font-black"
  />
  <p className="text-zinc-500 tracking-[0.3em] uppercase">
    Component Library
  </p>
</div>`}</CodeBlock>
            </div>
          </div>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "text",
              type: "string",
              description: "Text to display with glitch effect",
            },
            {
              name: "intensity",
              type: '"low" | "medium" | "high"',
              default: '"medium"',
              description: "Intensity of the glitch effect",
            },
            {
              name: "showScanlines",
              type: "boolean",
              default: "true",
              description: "Show scanline overlay effect",
            },
            {
              name: "showGlow",
              type: "boolean",
              default: "true",
              description: "Show glow effect behind text",
            },
            {
              name: "color",
              type: "string",
              description: "Custom text color (CSS color value)",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for styling",
            },
          ]}
        />

        <DocsSection id="features" title="Features">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Chromatic aberration</strong>{" "}
              — cyan and magenta color separation with mix-blend-mode
            </li>
            <li>
              <strong className="text-foreground">Clip-path animation</strong> —
              random slice effect using CSS clip-path inset
            </li>
            <li>
              <strong className="text-foreground">Scanlines overlay</strong> —
              retro CRT monitor effect
            </li>
            <li>
              <strong className="text-foreground">Glow effect</strong> —
              blur-based glow behind text
            </li>
            <li>
              <strong className="text-foreground">Reduced motion</strong> —
              respects prefers-reduced-motion media query
            </li>
            <li>
              <strong className="text-foreground">Pure CSS</strong> — no
              JavaScript animations, uses CSS keyframes
            </li>
            <li>
              <strong className="text-foreground">Customizable</strong> —
              intensity, colors, and effects can be toggled
            </li>
          </ul>
        </DocsSection>
      </div>
    </DocsPage>
  )
}
