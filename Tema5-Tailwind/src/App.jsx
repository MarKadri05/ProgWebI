import { useState, useEffect } from 'react';
import Mision1Lumen from './MisionesOpcionales/Mision1/Mision1Lumen';

export default function App() {
  // Estado para alternar entre misiones del Tema 5
  const [misionActiva, setMisionActiva] = useState('m1');

  // Reto extra Misión 1: restaurar el tema desde localStorage al cargar
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('tema-u5') === 'dark';
  });

  // Sincroniza la clase 'dark' en <html> y persiste en localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('tema-u5', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Barra superior fija para cambiar de misión y alternar tema */}
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-6 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            U5 · Misiones
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
            M2 · Próximamente
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
            M3 · Próximamente
          </button>
        </div>

        {/* Checkpoint 5 Misión 1: Botón fijo arriba a la derecha */}
        <button
          type="button"
          onClick={() => setIsDark((prev) => !prev)}
          className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-xs transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
      </nav>

      {/* Renderizado condicional de la misión seleccionada */}
      {misionActiva === 'm1' && <Mision1Lumen />}
      {misionActiva === 'm2' && (
        <p className="p-12 text-center text-slate-500">Misión 2 pendiente de enunciado.</p>
      )}
      {misionActiva === 'm3' && (
        <p className="p-12 text-center text-slate-500">Misión 3 pendiente de enunciado.</p>
      )}
    </div>
  );
}