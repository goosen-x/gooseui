import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineMarker,
  type TimelineStatus,
  TimelineTitle,
} from "@/registry/gooseui/ui/timeline"

const steps: { title: string; status: TimelineStatus }[] = [
  { title: "Placed", status: "completed" },
  { title: "Shipped", status: "current" },
  { title: "Delivered", status: "upcoming" },
]

export default function CardPreview() {
  return (
    <div className="flex h-full items-center justify-center">
      <Timeline className="w-36 [--timeline-marker:1.25rem]">
        {steps.map((step) => (
          <TimelineItem
            key={step.title}
            status={step.status}
            className="[&>[data-slot=timeline-content]]:pb-2"
          >
            <TimelineMarker className="[&_svg]:size-3" />
            <TimelineConnector />
            <TimelineContent>
              <TimelineTitle className="text-xs leading-5">
                {step.title}
              </TimelineTitle>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
