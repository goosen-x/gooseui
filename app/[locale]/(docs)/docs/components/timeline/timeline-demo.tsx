"use client"

import { Package, Rocket, Sparkles, Truck } from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  type TimelinePosition,
  type TimelineStatus,
  TimelineTime,
  TimelineTitle,
} from "@/registry/gooseui/ui/timeline"

type Step = {
  title: string
  description: string
  time: string
  dateTime: string
  status: TimelineStatus
}

const en = {
  labels: { completed: "Completed", current: "Current", upcoming: "Upcoming" },
  steps: [
    {
      title: "Order placed",
      description: "Payment confirmed and receipt sent.",
      time: "Mar 3, 09:12",
      dateTime: "2026-03-03T09:12",
      status: "completed",
    },
    {
      title: "Packed",
      description: "Two items packed at the warehouse.",
      time: "Mar 3, 16:40",
      dateTime: "2026-03-03T16:40",
      status: "completed",
    },
    {
      title: "On the way",
      description: "The courier picks it up today.",
      time: "Mar 4, 10:05",
      dateTime: "2026-03-04T10:05",
      status: "current",
    },
    {
      title: "Delivered",
      description: "Expected on Mar 6.",
      time: "Mar 6",
      dateTime: "2026-03-06",
      status: "upcoming",
    },
  ] as Step[],
  releases: [
    { title: "Idea", time: "Jan" },
    { title: "Prototype", time: "Feb" },
    { title: "Beta", time: "Apr" },
    { title: "Launch", time: "Jun" },
  ],
  back: "Back",
  next: "Next",
  counter: "Step {current} of {total}",
  flow: [
    {
      title: "Order placed",
      description: "Payment confirmed and receipt sent.",
    },
    { title: "Packed", description: "Two items packed at the warehouse." },
    { title: "Shipped", description: "Handed over to the courier." },
    { title: "Out for delivery", description: "The courier is on the way." },
    { title: "Delivered", description: "Enjoy your order." },
  ],
  stages: ["Idea", "Prototype", "Alpha", "Beta", "Launch"],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    labels: { completed: "Выполнено", current: "Сейчас", upcoming: "Впереди" },
    steps: [
      {
        title: "Заказ оформлен",
        description: "Оплата прошла, чек отправлен.",
        time: "3 мар, 09:12",
        dateTime: "2026-03-03T09:12",
        status: "completed",
      },
      {
        title: "Собран",
        description: "Два товара упакованы на складе.",
        time: "3 мар, 16:40",
        dateTime: "2026-03-03T16:40",
        status: "completed",
      },
      {
        title: "В пути",
        description: "Курьер заберёт посылку сегодня.",
        time: "4 мар, 10:05",
        dateTime: "2026-03-04T10:05",
        status: "current",
      },
      {
        title: "Доставлен",
        description: "Ожидаем 6 марта.",
        time: "6 мар",
        dateTime: "2026-03-06",
        status: "upcoming",
      },
    ],
    releases: [
      { title: "Идея", time: "Янв" },
      { title: "Прототип", time: "Фев" },
      { title: "Бета", time: "Апр" },
      { title: "Запуск", time: "Июн" },
    ],
    back: "Назад",
    next: "Далее",
    counter: "Шаг {current} из {total}",
    flow: [
      { title: "Заказ оформлен", description: "Оплата прошла, чек отправлен." },
      { title: "Собран", description: "Два товара упакованы на складе." },
      { title: "Отправлен", description: "Передан курьерской службе." },
      { title: "Курьер в пути", description: "Курьер уже едет к вам." },
      { title: "Доставлен", description: "Приятного пользования." },
    ],
    stages: ["Идея", "Прототип", "Альфа", "Бета", "Запуск"],
  },
}

function Steps({ position }: { position: TimelinePosition }) {
  const t = content[useLocale() as Locale]
  return (
    <Timeline position={position} labels={t.labels} className="w-full max-w-lg">
      {t.steps.map((step) => (
        <TimelineItem key={step.title} status={step.status}>
          <TimelineMarker />
          <TimelineConnector />
          <TimelineContent>
            <TimelineTime dateTime={step.dateTime}>{step.time}</TimelineTime>
            <TimelineTitle>{step.title}</TimelineTitle>
            <TimelineDescription>{step.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export function TimelineDemo() {
  return (
    <div className="flex w-full justify-center px-6">
      <Steps position="left" />
    </div>
  )
}

export function TimelineAlternateDemo() {
  return (
    <div className="flex w-full justify-center px-6">
      <Steps position="alternate" />
    </div>
  )
}

export function TimelineRightDemo() {
  return (
    <div className="flex w-full justify-center px-6">
      <Steps position="right" />
    </div>
  )
}

const icons = [Sparkles, Package, Truck, Rocket]

export function TimelineHorizontalDemo() {
  const t = content[useLocale() as Locale]
  const statuses: TimelineStatus[] = [
    "completed",
    "completed",
    "current",
    "upcoming",
  ]
  return (
    <div className="w-full px-6">
      <Timeline
        orientation="horizontal"
        labels={t.labels}
        className="mx-auto max-w-2xl"
      >
        {t.releases.map((step, index) => (
          <TimelineItem key={step.title} status={statuses[index]}>
            <TimelineMarker />
            <TimelineConnector />
            <TimelineContent>
              <TimelineTitle>{step.title}</TimelineTitle>
              <TimelineTime>{step.time}</TimelineTime>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}

export function TimelineIconsDemo() {
  const t = content[useLocale() as Locale]
  const statuses: TimelineStatus[] = [
    "completed",
    "completed",
    "current",
    "upcoming",
  ]
  return (
    <div className="w-full px-6">
      <Timeline
        orientation="horizontal"
        position="alternate"
        labels={t.labels}
        className="mx-auto max-w-2xl [--timeline-marker:2rem]"
      >
        {t.releases.map((step, index) => {
          const Icon = icons[index]
          return (
            <TimelineItem key={step.title} status={statuses[index]}>
              <TimelineMarker>
                <Icon />
              </TimelineMarker>
              <TimelineConnector variant={index >= 2 ? "dashed" : "solid"} />
              <TimelineContent>
                <TimelineTitle>{step.title}</TimelineTitle>
                <TimelineTime>{step.time}</TimelineTime>
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </div>
  )
}

function Stepper({
  orientation,
  steps,
}: {
  orientation: "vertical" | "horizontal"
  steps: { title: string; description?: string }[]
}) {
  const t = content[useLocale() as Locale]
  const [state, setState] = useState({ active: 1, from: 1 })
  const last = steps.length - 1
  const go = (index: number) =>
    setState((s) => ({
      active: Math.min(last, Math.max(0, index)),
      from: s.active,
    }))
  const horizontal = orientation === "horizontal"

  return (
    <div className="flex w-full flex-col items-center gap-6 px-6">
      <Timeline
        orientation={orientation}
        labels={t.labels}
        activeIndex={state.active}
        fromIndex={state.from}
        className={horizontal ? "w-full max-w-2xl" : "w-full max-w-sm"}
      >
        {steps.map((step, index) => (
          <TimelineItem
            key={step.title}
            onClick={() => go(index)}
            className="cursor-pointer"
          >
            <TimelineMarker />
            <TimelineConnector />
            <TimelineContent>
              <button
                type="button"
                aria-current={index === state.active ? "step" : undefined}
                onClick={(event) => {
                  event.stopPropagation()
                  go(index)
                }}
                className="flex cursor-pointer flex-col gap-1 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <TimelineTitle>{step.title}</TimelineTitle>
                {step.description && !horizontal ? (
                  <TimelineDescription>{step.description}</TimelineDescription>
                ) : null}
              </button>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={state.active === 0}
          onClick={() => go(state.active - 1)}
        >
          {t.back}
        </Button>
        <span
          className="min-w-24 text-center text-sm tabular-nums text-muted-foreground"
          aria-live="polite"
        >
          {t.counter
            .replace("{current}", String(state.active + 1))
            .replace("{total}", String(steps.length))}
        </span>
        <Button
          size="sm"
          disabled={state.active === last}
          onClick={() => go(state.active + 1)}
        >
          {t.next}
        </Button>
      </div>
    </div>
  )
}

export function TimelineStepperDemo() {
  const t = content[useLocale() as Locale]
  return <Stepper orientation="vertical" steps={t.flow} />
}

export function TimelineStepperHorizontalDemo() {
  const t = content[useLocale() as Locale]
  return (
    <Stepper
      orientation="horizontal"
      steps={t.stages.map((title) => ({ title }))}
    />
  )
}
