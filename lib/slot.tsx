"use client"

import * as React from "react"

/**
 * Merges multiple refs into one callback ref.
 */
function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node)
      } else if (ref && typeof ref === "object") {
        ;(ref as React.MutableRefObject<T | null>).current = node
      }
    }
  }
}

/**
 * Merges props from parent Slot to child element.
 * Handles className concatenation and event handler composition.
 */
function mergeProps(
  parentProps: Record<string, unknown>,
  childProps: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...parentProps }

  for (const key of Object.keys(childProps)) {
    const parentValue = parentProps[key]
    const childValue = childProps[key]

    // Merge event handlers
    if (
      key.startsWith("on") &&
      typeof parentValue === "function" &&
      typeof childValue === "function"
    ) {
      merged[key] = (...args: unknown[]) => {
        childValue(...args)
        parentValue(...args)
      }
    }
    // Concatenate classNames
    else if (key === "className") {
      merged[key] = [parentValue, childValue].filter(Boolean).join(" ")
    }
    // Merge styles
    else if (key === "style") {
      merged[key] = { ...(parentValue as object), ...(childValue as object) }
    }
    // Child props override parent props
    else {
      merged[key] = childValue !== undefined ? childValue : parentValue
    }
  }

  return merged
}

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

/**
 * Slot component for composition pattern (asChild).
 * Renders its child element with merged props from parent.
 *
 * @example
 * ```tsx
 * <Slot className="button-styles" onClick={handleClick}>
 *   <a href="/page">Link as button</a>
 * </Slot>
 * ```
 */
function Slot({
  children,
  ...props
}: SlotProps & { ref?: React.Ref<HTMLElement> }) {
  if (!React.isValidElement(children)) {
    console.warn("Slot requires a valid React element as children")
    return null
  }

  const childProps = children.props as Record<string, unknown>
  const mergedProps = mergeProps(props, childProps)

  // Handle ref merging
  const parentRef = props.ref as React.Ref<HTMLElement> | undefined
  const childRef = (children as { ref?: React.Ref<HTMLElement> }).ref

  if (parentRef || childRef) {
    mergedProps.ref = mergeRefs(parentRef, childRef)
  }

  return React.cloneElement(
    children,
    mergedProps as React.Attributes & Record<string, unknown>,
  )
}

Slot.displayName = "Slot"

export { Slot }
