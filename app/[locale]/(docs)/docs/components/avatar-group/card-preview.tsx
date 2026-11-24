import { Avatar, AvatarGroup } from "@/registry/gooseui/ui/avatar-group"

const names = [
  "Amara Okafor",
  "Lukas Brenner",
  "Mei Tanaka",
  "Sofia Lindqvist",
  "Noah Fischer",
  "Jonas Weber",
  "Hana Novak",
]

export default function CardPreview() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3">
      <AvatarGroup max={4} fanOut={false} aria-hidden="true">
        {names.map((name) => (
          <Avatar key={name} name={name} />
        ))}
      </AvatarGroup>
      <div className="flex gap-2">
        <Avatar size="sm" name="Amara Okafor" status="online" aria-hidden />
        <Avatar size="sm" name="Mei Tanaka" status="busy" aria-hidden />
        <Avatar size="sm" name="Ravi Iyer" status="away" aria-hidden />
      </div>
    </div>
  )
}
