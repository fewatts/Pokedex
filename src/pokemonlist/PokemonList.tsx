import { useState, useEffect } from "react";
import { getPokemons } from "../service/Service";
import './PokemonList.css';

export function PokemonList() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const limit = 10; // Defina um valor apropriado para limit
    const maxRecords = 200;

    useEffect(() => {
        loadPokemonItems(offset, limit);
    }, [offset, limit]); // Certifique-se de incluir 'limit' como uma dependência do useEffect

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
        <main>
            <h1 className='tittle-home'>Pokedex</h1>
            <ul className='pokemon-list'>
                {pokemonList.map((pokemon, index) => (
                    <li key={index} className='pokemon-card'>
                        <p>{pokemon.name}</p>
                        <p>{pokemon.type}</p>
                        <img src={pokemon.photo} alt={pokemon.name} className='pokemon-img' />
                    </li>
                ))}
            </ul>
            <section className="button-load-more">
                {offset + limit < maxRecords && (
                    <button id="loadMoreButton" onClick={handleLoadMore}>Load More</button>
                )}
            </section>
        </main>
    );
}
