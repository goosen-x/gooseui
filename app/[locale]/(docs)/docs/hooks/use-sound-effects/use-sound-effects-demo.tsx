"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import {
  type SoundPreset,
  useSoundEffects,
} from "@/registry/gooseui/hooks/use-sound-effects"
import { Button } from "@/registry/gooseui/ui/button"
import { Slider } from "@/registry/gooseui/ui/slider"

const en = {
  sounds: "Sounds",
  on: "On",
  off: "Off",
  volume: "Volume",
  custom: "custom",
  hint: "The switch is saved in localStorage and survives a reload.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    sounds: "Звуки",
    on: "Вкл",
    off: "Выкл",
    volume: "Громкость",
    custom: "свой",
    hint: "Переключатель хранится в localStorage и переживает перезагрузку.",
  },
}

const customSounds = {
  pop: [{ frequency: 400, slideTo: 1200, duration: 0.08, type: "sine" }],
  coin: [
    { frequency: 988, duration: 0.08, type: "square", gain: 0.3 },
    { frequency: 1319, duration: 0.3, delay: 0.07, type: "square", gain: 0.3 },
  ],
} satisfies Record<string, SoundPreset>

const NAMES = ["click", "success", "error", "complete", "pop", "coin"] as const

export function UseSoundEffectsDemo() {
  const t = content[useLocale() as Locale]
  const [volume, setVolume] = React.useState(0.5)
  const { play, enabled, toggle } = useSoundEffects({
    sounds: customSounds,
    volume,
    storageKey: "gooseui-docs-sounds",
  })

  return (
    <div className="w-full max-w-md space-y-5 px-4">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={toggle}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {enabled ? (
            <Volume2 className="size-4" aria-hidden="true" />
          ) : (
            <VolumeX
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          )}
          {t.sounds}: {enabled ? t.on : t.off}
        </Button>
        <div className="flex flex-1 items-center gap-2 text-sm">
          <span className="text-muted-foreground">{t.volume}</span>
          <Slider
            label={t.volume}
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onValueChange={setVolume}
            className="w-full cursor-pointer accent-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {NAMES.map((name) => (
          <Button
            variant="ghost"
            key={name}
            type="button"
            onClick={() => play(name)}
            disabled={!enabled}
            className={cn(
              "cursor-pointer rounded-md border bg-background px-3 py-2 font-mono text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {name}
            {(name === "pop" || name === "coin") && (
              <span className="ml-1 text-[10px] text-muted-foreground">
                {t.custom}
              </span>
            )}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{t.hint}</p>
    </div>
  )
}
