import Link from "next/link"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Documentation",
  description: "Guide to using GooseUI",
}

const toc = [
  { id: "what-is-gooseui", title: "What is GooseUI?", level: 2 },
  { id: "features", title: "Features", level: 2 },
  { id: "quick-start", title: "Quick Start", level: 2 },
]

export default function IntroductionPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-6">
        <DocsPageNav title="Introduction" />
      <p className="text-lg text-muted-foreground">Guide to using GooseUI</p>

      <div className="space-y-4">
        <h2
          id="what-is-gooseui"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          What is GooseUI?
        </h2>
        <p className="leading-7">
          GooseUI is a collection of ready-made components for React that you
          can copy and paste into your projects. It&apos;s not an npm package —
          you get full control over the code.
        </p>
      </div>

      <div className="space-y-4">
        <h2
          id="features"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Features
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Accessible components using native HTML and CSS</li>
          <li>Minimal JavaScript, maximum browser APIs</li>
          <li>Styling via Tailwind CSS 4</li>
          <li>Dark theme out of the box</li>
          <li>Full TypeScript support</li>
          <li>Minimal external dependencies</li>
          <li>Copy-paste installation via CLI</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2
          id="quick-start"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Quick Start
        </h2>
        <p className="leading-7">
          Start by installing components via shadcn CLI:
        </p>
        <InstallCommand packageName="https://gooseui.pro/r/button.json" />
      </div>

      <div className="flex gap-4 pt-4">
        <Button asChild>
          <Link href="/docs/installation">Installation</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/docs/components">Components</Link>
        </Button>
      </div>
      </div>
    </DocsPage>
  )
}
