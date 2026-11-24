import { Plus } from "lucide-react"

const items = ["Shipping", "Returns", "Payment"]

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center p-3">
      <div className="w-[200px] divide-y border-y">
        {items.map((item, index) => (
          <div key={item} className="py-1.5">
            <div className="flex items-center justify-between text-[11px] font-medium">
              {item}
              <span
                className={
                  index === 0
                    ? "flex size-4 rotate-45 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    : "flex size-4 items-center justify-center rounded-full border text-muted-foreground"
                }
              >
                <Plus className="size-2.5" />
              </span>
            </div>
            {index === 0 && (
              <div className="mt-1 space-y-1">
                <div className="h-1.5 w-full rounded-full bg-muted-foreground/20" />
                <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/20" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
