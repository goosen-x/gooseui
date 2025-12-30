"use client"

import {
  Carousel,
  CarouselCounter,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/registry/new-york/ui/carousel"

const slides = [
  { id: 1, color: "from-violet-500 to-purple-500", label: "Slide 1" },
  { id: 2, color: "from-cyan-500 to-blue-500", label: "Slide 2" },
  { id: 3, color: "from-emerald-500 to-teal-500", label: "Slide 3" },
  { id: 4, color: "from-orange-500 to-red-500", label: "Slide 4" },
  { id: 5, color: "from-pink-500 to-rose-500", label: "Slide 5" },
]

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-lg mx-auto">
      {slides.map((slide) => (
        <CarouselItem key={slide.id}>
          <div
            className={`flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br ${slide.color} text-4xl font-bold text-white`}
          >
            {slide.label}
          </div>
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots className="mt-4" />
    </Carousel>
  )
}

export function CarouselWithProgress() {
  return (
    <Carousel className="w-full max-w-lg mx-auto">
      {slides.map((slide) => (
        <CarouselItem key={slide.id}>
          <div
            className={`flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br ${slide.color} text-4xl font-bold text-white`}
          >
            {slide.label}
          </div>
        </CarouselItem>
      ))}
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
  return (
    <Carousel className="w-full max-w-lg mx-auto">
      {slides.map((slide) => (
        <CarouselItem key={slide.id}>
          <div
            className={`flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br ${slide.color} text-4xl font-bold text-white`}
          >
            {slide.label}
          </div>
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots variant="numbers" className="mt-4" />
    </Carousel>
  )
}

export function CarouselWithLines() {
  return (
    <Carousel className="w-full max-w-lg mx-auto">
      {slides.map((slide) => (
        <CarouselItem key={slide.id}>
          <div
            className={`flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br ${slide.color} text-4xl font-bold text-white`}
          >
            {slide.label}
          </div>
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots variant="line" className="mt-4" />
    </Carousel>
  )
}

export function CarouselMultiple() {
  return (
    <Carousel className="w-full max-w-2xl mx-auto" draggable>
      {slides.map((slide) => (
        <CarouselItem key={slide.id} size="1/3">
          <div
            className={`flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br ${slide.color} text-2xl font-bold text-white`}
          >
            {slide.id}
          </div>
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function CarouselAutoPlay() {
  return (
    <Carousel className="w-full max-w-lg mx-auto" autoPlay={3000} loop>
      {slides.map((slide) => (
        <CarouselItem key={slide.id}>
          <div
            className={`flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br ${slide.color} text-4xl font-bold text-white`}
          >
            {slide.label}
          </div>
        </CarouselItem>
      ))}
      <CarouselDots className="mt-4" />
    </Carousel>
  )
}

export function CarouselVertical() {
  return (
    <Carousel orientation="vertical" className="h-[400px] w-full max-w-lg mx-auto">
      {slides.map((slide) => (
        <CarouselItem key={slide.id} className="h-full">
          <div
            className={`flex h-full items-center justify-center rounded-xl bg-gradient-to-br ${slide.color} text-4xl font-bold text-white`}
          >
            {slide.label}
          </div>
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
