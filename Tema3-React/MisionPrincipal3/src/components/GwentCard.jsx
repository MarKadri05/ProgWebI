/**
 * Renderiza la ficha visual de una carta individual de Gwent.
 */
export function GwentCard({ name, image, position, power, formatPositionLabel }) {
  return (
    <article style={{ border: '2px solid #d4af37', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#1c1c1c', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <img 
          src={image} 
          alt={name} 
          style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '4px' }} 
        />
        <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '0.8rem 0 0.4rem 0' }}>{name}</h3>
        <p style={{ margin: '0.2rem 0', color: '#aaa', fontSize: '0.9rem' }}>
          Row: {formatPositionLabel(position)}
        </p>
      </div>
      <p style={{ margin: '0.5rem 0 0 0', color: '#ff4500', fontWeight: 'bold', fontSize: '1.1rem' }}>
        ⚔️ Power: {power}
      </p>
    </article>
  );
}