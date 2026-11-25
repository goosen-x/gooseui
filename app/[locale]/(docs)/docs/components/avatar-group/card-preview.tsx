import { Avatar, AvatarGroup } from "@/registry/gooseui/ui/avatar-group"

const people = [
  ["Amara Okafor", "amara-okafor"],
  ["Lukas Brenner", "lukas-brenner"],
  ["Mei Tanaka", "mei-tanaka"],
  ["Sofia Lindqvist", "sofia-lindqvist"],
  ["Noah Fischer", "noah-fischer"],
  ["Jonas Weber", "jonas-weber"],
  ["Hana Novak", "hana-novak"],
]
const src = (slug: string) => `/demo/avatar-group/${slug}.webp`

export default function CardPreview() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3">
      <AvatarGroup max={4} fanOut={false} aria-hidden="true">
        {people.map(([name, slug]) => (
          <Avatar key={name} name={name} src={src(slug)} />
        ))}
      </AvatarGroup>
      <div className="flex gap-2">
        <Avatar
          size="sm"
          name="Amara Okafor"
          src={src("amara-okafor")}
          status="online"
          aria-hidden
        />
        <Avatar
          size="sm"
          name="Mei Tanaka"
          src={src("mei-tanaka")}
          status="busy"
          aria-hidden
        />
        <Avatar
          size="sm"
          name="Ravi Iyer"
          src={src("ravi-iyer")}
          status="away"
          aria-hidden
        />
      </div>
    </div>
  )
}
