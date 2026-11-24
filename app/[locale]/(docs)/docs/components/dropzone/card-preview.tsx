import { Upload, X } from "lucide-react"

const files = [
  {
    name: "beach.png",
    size: "1.2 MB",
    from: "from-sky-400",
    to: "to-indigo-500",
  },
  {
    name: "forest.jpg",
    size: "860 KB",
    from: "from-emerald-400",
    to: "to-teal-600",
  },
]

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center p-3">
      <div className="w-[200px] space-y-1.5">
        <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/60 bg-primary/5 py-2.5">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Upload className="size-3.5" />
          </span>
          <span className="text-[11px] font-medium">Drop files here</span>
        </div>
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-2 rounded-md border bg-card px-1.5 py-1"
          >
            <span
              className={`size-6 shrink-0 rounded bg-gradient-to-br ${file.from} ${file.to}`}
            />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[10px] font-medium">
                {file.name}
              </span>
              <span className="block text-[9px] text-muted-foreground">
                {file.size}
              </span>
            </span>
            <X className="size-3 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  )
}
