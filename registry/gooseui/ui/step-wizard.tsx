import * as React from "react"

import { cn } from "@/lib/utils"

export type StepWizardTransition =
  | "fade-rise"
  | "slide"
  | "scale-blur"
  | "wipe"
  | "stagger"

export type StepWizardLabels = {
  back: string
  next: string
  finish: string
  /** `{current}` and `{total}` are replaced */
  progress: string
  /** Shown when validate or onComplete throws an error without a message */
  error: string
}

export const STEP_WIZARD_LABELS: StepWizardLabels = {
  back: "Back",
  next: "Next",
  finish: "Finish",
  progress: "Step {current} of {total}",
  error: "Something went wrong. Try again.",
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="gooseui-wizard-arrow size-4"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="gooseui-wizard-spinner size-4 animate-spin motion-reduce:animate-none"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

/*
 * Every step is a <details> with a shared name, so the browser keeps exactly
 * one open. The summary of the open step is its title; the summaries of its
 * neighbours turn into the Back and Next buttons. A step with an invalid field
 * hides the next summary and shows a disabled button instead.
 */
const STYLES = `
.gooseui-wizard { counter-reset: gooseui-wizard-step var(--gooseui-wizard-step, 1) gooseui-wizard-total var(--gooseui-wizard-total, 1); }
.gooseui-wizard-counter::before {
  content: counter(gooseui-wizard-step, decimal-leading-zero) " / " counter(gooseui-wizard-total, decimal-leading-zero);
}
.gooseui-wizard-fill { width: calc(var(--gooseui-wizard-step, 1) / var(--gooseui-wizard-total, 1) * 100%); transition: width 300ms; }
.gooseui-wizard-summary { list-style: none; }
.gooseui-wizard-summary::-webkit-details-marker { display: none; }
.gooseui-wizard-summary > span { display: none; }
.gooseui-wizard > details:not([open]) > .gooseui-wizard-summary { display: none; }
.gooseui-wizard > details[open] > .gooseui-wizard-summary { cursor: default; outline: none; }
.gooseui-wizard > details[open] > .gooseui-wizard-summary > .gooseui-wizard-title { display: block; }
.gooseui-wizard > details[open] > .gooseui-wizard-summary:focus-visible :is(h2, h3, h4) { text-decoration: underline; text-underline-offset: 4px; }
.gooseui-wizard-body { border: 0; margin: 0; padding: 0; min-inline-size: 0; }
.gooseui-wizard-control { position: absolute; bottom: 0; }
.gooseui-wizard[data-controls] > details:not([open]) > .gooseui-wizard-summary {
  position: absolute; bottom: 0; height: 2.25rem; align-items: center; gap: 0.5rem; padding: 0 0.75rem;
  border-radius: calc(var(--radius) - 2px); font-size: 0.875rem; line-height: 1.25rem; font-weight: 500;
  cursor: pointer; outline: none; transition: background-color 150ms, color 150ms;
}
.gooseui-wizard[data-controls] > details:not([open]) > .gooseui-wizard-summary:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 50%, transparent);
}
.gooseui-wizard[data-controls] > details[open] + details > .gooseui-wizard-summary {
  padding: 0 1rem; background: var(--primary); color: var(--primary-foreground);
}
.gooseui-wizard[data-controls] > details[open] + details > .gooseui-wizard-summary:hover {
  background: color-mix(in oklch, var(--primary) 90%, transparent);
}
.gooseui-wizard[data-controls] > details:has(+ details[open]) > .gooseui-wizard-summary:hover {
  background: var(--accent); color: var(--accent-foreground);
}
.gooseui-wizard-blocked, .gooseui-wizard-spinner { display: none; }

.gooseui-wizard[data-controls] > details[open] + details > .gooseui-wizard-summary { display: inline-flex; right: 0; }
.gooseui-wizard[data-controls] > details[open] + details > .gooseui-wizard-summary > .gooseui-wizard-next { display: contents; }
.gooseui-wizard[data-controls] > details:has(+ details[open]) > .gooseui-wizard-summary { display: inline-flex; left: 0; }
.gooseui-wizard[data-controls] > details:has(+ details[open]) > .gooseui-wizard-summary > .gooseui-wizard-back { display: contents; }

.gooseui-wizard[data-controls] > details[open]:has(.gooseui-wizard-body:invalid) + details > .gooseui-wizard-summary { display: none; }
.gooseui-wizard[data-controls] > details[open]:has(.gooseui-wizard-body:invalid) .gooseui-wizard-blocked { display: inline-flex; }

.gooseui-wizard[aria-busy="true"] .gooseui-wizard-spinner { display: block; }
.gooseui-wizard[aria-busy="true"] .gooseui-wizard-arrow { display: none; }
.gooseui-wizard[aria-busy="true"] .gooseui-wizard-control { pointer-events: none; opacity: 0.6; }

/* Nothing open (the open title was toggled from the keyboard): list the steps */
.gooseui-wizard:not(:has(> details[open])) > details > .gooseui-wizard-summary { display: block; position: static; height: auto; padding: 0; background: none; color: inherit; cursor: pointer; }
.gooseui-wizard:not(:has(> details[open])) > details > .gooseui-wizard-summary > span { display: none; }
.gooseui-wizard:not(:has(> details[open])) > details > .gooseui-wizard-summary > .gooseui-wizard-title { display: block; }

@keyframes gooseui-wizard-fade-rise { from { opacity: 0; translate: 0 16px; } }
@keyframes gooseui-wizard-slide { from { opacity: 0; translate: 40px 0; } }
@keyframes gooseui-wizard-scale-blur { from { opacity: 0; scale: 0.97; filter: blur(6px); } }
@keyframes gooseui-wizard-wipe { from { opacity: 0.4; clip-path: inset(0 0 100% 0); } }
@keyframes gooseui-wizard-item { from { opacity: 0; translate: 0 10px; } }
@keyframes gooseui-wizard-fade { from { opacity: 0; } }

.gooseui-wizard > details[open] :is(.gooseui-wizard-title, .gooseui-wizard-content) {
  animation: var(--gooseui-wizard-animation, gooseui-wizard-fade-rise) 280ms ease-in-out both;
}
.gooseui-wizard[data-transition="slide"] { --gooseui-wizard-animation: gooseui-wizard-slide; }
.gooseui-wizard[data-transition="scale-blur"] { --gooseui-wizard-animation: gooseui-wizard-scale-blur; }
.gooseui-wizard[data-transition="wipe"] { --gooseui-wizard-animation: gooseui-wizard-wipe; }
.gooseui-wizard[data-transition="wipe"] > details[open] :is(.gooseui-wizard-title, .gooseui-wizard-content) { animation-duration: 380ms; }
.gooseui-wizard[data-transition="stagger"] > details[open] .gooseui-wizard-title { animation-name: gooseui-wizard-item; }
.gooseui-wizard[data-transition="stagger"] > details[open] .gooseui-wizard-content { animation: none; }
.gooseui-wizard[data-transition="stagger"] > details[open] .gooseui-wizard-content > * {
  animation: gooseui-wizard-item 280ms ease-out both;
}
.gooseui-wizard[data-transition="stagger"] > details[open] .gooseui-wizard-content > :nth-child(1) { animation-delay: 70ms; }
.gooseui-wizard[data-transition="stagger"] > details[open] .gooseui-wizard-content > :nth-child(2) { animation-delay: 140ms; }
.gooseui-wizard[data-transition="stagger"] > details[open] .gooseui-wizard-content > :nth-child(n + 3) { animation-delay: 210ms; }

@media (prefers-reduced-motion: reduce) {
  .gooseui-wizard .gooseui-wizard-fill { transition: none; }
  .gooseui-wizard > details[open] :is(.gooseui-wizard-title, .gooseui-wizard-content, .gooseui-wizard-content > *) {
    animation: gooseui-wizard-fade 150ms ease-out both;
  }
}
`

/** Sets --gooseui-wizard-step from the open step, for the progress bar and counter */
function stepRules(total: number) {
  let css = ""
  for (let k = 1; k <= total; k++) {
    css += `.gooseui-wizard:has(> details:nth-of-type(${k})[open]) { --gooseui-wizard-step: ${k}; }\n`
  }
  return css
}

const controlClass =
  "gooseui-wizard-control h-9 cursor-pointer items-center gap-2 rounded-md text-sm font-medium outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50"
const primaryClass =
  "bg-primary px-4 text-primary-foreground shadow-xs hover:bg-primary/90"

type StepInternal = {
  name: string
  index: number
  total: number
  open: boolean
  labels: StepWizardLabels
  controls: boolean
}

export type StepWizardProps = Omit<React.ComponentProps<"div">, "children"> & {
  children: React.ReactNode
  /** Transition between steps */
  transition?: StepWizardTransition
  /** Zero-based step shown first */
  defaultStep?: number
  /** Show the progress bar and counter */
  showProgress?: boolean
  /** Render the built-in Back / Next / Finish buttons */
  showControls?: boolean
  labels?: Partial<StepWizardLabels>
  /** Shared name of the step <details>. Generated when omitted */
  name?: string
  /** Error under the current step, e.g. from a server action */
  error?: string | null
  /** Marks the wizard busy: a spinner replaces the Next arrow */
  pending?: boolean
}

function StepWizard({
  children,
  transition = "fade-rise",
  defaultStep = 0,
  showProgress = true,
  showControls = true,
  labels: labelsProp,
  name: nameProp,
  error,
  pending = false,
  className,
  style,
  ...props
}: StepWizardProps) {
  const labels = { ...STEP_WIZARD_LABELS, ...labelsProp }
  const autoName = React.useId()
  const name = nameProp ?? `gooseui-wizard-${autoName}`
  const steps = React.Children.toArray(children).filter(React.isValidElement)
  const total = steps.length
  const open = Math.min(Math.max(Math.trunc(defaultStep), 0), total - 1)

  return (
    <div
      data-slot="step-wizard"
      data-transition={transition}
      data-controls={showControls || undefined}
      aria-busy={pending || undefined}
      className={cn(
        "gooseui-wizard relative flex flex-col",
        showControls && "pb-15",
        className,
      )}
      style={
        {
          ...style,
          "--gooseui-wizard-total": total,
        } as React.CSSProperties
      }
      {...props}
    >
      <style href="gooseui-step-wizard" precedence="default">
        {STYLES}
      </style>
      <style href={`gooseui-step-wizard-${total}`} precedence="default">
        {stepRules(total)}
      </style>

      {showProgress && total > 0 && (
        <div aria-hidden="true" className="mb-6 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="gooseui-wizard-fill h-full rounded-full bg-primary" />
          </div>
          <span className="gooseui-wizard-counter font-mono text-xs tabular-nums text-muted-foreground" />
        </div>
      )}

      {steps.map((step, index) =>
        // Steps are positional: StepWizard hands each one its place in the flow
        React.cloneElement(step as React.ReactElement<StepWizardStepProps>, {
          key: index,
          _wizard: {
            name,
            index,
            total,
            open: index === open,
            labels,
            controls: showControls,
          },
        }),
      )}

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export type StepWizardStepProps = Omit<
  React.ComponentProps<"details">,
  "title" | "name" | "open"
> & {
  title: React.ReactNode
  description?: React.ReactNode
  /** Heading element for the step title */
  headingAs?: "h2" | "h3" | "h4"
  /** @internal Set by StepWizard */
  _wizard?: StepInternal
}

function StepWizardStep({
  title,
  description,
  headingAs: Heading = "h2",
  children,
  className,
  _wizard,
  ...props
}: StepWizardStepProps) {
  if (!_wizard) {
    throw new Error("<StepWizardStep> must be a direct child of <StepWizard>")
  }
  const { name, index, total, open, labels, controls } = _wizard
  const isLast = index === total - 1
  const progress = labels.progress
    .replace("{current}", String(index + 1))
    .replace("{total}", String(total))

  return (
    <details
      {...props}
      name={name}
      open={open}
      data-slot="step-wizard-step"
      className={cn("flex flex-col", className)}
    >
      <summary className="gooseui-wizard-summary">
        <span className="gooseui-wizard-title space-y-1.5">
          <Heading className="text-xl font-semibold tracking-tight">
            {title}
          </Heading>
          <span className="sr-only">{progress}</span>
        </span>
        <span className="gooseui-wizard-next">
          {labels.next}
          <ArrowRightIcon />
          <SpinnerIcon />
        </span>
        <span className="gooseui-wizard-back">
          <ArrowLeftIcon />
          {labels.back}
        </span>
      </summary>
      <fieldset className="gooseui-wizard-body">
        <div className="gooseui-wizard-content flex flex-col gap-4 pt-1.5">
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {children && <div>{children}</div>}
        </div>
        {controls && !isLast && (
          <button
            type="button"
            disabled
            className={cn(
              controlClass,
              primaryClass,
              "gooseui-wizard-blocked right-0 cursor-not-allowed opacity-60",
            )}
          >
            {labels.next}
            <ArrowRightIcon />
          </button>
        )}
        {controls && isLast && (
          <button
            type="submit"
            data-slot="step-wizard-finish"
            className={cn(controlClass, primaryClass, "right-0 inline-flex")}
          >
            {labels.finish}
            <ArrowRightIcon />
            <SpinnerIcon />
          </button>
        )}
      </fieldset>
    </details>
  )
}

export { StepWizard, StepWizardStep }
