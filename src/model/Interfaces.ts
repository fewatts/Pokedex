interface Pokemon {
    number: number;
    name: string;
    types: string[];
    type: string;
    photo: string;
    stats: { name: string; baseStat: number }[];
}

interface PokeApiDetail {
    id: number;
    name: string;
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    sprites: { other: { dream_world: { front_default: string } } };
}

interface PokeApiResponse {
    results: { url: string }[];
}
