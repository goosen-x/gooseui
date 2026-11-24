import * as React from "react"

type AnyProps = Record<string, unknown>

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value)
  else if (ref) (ref as React.RefObject<T | null>).current = value
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...slotProps, ...childProps }
  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key]
    const childValue = childProps[key]
    if (/^on[A-Z]/.test(key)) {
      if (typeof slotValue === "function" && typeof childValue === "function") {
        merged[key] = (...args: unknown[]) => {
          childValue(...args)
          slotValue(...args)
        }
      } else if (typeof slotValue === "function") {
        merged[key] = slotValue
      }
    } else if (key === "style") {
      merged[key] = { ...(slotValue as object), ...(childValue as object) }
    } else if (key === "className") {
      merged[key] = [slotValue, childValue].filter(Boolean).join(" ")
    }
  }
  return merged
}

/**
 * Renders its only child with the Slot's props merged in (the `asChild` pattern).
 * Handlers are chained (child first), `style` and `className` are combined.
 */
export function Slot({
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
  ref?: React.Ref<HTMLElement>
}) {
  if (!React.isValidElement(children)) {
    return React.Children.count(children) > 1 ? React.Children.only(null) : null
  }
  const child = children as React.ReactElement<AnyProps> & {
    props: AnyProps & { ref?: React.Ref<HTMLElement> }
  }
  const childRef = child.props.ref
  const merged = mergeProps(props as AnyProps, child.props)
  // Attach a ref only when someone provided one, so Slot also works in Server Components
  if (ref || childRef) {
    merged.ref = (node: HTMLElement | null) => {
      setRef(ref, node)
      setRef(childRef, node)
    }
  }
  return React.cloneElement(child, merged)
}
