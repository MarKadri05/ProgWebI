import { useState, useEffect } from 'react';
import { getZombieList } from './services/zombieService';

export default function App() {
  // 1. Tríada de estados para la gestión asíncrona en React
  const [zombies, setZombies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Hook useEffect para ejecutar la petición de datos al montar el componente
  useEffect(() => {
    // QUÉ: Declarar una función asíncrona dentro del efecto y ejecutarla.
    // POR QUÉ: La función callback de useEffect NO puede ser declarada 'async' directamente porque debe devolver undefined o una función de limpieza.
    // QUÉ ALTERNATIVA SE DESCARTÓ: useEffect(async () => ...), descartado porque rompe el ciclo interno de React al devolver una Promesa.
    const fetchZombies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getZombieList();
        setZombies(data);
      } catch (err) {
        setError(err.message || 'Error al conectar con la base de datos de infectados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchZombies();
  }, []); // Array de dependencias vacío = solo se ejecuta una vez al montar el componente

  // 3. Renderizado condicional declarativo
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>🧟 Zombie Codex · Registro de Infectados</h1>

      {isLoading && <p>⏳ Cargando datos de infectados...</p>}

      {!isLoading && error && (
        <div style={{ color: 'red', border: '1px solid red', padding: '1rem', borderRadius: '8px' }}>
          <p>⚠️ Ocurrió un error: {error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {zombies.map((zombie) => (
            <article key={zombie.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
              <img src={zombie.image} alt={zombie.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
              <h3>{zombie.name}</h3>
              <p>⭐ Rating: {zombie.rating}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}