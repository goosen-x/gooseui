import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react"

const rows = [
  ["INV-2041", "Northwind", "$4,210", true],
  ["INV-2040", "Lumen Dental", "$1,380", false],
  ["INV-2039", "Kestrel", "$7,925", true],
  ["INV-2038", "Atlas Physio", "$640", false],
] as const

export default function CardPreview() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-60 overflow-hidden rounded-lg border bg-card text-[10px] shadow-xs">
        <div className="grid grid-cols-[1rem_1fr_1fr_auto] items-center gap-2 border-b bg-muted/70 px-2 py-1.5 font-medium text-muted-foreground">
          <span className="size-2.5 rounded-[3px] border" />
          <span>Invoice</span>
          <span>Client</span>
          <span className="flex items-center gap-0.5 text-foreground">
            Amount
            <ArrowDown className="size-2.5" />
          </span>
        </div>
        {rows.map(([number, client, amount, checked]) => (
          <div
            key={number}
            className={
              checked
                ? "grid grid-cols-[1rem_1fr_1fr_auto] items-center gap-2 border-b bg-primary/10 px-2 py-1.5"
                : "grid grid-cols-[1rem_1fr_1fr_auto] items-center gap-2 border-b px-2 py-1.5"
            }
          >
            <span
              className={
                checked
                  ? "size-2.5 rounded-[3px] bg-primary"
                  : "size-2.5 rounded-[3px] border"
              }
            />
            <span className="font-medium">{number}</span>
            <span className="truncate text-muted-foreground">{client}</span>
            <span className="tabular-nums">{amount}</span>
          </div>
        ))}
        <div className="flex items-center justify-end gap-1.5 px-2 py-1 text-muted-foreground">
          <span className="tabular-nums">1–4 of 37</span>
          <ChevronLeft className="size-3 opacity-50" />
          <ChevronRight className="size-3" />
        </div>
      </div>
    </div>
  )
}
