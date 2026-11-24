import type { ReviewStatus } from "@/lib/config/docs-navigation"

export function ReviewStatusDot({ status }: { status?: ReviewStatus }) {
  if (
    process.env.NODE_ENV !== "development" ||
    status === undefined ||
    status === "accepted"
  )
    return null
  const labels = {
    "": "Без решения",
    revise: "Доработать",
    delete: "Удалить",
  }
  const colors = {
    "": "bg-gray-400",
    revise: "bg-yellow-400",
    delete: "bg-red-500",
  }
  return (
    <span
      role="img"
      aria-label={labels[status]}
      title={labels[status]}
      className={`inline-block size-2 shrink-0 rounded-full ${colors[status]}`}
    />
  )
}
