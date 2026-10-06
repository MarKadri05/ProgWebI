import { useState, useEffect } from 'react';
import { getPokemonList } from './services/pokemonService';
import { PokemonGrid } from './components/PokemonGrid';
import { StatusMessage } from './components/StatusMessage';

export default function App() {
  // 1. Declaración de la tríada de estados para la petición asíncrona
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Efecto para obtener la lista de Pokémon al montar el componente
  useEffect(() => {
    // QUÉ: Función asíncrona interna para coordinar la petición de datos.
    // POR QUÉ: La función pasada a useEffect NO puede ser declarada async porque React espera
    // que devuelva undefined o una función de limpieza (cleanup). Si fuera async, devolvería una Promesa.
    // QUÉ ALTERNATIVA SE DESCARTÓ: Usar .then().catch() fuera de useEffect, descartado porque async/await
    // dentro de una función auxiliar mantiene una sintaxis imperativa/secuencial más clara.
    const fetchPokemons = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getPokemonList();
        setPokemons(data);
      } catch (err) {
        // Enfriamos el error y guardamos el mensaje para mostrárselo al usuario
        console.error('Error al cargar Pokémon:', err);
        setError(err.message || 'Error al conectar con la PokéAPI');
      } finally {
        // Se ejecuta siempre, garantizando que el mensaje de carga se desactive
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []); // Array de dependencias vacío: se ejecuta exclusivamente una vez al montar el componente

  // 3. Renderizado condicional declarativo según el estado actual
  return (
    <main className="app-container">
      <h1>⚡ PokeAPI Odyssey</h1>

      {/* QUÉ: Evaluación declarativa de estados visuales.
          POR QUÉ: En React no se manipula el DOM directamente (p. ej. con document.getElementById); 
          la UI es un reflejo directo del estado actual del componente.
          QUÉ ALTERNATIVA SE DESCARTÓ: Ocultar o mostrar elementos cambiando clases CSS a mano. */}
      {isLoading && (
        <StatusMessage
          type="loading"
          message="Cargando Pokémon de la PokéAPI..."
        />
      )}

      {!isLoading && error && (
        <StatusMessage
          type="error"
          message={`Ocurrió un error: ${error}`}
        />
      )}

      {!isLoading && !error && (
        <PokemonGrid pokemons={pokemons} />
      )}
    </main>
  );
}