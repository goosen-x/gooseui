/**
 * Runtime browser checks for Baseline features.
 *
 * Maps a web-features `featureId` to a feature test that runs in the visitor's
 * browser, plus a human-readable name for the "Your browser supports …" line.
 * Used by BaselineStatus (`browserCheck`). No dependencies.
 *
 * Every test is a real detection (CSS.supports, an API on a prototype or a
 * parsed rule), never a user-agent guess. Features that cannot be detected
 * honestly are left out of the table, so no check line is shown for them.
 */

/** How to detect a feature. Use one of `css`, `selector` or `test`. */
export interface BrowserCheck {
  /** `CSS.supports(property, value)` */
  css?: [property: string, value: string]
  /** `CSS.supports("selector(<selector>)")`, e.g. `":has(*)"` */
  selector?: string
  /** Custom detection for APIs and at-rules */
  test?: () => boolean
  /** Name of the feature in "Your browser supports {label}" */
  label?: string
}

const cssSupports = (property: string, value: string): boolean =>
  typeof CSS !== "undefined" &&
  typeof CSS.supports === "function" &&
  CSS.supports(property, value)

const selectorSupports = (selector: string): boolean =>
  typeof CSS !== "undefined" &&
  typeof CSS.supports === "function" &&
  CSS.supports(`selector(${selector})`)

const inWindow = (name: string): boolean =>
  typeof window !== "undefined" && name in window

/** Detects `hidden="until-found"`: unsupported browsers coerce it to `true` */
const hiddenUntilFound = (): boolean => {
  const el = document.createElement("div") as unknown as { hidden: unknown }
  el.hidden = "until-found"
  return el.hidden === "until-found"
}

/** Parses a nested rule: browsers without CSS nesting drop it */
const cssNesting = (): boolean => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(".a{.b{color:red}}")
  const rule = sheet.cssRules[0] as CSSStyleRule | undefined
  return rule?.cssRules?.length === 1
}

/**
 * Vertical `writing-mode` on form controls: a horizontal range input is wider
 * than it is tall, a vertical one is the other way round. Measures a hidden
 * element, so it is the only check that touches layout.
 */
const verticalFormControls = (): boolean => {
  const input = document.createElement("input")
  input.type = "range"
  input.setAttribute("aria-hidden", "true")
  input.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;width:auto;height:auto;max-width:none;writing-mode:vertical-lr"
  document.body.appendChild(input)
  const { width, height } = input.getBoundingClientRect()
  input.remove()
  return height > width
}

export const BASELINE_CHECKS = {
  "anchor-positioning": {
    label: "CSS Anchor Positioning",
    css: ["anchor-name", "--a"],
  },
  appearance: { label: "appearance", css: ["appearance", "none"] },
  "async-clipboard": {
    label: "Async Clipboard API",
    // navigator.clipboard exists only in secure contexts (https, localhost)
    test: () => typeof navigator.clipboard?.writeText === "function",
  },
  backdrop: { label: "::backdrop", selector: "::backdrop" },
  "clip-path": { label: "clip-path", css: ["clip-path", "circle(50%)"] },
  "color-mix": {
    label: "color-mix()",
    css: ["color", "color-mix(in srgb, red, blue)"],
  },
  "container-queries": {
    label: "Container Queries",
    css: ["container-type", "inline-size"],
  },
  "content-visibility": {
    label: "content-visibility",
    css: ["content-visibility", "auto"],
  },
  "corner-shape": {
    label: "CSS corner-shape",
    css: ["corner-shape", "squircle"],
  },
  details: { label: "<details>", test: () => inWindow("HTMLDetailsElement") },
  "details-content": {
    label: "::details-content",
    selector: "::details-content",
  },
  "details-name": {
    label: "<details name>",
    test: () =>
      inWindow("HTMLDetailsElement") && "name" in HTMLDetailsElement.prototype,
  },
  dialog: { label: "<dialog>", test: () => inWindow("HTMLDialogElement") },
  "dialog-closedby": {
    label: "<dialog closedby>",
    test: () =>
      inWindow("HTMLDialogElement") &&
      "closedBy" in HTMLDialogElement.prototype,
  },
  "exp-functions": {
    label: "CSS exponential functions",
    css: ["width", "calc(1px * pow(2, 3))"],
  },
  "focus-within": { label: ":focus-within", selector: ":focus-within" },
  has: { label: ":has() selector", selector: ":has(*)" },
  "hidden-until-found": {
    label: 'hidden="until-found"',
    test: hiddenUntilFound,
  },
  "individual-transforms": {
    label: "individual transform properties",
    css: ["translate", "10px"],
  },
  inert: {
    label: "inert",
    test: () =>
      typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype,
  },
  "interpolate-size": {
    label: "interpolate-size",
    css: ["interpolate-size", "allow-keywords"],
  },
  "invoker-commands": {
    label: "Invoker Commands",
    test: () =>
      inWindow("HTMLButtonElement") &&
      "commandForElement" in HTMLButtonElement.prototype,
  },
  "linear-easing": {
    label: "linear() easing",
    css: ["transition-timing-function", "linear(0, 1)"],
  },
  masks: {
    label: "CSS masks",
    css: ["mask-image", "linear-gradient(black, transparent)"],
  },
  "mix-blend-mode": {
    label: "mix-blend-mode",
    css: ["mix-blend-mode", "multiply"],
  },
  nesting: { label: "CSS Nesting", test: cssNesting },
  notifications: {
    label: "Notifications API",
    test: () => inWindow("Notification"),
  },
  "interest-invokers": {
    label: "interestfor",
    test: () =>
      typeof HTMLButtonElement !== "undefined" &&
      "interestForElement" in HTMLButtonElement.prototype,
  },
  "overscroll-behavior": {
    label: "overscroll-behavior",
    css: ["overscroll-behavior", "contain"],
  },
  "placeholder-shown": {
    label: ":placeholder-shown",
    selector: ":placeholder-shown",
  },
  popover: {
    label: "Popover API",
    test: () =>
      typeof HTMLElement !== "undefined" && "popover" in HTMLElement.prototype,
  },
  "popover-hint": {
    label: 'popover="hint"',
    test: () => {
      const el = document.createElement("div")
      el.setAttribute("popover", "hint")
      return el.popover === "hint"
    },
  },
  "registered-custom-properties": {
    label: "@property",
    test: () => inWindow("CSSPropertyRule"),
  },
  scripting: {
    label: "scripting media query",
    // An unknown media feature makes the whole query "not all"
    test: () => window.matchMedia("(scripting)").media !== "not all",
  },
  "scroll-buttons": {
    label: "::scroll-button()",
    selector: "::scroll-button(*)",
  },
  "scroll-driven-animations": {
    label: "Scroll-driven Animations",
    css: ["animation-timeline", "scroll()"],
  },
  "scroll-snap": {
    label: "CSS Scroll Snap",
    css: ["scroll-snap-type", "x mandatory"],
  },
  "scroll-target-group": {
    label: "scroll-target-group",
    css: ["scroll-target-group", "auto"],
  },
  "scrollbar-color": {
    label: "scrollbar-color",
    css: ["scrollbar-color", "red blue"],
  },
  "scrollbar-gutter": {
    label: "scrollbar-gutter",
    css: ["scrollbar-gutter", "stable"],
  },
  "scrollbar-width": {
    label: "scrollbar-width",
    css: ["scrollbar-width", "thin"],
  },
  scrollend: { label: "scrollend event", test: () => inWindow("onscrollend") },
  share: {
    label: "Web Share API",
    test: () => typeof navigator.share === "function",
  },
  "starting-style": {
    label: "@starting-style",
    test: () => inWindow("CSSStartingStyleRule"),
  },
  "text-wrap-balance": {
    label: "text-wrap: balance",
    css: ["text-wrap", "balance"],
  },
  "text-wrap-pretty": {
    label: "text-wrap: pretty",
    css: ["text-wrap", "pretty"],
  },
  "transition-behavior": {
    label: "transition-behavior",
    css: ["transition-behavior", "allow-discrete"],
  },
  "user-pseudos": {
    label: ":user-valid and :user-invalid",
    test: () =>
      selectorSupports(":user-valid") && selectorSupports(":user-invalid"),
  },
  "vertical-form-controls": {
    label: "vertical form controls",
    test: verticalFormControls,
  },
  "view-transitions": {
    label: "View Transitions API",
    test: () =>
      typeof document !== "undefined" && "startViewTransition" in document,
  },
  "visual-viewport": {
    label: "Visual Viewport API",
    test: () => inWindow("visualViewport"),
  },
  webvtt: { label: "WebVTT", test: () => inWindow("VTTCue") },
} as const satisfies Record<string, BrowserCheck>

/** Feature ids that have a built-in check */
export type BrowserFeature = keyof typeof BASELINE_CHECKS

/** Result of resolving a `browserCheck` prop: a name and a detection run */
export interface ResolvedBrowserCheck {
  label: string
  run: () => boolean
}

function isKnownFeature(id: string): id is BrowserFeature {
  return Object.hasOwn(BASELINE_CHECKS, id)
}

function builtIn(id: string | undefined): BrowserCheck | undefined {
  return id && isKnownFeature(id) ? BASELINE_CHECKS[id] : undefined
}

function detect(check: BrowserCheck): boolean {
  try {
    if (typeof window === "undefined") return false
    if (check.test) return check.test()
    if (check.css) return cssSupports(check.css[0], check.css[1])
    if (check.selector) return selectorSupports(check.selector)
  } catch {
    // Missing API or a throwing test means the feature is not available
  }
  return false
}

/**
 * Turns the `browserCheck` prop into a check.
 * - a feature id string: built-in check for that id
 * - `true`: built-in check for `featureId`
 * - an object: custom check, missing fields come from the built-in check
 *   for `featureId`
 * Returns `null` when nothing can be checked, so the caller shows no row.
 */
export function resolveBrowserCheck(
  browserCheck: string | true | BrowserCheck | undefined,
  featureId?: string,
): ResolvedBrowserCheck | null {
  if (!browserCheck) return null

  let check: BrowserCheck | undefined
  if (typeof browserCheck === "string") {
    check = builtIn(browserCheck)
  } else if (browserCheck === true) {
    check = builtIn(featureId)
  } else if (browserCheck.css || browserCheck.selector || browserCheck.test) {
    // An explicit detection replaces the built-in one; the name may still
    // come from the built-in entry
    check = { label: builtIn(featureId)?.label, ...browserCheck }
  } else {
    // Only a label (or nothing): keep the built-in detection
    check = { ...builtIn(featureId), ...browserCheck }
  }

  if (!check || !(check.test || check.css || check.selector)) return null
  const resolved = check
  return {
    label: resolved.label ?? featureId ?? "this feature",
    run: () => detect(resolved),
  }
}
