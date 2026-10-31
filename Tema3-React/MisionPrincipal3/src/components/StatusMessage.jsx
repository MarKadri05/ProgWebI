/**
 * Renderiza los mensajes visuales de carga o de error de red.
 */
export function StatusMessage({ isLoading, error }) {
  if (isLoading) {
    return <p style={{ textAlign: 'center', color: '#d4af37' }}>📜 Dealing cards from the deck...</p>;
  }

  if (error) {
    return (
      <div style={{ color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '1rem', borderRadius: '8px', backgroundColor: '#2a0000', textAlign: 'center' }}>
        <p>⚠️ Tavern Alert: {error}</p>
      </div>
    );
  }

  return null;
}