interface Pokemon {
    number: number;
    name: string;
    type: string;
    types: string[];
    photo: string;
}

interface PokeApiDetail {
    id: number;
    name: string;
    types: { type: { name: string } }[];
    sprites: { other: { dream_world: { front_default: string } } };
}

interface PokeApiResponse {
    results: { url: string }[];
}
