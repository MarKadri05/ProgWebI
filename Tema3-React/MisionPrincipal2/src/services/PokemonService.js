// URL base de la PokeAPI
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';
// Clave para guardar en el almacenamiento local del navegador
const CACHE_KEY = 'pokemon_list_cache';

/**
 * Obtiene la lista de Pokémon desde localStorage (si existe) o desde la PokéAPI.
 * @returns {Promise<Array<{id: number, name: string, image: string}>>}
 */
export async function getPokemonList() {
  // QUÉ: Comprobar primero la existencia de datos en la caché de localStorage.
  // POR QUÉ: Evita peticiones de red repetidas e innecesarias a la API pública, optimizando el tiempo de carga e implementando la persistencia exigida en el BONUS.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Guardar los datos únicamente en la memoria de un estado de React, descartado porque se perderían al recargar la página (F5).
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (cacheError) {
    // Si localStorage falla o el JSON está corrupto, continua de forma transparente con el fetch
  }

  // Si no había caché, se realiza la llamada asíncrona normal
  try {
    const response = await fetch(POKEAPI_URL);

    if (!response.ok) {
      throw new Error(`Error HTTP en la PokeAPI: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Obtener detalles completos de cada Pokémon en paralelo
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        if (!detailResponse.ok) {
          throw new Error(`Error al obtener detalles de ${pokemon.name}`);
        }
        const detailData = await detailResponse.json();

        return {
          id: detailData.id,
          name: detailData.name,
          image: detailData.sprites.front_default || detailData.sprites.other['official-artwork'].front_default
        };
      })
    );

    // QUÉ: Serializar y guardar el array procesado en localStorage.
    // POR QUÉ: localStorage solo almacena strings, por lo que es obligatorio usar JSON.stringify().
    // QUÉ ALTERNATIVA SE DESCARTÓ: Almacenar directamente el objeto sin serializar, descartado porque guardaría "[object Object]".
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(pokemonDetails));
    } catch (saveError) {
      // Si la cuota de localStorage se excede, simplemente no se guarda la caché
    }

    return pokemonDetails;
  } catch (error) {
    throw error;
  }
}