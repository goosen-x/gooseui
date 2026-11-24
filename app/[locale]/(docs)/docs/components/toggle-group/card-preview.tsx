import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/gooseui/ui/toggle-group"

export default function CardPreview() {
  return (
    <ToggleGroup type="single" defaultValue="one">
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two">Two</ToggleGroupItem>
    </ToggleGroup>
  )
}
