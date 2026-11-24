"use client"

import { useLocale } from "next-intl"
import { useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Badge, BadgeRemove } from "@/registry/gooseui/ui/badge"
import { Button } from "@/registry/gooseui/ui/button"

const en = {
  removed: (tag: string) => `Filter removed: ${tag}`,
  remove: (tag: string) => `Remove ${tag}`,
  reset: "Reset filters",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    removed: (tag: string) => `Фильтр удалён: ${tag}`,
    remove: (tag: string) => `Удалить ${tag}`,
    reset: "Сбросить фильтры",
  },
}

const ALL = ["React", "TypeScript", "Tailwind", "Next.js"]

export function TagFilters() {
  const t = content[useLocale() as Locale]
  const [tags, setTags] = useState(ALL)
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" size="lg">
          {tag}
          <BadgeRemove
            aria-label={t.remove(tag)}
            onClick={() => {
              setTags((prev) => prev.filter((x) => x !== tag))
              customToast.success(t.removed(tag))
            }}
          />
        </Badge>
      ))}
      {tags.length < ALL.length && (
        <Button variant="ghost" size="sm" onClick={() => setTags(ALL)}>
          {t.reset}
        </Button>
      )}
    </div>
  )
}
