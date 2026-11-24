import { FloatingLabelInput } from "@/registry/gooseui/ui/floating-label-input"

export default function CardPreview() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 p-3">
      <FloatingLabelInput
        label="Full name"
        defaultValue="Alex Morgan"
        readOnly
        tabIndex={-1}
        className="w-[200px]"
      />
      <FloatingLabelInput
        label="Email"
        readOnly
        tabIndex={-1}
        className="w-[200px]"
      />
    </div>
  )
}
