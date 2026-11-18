const FEATURES = [
  {
    icono: '⏱️',
    titulo: 'Bloques de enfoque',
    descripcion: 'Temporizadores Pomodoro adaptables que se ajustan a tu ritmo real de estudio sin interrupciones.',
  },
  {
    icono: '📊',
    titulo: 'Estadísticas claras',
    descripcion: 'Visualiza tus horas efectivas por asignatura y detecta tus franjas horarias de mayor rendimiento.',
  },
  {
    icono: '🔥',
    titulo: 'Rachas inteligentes',
    descripcion: 'Mantén la constancia diaria con objetivos flexibles que perdonan los días de descanso.',
  },
];

const PLANES = [
  {
    nombre: 'Básico',
    precio: '0 €',
    periodo: '/mes',
    descripcion: 'Para empezar a organizar tus sesiones de estudio diarias.',
    beneficios: ['Temporizador Pomodoro básico', 'Hasta 3 asignaturas activas', 'Historial de los últimos 7 días'],
    destacado: false,
  },
  {
    nombre: 'Pro',
    precio: '4,99 €',
    periodo: '/mes',
    descripcion: 'Todo lo necesario para exprimir el cuatrimestre sin distracciones.',
    beneficios: ['Asignaturas y etiquetas ilimitadas', 'Estadísticas avanzadas y exportación', 'Sincronización multidispositivo'],
    destacado: true,
  },
  {
    nombre: 'Equipo',
    precio: '12,99 €',
    periodo: '/mes',
    descripcion: 'Pensado para grupos de estudio y compañeros de proyecto.',
    beneficios: ['Salas de estudio compartidas', 'Retos y rachas grupales', 'Soporte prioritario'],
    destacado: false,
  },
];

export default function Mision1Lumen() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* FASE 2: HERO (Flexbox centrado, titular degradado, botones apilados en móvil y en fila desde sm:) */}
      <section className="flex min-h-screen flex-col items-center justify-center py-16 text-center">
        <span className="mb-4 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
          Tu nuevo hábito de estudio
        </span>

        <h1 className="max-w-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400">
          Estudia con claridad, avanza cada día con Lumen
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-300">
          Organiza tus sesiones, mide tu progreso real y construye una rutina constante sin agobios ni listas interminables.
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <a
            href="#precios"
            className="rounded-xl bg-indigo-600 px-8 py-3.5 font-semibold text-white shadow-md transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Empezar gratis
          </a>
          <a
            href="#features"
            className="rounded-xl border border-slate-300 bg-white px-8 py-3.5 font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Ver cómo funciona
          </a>
        </div>
      </section>

      {/* FASE 3: FEATURES (Grid 1 columna en móvil, 3 desde lg:, misma altura) */}
      <section id="features" className="py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Diseñada para mantener el foco
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Herramientas simples que trabajan contigo, no contra ti.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.titulo}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl dark:bg-indigo-950">
                  {feature.icono}
                </span>
                <h3 className="mt-5 text-xl font-bold">{feature.titulo}</h3>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
                  {feature.descripcion}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FASE 4: PRECIOS (Plan Pro destacado con lg:scale-105, borde de color y etiqueta Recomendado) */}
      <section id="precios" className="py-20">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Planes sencillos y transparentes
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Empieza sin coste y escala solo cuando lo necesites.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
          {PLANES.map((plan) => (
            <article
              key={plan.nombre}
              className={`relative flex h-full flex-col justify-between rounded-2xl p-8 transition ${
                plan.destacado
                  ? 'border-2 border-indigo-600 bg-white shadow-xl lg:scale-105 dark:border-indigo-500 dark:bg-slate-900'
                  : 'border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              {plan.destacado && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold tracking-wide text-white uppercase dark:bg-indigo-500">
                  Recomendado
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold">{plan.nombre}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {plan.descripcion}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.precio}</span>
                  <span className="text-slate-500 dark:text-slate-400">{plan.periodo}</span>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {plan.beneficios.map((beneficio) => (
                    <li key={beneficio} className="flex items-center gap-2">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">✓</span>
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`mt-8 w-full cursor-pointer rounded-xl px-4 py-3 font-semibold transition ${
                  plan.destacado
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Elegir {plan.nombre}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}