"use client"

import { Expand } from "lucide-react"
import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import {
  ImageViewer,
  ImageViewerDialog,
  type ImageViewerLabels,
} from "@/registry/gooseui/ui/image-viewer"

const en = {
  mapAlt: "Aerial view of a city street at sunset between tall skyscrapers",
  posterAlt: "Snowy mountains under a starry night sky with the Milky Way",
  open: "Open photo",
  labels: undefined as Partial<ImageViewerLabels> | undefined,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    mapAlt: "Вид сверху на городскую улицу на закате между высотными домами",
    posterAlt: "Заснеженные горы под звёздным небом с Млечным Путём",
    open: "Открыть фото",
    labels: {
      viewer: "Просмотр изображения",
      instructions:
        "Плюс и минус меняют масштаб, стрелки двигают картинку, R поворачивает, 0 вписывает в окно.",
      zoomIn: "Увеличить",
      zoomOut: "Уменьшить",
      zoomLevel: "Масштаб",
      rotate: "Повернуть на 90 градусов",
      fit: "Вписать",
      reset: "Сбросить",
      close: "Закрыть",
      error: "Не удалось загрузить изображение",
    },
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function ImageViewerDemo() {
  const t = useT()
  return (
    <ImageViewer
      src="/demo/image-viewer/city-aerial.webp"
      alt={t.mapAlt}
      labels={t.labels}
      className="h-[420px] max-w-3xl"
    />
  )
}

export function ImageViewerDialogDemo() {
  const t = useT()
  return (
    <ImageViewerDialog
      src="/demo/image-viewer/starry-mountains.webp"
      alt={t.posterAlt}
      labels={t.labels}
    >
      <Button
        variant="ghost"
        type="button"
        className="group flex h-auto cursor-pointer flex-col items-stretch gap-0 overflow-hidden rounded-xl border bg-card p-0 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <img
          src="/demo/image-viewer/starry-mountains.webp"
          alt={t.posterAlt}
          className="block h-56 w-auto rounded-none"
        />
        <span className="flex items-center justify-center gap-2 border-t bg-background py-2 text-sm font-medium transition-colors group-hover:bg-muted">
          <Expand className="size-4" />
          {t.open}
        </span>
      </Button>
    </ImageViewerDialog>
  )
}

export function ImageViewerLimitsDemo() {
  const t = useT()
  return (
    <ImageViewer
      src="/demo/image-viewer/city-aerial.webp"
      alt={t.mapAlt}
      labels={t.labels}
      minZoom={1}
      maxZoom={3}
      zoomStep={0.5}
      className="h-72 max-w-xl"
    />
  )
}

export function ImageViewerBareDemo() {
  const t = useT()
  return (
    <ImageViewer
      src="/demo/image-viewer/starry-mountains.webp"
      alt={t.posterAlt}
      labels={t.labels}
      showControls={false}
      className="h-72 max-w-xs"
    />
  )
}
