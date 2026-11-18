import { useState, useEffect } from 'react';
import Mision1Lumen from './MisionesOpcionales/Mision1/Mision1Lumen';
import Mision2DevFolio from './MisionesOpcionales/Mision2/Mision2DevFolio';
import Showcase from './MisionesOpcionales/Mision3/Showcase';

export default function App() {
  // Arranca directamente en la Misión 3 (Aurora UI)
  const [misionActiva, setMisionActiva] = useState('m3');

  // Restaura el tema guardado en localStorage al cargar
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('tema-u5') === 'dark';
  });

  // Sincroniza la clase 'dark' en <html> y guarda la preferencia
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('tema-u5', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Barra superior fija para alternar entre misiones y modo oscuro */}
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-6 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            U5 · Misiones Opcionales
          </span>

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

        {/* Botón fijo de Modo Oscuro arriba a la derecha */}
        <button
          type="button"
          onClick={() => setIsDark((prev) => !prev)}
          className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-xs transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
      </nav>

      {/* Renderizado condicional según la misión seleccionada */}
      {misionActiva === 'm1' && <Mision1Lumen />}
      {misionActiva === 'm2' && <Mision2DevFolio />}
      {misionActiva === 'm3' && <Showcase />}
    </div>
  );
}