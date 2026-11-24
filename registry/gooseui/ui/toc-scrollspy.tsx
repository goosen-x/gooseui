import type { ComponentProps, ReactNode, RefObject } from "react"
import { cn } from "@/lib/utils"
import type { ScrollSpyRoot } from "@/registry/gooseui/hooks/use-scroll-spy"
import { TocScrollspySpy } from "@/registry/gooseui/ui/toc-scrollspy.client"

export type TocScrollspyItem = {
  id: string
  title: ReactNode
  /** Heading level, e.g. 2 for h2. Deeper levels are nested. */
  level?: number
}

export type TocScrollspyProps = Omit<ComponentProps<"nav">, "title"> & {
  /** Items to render on the server. When omitted, headings are collected on the client with `selector`. */
  items?: TocScrollspyItem[]
  /** CSS selector for headings to collect, e.g. "h2, h3". */
  selector?: string
  /** Where to look for headings. Defaults to the document. */
  container?: HTMLElement | null | RefObject<HTMLElement | null>
  /** Scroll container. Defaults to the window. */
  root?: ScrollSpyRoot
  /** Activation line and scroll offset in pixels (e.g. sticky header height). */
  offset?: number
  /** Stick to the top of the scroll area. */
  sticky?: boolean
  /** Write the active id to the URL hash on click. */
  updateHash?: boolean
  /** Heading shown above the list. Pass null to hide it. */
  title?: ReactNode
  /** Classes for the scrollable list wrapper, e.g. "max-h-[70vh] overflow-y-auto". */
  listClassName?: string
  /** Extra content under the list, separated by a border (e.g. an edit link). */
  footer?: ReactNode
  labels?: { nav?: string; title?: string }
  onNavigate?: (id: string) => void
}

type TreeNode = TocScrollspyItem & { children: TreeNode[] }

function buildTree(items: TocScrollspyItem[]): TreeNode[] {
  const roots: TreeNode[] = []
  const stack: TreeNode[] = []
  const base = Math.min(...items.map((i) => i.level ?? 2))
  for (const item of items) {
    const node: TreeNode = { ...item, level: item.level ?? base, children: [] }
    while (
      stack.length &&
      (stack[stack.length - 1].level ?? base) >= (node.level ?? base)
    ) {
      stack.pop()
    }
    const parent = stack[stack.length - 1]
    if (parent) parent.children.push(node)
    else roots.push(node)
    stack.push(node)
  }
  return roots
}

const linkClass =
  "block cursor-pointer rounded-sm text-[0.8rem] leading-snug text-muted-foreground no-underline transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=location]:font-medium aria-[current=location]:text-foreground"

// Nesting indent: 0, 1rem, 1.5rem, ...
const indent = (depth: number) => (depth === 0 ? 0 : 0.5 + depth * 0.5)

function renderNodes(nodes: TreeNode[], depth: number): ReactNode {
  return (
    <ul className={cn("space-y-2", depth > 0 && "mt-2")}>
      {nodes.map((node) => (
        <li key={node.id}>
          <a
            href={`#${node.id}`}
            data-toc-id={node.id}
            style={{ paddingLeft: `${indent(depth)}rem` }}
            className={linkClass}
          >
            {node.title}
          </a>
          {node.children.length > 0 && renderNodes(node.children, depth + 1)}
        </li>
      ))}
    </ul>
  )
}

/**
 * Table of contents. The list is server-rendered anchor links that work
 * without JavaScript; a small client island highlights the active section
 * (exactly one at a time) and scrolls smoothly with an offset.
 */
export function TocScrollspy({
  items,
  selector,
  container,
  root,
  offset = 16,
  sticky = true,
  updateHash = true,
  title,
  listClassName,
  footer,
  labels,
  onNavigate,
  className,
  style,
  ...props
}: TocScrollspyProps) {
  const heading =
    title === undefined ? (labels?.title ?? "On this page") : title

  return (
    <nav
      data-toc-scrollspy=""
      aria-label={labels?.nav ?? "Table of contents"}
      className={cn(sticky && "sticky top-4 self-start", className)}
      style={sticky ? { top: offset, ...style } : style}
      {...props}
    >
      {heading !== null && (
        <p className="mb-2 text-sm font-medium">{heading}</p>
      )}
      <div data-toc-list="" className={cn("py-1", listClassName)}>
        {items?.length ? renderNodes(buildTree(items), 0) : null}
        <TocScrollspySpy
          ids={items ? items.map((i) => i.id) : undefined}
          selector={items ? undefined : selector}
          container={container}
          root={root}
          offset={offset}
          updateHash={updateHash}
          onNavigate={onNavigate}
        />
      </div>
      {footer && <div className="mt-8 border-t pt-4">{footer}</div>}
    </nav>
  )
}
