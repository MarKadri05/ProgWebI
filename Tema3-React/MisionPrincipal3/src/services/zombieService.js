// Sustituye con tu API Key real de RAWG (https://rawg.io/apidocs)
const RAWG_API_KEY = '1bc215b00d024c2f9d5819151cba0d54';
const RAWG_URL = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=zombie&page_size=20`;

/**
 * Obtiene la lista de juegos/infectados relacionados con zombies desde la API de RAWG.
 * @returns {Promise<Array<{id: number, name: string, image: string, rating: number}>>}
 */
export async function getZombieList() {
  // QUÉ: Envolver la llamada fetch y la transformación de datos en un bloque try...catch.
  // POR QUÉ: Capturar fallos de red (sin conexión) y excepciones lanzadas por códigos HTTP de error (404/500).
  // QUÉ ALTERNATIVA SE DESCARTÓ: Usar .then().catch() tradicional, descartado porque async/await ofrece una sintaxis secuencial y más legible.
  try {
    const response = await fetch(RAWG_URL);

    // QUÉ: Verificación explícita de la propiedad response.ok.
    // POR QUÉ: fetch() NO rechaza la promesa si la API devuelve un status HTTP de error (ej. 401 si la API Key es inválida o 404). Debemos validar manualmente.
    // QUÉ ALTERNATIVA SE DESCARTÓ: Asumir que fetch() siempre funciona si la promesa resuelve, lo que provocaría que la app procese datos nulos o no válidos.
    if (!response.ok) {
      throw new Error(`Error HTTP al conectar con RAWG: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // QUÉ: Transformación declarativa de los datos de la API en objetos simplificados usando .map().
    // POR QUÉ: Extraer únicamente las propiedades requeridas por la interfaz, manteniendo inmutabilidad.
    // QUÉ ALTERNATIVA SE DESCARTÓ: Bucles imperativos 'for' o '.forEach()', descartados por la prohibición explícita de "Cero bucles" de las reglas de clase.
    const zombies = data.results.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image || 'https://via.placeholder.com/300x200?text=Sin+Imagen',
      rating: game.rating
    }));

    return zombies;
  } catch (error) {
    // QUÉ: Relanzar la excepción tras registrarla en consola.
    // POR QUÉ: Permitir que la capa superior de UI (App.jsx) capture la excepción y muestre el estado de Error al usuario.
    // QUÉ ALTERNATIVA SE DESCARTÓ: Silenciar el error devolviendo un array vacío, lo que impediría a la UI avisar al usuario del problema.
    console.error('Error en zombieService.getZombieList:', error.message);
    throw error;
  }
}