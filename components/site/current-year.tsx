import { unstable_cache } from "next/cache"

const getYear = unstable_cache(
  async () => new Date().getFullYear(),
  ["current-year"],
  { revalidate: 86400 } // Revalidate once per day
)

export async function CurrentYear() {
  const year = await getYear()
  return <>{year}</>
}
