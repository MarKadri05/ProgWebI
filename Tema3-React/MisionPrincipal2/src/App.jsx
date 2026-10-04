// 1. Importación del componente PokemonGrid desde la carpeta de componentes
import PokemonGrid from './components/PokemonGrid';

// 2. Declaración del array de prueba (MOCK_POKEMONS)
const MOCK_POKEMONS = [
  { id: 1, name: 'bulbasaur' },
  { id: 25, name: 'pikachu' },
  { id: 4, name: 'charmander' }
];

// 3. Componente principal App
export default function App() {
  return (
    <main className="app-container">
      <h1>PokeAPI Odyssey</h1>
      
      {/* 4. Pass de datos por props al componente contenedor PokemonGrid */}
      <PokemonGrid pokemons={MOCK_POKEMONS} />
    </main>
  );
}