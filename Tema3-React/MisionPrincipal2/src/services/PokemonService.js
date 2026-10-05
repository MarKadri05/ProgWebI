// URL base de la PokeAPI solicitando los primeros 20 Pokémon
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

/**
 * Obtiene la lista inicial de Pokémon desde la PokeAPI.
 * @returns {Promise<Array<{id: number, name: string, image: string}>>} Array con datos limpios de cada Pokémon.
 */
export async function getPokemonList() {
  // QUÉ HACE: Envolver la petición HTTP y el procesamiento en un bloque try...catch.
  // POR QUÉ: Capturar tanto fallos de red como excepciones lanzadas por status HTTP de error.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Usar promesas tradicionales con .then().catch(), descartado porque async/await ofrece una sintaxis secuencial y más legible.
  try {
    const response = await fetch(POKEAPI_URL);

    // QUÉ HACE: Verificación explícita de la propiedad response.ok.
    // POR QUÉ: fetch() NO rechaza la promesa ante códigos de error HTTP 404 o 500 (solo por fallos de red a nivel de socket), por lo que debemos validar response.ok e interrumplir el flujo manualmente.
    // QUÉ ALTERNATIVA SE DESCARTÓ: Asumir que la petición fue exitosa tras el fetch(), descartado porque devolvería datos corruptos si la API devuelve un error HTTP.
    if (!response.ok) {
      throw new Error(`Error HTTP en la llamada a la PokeAPI: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // QUÉ HACE: Mapear la lista de resultados para obtener los detalles de cada Pokémon mediante peticiones simultáneas con Promise.all().
    // POR QUÉ: Los resultados generales solo devuelven name y url. Promise.all() permite realizar las 20 peticiones concurrentes en paralelo en lugar de hacerlas secuencialmente (lo que ralentizaría la app).
    // QUÉ ALTERNATIVA SE DESCARTÓ: Usar bucles tradicionales 'for' o '.forEach()', descartado por la prohibición explícita de "Cero bucles" de las reglas de clase y porque .map() mantiene un enfoque puramente funcional e inmutable.
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

    return pokemonDetails;

  } catch (error) {
    // QUÉ HACE: Relanzar la excepción tras registrarla en consola.
    // POR QUÉ: Permitir que la capa superior de UI (React / App.jsx) capture el fallo y active el estado visual de Error para el usuario.
    // QUÉ ALTERNATIVA SE DESCARTÓ: Capturar el error y devolver un array vacío silenciosamente, descartado porque impediría a la interfaz notificar al usuario sobre la falla de red.
    console.error('Error en pokemonService.getPokemonList:', error.message);
    throw error;
  }
}