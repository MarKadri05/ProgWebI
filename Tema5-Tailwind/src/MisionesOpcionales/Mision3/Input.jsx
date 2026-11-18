import { useId } from 'react';
import { cn } from './cn';

export function Input({
  label,
  error,
  disabled = false,
  className,
  id,
  ...props
}) {
  const idGenerado = useId();
  const inputId = id ?? idGenerado;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-slate-900 transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:disabled:bg-slate-900',
          error
            ? 'border-rose-500 focus-visible:ring-rose-500'
            : 'border-slate-300 focus-visible:border-aurora-500 focus-visible:ring-aurora-500 dark:border-slate-700',
          className
        )}
        {...props}
      />

      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}