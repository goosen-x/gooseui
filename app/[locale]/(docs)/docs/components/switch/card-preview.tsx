import { Label } from "@/registry/gooseui/ui/label"
import { Switch } from "@/registry/gooseui/ui/switch"

export default function CardPreview() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="card-switch" defaultChecked />
      <Label htmlFor="card-switch" className="cursor-pointer">
        Notifications
      </Label>
    </div>
  )
}
