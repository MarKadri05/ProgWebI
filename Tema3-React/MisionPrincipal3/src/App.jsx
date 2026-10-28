import { useState, useEffect } from 'react';
import { getGwentCards } from './services/gwentService';

export default function App() {
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
        setError(err.message || 'Error al conectar con el registro de Gwent');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <main style={{ padding: '2rem', backgroundColor: '#121212', minHeight: '100vh', color: '#f1e8d9', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ color: '#d4af37', textAlign: 'center' }}>⚔️ Gwent Codex · El Grimorio de Geralt</h1>

      {isLoading && <p style={{ textAlign: 'center', color: '#d4af37' }}>📜 Repartiendo cartas de la baraja...</p>}

      {!isLoading && error && (
        <div style={{ color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '1rem', borderRadius: '8px', backgroundColor: '#2a0000', textAlign: 'center' }}>
          <p>⚠️ Alerta de Taberna: {error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {cards.map((card) => (
            <article key={card.id} style={{ border: '2px solid #d4af37', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#1c1c1c', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img 
                  src={card.image} 
                  alt={card.name} 
                  style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '4px' }} 
                />
                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '0.8rem 0 0.4rem 0' }}>{card.name}</h3>
                <p style={{ margin: '0.2rem 0', color: '#aaa', fontSize: '0.9rem' }}>Fila: {card.position}</p>
              </div>
              <p style={{ margin: '0.5rem 0 0 0', color: '#ff4500', fontWeight: 'bold', fontSize: '1.1rem' }}>⚔️ Fuerza: {card.power}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}