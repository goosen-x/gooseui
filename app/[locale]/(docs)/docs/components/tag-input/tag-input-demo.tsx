"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { Label } from "@/registry/gooseui/ui/label"
import { TagInput, type TagInputLabels } from "@/registry/gooseui/ui/tag-input"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Tailwind CSS",
  "Figma",
  "Docker",
  "Kubernetes",
  "Rust",
  "Go",
  "Python",
  "Accessibility",
  "Testing Library",
  "Playwright",
]

const en = {
  skills: "Skills",
  skillsPlaceholder: "Add a skill",
  skillsHint:
    "Type to filter, or press ArrowDown to see all. Enter picks the highlighted option.",
  to: "To",
  invalidEmail: (tag: string) => `“${tag}” is not a valid email address`,
  recipients: (n: number) => `${n} recipient${n === 1 ? "" : "s"}.`,
  pasteHint: "Try pasting “dev@acme.com; ops@acme.com, not-an-email”.",
  topics: "Article topics",
  topicsPlaceholder: "Add a topic",
  save: "Save topics",
  labelsField: "Labels",
  labels: undefined as Partial<TagInputLabels> | undefined,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    skills: "Навыки",
    skillsPlaceholder: "Добавьте навык",
    skillsHint:
      "Начните печатать, чтобы отфильтровать список, или нажмите ↓, чтобы увидеть его целиком. Enter выбирает подсвеченный вариант.",
    to: "Кому",
    invalidEmail: (tag) => `«${tag}» не похоже на адрес почты`,
    recipients: (n) => {
      const mod10 = n % 10
      const mod100 = n % 100
      const word =
        mod10 === 1 && mod100 !== 11
          ? "получатель"
          : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
            ? "получателя"
            : "получателей"
      return `${n} ${word}.`
    },
    pasteHint: "Вставьте «dev@acme.com; ops@acme.com, not-an-email».",
    topics: "Темы статьи",
    topicsPlaceholder: "Добавьте тему",
    save: "Сохранить темы",
    labelsField: "Метки",
    labels: {
      max: (max) => `Можно добавить не больше ${max} тегов`,
      duplicate: (tag) => `«${tag}» уже есть`,
      added: (tags) => `Добавлено: ${tags.join(", ")}`,
      removed: (tag) => `Удалено: ${tag}`,
      remove: (tag) => `Удалить ${tag}`,
      suggestions: "Подсказки",
    },
  },
}

function useContent() {
  return content[useLocale() as Locale]
}

/** Skills with suggestions: the preview at the top of the page. */
export function TagInputDemo() {
  const t = useContent()
  return (
    <div className="w-full max-w-md space-y-2 px-4">
      <Label htmlFor="tag-input-skills">{t.skills}</Label>
      <TagInput
        id="tag-input-skills"
        defaultValue={["React", "TypeScript"]}
        suggestions={SKILLS}
        placeholder={t.skillsPlaceholder}
        labels={t.labels}
      />
      <p className="text-muted-foreground text-xs">{t.skillsHint}</p>
    </div>
  )
}

export function TagInputEmailDemo() {
  const t = useContent()
  const [recipients, setRecipients] = React.useState([
    "maria.lopez@northwind.io",
  ])
  return (
    <div className="w-full max-w-md space-y-2 px-4">
      <Label htmlFor="tag-input-recipients">{t.to}</Label>
      <TagInput
        id="tag-input-recipients"
        value={recipients}
        onValueChange={setRecipients}
        placeholder="name@company.com"
        validate={(tag) => (EMAIL.test(tag) ? true : t.invalidEmail(tag))}
        labels={t.labels}
      />
      <p className="text-muted-foreground text-xs">
        {t.recipients(recipients.length)} {t.pasteHint}
      </p>
    </div>
  )
}

export function TagInputFormDemo() {
  const t = useContent()
  const [submitted, setSubmitted] = React.useState<string[] | null>(null)
  return (
    <form
      className="w-full max-w-md space-y-3 px-4"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSubmitted(data.getAll("topics").map(String))
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="tag-input-topics">{t.topics}</Label>
        <TagInput
          id="tag-input-topics"
          name="topics"
          maxTags={5}
          defaultValue={["css", "web platform"]}
          placeholder={t.topicsPlaceholder}
          labels={t.labels}
        />
      </div>
      <Button type="submit" size="sm">
        {t.save}
      </Button>
      {submitted && (
        <pre className="bg-muted rounded-md p-3 text-xs">
          {`FormData topics: ${JSON.stringify(submitted)}`}
        </pre>
      )}
    </form>
  )
}

export function TagInputDisabledDemo() {
  const t = useContent()
  return (
    <div className="w-full max-w-md px-4">
      <TagInput
        aria-label={t.labelsField}
        defaultValue={["billing", "priority: high"]}
        disabled
        labels={t.labels}
      />
    </div>
  )
}
