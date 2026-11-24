"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"

const en = {
  primaryButtonClicked: "Primary button clicked",
  secondaryButtonClicked: "Secondary button clicked",
  destructiveButtonClicked: "Destructive button clicked",
  outlineButtonClicked: "Outline button clicked",
  ghostButtonClicked: "Ghost button clicked",
  linkButtonClicked: "Link button clicked",
  labelButtonClicked: (label: string | number) => `${label} button clicked`,
  smallButtonClicked: "Small button clicked",
  defaultButtonClicked: "Default button clicked",
  largeButtonClicked: "Large button clicked",
  iconButtonClicked: "Icon button clicked",
  regularButton: "Regular button",
  regular: "Regular",
  squircleButton: "Squircle button",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    primaryButtonClicked: "Нажата кнопка Primary",
    secondaryButtonClicked: "Нажата кнопка Secondary",
    destructiveButtonClicked: "Нажата кнопка Destructive",
    outlineButtonClicked: "Нажата кнопка Outline",
    ghostButtonClicked: "Нажата кнопка Ghost",
    linkButtonClicked: "Нажата кнопка Link",
    labelButtonClicked: (label: string | number) => `Нажата кнопка ${label}`,
    smallButtonClicked: "Нажата кнопка Small",
    defaultButtonClicked: "Нажата кнопка Default",
    largeButtonClicked: "Нажата кнопка Large",
    iconButtonClicked: "Нажата кнопка Icon",
    regularButton: "Обычная кнопка",
    regular: "Обычная",
    squircleButton: "Кнопка squircle",
  },
}

export function ButtonPreview() {
  const t = content[useLocale() as Locale]

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg bg-muted/30 px-4 py-12">
      <Button onClick={() => customToast.success(t.primaryButtonClicked)}>
        Primary
      </Button>
      <Button
        variant="secondary"
        onClick={() => customToast.info(t.secondaryButtonClicked)}
      >
        Secondary
      </Button>
      <Button
        variant="destructive"
        onClick={() => customToast.error(t.destructiveButtonClicked)}
      >
        Destructive
      </Button>
      <Button
        variant="outline"
        onClick={() => customToast.info(t.outlineButtonClicked)}
      >
        Outline
      </Button>
      <Button
        variant="ghost"
        onClick={() => customToast.info(t.ghostButtonClicked)}
      >
        Ghost
      </Button>
      <Button
        variant="link"
        onClick={() => customToast.info(t.linkButtonClicked)}
      >
        Link
      </Button>
    </div>
  )
}

export function ButtonVariantDemo({
  variant,
  label,
}: {
  variant?: "secondary" | "destructive" | "outline" | "ghost" | "link"
  label: string
}) {
  const t = content[useLocale() as Locale]

  const getToast = () => {
    switch (variant) {
      case "destructive":
        return customToast.error(t.labelButtonClicked(label))
      case "secondary":
      case "outline":
      case "ghost":
      case "link":
        return customToast.info(t.labelButtonClicked(label))
      default:
        return customToast.success(t.labelButtonClicked(label))
    }
  }

  return (
    <div className="flex items-center justify-center gap-4 rounded-lg bg-muted/30 px-4 py-8">
      <Button variant={variant} onClick={getToast}>
        {label}
      </Button>
    </div>
  )
}

export function ButtonSizesDemo() {
  const t = content[useLocale() as Locale]

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg bg-muted/30 px-4 py-8">
      <Button size="sm" onClick={() => customToast.info(t.smallButtonClicked)}>
        Small
      </Button>
      <Button
        size="default"
        onClick={() => customToast.info(t.defaultButtonClicked)}
      >
        Default
      </Button>
      <Button size="lg" onClick={() => customToast.info(t.largeButtonClicked)}>
        Large
      </Button>
      <Button size="icon" onClick={() => customToast.info(t.iconButtonClicked)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Button>
    </div>
  )
}

export function ButtonSquircleDemo() {
  const t = content[useLocale() as Locale]

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg bg-muted/30 px-4 py-8">
      <div className="flex flex-col items-center gap-2">
        <Button onClick={() => customToast.info(t.regularButton)}>
          {t.regular}
        </Button>
        <span className="text-xs text-muted-foreground">border-radius</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button squircle onClick={() => customToast.success(t.squircleButton)}>
          Squircle
        </Button>
        <span className="text-xs text-muted-foreground">corner-shape</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button
          squircle
          variant="secondary"
          onClick={() => customToast.info("Secondary squircle")}
        >
          Secondary
        </Button>
        <span className="text-xs text-muted-foreground">squircle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button
          squircle
          variant="outline"
          onClick={() => customToast.info("Outline squircle")}
        >
          Outline
        </Button>
        <span className="text-xs text-muted-foreground">squircle</span>
      </div>
    </div>
  )
}
