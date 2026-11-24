"use client"

import { Globe } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import {
  PromptInput,
  PromptInputAttachButton,
  PromptInputAttachments,
  PromptInputCounter,
  type PromptInputLabels,
  type PromptInputMessage,
  type PromptInputStatus,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/registry/gooseui/ui/prompt-input"

type ChatMessage = {
  id: number
  role: "user" | "assistant"
  text: string
  files?: string[]
  stopped?: boolean
}

const en = {
  greeting:
    "Hi! Ask me anything about your frontend. You can attach screenshots by pasting or dropping them here.",
  replies: [
    "Good question. For a sticky header that shrinks on scroll, start with position: sticky and a scroll-driven animation on the header height. Browsers without animation-timeline keep the full-size header, which is a fine fallback. If you need the shadow to appear only after scrolling, toggle a data attribute from a tiny IntersectionObserver on a sentinel element.",
    "Here is a quick plan: 1) move the price table into its own component, 2) read the currency from the user's locale with Intl.NumberFormat, 3) cache the exchange rates for an hour on the server. That keeps the client bundle small and avoids layout shift while rates load.",
    "I looked at the screenshot. The gap comes from the inline image baseline: set display: block on the image, or vertical-align: middle. The second issue is the 1px border on the card, which pushes the grid off by one pixel at 1440px wide.",
  ],
  conversation: "Conversation",
  attached: "Attached:",
  stopped: "(stopped)",
  chatPlaceholder: "Ask about your UI…",
  search: "Search",
  model: "Model",
  models: ["Fast", "Balanced", "Deep think"],
  priyaName: "Priya:",
  priya: "Can we move the design review to Thursday?",
  you: "You:",
  replyPlaceholder: "Reply to Priya",
  feedbackPlaceholder: "What should we improve in the checkout flow?",
  modHint: "Ctrl/⌘ + Enter to send",
  sent: "Sent:",
  bugPlaceholder: "Describe the bug, attach a screenshot or PDF",
  placeholder: "Send a message…",
  labels: undefined as Partial<PromptInputLabels> | undefined,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    greeting:
      "Привет! Спрашивайте что угодно про фронтенд. Скриншоты можно вставить из буфера или перетащить прямо сюда.",
    replies: [
      "Хороший вопрос. Для шапки, которая уменьшается при прокрутке, начните с position: sticky и анимации высоты, привязанной к скроллу. Браузеры без animation-timeline оставят шапку полного размера, и это нормальный запасной вариант. Если тень нужна только после прокрутки, переключайте data-атрибут из маленького IntersectionObserver на элементе-маркере.",
      "Короткий план: 1) вынести таблицу цен в отдельный компонент, 2) брать валюту из локали пользователя через Intl.NumberFormat, 3) кешировать курсы на сервере на час. Клиентский бандл останется маленьким, а вёрстка не будет прыгать, пока грузятся курсы.",
      "Посмотрел скриншот. Зазор даёт базовая линия строчной картинки: поставьте ей display: block или vertical-align: middle. Вторая проблема в рамке 1px у карточки: на ширине 1440px она сдвигает сетку на пиксель.",
    ],
    conversation: "Диалог",
    attached: "Вложения:",
    stopped: "(остановлено)",
    chatPlaceholder: "Спросите про свой интерфейс…",
    search: "Поиск",
    model: "Модель",
    models: ["Быстрая", "Сбалансированная", "Глубокое мышление"],
    priyaName: "Прия:",
    priya: "Можно перенести дизайн-ревью на четверг?",
    you: "Вы:",
    replyPlaceholder: "Ответить Прие",
    feedbackPlaceholder: "Что нам улучшить в оформлении заказа?",
    modHint: "Ctrl/⌘ + Enter — отправить",
    sent: "Отправлено:",
    bugPlaceholder: "Опишите баг, приложите скриншот или PDF",
    placeholder: "Напишите сообщение…",
    labels: {
      message: "Сообщение",
      attachments: "Вложения",
      remove: "Удалить",
      attach: "Прикрепить файлы",
      characters: "символов",
      send: "Отправить",
      sending: "Отправляется",
      stop: "Остановить ответ",
      drop: "Отпустите, чтобы прикрепить",
    },
  },
}

function useContent() {
  return content[useLocale() as Locale]
}

/** Chat with a fake streaming reply: the preview at the top of the page. */
export function PromptInputChatDemo() {
  const t = useContent()
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: 1, role: "assistant", text: t.greeting },
  ])
  const [status, setStatus] = React.useState<PromptInputStatus>("idle")
  const [model, setModel] = React.useState(t.models[1])
  const [webSearch, setWebSearch] = React.useState(false)
  const timer = React.useRef<number | null>(null)
  const replyIndex = React.useRef(0)
  const nextId = React.useRef(2)
  const logRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  })

  React.useEffect(
    () => () => {
      if (timer.current) window.clearInterval(timer.current)
    },
    [],
  )

  const stop = () => {
    if (timer.current) window.clearInterval(timer.current)
    timer.current = null
    setStatus("idle")
    setMessages((current) =>
      current.map((m, i) =>
        i === current.length - 1 && m.role === "assistant"
          ? { ...m, stopped: true }
          : m,
      ),
    )
  }

  const send = ({ text, files }: PromptInputMessage) => {
    setMessages((current) => [
      ...current,
      {
        id: nextId.current++,
        role: "user",
        text,
        files: files.map((f) => f.name),
      },
    ])
    setStatus("submitting")

    const reply = t.replies[replyIndex.current++ % t.replies.length]
    const tokens = reply.match(/\S+\s*/g) ?? []
    const assistantId = nextId.current++

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: assistantId, role: "assistant", text: "" },
      ])
      setStatus("streaming")
      let index = 0
      timer.current = window.setInterval(() => {
        const token = tokens[index++]
        if (token === undefined) {
          if (timer.current) window.clearInterval(timer.current)
          timer.current = null
          setStatus("idle")
          return
        }
        setMessages((current) =>
          current.map((m) =>
            m.id === assistantId ? { ...m, text: m.text + token } : m,
          ),
        )
      }, 45)
    }, 600)
  }

  return (
    <div className="bg-card flex h-[30rem] w-[calc(100%-2rem)] max-w-xl flex-col overflow-hidden rounded-xl border">
      <div
        ref={logRef}
        role="log"
        aria-label={t.conversation}
        className="flex-1 space-y-3 overflow-y-auto p-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap",
              message.role === "user"
                ? "bg-primary text-primary-foreground ml-auto rounded-br-md"
                : "bg-muted text-foreground rounded-bl-md",
            )}
          >
            {message.files && message.files.length > 0 && (
              <p className="mb-1 text-xs opacity-80">
                {t.attached} {message.files.join(", ")}
              </p>
            )}
            {message.text || (message.role === "assistant" && "…")}
            {message.stopped && (
              <span className="text-muted-foreground ml-1 text-xs">
                {t.stopped}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="border-t p-3">
        <PromptInput
          onSubmit={send}
          status={status}
          onStop={stop}
          placeholder={t.chatPlaceholder}
          maxLength={2000}
          labels={t.labels}
        >
          <PromptInputAttachments />
          <PromptInputTextarea />
          <PromptInputToolbar>
            <PromptInputAttachButton />
            <button
              type="button"
              aria-pressed={webSearch}
              onClick={() => setWebSearch((v) => !v)}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground aria-pressed:bg-accent aria-pressed:text-accent-foreground focus-visible:ring-ring/50 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-2.5 text-sm font-medium outline-none focus-visible:ring-[3px]"
            >
              <Globe className="size-4" aria-hidden="true" />
              {t.search}
            </button>
            <select
              aria-label={t.model}
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="text-muted-foreground hover:bg-accent focus-visible:ring-ring/50 h-8 min-w-0 cursor-pointer rounded-full bg-transparent px-2 text-sm outline-none focus-visible:ring-[3px]"
            >
              {t.models.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <PromptInputCounter className="ml-auto" />
            <PromptInputSubmit />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  )
}

export function PromptInputCompactDemo() {
  const t = useContent()
  const [sent, setSent] = React.useState<string[]>([])
  return (
    <div className="w-full max-w-md space-y-3 px-4">
      <ul className="text-muted-foreground space-y-1 text-sm">
        <li>
          <span className="text-foreground font-medium">{t.priyaName}</span>{" "}
          {t.priya}
        </li>
        {sent.map((text, i) => (
          <li key={`${i}-${text}`}>
            <span className="text-foreground font-medium">{t.you}</span> {text}
          </li>
        ))}
      </ul>
      <PromptInput
        onSubmit={({ text }) => setSent((s) => [...s, text])}
        placeholder={t.replyPlaceholder}
        labels={t.labels}
        className="flex-row flex-wrap items-end gap-1 rounded-3xl p-1"
      >
        <PromptInputAttachments className="basis-full" />
        <PromptInputAttachButton />
        <PromptInputTextarea className="max-h-32 min-h-8 min-w-0 flex-1 basis-0 px-1 py-1.5" />
        <PromptInputSubmit />
      </PromptInput>
    </div>
  )
}

export function PromptInputFeedbackDemo() {
  const t = useContent()
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="w-full max-w-md space-y-3 px-4">
      <PromptInput
        submitOn="mod+enter"
        maxLength={280}
        placeholder={t.feedbackPlaceholder}
        labels={t.labels}
        onSubmit={({ text }) => setLast(text)}
      >
        <PromptInputTextarea className="min-h-20" />
        <PromptInputToolbar>
          <span className="text-muted-foreground text-xs">{t.modHint}</span>
          <PromptInputCounter className="ml-auto" />
          <PromptInputSubmit />
        </PromptInputToolbar>
      </PromptInput>
      {last && (
        <p className="text-muted-foreground text-sm">
          {t.sent} <span className="text-foreground">{last}</span>
        </p>
      )}
    </div>
  )
}

export function PromptInputDefaultDemo() {
  const t = useContent()
  return (
    <div className="w-full max-w-md px-4">
      <PromptInput
        accept="image/*,.pdf"
        placeholder={t.bugPlaceholder}
        labels={t.labels}
        onSubmit={() => {}}
      />
    </div>
  )
}
