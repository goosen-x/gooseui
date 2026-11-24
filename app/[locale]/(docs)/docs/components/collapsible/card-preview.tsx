import { Button } from "@/registry/gooseui/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/gooseui/ui/collapsible"

export default function CardPreview() {
  return (
    <Collapsible defaultOpen className="w-48 space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="rounded-md border p-3 text-sm">Hidden content</p>
      </CollapsibleContent>
    </Collapsible>
  )
}
