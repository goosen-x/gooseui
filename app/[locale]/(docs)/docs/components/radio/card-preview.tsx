import { Label } from "@/registry/gooseui/ui/label"
import { Radio } from "@/registry/gooseui/ui/radio"

export default function CardPreview() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Radio id="card-radio-one" name="card-radio" defaultChecked />
        <Label htmlFor="card-radio-one" className="cursor-pointer">
          First option
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="card-radio-two" name="card-radio" />
        <Label htmlFor="card-radio-two" className="cursor-pointer">
          Second option
        </Label>
      </div>
    </div>
  )
}
