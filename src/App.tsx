import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PokemonList } from './pokemonlist/PokemonList';
import { PokemonDetail } from './pokemondetail/PokemonDetail';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:pokemonname" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
