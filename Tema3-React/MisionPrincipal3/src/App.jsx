import { useState, useEffect } from 'react';
import { getGwentCards } from './services/gwentService';
import { FilterPanel } from './components/FilterPanel';
import { GwentGrid } from './components/GwentGrid';
import { StatusMessage } from './components/StatusMessage';

export default function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [sortBy, setSortBy] = useState('default');

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

  const positionMapping = {
    'All': 'All',
    'Melee': '⚔️ Cuerpo a Cuerpo',
    'Ranged': '🏹 A Distancia',
    'Siege': '🏰 Asedio',
    'Leader': '👑 Líder',
    'Special': '📜 Especial / Tiempo'
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const targetPos = positionMapping[selectedPosition];
    const matchesPosition = selectedPosition === 'All' || (targetPos && card.position.includes(targetPos));
    return matchesSearch && matchesPosition;
  });

  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortBy === 'power-desc') return b.power - a.power;
    if (sortBy === 'power-asc') return a.power - b.power;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });

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

      <StatusMessage isLoading={isLoading} error={error} />

      {!isLoading && !error && (
        <>
          <FilterPanel
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <GwentGrid cards={sortedCards} formatPositionLabel={formatPositionLabel} />
        </>
      )}
    </main>
  );
}