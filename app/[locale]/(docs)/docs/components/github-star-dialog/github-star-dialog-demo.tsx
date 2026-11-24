"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { GitHubStarDialog } from "@/registry/gooseui/ui/github-star-dialog"

const en = {
  helpUsReach1000Stars: "Help us reach 1000 stars",
  ifGooseuiIsUsefulTo:
    "If GooseUI is useful to you, star it: more developers will discover the library.",
  maybeLater: "Maybe later",
  starOnGithub: "Star on GitHub",
  openDialog: "Open dialog",
  weHit500Stars: "We hit 500 stars!",
  thankYouEveryStarHelps:
    "Thank you. Every star helps more developers discover the library.",
  thankYou: "Thank you ✦",
  goalReached: "Goal reached",
  helpUsReach100Stars: "Help us reach 100 stars",
  liveStarCounter: "Live star counter",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    helpUsReach1000Stars: "Помогите нам набрать 1000 звёзд",
    ifGooseuiIsUsefulTo:
      "Если GooseUI вам полезен, поставьте звезду: так о библиотеке узнает больше разработчиков.",
    maybeLater: "Может, позже",
    starOnGithub: "Поставить звезду на GitHub",
    openDialog: "Открыть диалог",
    weHit500Stars: "Нас 500 звёзд!",
    thankYouEveryStarHelps:
      "Спасибо. Каждая звезда помогает большему числу разработчиков найти библиотеку.",
    thankYou: "Спасибо ✦",
    goalReached: "Цель достигнута",
    helpUsReach100Stars: "Помогите нам набрать 100 звёзд",
    liveStarCounter: "Живой счётчик звёзд",
  },
}

const triggerClass =
  "cursor-pointer rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"

export function GitHubStarDialogDemo() {
  const t = content[useLocale() as Locale]

  return (
    <GitHubStarDialog
      owner="goosen-x"
      repo="gooseui"
      goal={1000}
      initialStars={822}
      title={t.helpUsReach1000Stars}
      description={t.ifGooseuiIsUsefulTo}
      dismissText={t.maybeLater}
      ctaText={t.starOnGithub}
      trigger={
        <Button variant="ghost" type="button" className={triggerClass}>
          {t.openDialog}
        </Button>
      }
    />
  )
}

export function GitHubStarDialogGoalReachedDemo() {
  const t = content[useLocale() as Locale]

  return (
    <GitHubStarDialog
      owner="goosen-x"
      repo="gooseui"
      goal={500}
      initialStars={512}
      title={t.weHit500Stars}
      description={t.thankYouEveryStarHelps}
      badge={t.thankYou}
      dismissText={t.maybeLater}
      ctaText={t.starOnGithub}
      trigger={
        <Button variant="ghost" type="button" className={triggerClass}>
          {t.goalReached}
        </Button>
      }
    />
  )
}

export function GitHubStarDialogLiveDemo() {
  const t = content[useLocale() as Locale]

  return (
    <GitHubStarDialog
      owner="goosen-x"
      repo="gooseui"
      goal={100}
      title={t.helpUsReach100Stars}
      description={t.ifGooseuiIsUsefulTo}
      dismissText={t.maybeLater}
      ctaText={t.starOnGithub}
      trigger={
        <Button variant="ghost" type="button" className={triggerClass}>
          {t.liveStarCounter}
        </Button>
      }
    />
  )
}
