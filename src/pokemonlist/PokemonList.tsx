import { useState, useEffect } from 'react';
import { getPokemons } from './../service/Service';
import './PokemonList.css';


export function PokemonList() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const maxRecords = 151;

    useEffect(() => {
        loadPokemonItems(offset, limit);
    }, [offset]);

    const loadPokemonItems = async (offset: number, limit: number) => {
        const pokemons = await getPokemons(offset, limit);
        setPokemonList(prevList => [...prevList, ...pokemons]);
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
                        <p>Type: {pokemon.type}</p>
                        <img src={pokemon.photo} alt={pokemon.name} />
                    </li>
                ))}
            </ul>
            {offset + limit < maxRecords && (
                <button id="loadMoreButton" onClick={handleLoadMore}>Load More</button>
            )}
        </main>
    );
}
