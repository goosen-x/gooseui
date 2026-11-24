import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Badge } from "@/registry/gooseui/ui/badge"
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
  narrowTitle: "Narrow container",
  narrowText:
    "Scroll sideways: the checkbox and invoice columns stay pinned, and a shadow appears on their edge.",
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
    ["Reduced motion", "no background transitions and no skeleton pulse"],
  ],
  table: {
    caption: "Invoices",
    number: "Invoice",
    client: "Client",
    status: "Status",
    issued: "Issued",
    due: "Due",
    amount: "Amount",
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
    narrowTitle: "Узкий контейнер",
    narrowText:
      "Прокрутите вбок: колонки с чекбоксами и номерами счетов остаются на месте, а на их краю появляется тень.",
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
      ["Меньше движения", "без переходов фона и без пульсации скелетонов"],
    ],
    table: {
      caption: "Счета",
      number: "Счёт",
      client: "Клиент",
      status: "Статус",
      issued: "Выставлен",
      due: "Оплатить до",
      amount: "Сумма",
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

const statusBadge = {
  paid: "success",
  pending: "info",
  overdue: "destructive",
  draft: "neutral",
} as const

function makeColumns(t: T): DataTableColumn<DemoInvoice>[] {
  const money = new Intl.NumberFormat(t.table.locale, {
    style: "currency",
    currency: t.table.currency,
  })
  const day = new Intl.DateTimeFormat(t.table.locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
  return [
    {
      id: "number",
      header: t.table.number,
      accessor: (r) => r.number,
      sortable: true,
      width: "8rem",
    },
    {
      id: "client",
      header: t.table.client,
      accessor: (r) => r.client,
      sortable: true,
      cell: (r) => (
        <div className="leading-tight">
          <div className="font-medium text-foreground">{r.client}</div>
          <div className="text-xs text-muted-foreground">{r.email}</div>
        </div>
      ),
    },
    {
      id: "status",
      header: t.table.status,
      accessor: (r) => t.table.statuses[r.status],
      sortable: true,
      cell: (r) => (
        <Badge variant={statusBadge[r.status]}>
          {t.table.statuses[r.status]}
        </Badge>
      ),
    },
    {
      id: "issued",
      header: t.table.issued,
      accessor: (r) => r.issued,
      sortable: true,
      numeric: true,
      align: "left",
      cell: (r) => day.format(r.issued),
    },
    {
      id: "due",
      header: t.table.due,
      accessor: (r) => r.due,
      sortable: true,
      numeric: true,
      align: "left",
      cell: (r) => day.format(r.due),
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
              defaultSorting={{ columnId: "issued", direction: "desc" }}
              pageSize={8}
              pageSizeOptions={[8, 16, 32]}
              maxHeight="26rem"
              striped
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

type Invoice = { number: string; client: string; amount: number; issued: Date }

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

const columns: DataTableColumn<Invoice>[] = [
  { id: "number", header: "Invoice", accessor: (r) => r.number, sortable: true },
  { id: "client", header: "Client", accessor: (r) => r.client, sortable: true },
  { id: "issued", header: "Issued", accessor: (r) => r.issued, sortable: true,
    cell: (r) => r.issued.toLocaleDateString("en-US") },
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
      defaultSorting={{ columnId: "issued", direction: "desc" }}
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
              <h3 className="mb-3 text-lg font-medium">{t.narrowTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.narrowText}
              </p>
              <div className="rounded-lg bg-muted/30 px-4 py-8">
                <div className="max-w-md">
                  <DataTable
                    caption={t.table.caption}
                    columns={columns}
                    data={invoices.slice(0, 12)}
                    getRowId={(r) => r.number}
                    selectable
                    selectName="narrow"
                    maxHeight="20rem"
                    tableClassName="min-w-[48rem]"
                    labels={t.table.labels}
                  />
                </div>
              </div>
              <CodeBlock className="mt-4">{`<DataTable
  selectable
  columns={columns}
  data={invoices}
  getRowId={(r) => r.number}
  maxHeight="20rem"
  tableClassName="min-w-[48rem]"
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
                  columns={columns.filter((c) => c.id !== "due")}
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
