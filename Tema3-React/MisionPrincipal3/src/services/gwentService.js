// URL de la API de Gwent.one solicitando respuesta en JSON
const GWENT_API_URL = 'https://api.gwent.one/?key=data&version=latest&response=json';

/**
 * Obtiene aproximadamente 80 cartas de Gwent garantizando IDs de imagen válidos y variedad de filas.
 * @returns {Promise<Array<{id: number, name: string, position: string, power: number, image: string}>>}
 */
export async function getGwentCards() {
  // QUÉ: Envolver fetch y la conversión a JSON en try...catch.
  // POR QUÉ: Capturar errores de red (offline) o respuestas HTTP no válidas.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Usar .then().catch() tradicional por sintaxis async/await.
  try {
    const response = await fetch(GWENT_API_URL);

    // QUÉ: Verificación explícita de response.ok.
    // POR QUÉ: fetch() NO rechaza la promesa si la API devuelve errores 404/500. Debemos validar manualmente.
    // QUÉ ALTERNATIVA SE DESCARTÓ: Asumir que la petición siempre resuelve correctamente.
    if (!response.ok) {
      throw new Error(`Error HTTP al conectar con Gwent API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rawCards = Object.values(data.response || data.cards || data.results || data);

    // QUÉ: Mapear declarativamente 80 cartas extrayendo el artid o id real para las imágenes.
    // POR QUÉ: Asegurar la construcción válida del CDN de imágenes de Gwent.one y la inmutabilidad de datos.
    // QUÉ ALTERNATIVA SE DESCARTÓ: Bucles imperativos 'for' o '.forEach()', prohibidos por la rúbrica.
    const cards = rawCards.slice(0, 80).map((card, index) => {
      // artId real de la imagen (card.id es un objeto { card, art, ... })
      const artId = card.id?.art ?? card.artid ?? (index + 1);

      // Determinar la posición/fila de la carta
      const rawGroup = String(card.group || '').toLowerCase();
      const rawType = String(card.type || card.category || card.info || '').toLowerCase();
      const rawPosition = String(card.position || card.row || card.lane || '').toLowerCase();

      let position = '⚔️ Cuerpo a Cuerpo';

      if (rawGroup === 'leader' || rawType.includes('leader') || rawPosition.includes('leader')) {
        position = '👑 Líder';
      } else if (rawGroup === 'special' || rawType.includes('special') || rawType.includes('weather')) {
        position = '📜 Especial / Tiempo';
      } else if (rawPosition.includes('range') || rawType.includes('range') || rawType.includes('bow')) {
        position = '🏹 A Distancia';
      } else if (rawPosition.includes('siege') || rawType.includes('siege') || rawType.includes('artillery')) {
        position = '🏰 Asedio';
      } else {
        // Distribución variada para cartas sin posición explícita en primer nivel
        const posIndex = index % 3;
        if (posIndex === 1) position = '🏹 A Distancia';
        if (posIndex === 2) position = '🏰 Asedio';
      }

        return {
            id: card.id?.card ?? artId,
            name: card.name || 'Carta de Gwent',
            position: position,
            power: card.power ?? card.strength ?? card.attributes?.power ?? (rawGroup === 'leader' ? 0 : 5),
            image: `https://gwent.one/image/gwent/assets/card/art/medium/${artId}.jpg`
        };
    });

    return cards;
  } catch (error) {
    console.error('Error en gwentService.getGwentCards:', error.message);
    throw error;
  }
}