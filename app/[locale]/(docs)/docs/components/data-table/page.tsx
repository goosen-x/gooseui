import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Badge } from "@/registry/gooseui/ui/badge"
import { Button } from "@/registry/gooseui/ui/button"
import {
  DataTable,
  type DataTableColumn,
} from "@/registry/gooseui/ui/data-table"
import { DataTableSelectionDemo, type DemoInvoice } from "./data-table-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

type InvoiceStatus = "paid" | "pending" | "overdue" | "draft"

const en = {
  description:
    "Server-rendered table with sorting, search, pagination and checkbox selection",
  intro:
    "A data table on a real <table>, rendered on the server: cells, badges and formatted numbers never reach the client bundle. A small client controller adds sorting, search and pagination by moving and hiding the existing rows. Row selection is native checkboxes: the highlight is pure CSS through :has(:checked), and inside a form the selected ids are submitted like any other field. The header and the first column stay pinned while you scroll.",
  browserSupport: "Browser Support",
  supportHas:
    "Highlights selected rows and shows the bulk actions. Without it selection still works, rows are just not tinted.",
  supportScrollDriven:
    "Fades in the shadow of the pinned column when you scroll sideways. Without it a static border marks the edge.",
  supportScripting:
    "Hides the pager, search and select-all when JavaScript is off, and shows every row instead of the first page.",
  supportColorMix: "Mixes the zebra, hover and selection tints.",
  supportSelect:
    "Styles the open list of the rows-per-page select; other browsers keep the native list.",
  preview: "Preview",
  previewHint:
    "Sort by any header, search by client or status, select a few rows: the toolbar appears and counts them.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  formTitle: "Selection in a form",
  formText:
    'Every row checkbox is <input name="selected" value={id}>. Put the table in a form and a Server Action receives the ids; the bulk buttons are ordinary submit buttons.',
  callbackTitle: "Selection callback and loading",
  callbackText:
    "Rendered from a client component, the table accepts onSelectionChange, onSortingChange and onPageChange. Here the selection sums the amounts, and the button toggles the skeleton rows.",
  wideTitle: "Wide table",
  wideText:
    "Twelve columns, far wider than the container. The checkbox and invoice columns are pinned on the left, the actions column on the right (stickyLastColumn). A fade and a round arrow button appear on the side that still has hidden columns, and each disappears at its end. Scroll with the arrows, the scrollbar, Shift + wheel, a swipe, or ← and → when the table is focused.",
  emptyTitle: "Empty and loading states",
  emptyText:
    "emptyState is shown when data is empty, noMatchState when the search finds nothing, loading renders skeleton rows.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pColumns: "Column definitions, see below",
  pData: "Rows",
  pGetRowId: "Stable id of a row; also the value of its checkbox",
  pCaption: "Accessible name of the table",
  pShowCaption: "Show the caption under the table",
  pDefaultSorting: "Order applied on the server",
  pSelectable: "Add a checkbox column",
  pDefaultSelected: "Rows checked on first render",
  pSelectName: "Form field name of the row checkboxes",
  pSearchable: "Search field that filters rows by their text",
  pToolbar: "Content next to the search field",
  pPageSize: "Rows per page; turns pagination on",
  pPageSizeOptions: "Show a rows per page select",
  pLoading: "Render skeleton rows",
  pLoadingRows: "Number of skeleton rows",
  pEmpty: "Content when data is empty",
  pNoMatch: "Content when the search finds nothing",
  pSticky: "Pin the first column and the checkboxes",
  pStriped: "Zebra rows",
  pStickyLast: "Pin the last column (row actions) to the right edge",
  pScrollButtons:
    "Round arrow buttons on the edges of a table wider than its container; touch screens swipe instead",
  pMaxHeight: "Height of the scroll area, so the header sticks inside",
  pLabels: "Texts for screen readers, the search and the pager",
  pCallbacks: "Client only: selection, sorting and page callbacks",
  columnsTitle: "DataTableColumn",
  columnHeader: "Field",
  cId: "Unique column id",
  cHeader: "Header content",
  cAccessor: "Raw value for the default cell and for sorting",
  cCell: "Custom cell content",
  cSortable: "Make the header a sort button",
  cSortValue: "Value to sort by instead of the accessor",
  cAlign: "Text alignment; numeric columns align right",
  cNumeric: "Tabular figures",
  cWidth: "Column width",
  toolbarTitle: "Toolbar hooks",
  toolbarHeader: "Attribute",
  tSelectionOnly: "Shown only while at least one row is selected (CSS :has)",
  tSelectedCount: "Its text becomes the number of selected rows",
  tClear: "A click clears the selection",
  features: "Features",
  featureList: [
    [
      "Server first",
      "rows and cells render on the server; the client part only moves and hides rows",
    ],
    [
      "Works without JavaScript",
      "every row is shown, checkboxes are highlighted and submitted with a form",
    ],
    [
      "Real table semantics",
      "caption, scope, aria-sort, aria-rowindex and aria-rowcount for screen readers",
    ],
    [
      "Keyboard",
      "the scroll area is focusable, headers are buttons, checkboxes are native",
    ],
    [
      "Sticky header and first column",
      "cells keep an opaque background so nothing shows through",
    ],
    [
      "Scroll arrows and edge fades",
      "a wide table gets round arrow buttons and a fade on the sides that still hide columns; each goes away at its end, on touch screens swipe instead, and a table that fits shows none of it",
    ],
    [
      "Pinned actions column",
      "stickyLastColumn keeps the last column on the right edge with a soft shadow while columns scroll under it",
    ],
    ["Reduced motion", "no background transitions and no skeleton pulse"],
  ],
  table: {
    caption: "Invoices",
    number: "Invoice",
    client: "Client",
    status: "Status",
    due: "Due date",
    amount: "Amount",
    wide: {
      issued: "Issued",
      vat: "VAT",
      currency: "Currency",
      method: "Payment method",
      manager: "Manager",
      project: "Project",
      actions: "Actions",
      open: "Open",
      methods: ["Bank transfer", "Card", "Invoice", "PayPal"],
      managers: ["Alice Moore", "Ben Carter", "Chloe Reed", "Dan Wells"],
      projects: [
        "Website redesign",
        "Mobile app",
        "Brand identity",
        "Analytics",
      ],
    },
    statuses: {
      paid: "Paid",
      pending: "Pending",
      overdue: "Overdue",
      draft: "Draft",
    },
    selected: "selected",
    bulk: "Bulk actions",
    remind: "Send reminder",
    export: "Export CSV",
    remove: "Delete",
    clear: "Clear selection",
    empty: "No disputed invoices. Nice.",
    noMatch: "No invoices match your search.",
    currency: "USD",
    locale: "en-US",
    labels: {
      table: "Table",
      search: "Search invoices",
      searchPlaceholder: "Client, number or status…",
      selectAll: "Select all rows on this page",
      selectRow: "Select row",
      rowsPerPage: "Rows per page",
      range: "{from}–{to} of {total}",
      previousPage: "Previous page",
      nextPage: "Next page",
      scrollLeft: "Scroll left",
      scrollRight: "Scroll right",
      loading: "Loading rows…",
    },
    clients: [
      ["Northwind Traders", "ap@northwind.com"],
      ["Lumen Dental Group", "billing@lumendental.com"],
      ["Harbor & Pine Architects", "finance@harborpine.com"],
      ["Kestrel Logistics", "invoices@kestrel.io"],
      ["Bramble Coffee Roasters", "hello@bramblecoffee.co"],
      ["Atlas Physio", "admin@atlasphysio.com"],
      ["Greyfield Legal LLP", "accounts@greyfield.law"],
      ["Orbit Analytics", "ap@orbitanalytics.ai"],
      ["Marigold Events", "team@marigoldevents.com"],
      ["Stonebridge Schools", "procurement@stonebridge.edu"],
    ],
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Таблица, которая рендерится на сервере: сортировка, поиск, страницы и выбор строк",
    intro:
      "Таблица данных на настоящем <table>, которая рендерится на сервере: ячейки, бейджи и форматирование чисел не попадают в клиентский бандл. Небольшой клиентский контроллер добавляет сортировку, поиск и страницы, переставляя и скрывая уже готовые строки. Выбор строк сделан на нативных чекбоксах: подсветка — чистый CSS через :has(:checked), а внутри формы выбранные id отправляются как обычное поле. Шапка и первая колонка остаются на месте при прокрутке.",
    browserSupport: "Поддержка браузеров",
    supportHas:
      "Подсвечивает выбранные строки и показывает массовые действия. Без него выбор работает, просто строки не подкрашиваются.",
    supportScrollDriven:
      "Проявляет тень закреплённой колонки при прокрутке вбок. Без них край отмечает обычная граница.",
    supportScripting:
      "Прячет пагинацию, поиск и «выбрать все», когда JavaScript выключен, и показывает все строки вместо первой страницы.",
    supportColorMix: "Смешивает оттенки зебры, наведения и выбора.",
    supportSelect:
      "Оформляет открытый список выбора строк на странице; остальные браузеры показывают системный.",
    preview: "Превью",
    previewHint:
      "Отсортируйте по любому заголовку, поищите по клиенту или статусу, отметьте пару строк: появится панель действий со счётчиком.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    formTitle: "Выбор строк в форме",
    formText:
      'Каждый чекбокс строки — это <input name="selected" value={id}>. Положите таблицу в форму, и Server Action получит id выбранных строк; кнопки массовых действий — обычные кнопки отправки.',
    callbackTitle: "Колбэк выбора и загрузка",
    callbackText:
      "Если таблицу рендерит клиентский компонент, ей можно передать onSelectionChange, onSortingChange и onPageChange. Здесь по выбранным строкам считается сумма, а кнопка включает строки-скелетоны.",
    wideTitle: "Широкая таблица",
    wideText:
      "Двенадцать колонок, заметно шире контейнера. Чекбокс и номер счёта закреплены слева, колонка действий справа (stickyLastColumn). С той стороны, где ещё есть скрытые колонки, появляются затемнение и круглая стрелка, а в конце прокрутки они пропадают. Листайте стрелками, полосой прокрутки, Shift + колесо, свайпом или клавишами ← и → на сфокусированной таблице.",
    emptyTitle: "Пустое состояние и загрузка",
    emptyText:
      "emptyState показывается, когда data пустой, noMatchState — когда поиск ничего не нашёл, loading рисует строки-скелетоны.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pColumns: "Описание колонок, см. ниже",
    pData: "Строки",
    pGetRowId: "Постоянный id строки, он же value её чекбокса",
    pCaption: "Доступное имя таблицы",
    pShowCaption: "Показать подпись под таблицей",
    pDefaultSorting: "Порядок, который применяется на сервере",
    pSelectable: "Добавить колонку с чекбоксами",
    pDefaultSelected: "Строки, отмеченные при первой отрисовке",
    pSelectName: "Имя поля формы у чекбоксов строк",
    pSearchable: "Поле поиска, которое фильтрует строки по тексту",
    pToolbar: "Содержимое рядом с полем поиска",
    pPageSize: "Строк на странице; включает пагинацию",
    pPageSizeOptions: "Показать выбор числа строк на странице",
    pLoading: "Нарисовать строки-скелетоны",
    pLoadingRows: "Сколько строк-скелетонов",
    pEmpty: "Что показать, если data пустой",
    pNoMatch: "Что показать, если поиск ничего не нашёл",
    pSticky: "Закрепить первую колонку и чекбоксы",
    pStriped: "Строки через одну с фоном",
    pStickyLast: "Закрепить последнюю колонку (действия) у правого края",
    pScrollButtons:
      "Круглые стрелки по краям таблицы, которая шире контейнера; на сенсорных экранах листают свайпом",
    pMaxHeight: "Высота области прокрутки, чтобы шапка липла внутри",
    pLabels: "Тексты для скринридеров, поиска и пагинации",
    pCallbacks: "Только на клиенте: колбэки выбора, сортировки и страницы",
    columnsTitle: "DataTableColumn",
    columnHeader: "Поле",
    cId: "Уникальный id колонки",
    cHeader: "Содержимое заголовка",
    cAccessor: "Исходное значение для ячейки по умолчанию и для сортировки",
    cCell: "Своё содержимое ячейки",
    cSortable: "Сделать заголовок кнопкой сортировки",
    cSortValue: "Значение для сортировки вместо accessor",
    cAlign: "Выравнивание; числовые колонки по правому краю",
    cNumeric: "Цифры одинаковой ширины",
    cWidth: "Ширина колонки",
    toolbarTitle: "Атрибуты для панели",
    toolbarHeader: "Атрибут",
    tSelectionOnly: "Виден, только пока выбрана хотя бы одна строка (CSS :has)",
    tSelectedCount: "Текст элемента заменяется числом выбранных строк",
    tClear: "Клик снимает выбор со всех строк",
    features: "Возможности",
    featureList: [
      [
        "Сначала сервер",
        "строки и ячейки рендерятся на сервере; клиентская часть только переставляет и прячет строки",
      ],
      [
        "Работает без JavaScript",
        "видны все строки, чекбоксы подсвечиваются и отправляются с формой",
      ],
      [
        "Настоящая семантика таблицы",
        "caption, scope, aria-sort, aria-rowindex и aria-rowcount для скринридеров",
      ],
      [
        "Клавиатура",
        "область прокрутки получает фокус, заголовки — кнопки, чекбоксы нативные",
      ],
      [
        "Липкая шапка и первая колонка",
        "у ячеек непрозрачный фон, под ними ничего не просвечивает",
      ],
      [
        "Стрелки и затемнение у краёв",
        "у широкой таблицы с той стороны, где ещё есть скрытые колонки, появляются круглая стрелка и затемнение; в конце прокрутки они пропадают, на сенсорных экранах листают свайпом, а если всё помещается, их нет",
      ],
      [
        "Закреплённая колонка действий",
        "stickyLastColumn держит последнюю колонку у правого края с мягкой тенью, пока остальные колонки уходят под неё",
      ],
      ["Меньше движения", "без переходов фона и без пульсации скелетонов"],
    ],
    table: {
      caption: "Счета",
      number: "Счёт",
      client: "Клиент",
      status: "Статус",
      due: "Срок оплаты",
      amount: "Сумма",
      wide: {
        issued: "Выставлен",
        vat: "НДС",
        currency: "Валюта",
        method: "Способ оплаты",
        manager: "Менеджер",
        project: "Проект",
        actions: "Действия",
        open: "Открыть",
        methods: ["Банковский перевод", "Карта", "По счёту", "СБП"],
        managers: [
          "Анна Морозова",
          "Борис Карпов",
          "Вера Рыжова",
          "Денис Уваров",
        ],
        projects: [
          "Редизайн сайта",
          "Мобильное приложение",
          "Фирменный стиль",
          "Аналитика",
        ],
      },
      statuses: {
        paid: "Оплачен",
        pending: "Ждёт оплаты",
        overdue: "Просрочен",
        draft: "Черновик",
      },
      selected: "выбрано",
      bulk: "Действия с выбранными",
      remind: "Напомнить",
      export: "Выгрузить CSV",
      remove: "Удалить",
      clear: "Снять выбор",
      empty: "Спорных счетов нет. Отлично.",
      noMatch: "По запросу счетов не нашлось.",
      currency: "RUB",
      locale: "ru-RU",
      labels: {
        table: "Таблица",
        search: "Поиск по счетам",
        searchPlaceholder: "Клиент, номер или статус…",
        selectAll: "Выбрать все строки на странице",
        selectRow: "Выбрать строку",
        rowsPerPage: "Строк на странице",
        range: "{from}–{to} из {total}",
        previousPage: "Предыдущая страница",
        nextPage: "Следующая страница",
        scrollLeft: "Прокрутить влево",
        scrollRight: "Прокрутить вправо",
        loading: "Загружаем строки…",
      },
      clients: [
        ["ООО «Северный ветер»", "buh@sev-veter.ru"],
        ["Стоматология «Люмен»", "oplata@lumen-dent.ru"],
        ["Бюро «Гавань и сосны»", "finance@gavan-sosny.ru"],
        ["ТК «Пустельга»", "schet@pustelga.ru"],
        ["Обжарка «Ежевика»", "hello@ezhevika.coffee"],
        ["Клиника «Атлант»", "admin@atlant-clinic.ru"],
        ["Юрфирма «Серое поле»", "accounts@seroe-pole.law"],
        ["«Орбита Аналитика»", "ap@orbita.ai"],
        ["Агентство «Календула»", "team@kalendula.events"],
        ["Школа «Каменный мост»", "zakupki@kammost.edu.ru"],
      ],
    },
  },
}

type T = typeof en

function makeInvoices(t: T): DemoInvoice[] {
  const statuses: InvoiceStatus[] = [
    "paid",
    "paid",
    "pending",
    "overdue",
    "paid",
    "draft",
    "pending",
  ]
  const rate = t.table.currency === "RUB" ? 92 : 1
  return Array.from({ length: 37 }, (_, i) => {
    const [client, email] = t.table.clients[(i * 7) % t.table.clients.length]
    const issued = new Date(Date.UTC(2026, 10, 20) - i * 3.4 * 86_400_000)
    const amount =
      Math.round(((i * 7919) % 9000) + 240 + ((i * 37) % 100) / 100) +
      ((i * 13) % 100) / 100
    return {
      number: `INV-${String(2041 - i).padStart(4, "0")}`,
      client,
      email,
      status: statuses[(i * 5) % statuses.length],
      amount: Math.round(amount * rate * 100) / 100,
      issued,
      due: new Date(issued.getTime() + 30 * 86_400_000),
    }
  })
}

// Amber for "waiting": a pending payment is a pause, not information; red stays
// reserved for the single overdue state
const statusTone = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
  draft: "muted",
} as const

function makeColumns(t: T, wide = false): DataTableColumn<DemoInvoice>[] {
  const money = new Intl.NumberFormat(t.table.locale, {
    style: "currency",
    currency: t.table.currency,
    maximumFractionDigits: 0,
  })
  const thisYear = new Date().getUTCFullYear()
  const dayOnly = new Intl.DateTimeFormat(t.table.locale, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
  const dayYear = new Intl.DateTimeFormat(t.table.locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
  // Current year without the year; other years with it ("16 нояб. 2025")
  const day = (d: Date) =>
    d.getUTCFullYear() === thisYear
      ? dayOnly.format(d)
      : dayYear.format(d).replace(/\s?г\.$/, "")
  const base: DataTableColumn<DemoInvoice>[] = [
    {
      id: "number",
      header: t.table.number,
      accessor: (r) => r.number,
      sortable: true,
      numeric: true,
      align: "left",
      width: "6rem",
    },
    {
      id: "client",
      header: t.table.client,
      accessor: (r) => r.client,
      sortable: true,
      cell: (r) => (
        <div className="max-w-36 leading-tight">
          <div className="truncate text-sm font-medium text-foreground">
            {r.client}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {r.email}
          </div>
        </div>
      ),
    },
    {
      id: "status",
      header: t.table.status,
      accessor: (r) => t.table.statuses[r.status],
      sortable: true,
      cell: (r) => (
        <Badge variant="status" dot tone={statusTone[r.status]}>
          {t.table.statuses[r.status]}
        </Badge>
      ),
    },
    {
      id: "due",
      header: t.table.due,
      accessor: (r) => r.due,
      sortable: true,
      numeric: true,
      align: "left",
      cell: (r) => day(r.due),
    },
    {
      id: "amount",
      header: t.table.amount,
      accessor: (r) => r.amount,
      sortable: true,
      numeric: true,
      cell: (r) => money.format(r.amount),
    },
  ]
  if (!wide) return base
  const w = t.table.wide
  const seed = (r: DemoInvoice) => Number(r.number.slice(-4))
  const text = (
    id: string,
    header: string,
    pick: (r: DemoInvoice) => string,
  ): DataTableColumn<DemoInvoice> => ({
    id,
    header,
    accessor: pick,
    sortable: true,
  })
  const [number, client, status, due, amount] = [
    base[0],
    base[1],
    base[2],
    base[3],
    base[4],
  ]
  return [
    number,
    client,
    status,
    {
      id: "issued",
      header: w.issued,
      accessor: (r) => r.issued,
      sortable: true,
      numeric: true,
      align: "left",
      cell: (r) => day(r.issued),
    },
    due,
    amount,
    {
      id: "vat",
      header: w.vat,
      accessor: (r) => r.amount * 0.2,
      sortable: true,
      numeric: true,
      cell: (r) => money.format(r.amount * 0.2),
    },
    text("currency", w.currency, () => t.table.currency),
    text("method", w.method, (r) => w.methods[seed(r) % w.methods.length]),
    text("manager", w.manager, (r) => w.managers[seed(r) % w.managers.length]),
    text(
      "project",
      w.project,
      (r) => w.projects[(seed(r) * 3) % w.projects.length],
    ),
    {
      id: "actions",
      header: w.actions,
      accessor: () => "",
      align: "right",
      cell: (r) => (
        <Button
          size="sm"
          variant="outline"
          aria-label={`${w.open} ${r.number}`}
        >
          {w.open}
        </Button>
      ),
    },
  ]
}

const toolButton =
  "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border bg-background px-3 text-sm font-medium shadow-xs hover:bg-accent dark:border-input dark:bg-input/30"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Data Table", description: t.description }
}

export default async function DataTablePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const invoices = makeInvoices(t)
  const columns = makeColumns(t)
  const wideColumns = makeColumns(t, true)

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const rows: [string, string, string, string][] = [
    ["columns", "DataTableColumn<T>[]", "-", t.pColumns],
    ["data", "T[]", "-", t.pData],
    ["getRowId", "(row: T, index: number) => string", "-", t.pGetRowId],
    ["caption", "ReactNode", "-", t.pCaption],
    ["showCaption", "boolean", "false", t.pShowCaption],
    [
      "defaultSorting",
      '{ columnId: string; direction: "asc" | "desc" } | null',
      "null",
      t.pDefaultSorting,
    ],
    ["selectable", "boolean", "false", t.pSelectable],
    ["defaultSelectedIds", "string[]", "-", t.pDefaultSelected],
    ["selectName", "string", '"selected"', t.pSelectName],
    ["searchable", "boolean", "false", t.pSearchable],
    ["toolbar", "ReactNode", "-", t.pToolbar],
    ["pageSize", "number", "-", t.pPageSize],
    ["pageSizeOptions", "number[]", "-", t.pPageSizeOptions],
    ["loading", "boolean", "false", t.pLoading],
    ["loadingRows", "number", "5", t.pLoadingRows],
    ["emptyState", "ReactNode", '"No results."', t.pEmpty],
    ["noMatchState", "ReactNode", '"No matching rows."', t.pNoMatch],
    ["stickyFirstColumn", "boolean", "true", t.pSticky],
    ["striped", "boolean", "false", t.pStriped],
    ["stickyLastColumn", "boolean", "false", t.pStickyLast],
    ["scrollButtons", "boolean", "true", t.pScrollButtons],
    ["maxHeight", "number | string", "-", t.pMaxHeight],
    ["labels", "Partial<DataTableLabels>", "English", t.pLabels],
    [
      "onSelectionChange / onSortingChange / onPageChange",
      "function",
      "-",
      t.pCallbacks,
    ],
  ]

  const columnRows: [string, string, string][] = [
    ["id", "string", t.cId],
    ["header", "ReactNode", t.cHeader],
    ["accessor", "(row: T) => unknown", t.cAccessor],
    ["cell", "(row: T, value: unknown) => ReactNode", t.cCell],
    ["sortable", "boolean", t.cSortable],
    ["sortValue", "(row: T) => string | number | Date | null", t.cSortValue],
    ["align", '"left" | "center" | "right"', t.cAlign],
    ["numeric", "boolean", t.cNumeric],
    ["width", "number | string", t.cWidth],
  ]

  const toolbarRows: [string, string][] = [
    ["data-selection-only", t.tSelectionOnly],
    ["data-selected-count", t.tSelectedCount],
    ["data-table-clear-selection", t.tClear],
  ]

  const bulkToolbar = (
    <div
      data-selection-only
      role="toolbar"
      aria-label={t.table.bulk}
      className="ml-auto flex flex-wrap items-center gap-2 text-sm"
    >
      <span className="tabular-nums text-muted-foreground">
        <strong data-selected-count className="text-foreground">
          0
        </strong>{" "}
        {t.table.selected}
      </span>
      <button type="button" className={toolButton}>
        {t.table.remind}
      </button>
      <button type="button" className={toolButton}>
        {t.table.export}
      </button>
      <button
        type="button"
        data-table-clear-selection
        className={toolButton}
        aria-label={t.table.clear}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )

  const thead = (cells: string[]) => (
    <thead className="bg-muted">
      <tr>
        {cells.map((cell) => (
          <th key={cell} className="p-3 text-left font-medium">
            {cell}
          </th>
        ))}
      </tr>
    </thead>
  )

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Data Table" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            { featureId: "has", description: t.supportHas },
            {
              featureId: "scroll-driven-animations",
              description: t.supportScrollDriven,
            },
            { featureId: "scripting", description: t.supportScripting },
            { featureId: "color-mix", description: t.supportColorMix },
            {
              featureId: "customizable-select",
              description: t.supportSelect,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="rounded-lg bg-muted/30 px-4 py-8">
            <DataTable
              caption={t.table.caption}
              columns={columns}
              data={invoices}
              getRowId={(r) => r.number}
              selectable
              searchable
              toolbar={bulkToolbar}
              defaultSorting={{ columnId: "due", direction: "desc" }}
              pageSize={8}
              pageSizeOptions={[8, 16, 32]}
              maxHeight="26rem"
              noMatchState={t.table.noMatch}
              labels={t.table.labels}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/data-table" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { DataTable, type DataTableColumn } from "@/components/ui/data-table"

type Invoice = {
  number: string; client: string; amount: number; due: Date
  status: "paid" | "pending" | "overdue" | "draft"
}

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

const year = new Date().getUTCFullYear()
const formatDay = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric",
    year: d.getUTCFullYear() === year ? undefined : "numeric",
  }).format(d)

const tones = { paid: "success", pending: "warning", overdue: "danger", draft: "muted" } as const

const columns: DataTableColumn<Invoice>[] = [
  { id: "number", header: "Invoice", accessor: (r) => r.number, sortable: true,
    numeric: true, align: "left" },
  { id: "client", header: "Client", accessor: (r) => r.client, sortable: true },
  { id: "status", header: "Status", accessor: (r) => r.status, sortable: true,
    // Quiet status: a coloured dot plus plain text, red only for the one that needs action
    cell: (r) => <Badge variant="status" dot tone={tones[r.status]}>{r.status}</Badge> },
  { id: "due", header: "Due date", accessor: (r) => r.due, sortable: true,
    numeric: true, align: "left",
    // "Nov 16" this year, "Nov 16, 2025" otherwise
    cell: (r) => formatDay(r.due) },
  { id: "amount", header: "Amount", accessor: (r) => r.amount, sortable: true,
    numeric: true, cell: (r) => money.format(r.amount) },
]

// A Server Component: columns with cell functions stay on the server
export default async function Invoices() {
  const invoices = await getInvoices()
  return (
    <DataTable
      caption="Invoices"
      columns={columns}
      data={invoices}
      getRowId={(r) => r.number}
      defaultSorting={{ columnId: "due", direction: "desc" }}
      searchable
      pageSize={10}
    />
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.formTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.formText}</p>
              <CodeBlock>{`async function deleteInvoices(formData: FormData) {
  "use server"
  const ids = formData.getAll("selected") // ["INV-2041", "INV-2038"]
  await db.invoice.deleteMany({ where: { number: { in: ids } } })
  revalidatePath("/invoices")
}

<form action={deleteInvoices}>
  <DataTable
    selectable
    columns={columns}
    data={invoices}
    getRowId={(r) => r.number}
    toolbar={
      <div data-selection-only className="ml-auto flex items-center gap-2">
        <span><b data-selected-count>0</b> selected</span>
        <button type="submit">Delete</button>
        <button type="button" data-table-clear-selection>Clear</button>
      </div>
    }
  />
</form>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.callbackTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.callbackText}
              </p>
              <div className="rounded-lg bg-muted/30 px-4 py-8">
                <DataTableSelectionDemo invoices={invoices.slice(0, 12)} />
              </div>
              <CodeBlock className="mt-4">{`"use client"

const [selected, setSelected] = useState<string[]>([])
const total = invoices
  .filter((r) => selected.includes(r.number))
  .reduce((sum, r) => sum + r.amount, 0)

<DataTable
  selectable
  loading={loading}
  columns={columns}
  data={invoices}
  getRowId={(r) => r.number}
  onSelectionChange={setSelected}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.wideTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.wideText}</p>
              <div className="rounded-lg bg-muted/30 px-4 py-8">
                <DataTable
                  caption={t.table.caption}
                  columns={wideColumns}
                  data={invoices.slice(0, 12)}
                  getRowId={(r) => r.number}
                  selectable
                  stickyLastColumn
                  selectName="wide"
                  maxHeight="20rem"
                  labels={t.table.labels}
                />
              </div>
              <CodeBlock className="mt-4">{`// 12 columns; the last one is the "Actions" column
<DataTable
  selectable
  stickyLastColumn
  columns={columns}
  data={invoices}
  getRowId={(r) => r.number}
  maxHeight="20rem"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.emptyTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.emptyText}
              </p>
              <div className="space-y-4 rounded-lg bg-muted/30 px-4 py-8">
                <DataTable
                  caption={t.table.caption}
                  columns={columns}
                  data={[]}
                  getRowId={(r) => r.number}
                  emptyState={t.table.empty}
                  labels={t.table.labels}
                />
                <DataTable
                  caption={t.table.caption}
                  columns={columns.filter((c) => c.id !== "status")}
                  data={invoices.slice(0, 3)}
                  getRowId={(r) => r.number}
                  loading
                  loadingRows={3}
                  labels={t.table.labels}
                />
              </div>
              <CodeBlock className="mt-4">{`<DataTable data={[]} emptyState="No disputed invoices. Nice." {...props} />
<DataTable loading loadingRows={3} {...props} />`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              {thead([
                t.headers.prop,
                t.headers.type,
                t.headers.default,
                t.headers.description,
              ])}
              <tbody>
                {rows.map(([prop, type, def, description]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="pt-2 text-lg font-medium">{t.columnsTitle}</h3>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              {thead([t.columnHeader, t.headers.type, t.headers.description])}
              <tbody>
                {columnRows.map(([field, type, description]) => (
                  <tr key={field} className="border-t">
                    <td className="p-3 font-mono text-xs">{field}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="pt-2 text-lg font-medium">{t.toolbarTitle}</h3>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              {thead([t.toolbarHeader, t.headers.description])}
              <tbody>
                {toolbarRows.map(([attribute, description]) => (
                  <tr key={attribute} className="border-t">
                    <td className="p-3 font-mono text-xs">{attribute}</td>
                    <td className="p-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
