'use client';

import { useEffect, useMemo, useState } from 'react';
import { Shield, Trophy, Lock, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { getReadingState } from '@/lib/reading-state';
import { calcAllMissions } from '@/lib/mission-state';
import { getCompletedCoPMissions, calcUserCoPLevel, getCoPLevelName } from '@/lib/cop-access';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MisionCoP } from './cop-mission-card';

type RolDef = { nivel: number; nombre: string; emoji?: string };

type Props = {
  comunidadNombre: string;
  comunidadSlug: string;
  misionesCoP: MisionCoP[];
  roles: RolDef[];
  /** CCAs requeridos para acceder a esta CoP (por defecto M01) */
  ccaRequeridos?: string[];
};

/**
 * Panel de acceso a CoP — Gate de inscripción
 * Muestra CCAs ganados vs requeridos y estado de nivel
 */
export function CoPAccessPanel({
  comunidadNombre,
  comunidadSlug,
  misionesCoP,
  roles,
  ccaRequeridos = ['m01'],
}: Props) {
  const [earnedCCAs, setEarnedCCAs] = useState<string[]>([]);
  const [completedMisionIds, setCompletedMisionIds] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Lee estado de localStorage
  useEffect(() => {
    function sync() {
      const rs = getReadingState();
      const missions = calcAllMissions(rs);
      setEarnedCCAs(missions.filter((m) => m.hasCCA).map((m) => m.paperId));
      setCompletedMisionIds(getCompletedCoPMissions(comunidadSlug));
    }
    sync();
    window.addEventListener('reading-state-change', sync);
    window.addEventListener('cop-mission-completed', sync);
    return () => {
      window.removeEventListener('reading-state-change', sync);
      window.removeEventListener('cop-mission-completed', sync);
    };
  }, [comunidadSlug]);

  const userLevel = useMemo(
    () => calcUserCoPLevel(roles, misionesCoP, earnedCCAs, completedMisionIds),
    [roles, misionesCoP, earnedCCAs, completedMisionIds],
  );

  const levelName = getCoPLevelName(roles, userLevel);
  const currentRole = roles.find((r) => r.nivel === userLevel);
  const nextRole = roles.find((r) => r.nivel === userLevel + 1);

  // Calcular requisitos
  const ccaStatus = useMemo(() => {
    return ccaRequeridos.map((cca) => ({
      id: cca,
      earned: earnedCCAs.includes(cca),
    }));
  }, [ccaRequeridos, earnedCCAs]);

  const allCCAsEarned = ccaStatus.every((c) => c.earned);
  const ccaProgress = Math.round((ccaStatus.filter((c) => c.earned).length / ccaStatus.length) * 100);

  // Misiones completadas
  const misionesStats = useMemo(() => {
    const total = misionesCoP.length;
    const completed = misionesCoP.filter((m) => completedMisionIds.includes(m.id)).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, progress };
  }, [misionesCoP, completedMisionIds]);

  const hasAccess = allCCAsEarned;

  return (
    <div
      className={cn(
        'rounded-xl border p-5 transition-all',
        hasAccess
          ? 'bg-green-500/5 border-green-200'
          : 'bg-amber-500/5 border-amber-200',
      )}
    >
      {/* Header con estado de acceso */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
              hasAccess ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600',
            )}
          >
            {hasAccess ? <Shield className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="font-semibold text-base">
              {hasAccess ? 'Acceso habilitado' : 'Requisitos de acceso'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {hasAccess
                ? `Puedes participar en ${comunidadNombre}`
                : `Completa los requisitos para unirte a ${comunidadNombre}`}
            </p>
          </div>
        </div>

        {userLevel > 0 && (
          <Badge variant="outline" className="gap-1.5 shrink-0">
            <Trophy className="h-3.5 w-3.5 text-yellow-500" />
            {currentRole?.emoji} {levelName}
          </Badge>
        )}
      </div>

      {/* Requisitos CCAs */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            CCAs requeridos
          </span>
          <span className={cn('text-sm', allCCAsEarned ? 'text-green-600' : 'text-amber-600')}>
            {ccaStatus.filter((c) => c.earned).length}/{ccaStatus.length} completados
          </span>
        </div>

        <Progress value={ccaProgress} className="h-2" />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ccaStatus.map(({ id, earned }) => (
            <div
              key={id}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm border',
                earned
                  ? 'bg-green-500/10 border-green-200 text-green-700'
                  : 'bg-muted/50 border-muted text-muted-foreground',
              )}
            >
              {earned ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" />
              )}
              <span className="font-mono uppercase">{id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progreso de misiones */}
      {hasAccess && misionesStats.total > 0 && (
        <div className="mt-5 pt-5 border-t">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              Progreso en misiones
            </span>
            <span className="text-muted-foreground">
              {misionesStats.completed}/{misionesStats.total} completadas
            </span>
          </div>
          <Progress value={misionesStats.progress} className="h-2" />
        </div>
      )}

      {/* Siguiente nivel */}
      {hasAccess && nextRole && (
        <div className="mt-4 p-3 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Siguiente nivel:</span>{' '}
            {nextRole.emoji} {nextRole.nombre}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Completa más misiones para alcanzar el siguiente nivel en esta CoP.
          </p>
        </div>
      )}

      {/* Botón expandir detalles */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 w-full"
      >
        {isExpanded ? 'Ocultar detalles' : 'Ver detalles de niveles'}
      </Button>

      {/* Detalles expandidos */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t space-y-2">
          <h4 className="text-sm font-medium">Jerarquía de niveles</h4>
          <div className="space-y-1.5">
            {roles
              .slice()
              .sort((a, b) => a.nivel - b.nivel)
              .map((rol) => {
                const isCurrent = rol.nivel === userLevel;
                const isUnlocked = rol.nivel <= userLevel;
                return (
                  <div
                    key={rol.nivel}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                      isCurrent && 'bg-primary/10 border border-primary/20',
                      !isCurrent && isUnlocked && 'bg-green-500/5',
                      !isUnlocked && 'text-muted-foreground',
                    )}
                  >
                    {isUnlocked ? (
                      <CheckCircle2
                        className={cn(
                          'h-4 w-4 shrink-0',
                          isCurrent ? 'text-primary' : 'text-green-500',
                        )}
                      />
                    ) : (
                      <Lock className="h-4 w-4 shrink-0" />
                    )}
                    <span className="font-mono text-xs w-8">N{rol.nivel}</span>
                    <span className={cn('flex-1', isCurrent && 'font-medium')}>
                      {rol.emoji} {rol.nombre}
                    </span>
                    {isCurrent && <Badge variant="outline" className="text-xs">Actual</Badge>}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
