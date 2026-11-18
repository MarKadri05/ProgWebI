import { cn } from './cn';

const COLORES = {
  aurora: 'bg-aurora-100 text-aurora-700 dark:bg-aurora-700/30 dark:text-aurora-200',
  exito: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  aviso: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  peligro: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
  neutro: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
};

export function Badge({ color = 'aurora', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        COLORES[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}