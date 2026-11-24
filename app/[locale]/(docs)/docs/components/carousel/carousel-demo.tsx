import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  Carousel,
  CarouselCounter,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
  CarouselThumbnails,
} from "@/registry/gooseui/ui/carousel"

const en = {
  clouds: "Alpine peaks at sunrise above a sea of clouds",
  firs: "Mountain valley with firs and a glacier lake",
  boat: "Wooden boat on a turquoise mountain lake",
  mist: "Misty mountain ridge in soft light",
  hills: "Green hillside under a sunset sky",
  slide: (index: number) => `Go to photo ${index}`,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    clouds: "Альпийские вершины на рассвете над морем облаков",
    firs: "Горная долина с елями и ледниковым озером",
    boat: "Деревянная лодка на бирюзовом горном озере",
    mist: "Туманный горный хребет в мягком свете",
    hills: "Зелёный склон под закатным небом",
    slide: (index: number) => `Перейти к фото ${index}`,
  },
}

type Content = (typeof content)[Locale]

const getSlides = (t: Content) => [
  { id: 1, file: "clouds", alt: t.clouds },
  { id: 2, file: "firs", alt: t.firs },
  { id: 3, file: "boat", alt: t.boat },
  { id: 4, file: "mist", alt: t.mist },
  { id: 5, file: "hills", alt: t.hills },
]

const getImages = (t: Content) =>
  getSlides(t).map(({ file, alt }) => ({
    src: `/demo/carousel/${file}.webp`,
    thumbnail: `/demo/carousel/${file}-thumb.webp`,
    alt,
  }))

function Photo({
  file,
  alt,
  className,
}: {
  file: string
  alt: string
  className: string
}) {
  return (
    <img
      src={`/demo/carousel/${file}.webp`}
      alt={alt}
      draggable={false}
      loading="lazy"
      className={`w-full select-none rounded-xl object-cover ${className}`}
    />
  )
}

function renderSlides(t: Content, aspect = "aspect-video") {
  return getSlides(t).map((slide) => (
    <CarouselItem key={slide.id}>
      <Photo file={slide.file} alt={slide.alt} className={aspect} />
    </CarouselItem>
  ))
}

export function CarouselDemo() {
  const t = content[useLocale() as Locale]

  return (
    <Carousel className="mx-auto w-full max-w-lg">
      {renderSlides(t)}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots className="mt-4" slideLabel={t.slide} />
    </Carousel>
  )
}

export function CarouselWithProgress() {
  const t = content[useLocale() as Locale]

  return (
    <Carousel className="mx-auto w-full max-w-lg">
      {renderSlides(t)}
      <CarouselPrevious />
      <CarouselNext />
      <div className="mt-4 space-y-2">
        <CarouselProgress />
        <CarouselCounter className="text-center" />
      </div>
    </Carousel>
  )
}

export function CarouselWithNumbers() {
  const t = content[useLocale() as Locale]

  return (
    <Carousel className="mx-auto w-full max-w-lg">
      {renderSlides(t)}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots variant="numbers" className="mt-4" slideLabel={t.slide} />
    </Carousel>
  )
}

export function CarouselWithLines() {
  const t = content[useLocale() as Locale]

  return (
    <Carousel className="mx-auto w-full max-w-lg">
      {renderSlides(t)}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots variant="line" className="mt-4" slideLabel={t.slide} />
    </Carousel>
  )
}

export function CarouselMultiple() {
  const t = content[useLocale() as Locale]

  return (
    <Carousel className="mx-auto w-full max-w-2xl">
      {getSlides(t).map((slide) => (
        <CarouselItem key={slide.id} size="1/3">
          <Photo file={slide.file} alt={slide.alt} className="aspect-square" />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function CarouselAutoPlay() {
  const t = content[useLocale() as Locale]

  return (
    <Carousel className="mx-auto w-full max-w-lg" autoPlay={3000} loop>
      {renderSlides(t)}
      <CarouselDots className="mt-4" slideLabel={t.slide} />
    </Carousel>
  )
}

export function CarouselVertical() {
  const t = content[useLocale() as Locale]

  return (
    <Carousel
      orientation="vertical"
      className="mx-auto h-[400px] w-full max-w-lg"
    >
      {getSlides(t).map((slide) => (
        <CarouselItem key={slide.id} className="h-full">
          <Photo file={slide.file} alt={slide.alt} className="h-full" />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

/** Product-style gallery: big photo with a strip of thumbnails below */
export function CarouselThumbnailsBottom() {
  const t = content[useLocale() as Locale]

  return (
    <Carousel className="mx-auto w-full max-w-xl">
      {renderSlides(t, "aspect-[4/3]")}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselThumbnails images={getImages(t)} slideLabel={t.slide} />
    </Carousel>
  )
}

/** Vertical strip on the left, as on product pages */
export function CarouselThumbnailsLeft() {
  const t = content[useLocale() as Locale]

  return (
    <Carousel className="mx-auto w-full max-w-xl">
      {renderSlides(t, "aspect-[4/3]")}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselThumbnails
        images={getImages(t)}
        position="left"
        slideLabel={t.slide}
      />
    </Carousel>
  )
}
