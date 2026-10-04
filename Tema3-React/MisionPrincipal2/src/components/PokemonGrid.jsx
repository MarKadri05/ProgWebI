import PokemonCard from './PokemonCard.jsx';

export default function PokemonGrid({ pokemons }) {
  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id || pokemon.name} name={pokemon.name} />
      ))}
    </div>
  );
}