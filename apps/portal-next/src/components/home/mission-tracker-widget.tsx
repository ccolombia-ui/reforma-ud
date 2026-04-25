'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Lock, Play, CheckCircle2, Trophy, Target, Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { useActiveProfile } from '@/lib/ui-state';
import { calcAllMissions, getActiveMission, calcMissionStats, type MissionState } from '@/lib/mission-state';
import { cn } from '@/lib/utils';

/**
 * MissionTrackerWidget — vista compacta del progreso M01→M12.
 * Muestra cascada de unlocks + misión activa destacada + stats globales.
 */
export function MissionTrackerWidget() {
  const { role, meta } = useActiveProfile();
  const [readingState, setReadingState] = useState<ReadingState | null>(null);

  useEffect(() => {
    setReadingState(getReadingState());
    const onChange = () => setReadingState(getReadingState());
    window.addEventListener('reading-state-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('reading-state-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const missions = useMemo(() => calcAllMissions(readingState, role), [readingState, role]);
  const active = useMemo(() => getActiveMission(missions), [missions]);
  const stats = useMemo(() => calcMissionStats(missions), [missions]);

  const isDirector = role === 'docente-director';

  return (
    <section className="space-y-3">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Mision Tracker · Corpus MI-12
          </h2>
          <p className="text-xs text-muted-foreground">
            {isDirector
              ? 'Vista ejecutiva: todas las investigaciones desbloqueadas (rol Director).'
              : 'Avanza secuencialmente M01 → M12. Cada misión completa otorga un CCA imprimible.'}
          </p>
        </div>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link href="/mision">
            Ruta completa <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <StatPill label="Completas" value={stats.completed} total={stats.total} accent="var(--color-brand-emerald)" />
        <StatPill label="En curso" value={stats.inProgress} total={stats.total} accent="var(--color-brand-orange)" />
        <StatPill label="CCAs" value={stats.ccasEarned} total={stats.total} accent="var(--color-brand-purple)" Icon={Trophy} />
        <StatPill label="Avance global" value={stats.totalProgress} total={100} accent="var(--color-brand-blue)" suffix="%" />
      </div>

      {/* Misión activa destacada */}
      {active && !isDirector && (
        <ActiveMissionBadge mission={active} roleEmoji={meta.emoji} />
      )}

      {/* Lista compacta M01→M12 */}
      <Card>
        <CardContent className="p-2">
          <ul className="divide-y divide-border">
            {missions.map((m) => (
              <MissionRow key={m.paperId} mission={m} isActive={active?.paperId === m.paperId} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

/* ============================================================
 * StatPill
 * ============================================================ */

function StatPill({
  label,
  value,
  total,
  accent,
  suffix = '',
  Icon,
}: {
  label: string;
  value: number;
  total: number;
  accent: string;
  suffix?: string;
  Icon?: typeof Trophy;
}) {
  return (
    <div className="rounded-md border bg-background p-2.5 border-l-4" style={{ borderLeftColor: accent }}>
      <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </div>
      <div className="mt-0.5 flex items-baseline gap-1">
        <span className="text-xl font-bold tracking-tight" style={{ color: accent }}>
          {value}{suffix}
        </span>
        {!suffix && total > 0 && (
          <span className="text-[10px] text-muted-foreground">/{total}</span>
        )}
      </div>
    </div>
  );
}

/* ============================================================
 * ActiveMissionBadge — destaca la misión en curso
 * ============================================================ */

function ActiveMissionBadge({ mission, roleEmoji }: { mission: MissionState; roleEmoji: string }) {
  return (
    <Link
      href={`/mision/${mission.paperId}`}
      className="block rounded-lg border-2 border-primary/30 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-4 hover:border-primary/60 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide text-primary">
            <span>{roleEmoji}</span>
            <span>Misión activa</span>
            <Badge variant="secondary" className="font-mono text-[9px]">
              M{String(mission.number).padStart(2, '0')}
            </Badge>
          </div>
          <h3 className="text-sm font-semibold mt-0.5 line-clamp-1">{mission.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${mission.progress}%` }} />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
              {mission.progress}%
            </span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>{mission.sectionsRead}/{mission.sectionsTotal} secciones</span>
            {mission.questionsTotal > 0 && (
              <span>{mission.questionsVerified}/{mission.questionsTotal} preguntas</span>
            )}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>
    </Link>
  );
}

/* ============================================================
 * MissionRow — fila compacta de UNA misión
 * ============================================================ */

function MissionRow({ mission, isActive }: { mission: MissionState; isActive: boolean }) {
  const statusConfig = {
    locked:        { Icon: Lock,         color: 'text-muted-foreground',       bg: 'bg-muted/40',           label: 'Bloqueada' },
    active:        { Icon: Play,         color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-500/10',  label: 'Disponible' },
    'in-progress': { Icon: Play,         color: 'text-primary',                 bg: 'bg-primary/10',         label: 'En curso' },
    completed:    { Icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', label: 'Completa' },
  } as const;

  const cfg = statusConfig[mission.status];
  const Icon = cfg.Icon;
  const locked = mission.status === 'locked';

  const inner = (
    <>
      {/* Status icon */}
      <div className={cn('flex h-7 w-7 items-center justify-center rounded-md shrink-0', cfg.bg)}>
        <Icon className={cn('h-3.5 w-3.5', cfg.color)} />
      </div>

      {/* M## badge */}
      <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">
        M{String(mission.number).padStart(2, '0')}
      </span>

      {/* Title + progress bar */}
      <div className="flex-1 min-w-0">
        <p className={cn('text-xs font-medium line-clamp-1', locked && 'text-muted-foreground')}>
          {mission.title}
        </p>
        {!locked && mission.sectionsTotal > 0 && (
          <div className="mt-1 h-1 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                mission.status === 'completed' ? 'bg-emerald-500' : 'bg-primary',
              )}
              style={{ width: `${mission.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Progress % o CCA badge */}
      <div className="shrink-0 flex items-center gap-1.5">
        {mission.hasCCA ? (
          <Badge variant="outline" className="gap-1 text-[9px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <Trophy className="h-2.5 w-2.5" />
            CCA
          </Badge>
        ) : !locked ? (
          <span className="text-[10px] font-mono text-muted-foreground tabular-nums w-9 text-right">
            {mission.progress}%
          </span>
        ) : (
          <span className="text-[10px] text-muted-foreground italic">{cfg.label}</span>
        )}
        {!locked && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
      </div>
    </>
  );

  const baseClass = cn(
    'flex items-center gap-2.5 px-2 py-2 rounded-md transition-colors',
    locked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-accent/40 cursor-pointer',
    isActive && 'bg-primary/5 ring-1 ring-primary/20',
  );

  return (
    <li>
      {locked ? (
        <div className={baseClass} aria-disabled="true" title={`Completa M${String(mission.number - 1).padStart(2, '0')} para desbloquear`}>
          {inner}
        </div>
      ) : (
        <Link href={`/mision/${mission.paperId}`} className={baseClass}>
          {inner}
        </Link>
      )}
    </li>
  );
}
