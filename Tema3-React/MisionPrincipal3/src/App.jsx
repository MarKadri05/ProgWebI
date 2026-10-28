import { useState, useEffect } from 'react';
import { getGwentCards } from './services/gwentService';

export default function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para los filtros reactivos (Fase 3)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('Todas');

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

  // QUÉ: Derivar el listado filtrado de cartas en tiempo real usando .filter().
  // POR QUÉ: Cumplir con la rúbrica de React ("estado mínimo y valores derivados en vez de duplicar estados").
  // QUÉ ALTERNATIVA SE DESCARTÓ: Guardar las cartas filtradas en un estado 'filteredCards' adicional con useState.
  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'Todas' || card.position.includes(selectedPosition);
    return matchesSearch && matchesPosition;
  });

  return (
    <main style={{ padding: '2rem', backgroundColor: '#121212', minHeight: '100vh', color: '#f1e8d9', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '1.5rem' }}>
        ⚔️ Gwent Codex · El Grimorio de Geralt
      </h1>

      {/* Panel de Filtros y Buscador (Fase 3) */}
      {!isLoading && !error && (
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          {/* Input de Buscador */}
          <input
            type="text"
            placeholder="🔍 Buscar carta por nombre (ej: Geralt, Ciri)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '450px',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              border: '2px solid #d4af37',
              backgroundColor: '#1c1c1c',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none'
            }}
          />

          {/* Botones de Filtro por Fila / Posición */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {['Todas', 'Cuerpo a Cuerpo', 'A Distancia', 'Asedio', 'Líder', 'Especial'].map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: '1px solid #d4af37',
                  backgroundColor: selectedPosition === pos ? '#d4af37' : '#1c1c1c',
                  color: selectedPosition === pos ? '#000' : '#d4af37',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {pos}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 1. Estado de Carga */}
      {isLoading && <p style={{ textAlign: 'center', color: '#d4af37' }}>📜 Repartiendo cartas de la baraja...</p>}

      {/* 2. Estado de Error */}
      {!isLoading && error && (
        <div style={{ color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '1rem', borderRadius: '8px', backgroundColor: '#2a0000', textAlign: 'center' }}>
          <p>⚠️ Alerta de Taberna: {error}</p>
        </div>
      )}

      {/* 3. Estado de Datos o Sin Resultados */}
      {!isLoading && !error && (
        <>
          {filteredCards.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa', marginTop: '3rem' }}>
              📜 No se encontraron cartas que coincidan con la búsqueda.
            </p>
          ) : (
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {filteredCards.map((card) => (
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
        </>
      )}
    </main>
  );
}