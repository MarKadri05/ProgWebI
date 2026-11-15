import { apiCardsListSchema } from '../schemas/cardSchema';

// Sustituir por tu URL real del recurso /cards en MockAPI.io
const API_BASE_URL = 'https://6af9ef356d8b86fb22d75d5b.mockapi.io/cards';

/**
 * Obtiene el listado de cartas desde la API remota y valida su integridad con Zod safeParse.
 * @param {boolean} simulateCorrupt - Permite inyectar un registro corrupto para demostrar el Bonus de safeParse.
 * @returns {Promise<Array>} Listado de cartas validadas.
 */
export async function getCards(simulateCorrupt = false) {
  const response = await fetch(API_BASE_URL);

  // QUÉ: Verificación explícita de response.ok antes de procesar el JSON.
  // POR QUÉ: fetch() no rechaza la promesa ante respuestas HTTP 404 o 500; TanStack Query necesita que se lance un Error para activar isError.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Procesar directamente response.json() sin comprobar el código de estado HTTP.
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: No se pudo conectar con el servidor de cartas.`);
  }

  const rawData = await response.json();

  // Simulación controlada para demostrar que safeParse intercepta datos corruptos del servidor
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
          Abilityes: 'Dato alterado en el servidor',
          imageURL: 'url-invalida',
        },
      ]
    : rawData;

  // QUÉ: Validación defensiva de la respuesta remota mediante safeParse().
  // POR QUÉ: A diferencia de parse(), safeParse() devuelve un objeto { success, data, error } que permite inspeccionar el campo exacto corrupto sin romper la ejecución de forma abrupta.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Confiar ciegamente en el JSON recibido de la API e inyectarlo directamente en la vista.
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

/**
 * Envía una nueva carta validada al servidor mediante HTTP POST.
 * @param {Object} newCard - Objeto validado por cardSchema.
 * @returns {Promise<Object>} Carta creada con su id asignado por el servidor.
 */
export async function createCard(newCard) {
  // QUÉ: Petición HTTP POST serializando la carga útil en formato JSON.
  // POR QUÉ: Persiste el nuevo registro en el recurso /cards de MockAPI para que pueda recuperarse en futuras consultas GET.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Guardar los datos únicamente en memoria local con useState, lo cual se perdería al recargar.
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