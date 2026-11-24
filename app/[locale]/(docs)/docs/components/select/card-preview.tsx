import { Check, ChevronDown, Rocket, Sparkles, Users } from "lucide-react"

const options = [
  { icon: Sparkles, label: "Hobby", text: "1 project" },
  { icon: Rocket, label: "Pro", text: "Unlimited projects" },
  { icon: Users, label: "Team", text: "SSO, audit log" },
]

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center p-3">
      <div className="w-[190px]">
        <div className="flex h-8 items-center gap-1.5 rounded-md border bg-background px-2 text-[11px] shadow-xs">
          <Rocket className="size-3 text-muted-foreground" />
          <span>Pro</span>
          <ChevronDown className="ml-auto size-3 rotate-180 opacity-50" />
        </div>
        <div className="mt-1 rounded-md border bg-popover p-1 shadow-md">
          {options.map(({ icon: Icon, label, text }, index) => (
            <div
              key={label}
              className={
                index === 1
                  ? "flex items-center gap-1.5 rounded-sm bg-accent px-1.5 py-1 text-accent-foreground"
                  : "flex items-center gap-1.5 px-1.5 py-1"
              }
            >
              <Icon className="size-3 shrink-0 text-muted-foreground" />
              <div className="min-w-0 leading-tight">
                <div className="text-[11px] font-medium">{label}</div>
                <div className="truncate text-[9px] text-muted-foreground">
                  {text}
                </div>
              </div>
              {index === 1 && (
                <Check className="ml-auto size-3 shrink-0 text-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
