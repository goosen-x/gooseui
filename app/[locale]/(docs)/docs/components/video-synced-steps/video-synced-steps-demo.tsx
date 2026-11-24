"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { VideoSyncedSteps } from "@/registry/gooseui/ui/video-synced-steps"

const STARTS = [0, 4.3, 8.4, 12.5]

function useMedia() {
  return {
    src: "/demo/video-synced-steps/travel.mp4",
    poster: "/demo/video-synced-steps/travel.webp",
  }
}

const en = {
  steps: [
    ["Pack your backpack", "Check the gear and zip everything up."],
    ["On the road", "Mountains and meadows pass by the window."],
    ["Climb the trail", "Steady steps along the rocky ridge."],
    ["Sunset on the summit", "Golden light over the snowy peaks."],
  ],
  labels: { play: "Play video", pause: "Pause video", steps: "Steps" },
  current: "Current step",
  paused: "Starts paused. Press play or pick a step.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    steps: [
      ["Соберите рюкзак", "Проверьте снаряжение и застегните всё."],
      ["В дорогу", "За окном проплывают горы и луга."],
      ["Подъём по тропе", "Ровный шаг по каменистому гребню."],
      ["Закат на вершине", "Золотой свет над заснеженными пиками."],
    ],
    labels: {
      play: "Включить видео",
      pause: "Поставить на паузу",
      steps: "Шаги",
    },
    current: "Текущий шаг",
    paused: "Стартует на паузе. Нажмите play или выберите шаг.",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

function useSteps(withDescription = true) {
  const t = useT()
  return React.useMemo(
    () =>
      t.steps.map(([title, description], index) => ({
        title,
        description: withDescription ? description : undefined,
        start: STARTS[index],
      })),
    [t, withDescription],
  )
}

export function VideoSyncedStepsDemo() {
  const t = useT()
  const { src, poster } = useMedia()
  const steps = useSteps()
  return (
    <div className="w-full max-w-3xl px-4">
      <VideoSyncedSteps
        src={src}
        poster={poster}
        steps={steps}
        labels={t.labels}
      />
    </div>
  )
}

export function VideoSyncedStepsStackDemo() {
  const t = useT()
  const { src, poster } = useMedia()
  const steps = useSteps(false)
  return (
    <div className="w-full max-w-sm px-4">
      <VideoSyncedSteps
        src={src}
        poster={poster}
        steps={steps}
        layout="stack"
        labels={t.labels}
      />
    </div>
  )
}

export function VideoSyncedStepsControlledDemo() {
  const t = useT()
  const { src, poster } = useMedia()
  const steps = useSteps(false)
  const [index, setIndex] = React.useState(0)
  return (
    <div className="w-full max-w-3xl space-y-3 px-4">
      <p className="text-muted-foreground text-sm">{t.paused}</p>
      <VideoSyncedSteps
        src={src}
        poster={poster}
        steps={steps}
        autoPlay={false}
        onStepChange={setIndex}
        labels={t.labels}
      />
      <p className="text-sm" aria-live="polite">
        {t.current}: <span className="font-medium">{index + 1}</span>
      </p>
    </div>
  )
}
