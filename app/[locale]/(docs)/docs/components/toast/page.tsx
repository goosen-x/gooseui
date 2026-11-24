import { setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ActionDemo,
  DemoToasterReset,
  ForeverDemo,
  PositionDemo,
  PreviewDemo,
  ProgressDemo,
  PromiseDemo,
  RichDemo,
  StackDemo,
  SwipeDemo,
  TypesDemo,
  UpdateDemo,
} from "./toast-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  title: "Toast",
  description:
    "Toast notifications on native HTML and CSS: a stack like sonner, no dependencies",
  intro:
    "A toast stack with the API of sonner: toast.success(), toast.promise(), actions, swipe to dismiss and a stack that expands on hover. The container lives in the browser top layer through the Popover API, so toasts show above dialogs. Animations are plain CSS transitions with @starting-style, JavaScript only measures heights and runs the timers.",
  compare:
    "Compared to sonner: about 4.7 kB gzip against 11 kB for sonner with its styles, icons and theme wrapper, and no npm dependencies at all. Not repeated: toast.custom(), vertical swipe, expand on touch tap and the unwrap() of toast.promise().",
  browserSupport: "Browser Support",
  popoverText:
    "The toast container is a popover=manual element, so it sits in the top layer above everything, including a modal dialog opened later. Without the API it falls back to position: fixed with the highest z-index.",
  startingStyleText:
    "Toasts appear through @starting-style and a CSS transition, no animation library. Without support they simply show up without the slide.",
  preview: "Preview",
  previewHint:
    "Click a button. Fire five toasts and hover the stack to expand it.",
  installation: "Installation",
  usage: "Usage",
  usageText:
    "Mount one Toaster, for example in the root layout. After that toast() works from any place, even outside React. The file is a client module, so call toast from client code: event handlers, effects, callbacks.",
  examples: "Examples",
  typesTitle: "Types",
  typesText:
    "success, error, warning, info and loading come with an icon. An error toast gets role=alert, so screen readers read it right away.",
  actionTitle: "Description and action",
  actionText:
    "description adds a second line. action and cancel add buttons: a click runs onClick and closes the toast, unless you call event.preventDefault().",
  promiseTitle: "Promise",
  promiseText:
    "toast.promise() shows a loading toast, then turns it into success or error by the same id.",
  positionsTitle: "Positions",
  positionsText:
    "Six positions. On narrow screens the toasts take the full width. The offset follows the safe area of the phone.",
  stackTitle: "Stack of toasts",
  stackText:
    "Collapsed toasts lie behind each other and get smaller. Hover or focus the stack: it expands by the real height of each toast, timers stop, and start again when the pointer leaves. Only visibleToasts toasts show in the stack, the others wait behind.",
  swipeTitle: "Swipe",
  swipeText:
    "Drag a toast toward the screen edge. It follows the pointer, and in the other direction it resists. Past 45 px or a fast flick closes it, a short drag springs back. The × button closes a toast too.",
  foreverTitle: "Toast that does not close",
  foreverText:
    "duration: Infinity keeps the toast until the user closes it. toast.dismiss() without an id closes all of them.",
  updateTitle: "Update by id",
  updateText:
    "A toast with an existing id is not added again, it is updated in place: the text changes, the timer and the progress bar start over.",
  richTitle: "Rich colors and close button",
  richText:
    "richColors tints the whole toast by its type. Every toast has a × button, closeButton={false} removes it. Both are options of the Toaster.",
  progressTitle: "Progress bar",
  progressText:
    "Every toast draws a bar that runs down until it closes. It is a CSS animation, so hover and focus pause it through animation-play-state. progress: false removes the bar.",
  props: "Toaster props",
  toastOptions: "toast() options",
  methods: "Methods",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  methodsHeaders: {
    method: "Method",
    returns: "Returns",
    description: "Description",
  },
  features: "Features",
  featureList: [
    [
      "Top layer",
      "a popover container above dialogs; the toasts do not receive clicks while a modal dialog is open, that is how <dialog> works",
    ],
    ["Real heights", "the stack measures each toast, CSS variables animate it"],
    [
      "RTL",
      "dir=rtl mirrors the layout, the close button and the progress bar",
    ],
    [
      "Theme",
      "colors come from shadcn tokens, success, warning and info tokens are used when they exist",
    ],
  ],
  p: {
    position: "Corner or edge of the screen",
    visibleToasts: "How many toasts show in the stack",
    expand: "Keep the stack always expanded",
    richColors: "Tint toasts by their type",
    closeButton: "Show × on every toast, false hides them",
    gap: "Space between toasts in px",
    offset: "Distance to the screen edge, px or any CSS length",
    dir: "Text direction",
    duration: "Default lifetime in ms",
    hotkey: "Keys that focus the toasts",
    label: "Accessible name of the region",
    closeLabel: "Accessible name of the × button",
    className: "Additional CSS classes of the container",
    style:
      "Styles of the container. Variables: --w width (356px), --oy vertical offset only",
  },
  o: {
    id: "Existing id updates that toast instead of adding a new one",
    description: "Second line under the title",
    duration:
      "Lifetime in ms. Infinity does not close; loading toasts never close on their own",
    action: "Button with onClick, closes the toast unless prevented",
    cancel: "Second button, closes the toast",
    icon: "Own icon instead of the icon of the type, null hides it",
    progress: "Bar that runs down until the toast closes, false hides it",
    closeButton: "Show × on this toast",
    className: "Class of the toast",
    onDismiss: "Called when the toast is closed by a user or toast.dismiss()",
    onAutoClose: "Called when the timer closes the toast",
  },
  m: {
    toast: "Plain toast",
    typed: "Toast of the type with its icon",
    promise: "Loading toast that turns into success or error",
    dismiss: "Closes a toast by id, or all toasts without an id",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Toast",
    description:
      "Тост-уведомления на нативных HTML и CSS: стопка как у sonner, без зависимостей",
    intro:
      "Стопка тостов с API как у sonner: toast.success(), toast.promise(), действия, закрытие свайпом и стопка, которая раскрывается при наведении. Контейнер живёт в верхнем слое браузера через Popover API, поэтому тосты видны поверх диалогов. Анимации это обычные CSS-переходы с @starting-style, JavaScript только считает высоты и ведёт таймеры.",
    compare:
      "В сравнении с sonner: около 4,7 кБ gzip против 11 кБ у sonner со стилями, иконками и обёрткой темы, и вообще без npm-зависимостей. Не повторено: toast.custom(), вертикальный свайп, раскрытие тапом на тач-экранах и unwrap() у toast.promise().",
    browserSupport: "Поддержка браузеров",
    popoverText:
      "Контейнер тостов это элемент с popover=manual, он лежит в верхнем слое поверх всего, в том числе поверх модального диалога, открытого позже. Без API он превращается в position: fixed с максимальным z-index.",
    startingStyleText:
      "Тосты появляются через @starting-style и CSS-переход, без библиотеки анимаций. Без поддержки они просто возникают без сдвига.",
    preview: "Превью",
    previewHint:
      "Нажмите кнопку. Вызовите пять тостов и наведите курсор на стопку, она раскроется.",
    installation: "Установка",
    usage: "Использование",
    usageText:
      "Подключите один Toaster, например в корневом layout. После этого toast() работает из любого места, даже вне React. Файл это клиентский модуль, поэтому вызывайте toast из клиентского кода: обработчиков, эффектов, колбэков.",
    examples: "Примеры",
    typesTitle: "Типы",
    typesText:
      "success, error, warning, info и loading идут с иконкой. Тост ошибки получает role=alert, поэтому скринридер читает его сразу.",
    actionTitle: "Описание и действие",
    actionText:
      "description добавляет вторую строку. action и cancel добавляют кнопки: клик вызывает onClick и закрывает тост, если не вызвать event.preventDefault().",
    promiseTitle: "Promise",
    promiseText:
      "toast.promise() показывает тост загрузки, а затем превращает его в успех или ошибку по тому же id.",
    positionsTitle: "Позиции",
    positionsText:
      "Шесть позиций. На узких экранах тосты занимают всю ширину. Отступ учитывает безопасную область телефона.",
    stackTitle: "Стопка тостов",
    stackText:
      "Свёрнутые тосты лежат друг за другом и уменьшаются. Наведите курсор или сфокусируйте стопку: она раскроется по реальной высоте каждого тоста, таймеры встанут и пойдут снова, когда курсор уйдёт. В стопке видно visibleToasts тостов, остальные ждут позади.",
    swipeTitle: "Свайп",
    swipeText:
      "Потяните тост к краю экрана. Он идёт за курсором, а в обратную сторону сопротивляется. Больше 45 px или быстрый взмах закрывает тост, короткий свайп возвращает его назад. Кнопка × тоже закрывает.",
    foreverTitle: "Тост, который не закрывается",
    foreverText:
      "duration: Infinity держит тост, пока пользователь его не закроет. toast.dismiss() без id закрывает все тосты.",
    updateTitle: "Обновление по id",
    updateText:
      "Тост с существующим id не добавляется заново, а обновляется на месте: меняется текст, таймер и полоса времени стартуют сначала.",
    richTitle: "Цветные тосты и кнопка закрытия",
    richText:
      "richColors подкрашивает весь тост по типу. У каждого тоста есть кнопка ×, closeButton={false} её убирает. Обе настройки относятся к Toaster.",
    progressTitle: "Полоса времени",
    progressText:
      "У каждого тоста есть полоса, которая убывает до закрытия. Это CSS-анимация, поэтому наведение и фокус ставят её на паузу через animation-play-state. progress: false убирает полосу.",
    props: "Пропсы Toaster",
    toastOptions: "Опции toast()",
    methods: "Методы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    methodsHeaders: {
      method: "Метод",
      returns: "Возвращает",
      description: "Описание",
    },
    features: "Особенности",
    featureList: [
      [
        "Верхний слой",
        "popover-контейнер поверх диалогов; пока открыт модальный диалог, тосты не принимают клики, так работает <dialog>",
      ],
      [
        "Реальные высоты",
        "стопка измеряет каждый тост, а анимируют CSS-переменные",
      ],
      ["RTL", "dir=rtl зеркалит раскладку, кнопку закрытия и полосу времени"],
      [
        "Тема",
        "цвета берутся из токенов shadcn, токены success, warning и info используются, если они есть",
      ],
    ],
    p: {
      position: "Угол или край экрана",
      visibleToasts: "Сколько тостов видно в стопке",
      expand: "Держать стопку всегда раскрытой",
      richColors: "Подкрашивать тосты по типу",
      closeButton: "Показывать × на каждом тосте, false скрывает",
      gap: "Расстояние между тостами в px",
      offset: "Отступ от края экрана, px или любая CSS-длина",
      dir: "Направление текста",
      duration: "Время жизни по умолчанию в мс",
      hotkey: "Клавиши, которые фокусируют тосты",
      label: "Доступное имя региона",
      closeLabel: "Доступное имя кнопки ×",
      className: "Дополнительные CSS-классы контейнера",
      style:
        "Стили контейнера. Переменные: --w ширина (356px), --oy отступ только по вертикали",
    },
    o: {
      id: "Существующий id обновляет этот тост вместо добавления нового",
      description: "Вторая строка под заголовком",
      duration:
        "Время жизни в мс. Infinity не закрывает; тосты загрузки сами не закрываются",
      action: "Кнопка с onClick, закрывает тост, если не отменить",
      cancel: "Вторая кнопка, закрывает тост",
      icon: "Своя иконка вместо иконки типа, null скрывает",
      progress: "Полоса, которая убывает до закрытия тоста, false скрывает",
      closeButton: "Показать × на этом тосте",
      className: "Класс тоста",
      onDismiss:
        "Вызывается, когда тост закрыт пользователем или toast.dismiss()",
      onAutoClose: "Вызывается, когда тост закрыл таймер",
    },
    m: {
      toast: "Обычный тост",
      typed: "Тост нужного типа с иконкой",
      promise: "Тост загрузки, который превращается в успех или ошибку",
      dismiss: "Закрывает тост по id или все тосты без id",
    },
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

function Example({
  title,
  text,
  demo,
  code,
}: {
  title: string
  text: string
  demo: ReactNode
  code: string
}) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{text}</p>
      <div className="flex justify-center py-8 px-4 bg-muted/30 rounded-lg">
        {demo}
      </div>
      <CodeBlock className="mt-4">{code}</CodeBlock>
    </div>
  )
}

function Table({
  id,
  title,
  head,
  rows,
}: {
  id: string
  title: string
  head: string[]
  rows: string[][]
}) {
  return (
    <div className="space-y-4">
      <h2
        id={id}
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead className="bg-muted">
            <tr>
              {head.map((h) => (
                <th key={h} className="text-left p-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={
                      i < row.length - 1 ? "p-3 font-mono text-xs" : "p-3"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default async function ToastPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "toast-options", title: t.toastOptions, level: 2 },
    { id: "methods", title: t.methods, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const h = t.propsHeaders
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title={t.title} />

        <div className="space-y-3">
          <p className="text-muted-foreground">{t.intro}</p>
          <p className="text-muted-foreground">{t.compare}</p>
        </div>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "popover",
              description: t.popoverText,
            },
            {
              featureId: "starting-style",
              description: t.startingStyleText,
            },
          ]}
        />

        {/* The site Toaster shows the toasts, this puts its options back on leave */}
        <DemoToasterReset />

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 px-4 bg-muted/30 rounded-lg">
            <PreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/toast" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <p className="text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`// app/layout.tsx
import { Toaster } from "@/components/ui/toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

// anywhere in client code
import { toast } from "@/components/ui/toast"

toast("Event created")
toast.success("Changes saved")`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-8">
            <Example
              title={t.typesTitle}
              text={t.typesText}
              demo={<TypesDemo />}
              code={`toast("Plain toast")
toast.success("Changes saved")
toast.error("Could not save the file")
toast.warning("Disk is almost full")
toast.info("A new version is available")
toast.loading("Uploading the file")`}
            />

            <Example
              title={t.actionTitle}
              text={t.actionText}
              demo={<ActionDemo />}
              code={`toast("Message sent", {
  description: "Anna will get it in a minute.",
  action: {
    label: "Undo",
    onClick: () => toast.info("Message recalled"),
  },
  // cancel: { label: "Later" },
})`}
            />

            <Example
              title={t.promiseTitle}
              text={t.promiseText}
              demo={<PromiseDemo />}
              code={`toast.promise(saveDraft(), {
  loading: "Saving the draft…",
  success: (draft) => \`\${draft.name} saved\`,
  error: "The server did not answer",
})`}
            />

            <Example
              title={t.positionsTitle}
              text={t.positionsText}
              demo={<PositionDemo />}
              code={`<Toaster position="top-center" />
// top-left | top-center | top-right
// bottom-left | bottom-center | bottom-right

<Toaster position="bottom-left" offset={32} gap={10} />`}
            />

            <Example
              title={t.stackTitle}
              text={t.stackText}
              demo={<StackDemo />}
              code={`<Toaster visibleToasts={3} />
// <Toaster expand /> keeps the stack always expanded

for (const title of titles) toast(title)`}
            />

            <Example
              title={t.swipeTitle}
              text={t.swipeText}
              demo={<SwipeDemo />}
              code={`toast("Swipe me to the right", {
  description: "Drag past 45 px or flick it.",
  duration: 20000,
})`}
            />

            <Example
              title={t.foreverTitle}
              text={t.foreverText}
              demo={<ForeverDemo />}
              code={`toast.info("I do not close on my own", {
  duration: Infinity,
  closeButton: true,
})

toast.dismiss() // all toasts
toast.dismiss(id) // one toast`}
            />

            <Example
              title={t.updateTitle}
              text={t.updateText}
              demo={<UpdateDemo />}
              code={`toast.loading("Uploading 0%", { id: "upload" })
// later, the same id updates the toast in place
toast.loading("Uploading 60%", { id: "upload" })
toast.success("Upload finished", { id: "upload" })`}
            />

            <Example
              title={t.richTitle}
              text={t.richText}
              demo={<RichDemo />}
              code={`<Toaster richColors />
// <Toaster closeButton={false} />`}
            />

            <Example
              title={t.progressTitle}
              text={t.progressText}
              demo={<ProgressDemo />}
              code={`toast.success("Closes in 6 seconds", { duration: 6000 })
toast.success("No bar", { progress: false })`}
            />
          </div>
        </div>

        <Table
          id="props"
          title={t.props}
          head={[h.prop, h.type, h.default, h.description]}
          rows={[
            [
              "position",
              '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
              '"top-right"',
              t.p.position,
            ],
            ["visibleToasts", "number", "3", t.p.visibleToasts],
            ["expand", "boolean", "false", t.p.expand],
            ["richColors", "boolean", "false", t.p.richColors],
            ["closeButton", "boolean", "true", t.p.closeButton],
            ["gap", "number", "14", t.p.gap],
            ["offset", "number | string", "24 (16 on phones)", t.p.offset],
            ["dir", '"ltr" | "rtl" | "auto"', "-", t.p.dir],
            ["duration", "number", "4000", t.p.duration],
            ["hotkey", "string[]", '["altKey", "KeyT"]', t.p.hotkey],
            ["label", "string", '"Notifications"', t.p.label],
            ["closeLabel", "string", '"Close"', t.p.closeLabel],
            ["className", "string", "-", t.p.className],
            ["style", "CSSProperties", "-", t.p.style],
          ]}
        />

        <Table
          id="toast-options"
          title={t.toastOptions}
          head={[h.prop, h.type, h.default, h.description]}
          rows={[
            ["id", "string | number", "auto", t.o.id],
            ["description", "ReactNode", "-", t.o.description],
            ["duration", "number", "Toaster duration", t.o.duration],
            [
              "action",
              "{ label: ReactNode; onClick?: (event) => void }",
              "-",
              t.o.action,
            ],
            [
              "cancel",
              "{ label: ReactNode; onClick?: (event) => void }",
              "-",
              t.o.cancel,
            ],
            ["icon", "ReactNode", "icon of the type", t.o.icon],
            ["progress", "boolean", "true", t.o.progress],
            ["closeButton", "boolean", "Toaster value", t.o.closeButton],
            ["className", "string", "-", t.o.className],
            ["onDismiss", "(toast) => void", "-", t.o.onDismiss],
            ["onAutoClose", "(toast) => void", "-", t.o.onAutoClose],
          ]}
        />

        <Table
          id="methods"
          title={t.methods}
          head={[
            t.methodsHeaders.method,
            t.methodsHeaders.returns,
            t.methodsHeaders.description,
          ]}
          rows={[
            ["toast(title, options?)", "id", t.m.toast],
            [
              "toast.success | error | warning | info | loading",
              "id",
              t.m.typed,
            ],
            [
              "toast.promise(promise, { loading, success, error })",
              "id",
              t.m.promise,
            ],
            ["toast.dismiss(id?)", "void", t.m.dismiss],
          ]}
        />

        <div className="space-y-4">
          <h2
            id="features"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong> — {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
