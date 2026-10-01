// Servicio para obtener la lista de Pokémon
export async function getPokemonList() {
  // De momento devuelve un array estático para probar la estructura
  return [
    { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { id: 4, name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { id: 7, name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' }
  ];
}