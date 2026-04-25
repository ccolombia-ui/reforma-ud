'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Award, X, Sparkles, Trophy, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { useActiveProfile } from '@/lib/ui-state';
import { calcAllMissions, type MissionState } from '@/lib/mission-state';
import { cn } from '@/lib/utils';

/**
 * CCAEarnedModal — detecta cuando una misión transita a 'completed' y celebra.
 * Persiste por sesión un set de paperIds ya celebrados para no spamear.
 */
const CELEBRATED_KEY = 'reforma-ud:cca-celebrated';

function loadCelebrated(): Set<string> {
  if (typeof sessionStorage === 'undefined') return new Set();
  try {
    const raw = sessionStorage.getItem(CELEBRATED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveCelebrated(s: Set<string>): void {
  try {
    sessionStorage.setItem(CELEBRATED_KEY, JSON.stringify([...s]));
  } catch {}
}

export function CCAEarnedModal() {
  const { role, name, meta } = useActiveProfile();
  const [readingState, setReadingState] = useState<ReadingState | null>(null);
  const [earned, setEarned] = useState<MissionState | null>(null);
  const prevCompletedRef = useRef<Set<string>>(new Set());

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

  // Detectar transiciones a 'completed'
  useEffect(() => {
    const completedNow = new Set(missions.filter((m) => m.status === 'completed').map((m) => m.paperId));
    const prev = prevCompletedRef.current;
    const celebrated = loadCelebrated();

    // Inicializar prev en el primer render con lo que ya está completed (para no celebrar antiguos)
    if (prev.size === 0 && completedNow.size > 0 && celebrated.size === 0) {
      prevCompletedRef.current = completedNow;
      // Marcar como ya celebrados para sesión actual (caso "ya tenía CCAs")
      saveCelebrated(completedNow);
      return;
    }

    // Encontrar primera misión recién completada y NO celebrada en esta sesión
    for (const pid of completedNow) {
      if (!prev.has(pid) && !celebrated.has(pid)) {
        const mission = missions.find((m) => m.paperId === pid);
        if (mission) {
          setEarned(mission);
          celebrated.add(pid);
          saveCelebrated(celebrated);
          break;
        }
      }
    }
    prevCompletedRef.current = completedNow;
  }, [missions]);

  if (!earned) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={() => setEarned(null)}
    >
      <div
        className={cn(
          'relative w-full max-w-md rounded-xl border-2 border-amber-400/50 bg-background p-6 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setEarned(null)}
          aria-label="Cerrar"
          className="absolute top-3 right-3 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Confetti vibes — emoji background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-30">
          <div className="absolute -top-2 -left-2 text-3xl animate-bounce">🎉</div>
          <div className="absolute -top-1 right-2 text-2xl animate-pulse">✨</div>
          <div className="absolute bottom-4 -right-1 text-3xl animate-bounce">🏆</div>
          <div className="absolute bottom-6 -left-1 text-2xl animate-pulse">⭐</div>
        </div>

        {/* Sello */}
        <div className="relative text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg ring-4 ring-amber-200 dark:ring-amber-900/40">
            <Award className="h-10 w-10 text-white" />
          </div>
          <Badge className="absolute top-0 right-1/2 translate-x-12 -translate-y-1 bg-emerald-500 text-white border-emerald-600">
            <Sparkles className="h-2.5 w-2.5 mr-0.5" />
            ¡Nuevo!
          </Badge>
        </div>

        {/* Título */}
        <div className="relative mt-4 text-center space-y-1">
          <p className="text-xs uppercase tracking-widest font-mono text-amber-600 dark:text-amber-400">
            CCA · Misión M{String(earned.number).padStart(2, '0')} completada
          </p>
          <h2 className="text-2xl font-serif font-bold tracking-tight">¡Felicitaciones, {name}!</h2>
          <p className="text-sm text-muted-foreground">
            Has ganado tu Constancia de Comprensión Acreditada de
          </p>
          <p className="text-base font-semibold px-2 line-clamp-3">
            «{earned.title}»
          </p>
        </div>

        {/* Stats */}
        <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
          <Stat label="Secciones" value={`${earned.sectionsRead}/${earned.sectionsTotal}`} />
          <Stat label="Preguntas" value={`${earned.questionsVerified}/${earned.questionsTotal}`} />
          <Stat label="Avance" value={`${earned.progress}%`} />
        </div>

        {/* Acciones */}
        <div className="relative mt-6 flex flex-col gap-2">
          <Button asChild className="gap-1.5 w-full">
            <Link href={`/cca/${role}/${earned.paperId}`} onClick={() => setEarned(null)}>
              <Trophy className="h-3.5 w-3.5" /> Ver y descargar mi CCA
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-1.5 w-full">
            <Link href="/mision" onClick={() => setEarned(null)}>
              Continuar mi ruta {meta.emoji}
            </Link>
          </Button>
        </div>

        <div className="relative mt-4 text-[10px] text-muted-foreground text-center italic">
          Acreditación local sin backend · trazabilidad xAPI v3
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-2 bg-muted/30">
      <div className="text-[9px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-bold tabular-nums">{value}</div>
    </div>
  );
}
