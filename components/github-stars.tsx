"use client"

import * as React from "react"
import { Star } from "lucide-react"

interface GitHubStarsProps {
  owner: string
  repo: string
  className?: string
}

export function GitHubStars({ owner, repo, className }: GitHubStarsProps) {
  const [stars, setStars] = React.useState<number | null>(null)

  React.useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
        if (res.ok) {
          const data = await res.json()
          setStars(data.stargazers_count)
        }
      } catch {
        // Silently fail
      }
    }

    fetchStars()
  }, [owner, repo])

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <span className={className}>
      <Star className="size-3.5 fill-current" />
      {stars !== null ? formatStars(stars) : "—"}
    </span>
  )
}
