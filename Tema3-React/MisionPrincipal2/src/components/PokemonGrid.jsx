import { PokemonCard } from './PokemonCard';

export function PokemonGrid({ pokemons }) {
  if (pokemons.length === 0) {
    return <p className="no-results">No se encontraron Pokémon con ese nombre.</p>;
  }

  return (
    <section className="pokemon-grid">
      {/* QUÉ: Transformación de datos a elementos JSX mediante .map().
          POR QUÉ: Garantiza renderizado declarativo inmutable y asigna la prop 'key' obligatoria.
          QUÉ ALTERNATIVA SE DESCARTÓ: Usar bucles 'for' o '.forEach()', prohibidos por la rúbrica de clase. */}
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
        />
      ))}
    </section>
  );
}