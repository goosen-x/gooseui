"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { Card } from "@/registry/gooseui/ui/card"
import { Label } from "@/registry/gooseui/ui/label"
import {
  Skeleton,
  SkeletonGroup,
  SkeletonReveal,
  SkeletonText,
} from "@/registry/gooseui/ui/skeleton"
import { Switch } from "@/registry/gooseui/ui/switch"

const en = {
  loading: "Loading",
  loadingLabel: "Loading profile…",
  name: "Anna Volkova",
  role: "Product designer, Lisbon",
  bio: "Designs interfaces for logistics tools. Collects keyboards and writes about empty states.",
  followers: "Followers",
  following: "Following",
  posts: "Posts",
  follow: "Follow",
  message: "Message",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    loading: "Загрузка",
    loadingLabel: "Загрузка профиля…",
    name: "Анна Волкова",
    role: "Продуктовый дизайнер, Лиссабон",
    bio: "Проектирует интерфейсы для логистических сервисов. Собирает клавиатуры и пишет про пустые состояния.",
    followers: "Подписчики",
    following: "Подписки",
    posts: "Посты",
    follow: "Подписаться",
    message: "Написать",
  },
}

const STATS = [
  { key: "followers", value: "12.4k" },
  { key: "following", value: "318" },
  { key: "posts", value: "86" },
] as const

/**
 * The skeleton and the real content share row heights, so the card keeps its
 * height. While loading, the whole body sits in ONE group, so a single shimmer
 * band crosses the avatar, the lines, the numbers and the buttons. The stats use
 * `<Skeleton loading>`: the numbers stay in layout but are invisible, so the
 * placeholder is exactly as wide as the real value.
 */
export function SkeletonSwapDemo() {
  const t = content[useLocale() as Locale]
  const [loading, setLoading] = React.useState(true)

  const body = (
    <>
      <div className="flex items-center gap-3">
        {loading ? (
          <Skeleton shape="circle" className="size-12" />
        ) : (
          <img
            src="/demo/skeleton/avatar.webp"
            alt={t.name}
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-full object-cover"
          />
        )}
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex h-5 items-center">
            {loading ? (
              <Skeleton shape="text" className="h-3.5 w-32" />
            ) : (
              <p className="text-sm leading-5 font-medium">{t.name}</p>
            )}
          </div>
          <div className="flex h-4 items-center">
            {loading ? (
              <Skeleton shape="text" className="h-3 w-44" />
            ) : (
              <p className="text-xs leading-4 text-muted-foreground">
                {t.role}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="h-10">
        {loading ? (
          <SkeletonText
            lines={2}
            lineClassName="h-3.5"
            className="h-10 justify-center gap-1.5"
          />
        ) : (
          <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
            {t.bio}
          </p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((stat) => (
          <div key={stat.key} className="space-y-1">
            <Skeleton
              loading={loading}
              className="w-fit rounded-sm text-lg leading-6 font-semibold"
            >
              {stat.value}
            </Skeleton>
            <p className="text-xs leading-4 text-muted-foreground">
              {t[stat.key]}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {loading ? (
          <>
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-24" />
          </>
        ) : (
          <>
            <Button size="sm">{t.follow}</Button>
            <Button size="sm" variant="outline">
              {t.message}
            </Button>
          </>
        )}
      </div>
    </>
  )

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center gap-3">
        <Switch
          id="skeleton-loading"
          checked={loading}
          onChange={(event) => setLoading(event.target.checked)}
        />
        <Label htmlFor="skeleton-loading" className="cursor-pointer">
          {t.loading}
        </Label>
      </div>
      <Card data-testid="skeleton-swap-card" className="gap-0 p-5">
        {loading ? (
          <SkeletonGroup label={t.loadingLabel} className="space-y-4">
            {body}
          </SkeletonGroup>
        ) : (
          <SkeletonReveal className="space-y-4">{body}</SkeletonReveal>
        )}
      </Card>
    </div>
  )
}
