import { useState, useEffect } from "react";
import { getPokemonDetail } from "../service/Service";
import { Link, useParams } from "react-router-dom";
import './PokemonDetail.css';

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
        <main className="main-detail">
            <section className="header">
                <Link to="/"><button className={`button-back  ${pokemon?.types.join(" ")}`}>Back</button></Link>
                <h1 className={`tittle-detail ${pokemon?.types.join(" ")}`}><strong>{pokemon?.name}</strong></h1>
            </section>
            {pokemon && (
                <section className={`main-info ${pokemon?.types.join(" ")}`}>
                    <picture className="img-detail"><img src={pokemon.photo} alt={pokemon.name} className="img-poke"/></picture>
                    <section className="pokemon-infos">
                        <p className="info-one">{pokemon.types.join(", ")}</p>
                        <ul className="info-two">
                            {pokemon.stats.map((stat, statIndex) => (
                                <li key={statIndex}>
                                    {stat.name}: {stat.baseStat}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <br /><br /><br /><br /><br /><br /><br /><br />
                </section>
            )}
        </main>
    );
}
