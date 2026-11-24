import { Plus } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

export type DetailsAccordionVariant = "line" | "card" | "framed"

export type DetailsAccordionItemData = {
  id?: string
  title: React.ReactNode
  content: React.ReactNode
  defaultOpen?: boolean
}

export type DetailsAccordionProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  items: DetailsAccordionItemData[]
  /** Let several items stay open at once */
  multiple?: boolean
  /** Shared `name` for the exclusive mode. Generated when omitted */
  name?: string
  variant?: DetailsAccordionVariant
  /** Show 01, 02, … before every title. Meant for the "framed" variant */
  numbered?: boolean
  itemClassName?: string
}

export type DetailsAccordionItemProps = Omit<
  React.ComponentProps<"details">,
  "title" | "open"
> & {
  title: React.ReactNode
  /** Items with the same `name` close each other */
  name?: string
  defaultOpen?: boolean
  variant?: DetailsAccordionVariant
  /** Large label before the title, for example "01" */
  marker?: React.ReactNode
}

// The open/close height transition needs ::details-content and interpolate-size.
// Browsers without them skip these rules and toggle instantly.
const detailsStyles = `
.gooseui-details { interpolate-size: allow-keywords; }
.gooseui-details::details-content {
  block-size: 0;
  overflow-y: clip;
  transition: block-size 0.3s ease, content-visibility 0.3s allow-discrete;
}
.gooseui-details[open]::details-content { block-size: auto; }
@media (prefers-reduced-motion: reduce) {
  .gooseui-details::details-content { transition: none; }
}
`

export function DetailsAccordionItem({
  title,
  name,
  defaultOpen,
  variant = "line",
  marker,
  className,
  children,
  ...props
}: DetailsAccordionItemProps) {
  const framed = variant === "framed"
  const details = (
    <details
      {...props}
      name={name}
      open={defaultOpen}
      className={cn(
        "gooseui-details group",
        variant === "line" && "border-b last:border-b-0",
        variant === "card" && "rounded-lg border bg-card text-card-foreground",
        framed && "overflow-hidden border border-border/50 bg-muted/30",
        className,
      )}
      style={
        framed
          ? ({
              cornerShape: "squircle",
              borderRadius: "1rem",
              ...props.style,
            } as React.CSSProperties)
          : props.style
      }
    >
      <style href="gooseui-details-accordion" precedence="default">
        {detailsStyles}
      </style>
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium outline-none select-none [&::-webkit-details-marker]:hidden",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50",
          !framed && "rounded-md",
          variant === "line" && "py-4",
          variant === "card" && "px-4 py-3.5",
          framed && "p-5",
        )}
      >
        <span
          className={cn("min-w-0", framed && "flex flex-1 items-center gap-4")}
        >
          {marker != null && (
            <span className="font-mono text-3xl font-bold text-muted-foreground/30 transition-colors duration-300 group-open:text-primary/70 sm:text-4xl">
              {marker}
            </span>
          )}
          <span
            className={cn(
              framed &&
                "flex-1 text-base tracking-tight text-foreground/80 sm:text-lg",
            )}
          >
            {title}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-[rotate,color,background-color] duration-300 ease-out group-open:rotate-45 group-open:text-primary-foreground group-hover:text-foreground group-open:group-hover:text-primary-foreground motion-reduce:transition-none",
            framed
              ? "bg-muted/50 group-hover:bg-muted group-open:bg-primary/70 group-open:group-hover:bg-primary/70"
              : "border group-open:bg-primary",
          )}
        >
          <Plus className="size-4" />
        </span>
      </summary>
      <div
        className={cn(
          "text-sm text-muted-foreground",
          variant === "line" && "pr-11 pb-4",
          variant === "card" && "px-4 pb-4",
          framed && "px-5 pb-5",
          framed && marker != null && "pl-[4.5rem]",
        )}
      >
        {children}
      </div>
    </details>
  )

  if (!framed) return details
  return (
    <div
      className="border border-dashed border-border/50 p-2 transition-colors hover:border-border"
      style={
        {
          cornerShape: "squircle",
          borderRadius: "1.5rem",
        } as React.CSSProperties
      }
    >
      {details}
    </div>
  )
}

export function DetailsAccordion({
  items,
  multiple = false,
  name: nameProp,
  variant = "line",
  numbered = false,
  className,
  itemClassName,
  ...props
}: DetailsAccordionProps) {
  const autoName = React.useId()
  const name = multiple ? undefined : (nameProp ?? `accordion-${autoName}`)
  return (
    <div
      {...props}
      className={cn(
        "w-full",
        variant === "line" && "border-y",
        variant === "card" && "space-y-2",
        variant === "framed" && "space-y-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <DetailsAccordionItem
          key={item.id ?? index}
          id={item.id}
          name={name}
          title={item.title}
          defaultOpen={item.defaultOpen}
          variant={variant}
          marker={numbered ? String(index + 1).padStart(2, "0") : undefined}
          className={itemClassName}
        >
          {item.content}
        </DetailsAccordionItem>
      ))}
    </div>
  )
}
