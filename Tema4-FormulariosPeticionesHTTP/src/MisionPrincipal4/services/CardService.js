import { apiCardsListSchema } from '../schemas/cardSchema';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://6af9ef356d8b86fb22d75d5b.mockapi.io/cards';

export async function getCards(simulateCorrupt = false) {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: No se pudo conectar con el servidor de cartas.`);
  }

  const rawData = await response.json();

  const payloadToValidate = simulateCorrupt
    ? [
        ...rawData,
        {
          id: 'corrupt-999',
          name: 'Carta Corrupta',
          color: 'Red',
          type: 'Instant',
          manaCost: 2,
          power: 99,
          health: 99,
          loyalty: 99,
          description: 'Dato alterado en el servidor', // Actualizado aquí para el test de safeParse
          imageURL: 'url-invalida',
        },
      ]
    : rawData;

  const validationResult = apiCardsListSchema.safeParse(payloadToValidate);

  if (!validationResult.success) {
    const firstIssue = validationResult.error.issues[0];
    const fieldPath = firstIssue?.path?.join('.') || 'desconocido';
    throw new Error(
      `Integridad de datos comprometida (Zod safeParse): fallo en "${fieldPath}" -> ${firstIssue?.message}`
    );
  }

  return validationResult.data;
}

export async function createCard(newCard) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCard),
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: No se pudo registrar la carta en el servidor.`);
  }

  return response.json();
}