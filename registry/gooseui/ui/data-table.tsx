import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/gooseui/ui/button"
import {
  DataTableController,
  type DataTableSorting,
} from "@/registry/gooseui/ui/data-table.client"
import { Select, SelectOption } from "@/registry/gooseui/ui/select"

export type {
  DataTableSortDirection,
  DataTableSorting,
} from "@/registry/gooseui/ui/data-table.client"

export type DataTableColumn<T> = {
  id: string
  header: React.ReactNode
  /** Raw value used for the default cell and for sorting */
  accessor: (row: T) => unknown
  /** Custom cell content. Default: the accessor value as text */
  cell?: (row: T, value: unknown) => React.ReactNode
  sortable?: boolean
  /** Value to sort by when the accessor value does not sort well. Numbers sort numerically, strings with a natural collator */
  sortValue?: (row: T) => string | number | Date | null | undefined
  /** Default "right" for numeric columns, "left" otherwise */
  align?: "left" | "center" | "right"
  /** Tabular figures; aligns right unless `align` is set */
  numeric?: boolean
  /** CSS width of the column, e.g. 160 or "12rem" */
  width?: number | string
}

export type DataTableLabels = {
  /** Accessible name of the scroll region when there is no string caption */
  table: string
  search: string
  searchPlaceholder: string
  selectAll: string
  selectRow: string
  rowsPerPage: React.ReactNode
  /** `{from}`, `{to}` and `{total}` are replaced */
  range: string
  previousPage: string
  nextPage: string
  scrollLeft: string
  scrollRight: string
  loading: string
}

export type DataTableProps<T> = Omit<
  React.ComponentProps<"div">,
  "children" | "onChange"
> & {
  columns: DataTableColumn<T>[]
  data: T[]
  getRowId: (row: T, index: number) => string
  /** Accessible name of the table */
  caption?: React.ReactNode
  /** Show the caption visually (it is always available to screen readers) */
  showCaption?: boolean

  /** Sorting applied on the server; headers cycle ascending, descending, none */
  defaultSorting?: DataTableSorting

  /** Add a checkbox column */
  selectable?: boolean
  defaultSelectedIds?: string[]
  /** Form field name of the row checkboxes: a surrounding form receives the selected ids. Default "selected" */
  selectName?: string

  /** Show a search field that filters rows by their text */
  searchable?: boolean
  /**
   * Content next to the search field. Elements with `data-selection-only` show
   * only while rows are selected; the text of `data-selected-count` elements
   * becomes the number of selected rows; a click on `data-table-clear-selection`
   * clears the selection.
   */
  toolbar?: React.ReactNode

  /** Enables pagination with this many rows per page */
  pageSize?: number
  /** Shows a "Rows per page" select */
  pageSizeOptions?: number[]

  /** Render skeleton rows instead of data */
  loading?: boolean
  /** Number of skeleton rows. Default 5, or the page size */
  loadingRows?: number
  /** Content when `data` is empty */
  emptyState?: React.ReactNode
  /** Content when the search matches nothing */
  noMatchState?: React.ReactNode

  /** Keep the first data column (and the checkbox column) pinned while scrolling sideways. Default true */
  stickyFirstColumn?: boolean
  /** Alternate row backgrounds */
  striped?: boolean
  /** Pin the last column to the right edge (e.g. row actions) while scrolling sideways. Default false */
  stickyLastColumn?: boolean
  /** Round arrow buttons on the edges of a table wider than its container; each shows only when there is something to scroll to, and not on touch screens. Default true */
  scrollButtons?: boolean
  /** Height limit of the scroll area; needed for the sticky header to stick inside the table */
  maxHeight?: number | string
  tableClassName?: string
  labels?: Partial<DataTableLabels>

  /** Client only: called with the selected row ids. In a Server Component use the form field instead */
  onSelectionChange?: (ids: string[]) => void
  /** Client only: called after a header click */
  onSortingChange?: (sorting: DataTableSorting) => void
  /** Client only: called with the zero-based page index */
  onPageChange?: (page: number) => void
}

const defaultLabels: DataTableLabels = {
  table: "Table",
  search: "Search rows",
  searchPlaceholder: "Search…",
  selectAll: "Select all rows on this page",
  selectRow: "Select row",
  rowsPerPage: "Rows per page",
  range: "{from}–{to} of {total}",
  previousPage: "Previous page",
  nextPage: "Next page",
  scrollLeft: "Scroll left",
  scrollRight: "Scroll right",
  loading: "Loading rows…",
}

// The table is rendered on the server; DataTableController (client) only moves
// rows for sorting and flips data attributes for search and pagination.
// Cells carry their own opaque background (sticky cells must cover what scrolls
// under them), driven by --dt-row-bg so zebra, hover and selection apply to the
// sticky cells too. Selection highlight is pure CSS: a row with a checked box.
// Rows past the first page are hidden from the first paint when scripting is
// on, and all stay visible without JavaScript.
// The pinned column shadow fades in with a scroll-driven animation over the
// first 24px of horizontal scroll; elsewhere a static border marks the edge.
const css = `
[data-slot="data-table"] {
  --dt-bg: var(--card);
  --dt-head-bg: color-mix(in oklch, var(--muted) 40%, var(--card));
  --dt-line: color-mix(in oklch, var(--border) 60%, transparent);
  --dt-select-w: 2.75rem;
}
[data-slot="data-table-table"] { border-collapse: separate; border-spacing: 0; }
[data-slot="data-table-table"] th,
[data-slot="data-table-table"] td {
  box-shadow: inset 0 -1px 0 var(--dt-line);
}
[data-slot="data-table-table"] thead th { box-shadow: inset 0 -1px 0 var(--border); }
[data-slot="data-table-table"] tbody tr:last-child > * { box-shadow: none; }
[data-slot="data-table-table"] thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--dt-head-bg);
}

/* A thin scrollbar that stays visible (macOS hides overlay ones): WebKit and
   Chrome get a fixed-size ::-webkit-scrollbar, Firefox the standard properties */
/* A page-level scrollbar-color is inherited and makes Chrome ignore ::-webkit-scrollbar
   (macOS then falls back to hidden overlay bars), so reset it on the scroll area */
[data-slot="data-table-scroll"] { scrollbar-color: auto; scrollbar-width: auto; }
[data-slot="data-table-scroll"]::-webkit-scrollbar { width: 10px; height: 10px; }
[data-slot="data-table-scroll"]::-webkit-scrollbar-track,
[data-slot="data-table-scroll"]::-webkit-scrollbar-corner { background: transparent; }
[data-slot="data-table-scroll"]::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 9999px;
  background: color-mix(in oklch, var(--muted-foreground) 45%, transparent) padding-box;
}
[data-slot="data-table-scroll"]::-webkit-scrollbar-thumb:hover {
  background: color-mix(in oklch, var(--muted-foreground) 70%, transparent) padding-box;
}
@supports not selector(::-webkit-scrollbar) {
  [data-slot="data-table-scroll"] {
    scrollbar-width: thin;
    scrollbar-color: color-mix(in oklch, var(--muted-foreground) 45%, transparent) transparent;
  }
}

[data-filtered-out] { display: none; }
[data-dt-ready] [data-page-hidden] { display: none; }
@media (scripting: enabled) {
  [data-page-hidden] { display: none; }
}
@media (scripting: none) {
  [data-slot="data-table-pagination"],
  [data-slot="data-table-search"],
  [data-slot="data-table-select-all"] { display: none; }
  [data-sort-column] { pointer-events: none; }
}

[data-slot="data-table-row"] { --dt-row-bg: var(--dt-bg); }
[data-slot="data-table-row"] > :is(td, th) { background: var(--dt-row-bg); transition: background-color 150ms; }
/* Zebra has zero specificity so hover and selection always win. Once the
   controller runs, rows hidden by search or paging are skipped */
:where([data-striped] [data-slot="data-table-row"]:nth-child(even)) {
  --dt-row-bg: color-mix(in oklch, var(--muted) 45%, var(--dt-bg));
}
@supports selector(:nth-child(1 of a)) {
  :where([data-dt-ready] [data-striped] [data-slot="data-table-row"]:nth-child(even)) {
    --dt-row-bg: var(--dt-bg);
  }
  :where([data-dt-ready] [data-striped] [data-slot="data-table-row"]:nth-child(even of [data-slot="data-table-row"]:not([data-filtered-out], [data-page-hidden]))) {
    --dt-row-bg: color-mix(in oklch, var(--muted) 45%, var(--dt-bg));
  }
  [data-dt-ready] [data-slot="data-table-table"] tbody tr:nth-last-child(1 of :not([hidden], [data-filtered-out], [data-page-hidden])) > * {
    box-shadow: none;
  }
}
[data-slot="data-table-row"]:hover {
  --dt-row-bg: color-mix(in oklch, var(--muted) 40%, var(--dt-bg));
}
[data-slot="data-table-row"]:has(input[data-row-select]:checked) {
  --dt-row-bg: var(--muted);
}
[data-slot="data-table-row"]:has(input[data-row-select]:checked):hover {
  --dt-row-bg: color-mix(in oklch, var(--foreground) 4%, var(--muted));
}

[data-slot="data-table"]:not(:has(input[data-row-select]:checked)) [data-selection-only] { display: none; }

/* Edge fades and scroll arrows: invisible until the controller finds the table
   wider than its box; each side shows only while there is more to scroll to.
   The controller writes the pinned widths and scrollbar sizes as variables. */
[data-slot="data-table-fade"],
[data-slot="data-table-arrow"] {
  position: absolute;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 200ms, visibility 0s 200ms;
}
[data-slot="data-table-fade"] {
  top: 0;
  bottom: var(--dt-hbar, 0px);
  width: 3.5rem;
}
[data-slot="data-table-fade"][data-side="start"] {
  left: var(--dt-pin-left, 0px);
  background: linear-gradient(to right, var(--dt-bg), transparent);
}
[data-slot="data-table-fade"][data-side="end"] {
  right: calc(var(--dt-pin-right, 0px) + var(--dt-vbar, 0px));
  background: linear-gradient(to left, var(--dt-bg), transparent);
}
[data-slot="data-table-arrow"] {
  top: calc((100% - var(--dt-hbar, 0px)) / 2);
  translate: 0 -50%;
}
[data-slot="data-table-arrow"][data-side="start"] {
  left: calc(var(--dt-pin-left, 0px) + 0.5rem);
}
[data-slot="data-table-arrow"][data-side="end"] {
  right: calc(var(--dt-pin-right, 0px) + var(--dt-vbar, 0px) + 0.5rem);
}
[data-dt-overflow]:not([data-at-start]) :is([data-slot="data-table-fade"], [data-slot="data-table-arrow"])[data-side="start"],
[data-dt-overflow]:not([data-at-end]) :is([data-slot="data-table-fade"], [data-slot="data-table-arrow"])[data-side="end"] {
  opacity: 1;
  visibility: visible;
  transition: opacity 200ms, visibility 0s;
}
[data-dt-overflow]:not([data-at-start]) [data-slot="data-table-arrow"][data-side="start"],
[data-dt-overflow]:not([data-at-end]) [data-slot="data-table-arrow"][data-side="end"] {
  pointer-events: auto;
}
@media (pointer: coarse) {
  [data-slot="data-table-arrow"] { display: none; }
}

[data-sort-icon] { display: none; }
[aria-sort="none"] [data-sort-icon="none"],
[aria-sort="ascending"] [data-sort-icon="ascending"],
[aria-sort="descending"] [data-sort-icon="descending"] { display: block; }
:is([aria-sort="ascending"], [aria-sort="descending"]) [data-sort-column] { color: var(--foreground); }

[data-pin] { position: sticky; z-index: 1; }
[data-slot="data-table-table"] thead [data-pin] { z-index: 3; }
[data-pin="select"] { left: 0; }
[data-pin="first"] { left: var(--dt-pin-offset, 0px); }
[data-pin="last"] { right: 0; border-left: 1px solid var(--border); }
[data-pin-edge] { border-right: 1px solid var(--border); }

/* Shadow on the pinned last column while columns hide under it */
[data-pin="last"]::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -10px;
  width: 10px;
  pointer-events: none;
  background: linear-gradient(to left, color-mix(in oklch, var(--foreground) 9%, transparent), transparent);
  opacity: 0;
  transition: opacity 200ms;
}
[data-dt-overflow]:not([data-at-end]) [data-pin="last"]::before { opacity: 1; }

@keyframes gooseui-dt-pin-shadow { to { opacity: 1; } }
@supports (animation-timeline: scroll()) {
  [data-pin-edge] { border-right-color: transparent; }
  [data-pin-edge]::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: -10px;
    width: 10px;
    pointer-events: none;
    background: linear-gradient(to right, color-mix(in oklch, var(--foreground) 9%, transparent), transparent);
    opacity: 0;
    animation: gooseui-dt-pin-shadow linear both;
    animation-timeline: scroll(nearest inline);
    animation-range: 0px 24px;
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-slot="data-table-row"] > :is(td, th) { transition: none; }
  [data-slot="data-table-fade"], [data-slot="data-table-arrow"], [data-pin="last"]::before { transition: none; }
}
`

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
})

/** Sort key written to data-sort-value: numbers stay numbers, empty is null */
function sortKey(value: unknown): string | number | null {
  if (value === null || value === undefined || value === "") return null
  if (value instanceof Date) return value.getTime()
  if (typeof value === "number") return Number.isNaN(value) ? null : value
  if (typeof value === "boolean") return Number(value)
  return String(value)
}

function compareKeys(a: string | number | null, b: string | number | null) {
  if (a === null && b === null) return 0
  if (a === null) return 1
  if (b === null) return -1
  if (typeof a === "number" && typeof b === "number") return a - b
  return collator.compare(String(a), String(b))
}

function toText(value: unknown): string {
  if (value === null || value === undefined) return ""
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

function fill(template: string, values: Record<string, number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}

const ALIGN = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const

const SKELETON_WIDTHS = [72, 56, 84, 64, 48]

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

function SortIcons() {
  return (
    <>
      <svg
        {...svg}
        data-sort-icon="none"
        className="size-3.5 shrink-0 text-muted-foreground/60"
      >
        <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
      </svg>
      <svg {...svg} data-sort-icon="ascending" className="size-3.5 shrink-0">
        <path d="m5 12 7-7 7 7M12 19V5" />
      </svg>
      <svg {...svg} data-sort-icon="descending" className="size-3.5 shrink-0">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </>
  )
}

const checkboxClass =
  "size-4 cursor-pointer align-middle accent-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"

const pageButtonClass =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-md border bg-background text-foreground shadow-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50 [&_svg]:size-4"

/**
 * Data table on a real `<table>`, rendered on the server: sortable headers,
 * sticky header and first column, checkbox row selection (highlighted by
 * CSS, submitted with a form), search, pagination, loading and empty states.
 * A small client controller adds sorting, search and paging on top.
 */
function DataTable<T>({
  columns,
  data,
  getRowId,
  caption,
  showCaption = false,
  defaultSorting = null,
  selectable = false,
  defaultSelectedIds,
  selectName = "selected",
  searchable = false,
  toolbar,
  pageSize,
  pageSizeOptions,
  loading = false,
  loadingRows,
  emptyState = "No results.",
  noMatchState = "No matching rows.",
  stickyFirstColumn = true,
  striped = false,
  stickyLastColumn = false,
  scrollButtons = true,
  maxHeight,
  tableClassName,
  labels: labelsProp,
  onSelectionChange,
  onSortingChange,
  onPageChange,
  className,
  style,
  ...props
}: DataTableProps<T>) {
  const labels = { ...defaultLabels, ...labelsProp }
  const searchId = React.useId()
  const selected = new Set(defaultSelectedIds)

  const rows = data.map((row, index) => ({
    row,
    index,
    id: getRowId(row, index),
    keys: Object.fromEntries(
      columns
        .filter((column) => column.sortable)
        .map((column) => [
          column.id,
          sortKey(
            column.sortValue ? column.sortValue(row) : column.accessor(row),
          ),
        ]),
    ) as Record<string, string | number | null>,
  }))

  const numericSort = new Set(
    columns
      .filter((column) => column.sortable)
      .filter((column) =>
        rows.every(
          (r) =>
            r.keys[column.id] === null || typeof r.keys[column.id] === "number",
        ),
      )
      .map((column) => column.id),
  )

  const sortColumn = defaultSorting
    ? columns.find((c) => c.id === defaultSorting.columnId && c.sortable)
    : undefined
  if (sortColumn && defaultSorting) {
    const sign = defaultSorting.direction === "asc" ? 1 : -1
    rows.sort(
      (a, b) =>
        sign * compareKeys(a.keys[sortColumn.id], b.keys[sortColumn.id]) ||
        a.index - b.index,
    )
  }

  const paginated = pageSize !== undefined && pageSize > 0
  const perPage = paginated ? pageSize : rows.length
  const columnCount = columns.length + (selectable ? 1 : 0)
  const skeletonCount = loadingRows ?? (paginated ? pageSize : 5)
  const pinFirst = stickyFirstColumn && columns.length > 0
  const total = loading ? 0 : rows.length

  const alignOf = (column: DataTableColumn<T>) =>
    column.align ?? (column.numeric ? "right" : "left")
  const widthStyle = (column: DataTableColumn<T>) =>
    column.width !== undefined
      ? { width: column.width, minWidth: column.width }
      : undefined
  const pinLast = stickyLastColumn && columns.length > 1
  const pinProps = (index: number) =>
    pinFirst && index === 0
      ? { "data-pin": "first", "data-pin-edge": "" }
      : pinLast && index === columns.length - 1
        ? { "data-pin": "last" }
        : undefined

  const rangeText = fill(labels.range, {
    from: total === 0 ? 0 : 1,
    to: Math.min(total, perPage),
    total,
  })

  return (
    <div
      data-slot="data-table"
      className={cn("space-y-3", className)}
      style={
        {
          "--dt-pin-offset":
            selectable && pinFirst ? "var(--dt-select-w)" : "0px",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <style href="gooseui-data-table" precedence="default">
        {css}
      </style>
      <DataTableController
        defaultSorting={sortColumn ? defaultSorting : null}
        pageSize={paginated ? pageSize : 0}
        rangeTemplate={labels.range}
        rowCount={total}
        onSelectionChange={onSelectionChange}
        onSortingChange={onSortingChange}
        onPageChange={onPageChange}
      />
      {searchable || toolbar ? (
        <div
          data-slot="data-table-toolbar"
          className="flex flex-wrap items-center gap-2"
        >
          {searchable ? (
            <div
              data-slot="data-table-search"
              className="relative w-full max-w-xs"
            >
              <svg
                {...svg}
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <label htmlFor={searchId} className="sr-only">
                {labels.search}
              </label>
              <input
                id={searchId}
                type="search"
                data-table-search=""
                placeholder={labels.searchPlaceholder}
                autoComplete="off"
                disabled={loading}
                className="h-8 w-full rounded-md border border-input bg-transparent pr-3 pl-8 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 dark:bg-input/30"
              />
            </div>
          ) : null}
          {toolbar}
        </div>
      ) : null}
      <div className="overflow-hidden rounded-xl border bg-card text-card-foreground">
        <div data-slot="data-table-viewport" className="relative">
          <div
            data-slot="data-table-scroll"
            tabIndex={0}
            role="region"
            aria-label={typeof caption === "string" ? caption : labels.table}
            className="relative overflow-auto outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset"
            style={{ maxHeight }}
          >
            <table
              data-slot="data-table-table"
              data-striped={striped ? "" : undefined}
              aria-busy={loading || undefined}
              aria-rowcount={paginated && !loading ? total + 1 : undefined}
              className={cn("w-full caption-bottom text-sm", tableClassName)}
            >
              {caption ? (
                <caption
                  className={cn(
                    showCaption
                      ? "px-4 py-3 text-left text-sm text-muted-foreground"
                      : "sr-only",
                  )}
                >
                  {caption}
                </caption>
              ) : null}
              <thead>
                <tr>
                  {selectable ? (
                    <th
                      scope="col"
                      data-pin={pinFirst ? "select" : undefined}
                      className="w-(--dt-select-w) min-w-(--dt-select-w) px-3 py-2 text-left"
                    >
                      <input
                        type="checkbox"
                        data-slot="data-table-select-all"
                        aria-label={labels.selectAll}
                        disabled={loading || total === 0}
                        className={checkboxClass}
                      />
                    </th>
                  ) : null}
                  {columns.map((column, index) => {
                    const direction =
                      sortColumn?.id === column.id
                        ? defaultSorting?.direction
                        : undefined
                    const align = alignOf(column)
                    return (
                      <th
                        key={column.id}
                        scope="col"
                        data-column={column.id}
                        data-sort-type={
                          column.sortable
                            ? numericSort.has(column.id)
                              ? "number"
                              : "text"
                            : undefined
                        }
                        aria-sort={
                          column.sortable
                            ? direction === "asc"
                              ? "ascending"
                              : direction === "desc"
                                ? "descending"
                                : "none"
                            : undefined
                        }
                        className={cn(
                          "h-10 whitespace-nowrap px-3 text-xs font-medium text-muted-foreground",
                          ALIGN[align],
                          column.sortable && "px-2",
                        )}
                        style={widthStyle(column)}
                        {...pinProps(index)}
                      >
                        {column.sortable ? (
                          <button
                            type="button"
                            data-sort-column={column.id}
                            className={cn(
                              "inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 outline-none transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                              align === "right" && "flex-row-reverse",
                            )}
                          >
                            {column.header}
                            <SortIcons />
                          </button>
                        ) : (
                          column.header
                        )}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: skeletonCount }, (_, rowIndex) => (
                    <tr
                      key={rowIndex}
                      data-slot="data-table-row"
                      aria-hidden="true"
                    >
                      {selectable ? (
                        <td
                          data-pin={pinFirst ? "select" : undefined}
                          className="px-3 py-3"
                        >
                          <span className="block size-4 animate-pulse rounded-[22%] bg-muted motion-reduce:animate-none" />
                        </td>
                      ) : null}
                      {columns.map((column, index) => (
                        <td
                          key={column.id}
                          className="px-3 py-3"
                          {...pinProps(index)}
                        >
                          <span
                            className={cn(
                              "block h-4 animate-pulse rounded bg-muted motion-reduce:animate-none",
                              alignOf(column) === "right" && "ml-auto",
                              alignOf(column) === "center" && "mx-auto",
                            )}
                            style={{
                              width: `${SKELETON_WIDTHS[(rowIndex + index) % SKELETON_WIDTHS.length]}%`,
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : rows.length === 0 ? (
                  <tr data-slot="data-table-empty">
                    <td
                      colSpan={columnCount}
                      className="px-4 py-12 text-center text-sm text-muted-foreground"
                    >
                      {emptyState}
                    </td>
                  </tr>
                ) : (
                  <>
                    {rows.map(
                      ({ row, id, index: dataIndex, keys }, rowIndex) => (
                        <tr
                          key={id}
                          data-slot="data-table-row"
                          data-row-id={id}
                          data-index={dataIndex}
                          data-page-hidden={
                            paginated && rowIndex >= perPage ? "" : undefined
                          }
                          aria-rowindex={paginated ? rowIndex + 2 : undefined}
                        >
                          {selectable ? (
                            <td
                              data-pin={pinFirst ? "select" : undefined}
                              className="px-3 py-3"
                            >
                              <input
                                type="checkbox"
                                name={selectName}
                                value={id}
                                data-row-select=""
                                defaultChecked={selected.has(id)}
                                aria-label={labels.selectRow}
                                className={checkboxClass}
                              />
                            </td>
                          ) : null}
                          {columns.map((column, index) => {
                            const value = column.accessor(row)
                            const content = column.cell
                              ? column.cell(row, value)
                              : toText(value)
                            const key = column.sortable
                              ? keys[column.id]
                              : undefined
                            const cellProps = {
                              "data-column": column.id,
                              "data-sort-value":
                                key === undefined ? undefined : (key ?? ""),
                              className: cn(
                                "px-3 py-3 whitespace-nowrap",
                                ALIGN[alignOf(column)],
                                column.numeric && "tabular-nums",
                                index === 0 && "font-medium",
                              ),
                              ...pinProps(index),
                            }
                            return index === 0 ? (
                              <th key={column.id} scope="row" {...cellProps}>
                                {content}
                              </th>
                            ) : (
                              <td key={column.id} {...cellProps}>
                                {content}
                              </td>
                            )
                          })}
                        </tr>
                      ),
                    )}
                    <tr data-slot="data-table-no-match" hidden>
                      <td
                        colSpan={columnCount}
                        className="px-4 py-12 text-center text-sm text-muted-foreground"
                      >
                        {noMatchState}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <span
            data-slot="data-table-fade"
            data-side="start"
            aria-hidden="true"
          />
          <span
            data-slot="data-table-fade"
            data-side="end"
            aria-hidden="true"
          />
          {scrollButtons ? (
            <>
              {(["start", "end"] as const).map((side) => (
                <Button
                  key={side}
                  type="button"
                  variant="outline"
                  size="icon"
                  data-slot="data-table-arrow"
                  data-side={side}
                  data-scroll-step={side === "start" ? "-1" : "1"}
                  aria-label={
                    side === "start" ? labels.scrollLeft : labels.scrollRight
                  }
                  className="size-9 rounded-full bg-background/90 shadow-md backdrop-blur-sm"
                >
                  <svg {...svg}>
                    <path
                      d={side === "start" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
                    />
                  </svg>
                </Button>
              ))}
            </>
          ) : null}
        </div>
        {loading ? (
          <span role="status" className="sr-only">
            {labels.loading}
          </span>
        ) : null}
        {paginated ? (
          <div
            data-slot="data-table-pagination"
            className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-2.5 text-sm text-muted-foreground"
          >
            {pageSizeOptions && pageSizeOptions.length > 0 ? (
              <label className="flex items-center gap-2">
                {labels.rowsPerPage}
                <Select
                  data-table-page-size=""
                  size="sm"
                  defaultValue={String(pageSize)}
                  disabled={loading}
                  wrapperClassName="w-auto"
                  className="min-w-16 cursor-pointer text-foreground"
                >
                  {pageSizeOptions.map((option) => (
                    <SelectOption key={option} value={String(option)}>
                      {option}
                    </SelectOption>
                  ))}
                </Select>
              </label>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2">
              <span
                data-slot="data-table-range"
                aria-live="polite"
                className="tabular-nums"
              >
                {rangeText}
              </span>
              <button
                type="button"
                data-page-step="-1"
                disabled
                aria-label={labels.previousPage}
                className={pageButtonClass}
              >
                <svg {...svg}>
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                data-page-step="1"
                disabled={loading || total <= perPage}
                aria-label={labels.nextPage}
                className={pageButtonClass}
              >
                <svg {...svg}>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { DataTable }
