"use client"

import { Slot } from "@/lib/slot"
import * as React from "react"
import { useAsRef } from "@/hooks/use-as-ref"
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect"
import { useLazyRef } from "@/hooks/use-lazy-ref"
import { useComposedRefs } from "@/lib/compose-refs"
import { cn } from "@/lib/utils"

const ROOT_NAME = "ScrollSpy"
const NAV_NAME = "ScrollSpyNav"
const LINK_NAME = "ScrollSpyLink"
const VIEWPORT_NAME = "ScrollSpyViewport"
const SECTION_NAME = "ScrollSpySection"

type Orientation = "horizontal" | "vertical"

interface DivProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

interface AnchorProps extends React.ComponentProps<"a"> {
  asChild?: boolean
}

interface StoreState {
  activeValue: string | null
  sections: Map<string, HTMLElement>
}

interface Store {
  subscribe: (callback: () => void) => () => void
  getState: () => StoreState
  setState: <K extends keyof StoreState>(key: K, value: StoreState[K]) => void
  notify: () => void
}

const StoreContext = React.createContext<Store | null>(null)

function useStore<T>(
  selector: (state: StoreState) => T,
  ogStore?: Store | null,
): T {
  const contextStore = React.useContext(StoreContext)

  const store = ogStore ?? contextStore

  if (!store) {
    throw new Error(`\`useStore\` must be used within \`${ROOT_NAME}\``)
  }

  const getSnapshot = React.useCallback(
    () => selector(store.getState()),
    [store, selector],
  )

  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot)
}

interface ScrollSpyContextValue {
  orientation: Orientation
  offset: number
  scrollContainer: React.RefObject<HTMLElement | null>
  onLinkClick: (value: string) => void
  registerSection: (value: string, element: HTMLElement) => void
  unregisterSection: (value: string) => void
}

const ScrollSpyContext = React.createContext<ScrollSpyContextValue | null>(null)

function useScrollSpyContext(consumerName: string) {
  const context = React.useContext(ScrollSpyContext)
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``)
  }
  return context
}

interface ScrollSpyProps extends Omit<DivProps, "defaultValue"> {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  orientation?: Orientation
  offset?: number
  scrollContainer?: React.RefObject<HTMLElement | null>
}

function ScrollSpy(props: ScrollSpyProps) {
  const {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    orientation = "vertical",
    offset = 0,
    scrollContainer,
    className,
    children,
    ref,
    asChild,
    ...rootProps
  } = props

  const stateRef = useLazyRef<StoreState>(() => ({
    activeValue: valueProp ?? defaultValue,
    sections: new Map(),
  }))
  const listenersRef = useLazyRef(() => new Set<() => void>())
  const onValueChangeRef = useAsRef(onValueChange)
  const internalScrollContainerRef = React.useRef<HTMLElement | null>(null)

  const store = React.useMemo<Store>(() => {
    return {
      subscribe: (cb) => {
        listenersRef.current.add(cb)
        return () => listenersRef.current.delete(cb)
      },
      getState: () => stateRef.current,
      setState: <K extends keyof StoreState>(key: K, value: StoreState[K]) => {
        if (Object.is(stateRef.current[key], value)) return
        stateRef.current[key] = value

        if (key === "activeValue") {
          onValueChangeRef.current?.(value as string | null)
        }

        store.notify()
      },
      notify: () => {
        for (const cb of listenersRef.current) {
          cb()
        }
      },
    }
  }, [listenersRef, stateRef, onValueChangeRef])

  const effectiveScrollContainer = scrollContainer ?? internalScrollContainerRef

  useIsomorphicLayoutEffect(() => {
    if (valueProp !== undefined) {
      store.setState("activeValue", valueProp)
    }
  }, [valueProp])

  // Scroll handler
  React.useEffect(() => {
    const container = effectiveScrollContainer.current ?? window

    const handleScroll = () => {
      const sections = store.getState().sections
      if (sections.size === 0) return

      const scrollTop =
        container === window
          ? window.scrollY
          : (container as HTMLElement).scrollTop

      let activeSection: string | null = null
      let minDistance = Infinity

      sections.forEach((element, value) => {
        const rect = element.getBoundingClientRect()
        const containerTop =
          container === window
            ? 0
            : (container as HTMLElement).getBoundingClientRect().top

        const distance = Math.abs(rect.top - containerTop - offset)

        if (rect.top - containerTop <= offset + 10 && distance < minDistance) {
          minDistance = distance
          activeSection = value
        }
      })

      if (activeSection !== null) {
        store.setState("activeValue", activeSection)
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [effectiveScrollContainer, offset, store])

  const registerSection = React.useCallback(
    (value: string, element: HTMLElement) => {
      const sections = store.getState().sections
      sections.set(value, element)
      store.setState("sections", new Map(sections))
    },
    [store],
  )

  const unregisterSection = React.useCallback(
    (value: string) => {
      const sections = store.getState().sections
      sections.delete(value)
      store.setState("sections", new Map(sections))
    },
    [store],
  )

  const onLinkClick = React.useCallback(
    (value: string) => {
      const sections = store.getState().sections
      const element = sections.get(value)
      if (!element) return

      const container = effectiveScrollContainer.current ?? window
      const elementTop = element.getBoundingClientRect().top

      if (container === window) {
        const scrollTop = window.scrollY + elementTop - offset
        window.scrollTo({ top: scrollTop, behavior: "smooth" })
      } else {
        const containerRect = (container as HTMLElement).getBoundingClientRect()
        const scrollTop =
          (container as HTMLElement).scrollTop +
          elementTop -
          containerRect.top -
          offset
        ;(container as HTMLElement).scrollTo({
          top: scrollTop,
          behavior: "smooth",
        })
      }

      store.setState("activeValue", value)
    },
    [effectiveScrollContainer, offset, store],
  )

  const contextValue = React.useMemo<ScrollSpyContextValue>(
    () => ({
      orientation,
      offset,
      scrollContainer: effectiveScrollContainer,
      onLinkClick,
      registerSection,
      unregisterSection,
    }),
    [
      orientation,
      offset,
      effectiveScrollContainer,
      onLinkClick,
      registerSection,
      unregisterSection,
    ],
  )

  const RootPrimitive = asChild ? Slot : "div"

  return (
    <StoreContext.Provider value={store}>
      <ScrollSpyContext.Provider value={contextValue}>
        <RootPrimitive
          data-slot="scroll-spy"
          data-orientation={orientation}
          {...rootProps}
          ref={ref}
          className={cn(
            "flex gap-6",
            orientation === "horizontal" ? "flex-col" : "flex-row",
            className,
          )}
        >
          {children}
        </RootPrimitive>
      </ScrollSpyContext.Provider>
    </StoreContext.Provider>
  )
}

interface ScrollSpyNavProps extends DivProps {}

function ScrollSpyNav(props: ScrollSpyNavProps) {
  const { className, children, asChild, ref, ...navProps } = props

  const { orientation } = useScrollSpyContext(NAV_NAME)

  const NavPrimitive = asChild ? Slot : "nav"

  return (
    <NavPrimitive
      data-slot="scroll-spy-nav"
      data-orientation={orientation}
      {...navProps}
      ref={ref}
      className={cn(
        "flex gap-1",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
    >
      {children}
    </NavPrimitive>
  )
}

interface ScrollSpyLinkProps extends AnchorProps {
  value: string
}

function ScrollSpyLink(props: ScrollSpyLinkProps) {
  const { value, className, children, onClick, asChild, ref, ...linkProps } =
    props

  const { orientation, onLinkClick } = useScrollSpyContext(LINK_NAME)
  const activeValue = useStore((state) => state.activeValue)
  const isActive = activeValue === value

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick?.(event)
    if (!event.defaultPrevented) {
      onLinkClick(value)
    }
  }

  const LinkPrimitive = asChild ? Slot : "a"

  return (
    <LinkPrimitive
      href={`#${value}`}
      data-slot="scroll-spy-link"
      data-orientation={orientation}
      data-state={isActive ? "active" : "inactive"}
      {...linkProps}
      ref={ref}
      onClick={handleClick}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </LinkPrimitive>
  )
}

interface ScrollSpyViewportProps extends DivProps {}

function ScrollSpyViewport(props: ScrollSpyViewportProps) {
  const { className, children, asChild, ref, ...viewportProps } = props

  const { orientation } = useScrollSpyContext(VIEWPORT_NAME)

  const ViewportPrimitive = asChild ? Slot : "div"

  return (
    <ViewportPrimitive
      data-slot="scroll-spy-viewport"
      data-orientation={orientation}
      {...viewportProps}
      ref={ref}
      className={cn("flex-1", className)}
    >
      {children}
    </ViewportPrimitive>
  )
}

interface ScrollSpySectionProps extends DivProps {
  value: string
}

function ScrollSpySection(props: ScrollSpySectionProps) {
  const { value, className, children, asChild, ref, ...sectionProps } = props

  const { orientation, registerSection, unregisterSection } =
    useScrollSpyContext(SECTION_NAME)

  const sectionRef = React.useRef<HTMLElement | null>(null)
  const composedRef = useComposedRefs(ref, sectionRef)

  React.useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    registerSection(value, element)

    return () => {
      unregisterSection(value)
    }
  }, [value, registerSection, unregisterSection])

  const SectionPrimitive = asChild ? Slot : "section"

  return (
    <SectionPrimitive
      id={value}
      data-slot="scroll-spy-section"
      data-orientation={orientation}
      {...sectionProps}
      ref={composedRef}
      className={cn("scroll-mt-20", className)}
    >
      {children}
    </SectionPrimitive>
  )
}

export {
  ScrollSpy,
  ScrollSpyNav,
  ScrollSpyLink,
  ScrollSpyViewport,
  ScrollSpySection,
  type ScrollSpyProps,
  type ScrollSpyNavProps,
  type ScrollSpyLinkProps,
  type ScrollSpyViewportProps,
  type ScrollSpySectionProps,
}
