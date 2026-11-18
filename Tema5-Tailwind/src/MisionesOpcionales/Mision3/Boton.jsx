import { cn } from './cn';
import { Spinner } from './Spinner';

const VARIANTES = {
  solido:
    'bg-aurora-600 text-white hover:bg-aurora-700 active:bg-aurora-700 dark:bg-aurora-500 dark:hover:bg-aurora-600',
  contorno:
    'border border-aurora-600 text-aurora-700 hover:bg-aurora-50 dark:border-aurora-400 dark:text-aurora-300 dark:hover:bg-aurora-700/20',
  fantasma:
    'text-aurora-700 hover:bg-aurora-100/70 dark:text-aurora-300 dark:hover:bg-aurora-700/20',
  peligro:
    'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 dark:bg-rose-500 dark:hover:bg-rose-600',
};

const TAMANOS = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Boton({
  variante = 'solido',
  tamano = 'md',
  cargando = false,
  disabled = false,
  className,
  children,
  ...props
}) {
  const estaDeshabilitado = disabled || cargando;

  return (
    <button
      type="button"
      disabled={estaDeshabilitado}
      aria-busy={cargando}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus-visible:ring-2 focus-visible:ring-aurora-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-950',
        VARIANTES[variante],
        TAMANOS[tamano],
        className
      )}
      {...props}
    >
      {cargando && <Spinner />}
      {children}
    </button>
  );
}