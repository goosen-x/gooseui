"use client"

import { useLocale } from "next-intl"
import { useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  Avatar,
  AvatarGroup,
  type AvatarStatus,
} from "@/registry/gooseui/ui/avatar-group"

export type DemoPerson = {
  name: string
  src?: string
  status?: AvatarStatus
}

const en = {
  squad: "Platform squad",
  members: (n: number) => `${n} members`,
  selected: "selected",
  groupLabel: "Platform squad members",
  more: (n: number, names: string[]) => `${n} more: ${names.join(", ")}`,
  hint: "Every avatar is a button here, +N shows the rest.",
  collapse: "Collapse",
  status: { online: "online", away: "away", busy: "busy" },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    squad: "Команда платформы",
    members: (n: number) => `${n} человек`,
    selected: "выбран",
    groupLabel: "Участники команды платформы",
    more: (n: number, names: string[]) => `Ещё ${n}: ${names.join(", ")}`,
    hint: "Здесь каждый аватар кнопка, а +N показывает остальных.",
    collapse: "Свернуть",
    status: { online: "в сети", away: "отошёл", busy: "занят" },
  },
}

/** Clickable avatars and an expanding +N: callbacks need a client component */
export function AvatarGroupClickDemo({ team }: { team: DemoPerson[] }) {
  const t = content[useLocale() as Locale]
  const [selected, setSelected] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="w-full max-w-xl space-y-3 px-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-background p-4">
        <div>
          <p className="font-medium">{t.squad}</p>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {t.members(team.length)}
            {selected ? ` · ${t.selected}: ${selected}` : ""}
          </p>
        </div>
        <AvatarGroup
          max={showAll ? undefined : 5}
          aria-label={t.groupLabel}
          overflowLabel={t.more}
          onAvatarClick={({ name }) => setSelected(name ?? null)}
          onOverflowClick={() => setShowAll(true)}
        >
          {team.map((person) => (
            <Avatar key={person.name} {...person} statusLabels={t.status} />
          ))}
        </AvatarGroup>
      </div>
      <p className="text-sm text-muted-foreground">
        {t.hint}{" "}
        {showAll && (
          <button
            type="button"
            className="underline underline-offset-4"
            onClick={() => setShowAll(false)}
          >
            {t.collapse}
          </button>
        )}
      </p>
    </div>
  )
}
