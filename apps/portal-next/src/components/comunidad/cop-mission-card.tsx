'use client';

import Link from 'next/link';
import { Lock, Play, Clock, CheckCircle2, BookOpen, Scale, Hammer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type MisionCoP = {
  id: string;
  slug: string;
  titulo: string;
  tipo: 'comprension' | 'deliberacion' | 'produccion';
  descripcion?: string;
  papers: string[];
  nivelRequerido: number;
  nivelOtorga?: number;
  prerequisitosCanonicas: string[];
  prerequisitosMision: string[];
  estatuto?: string;
  orden: number;
};

export type MisionCoPStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export function calcMisionCoPStatus({
  mision,
  userLevel,
  earnedCCAs,
  completedMisionIds,
}: {
  mision: MisionCoP;
  userLevel: number;
  earnedCCAs: string[];
  completedMisionIds: string[];
}): MisionCoPStatus {
  const levelOk = userLevel >= mision.nivelRequerido;
  const canonicasOk = mision.prerequisitosCanonicas.every((p) => earnedCCAs.includes(p));
  const misionesOk = mision.prerequisitosMision.every((id) => completedMisionIds.includes(id));

  if (!levelOk || !canonicasOk || !misionesOk) return 'locked';
  if (completedMisionIds.includes(mision.id)) return 'completed';
  return 'available';
}

const TIPO_META: Record<MisionCoP['tipo'], { label: string; icon: React.ReactNode; color: string }> = {
  comprension: { label: 'Comprensión', icon: <BookOpen className="h-3 w-3" />, color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
  deliberacion: { label: 'Deliberación', icon: <Scale className="h-3 w-3" />, color: 'bg-orange-500/10 text-orange-700 border-orange-200' },
  produccion:   { label: 'Producción',   icon: <Hammer className="h-3 w-3" />,  color: 'bg-green-500/10 text-green-700 border-green-200' },
};

const STATUS_META: Record<MisionCoPStatus, { icon: React.ReactNode; label: string }> = {
  locked:      { icon: <Lock className="h-4 w-4 text-muted-foreground" />, label: 'Bloqueada' },
  available:   { icon: <Play className="h-4 w-4 text-primary" />, label: 'Disponible' },
  'in-progress': { icon: <Clock className="h-4 w-4 text-orange-500" />, label: 'En progreso' },
  completed:   { icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, label: 'Completada' },
};

type Props = {
  mision: MisionCoP;
  status: MisionCoPStatus;
  comunidadHref: string;
};

export function CoPMissionCard({ mision, status, comunidadHref }: Props) {
  const tipo = TIPO_META[mision.tipo];
  const statusMeta = STATUS_META[status];
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  return (
    <div
      className={cn(
        'rounded-lg border p-4 flex flex-col gap-3 transition-colors',
        isLocked && 'opacity-60 bg-muted/30',
        isCompleted && 'border-green-200 bg-green-500/5',
        !isLocked && !isCompleted && 'hover:border-primary/40',
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-muted-foreground">{mision.id}</span>
          <Badge variant="outline" className={cn('gap-1 text-xs', tipo.color)}>
            {tipo.icon}
            {tipo.label}
          </Badge>
          {mision.estatuto && (
            <Badge variant="secondary" className="text-xs">
              {mision.estatuto}
            </Badge>
          )}
        </div>
        <div className="shrink-0" title={statusMeta.label}>
          {statusMeta.icon}
        </div>
      </div>

      {/* Title + description */}
      <div>
        <h4 className={cn('font-medium text-sm leading-snug', isLocked && 'text-muted-foreground')}>
          {mision.titulo}
        </h4>
        {mision.descripcion && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{mision.descripcion}</p>
        )}
      </div>

      {/* Papers fuente */}
      {mision.papers.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {mision.papers.map((pid) => (
            <span key={pid} className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded uppercase">
              {pid}
            </span>
          ))}
        </div>
      )}

      {/* Nivel */}
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>Nivel requerido: N{mision.nivelRequerido}</span>
        {mision.nivelOtorga && (
          <span className="text-primary font-medium">→ Sube a N{mision.nivelOtorga}</span>
        )}
      </div>

      {/* CTA */}
      {!isLocked && (
        <Button
          asChild
          size="sm"
          variant={isCompleted ? 'outline' : 'default'}
          className="w-full mt-1"
        >
          <Link href={`${comunidadHref}/${mision.slug}`}>
            {isCompleted ? 'Ver constancia' : status === 'in-progress' ? 'Continuar' : 'Iniciar misión'}
          </Link>
        </Button>
      )}

      {isLocked && (
        <p className="text-xs text-muted-foreground">
          {mision.nivelRequerido > 0 && `Requiere nivel N${mision.nivelRequerido} en esta CoP.`}
          {mision.prerequisitosCanonicas.length > 0 && ` Completa ${mision.prerequisitosCanonicas.map(p => p.toUpperCase()).join(', ')} primero.`}
        </p>
      )}
    </div>
  );
}
