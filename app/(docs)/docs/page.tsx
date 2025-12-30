import Link from "next/link"
import { InstallCommand } from "@/components/docs/install-command"

export const metadata = {
  title: "Documentation",
  description: "Guide to using GooseUI",
}

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Guide to using GooseUI
        </p>
      </div>

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
          <li>Accessible components based on Radix UI</li>
          <li>Styling via Tailwind CSS</li>
          <li>Dark theme out of the box</li>
          <li>Full TypeScript support</li>
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
        <Link
          href="/docs/installation"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Installation
        </Link>
        <Link
          href="/docs/components/button"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Components
        </Link>
      </div>
    </div>
  )
}
