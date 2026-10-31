/**
 * Panel de controles reactivos (buscador, ordenación y botones de filtro por fila).
 */
export function FilterPanel({
  searchTerm,
  setSearchTerm,
  selectedPosition,
  setSelectedPosition,
  sortBy,
  setSortBy
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
      {/* Buscador e Insumo de Ordenación */}
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

      {/* Botones de Filtro por Fila */}
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
  );
}