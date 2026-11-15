import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCards } from '../services/CardService';

const COLOR_BADGES = {
  White: '☀️ White',
  Blue: '💧 Blue',
  Black: '💀 Black',
  Red: '🔥 Red',
  Green: '🌲 Green',
  Multicolor: '🌈 Multicolor',
  Colorless: '💎 Colorless',
};

export function CardList() {
  const [simulateCorrupt, setSimulateCorrupt] = useState(false);

  const {
    data: cards = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['mtg-cards', { simulateCorrupt }],
    queryFn: () => getCards(simulateCorrupt),
    retry: false,
  });

  return (
    <section style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: 'rgba(28, 28, 28, 0.88)',
          border: '1px solid #d4af37',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ color: '#d4af37', margin: 0 }}>
          📚 Grimorio Remoto ({isLoading || isError ? '...' : cards.length} cartas)
        </h2>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setSimulateCorrupt((prev) => !prev)}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: '4px',
              border: '1px solid #ff6b6b',
              backgroundColor: simulateCorrupt ? '#ff6b6b' : '#121212',
              color: simulateCorrupt ? '#121212' : '#ff6b6b',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            {simulateCorrupt ? '🛡️ Restaurar API Limpia' : '🧪 Simular Dato Corrupto (safeParse)'}
          </button>

          <button
            type="button"
            onClick={() => refetch()}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: '4px',
              border: '1px solid #d4af37',
              backgroundColor: '#121212',
              color: '#d4af37',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            🔄 Refrescar
          </button>
        </div>
      </div>

      {isLoading && (
        <div
          role="status"
          style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'rgba(28, 28, 28, 0.88)',
            border: '1px solid #d4af37',
            borderRadius: '8px',
            color: '#d4af37',
          }}
        >
          ⏳ Consultando grimorio en el servidor...
        </div>
      )}

      {isError && (
        <div
          role="alert"
          style={{
            padding: '1.25rem',
            backgroundColor: 'rgba(60, 15, 15, 0.92)',
            border: '2px solid #ff6b6b',
            borderRadius: '8px',
            color: '#ffd6d6',
          }}
        >
          <strong>⚠️ Alerta de Validación / Red:</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>{error.message}</p>
        </div>
      )}

      {!isLoading && !isError && cards.length === 0 && (
        <p style={{ textAlign: 'center', color: '#ccc' }}>
          No hay cartas registradas todavía. Utiliza el formulario superior para forjar la primera.
        </p>
      )}

      {!isLoading && !isError && cards.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {cards.map((card) => (
            <article
              key={card.id}
              style={{
                backgroundColor: 'rgba(28, 28, 28, 0.92)',
                border: '2px solid #d4af37',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.7)',
              }}
            >
              <img
                src={card.imageURL}
                alt={card.name}
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#d4af37', fontSize: '1.05rem' }}>{card.name}</h3>
                  <span
                    style={{
                      backgroundColor: '#121212',
                      border: '1px solid #d4af37',
                      borderRadius: '999px',
                      padding: '0.15rem 0.55rem',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                    }}
                  >
                    💎 {card.manaCost}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#cfc5b4' }}>
                  <span>{COLOR_BADGES[card.color] || card.color}</span> · <span>{card.type}</span>
                </div>

                {/* Renderizado de description */}
                <p style={{ fontSize: '0.88rem', margin: '0.3rem 0', flex: 1, lineHeight: 1.4 }}>
                  {card.description}
                </p>

                {card.type === 'Creature' && (
                  <div
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: '#121212',
                      border: '1px solid #d4af37',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      color: '#d4af37',
                    }}
                  >
                    ⚔️ {card.power} / 🛡️ {card.health}
                  </div>
                )}

                {card.type === 'Planeswalker' && (
                  <div
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: '#121212',
                      border: '1px solid #d4af37',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      color: '#d4af37',
                    }}
                  >
                    💠 Lealtad: {card.loyalty}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}