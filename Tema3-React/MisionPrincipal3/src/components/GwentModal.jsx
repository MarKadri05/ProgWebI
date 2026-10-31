/**
 * Renderiza una ventana modal con la imagen ampliada de la carta y su flavor text en cursiva.
 */
export function GwentModal({ card, onClose }) {
  if (!card) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        cursor: 'pointer',
        padding: '1rem'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{
          backgroundColor: '#1c1c1c',
          border: '3px solid #d4af37',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9)',
          color: '#f1e8d9'
        }}
      >
        <img 
          src={card.image} 
          alt={card.name} 
          style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', borderRadius: '6px', marginBottom: '1rem' }}
        />
        <h2 style={{ color: '#d4af37', margin: '0.5rem 0 0.2rem 0', fontSize: '1.4rem' }}>{card.name}</h2>
        
        <p style={{ color: '#ff4500', fontWeight: 'bold', fontSize: '1.2rem', margin: '0.4rem 0' }}>
          ⚔️ Power: {card.power}
        </p>

        <p style={{ marginTop: '1.2rem', fontStyle: 'italic', color: '#d1c7b7', fontSize: '0.95rem', lineHeight: '1.4' }}>
          {card.flavor ? `"${card.flavor}"` : 'Esta carta no tiene cuota'}
        </p>

        <button 
          onClick={onClose}
          style={{
            marginTop: '1.5rem',
            padding: '0.6rem 1.5rem',
            backgroundColor: '#d4af37',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}