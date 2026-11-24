"use client"

import * as React from "react"
import {
  StepWizard as BaseStepWizard,
  type StepWizardProps as BaseStepWizardProps,
  StepWizardStep as BaseStepWizardStep,
  type StepWizardStepProps as BaseStepWizardStepProps,
  STEP_WIZARD_LABELS,
} from "@/registry/gooseui/ui/step-wizard"

/** `true`/`undefined` lets the step pass, `false` blocks it, a string blocks it and is shown as an error */
export type StepValidateResult = boolean | string | undefined
export type StepValidate = () =>
  | StepValidateResult
  | Promise<StepValidateResult>

type StepWizardApi = {
  /** Zero-based index of the open step */
  step: number
  total: number
  isFirst: boolean
  isLast: boolean
  /** 0–100 */
  progress: number
  pending: boolean
  error: string | null
  /** Validates the open step, then opens the next one or calls onComplete */
  next: () => Promise<void>
  back: () => void
  /** Jump to a step without validation */
  goTo: (step: number) => void
  setError: (error: string | null) => void
}

const ApiContext = React.createContext<StepWizardApi | null>(null)
const RegisterContext = React.createContext<
  ((index: number, validate: StepValidate | undefined) => void) | null
>(null)

/** Read and drive the wizard from inside any step or custom control */
export function useStepWizard() {
  const ctx = React.useContext(ApiContext)
  if (!ctx) throw new Error("useStepWizard must be used inside <StepWizard>")
  return ctx
}

export type StepWizardProps = BaseStepWizardProps & {
  onStepChange?: (step: number) => void
  /** Called after the last step passes validation. May return a promise */
  onComplete?: () => void | Promise<void>
}

const stepsOf = (root: HTMLElement | null) =>
  root
    ? Array.from(root.children).filter(
        (el): el is HTMLDetailsElement => el instanceof HTMLDetailsElement,
      )
    : []

/**
 * Client version of StepWizard: adds async `validate` on steps, `onComplete`,
 * `onStepChange` and the useStepWizard hook. Navigation itself stays on the
 * native <details name> of the base component.
 */
export function StepWizard({
  children,
  onStepChange,
  onComplete,
  defaultStep = 0,
  labels,
  ref,
  ...props
}: StepWizardProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const validators = React.useRef(new Map<number, StepValidate>())
  const total = React.Children.toArray(children).filter(
    React.isValidElement,
  ).length
  const [step, setStep] = React.useState(() =>
    Math.min(Math.max(Math.trunc(defaultStep), 0), Math.max(total - 1, 0)),
  )
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const errorLabel = labels?.error ?? STEP_WIZARD_LABELS.error

  const goTo = React.useCallback((target: number) => {
    const steps = stepsOf(rootRef.current)
    const el = steps[Math.min(Math.max(target, 0), steps.length - 1)]
    if (!el || el.open) return
    el.open = true
    el.querySelector("summary")?.focus({ preventScroll: true })
  }, [])

  const state = React.useRef({ step, pending, onComplete, errorLabel })
  state.current = { step, pending, onComplete, errorLabel }

  const next = React.useCallback(async () => {
    const { step: current, pending: busy } = state.current
    if (busy) return
    const isLast = current === stepsOf(rootRef.current).length - 1
    setError(null)
    setPending(true)
    try {
      const result = await validators.current.get(current)?.()
      if (result === false) return
      if (typeof result === "string") {
        setError(result)
        return
      }
      if (isLast) await state.current.onComplete?.()
      else goTo(current + 1)
    } catch (err) {
      // Show a throwing validate or onComplete instead of an unhandled rejection
      setError(
        err instanceof Error && err.message
          ? err.message
          : state.current.errorLabel,
      )
    } finally {
      setPending(false)
    }
  }, [goTo])

  const onStepChangeRef = React.useRef(onStepChange)
  onStepChangeRef.current = onStepChange

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const onToggle = (event: Event) => {
      const el = event.target
      if (!(el instanceof HTMLDetailsElement) || !el.open) return
      const index = stepsOf(root).indexOf(el)
      if (index < 0) return
      setError(null)
      setStep(index)
      onStepChangeRef.current?.(index)
    }
    // Next and Finish run the validators before the native behavior
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element
      const steps = stepsOf(root)
      const { step: current, onComplete: complete } = state.current
      const summary = target.closest("summary")
      const finish = target.closest('[data-slot="step-wizard-finish"]')
      const toNext =
        summary !== null &&
        steps.indexOf(summary.parentElement as HTMLDetailsElement) ===
          current + 1
      if (
        (toNext &&
          (validators.current.has(current) || state.current.pending)) ||
        (finish && complete)
      ) {
        event.preventDefault()
        void next()
      }
    }
    // toggle does not bubble, so listen in the capture phase
    root.addEventListener("toggle", onToggle, true)
    root.addEventListener("click", onClick)
    return () => {
      root.removeEventListener("toggle", onToggle, true)
      root.removeEventListener("click", onClick)
    }
  }, [next])

  const register = React.useCallback(
    (index: number, validate: StepValidate | undefined) => {
      if (validate) validators.current.set(index, validate)
      else validators.current.delete(index)
    },
    [],
  )

  const api: StepWizardApi = {
    step,
    total,
    isFirst: step === 0,
    isLast: step === total - 1,
    progress: total > 0 ? Math.round(((step + 1) / total) * 100) : 0,
    pending,
    error,
    next,
    back: () => goTo(step - 1),
    goTo,
    setError,
  }

  return (
    <ApiContext.Provider value={api}>
      <RegisterContext.Provider value={register}>
        <BaseStepWizard
          {...props}
          ref={(node: HTMLDivElement | null) => {
            rootRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) ref.current = node
          }}
          labels={labels}
          defaultStep={defaultStep}
          pending={pending}
          error={error ?? props.error}
        >
          {children}
        </BaseStepWizard>
      </RegisterContext.Provider>
    </ApiContext.Provider>
  )
}

export type StepWizardStepProps = BaseStepWizardStepProps & {
  /** Runs before moving forward. May be async */
  validate?: StepValidate
}

export function StepWizardStep({ validate, ...props }: StepWizardStepProps) {
  const register = React.useContext(RegisterContext)
  const index = props._wizard?.index ?? -1
  // Keep the latest validate without re-registering on every render
  const validateRef = React.useRef(validate)
  validateRef.current = validate
  const hasValidate = validate !== undefined

  React.useEffect(() => {
    if (!register || index < 0) return
    register(index, hasValidate ? () => validateRef.current?.() : undefined)
    return () => register(index, undefined)
  }, [register, index, hasValidate])

  return <BaseStepWizardStep {...props} />
}
