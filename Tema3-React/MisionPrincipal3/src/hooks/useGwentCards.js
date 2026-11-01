import { useState, useEffect } from 'react';
import { getGwentCards } from '../services/gwentService';

/**
 * Custom Hook para gestionar el estado asíncrono de consumo de cartas de Gwent.
 * @returns {{ cards: Array, isLoading: boolean, error: string|null }}
 */
export function useGwentCards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getGwentCards();
        setCards(data);
      } catch (err) {
        setError(err.message || 'Error connecting to the Gwent database');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  return { cards, isLoading, error };
}