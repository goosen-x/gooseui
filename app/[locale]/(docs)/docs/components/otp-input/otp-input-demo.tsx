"use client"

import { useLocale } from "next-intl"
import { type ComponentRef, useEffect, useRef, useState } from "react"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/gooseui/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/gooseui/ui/otp-input"

const CODE = "1234"

const copy = {
  en: {
    title: "Enter verification code",
    description: "Enter the code sent to your phone.",
    label: "Verification code",
    hint: "Hint: 1234",
    again: "Once more",
    success: "Code confirmed",
    wrong: "Wrong code",
    retry: "Try again",
    expires: "Code valid for 5:00",
  },
  ru: {
    title: "Введите код подтверждения",
    description: "Введите код, отправленный на ваш телефон.",
    label: "Код подтверждения",
    hint: "Подсказка: 1234",
    again: "Ещё раз",
    success: "Код подтверждён",
    wrong: "Неверный код",
    retry: "Попробуйте ещё раз",
    expires: "Код действителен 5:00",
  },
}

function Slots({
  start = 0,
  count,
  invalid = false,
}: {
  start?: number
  count: number
  invalid?: boolean
}) {
  return (
    <InputOTPGroup>
      {Array.from({ length: count }, (_, i) => (
        <InputOTPSlot
          key={start + i}
          index={start + i}
          aria-invalid={invalid || undefined}
        />
      ))}
    </InputOTPGroup>
  )
}

export function OtpInputDemo() {
  const t = useLocale() === "ru" ? copy.ru : copy.en
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle")
  const inputRef = useRef<ComponentRef<typeof InputOTP>>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    for (const id of timers.current) clearTimeout(id)
    timers.current = []
  }
  useEffect(() => clearTimers, [])

  const verify = (value: string) => {
    setStatus("pending")
    timers.current.push(
      setTimeout(() => {
        if (value === CODE) {
          setStatus("success")
          customToast.success(t.success)
          return
        }
        setStatus("error")
        customToast.error(t.wrong, { description: t.retry })
        timers.current.push(
          setTimeout(() => {
            setCode("")
            setStatus("idle")
            inputRef.current?.focus()
          }, 900),
        )
      }, 600),
    )
  }

  const reset = () => {
    clearTimers()
    setCode("")
    setStatus("idle")
    inputRef.current?.focus()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl md:text-2xl">{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-4 md:px-6">
        <div className="flex flex-col items-center gap-4">
          <InputOTP
            ref={inputRef}
            maxLength={4}
            value={code}
            onChange={(value) => {
              if (status === "error" || status === "success") {
                clearTimers()
                setStatus("idle")
              }
              setCode(value)
            }}
            onComplete={verify}
            status={status}
            autoComplete="one-time-code"
            aria-label={t.label}
            aria-describedby="otp-demo-message"
          >
            <Slots count={4} />
          </InputOTP>
          <div className="text-lg text-muted-foreground">{t.expires}</div>
          <p
            id="otp-demo-message"
            aria-live="polite"
            className="text-center text-sm text-muted-foreground"
          >
            {t.hint}
          </p>
          {status === "success" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="cursor-pointer"
            >
              {t.again}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function OtpExample({
  variant,
}: {
  variant: "basic" | "grouped" | "digits" | "error" | "disabled"
}) {
  const locale = useLocale()
  const label = locale === "ru" ? "Одноразовый код" : "One-time code"
  const invalid = variant === "error"
  return (
    <InputOTP
      maxLength={6}
      pattern={variant === "digits" ? "^[0-9]+$" : undefined}
      defaultValue={invalid ? "123456" : undefined}
      disabled={variant === "disabled"}
      aria-label={label}
      aria-invalid={invalid || undefined}
    >
      {variant === "grouped" ? (
        <>
          <Slots count={3} />
          <InputOTPSeparator />
          <Slots start={3} count={3} />
        </>
      ) : (
        <Slots count={6} invalid={invalid} />
      )}
    </InputOTP>
  )
}
