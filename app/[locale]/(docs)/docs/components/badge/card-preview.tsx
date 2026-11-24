import { Check, Star, TriangleAlert } from "lucide-react"
import { Badge } from "@/registry/gooseui/ui/badge"

export default function CardPreview() {
  return (
    <div className="flex max-w-xs flex-wrap items-center justify-center gap-2">
      <Badge variant="success">
        <Check />
        Paid
      </Badge>
      <Badge variant="warning">
        <TriangleAlert />
        Pending
      </Badge>
      <Badge variant="destructive" dot="pulse">
        Live
      </Badge>
      <Badge variant="info" dot>
        Online
      </Badge>
      <Badge variant="secondary">
        <Star />
        4.9
      </Badge>
    </div>
  )
}
