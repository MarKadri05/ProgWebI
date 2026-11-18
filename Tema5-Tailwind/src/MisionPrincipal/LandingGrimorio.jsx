export default function LandingGrimorio({ isDark, onToggleDark }) {
  return (
    <div className="min-h-screen bg-grimorio-parchment font-body text-grimorio-ink transition-colors duration-300 dark:bg-grimorio-void dark:text-grimorio-ivory">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 rounded-full border border-grimorio-bronze/40 bg-grimorio-vellum px-4 py-1 text-xs font-bold tracking-widest text-grimorio-bronze uppercase dark:border-grimorio-gold/40 dark:bg-grimorio-obsidian dark:text-grimorio-gold">
          Fase 1 · Design System Verificado
        </span>

        <h1 className="font-grimorio text-3xl font-extrabold tracking-wide text-grimorio-bronze md:text-5xl dark:text-grimorio-gold">
          MTG Grimorio · Deck Builder
        </h1>

        <p className="mt-4 max-w-xl text-base text-grimorio-ash md:text-lg dark:text-grimorio-mist">
          Tokens arcanos activos en <code className="font-semibold">@theme</code>, tipografía{' '}
          <span className="font-grimorio font-semibold">Cinzel</span> e Inter cargadas y cambio de tema verificado.
        </p>

        <button
          type="button"
          onClick={onToggleDark}
          className="mt-8 cursor-pointer rounded-xl border border-grimorio-bronze bg-grimorio-vellum px-5 py-2.5 text-sm font-semibold text-grimorio-ink shadow-sm transition hover:bg-grimorio-gold/15 focus-visible:ring-2 focus-visible:ring-grimorio-gold focus-visible:outline-none dark:border-grimorio-gold dark:bg-grimorio-obsidian dark:text-grimorio-gold dark:hover:bg-grimorio-gold/10"
        >
          {isDark ? '☀️ Invocar Modo Pergamino' : '🌙 Invocar Modo Vacío'}
        </button>
      </main>
    </div>
  );
}