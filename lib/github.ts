"use cache"

import { cacheLife } from "next/cache"

/**
 * Fetch GitHub repository stars with caching
 * Cache is revalidated every hour
 */
export async function getGitHubStars(
  owner: string,
  repo: string,
): Promise<number | null> {
  cacheLife("hours")

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.stargazers_count ?? null
  } catch {
    return null
  }
}
