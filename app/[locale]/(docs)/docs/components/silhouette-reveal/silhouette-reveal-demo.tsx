"use client"

import { Check, Gift, Lock, RotateCcw, Trophy } from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/gooseui/ui/card"
import { SilhouetteReveal } from "@/registry/gooseui/ui/silhouette-reveal"

const src = (name: string) => `/demo/silhouette-reveal/${name}.svg`

const en = {
  labels: { reveal: "Reveal image", hidden: "Hidden image" },
  game: {
    title: "Who is it?",
    description: "Pick the right name for the silhouette",
    round: (n: number, total: number) => `Round ${n} of ${total}`,
    score: (n: number) => `Score: ${n}`,
    correct: (name: string) => `Correct! It's ${name}`,
    wrong: "Not quite, try again",
    next: "Next round",
    finish: "See result",
    resultTitle: "Game over",
    resultText: (score: number, total: number) =>
      `You guessed ${score} of ${total} on the first try`,
    again: "Play again",
    items: {
      owl: "an owl",
      fox: "a fox",
      whale: "a whale",
      bicycle: "a bicycle",
    } as Record<string, string>,
    names: {
      owl: "Owl",
      fox: "Fox",
      whale: "Whale",
      bicycle: "Bicycle",
    } as Record<string, string>,
  },
  prize: {
    badge: "Gift",
    title: "Your gift is waiting",
    description: "Open the box to see what you won",
    open: "Open the gift",
    won: "Wireless headphones",
    wonText: "Yours with any order this week. Use the code at checkout",
    code: "Promo code",
    copy: "Copy",
    copied: "Code copied",
    again: "Hide again",
  },
  teaser: {
    title: "New collection",
    description: "Hover a card to peek at what is coming",
    soon: "Soon",
    drops: [
      { id: "sneaker", name: "Trail sneaker", date: "12 Dec" },
      { id: "backpack", name: "City backpack", date: "19 Dec" },
      { id: "lamp", name: "Desk lamp", date: "26 Dec" },
    ],
  },
  achievements: {
    title: "Achievements",
    description: "Complete tasks to unlock the rest",
    done: "Unlocked",
    locked: "Locked",
    items: [
      {
        id: "trophy",
        name: "First win",
        text: "Win your first match",
        done: true,
      },
      {
        id: "flame",
        name: "On fire",
        text: "Play 7 days in a row",
        progress: "5 / 7",
        done: false,
      },
      {
        id: "medal",
        name: "Veteran",
        text: "Play 100 matches",
        progress: "42 / 100",
        done: false,
      },
    ],
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    labels: { reveal: "Показать картинку", hidden: "Скрытая картинка" },
    game: {
      title: "Угадай, кто это",
      description: "Выберите, как называется силуэт",
      round: (n: number, total: number) => `Раунд ${n} из ${total}`,
      score: (n: number) => `Счёт: ${n}`,
      correct: (name: string) => `Верно! Это ${name}`,
      wrong: "Не то, попробуйте ещё",
      next: "Следующий раунд",
      finish: "Узнать результат",
      resultTitle: "Игра окончена",
      resultText: (score: number, total: number) =>
        `С первой попытки угадано ${score} из ${total}`,
      again: "Играть снова",
      items: {
        owl: "сова",
        fox: "лиса",
        whale: "кит",
        bicycle: "велосипед",
      },
      names: {
        owl: "Сова",
        fox: "Лиса",
        whale: "Кит",
        bicycle: "Велосипед",
      },
    },
    prize: {
      badge: "Подарок",
      title: "Ваш подарок ждёт",
      description: "Откройте коробку и узнайте, что вы выиграли",
      open: "Открыть подарок",
      won: "Беспроводные наушники",
      wonText: "Ваши к любому заказу на этой неделе. Введите код при оплате",
      code: "Промокод",
      copy: "Копировать",
      copied: "Код скопирован",
      again: "Спрятать снова",
    },
    teaser: {
      title: "Новая коллекция",
      description: "Наведите курсор на карточку, чтобы заглянуть внутрь",
      soon: "Скоро",
      drops: [
        { id: "sneaker", name: "Кроссовки Trail", date: "12 декабря" },
        { id: "backpack", name: "Рюкзак City", date: "19 декабря" },
        { id: "lamp", name: "Настольная лампа", date: "26 декабря" },
      ],
    },
    achievements: {
      title: "Достижения",
      description: "Выполняйте задания, чтобы открыть остальные",
      done: "Получено",
      locked: "Закрыто",
      items: [
        {
          id: "trophy",
          name: "Первая победа",
          text: "Выиграйте первый матч",
          done: true,
        },
        {
          id: "flame",
          name: "В ударе",
          text: "Играйте 7 дней подряд",
          progress: "5 / 7",
          done: false,
        },
        {
          id: "medal",
          name: "Ветеран",
          text: "Сыграйте 100 матчей",
          progress: "42 / 100",
          done: false,
        },
      ],
    },
  },
}

function useT() {
  return content[useLocale() as Locale]
}

const shakeCss = `@keyframes sr-demo-shake{0%,100%{translate:0}20%{translate:-10px}40%{translate:9px}60%{translate:-6px}80%{translate:4px}}
@media (prefers-reduced-motion:reduce){[data-sr-demo-shake]{animation:none!important}}`

/* 1. Guess who */

const rounds = [
  { id: "owl", options: ["fox", "owl", "whale"] },
  { id: "bicycle", options: ["owl", "fox", "bicycle"] },
  { id: "whale", options: ["whale", "bicycle", "owl"] },
  { id: "fox", options: ["bicycle", "whale", "fox"] },
] as const

export function SilhouetteRevealDemo() {
  const t = useT()
  const g = t.game
  const [round, setRound] = useState(0)
  const [solved, setSolved] = useState(false)
  const [wrong, setWrong] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [shake, setShake] = useState(0)

  const current = rounds[round]
  const finished = round >= rounds.length

  const restart = () => {
    setRound(0)
    setSolved(false)
    setWrong([])
    setScore(0)
    setShake(0)
  }

  const pick = (id: string) => {
    if (solved || wrong.includes(id)) return
    if (id === current.id) {
      setSolved(true)
      if (wrong.length === 0) setScore((s) => s + 1)
      customToast.success(g.correct(g.items[id]), { duration: 2200 })
    } else {
      setWrong((w) => [...w, id])
      setShake((n) => n + 1)
      customToast.error(g.wrong, { duration: 1800 })
    }
  }

  const next = () => {
    setRound((r) => r + 1)
    setSolved(false)
    setWrong([])
  }

  return (
    <Card className="w-full max-w-md">
      <style href="silhouette-reveal-demo-shake" precedence="default">
        {shakeCss}
      </style>
      <CardHeader>
        <CardTitle>{g.title}</CardTitle>
        <CardDescription>{g.description}</CardDescription>
        <div className="col-start-2 row-span-2 row-start-1 flex flex-col items-end gap-1.5 self-start justify-self-end">
          <Badge variant="neutral">
            {g.round(Math.min(round + 1, rounds.length), rounds.length)}
          </Badge>
          <Badge variant="info">{g.score(score)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {finished ? (
          <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 rounded-xl bg-muted/50 px-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Trophy className="size-8" />
            </span>
            <p className="text-xl font-semibold">{g.resultTitle}</p>
            <p className="text-muted-foreground">
              {g.resultText(score, rounds.length)}
            </p>
            <Button type="button" onClick={restart} className="cursor-pointer">
              <RotateCcw />
              {g.again}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center rounded-xl bg-muted/50 py-6">
              <div
                key={shake}
                data-sr-demo-shake={shake > 0 ? "" : undefined}
                style={
                  shake > 0 && !solved
                    ? { animation: "sr-demo-shake .45s ease-in-out" }
                    : undefined
                }
              >
                <SilhouetteReveal
                  key={current.id}
                  src={src(current.id)}
                  alt={g.names[current.id]}
                  labels={t.labels}
                  trigger="manual"
                  revealed={solved}
                  duration={800}
                  className="size-56 sm:size-64"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {current.options.map((id) => {
                const isWrong = wrong.includes(id)
                const isRight = solved && id === current.id
                return (
                  <Button
                    key={id}
                    type="button"
                    variant={isRight ? "default" : "outline"}
                    disabled={solved ? !isRight : isWrong}
                    onClick={() => pick(id)}
                    className={cn(
                      "cursor-pointer",
                      isWrong &&
                        "border-destructive/50 text-destructive line-through",
                    )}
                  >
                    {isRight && <Check />}
                    {g.names[id]}
                  </Button>
                )
              })}
            </div>
          </>
        )}
      </CardContent>
      {!finished && (
        <CardFooter className="h-9 justify-end">
          {solved && (
            <Button type="button" onClick={next} className="cursor-pointer">
              {round === rounds.length - 1 ? g.finish : g.next}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

/* 2. Prize */

const PROMO = "GOOSE-2026"

export function SilhouetteRevealPrizeDemo() {
  const t = useT()
  const p = t.prize
  const [open, setOpen] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO)
    } catch {}
    customToast.success(p.copied, { duration: 1600 })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{p.title}</CardTitle>
        <CardDescription>{open ? p.wonText : p.description}</CardDescription>
        <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
          <Badge variant={open ? "success" : "beta"}>
            <Gift />
            {p.badge}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-2 rounded-xl bg-muted/50 py-6">
          <SilhouetteReveal
            src={src("headphones")}
            alt={p.won}
            labels={t.labels}
            trigger="manual"
            revealed={open}
            duration={1100}
            className="size-44"
          />
          <p
            className={cn(
              "text-lg font-semibold transition-opacity duration-700",
              open ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={!open}
          >
            {p.won}
          </p>
        </div>
        {open && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed bg-background p-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{p.code}</p>
              <p className="font-mono text-lg font-semibold tracking-wider">
                {PROMO}
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={copy}
              className="cursor-pointer"
            >
              {p.copy}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant={open ? "ghost" : "default"}
          onClick={() => setOpen((v) => !v)}
          className="w-full cursor-pointer"
        >
          {open ? <RotateCcw /> : <Gift />}
          {open ? p.again : p.open}
        </Button>
      </CardFooter>
    </Card>
  )
}

/* 3. Teaser */

export function SilhouetteRevealTeaserDemo() {
  const t = useT()
  const s = t.teaser
  return (
    <div className="w-full max-w-3xl space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{s.title}</h3>
        <p className="text-sm text-muted-foreground">{s.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {s.drops.map((d) => (
          <Card key={d.id} className="group/drop gap-3 py-4">
            <CardContent className="space-y-3 px-4">
              <div className="flex items-center justify-center rounded-lg bg-muted/50 p-4">
                <SilhouetteReveal
                  src={src(d.id)}
                  alt={d.name}
                  labels={t.labels}
                  trigger="hover"
                  duration={500}
                  silhouetteClassName="text-foreground/80"
                  className="size-32 sm:size-28 lg:size-32"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium blur-sm transition-[filter] duration-500 select-none group-has-[[data-gooseui-silhouette]:is(:hover,:focus-visible)]/drop:blur-none group-has-[[data-gooseui-silhouette]:is(:hover,:focus-visible)]/drop:select-text">
                  {d.name}
                </p>
                <Badge variant="info" size="sm" className="shrink-0">
                  {s.soon}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{d.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

/* 4. Achievements */

export function SilhouetteRevealAchievementsDemo() {
  const t = useT()
  const a = t.achievements
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{a.title}</CardTitle>
        <CardDescription>{a.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {a.items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border p-4 text-center",
                item.done ? "bg-success/5" : "bg-muted/30",
              )}
            >
              <SilhouetteReveal
                src={src(item.id)}
                alt={item.name}
                labels={t.labels}
                trigger="manual"
                revealed={item.done}
                silhouetteClassName="text-muted-foreground/35"
                className="size-24"
              />
              <div className="space-y-1">
                <p className="font-medium">{item.done ? item.name : "???"}</p>
                <p className="text-xs text-muted-foreground">{item.text}</p>
              </div>
              {item.done ? (
                <Badge variant="success" size="sm">
                  <Check />
                  {a.done}
                </Badge>
              ) : (
                <Badge variant="neutral" size="sm">
                  <Lock />
                  {"progress" in item ? item.progress : a.locked}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
