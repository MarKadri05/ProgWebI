import { useState, useEffect } from 'react';
import Mision1Lumen from './MisionesOpcionales/Mision1/Mision1Lumen';
import Mision2DevFolio from './MisionesOpcionales/Mision2/Mision2DevFolio';
import Showcase from './MisionesOpcionales/Mision3/Showcase';
import LandingGrimorio from './MisionPrincipal/LandingGrimorio';

export default function App() {
  // QUÉ: Estado para alternar entre la Misión Principal 5 y las prácticas opcionales.
  // POR QUÉ: Arranca en 'm5' para mostrar directamente la entrega evaluable sin duplicar proyectos Vite.
  // ALTERNATIVA DESCARTADA: Crear un segundo proyecto con otro node_modules o usar React Router para vistas internas.
  const [misionActiva, setMisionActiva] = useState('m5');

  // Restaura el tema guardado en localStorage al cargar
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('tema-u5') === 'dark';
  });

  // Sincroniza la clase 'dark' en <html> y guarda la preferencia
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('tema-u5', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Barra superior clásica visible únicamente en las misiones opcionales (M1, M2, M3) */}
      {misionActiva !== 'm5' && (
        <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-6 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              U5 · Navegación
            </span>

            <button
              type="button"
              onClick={() => setMisionActiva('m5')}
              className="cursor-pointer rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs transition hover:bg-amber-700"
            >
              🪄 M5 · Grimorio (Principal)
            </button>

            <button
              type="button"
              onClick={() => setMisionActiva('m1')}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                misionActiva === 'm1'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              M1 · Lumen 💡
            </button>

            <button
              type="button"
              onClick={() => setMisionActiva('m2')}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                misionActiva === 'm2'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              M2 · DevFolio 🖼️
            </button>

            <button
              type="button"
              onClick={() => setMisionActiva('m3')}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                misionActiva === 'm3'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              M3 · Aurora UI 🧱
            </button>
          </div>

          <button
            type="button"
            onClick={toggleDark}
            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-xs transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </nav>
      )}

      {/* Renderizado condicional según la misión seleccionada */}
      {misionActiva === 'm5' && (
        <LandingGrimorio isDark={isDark} onToggleDark={toggleDark} />
      )}
      {misionActiva === 'm1' && <Mision1Lumen />}
      {misionActiva === 'm2' && <Mision2DevFolio />}
      {misionActiva === 'm3' && <Showcase />}

      {/* Selector discreto abajo a la izquierda cuando estás en M5 para no interferir con el Navbar en 360px */}
      {misionActiva === 'm5' && (
        <aside
          aria-label="Cambiar a misiones opcionales"
          className="fixed bottom-4 left-4 z-50 flex items-center gap-1.5 rounded-full border border-grimorio-bronze/40 bg-grimorio-vellum/90 px-3 py-1.5 text-xs shadow-lg backdrop-blur-md dark:border-grimorio-gold/40 dark:bg-grimorio-obsidian/90"
        >
          <span className="font-semibold text-grimorio-ash dark:text-grimorio-mist">
            Opcionales:
          </span>
          <button
            type="button"
            onClick={() => setMisionActiva('m1')}
            className="cursor-pointer rounded-full px-2 py-0.5 font-semibold text-grimorio-ink transition hover:bg-grimorio-gold/20 dark:text-grimorio-ivory"
          >
            M1
          </button>
          <button
            type="button"
            onClick={() => setMisionActiva('m2')}
            className="cursor-pointer rounded-full px-2 py-0.5 font-semibold text-grimorio-ink transition hover:bg-grimorio-gold/20 dark:text-grimorio-ivory"
          >
            M2
          </button>
          <button
            type="button"
            onClick={() => setMisionActiva('m3')}
            className="cursor-pointer rounded-full px-2 py-0.5 font-semibold text-grimorio-ink transition hover:bg-grimorio-gold/20 dark:text-grimorio-ivory"
          >
            M3
          </button>
        </aside>
      )}
    </div>
  );
}