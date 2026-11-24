"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type VideoHoverPreviewCaption = {
  /** URL of a .vtt file */
  src: string
  /** BCP 47 language tag, for example "en" */
  srclang: string
  /** Name shown to the user, for example "English" */
  label: string
  /** Start with this track selected (the first track otherwise) */
  default?: boolean
}

export type VideoHoverPreviewLabels = {
  /** Accessible name of the play button */
  play?: string
  pause?: string
  mute?: string
  unmute?: string
  /** Accessible name of the captions button */
  captions?: string
  captionsOff?: string
  seek?: string
}

export type VideoHoverPreviewMode = "idle" | "preview" | "playing"

export type VideoHoverPreviewAspect = "16/9" | "9/16" | "4/5" | "1/1"

const ASPECTS: Record<VideoHoverPreviewAspect, string> = {
  "16/9": "aspect-video",
  "9/16": "aspect-[9/16]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
}

export type VideoHoverPreviewProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  src: string
  poster?: string
  /** Overlay content shown until the video plays with sound (caption, badge) */
  children?: React.ReactNode
  /** Play muted on hover or keyboard focus (mouse only for hover) */
  hoverPreview?: boolean
  labels?: VideoHoverPreviewLabels
  /** Classes for the <video> */
  videoClassName?: string
  onModeChange?: (mode: VideoHoverPreviewMode) => void
  /** WebVTT tracks. Cues are drawn over the video while it plays, muted or not */
  captions?: VideoHoverPreviewCaption[]
  /** Card ratio. Use className for anything else */
  aspect?: VideoHoverPreviewAspect
  /** Person name, shown at the top of the card */
  name?: React.ReactNode
  /** Role or company under the name */
  role?: React.ReactNode
  /** Short quote at the bottom of the card until playback starts */
  quote?: React.ReactNode
  /** Controls once the video plays with sound: the native bar or our own */
  controls?: "native" | "custom"
  /**
   * Whether the video has an audio track. Detected from the video by default,
   * and the sound button stays hidden until the answer is known. Set it to
   * skip the detection
   */
  hasAudio?: boolean
}

// Audio detection APIs that only some browsers ship
type AudioProbeVideo = HTMLVideoElement & {
  audioTracks?: { length: number }
  mozHasAudio?: boolean
  webkitAudioDecodedByteCount?: number
}

// Chrome has no audio track list: it can only tell after some audio has been
// decoded, so we wait this long (in media time) before calling a video silent
const AUDIO_PROBE_SECONDS = 0.6

/** true / false when the browser can tell, undefined while it cannot yet */
function probeAudio(video: AudioProbeVideo): boolean | undefined {
  if (video.audioTracks && video.readyState > 0) {
    return video.audioTracks.length > 0
  }
  if (typeof video.mozHasAudio === "boolean") return video.mozHasAudio
  if (typeof video.webkitAudioDecodedByteCount === "number") {
    if (video.webkitAudioDecodedByteCount > 0) return true
    if (video.currentTime >= AUDIO_PROBE_SECONDS) return false
    return undefined
  }
  // No way to detect: do not hide the button
  return video.readyState > 0 ? true : undefined
}

// One video at a time across every card on the page
let current: { video: HTMLVideoElement; stop: () => void } | null = null

const controlButton =
  "flex size-8 cursor-pointer items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm outline-none transition-[background-color,transform] hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/60 active:scale-90 motion-reduce:transition-none"

const SEEK_STEP = 5

function Icon({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

export function VideoHoverPreview({
  src,
  poster,
  children,
  hoverPreview = true,
  labels,
  videoClassName,
  onModeChange,
  captions,
  aspect = "16/9",
  name,
  role,
  quote,
  controls = "native",
  hasAudio: hasAudioProp,
  className,
  onPointerEnter,
  onPointerLeave,
  ...props
}: VideoHoverPreviewProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const fillRef = React.useRef<HTMLDivElement>(null)
  const sliderRef = React.useRef<HTMLDivElement>(null)
  const [mode, setModeState] = React.useState<VideoHoverPreviewMode>("idle")
  const [paused, setPaused] = React.useState(true)
  const [muted, setMuted] = React.useState(true)
  const [detectedAudio, setDetectedAudio] = React.useState<boolean>()
  const [cueText, setCueText] = React.useState("")
  const captionsKey = captions?.map((track) => track.src).join("|") ?? ""
  // -1 means captions are off
  const [trackIndex, setTrackIndex] = React.useState(() =>
    captions?.length
      ? Math.max(
          0,
          captions.findIndex((t) => t.default),
        )
      : -1,
  )
  const modeRef = React.useRef(mode)
  const focusRef = React.useRef(false)
  const onModeChangeRef = React.useRef(onModeChange)
  onModeChangeRef.current = onModeChange
  const custom = controls === "custom"
  const hasAudio = hasAudioProp ?? detectedAudio

  const setMode = React.useCallback((next: VideoHoverPreviewMode) => {
    if (modeRef.current === next) return
    modeRef.current = next
    setModeState(next)
    onModeChangeRef.current?.(next)
  }, [])

  React.useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return
    const reset = () => {
      video.pause()
      video.muted = true
      if (video.readyState > 0) video.currentTime = 0
      setMode("idle")
    }
    const self = { video, stop: reset }
    const onPlay = () => {
      if (current && current.video !== video) current.stop()
      current = self
    }
    const release = () => {
      if (current === self) current = null
    }
    const onEnded = () => {
      release()
      reset()
    }
    const sync = () => {
      setPaused(video.paused)
      setMuted(video.muted)
    }
    // Pause once the card leaves the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) return
        if (modeRef.current === "preview") reset()
        else video.pause()
      },
      { threshold: 0.1 },
    )
    observer.observe(root)
    video.addEventListener("play", onPlay)
    video.addEventListener("ended", onEnded)
    video.addEventListener("play", sync)
    video.addEventListener("pause", sync)
    video.addEventListener("volumechange", sync)
    return () => {
      observer.disconnect()
      video.removeEventListener("play", onPlay)
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("play", sync)
      video.removeEventListener("pause", sync)
      video.removeEventListener("volumechange", sync)
      release()
    }
  }, [setMode])

  // The sound button only makes sense for a video that has sound
  React.useEffect(() => {
    if (hasAudioProp !== undefined) return
    const video = videoRef.current as AudioProbeVideo | null
    if (!video) return
    setDetectedAudio(undefined)
    const events = ["loadedmetadata", "playing", "timeupdate"] as const
    let done = false
    const check = () => {
      if (done) return
      const result = probeAudio(video)
      if (result === undefined) return
      done = true
      setDetectedAudio(result)
      for (const type of events) video.removeEventListener(type, check)
    }
    for (const type of events) video.addEventListener(type, check)
    check()
    return () => {
      done = true
      for (const type of events) video.removeEventListener(type, check)
    }
  }, [hasAudioProp, src])

  // Cues are read from a hidden track and drawn by us, so they are never
  // clipped by the card and look the same in every browser
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const tracks = Array.from(video.textTracks)
    tracks.forEach((track, index) => {
      track.mode = index === trackIndex ? "hidden" : "disabled"
    })
    const active = trackIndex >= 0 ? tracks[trackIndex] : undefined
    const read = () => {
      const cues = active?.activeCues ? Array.from(active.activeCues) : []
      setCueText(
        cues
          .map((cue) => (cue as VTTCue).text.replace(/<[^>]+>/g, ""))
          .join("\n"),
      )
    }
    read()
    active?.addEventListener("cuechange", read)
    return () => active?.removeEventListener("cuechange", read)
  }, [trackIndex, captionsKey])

  React.useEffect(() => {
    if (!custom) return
    const video = videoRef.current
    if (!video) return
    const update = () => {
      const ratio = video.duration ? video.currentTime / video.duration : 0
      if (fillRef.current) fillRef.current.style.width = `${ratio * 100}%`
      sliderRef.current?.setAttribute(
        "aria-valuenow",
        String(Math.round(ratio * 100)),
      )
    }
    update()
    video.addEventListener("timeupdate", update)
    return () => video.removeEventListener("timeupdate", update)
  }, [custom])

  React.useEffect(() => {
    if (mode === "playing" && focusRef.current) {
      focusRef.current = false
      videoRef.current?.focus()
    }
  }, [mode])

  const hover = (enter: boolean) => {
    const video = videoRef.current
    if (!video || !hoverPreview) return
    if (enter) {
      if (modeRef.current !== "idle") return
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
      video.muted = true
      setMode("preview")
      video.play().catch(() => {
        if (modeRef.current === "preview") setMode("idle")
      })
    } else if (modeRef.current === "preview") {
      video.pause()
      if (video.readyState > 0) video.currentTime = 0
      setMode("idle")
    }
  }

  const play = (fromKeyboard: boolean) => {
    const video = videoRef.current
    if (!video) return
    focusRef.current = fromKeyboard
    video.muted = false
    video.play().catch(() => {
      // Sound was blocked: keep playing muted, the sound button unmutes
      video.muted = true
      video.play().catch(() => {})
    })
    setMode("playing")
  }

  const togglePause = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (video) video.muted = !video.muted
  }

  const cycleCaptions = () => {
    if (!captions?.length) return
    setTrackIndex((index) => (index + 1 >= captions.length ? -1 : index + 1))
  }

  const seekBy = (seconds: number) => {
    const video = videoRef.current
    if (!video?.duration) return
    video.currentTime = Math.min(
      video.duration,
      Math.max(0, video.currentTime + seconds),
    )
  }

  const seekTo = (ratio: number) => {
    const video = videoRef.current
    if (!video?.duration) return
    video.currentTime = Math.min(1, Math.max(0, ratio)) * video.duration
  }

  const onVideoKeyDown = (event: React.KeyboardEvent<HTMLVideoElement>) => {
    if (!custom || event.altKey || event.ctrlKey || event.metaKey) return
    const handled = {
      " ": togglePause,
      k: togglePause,
      ArrowLeft: () => seekBy(-SEEK_STEP),
      ArrowRight: () => seekBy(SEEK_STEP),
      m: toggleMute,
      c: cycleCaptions,
    }[event.key]
    if (!handled) return
    event.preventDefault()
    handled()
  }

  const playing = mode === "playing"
  const track = trackIndex >= 0 ? captions?.[trackIndex] : undefined
  const trackName = track?.label ?? labels?.captionsOff ?? "off"
  const captionsLabel = `${labels?.captions ?? "Captions"}: ${trackName}`
  const playLabel =
    labels?.play ??
    (typeof name === "string" ? `Play video: ${name}` : "Play video")

  return (
    <div
      ref={rootRef}
      data-slot="video-hover-preview"
      data-mode={mode}
      className={cn(
        "group relative isolate w-full overflow-hidden rounded-xl border bg-muted",
        ASPECTS[aspect],
        className,
      )}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") hover(true)
        onPointerEnter?.(event)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") hover(false)
        onPointerLeave?.(event)
      }}
      {...props}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop={mode === "preview"}
        playsInline
        preload="metadata"
        controls={playing && !custom}
        tabIndex={playing ? 0 : -1}
        aria-hidden={!playing}
        onClick={playing && custom ? togglePause : undefined}
        onKeyDown={onVideoKeyDown}
        className={cn(
          "absolute inset-0 size-full object-cover outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset",
          playing && custom && "cursor-pointer",
          videoClassName,
        )}
      >
        {captions?.map((item) => (
          <track
            key={item.src}
            kind="captions"
            src={item.src}
            srcLang={item.srclang}
            label={item.label}
          />
        ))}
      </video>
      {poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-data-[mode=idle]:opacity-100 motion-reduce:transition-none"
        />
      ) : null}
      {name || role ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-3 pr-14 pb-8 text-white">
          {name ? (
            <p className="font-semibold text-base leading-tight [text-shadow:0_1px_2px_rgb(0_0_0/0.35)]">
              {name}
            </p>
          ) : null}
          {role ? (
            <p className="mt-1 text-white/80 text-sm leading-tight">{role}</p>
          ) : null}
        </div>
      ) : null}
      {quote ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 to-transparent p-4 pt-16 text-sm leading-snug text-white opacity-0 transition-opacity duration-300 group-data-[mode=idle]:opacity-100 motion-reduce:transition-none">
          <p className="line-clamp-3 text-pretty">{quote}</p>
        </div>
      ) : null}
      {mode !== "idle" && track && cueText ? (
        <p
          aria-live="off"
          className={cn(
            "pointer-events-none absolute inset-x-2 bottom-3 z-30 mx-auto line-clamp-3 w-fit max-w-full whitespace-pre-line text-balance rounded-lg bg-black/70 px-2.5 py-1.5 text-center text-[13px] text-white leading-snug transition-[bottom] duration-300 motion-reduce:transition-none",
            playing && (custom ? "bottom-[4.5rem]" : "bottom-14"),
          )}
        >
          {cueText}
        </p>
      ) : null}
      {playing ? null : (
        <>
          {children ? (
            <div className="pointer-events-none absolute inset-0 z-10">
              {children}
            </div>
          ) : null}
          <button
            type="button"
            aria-label={playLabel}
            onClick={(event) => play(event.detail === 0)}
            onFocus={(event) => {
              if (event.currentTarget.matches(":focus-visible")) hover(true)
            }}
            onBlur={() => hover(false)}
            className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-inset"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur transition-[transform,opacity] duration-200 group-hover:scale-110 group-data-[mode=preview]:opacity-80 motion-reduce:transition-none">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-0.5 size-5"
                fill="currentColor"
              >
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
              </svg>
            </span>
            {hasAudio ? (
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 shadow-sm transition-opacity duration-200 group-data-[mode=preview]:opacity-100 motion-reduce:transition-none"
              >
                <MutedIcon />
              </span>
            ) : null}
          </button>
        </>
      )}
      {playing && custom ? (
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/55 to-transparent px-3 pt-10 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={
                paused ? (labels?.play ?? "Play") : (labels?.pause ?? "Pause")
              }
              onClick={togglePause}
              className={controlButton}
            >
              {paused ? (
                <Icon>
                  <path
                    d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"
                    fill="currentColor"
                    strokeWidth="1"
                  />
                </Icon>
              ) : (
                <Icon>
                  <path d="M8 5v14M16 5v14" strokeWidth="3" />
                </Icon>
              )}
            </button>
            <span className="flex-1" />
            {captions?.length ? (
              <button
                type="button"
                aria-label={captionsLabel}
                aria-pressed={Boolean(track)}
                title={captionsLabel}
                onClick={cycleCaptions}
                className={cn(
                  controlButton,
                  track &&
                    "bg-primary text-primary-foreground hover:bg-primary",
                )}
              >
                <Icon>
                  <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                  <path d="M6.5 11h3M6.5 14h5M13.5 11h4M13.5 14h4" />
                  {track ? null : <path d="M3 21 21 3" strokeWidth="2.5" />}
                </Icon>
              </button>
            ) : null}
            {hasAudio ? (
              <button
                type="button"
                aria-label={
                  muted
                    ? (labels?.unmute ?? "Unmute")
                    : (labels?.mute ?? "Mute")
                }
                aria-pressed={!muted}
                onClick={toggleMute}
                className={controlButton}
              >
                {muted ? <MutedIcon /> : <SoundIcon />}
              </button>
            ) : null}
          </div>
          <div
            ref={sliderRef}
            role="slider"
            tabIndex={0}
            aria-label={labels?.seek ?? "Seek"}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            className="group/seek mt-2 -mb-2 flex h-4 cursor-pointer items-center outline-none"
            onPointerDown={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              seekTo((event.clientX - rect.left) / rect.width)
            }}
            onKeyDown={(event) => {
              const handled = {
                ArrowLeft: () => seekBy(-SEEK_STEP),
                ArrowRight: () => seekBy(SEEK_STEP),
                Home: () => seekTo(0),
                End: () => seekTo(1),
              }[event.key]
              if (!handled) return
              event.preventDefault()
              handled()
            }}
          >
            <div className="h-1 w-full overflow-hidden rounded-full bg-background/30 group-focus-visible/seek:ring-2 group-focus-visible/seek:ring-ring">
              <div ref={fillRef} className="h-full w-0 bg-background" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function MutedIcon() {
  return (
    <Icon>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
      <path d="m16 9 5 6M21 9l-5 6" />
    </Icon>
  )
}

function SoundIcon() {
  return (
    <Icon>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </Icon>
  )
}
