import { useState } from 'react';

const PROYECTOS = [
  {
    id: 'lumen-app',
    titulo: 'Lumen Study',
    descripcion: 'Aplicación de hábitos de estudio con temporizador Pomodoro adaptable y seguimiento de rachas.',
    imagen: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    etiquetas: ['React', 'Tailwind'],
    url: '#lumen',
  },
  {
    id: 'gwent-builder',
    titulo: 'Gwent Deck Builder',
    descripcion: 'Constructor de mazos con validación de esquemas en tiempo real y caché remota optimizada.',
    imagen: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    etiquetas: ['React', 'Zod', 'API'],
    url: '#gwent',
  },
  {
    id: 'memory-dom',
    titulo: 'Memory DOM Engine',
    descripcion: 'Juego de memoria con renderizado mediante DocumentFragment y delegación de eventos pura.',
    imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    etiquetas: ['JavaScript', 'DOM'],
    url: '#memory',
  },
  {
    id: 'task-pulse',
    titulo: 'TaskPulse Dashboard',
    descripcion: 'Panel de control analítico con métricas de productividad y soporte nativo para modo oscuro.',
    imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    etiquetas: ['Tailwind', 'JavaScript'],
    url: '#taskpulse',
  },
  {
    id: 'weather-async',
    titulo: 'Clima Async Radar',
    descripcion: 'Consulta meteorológica en tiempo real con manejo robusto de estados de carga y fallos de red.',
    imagen: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    etiquetas: ['API', 'JavaScript'],
    url: '#clima',
  },
  {
    id: 'form-guard',
    titulo: 'HackU-tad Inscripciones',
    descripcion: 'Formulario accesible multi-campo con validaciones cruzadas y feedback instantáneo.',
    imagen: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    etiquetas: ['React', 'Zod'],
    url: '#hackathon',
  },
];

// Extraemos dinámicamente las etiquetas únicas para los botones de filtro
const TODAS_ETIQUETAS = ['Todas', ...new Set(PROYECTOS.flatMap((p) => p.etiquetas))];

export default function Mision2DevFolio() {
  const [etiquetaActiva, setEtiquetaActiva] = useState('Todas');

  // Filtrado declarativo usando .filter()
  const proyectosFiltrados =
    etiquetaActiva === 'Todas'
      ? PROYECTOS
      : PROYECTOS.filter((proyecto) => proyecto.etiquetas.includes(etiquetaActiva));

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {/* Cabecera de la galería */}
      <header className="mb-10 text-center">
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-bold tracking-wider text-indigo-700 uppercase dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
          Portafolio Interactivo
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
          Galería de «DevFolio»
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          Explora proyectos filtrando por tecnología y comprueba las microinteracciones coordinadas con ratón y teclado.
        </p>

        {/* Reto extra: Filtro de etiquetas con useState */}
        <div
          role="group"
          aria-label="Filtrar proyectos por tecnología"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {TODAS_ETIQUETAS.map((etiqueta) => {
            const activa = etiquetaActiva === etiqueta;
            return (
              <button
                key={etiqueta}
                type="button"
                onClick={() => setEtiquetaActiva(etiqueta)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                  activa
                    ? 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-500'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {etiqueta}
              </button>
            );
          })}
        </div>
      </header>

      {/* Fase 3: Rejilla 1 -> 2 (sm:) -> 3 (lg:) columnas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {proyectosFiltrados.map((proyecto) => (
          /* Fase 4 y 5: Tarjeta como enlace con group, overflow-hidden y focus-visible:ring-2 */
          <a
            key={proyecto.id}
            href={proyecto.url}
            onClick={(e) => e.preventDefault()}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Contenedor de imagen con overflow-hidden para mantener las esquinas intactas al hacer zoom */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                src={proyecto.imagen}
                alt={`Vista previa de ${proyecto.titulo}`}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Reto extra: Degradado sobre la imagen visible solo en hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
              />
            </div>

            {/* Cuerpo de la tarjeta */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                {/* Badges de etiquetas */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {proyecto.etiquetas.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Título con color de acento en group-hover */}
                <h2 className="text-xl font-bold text-slate-900 transition duration-300 group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
                  {proyecto.titulo}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {proyecto.descripcion}
                </p>
              </div>

              {/* Pie de tarjeta con flecha animada con group-hover:translate-x-1 */}
              <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Ver proyecto</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}