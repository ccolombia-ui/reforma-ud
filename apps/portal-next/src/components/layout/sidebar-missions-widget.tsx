'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Target, ChevronRight, Trophy, Sparkles } from 'lucide-react';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { useActiveProfile } from '@/lib/ui-state';
import { calcAllMissions, getActiveMission, calcMissionStats } from '@/lib/mission-state';
import { cn } from '@/lib/utils';

/**
 * SidebarMissionsWidget — pieza de pertenencia/resultados al tope del sidebar.
 * Muestra: misión activa (con progress) + stats compactos (completadas/CCAs).
 * Click → /mision para ver la ruta completa.
 */
export function SidebarMissionsWidget() {
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

  return (
    <section className="border-b border-sidebar-border px-2 py-2.5">
      <div className="flex items-center justify-between px-1.5 mb-1.5">
        <h3 className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Target className="h-2.5 w-2.5" />
          Mi misión · {meta.emoji}
        </h3>
        <Link href="/mision" className="text-[9px] text-primary hover:underline inline-flex items-center gap-0.5">
          ruta <ChevronRight className="h-2.5 w-2.5" />
        </Link>
      </div>

      {active ? (
        <Link
          href={`/mision/${active.paperId}`}
          className="block rounded-md border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors p-2 space-y-1"
        >
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-2.5 w-2.5 text-primary shrink-0" />
            <span className="font-mono text-[9px] text-primary font-bold">
              M{String(active.number).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-muted-foreground">en curso</span>
          </div>
          <p className="text-[11px] font-medium leading-tight line-clamp-2">{active.title}</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full',
                  active.status === 'completed' ? 'bg-emerald-500' : 'bg-primary',
                )}
                style={{ width: `${active.progress}%` }}
              />
            </div>
            <span className="text-[9px] font-mono tabular-nums text-muted-foreground w-7 text-right">
              {active.progress}%
            </span>
          </div>
        </Link>
      ) : (
        <Link
          href="/mision"
          className="block rounded-md border border-dashed bg-muted/30 hover:bg-muted/50 transition-colors p-2 text-center"
        >
          <p className="text-[10px] text-muted-foreground">¡Felicitaciones!</p>
          <p className="text-[10px] font-medium">Has completado tu ruta</p>
        </Link>
      )}

      {/* Stats compactos */}
      <div className="mt-1.5 grid grid-cols-3 gap-1 px-0.5">
        <Stat label="Hechas" value={`${stats.completed}/${stats.total}`} />
        <Stat label="Avance" value={`${stats.totalProgress}%`} />
        <Stat label="CCAs" value={`${stats.ccasEarned}`} Icon={Trophy} />
      </div>
    </section>
  );
}

function Stat({ label, value, Icon }: Readonly<{ label: string; value: string; Icon?: typeof Trophy }>) {
  return (
    <div className="rounded bg-muted/30 px-1.5 py-1">
      <div className="text-[8px] uppercase tracking-wide text-muted-foreground inline-flex items-center gap-0.5">
        {Icon && <Icon className="h-2 w-2" />}
        {label}
      </div>
      <div className="text-[10px] font-bold tabular-nums">{value}</div>
    </div>
  );
}
