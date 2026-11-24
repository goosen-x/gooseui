"use client"

import { AtSign, Eye, EyeOff, Search } from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"
import { Button } from "@/registry/gooseui/ui/button"
import {
  FloatingLabelInput,
  FloatingLabelTextarea,
} from "@/registry/gooseui/ui/floating-label-input"

const text = {
  en: {
    name: "Full name",
    email: "Email",
    emailHint: "We only use it for receipts",
    emailError: "Enter an email like name@example.com",
    message: "Message",
    messageHint: "A few lines are enough",
    outline: "Outline",
    inset: "Inset",
    city: "City",
    budget: "Budget",
    search: "Search the docs",
    password: "Password",
    show: "Show password",
    hide: "Hide password",
    username: "Username",
    usernameHint: "Letters, digits and dots",
    usernameError: "This username is taken",
    weight: "Weight",
  },
  ru: {
    name: "Имя и фамилия",
    email: "Почта",
    emailHint: "Пришлём на неё только чеки",
    emailError: "Нужен адрес вида name@example.com",
    message: "Сообщение",
    messageHint: "Хватит пары строк",
    outline: "Outline",
    inset: "Inset",
    city: "Город",
    budget: "Бюджет",
    search: "Поиск по документации",
    password: "Пароль",
    show: "Показать пароль",
    hide: "Скрыть пароль",
    username: "Имя пользователя",
    usernameHint: "Буквы, цифры и точки",
    usernameError: "Это имя уже занято",
    weight: "Вес",
  },
}

function useText() {
  return useLocale() === "ru" ? text.ru : text.en
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function FloatingLabelInputDemo() {
  const t = useText()
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  const invalid = touched && email !== "" && !emailPattern.test(email)
  return (
    <form
      className="grid w-full max-w-md gap-4 px-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <FloatingLabelInput label={t.name} name="name" autoComplete="name" />
      <FloatingLabelInput
        label={t.email}
        name="email"
        type="email"
        autoComplete="email"
        placeholder="name@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={() => setTouched(true)}
        hint={t.emailHint}
        error={invalid ? t.emailError : undefined}
      />
      <FloatingLabelTextarea label={t.message} hint={t.messageHint} rows={3} />
    </form>
  )
}

export function FloatingLabelVariantsDemo() {
  const t = useText()
  return (
    <div className="grid w-full max-w-xl gap-4 px-4 sm:grid-cols-2">
      <FloatingLabelInput label={`${t.city} (${t.outline})`} defaultValue="" />
      <FloatingLabelInput
        variant="inset"
        label={`${t.city} (${t.inset})`}
        defaultValue=""
      />
    </div>
  )
}

export function FloatingLabelSlotsDemo() {
  const t = useText()
  const [visible, setVisible] = useState(false)
  return (
    <div className="grid w-full max-w-md gap-4 px-4">
      <FloatingLabelInput
        label={t.search}
        type="search"
        prefix={<Search aria-hidden="true" />}
      />
      <FloatingLabelInput
        label={t.budget}
        inputMode="decimal"
        prefix="$"
        suffix="USD"
      />
      <FloatingLabelInput
        label={t.password}
        type={visible ? "text" : "password"}
        autoComplete="new-password"
        suffix={
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? t.hide : t.show}
            aria-pressed={visible}
            className="-mr-1 flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {visible ? <EyeOff /> : <Eye />}
          </Button>
        }
      />
    </div>
  )
}

export function FloatingLabelValidationDemo() {
  const t = useText()
  const [username, setUsername] = useState("goose")
  const taken = username.trim().toLowerCase() === "goose"
  return (
    <div className="grid w-full max-w-md gap-4 px-4">
      <FloatingLabelInput
        variant="inset"
        label={t.username}
        prefix={<AtSign aria-hidden="true" />}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        hint={t.usernameHint}
        error={taken ? t.usernameError : undefined}
      />
      <FloatingLabelInput
        label={t.weight}
        suffix="kg"
        disabled
        defaultValue="72"
      />
    </div>
  )
}
