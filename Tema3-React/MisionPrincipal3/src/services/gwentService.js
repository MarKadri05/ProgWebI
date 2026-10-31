const GWENT_API_URL = 'https://api.gwent.one/?key=data&version=latest&response=json';

/**
 * Obtiene aproximadamente 80 cartas de Gwent garantizando IDs de imagen válidos, filas y flavor text.
 * @returns {Promise<Array<{id: number, name: string, position: string, power: number, image: string, flavor: string|null}>>}
 */
export async function getGwentCards() {
  try {
    const response = await fetch(GWENT_API_URL);

    if (!response.ok) {
      throw new Error(`Error HTTP al conectar con Gwent API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rawCards = Object.values(data.response || data.cards || data.results || data);

    const cards = rawCards.slice(0, 80).map((card, index) => {
      const artId = card.id?.art ?? card.artid ?? (index + 1);

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
        const posIndex = index % 3;
        if (posIndex === 1) position = '🏹 A Distancia';
        if (posIndex === 2) position = '🏰 Asedio';
      }

      return {
        id: card.id?.card ?? artId,
        name: card.name || 'Gwent Card',
        position: position,
        power: card.power ?? card.strength ?? card.attributes?.power ?? (rawGroup === 'leader' ? 0 : 5),
        image: `https://gwent.one/image/gwent/assets/card/art/medium/${artId}.jpg`,
        flavor: card.flavor || card.info || null
      };
    });

    return cards;
  } catch (error) {
    console.error('Error en gwentService.getGwentCards:', error.message);
    throw error;
  }
}