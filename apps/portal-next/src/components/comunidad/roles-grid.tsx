import { Users, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Rol = {
  nivel: number;
  nombre: string;
  descripcion?: string;
  emoji?: string;
};

type Miembro = {
  nombre: string;
  rol?: string;
  nivel?: number;
  avatar?: string;
};

const NIVEL_COLORS: Record<number, string> = {
  1: 'border-slate-300/50 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-900/30',
  2: 'border-blue-300/50 bg-blue-50/50 dark:border-blue-700/50 dark:bg-blue-900/30',
  3: 'border-violet-300/50 bg-violet-50/50 dark:border-violet-700/50 dark:bg-violet-900/30',
  4: 'border-amber-300/50 bg-amber-50/50 dark:border-amber-700/50 dark:bg-amber-900/30',
};

const NIVEL_BADGE: Record<number, string> = {
  1: 'border-slate-400/30 text-slate-600 dark:text-slate-400',
  2: 'border-blue-400/30 text-blue-700 dark:text-blue-400',
  3: 'border-violet-400/30 text-violet-700 dark:text-violet-400',
  4: 'border-amber-400/30 text-amber-700 dark:text-amber-400',
};

/**
 * RolesGrid — muestra los niveles N1-N4 de la comunidad y los miembros actuales.
 * G-V7-05 · v7.0
 */
export function RolesGrid({
  roles,
  miembros,
}: Readonly<{
  roles: Rol[];
  miembros: Miembro[];
}>) {
  if (!roles || roles.length === 0) return null;

  const rolesOrdenados = [...roles].sort((a, b) => a.nivel - b.nivel);

  return (
    <section className="space-y-4" id="roles">
      <header className="flex items-center gap-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Shield className="h-4 w-4 text-primary" />
          Roles y miembros
        </h2>
        {miembros.length > 0 && (
          <Badge variant="secondary" className="text-[10px]">
            <Users className="mr-1 h-3 w-3" />
            {miembros.length} miembros
          </Badge>
        )}
      </header>

      {/* Niveles de roles */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {rolesOrdenados.map((rol) => {
          const miembrosEnNivel = miembros.filter((m) => m.nivel === rol.nivel);
          return (
            <Card
              key={rol.nivel}
              className={cn('p-3', NIVEL_COLORS[rol.nivel] ?? '')}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-lg leading-none" aria-hidden>
                  {rol.emoji ?? '●'}
                </span>
                <Badge
                  variant="outline"
                  className={cn('font-mono text-[9px]', NIVEL_BADGE[rol.nivel] ?? '')}
                >
                  N{rol.nivel}
                </Badge>
              </div>
              <p className="text-xs font-semibold">{rol.nombre}</p>
              {rol.descripcion && (
                <p className="mt-1 line-clamp-2 text-[10px] text-muted-foreground">
                  {rol.descripcion}
                </p>
              )}
              {miembrosEnNivel.length > 0 && (
                <div className="mt-2 space-y-0.5">
                  {miembrosEnNivel.map((m, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[8px] font-bold text-primary">
                        {m.nombre.charAt(0)}
                      </div>
                      <span className="line-clamp-1 text-[10px] text-foreground">
                        {m.nombre}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
