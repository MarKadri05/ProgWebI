import { useState } from 'react'
// Importa tu misión anterior (ajusta la ruta y el nombre si es distinto)
import { HackathonForm } from './MisionesOpcionales/MO1/FormularioHackathon'

export default function App() {
  // Estado para controlar qué misión se muestra por defecto
  const [misionActiva, setMisionActiva] = useState('m4')

  return (
    <div>
      {/* Menú de navegación muy sencillo */}
      <nav style={{ padding: '1rem', background: '#1e293b', display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => setMisionActiva('hackathon')}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Misión Opcional: Hackathon
        </button>
        <button 
          onClick={() => setMisionActiva('m4')}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Misión 4: Deck Builder (Activa)
        </button>
      </nav>

      {/* Contenedor donde se renderiza la misión elegida */}
      <main style={{ padding: '2rem' }}>
        {misionActiva === 'hackathon' && <HackathonForm />}
        
        {misionActiva === 'm4' && (
          <div>
            <h2>⚔️ Creador de Cartas Gwent (En construcción)</h2>
            <p>Aquí inyectaremos el componente principal de la Fase 2.</p>
          </div>
        )}
      </main>
    </div>
  )
}