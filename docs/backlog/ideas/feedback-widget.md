# Feedback Widget

Плавающая карточка обратной связи в правом нижнем углу сайта.

## Описание

Виджет для сбора обратной связи от пользователей с отправкой сообщений в Telegram.

## Функционал

- Плавающая кнопка в правом нижнем углу
- При клике открывается форма обратной связи
- Поля: имя (опционально), email (опционально), сообщение
- Отправка в Telegram через Bot API
- Анимация появления/скрытия
- Возможность свернуть/развернуть

## API

```tsx
<FeedbackWidget
  telegramBotToken={process.env.TELEGRAM_BOT_TOKEN}
  telegramChatId={process.env.TELEGRAM_CHAT_ID}
  position="bottom-right" | "bottom-left"
  title="Обратная связь"
  placeholder="Ваше сообщение..."
  buttonLabel="Отправить"
/>
```

## Реализация

### 1. Компонент FeedbackWidget

```tsx
// components/feedback-widget.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async () => {
    setStatus("sending")
    try {
      await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({ message }),
      })
      setStatus("success")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={handleSubmit}>Отправить</Button>
        </Card>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <MessageCircle />
        </Button>
      )}
    </div>
  )
}
```

### 2. API Route

```ts
// app/api/feedback/route.ts
export async function POST(request: Request) {
  const { message, email, name } = await request.json()

  const text = `
📬 Новое сообщение с GooseUI

${name ? `👤 ${name}` : ""}
${email ? `📧 ${email}` : ""}

💬 ${message}
  `.trim()

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  })

  return Response.json({ success: true })
}
```

### 3. Environment Variables

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Дизайн

- Кнопка: круглая, с иконкой MessageCircle
- Карточка: Card с тенью, анимация slide-up
- Цвета: primary для кнопки отправки
- Состояния: idle, sending (spinner), success (галочка), error

## Приоритет

Medium

## Референсы

- Crisp Chat Widget
- Intercom Messenger
- Tawk.to
