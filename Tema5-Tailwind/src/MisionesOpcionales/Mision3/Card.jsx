import { cn } from './cn';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-card border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}