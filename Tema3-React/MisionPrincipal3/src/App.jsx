import { useState, useEffect } from 'react';
import { getGwentCards } from './services/gwentService';

export default function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for reactive filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'power-desc', 'power-asc', 'name-asc', 'name-desc'

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

  // Map Spanish positions from service to English UI labels for matching
  const positionMapping = {
    'All': 'All',
    'Melee': '⚔️ Cuerpo a Cuerpo',
    'Ranged': '🏹 A Distancia',
    'Siege': '🏰 Asedio',
    'Leader': '👑 Líder',
    'Special': '📜 Especial / Tiempo'
  };

  // Derived filtered cards
  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const targetPos = positionMapping[selectedPosition];
    const matchesPosition = selectedPosition === 'All' || (targetPos && card.position.includes(targetPos));
    return matchesSearch && matchesPosition;
  });

  // Immutable derived sorting
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortBy === 'power-desc') return b.power - a.power; // Power: High to Low
    if (sortBy === 'power-asc') return a.power - b.power;  // Power: Low to High
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name); // Name: A - Z
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name); // Name: Z - A
    return 0; // Default API order
  });

  // Display label translation for card tags
  const formatPositionLabel = (pos) => {
    if (pos.includes('Cuerpo a Cuerpo')) return '⚔️ Melee';
    if (pos.includes('A Distancia')) return '🏹 Ranged';
    if (pos.includes('Asedio')) return '🏰 Siege';
    if (pos.includes('Líder')) return '👑 Leader';
    if (pos.includes('Especial')) return '📜 Special / Weather';
    return pos;
  };

  return (
    <main style={{ padding: '2rem', backgroundColor: '#121212', minHeight: '100vh', color: '#f1e8d9', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '1.5rem' }}>
        ⚔️ Gwent Codex · Geralt's Grimoire
      </h1>

      {/* Control Panel: Search Input, Sorting Select, and Position Filters */}
      {!isLoading && !error && (
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          
          {/* Search Input and Sort Select */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%', maxWidth: '650px', justifyContent: 'center', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="🔍 Search card by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '1',
                minWidth: '250px',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                border: '2px solid #d4af37',
                backgroundColor: '#1c1c1c',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
            />

            {/* Sort Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="sort-select" style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '0.95rem' }}>
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: '2px solid #d4af37',
                  backgroundColor: '#1c1c1c',
                  color: '#d4af37',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="default">↕️ Default</option>
                <option value="power-desc">⚡ Power (High to Low)</option>
                <option value="power-asc">⚡ Power (Low to High)</option>
                <option value="name-asc">🔤 Name (A ➔ Z)</option>
                <option value="name-desc">🔤 Name (Z ➔ A)</option>
              </select>
            </div>
          </div>

          {/* Position Filter Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {['All', 'Melee', 'Ranged', 'Siege', 'Leader', 'Special'].map((pos) => (
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

      {/* 1. Loading State */}
      {isLoading && <p style={{ textAlign: 'center', color: '#d4af37' }}>📜 Dealing cards from the deck...</p>}

      {/* 2. Error State */}
      {!isLoading && error && (
        <div style={{ color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '1rem', borderRadius: '8px', backgroundColor: '#2a0000', textAlign: 'center' }}>
          <p>⚠️ Tavern Alert: {error}</p>
        </div>
      )}

      {/* 3. Data Render / Empty State */}
      {!isLoading && !error && (
        <>
          {sortedCards.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa', marginTop: '3rem' }}>
              📜 No cards found matching the criteria.
            </p>
          ) : (
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {sortedCards.map((card) => (
                <article key={card.id} style={{ border: '2px solid #d4af37', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#1c1c1c', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '0.8rem 0 0.4rem 0' }}>{card.name}</h3>
                    <p style={{ margin: '0.2rem 0', color: '#aaa', fontSize: '0.9rem' }}>
                      Row: {formatPositionLabel(card.position)}
                    </p>
                  </div>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#ff4500', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    ⚔️ Power: {card.power}
                  </p>
                </article>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}