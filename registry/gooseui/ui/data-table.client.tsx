"use client"

import * as React from "react"

export type DataTableSortDirection = "asc" | "desc"
export type DataTableSorting = {
  columnId: string
  direction: DataTableSortDirection
} | null

type DataTableControllerProps = {
  defaultSorting: DataTableSorting
  /** 0 turns pagination off */
  pageSize: number
  rangeTemplate: string
  /** Number of data rows. A new value re-renders the controller, which re-applies the state */
  rowCount: number
  onSelectionChange?: (ids: string[]) => void
  onSortingChange?: (sorting: DataTableSorting) => void
  onPageChange?: (page: number) => void
}

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
})

/**
 * Sorting, search and paging for the server-rendered DataTable. Rows stay
 * server markup: sorting moves the existing <tr> nodes, search and paging set
 * data-filtered-out / data-page-hidden. Row selection is native checkboxes and
 * its highlight is CSS; this only drives "select all" and the callback.
 */
export function DataTableController({
  defaultSorting,
  pageSize: initialPageSize,
  rangeTemplate,
  onSelectionChange,
  onSortingChange,
  onPageChange,
}: DataTableControllerProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const state = React.useRef({
    sorting: defaultSorting,
    page: 0,
    pageSize: initialPageSize,
    query: "",
    /** Last selection reported through onSelectionChange */
    selection: null as string | null,
  })
  const callbacks = React.useRef({
    onSelectionChange,
    onSortingChange,
    onPageChange,
  })
  callbacks.current = { onSelectionChange, onSortingChange, onPageChange }
  const applyRef = React.useRef<() => void>(() => {})

  React.useEffect(() => {
    const root = ref.current?.closest<HTMLElement>("[data-slot=data-table]")
    const table = root?.querySelector<HTMLTableElement>(
      "[data-slot=data-table-table]",
    )
    const tbody = table?.tBodies[0]
    if (!root || !table || !tbody) return
    const s = state.current
    const one = <E extends Element>(selector: string) =>
      root.querySelector<E>(selector)
    const all = <E extends Element>(selector: string) => [
      ...root.querySelectorAll<E>(selector),
    ]
    const dataRows = () =>
      [...tbody.rows].filter((row) => row.hasAttribute("data-row-id"))
    const cellValue = (row: HTMLTableRowElement, column: string) =>
      [...row.cells].find((cell) => cell.dataset.column === column)?.dataset
        .sortValue ?? ""
    const textOf = (row: HTMLTableRowElement) =>
      (row.textContent ?? "").toLowerCase()
    let visible: HTMLTableRowElement[] = []

    const syncSelectAll = () => {
      const box = one<HTMLInputElement>("[data-slot=data-table-select-all]")
      if (!box) return
      const boxes = visible
        .map((row) => row.querySelector<HTMLInputElement>("[data-row-select]"))
        .filter((input): input is HTMLInputElement => input !== null)
      const checked = boxes.filter((input) => input.checked).length
      box.disabled = boxes.length === 0
      box.checked = boxes.length > 0 && checked === boxes.length
      box.indeterminate = checked > 0 && checked < boxes.length
    }

    const syncSelection = () => {
      syncSelectAll()
      const ids = all<HTMLInputElement>("input[data-row-select]:checked").map(
        (input) => input.closest("tr")?.dataset.rowId ?? input.value,
      )
      for (const counter of all<HTMLElement>("[data-selected-count]")) {
        counter.textContent = `${ids.length}`
      }
      return ids
    }
    const emitSelection = () => {
      const ids = syncSelection()
      s.selection = ids.join("\n")
      callbacks.current.onSelectionChange?.(ids)
    }

    const apply = () => {
      if (table.getAttribute("aria-busy") === "true") return
      const rows = dataRows()
      const ordered = [...rows].sort(
        (a, b) => Number(a.dataset.index) - Number(b.dataset.index),
      )
      const sorting = s.sorting
      if (sorting) {
        const header = all<HTMLElement>("th[data-column]").find(
          (th) => th.dataset.column === sorting.columnId,
        )
        const numeric = header?.dataset.sortType === "number"
        const sign = sorting.direction === "asc" ? 1 : -1
        ordered.sort((a, b) => {
          const x = cellValue(a, sorting.columnId)
          const y = cellValue(b, sorting.columnId)
          if (x === "" || y === "") return x === y ? 0 : x === "" ? 1 : -1
          return (
            sign * (numeric ? Number(x) - Number(y) : collator.compare(x, y))
          )
        })
      }
      // Move only the rows that are out of place
      ordered.forEach((row, index) => {
        const anchor =
          index === 0
            ? tbody.firstElementChild
            : ordered[index - 1].nextElementSibling
        if (anchor !== row) tbody.insertBefore(row, anchor)
      })

      const query = s.query.trim().toLowerCase()
      const matches = query
        ? ordered.filter((row) => textOf(row).includes(query))
        : ordered
      const matchSet = new Set(matches)
      const size = s.pageSize > 0 ? s.pageSize : matches.length || 1
      const pageCount = Math.max(1, Math.ceil(matches.length / size))
      s.page = Math.min(Math.max(s.page, 0), pageCount - 1)
      const from = s.page * size
      const to = Math.min(matches.length, from + size)
      visible = matches.slice(from, to)
      const visibleSet = new Set(visible)

      for (const row of ordered) {
        row.toggleAttribute("data-filtered-out", !matchSet.has(row))
        row.toggleAttribute(
          "data-page-hidden",
          matchSet.has(row) && !visibleSet.has(row),
        )
      }
      matches.forEach((row, index) => {
        if (s.pageSize > 0) row.setAttribute("aria-rowindex", `${index + 2}`)
      })
      if (s.pageSize > 0) {
        table.setAttribute("aria-rowcount", `${matches.length + 1}`)
      }

      const noMatch = one<HTMLElement>("[data-slot=data-table-no-match]")
      if (noMatch) noMatch.hidden = matches.length > 0 || rows.length === 0

      for (const th of all<HTMLElement>("th[data-sort-type]")) {
        const direction =
          sorting && sorting.columnId === th.dataset.column
            ? sorting.direction
            : null
        th.setAttribute(
          "aria-sort",
          direction === "asc"
            ? "ascending"
            : direction === "desc"
              ? "descending"
              : "none",
        )
      }

      const range = one<HTMLElement>("[data-slot=data-table-range]")
      if (range) {
        range.textContent = rangeTemplate
          .replace("{from}", `${matches.length === 0 ? 0 : from + 1}`)
          .replace("{to}", `${to}`)
          .replace("{total}", `${matches.length}`)
      }
      for (const button of all<HTMLButtonElement>("[data-page-step]")) {
        button.disabled =
          button.dataset.pageStep === "-1"
            ? s.page === 0
            : s.page >= pageCount - 1
      }
      // Rows rendered again (e.g. after loading) may carry another selection
      if (syncSelection().join("\n") !== s.selection) emitSelection()
    }
    applyRef.current = apply

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const sortButton = target?.closest<HTMLElement>("[data-sort-column]")
      if (sortButton && root.contains(sortButton)) {
        const columnId = sortButton.dataset.sortColumn ?? ""
        const current = s.sorting
        s.sorting =
          !current || current.columnId !== columnId
            ? { columnId, direction: "asc" }
            : current.direction === "asc"
              ? { columnId, direction: "desc" }
              : null
        apply()
        callbacks.current.onSortingChange?.(s.sorting)
        return
      }
      const step = target?.closest<HTMLElement>("[data-page-step]")
      if (step && root.contains(step)) {
        s.page += Number(step.dataset.pageStep)
        apply()
        callbacks.current.onPageChange?.(s.page)
        // Keep focus inside the pager when the pressed button gets disabled
        if ((step as HTMLButtonElement).disabled) {
          one<HTMLButtonElement>("[data-page-step]:not(:disabled)")?.focus()
        }
        return
      }
      if (target?.closest("[data-table-clear-selection]")) {
        for (const input of all<HTMLInputElement>("input[data-row-select]")) {
          input.checked = false
        }
        emitSelection()
      }
    }

    const onChange = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.matches("[data-slot=data-table-select-all]")) {
        const checked = (target as HTMLInputElement).checked
        for (const row of visible) {
          const input = row.querySelector<HTMLInputElement>("[data-row-select]")
          if (input) input.checked = checked
        }
        emitSelection()
      } else if (target.matches("input[data-row-select]")) {
        emitSelection()
      } else if (target.matches("[data-table-page-size]")) {
        s.pageSize = Number((target as HTMLSelectElement).value)
        s.page = 0
        apply()
        callbacks.current.onPageChange?.(0)
      }
    }

    const onInput = (event: Event) => {
      const target = event.target as HTMLElement
      if (!target.matches("[data-table-search]")) return
      s.query = (target as HTMLInputElement).value
      s.page = 0
      apply()
    }

    // A reset of the surrounding form clears the checkboxes without change events
    const form = root.closest("form")
    const onReset = () => requestAnimationFrame(emitSelection)

    root.addEventListener("click", onClick)
    root.addEventListener("change", onChange)
    root.addEventListener("input", onInput)
    form?.addEventListener("reset", onReset)
    if (s.selection === null) s.selection = syncSelection().join("\n")
    const search = one<HTMLInputElement>("[data-table-search]")
    if (search?.value) s.query = search.value
    apply()
    root.setAttribute("data-dt-ready", "")
    return () => {
      root.removeEventListener("click", onClick)
      root.removeEventListener("change", onChange)
      root.removeEventListener("input", onInput)
      form?.removeEventListener("reset", onReset)
    }
  }, [rangeTemplate])

  // Re-apply after every render: a parent or the server may have rendered
  // other rows in their original order and page
  React.useEffect(() => {
    applyRef.current()
  })

  return <span ref={ref} hidden data-slot="data-table-controller" />
}
