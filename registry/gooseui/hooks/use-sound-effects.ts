"use client"

import { useCallback, useEffect, useSyncExternalStore } from "react"

export type SoundNote = {
  /** Start pitch in Hz. */
  frequency: number
  /** Length in seconds. */
  duration: number
  /** Offset from the start of the sound, in seconds. */
  delay?: number
  /** Pitch to glide to by the end of the note. */
  slideTo?: number
  type?: OscillatorType
  /** Relative loudness from 0 to 1. */
  gain?: number
}

export type SoundPreset = readonly SoundNote[]

export const defaultSounds = {
  click: [{ frequency: 1800, duration: 0.03, type: "triangle", gain: 0.6 }],
  success: [
    { frequency: 660, duration: 0.12, type: "sine" },
    { frequency: 990, duration: 0.18, delay: 0.09, type: "sine" },
  ],
  error: [
    {
      frequency: 220,
      slideTo: 150,
      duration: 0.22,
      type: "square",
      gain: 0.25,
    },
    {
      frequency: 180,
      slideTo: 120,
      duration: 0.24,
      delay: 0.14,
      type: "square",
      gain: 0.25,
    },
  ],
  complete: [
    { frequency: 523.25, duration: 0.12, type: "triangle" },
    { frequency: 659.25, duration: 0.12, delay: 0.09, type: "triangle" },
    { frequency: 783.99, duration: 0.12, delay: 0.18, type: "triangle" },
    { frequency: 1046.5, duration: 0.35, delay: 0.27, type: "triangle" },
  ],
} satisfies Record<string, SoundPreset>

export type DefaultSoundName = keyof typeof defaultSounds

export type UseSoundEffectsOptions<T extends string> = {
  /** Extra presets, merged over the defaults. */
  sounds?: Record<T, SoundPreset>
  /** Master volume from 0 to 1. */
  volume?: number
  /** localStorage key for the on/off switch. */
  storageKey?: string
  /** Used until the user flips the switch. */
  defaultEnabled?: boolean
}

export type UseSoundEffectsResult<T extends string> = {
  play: (name: DefaultSoundName | T) => void
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  toggle: () => void
}

// --- One AudioContext for the whole page, created on a user gesture ---

type AudioContextClass = typeof AudioContext
let context: AudioContext | null = null
let unlockUsers = 0
const GESTURES = ["pointerdown", "keydown", "touchstart"] as const

function getAudioContext(): AudioContext | null {
  if (context) return context
  if (typeof window === "undefined") return null
  const Ctor: AudioContextClass | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextClass })
      .webkitAudioContext
  if (!Ctor) return null
  context = new Ctor()
  return context
}

function unlock() {
  const ctx = getAudioContext()
  if (ctx?.state === "suspended") void ctx.resume()
  removeUnlock()
}

function removeUnlock() {
  for (const type of GESTURES) document.removeEventListener(type, unlock, true)
}

function useAudioUnlock() {
  useEffect(() => {
    unlockUsers += 1
    if (!context) {
      for (const type of GESTURES) document.addEventListener(type, unlock, true)
    }
    return () => {
      unlockUsers -= 1
      if (unlockUsers === 0) removeUnlock()
    }
  }, [])
}

function playPreset(preset: SoundPreset, volume: number) {
  const ctx = getAudioContext()
  if (!ctx || volume <= 0) return
  if (ctx.state === "suspended") void ctx.resume()

  const master = ctx.createGain()
  master.gain.value = volume
  master.connect(ctx.destination)
  const start = ctx.currentTime + 0.005
  let end = start

  for (const note of preset) {
    const at = start + (note.delay ?? 0)
    const stopAt = at + note.duration
    end = Math.max(end, stopAt)

    const osc = ctx.createOscillator()
    const amp = ctx.createGain()
    osc.type = note.type ?? "sine"
    osc.frequency.setValueAtTime(note.frequency, at)
    if (note.slideTo)
      osc.frequency.exponentialRampToValueAtTime(note.slideTo, stopAt)

    // exponentialRampToValueAtTime throws on 0, so `gain: 0` needs a floor.
    const peak = Math.max(0.0001, 0.4 * (note.gain ?? 1))
    amp.gain.setValueAtTime(0.0001, at)
    amp.gain.exponentialRampToValueAtTime(peak, at + 0.008)
    amp.gain.exponentialRampToValueAtTime(0.0001, stopAt)

    osc.connect(amp)
    amp.connect(master)
    osc.onended = () => {
      osc.disconnect()
      amp.disconnect()
    }
    osc.start(at)
    osc.stop(stopAt + 0.02)
  }

  window.setTimeout(
    () => master.disconnect(),
    (end - ctx.currentTime + 0.1) * 1000,
  )
}

// --- On/off switch persisted in localStorage ---

const switchListeners = new Set<() => void>()

function subscribeSwitch(listener: () => void) {
  switchListeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    switchListeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function readSwitch(key: string): boolean | null {
  try {
    const value = window.localStorage.getItem(key)
    return value === null ? null : value === "true"
  } catch {
    return null
  }
}

function writeSwitch(key: string, value: boolean) {
  try {
    window.localStorage.setItem(key, String(value))
  } catch {
    // Private mode or blocked storage: keep the value for this page only.
  }
  memory.set(key, value)
  for (const listener of switchListeners) listener()
}

const memory = new Map<string, boolean>()

/**
 * Short interface sounds synthesized with Web Audio, no audio files.
 * The AudioContext is created on the first user gesture and shared.
 */
export function useSoundEffects<T extends string = never>({
  sounds,
  volume = 0.5,
  storageKey = "gooseui-sounds",
  defaultEnabled = true,
}: UseSoundEffectsOptions<T> = {}): UseSoundEffectsResult<T> {
  useAudioUnlock()

  const enabled = useSyncExternalStore(
    subscribeSwitch,
    () => readSwitch(storageKey) ?? memory.get(storageKey) ?? defaultEnabled,
    () => defaultEnabled,
  )

  const setEnabled = useCallback(
    (value: boolean) => writeSwitch(storageKey, value),
    [storageKey],
  )
  const toggle = useCallback(() => setEnabled(!enabled), [enabled, setEnabled])

  const play = useCallback(
    (name: DefaultSoundName | T) => {
      if (!enabled) return
      const preset =
        (sounds as Record<string, SoundPreset> | undefined)?.[name] ??
        (defaultSounds as Record<string, SoundPreset>)[name]
      if (!preset) return
      playPreset(preset, Math.min(1, Math.max(0, volume)))
    },
    [enabled, sounds, volume],
  )

  return { play, enabled, setEnabled, toggle }
}
