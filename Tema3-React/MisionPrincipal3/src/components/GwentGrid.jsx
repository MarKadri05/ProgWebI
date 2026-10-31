import { GwentCard } from './gwentCard';

/**
 * Renderiza la rejilla de cartas mediante .map() declarativo.
 */
export function GwentGrid({ cards, formatPositionLabel }) {
  if (cards.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#aaa', marginTop: '3rem' }}>
        📜 No cards found matching the criteria.
      </p>
    );
  }

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
      {cards.map((card) => (
        <GwentCard
          key={card.id}
          name={card.name}
          image={card.image}
          position={card.position}
          power={card.power}
          formatPositionLabel={formatPositionLabel}
        />
      ))}
    </section>
  );
}