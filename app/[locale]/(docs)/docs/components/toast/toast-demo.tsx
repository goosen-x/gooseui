"use client"

import { useLocale } from "next-intl"
import { useState } from "react"
import {
  patchToaster,
  ToasterSettingsReset,
  useToasterSettings,
} from "@/components/site-toaster"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { type ToastPosition, toast } from "@/registry/gooseui/ui/toast"

const en = {
  saved: "Changes saved",
  failed: "Could not save the file",
  warned: "Disk is almost full",
  informed: "A new version is available",
  loading: "Uploading the file",
  plain: "Plain toast",
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Info",
  loadingButton: "Loading",
  descriptionTitle: "Message sent",
  descriptionText: "Anna will get it in a minute.",
  undo: "Undo",
  undone: "Message recalled",
  withAction: "With description and action",
  promiseLoading: "Saving the draft…",
  promiseSuccess: (name: string) => `${name} saved`,
  promiseError: "The server did not answer",
  promiseOk: "Resolves",
  promiseFail: "Rejects",
  draft: "Draft",
  stackButton: "Show 5 toasts",
  stackTitles: [
    "Short one",
    "A longer message that does not fit one line and wraps to the next",
    "Import finished",
    "Backup created",
    "Last one, the newest in front",
  ],
  stackDescription: "Hover the stack: it expands and the timers stop.",
  swipeButton: "Show a toast to swipe",
  swipeTitle: "Swipe me to the right",
  swipeText: "Drag past 45 px or flick it, a short drag springs back.",
  foreverButton: "Toast that stays",
  foreverTitle: "I do not close on my own",
  foreverText: "Press × or Escape after Tab to focus me.",
  dismissAll: "Dismiss all",
  uploadButton: "Start upload",
  uploadTitle: (n: number) => `Uploading ${n}%`,
  uploadDone: "Upload finished",
  richOn: "Rich colors: on",
  richOff: "Rich colors: off",
  closeOn: "Close buttons: on",
  closeOff: "Close buttons: off",
  progressButton: "Show with progress bar",
  progressTitle: "Closes in 6 seconds",
  positionHello: (p: string) => `Position: ${p}`,
  richButton: "Show every type",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    saved: "Изменения сохранены",
    failed: "Не удалось сохранить файл",
    warned: "Диск почти заполнен",
    informed: "Доступна новая версия",
    loading: "Загружаем файл",
    plain: "Обычный тост",
    success: "Успех",
    error: "Ошибка",
    warning: "Предупреждение",
    info: "Инфо",
    loadingButton: "Загрузка",
    descriptionTitle: "Сообщение отправлено",
    descriptionText: "Анна получит его через минуту.",
    undo: "Отменить",
    undone: "Сообщение отозвано",
    withAction: "С описанием и действием",
    promiseLoading: "Сохраняем черновик…",
    promiseSuccess: (name: string) => `${name} сохранён`,
    promiseError: "Сервер не ответил",
    promiseOk: "Успешно",
    promiseFail: "С ошибкой",
    draft: "Черновик",
    stackButton: "Показать 5 тостов",
    stackTitles: [
      "Коротко",
      "Длинное сообщение, которое не помещается в одну строку и переносится на следующую",
      "Импорт завершён",
      "Резервная копия создана",
      "Последний, самый новый, спереди",
    ],
    stackDescription:
      "Наведите на стопку: она раскроется, а таймеры остановятся.",
    swipeButton: "Показать тост для свайпа",
    swipeTitle: "Смахните меня вправо",
    swipeText:
      "Протяните дальше 45 px или резко махните, короткий свайп вернётся обратно.",
    foreverButton: "Тост, который остаётся",
    foreverTitle: "Я не закрываюсь сам",
    foreverText: "Нажмите × или Escape после Tab, чтобы сфокусироваться.",
    dismissAll: "Закрыть все",
    uploadButton: "Начать загрузку",
    uploadTitle: (n: number) => `Загрузка ${n}%`,
    uploadDone: "Загрузка завершена",
    richOn: "Цветные тосты: вкл",
    richOff: "Цветные тосты: выкл",
    closeOn: "Кнопки закрытия: вкл",
    closeOff: "Кнопки закрытия: выкл",
    progressButton: "Показать с полосой",
    progressTitle: "Закроется через 6 секунд",
    positionHello: (p: string) => `Позиция: ${p}`,
    richButton: "Показать все типы",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]

/** Options of the site Toaster change from this page and return on leave */
export function DemoToasterReset() {
  return <ToasterSettingsReset />
}

export function TypesDemo() {
  const t = useT()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast(t.plain)}>
        {t.plain}
      </Button>
      <Button variant="outline" onClick={() => toast.success(t.saved)}>
        {t.success}
      </Button>
      <Button variant="outline" onClick={() => toast.error(t.failed)}>
        {t.error}
      </Button>
      <Button variant="outline" onClick={() => toast.warning(t.warned)}>
        {t.warning}
      </Button>
      <Button variant="outline" onClick={() => toast.info(t.informed)}>
        {t.info}
      </Button>
      <Button variant="outline" onClick={() => toast.loading(t.loading)}>
        {t.loadingButton}
      </Button>
    </div>
  )
}

export function PreviewDemo() {
  const t = useT()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button onClick={() => toast.success(t.saved)}>{t.success}</Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast(t.descriptionTitle, {
            description: t.descriptionText,
            action: {
              label: t.undo,
              onClick: () => toast.info(t.undone),
            },
          })
        }
      >
        {t.withAction}
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          for (const title of t.stackTitles) toast(title)
        }}
      >
        {t.stackButton}
      </Button>
    </div>
  )
}

export function ActionDemo() {
  const t = useT()
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(t.descriptionTitle, {
          description: t.descriptionText,
          action: {
            label: t.undo,
            onClick: () => toast.info(t.undone),
          },
        })
      }
    >
      {t.withAction}
    </Button>
  )
}

export function PromiseDemo() {
  const t = useT()
  const run = (ok: boolean) =>
    toast.promise(
      new Promise<string>((resolve, reject) =>
        setTimeout(() => (ok ? resolve(t.draft) : reject(new Error())), 1800),
      ),
      {
        loading: t.promiseLoading,
        success: (name) => t.promiseSuccess(name),
        error: t.promiseError,
      },
    )
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => run(true)}>
        {t.promiseOk}
      </Button>
      <Button variant="outline" onClick={() => run(false)}>
        {t.promiseFail}
      </Button>
    </div>
  )
}

export function PositionDemo() {
  const t = useT()
  const { position } = useToasterSettings()
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-2">
      {POSITIONS.map((p) => (
        <Button
          key={p}
          size="sm"
          variant={p === position ? "default" : "outline"}
          onClick={() => {
            patchToaster({ position: p })
            toast(t.positionHello(p))
          }}
        >
          {p}
        </Button>
      ))}
    </div>
  )
}

export function StackDemo() {
  const t = useT()
  return (
    <Button
      variant="outline"
      onClick={() => {
        t.stackTitles.forEach((title, i) => {
          toast(title, {
            description: i % 2 === 0 ? t.stackDescription : undefined,
            action: i === 2 ? { label: t.undo, onClick: () => {} } : undefined,
          })
        })
      }}
    >
      {t.stackButton}
    </Button>
  )
}

export function SwipeDemo() {
  const t = useT()
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(t.swipeTitle, { description: t.swipeText, duration: 20000 })
      }
    >
      {t.swipeButton}
    </Button>
  )
}

export function ForeverDemo() {
  const t = useT()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.info(t.foreverTitle, {
            description: t.foreverText,
            duration: Infinity,
            closeButton: true,
          })
        }
      >
        {t.foreverButton}
      </Button>
      <Button variant="ghost" onClick={() => toast.dismiss()}>
        {t.dismissAll}
      </Button>
    </div>
  )
}

export function UpdateDemo() {
  const t = useT()
  const [busy, setBusy] = useState(false)
  return (
    <Button
      variant="outline"
      disabled={busy}
      onClick={() => {
        setBusy(true)
        const id = "upload"
        let n = 0
        toast.loading(t.uploadTitle(n), { id })
        const timer = setInterval(() => {
          n += 20
          if (n < 100) {
            toast.loading(t.uploadTitle(n), { id })
            return
          }
          clearInterval(timer)
          toast.success(t.uploadDone, { id, duration: 3000 })
          setBusy(false)
        }, 600)
      }}
    >
      {t.uploadButton}
    </Button>
  )
}

export function RichDemo() {
  const t = useT()
  const { rich, close } = useToasterSettings()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant={rich ? "default" : "outline"}
        onClick={() => patchToaster({ rich: !rich })}
      >
        {rich ? t.richOn : t.richOff}
      </Button>
      <Button
        variant={close ? "default" : "outline"}
        onClick={() => patchToaster({ close: !close })}
      >
        {close ? t.closeOn : t.closeOff}
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.success(t.saved)
          toast.error(t.failed)
          toast.warning(t.warned)
          toast.info(t.informed)
        }}
      >
        {t.richButton}
      </Button>
    </div>
  )
}

export function ProgressDemo() {
  const t = useT()
  return (
    <Button
      variant="outline"
      onClick={() => toast.success(t.progressTitle, { duration: 6000 })}
    >
      {t.progressButton}
    </Button>
  )
}
