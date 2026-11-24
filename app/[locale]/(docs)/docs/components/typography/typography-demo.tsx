"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import { Typography } from "@/registry/gooseui/ui/typography"

const en = {
  designQuote:
    '"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs',
  heading1: "Heading 1",
  heading2: "Heading 2",
  heading3: "Heading 3",
  heading4: "Heading 4",
  thisIsAParagraph:
    "This is a paragraph with default styling. It has proper line height for readability.",
  thisIsALead: "This is a lead paragraph, typically used for introductions.",
  thisIsMutedText: "This is muted text for secondary information.",
  buildWith: "Build with",
  textEffect: "text effect",
  thisTextHasA: "This text has a",
  highlighted: "highlighted",
  word: "word.",
  youCanHighlight: "You can highlight",
  importantInformation: "important information",
  inYourContent: "in your content.",
  use: "Use",
  toInstall: "to install.",
  the: "The",
  componentSupportsMultipleVariants: "component supports multiple variants.",
  clickAnyVariantTo: "Click any variant to see this notification",
  clickAButtonTo: "Click a button to see a toast notification",
  thisLooksLikeH1: "This looks like H1 but renders as a paragraph",
  thisLooksLikeA: "This looks like a paragraph but renders as a span",
  withMarginDefault: "With margin (default)",
  firstParagraphWithTop: "First paragraph with top margin.",
  secondParagraphWithTop: "Second paragraph with top margin.",
  withoutMargin: "Without margin",
  firstParagraphWithoutMargin: "First paragraph without margin.",
  secondParagraphWithoutMargin: "Second paragraph without margin.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    designQuote:
      "«Дизайн — это не только то, как вещь выглядит и ощущается. Дизайн — это то, как она работает.» — Стив Джобс",
    heading1: "Заголовок 1",
    heading2: "Заголовок 2",
    heading3: "Заголовок 3",
    heading4: "Заголовок 4",
    thisIsAParagraph:
      "Это абзац со стилями по умолчанию. Межстрочный интервал подобран для удобного чтения.",
    thisIsALead: "Это вводный абзац, его обычно ставят в начале текста.",
    thisIsMutedText: "Это приглушённый текст для второстепенной информации.",
    buildWith: "Создавайте с",
    textEffect: "текст",
    thisTextHasA: "В этом тексте есть",
    highlighted: "выделенное",
    word: "слово.",
    youCanHighlight: "Можно выделить",
    importantInformation: "важную информацию",
    inYourContent: "в своём контенте.",
    use: "Выполните",
    toInstall: "в терминале.",
    the: "Компонент",
    componentSupportsMultipleVariants: "поддерживает несколько вариантов.",
    clickAnyVariantTo:
      "Нажмите на любой вариант, чтобы увидеть это уведомление",
    clickAButtonTo: "Нажмите на кнопку, чтобы увидеть тост-уведомление",
    thisLooksLikeH1: "Выглядит как H1, а рендерится как абзац",
    thisLooksLikeA: "Выглядит как абзац, а рендерится как span",
    withMarginDefault: "С отступом (по умолчанию)",
    firstParagraphWithTop: "Первый абзац с отступом сверху.",
    secondParagraphWithTop: "Второй абзац с отступом сверху.",
    withoutMargin: "Без отступа",
    firstParagraphWithoutMargin: "Первый абзац без отступа.",
    secondParagraphWithoutMargin: "Второй абзац без отступа.",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function TypographyDemo() {
  const t = useT()
  return (
    <div className="space-y-6">
      <Typography variant="h1">{t.heading1}</Typography>
      <Typography variant="h2">{t.heading2}</Typography>
      <Typography variant="h3">{t.heading3}</Typography>
      <Typography variant="h4">{t.heading4}</Typography>
      <Typography variant="p">{t.thisIsAParagraph}</Typography>
      <Typography variant="lead">{t.thisIsALead}</Typography>
      <Typography variant="muted">{t.thisIsMutedText}</Typography>
    </div>
  )
}

export function TypographyHighlightDemo() {
  const t = useT()
  return (
    <div className="space-y-4">
      <Typography variant="p">
        {t.thisTextHasA}{" "}
        <Typography variant="highlight" as="span">
          {t.highlighted}
        </Typography>{" "}
        {t.word}
      </Typography>
      <Typography variant="p">
        {t.youCanHighlight}{" "}
        <Typography variant="highlight" as="span">
          {t.importantInformation}
        </Typography>{" "}
        {t.inYourContent}
      </Typography>
    </div>
  )
}

export function TypographyCodeDemo() {
  const t = useT()
  return (
    <div className="space-y-4">
      <Typography variant="p">
        {t.use}{" "}
        <Typography variant="code" as="code">
          npm install gooseui
        </Typography>{" "}
        {t.toInstall}
      </Typography>
      <Typography variant="p">
        {t.the}{" "}
        <Typography variant="code" as="code">
          Typography
        </Typography>{" "}
        {t.componentSupportsMultipleVariants}
      </Typography>
    </div>
  )
}

export function TypographyBlockquoteDemo() {
  const t = useT()
  return <Typography variant="blockquote">{t.designQuote}</Typography>
}

export function TypographyInteractiveDemo() {
  const t = useT()
  const handleClick = (variant: string) => {
    customToast.success(`Вариант Typography: ${variant}`, {
      description: t.clickAnyVariantTo,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => handleClick("h1")} variant="outline" size="sm">
          H1
        </Button>
        <Button onClick={() => handleClick("h2")} variant="outline" size="sm">
          H2
        </Button>
        <Button
          onClick={() => handleClick("highlight")}
          variant="outline"
          size="sm"
        >
          Highlight
        </Button>
        <Button onClick={() => handleClick("code")} variant="outline" size="sm">
          Code
        </Button>
      </div>
      <Typography variant="muted">{t.clickAButtonTo}</Typography>
    </div>
  )
}

export function TypographyAsDemo() {
  const t = useT()
  return (
    <div className="space-y-4">
      <Typography variant="h1" as="p">
        {t.thisLooksLikeH1}
      </Typography>
      <Typography variant="p" as="span">
        {t.thisLooksLikeA}
      </Typography>
    </div>
  )
}

export function TypographyAffectsDemo() {
  const t = useT()
  return (
    <div className="space-y-4">
      <div>
        <Typography variant="h3">{t.withMarginDefault}</Typography>
        <Typography variant="p" affects="withPMargin">
          {t.firstParagraphWithTop}
        </Typography>
        <Typography variant="p" affects="withPMargin">
          {t.secondParagraphWithTop}
        </Typography>
      </div>
      <div className="pt-4 border-t">
        <Typography variant="h3">{t.withoutMargin}</Typography>
        <Typography variant="p" affects="removePMargin">
          {t.firstParagraphWithoutMargin}
        </Typography>
        <Typography variant="p" affects="removePMargin">
          {t.secondParagraphWithoutMargin}
        </Typography>
      </div>
    </div>
  )
}
