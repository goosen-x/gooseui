"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/gooseui/ui/button"
import { Input } from "@/registry/gooseui/ui/input"
import { OptionPicker } from "@/registry/gooseui/ui/option-picker"
import type {
  StepWizardLabels,
  StepWizardTransition,
} from "@/registry/gooseui/ui/step-wizard"
import {
  StepWizard,
  StepWizardStep,
  useStepWizard,
} from "@/registry/gooseui/ui/step-wizard-client"

const en = {
  labels: undefined as Partial<StepWizardLabels> | undefined,
  transition: "Transition",
  q1: "What are you planning?",
  q1d: "Pick the closest option, you can change it later.",
  q1Options: [
    { value: "trip", label: "A trip", description: "A few days away" },
    { value: "party", label: "A party", description: "Friends and music" },
    { value: "course", label: "A course", description: "Learn something new" },
  ],
  q1Error: "Pick one of the options",
  q2: "How many people?",
  q2Options: [
    { value: "1", label: "Just me" },
    { value: "2-4", label: "2–4" },
    { value: "5+", label: "5 or more" },
  ],
  q3: "How should we call you?",
  q3d: "The name is checked on the server, it takes a moment.",
  q3Placeholder: "Your name",
  q3Error: "Type at least two letters",
  q4: "All set",
  q4d: "Press Finish to send your answers.",
  done: "Answers sent",
  c1: "Pick a color",
  c2: "Pick a size",
  colors: ["Sand", "Moss", "Slate"],
  sizes: ["S", "M", "L", "XL"],
  restart: "Start over",
  back: "Back",
  summary: "You picked",
  emailTitle: "Your email",
  emailDesc: "Try taken@example.com to see an async error.",
  emailTaken: "This email is already registered",
  emailInvalid: "This does not look like an email",
  passTitle: "Choose a password",
  passDesc: "At least 8 characters.",
  passError: "The password is too short",
  created: "Account created",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    labels: {
      back: "Назад",
      next: "Далее",
      finish: "Готово",
      progress: "Шаг {current} из {total}",
    },
    transition: "Переход",
    q1: "Что вы планируете?",
    q1d: "Выберите ближайший вариант, потом можно поменять.",
    q1Options: [
      { value: "trip", label: "Поездку", description: "На несколько дней" },
      { value: "party", label: "Вечеринку", description: "Друзья и музыка" },
      { value: "course", label: "Курс", description: "Узнать новое" },
    ],
    q1Error: "Выберите один из вариантов",
    q2: "Сколько будет людей?",
    q2Options: [
      { value: "1", label: "Только я" },
      { value: "2-4", label: "2–4" },
      { value: "5+", label: "5 и больше" },
    ],
    q3: "Как к вам обращаться?",
    q3d: "Имя проверяется на сервере, это занимает секунду.",
    q3Placeholder: "Ваше имя",
    q3Error: "Введите хотя бы две буквы",
    q4: "Всё готово",
    q4d: "Нажмите «Готово», чтобы отправить ответы.",
    done: "Ответы отправлены",
    c1: "Выберите цвет",
    c2: "Выберите размер",
    colors: ["Песок", "Мох", "Графит"],
    sizes: ["S", "M", "L", "XL"],
    restart: "Начать заново",
    back: "Назад",
    summary: "Ваш выбор",
    emailTitle: "Ваша почта",
    emailDesc: "Введите taken@example.com, чтобы увидеть асинхронную ошибку.",
    emailTaken: "Эта почта уже зарегистрирована",
    emailInvalid: "Это не похоже на почту",
    passTitle: "Придумайте пароль",
    passDesc: "Не короче 8 символов.",
    passError: "Пароль слишком короткий",
    created: "Аккаунт создан",
  },
}

const TRANSITIONS: StepWizardTransition[] = [
  "fade-rise",
  "slide",
  "scale-blur",
  "wipe",
  "stagger",
]

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function useT() {
  return content[useLocale() as Locale]
}

export function StepWizardDemo() {
  const t = useT()
  const [transition, setTransition] =
    React.useState<StepWizardTransition>("slide")
  const [plan, setPlan] = React.useState<string>()
  const [people, setPeople] = React.useState("2-4")
  const [name, setName] = React.useState("")
  const [run, setRun] = React.useState(0)

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs text-muted-foreground">
          {t.transition}
        </span>
        <OptionPicker
          aria-label={t.transition}
          options={TRANSITIONS.map((name) => ({ value: name, label: name }))}
          value={transition}
          onValueChange={(value) =>
            setTransition(value as StepWizardTransition)
          }
        />
      </div>
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <StepWizard
          key={run}
          transition={transition}
          labels={t.labels}
          onComplete={async () => {
            await wait(800)
            customToast.success(t.done)
            setPlan(undefined)
            setName("")
            setRun((r) => r + 1)
          }}
        >
          <StepWizardStep
            title={t.q1}
            description={t.q1d}
            headingAs="h3"
            validate={() => (plan ? true : t.q1Error)}
          >
            <OptionPicker
              aria-label={t.q1}
              variant="tiles"
              options={t.q1Options}
              value={plan}
              onValueChange={setPlan}
            />
          </StepWizardStep>
          <StepWizardStep title={t.q2} headingAs="h3">
            <OptionPicker
              aria-label={t.q2}
              variant="segment"
              options={t.q2Options}
              value={people}
              onValueChange={setPeople}
            />
          </StepWizardStep>
          <StepWizardStep
            title={t.q3}
            description={t.q3d}
            headingAs="h3"
            validate={async () => {
              await wait(700)
              return name.trim().length >= 2 ? true : t.q3Error
            }}
          >
            <Input
              aria-label={t.q3}
              value={name}
              placeholder={t.q3Placeholder}
              onChange={(e) => setName(e.target.value)}
            />
          </StepWizardStep>
          <StepWizardStep title={t.q4} description={t.q4d} headingAs="h3" />
        </StepWizard>
      </div>
    </div>
  )
}

function ChoiceStep({
  options,
  value,
  onPick,
}: {
  options: string[]
  value: string | undefined
  onPick: (value: string) => void
}) {
  const { next, back, isFirst, pending } = useStepWizard()
  const t = useT()
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            variant="ghost"
            key={option}
            type="button"
            disabled={pending}
            onClick={() => {
              onPick(option)
              void next()
            }}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
              value === option
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-accent",
            )}
          >
            {option}
          </Button>
        ))}
      </div>
      {!isFirst && (
        <Button
          variant="ghost"
          type="button"
          onClick={back}
          className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {t.back}
        </Button>
      )}
    </div>
  )
}

function Summary({
  color,
  size,
  onRestart,
}: {
  color?: string
  size?: string
  onRestart: () => void
}) {
  const t = useT()
  const { goTo } = useStepWizard()
  return (
    <div className="space-y-3">
      <p className="text-sm">
        {t.summary}: <strong>{color}</strong>, <strong>{size}</strong>
      </p>
      <Button
        variant="ghost"
        type="button"
        onClick={() => {
          onRestart()
          goTo(0)
        }}
        className="cursor-pointer rounded-md border px-3 py-1.5 text-sm hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        {t.restart}
      </Button>
    </div>
  )
}

export function StepWizardCustomControlsDemo() {
  const t = useT()
  const [color, setColor] = React.useState<string>()
  const [size, setSize] = React.useState<string>()
  return (
    <div className="w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <StepWizard showControls={false} transition="fade-rise">
        <StepWizardStep title={t.c1} headingAs="h3">
          <ChoiceStep options={t.colors} value={color} onPick={setColor} />
        </StepWizardStep>
        <StepWizardStep title={t.c2} headingAs="h3">
          <ChoiceStep options={t.sizes} value={size} onPick={setSize} />
        </StepWizardStep>
        <StepWizardStep title={t.summary} headingAs="h3">
          <Summary
            color={color}
            size={size}
            onRestart={() => {
              setColor(undefined)
              setSize(undefined)
            }}
          />
        </StepWizardStep>
      </StepWizard>
    </div>
  )
}

export function StepWizardAsyncDemo() {
  const t = useT()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  return (
    <div className="w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <StepWizard
        transition="scale-blur"
        labels={t.labels}
        onComplete={async () => {
          await wait(900)
          customToast.success(t.created)
        }}
      >
        <StepWizardStep
          title={t.emailTitle}
          description={t.emailDesc}
          headingAs="h3"
          validate={async () => {
            if (!/^\S+@\S+\.\S+$/.test(email)) return t.emailInvalid
            await wait(900)
            return email.toLowerCase() === "taken@example.com"
              ? t.emailTaken
              : true
          }}
        >
          <Input
            type="email"
            aria-label={t.emailTitle}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </StepWizardStep>
        <StepWizardStep
          title={t.passTitle}
          description={t.passDesc}
          headingAs="h3"
          validate={() => (password.length >= 8 ? true : t.passError)}
        >
          <Input
            type="password"
            aria-label={t.passTitle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </StepWizardStep>
      </StepWizard>
    </div>
  )
}
