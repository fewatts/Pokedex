import { useState, useEffect } from "react";
import { getPokemonDetail } from "../service/Service";
import { useParams } from "react-router-dom";

interface Pokemon {
    name: string;
    types: string[];
    stats: { name: string; baseStat: number }[];
    photo: string;
}

export function PokemonDetail() {
    const params = useParams<{ pokemonname: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const pokemonDetail = await getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${params.pokemonname}` });
                setPokemon(pokemonDetail);
            } catch (error) {
                console.error('Error fetching Pokemon detail:', error);
            }
        }
        fetchPokemon();
    }, [params.pokemonname]);

    return (
        <main>
            <h1 className='tittle-home'><strong>{pokemon?.name}</strong></h1>
            {pokemon && (
                <ul className='pokemon-list'>
                    <li className='pokemon-card'>
                        <section className="pokemon-info">
                            <p>{pokemon.name}</p>
                            <p>{pokemon.types.join(", ")}</p>
                            <ul>
                                {pokemon.stats.map((stat, statIndex) => (
                                    <li key={statIndex}>
                                        {stat.name}: {stat.baseStat}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <img src={pokemon.photo} alt={pokemon.name} />
                    </li>
                </ul>
            )}
        </main>
    );
}
