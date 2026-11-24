"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/registry/gooseui/ui/copy-button"
import { Tabs, TabsList, TabsTrigger } from "@/registry/gooseui/ui/tabs"

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

export const PACKAGE_MANAGERS: PackageManager[] = ["npm", "pnpm", "yarn", "bun"]

export type InstallCommandLabels = {
  /** Accessible name of the package manager switch. */
  tabs: string
  copy: string
  copied: string
}

const DEFAULT_LABELS: InstallCommandLabels = {
  tabs: "Package manager",
  copy: "Copy command",
  copied: "Copied",
}

const EXEC: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
}

/** The `shadcn add` command for one package manager. */
export function getInstallCommand(
  packageName: string,
  manager: PackageManager,
): string {
  return `${EXEC[manager]} shadcn@latest add ${packageName}`
}

// Every block with the same storage key, in every open tab, follows one value.
const EVENT = "gooseui:package-manager"

const isManager = (value: unknown): value is PackageManager =>
  PACKAGE_MANAGERS.includes(value as PackageManager)

/**
 * Every command is in the HTML and the radios inside Tabs are native, so
 * before hydration the checked radio still decides the visible command and
 * where the pill sits (it is re-anchored to :checked instead of data-state).
 * Commands share one grid cell and cross-fade, so the height never changes.
 * `data-restoring` turns the motion off while a saved choice is applied.
 */
const styles = `
.gooseui-install-command [data-slot="tabs-trigger"][data-state="active"]:not(:has(input:checked)){anchor-name:none}
.gooseui-install-command [data-slot="tabs-trigger"]:has(input:checked){anchor-name:--gooseui-tab}
.gooseui-install-command [data-pm]{grid-area:1/1;opacity:0;visibility:hidden;transition:opacity 150ms ease,visibility 0s linear 150ms}
${PACKAGE_MANAGERS.map((m) => `.gooseui-install-command:has(input[value="${m}"]:checked) [data-pm="${m}"]{opacity:1;visibility:visible;transition-delay:0s}`).join("\n")}
@media (prefers-reduced-motion:reduce){
.gooseui-install-command [data-pm]{transition:none}
}
.gooseui-install-command[data-restoring] *{transition:none!important}
`

function TerminalIcon() {
  return (
    <div className="flex size-4 shrink-0 items-center justify-center rounded-[1px] bg-foreground opacity-70">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-3 text-background"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    </div>
  )
}

const fade = {
  maskImage: "linear-gradient(to right, black calc(100% - 3rem), transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, black calc(100% - 3rem), transparent)",
}

export type InstallCommandProps = Omit<
  React.ComponentProps<"div">,
  "children" | "onCopy"
> & {
  /** The package or registry URL to add, e.g. `@gooseui/tabs`. */
  packageName: string
  /** Exact commands that replace the generated ones. */
  commands?: Partial<Record<PackageManager, string>>
  /** Manager shown until the user picks one. */
  defaultPm?: PackageManager
  /**
   * localStorage key. When set, the choice is remembered and every block with
   * the same key stays in sync, in this page and in other tabs.
   */
  storageKey?: string
  labels?: Partial<InstallCommandLabels>
  /** Called after a copy. */
  onCopy?: (command: string, manager: PackageManager) => void
  /** Called when the browser refuses to copy. */
  onCopyError?: (error: Error) => void
}

/**
 * Install command with npm, pnpm, yarn and bun tabs. The pill glides between
 * tabs (see Tabs) and the command cross-fades.
 */
export function InstallCommand({
  packageName,
  commands,
  defaultPm = "npm",
  storageKey,
  labels,
  onCopy,
  onCopyError,
  className,
  ...props
}: InstallCommandProps) {
  const text = { ...DEFAULT_LABELS, ...labels }
  const root = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState<PackageManager>(defaultPm)

  React.useEffect(() => {
    if (!storageKey) return
    const apply = (manager: unknown) => {
      if (isManager(manager)) setActive(manager)
    }
    const read = () => {
      try {
        apply(localStorage.getItem(storageKey))
      } catch {}
    }
    const onSync = (event: Event) => {
      const { key, manager } = (event as CustomEvent).detail
      if (key === storageKey) apply(manager)
    }
    // The saved choice is applied without motion, so the pill does not slide on load
    const block = root.current
    block?.setAttribute("data-restoring", "")
    read()
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() =>
        block?.removeAttribute("data-restoring"),
      )
    })
    addEventListener(EVENT, onSync)
    addEventListener("storage", read)
    return () => {
      cancelAnimationFrame(frame)
      block?.removeAttribute("data-restoring")
      removeEventListener(EVENT, onSync)
      removeEventListener("storage", read)
    }
  }, [storageKey])

  const select = (manager: PackageManager) => {
    setActive(manager)
    if (!storageKey) return
    try {
      localStorage.setItem(storageKey, manager)
    } catch {}
    dispatchEvent(
      new CustomEvent(EVENT, { detail: { key: storageKey, manager } }),
    )
  }

  const getCommand = (manager: PackageManager) =>
    commands?.[manager] ?? getInstallCommand(packageName, manager)

  return (
    <div
      ref={root}
      data-slot="install-command"
      className={cn("gooseui-install-command relative", className)}
      {...props}
    >
      <style href="gooseui-install-command" precedence="default">
        {styles}
      </style>
      <Tabs
        value={active}
        onValueChange={(value) => select(value as PackageManager)}
        className="gap-0"
      >
        <div className="overflow-hidden rounded-lg border bg-muted/30">
          <div className="flex items-center gap-2 overflow-x-auto border-b border-border/50 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex shrink-0 items-center gap-2 pl-3">
              <TerminalIcon />
            </div>
            <TabsList
              aria-label={text.tabs}
              className="h-9 bg-transparent p-0 pr-3"
              indicatorClassName="border border-input bg-accent shadow-none"
            >
              {PACKAGE_MANAGERS.map((manager) => (
                <TabsTrigger
                  key={manager}
                  value={manager}
                  className="h-7 rounded-md border border-transparent px-2 pt-0.5 text-sm"
                >
                  {manager}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)]">
            {PACKAGE_MANAGERS.map((manager) => (
              <div
                key={manager}
                data-pm={manager}
                className="overflow-x-auto py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={fade}
              >
                <pre className="inline-block min-w-full px-4">
                  <code className="relative font-mono text-sm leading-none whitespace-nowrap">
                    {getCommand(manager)}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </div>
        <CopyButton
          size="sm"
          value={getCommand(active)}
          labels={{ copy: text.copy, copied: text.copied }}
          onCopy={onCopy ? (value) => onCopy(value, active) : undefined}
          onCopyError={onCopyError}
          className="absolute top-2 right-2 z-10"
        />
      </Tabs>
    </div>
  )
}
