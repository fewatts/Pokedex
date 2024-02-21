export async function convertPokeApiDetailToPokemon(pokeDetail: PokeApiDetail): Promise<Pokemon> {
    const stats = pokeDetail.stats.map(stat => ({
        name: stat.stat.name,
        baseStat: stat.base_stat
    }));

    const pokemon: Pokemon = {
        number: pokeDetail.id,
        name: pokeDetail.name,
        types: pokeDetail.types.map(typeSlot => typeSlot.type.name),
        type: pokeDetail.types[0].type.name,
        photo: pokeDetail.sprites.other.dream_world.front_default,
        stats: stats
    };

    return pokemon;
}


export async function getPokemonDetail(pokemon: { url: string }): Promise<Pokemon> {
    const response = await fetch(pokemon.url);
    const pokeDetail: PokeApiDetail = await response.json();
    return convertPokeApiDetailToPokemon(pokeDetail);
}

export async function getPokemons(offset = 0, limit = 0): Promise<Pokemon[]> {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const jsonBody: PokeApiResponse = await response.json();
    const pokemons = await Promise.all(jsonBody.results.map(result => getPokemonDetail(result)));
    return pokemons;
}