import { StepProgress } from "@/registry/gooseui/ui/step-progress"

export default function CardPreview() {
  return (
    <div className="flex w-[200px] flex-col gap-4">
      <StepProgress step={4} total={5} />
      <StepProgress
        step={2}
        total={5}
        showCounter={false}
        className="text-primary"
      />
    </div>
  )
}
