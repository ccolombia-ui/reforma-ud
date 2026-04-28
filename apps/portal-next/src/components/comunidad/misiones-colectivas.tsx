import Link from 'next/link';
import { Target, CheckCircle2, Circle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MisionColectiva = {
  id: string;
  titulo: string;
  descripcion?: string;
  progreso: number;
  estado: 'pendiente' | 'activo' | 'completado';
  papers: string[];
};

const ESTADO_ICON = {
  completado: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
  activo:     <Clock className="h-3.5 w-3.5 text-amber-500" />,
  pendiente:  <Circle className="h-3.5 w-3.5 text-muted-foreground" />,
};

const ESTADO_LABEL = {
  completado: 'Completada',
  activo:     'En progreso',
  pendiente:  'Pendiente',
};

const PROGRESO_COLOR = {
  completado: 'bg-emerald-500',
  activo:     'bg-amber-500',
  pendiente:  'bg-muted-foreground/30',
};

/**
 * MisionesColectivas — progress bars de objetivos grupales de la comunidad.
 * G-V7-04 · v7.0
 */
export function MisionesColectivas({
  misiones,
  copSlug,
}: Readonly<{
  misiones: MisionColectiva[];
  copSlug: string;
}>) {
  if (!misiones || misiones.length === 0) return null;

  const activas = misiones.filter((m) => m.estado !== 'completado');
  const completadas = misiones.filter((m) => m.estado === 'completado');

  return (
    <section className="space-y-4" id="misiones-colectivas">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Target className="h-4 w-4 text-primary" />
          Misiones colectivas
          <Badge variant="secondary" className="text-[10px]">
            {activas.length} activas
          </Badge>
        </h2>
        <span className="text-xs text-muted-foreground">
          {completadas.length}/{misiones.length} completadas
        </span>
      </header>

      <div className="space-y-3">
        {misiones.map((m) => (
          <Card key={m.id} className={cn('p-4', m.estado === 'pendiente' && 'opacity-60')}>
            <div className="mb-2 flex items-start gap-2">
              <span className="mt-0.5 shrink-0">{ESTADO_ICON[m.estado]}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">{m.id}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[9px]',
                      m.estado === 'activo' && 'border-amber-500/30 text-amber-700 dark:text-amber-300',
                      m.estado === 'completado' && 'border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
                    )}
                  >
                    {ESTADO_LABEL[m.estado]}
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm font-medium">{m.titulo}</p>
                {m.descripcion && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{m.descripcion}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progreso</span>
                <span className="font-mono">{m.progreso}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn('h-full rounded-full transition-all', PROGRESO_COLOR[m.estado])}
                  style={{ width: `${m.progreso}%` }}
                />
              </div>
            </div>

            {m.papers.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {m.papers.map((pid) => (
                  <Link key={pid} href={`/canonico/${pid}/`}>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer font-mono text-[9px] hover:bg-primary/20"
                    >
                      {pid.toUpperCase()}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
