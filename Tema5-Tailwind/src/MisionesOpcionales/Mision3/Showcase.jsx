import { useState } from 'react';
import { Boton } from './Boton';
import { Badge } from './Badge';
import { Card } from './Card';
import { Input } from './Input';

export default function Showcase() {
  const [simulandoCarga, setSimulandoCarga] = useState(false);

  const lanzarCarga = () => {
    setSimulandoCarga(true);
    setTimeout(() => setSimulandoCarga(false), 1800);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      {/* Cabecera usando el token --font-display y la escala --color-aurora-* */}
      <header className="space-y-3 border-b border-slate-200 pb-8 dark:border-slate-800">
        <Badge color="aurora">Design System · v1.0</Badge>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-aurora-600 md:text-5xl dark:text-aurora-400">
          Aurora UI
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Librería de componentes construida con tokens CSS-first en{' '}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-800">@theme</code>,{' '}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-800">clsx</code> y{' '}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-800">tailwind-merge</code>.
        </p>
      </header>

      {/* Sección 1: Tokens de Color Aurora (50 a 700 en oklch) */}
      <Card className="space-y-4">
        <h2 className="font-display text-xl font-bold">1. Tokens de color (oklch)</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          <div className="space-y-1 text-center">
            <div className="h-12 rounded-lg border border-slate-200 bg-aurora-50 dark:border-slate-700" />
            <span className="text-xs font-medium">50</span>
          </div>
          <div className="space-y-1 text-center">
            <div className="h-12 rounded-lg bg-aurora-100" />
            <span className="text-xs font-medium">100</span>
          </div>
          <div className="space-y-1 text-center">
            <div className="h-12 rounded-lg bg-aurora-200" />
            <span className="text-xs font-medium">200</span>
          </div>
          <div className="space-y-1 text-center">
            <div className="h-12 rounded-lg bg-aurora-300" />
            <span className="text-xs font-medium">300</span>
          </div>
          <div className="space-y-1 text-center">
            <div className="h-12 rounded-lg bg-aurora-400" />
            <span className="text-xs font-medium">400</span>
          </div>
          <div className="space-y-1 text-center">
            <div className="h-12 rounded-lg bg-aurora-500" />
            <span className="text-xs font-medium">500</span>
          </div>
          <div className="space-y-1 text-center">
            <div className="h-12 rounded-lg bg-aurora-600" />
            <span className="text-xs font-medium">600</span>
          </div>
          <div className="space-y-1 text-center">
            <div className="h-12 rounded-lg bg-aurora-700" />
            <span className="text-xs font-medium">700</span>
          </div>
        </div>
      </Card>

      {/* Sección 2: Botones (Variantes, Tamaños, Retos peligro/cargando y Override de cn) */}
      <Card className="space-y-6">
        <h2 className="font-display text-xl font-bold">2. Componente &lt;Boton /&gt;</h2>

        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Variantes</p>
          <div className="flex flex-wrap items-center gap-3">
            <Boton variante="solido">Sólido</Boton>
            <Boton variante="contorno">Contorno</Boton>
            <Boton variante="fantasma">Fantasma</Boton>
            <Boton variante="peligro">Peligro (Reto)</Boton>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Tamaños y Override con cn()</p>
          <div className="flex flex-wrap items-center gap-3">
            <Boton tamano="sm">Pequeño (sm)</Boton>
            <Boton tamano="md">Mediano (md)</Boton>
            <Boton tamano="lg">Grande (lg)</Boton>
            <Boton className="px-8">Override px-8 (sin px-4)</Boton>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Estados interactivos</p>
          <div className="flex flex-wrap items-center gap-3">
            <Boton cargando={simulandoCarga} onClick={lanzarCarga}>
              {simulandoCarga ? 'Guardando...' : 'Probar estado cargando'}
            </Boton>
            <Boton disabled>Deshabilitado</Boton>
          </div>
        </div>
      </Card>

      {/* Sección 3: Badges */}
      <Card className="space-y-4">
        <h2 className="font-display text-xl font-bold">3. Componente &lt;Badge /&gt;</h2>
        <div className="flex flex-wrap gap-3">
          <Badge color="aurora">Aurora</Badge>
          <Badge color="exito">Completado</Badge>
          <Badge color="aviso">En revisión</Badge>
          <Badge color="peligro">Crítico</Badge>
          <Badge color="neutro">Archivado</Badge>
        </div>
      </Card>

      {/* Sección 4: Inputs accesibles */}
      <Card className="space-y-6">
        <h2 className="font-display text-xl font-bold">4. Componente &lt;Input /&gt;</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Nombre del proyecto"
            placeholder="Ej. Aurora Design System"
          />
          <Input
            label="Correo electrónico"
            defaultValue="usuario-invalido"
            error="Introduce una dirección de correo válida."
          />
          <Input
            label="Token de API (solo lectura)"
            value="aur_live_98a76f54d321"
            disabled
          />
        </div>
      </Card>
    </div>
  );
}