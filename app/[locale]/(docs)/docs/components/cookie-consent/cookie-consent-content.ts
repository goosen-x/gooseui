import type { Dict } from "@/i18n/dict"
import type {
  CookieCategory,
  CookieConsentLabels,
} from "@/registry/gooseui/ui/cookie-consent"

const en = {
  labels: undefined as Partial<CookieConsentLabels> | undefined,
  showAgain: "Show again",
  status: "Stored choice",
  none: "no answer yet",
  accepted: "Cookies accepted",
  declined: "Optional cookies declined",
  saved: "Preferences saved",
  categories: [
    {
      id: "necessary",
      label: "Necessary",
      description: "Sign-in, cart and security. Always on.",
      required: true,
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "Anonymous visit statistics.",
      defaultEnabled: true,
    },
    {
      id: "marketing",
      label: "Marketing",
      description: "Personalized offers on other sites.",
    },
  ] as CookieCategory[],
  allowed: "allowed",
  blocked: "blocked",
  analyticsLine: "Analytics script",
}

export const content: Dict<typeof en> = {
  en,
  ru: {
    labels: {
      title: "Мы используем cookie",
      description:
        "Они нужны, чтобы сайт работал, и помогают понять, как им пользуются. Можно принять все или отказаться от необязательных.",
      accept: "Принять все",
      decline: "Отклонить",
      customize: "Настроить",
      save: "Сохранить",
      close: "Закрыть",
    },
    showAgain: "Показать снова",
    status: "Сохранённый выбор",
    none: "ответа пока нет",
    accepted: "Cookie приняты",
    declined: "Необязательные cookie отключены",
    saved: "Настройки сохранены",
    categories: [
      {
        id: "necessary",
        label: "Необходимые",
        description: "Вход, корзина и безопасность. Включены всегда.",
        required: true,
      },
      {
        id: "analytics",
        label: "Аналитика",
        description: "Анонимная статистика посещений.",
        defaultEnabled: true,
      },
      {
        id: "marketing",
        label: "Маркетинг",
        description: "Персональные предложения на других сайтах.",
      },
    ],
    allowed: "разрешён",
    blocked: "заблокирован",
    analyticsLine: "Скрипт аналитики",
  },
}
