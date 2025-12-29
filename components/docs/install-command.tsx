"use client"

import * as React from "react"
import { Check, Copy, Terminal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/registry/new-york/ui/button"

type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

interface InstallCommandProps {
  /** The package or registry URL to install */
  packageName: string
  /** Optional custom commands per package manager */
  commands?: Partial<Record<PackageManager, string>>
  /** Default selected package manager */
  defaultPm?: PackageManager
  className?: string
}

const defaultCommands: Record<PackageManager, (pkg: string) => string> = {
  npm: (pkg) => `npx shadcn@latest add ${pkg}`,
  pnpm: (pkg) => `pnpm dlx shadcn@latest add ${pkg}`,
  yarn: (pkg) => `npx shadcn@latest add ${pkg}`,
  bun: (pkg) => `bunx --bun shadcn@latest add ${pkg}`,
}

export function InstallCommand({
  packageName,
  commands,
  defaultPm = "npm",
  className,
}: InstallCommandProps) {
  const [copied, setCopied] = React.useState(false)
  const [activePm, setActivePm] = React.useState<PackageManager>(defaultPm)

  const getCommand = (pm: PackageManager) => {
    if (commands?.[pm]) return commands[pm]
    return defaultCommands[pm](packageName)
  }

  const handleCopy = async () => {
    const command = getCommand(activePm)
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textArea = document.createElement("textarea")
      textArea.value = command
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const packageManagers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"]

  return (
    <div className={cn("relative", className)}>
      <Tabs
        value={activePm}
        onValueChange={(v) => setActivePm(v as PackageManager)}
        className="gap-0"
      >
        <div className="overflow-hidden rounded-lg border bg-muted/30">
          <div className="flex items-center gap-2 border-b border-border/50 px-3 py-1">
            <div className="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70">
              <Terminal className="size-3 text-background" />
            </div>
            <TabsList className="h-9 bg-transparent p-0">
              {packageManagers.map((pm) => (
                <TabsTrigger
                  key={pm}
                  value={pm}
                  className={cn(
                    "h-7 rounded-md border border-transparent px-2 pt-0.5 text-sm",
                    "data-[state=active]:border-input data-[state=active]:bg-accent",
                    "data-[state=active]:shadow-none"
                  )}
                >
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="no-scrollbar overflow-x-auto">
            {packageManagers.map((pm) => (
              <TabsContent key={pm} value={pm} className="mt-0 px-4 py-3.5">
                <pre>
                  <code className="relative font-mono text-sm leading-none">
                    {getCommand(pm)}
                  </code>
                </pre>
              </TabsContent>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 size-7 opacity-70 hover:opacity-100"
          onClick={handleCopy}
        >
          <span className="sr-only">Copy</span>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </Tabs>
    </div>
  )
}
