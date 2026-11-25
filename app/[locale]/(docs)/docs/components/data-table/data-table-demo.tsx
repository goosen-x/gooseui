"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import {
  DataTable,
  type DataTableColumn,
} from "@/registry/gooseui/ui/data-table"

export type DemoInvoice = {
  number: string
  client: string
  email: string
  status: "paid" | "pending" | "overdue" | "draft"
  amount: number
  issued: Date
  due: Date
}

const en = {
  locale: "en-US",
  currency: "USD",
  caption: "Recent invoices",
  number: "Invoice",
  client: "Client",
  amount: "Amount",
  issued: "Issued",
  selected: "{count} selected, total {total}",
  nothing: "Select rows to see the total",
  showData: "Show data",
  showLoading: "Show loading state",
  labels: {
    table: "Table",
    selectAll: "Select all rows on this page",
    selectRow: "Select row",
    scrollLeft: "Scroll left",
    scrollRight: "Scroll right",
    loading: "Loading rows…",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    locale: "ru-RU",
    currency: "RUB",
    caption: "Последние счета",
    number: "Счёт",
    client: "Клиент",
    amount: "Сумма",
    issued: "Выставлен",
    selected: "Выбрано: {count}, на сумму {total}",
    nothing: "Отметьте строки, чтобы увидеть сумму",
    showData: "Показать данные",
    showLoading: "Показать загрузку",
    labels: {
      table: "Таблица",
      selectAll: "Выбрать все строки на странице",
      selectRow: "Выбрать строку",
      scrollLeft: "Прокрутить влево",
      scrollRight: "Прокрутить вправо",
      loading: "Загружаем строки…",
    },
  },
}

/** Rendered from a client component, so the callbacks are allowed. */
export function DataTableSelectionDemo({
  invoices,
}: {
  invoices: DemoInvoice[]
}) {
  const t = content[useLocale() as Locale]
  const [selected, setSelected] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)

  const money = new Intl.NumberFormat(t.locale, {
    style: "currency",
    currency: t.currency,
  })
  const dayOnly = new Intl.DateTimeFormat(t.locale, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
  const dayYear = new Intl.DateTimeFormat(t.locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
  const thisYear = new Date().getUTCFullYear()
  const day = (d: Date) =>
    d.getUTCFullYear() === thisYear
      ? dayOnly.format(d)
      : dayYear.format(d).replace(/\s?г\.$/, "")
  const columns: DataTableColumn<DemoInvoice>[] = [
    {
      id: "number",
      header: t.number,
      accessor: (r) => r.number,
      sortable: true,
      align: "left",
      numeric: true,
    },
    {
      id: "client",
      header: t.client,
      accessor: (r) => r.client,
      sortable: true,
    },
    {
      id: "issued",
      header: t.issued,
      accessor: (r) => r.issued,
      sortable: true,
      align: "left",
      numeric: true,
      cell: (r) => day(r.issued),
    },
    {
      id: "amount",
      header: t.amount,
      accessor: (r) => r.amount,
      sortable: true,
      numeric: true,
      cell: (r) => money.format(r.amount),
    },
  ]

  const total = invoices
    .filter((r) => selected.includes(r.number))
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm tabular-nums">
          {selected.length > 0
            ? t.selected
                .replace("{count}", String(selected.length))
                .replace("{total}", money.format(total))
            : t.nothing}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setLoading((v) => !v)}
        >
          {loading ? t.showData : t.showLoading}
        </Button>
      </div>
      <DataTable
        caption={t.caption}
        columns={columns}
        data={invoices}
        getRowId={(r) => r.number}
        selectable
        selectName="recent"
        defaultSelectedIds={selected}
        loading={loading}
        maxHeight="22rem"
        labels={t.labels}
        onSelectionChange={setSelected}
      />
    </div>
  )
}
