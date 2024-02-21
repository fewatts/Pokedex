import { useState, useEffect } from "react";
import { getPokemons } from "../service/Service";
import { Link } from "react-router-dom";
import './PokemonList.css';

export function PokemonList() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const limit = 12;
    const maxRecords = 200;

    useEffect(() => {
        loadPokemonItems(offset, limit);
    }, [offset, limit]);

    const loadPokemonItems = async (offset: number, limit: number) => {
        const newPokemons = await getPokemons(offset, limit);
        setPokemonList(prevList => {
            const updatedList = [...prevList];
            newPokemons.forEach(pokemon => {
                const existingIndex = updatedList.findIndex(p => p.number === pokemon.number);
                if (existingIndex === -1) {
                    updatedList.push(pokemon);
                }
            });
            return updatedList;
        });
    };

    const handleLoadMore = () => {
        setOffset(prevOffset => prevOffset + limit);
    };

    return (
        <main className="main">
            <Link to="/" className="link">
                <h1 className='tittle-home'><strong>Pokedex</strong></h1>
            </Link>
            <ul className='pokemon-list'>
                {pokemonList.map((pokemon, index) => (
                    <li key={index} className={`pokemon-card ${pokemon.types.join(" ")}`}>
                        <section className="pokemon-info">
                            <p className="pokemon-name">{pokemon.name}</p>
                            {pokemon.types.map((type, typeIndex) => (
                                <p key={typeIndex} className={`pokemon-type ${pokemon.types.join(" ")}`}>{type}</p>
                            ))}
                        </section>
                        <Link to={`/pokemon/${pokemon.name}`}>
                            <img src={pokemon.photo} alt={pokemon.name} className="pokemon-img" />
                        </Link>
                    </li>
                ))}
            </ul>
            <section className="button-load-more">
                {offset + limit < maxRecords && (
                    <button id="loadMoreButton" onClick={handleLoadMore} className="button-load">Load More</button>
                )}
            </section>
        </main>
    );
}
