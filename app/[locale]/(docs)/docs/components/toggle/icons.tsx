import type { ReactNode, SVGProps } from "react"

function Icon({
  children,
  ...props
}: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const BoldIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
  </Icon>
)
export const ItalicIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <line x1="19" x2="10" y1="4" y2="4" />
    <line x1="14" x2="5" y1="20" y2="20" />
    <line x1="15" x2="9" y1="4" y2="20" />
  </Icon>
)
export const UnderlineIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
    <line x1="4" x2="20" y1="20" y2="20" />
  </Icon>
)
export const StarIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M11.5 2.3a.6.6 0 0 1 1 0l2.7 5.5a.6.6 0 0 0 .5.3l6 .9a.6.6 0 0 1 .3 1l-4.4 4.3a.6.6 0 0 0-.2.5l1 6a.6.6 0 0 1-.9.6l-5.4-2.8a.6.6 0 0 0-.6 0L6.4 21.4a.6.6 0 0 1-.9-.6l1-6a.6.6 0 0 0-.2-.5L2 10.1a.6.6 0 0 1 .3-1l6-.9a.6.6 0 0 0 .5-.3z" />
  </Icon>
)
export const AlignLeftIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M21 5H3M15 12H3M17 19H3" />
  </Icon>
)
export const AlignCenterIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M21 5H3M17 12H7M19 19H5" />
  </Icon>
)
export const AlignRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M21 5H3M21 12H9M21 19H7" />
  </Icon>
)
export const AlignJustifyIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 5h18M3 12h18M3 19h18" />
  </Icon>
)
export const ListIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01" />
  </Icon>
)
export const GridIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </Icon>
)
