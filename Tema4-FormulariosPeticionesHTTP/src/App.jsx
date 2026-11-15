import { useState } from 'react';
import { HackathonForm } from './MisionesOpcionales/MO1/FormularioHackathon';
import { CreateCardForm } from './MisionPrincipal4/components/CreateCardForm';

export default function App() {
  // QUÉ: Estado local para alternar entre las distintas misiones del Tema 4.
  // POR QUÉ: Permite mantener ambas entregas en un único proyecto Vite sin duplicar dependencias ni archivos de entrada.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Crear múltiples archivos main.jsx o configurar rutas complejas con React Router innecesarias para dos vistas.
  const [misionActiva, setMisionActiva] = useState('m4');

  // Prueba temporal antes de conectar TanStack Query en las Fases 3 y 4
  const handleTestSubmit = (data, resetForm) => {
    console.log('Carta válida lista para enviar a la API:', data);
    alert(`Carta "${data.name}" validada con éxito`);
    resetForm();
  };

  // Fondo con ilustración de Magic y capa oscura para mantener la legibilidad del formulario
  const appBackgroundStyle = {
    minHeight: '100vh',
    color: '#f1e8d9',
    backgroundColor: '#121212',
    backgroundImage:
      'linear-gradient(rgba(12, 12, 14, 0.82), rgba(12, 12, 14, 0.92)), url("https://cards.scryfall.io/art_crop/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={appBackgroundStyle}>
      {/* Barra superior integrada con la paleta oscura y dorada */}
      <nav
        style={{
          padding: '1rem',
          backgroundColor: 'rgba(18, 18, 20, 0.9)',
          borderBottom: '1px solid #d4af37',
          display: 'flex',
          gap: '1rem',
        }}
      >
        <button
          onClick={() => setMisionActiva('hackathon')}
          style={{
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            backgroundColor: misionActiva === 'hackathon' ? '#d4af37' : '#1c1c1c',
            color: misionActiva === 'hackathon' ? '#121212' : '#f1e8d9',
            border: '1px solid #d4af37',
            borderRadius: '4px',
            fontWeight: misionActiva === 'hackathon' ? 'bold' : 'normal',
          }}
        >
          Misión Opcional: Hackathon
        </button>
        <button
          onClick={() => setMisionActiva('m4')}
          style={{
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            backgroundColor: misionActiva === 'm4' ? '#d4af37' : '#1c1c1c',
            color: misionActiva === 'm4' ? '#121212' : '#f1e8d9',
            border: '1px solid #d4af37',
            borderRadius: '4px',
            fontWeight: misionActiva === 'm4' ? 'bold' : 'normal',
          }}
        >
          Misión 4: Deck Builder
        </button>
      </nav>

      {/* Renderizado condicional: solo se monta en el DOM la misión seleccionada */}
      <main style={{ padding: '2rem' }}>
        {misionActiva === 'hackathon' && <HackathonForm />}

        {misionActiva === 'm4' && (
          <CreateCardForm onSubmitCard={handleTestSubmit} isPending={false} />
        )}
      </main>
    </div>
  );
}