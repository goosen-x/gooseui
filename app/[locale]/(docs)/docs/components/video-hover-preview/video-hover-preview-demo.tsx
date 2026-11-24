"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { ScrollContainer } from "@/registry/gooseui/ui/scroll-container"
import {
  VideoHoverPreview,
  type VideoHoverPreviewCaption,
  type VideoHoverPreviewLabels,
} from "@/registry/gooseui/ui/video-hover-preview"

const BASE = "/demo/video-hover-preview"

const SRCS = [
  `${BASE}/mountains.mp4`,
  `${BASE}/city-night.mp4`,
  `${BASE}/desk.mp4`,
]
const POSTERS = [
  `${BASE}/mountains.webp`,
  `${BASE}/city-night.webp`,
  `${BASE}/desk.webp`,
]
const SLUGS = ["louise-brosnan", "toni-aarniviita", "arto-huhtala"]
// Keeps the face in frame once the video is cropped to a tall card
const FACE_POSITIONS = [
  "object-[72%_50%]",
  "object-[26%_50%]",
  "object-[54%_50%]",
]

const en = {
  play: "Play video",
  labels: {
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Turn sound on",
    captions: "Captions",
    captionsOff: "off",
    seek: "Seek",
  } satisfies VideoHoverPreviewLabels,
  cards: [
    ["Mountain ridge", "0:10"],
    ["City at night", "0:10"],
    ["Working from above", "0:10"],
  ],
  people: [
    {
      name: "Louise Brosnan",
      role: "Chef, Dingle, Ireland",
      quote: "Education for that is key.",
    },
    {
      name: "Toni Aarniviita",
      role: "Head chef, Finland",
      quote: "Try to minimize that as much as possible.",
    },
    {
      name: "Arto Huhtala",
      role: "Head chef, Finland",
      quote: "Every day is different, so you need to cope with the pressure.",
    },
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    play: "Смотреть видео",
    labels: {
      play: "Воспроизвести",
      pause: "Пауза",
      mute: "Выключить звук",
      unmute: "Включить звук",
      captions: "Субтитры",
      captionsOff: "выключены",
      seek: "Перемотка",
    },
    cards: [
      ["Горный хребет", "0:10"],
      ["Город ночью", "0:10"],
      ["Работа за ноутбуком", "0:10"],
    ],
    people: [
      {
        name: "Луиза Броснан",
        role: "Повар, Дингл, Ирландия",
        quote: "Образование здесь решает всё.",
      },
      {
        name: "Тони Аарнивиита",
        role: "Шеф-повар, Финляндия",
        quote: "Отходы нужно сводить к минимуму.",
      },
      {
        name: "Арто Хухтала",
        role: "Шеф-повар, Финляндия",
        quote: "Каждый день разный, нужно уметь справляться с давлением.",
      },
    ],
  },
}

function useT() {
  return content[useLocale() as Locale]
}

function captionTracks(
  slug: string,
  locale: Locale,
): VideoHoverPreviewCaption[] {
  const tracks: VideoHoverPreviewCaption[] = [
    { src: `${BASE}/${slug}.en.vtt`, srclang: "en", label: "English" },
    { src: `${BASE}/${slug}.ru.vtt`, srclang: "ru", label: "Русский" },
  ]
  return tracks.map((track) => ({
    ...track,
    default: track.srclang === locale,
  }))
}

function Caption({ title, duration }: { title: string; duration: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-white">
      <span className="font-medium text-sm">{title}</span>
      <span className="rounded bg-black/50 px-1.5 py-0.5 text-xs tabular-nums">
        {duration}
      </span>
    </div>
  )
}

/** Vertical video testimonials with captions */
export function VideoHoverPreviewDemo() {
  const t = useT()
  const locale = useLocale() as Locale
  return (
    <ScrollContainer
      variant="minimal"
      height="auto"
      aria-label={t.people.map((person) => person.name).join(", ")}
      className="w-full max-w-4xl snap-x snap-mandatory scroll-px-4 overscroll-x-contain pb-3"
    >
      <div className="flex w-max gap-4 px-4 sm:grid sm:w-full sm:grid-cols-3">
        {t.people.map((person, index) => (
          <VideoHoverPreview
            key={SLUGS[index]}
            src={`${BASE}/${SLUGS[index]}.mp4`}
            poster={`${BASE}/${SLUGS[index]}.webp`}
            aspect="4/5"
            controls="custom"
            captions={captionTracks(SLUGS[index], locale)}
            name={person.name}
            role={person.role}
            quote={person.quote}
            labels={{ ...t.labels, play: `${t.play}: ${person.name}` }}
            videoClassName={FACE_POSITIONS[index]}
            className="w-[68vw] max-w-[300px] shrink-0 snap-start rounded-2xl sm:w-auto sm:max-w-none"
          />
        ))}
      </div>
    </ScrollContainer>
  )
}

/** Landscape previews without captions */
export function VideoHoverPreviewLandscapeDemo() {
  const t = useT()
  return (
    <div className="grid w-full max-w-4xl gap-4 px-4 sm:grid-cols-3">
      {t.cards.map(([title, duration], index) => (
        <VideoHoverPreview
          key={title}
          src={SRCS[index]}
          poster={POSTERS[index]}
          labels={{ play: `${t.play}: ${title}` }}
        >
          <Caption title={title} duration={duration} />
        </VideoHoverPreview>
      ))}
    </div>
  )
}

/** One card with several caption languages and the custom controls */
export function VideoHoverPreviewLanguagesDemo() {
  const t = useT()
  const locale = useLocale() as Locale
  const person = t.people[1]
  return (
    <div className="w-full max-w-md px-4">
      <VideoHoverPreview
        src={`${BASE}/${SLUGS[1]}.mp4`}
        poster={`${BASE}/${SLUGS[1]}.webp`}
        aspect="16/9"
        controls="custom"
        captions={captionTracks(SLUGS[1], locale)}
        name={person.name}
        role={person.role}
        labels={{ ...t.labels, play: `${t.play}: ${person.name}` }}
        className="rounded-2xl"
      />
    </div>
  )
}

export function VideoHoverPreviewClickOnlyDemo() {
  const t = useT()
  const [title, duration] = t.cards[1]
  return (
    <div className="w-full max-w-sm px-4">
      <VideoHoverPreview
        src={SRCS[1]}
        poster={POSTERS[1]}
        hoverPreview={false}
        labels={{ play: `${t.play}: ${title}` }}
      >
        <Caption title={title} duration={duration} />
      </VideoHoverPreview>
    </div>
  )
}
