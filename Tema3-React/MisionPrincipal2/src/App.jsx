import { useState, useEffect } from 'react';
import { getPokemonList } from './services/PokemonService';
import { PokemonGrid } from './components/PokemonGrid';
import { StatusMessage } from './components/StatusMessage';
import './App.css';

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPokemonList();
        setPokemons(data);
      } catch (err) {
        setError(err.message || 'Error al conectar con la PokéAPI');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // QUÉ: Filtrado inmutable derivado del estado.
  // POR QUÉ: Evita mutar la lista original 'pokemons' y no requiere useEffects adicionales.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Usar .forEach() para llenar un array auxiliar vaciándolo a mano.
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <main className="app-container">
      <h1>⚡ PokeAPI Odyssey</h1>

      {/* Buscador reactivo en tiempo real */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {isLoading && (
        <StatusMessage type="loading" message="Cargando Pokémon..." />
      )}

      {!isLoading && error && (
        <StatusMessage type="error" message={error} />
      )}

      {!isLoading && !error && (
        <PokemonGrid pokemons={filteredPokemons} />
      )}
    </main>
  );
}