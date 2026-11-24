import { cache } from "react"
import { PokemonImage } from "@/registry/gooseui/blocks/complex-component/components/pokemon-image"
import { getPokemon } from "@/registry/gooseui/blocks/complex-component/lib/pokemon"
import { Card, CardContent } from "@/registry/gooseui/ui/card"

const cachedGetPokemon = cache(getPokemon)

export async function PokemonCard({ name }: { name: string }) {
  const pokemon = await cachedGetPokemon(name)

  if (!pokemon) {
    return null
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center p-2">
        <div>
          <PokemonImage name={pokemon.name} number={pokemon.id} />
        </div>
        <div className="text-center font-medium">{pokemon.name}</div>
      </CardContent>
    </Card>
  )
}
