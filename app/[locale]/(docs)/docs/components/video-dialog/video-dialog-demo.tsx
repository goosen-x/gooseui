"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { VideoDialog } from "@/registry/gooseui/ui/video-dialog"

const SRC = "/demo/video-dialog/waves.mp4"
const POSTER = "/demo/video-dialog/waves.webp"

const en = {
  title: "Ocean waves",
  labels: { play: "Play the video", close: "Close video" },
  heroTitle: "Listen to the sea",
  heroText:
    "Twelve seconds of surf with sound. Click the preview to open the player.",
  opened: "Video opened",
  closed: "Video closed",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Морской прибой",
    labels: { play: "Смотреть видео", close: "Закрыть видео" },
    heroTitle: "Послушайте море",
    heroText:
      "Двенадцать секунд прибоя со звуком. Нажмите на превью, чтобы открыть плеер.",
    opened: "Видео открыто",
    closed: "Видео закрыто",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function VideoDialogDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-xl px-4">
      <VideoDialog
        src={SRC}
        poster={POSTER}
        title={t.title}
        labels={t.labels}
      />
    </div>
  )
}

export function VideoDialogHeroDemo() {
  const t = useT()
  return (
    <div className="grid w-full max-w-3xl items-center gap-6 px-4 sm:grid-cols-2">
      <div className="space-y-2">
        <h3 className="font-semibold text-2xl tracking-tight">{t.heroTitle}</h3>
        <p className="text-muted-foreground">{t.heroText}</p>
      </div>
      <VideoDialog
        src={SRC}
        poster={POSTER}
        title={t.title}
        labels={t.labels}
        className="aspect-[4/3] rounded-2xl shadow-lg"
      />
    </div>
  )
}

export function VideoDialogEventsDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-xs px-4">
      <VideoDialog
        src={SRC}
        poster={POSTER}
        title={t.title}
        labels={t.labels}
        restartOnOpen
        onOpenChange={(open) => customToast.success(open ? t.opened : t.closed)}
      />
    </div>
  )
}
