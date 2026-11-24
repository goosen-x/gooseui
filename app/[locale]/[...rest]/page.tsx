import { notFound } from "next/navigation"

// Неизвестный путь внутри языка отдаёт локализованную 404 из app/[locale]/not-found.tsx
export default function CatchAll() {
  notFound()
}
