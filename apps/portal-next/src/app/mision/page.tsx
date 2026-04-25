'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, Lock, Play, CheckCircle2, Trophy, Sparkles, Target, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { canonicPaper } from '#site/content';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { useActiveProfile } from '@/lib/ui-state';
import { calcAllMissions, getActiveMission, calcMissionStats, type MissionState } from '@/lib/mission-state';
import { cn } from '@/lib/utils';

export default function MisionOverviewPage() {
  const { role, name, meta } = useActiveProfile();
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
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 space-y-8">
      {/* Top nav */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Inicio
        </Link>
        <span>/</span>
        <span>Misión</span>
      </div>

      {/* Hero */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="secondary" className="font-mono uppercase">
            <Target className="h-3 w-3 mr-1" /> Ruta de aprendizaje
          </Badge>
          <span className="text-muted-foreground">Corpus MI-12 · {meta.emoji} {name}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Tu ruta secuencial por las <span className="text-primary">12 investigaciones canónicas</span>
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          {isDirector
            ? 'Como Director Estratégico, tienes acceso simultáneo a todas las investigaciones para overview ejecutivo. Cada misión completa otorga una Constancia de Comprensión Acreditada (CCA) imprimible.'
            : 'Avanza secuencialmente M01 → M12. Para desbloquear M(n+1) debes completar M(n). Cada misión completa otorga una Constancia de Comprensión Acreditada (CCA) imprimible que acredita tu lectura comprensiva.'}
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Completas" value={`${stats.completed}/${stats.total}`} accent="var(--color-brand-emerald)" Icon={CheckCircle2} />
        <StatCard label="En curso" value={`${stats.inProgress}`} accent="var(--color-brand-orange)" Icon={Play} />
        <StatCard label="CCAs ganados" value={`${stats.ccasEarned}`} accent="var(--color-brand-purple)" Icon={Trophy} />
        <StatCard label="Avance global" value={`${stats.totalProgress}%`} accent="var(--color-brand-blue)" Icon={Map} />
      </section>

      {/* Misión activa destacada */}
      {active && !isDirector && (
        <Link
          href={`/mision/${active.paperId}`}
          className="block rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 hover:border-primary/60 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
                <span>{meta.emoji}</span>
                <span>Tu misión activa</span>
                <Badge variant="secondary" className="font-mono">
                  M{String(active.number).padStart(2, '0')}
                </Badge>
              </div>
              <h2 className="text-xl font-semibold mt-1">{active.title}</h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${active.progress}%` }} />
                </div>
                <span className="text-sm font-mono tabular-nums">{active.progress}%</span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{active.sectionsRead}/{active.sectionsTotal} secciones leídas</span>
                {active.questionsTotal > 0 && (
                  <span>{active.questionsVerified}/{active.questionsTotal} preguntas verificadas</span>
                )}
              </div>
              <Button size="sm" className="mt-3 gap-1.5">
                Continuar misión <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
              </Button>
            </div>
          </div>
        </Link>
      )}

      {/* Lista completa M01→M12 */}
      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Tu camino M01 → M12</h2>
        <div className="space-y-2">
          {missions.map((m, idx) => (
            <MissionCard key={m.paperId} mission={m} prevMission={idx > 0 ? missions[idx - 1] : null} isActive={active?.paperId === m.paperId} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ============================================================
 * StatCard
 * ============================================================ */

function StatCard({ label, value, accent, Icon }: { label: string; value: string; accent: string; Icon: typeof Trophy }) {
  return (
    <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: accent }}>
      <CardContent className="p-4">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </div>
        <div className="mt-1 text-2xl font-bold tracking-tight" style={{ color: accent }}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
 * MissionCard — fila grande de UNA misión
 * ============================================================ */

function MissionCard({ mission, prevMission, isActive }: { mission: MissionState; prevMission: MissionState | null; isActive: boolean }) {
  const paper = canonicPaper.find((p) => p.id === mission.paperId);
  const locked = mission.status === 'locked';

  const statusConfig = {
    locked:        { Icon: Lock,         color: 'text-muted-foreground',                bg: 'bg-muted/50',           ring: '',                   label: 'Bloqueada' },
    active:        { Icon: Play,         color: 'text-amber-600 dark:text-amber-400',   bg: 'bg-amber-500/10',       ring: 'ring-amber-500/20',   label: 'Disponible' },
    'in-progress': { Icon: Play,         color: 'text-primary',                          bg: 'bg-primary/10',         ring: 'ring-primary/20',     label: 'En curso' },
    completed:    { Icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10',     ring: 'ring-emerald-500/20', label: 'Completa' },
  } as const;

  const cfg = statusConfig[mission.status];
  const Icon = cfg.Icon;

  const inner = (
    <Card
      className={cn(
        'transition-all',
        locked ? 'opacity-50' : 'hover:border-primary/40 hover:shadow-sm',
        isActive && 'ring-2 ring-primary/30',
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Status icon big */}
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg shrink-0', cfg.bg, cfg.ring && `ring-2 ${cfg.ring}`)}>
            <Icon className={cn('h-5 w-5', cfg.color)} />
          </div>

          {/* Body */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-primary font-bold">
                M{String(mission.number).padStart(2, '0')}
              </span>
              <Badge variant="outline" className="text-[9px] capitalize">{cfg.label}</Badge>
              {mission.hasCCA && (
                <Badge variant="outline" className="gap-1 text-[9px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  <Trophy className="h-2.5 w-2.5" /> CCA ganado
                </Badge>
              )}
            </div>
            <h3 className="text-base font-semibold mt-0.5 line-clamp-2">{mission.title}</h3>
            {paper?.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{paper.description}</p>
            )}

            {/* Progress */}
            {!locked && mission.sectionsTotal > 0 && (
              <>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        mission.status === 'completed' ? 'bg-emerald-500' : 'bg-primary',
                      )}
                      style={{ width: `${mission.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground tabular-nums w-10 text-right">
                    {mission.progress}%
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{mission.sectionsRead}/{mission.sectionsTotal} secciones</span>
                  {mission.questionsTotal > 0 && (
                    <span>{mission.questionsVerified}/{mission.questionsTotal} preguntas</span>
                  )}
                </div>
              </>
            )}

            {locked && prevMission && (
              <p className="mt-2 text-[10px] text-muted-foreground italic">
                Completa <span className="font-mono">M{String(prevMission.number).padStart(2, '0')}</span> para desbloquear esta misión.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (locked) return <div aria-disabled="true">{inner}</div>;
  return <Link href={`/mision/${mission.paperId}`}>{inner}</Link>;
}
