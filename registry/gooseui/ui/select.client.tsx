"use client"

import * as React from "react"

const subscribe = () => () => {}

/**
 * True when the browser renders a customizable select. Always false on the
 * server and during hydration: browsers with the old HTML parser drop
 * <button>, <selectedcontent> and tags inside <option>, so the rich markup
 * can only be added on the client, after hydration.
 */
function useBaseSelect() {
  return React.useSyncExternalStore(
    subscribe,
    () => CSS.supports("appearance", "base-select"),
    () => false,
  )
}

/** Button with <selectedcontent>, so the closed select shows the icon of the picked option */
export function SelectTrigger() {
  if (!useBaseSelect()) return null
  return (
    <button type="button" data-slot="select-trigger">
      {React.createElement("selectedcontent")}
    </button>
  )
}

export type SelectOptionContentProps = {
  icon?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}

/** Icon, label and description inside an option. Plain label text until the browser can render it */
export function SelectOptionContent({
  icon,
  description,
  children,
}: SelectOptionContentProps) {
  if (!useBaseSelect()) return children
  return (
    <>
      {icon && (
        <span
          data-slot="select-option-icon"
          aria-hidden="true"
          className="inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground [&>svg]:size-4"
        >
          {icon}
        </span>
      )}
      <span className="flex min-w-0 flex-col">
        <span data-slot="select-option-label">{children}</span>
        {description && (
          <span
            data-slot="select-option-description"
            className="text-xs font-normal text-muted-foreground"
          >
            {description}
          </span>
        )}
      </span>
    </>
  )
}
