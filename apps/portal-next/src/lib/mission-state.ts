/**
 * Mission state derivado de readingState + comprehension.
 * Una "misión" es un paper canónico M01-M12. Se completa al leer todas las
 * secciones + aprobar las preguntas de comprensión disponibles.
 *
 * Las misiones son SECUENCIALES: M01 → M02 → ... → M12. Para acceder a M(n+1)
 * hay que haber graduado de M(n). Excepción: el rol "Director Estratégico"
 * tiene acceso a todas (overview ejecutivo).
 */

import { canonicPaper } from '#site/content';
import type { ReadingState } from '@/lib/reading-state';
import { COMPREHENSION_REGISTRY } from '@/lib/comprehension';
import type { RoleId } from '@/lib/ui-state';
import { isPublished } from '@/lib/show-drafts';

export type MissionStatus = 'locked' | 'active' | 'in-progress' | 'completed';

export type MissionState = {
  paperId: string;
  number: number;
  title: string;
  href: string;
  status: MissionStatus;
  progress: number; // 0-100
  sectionsRead: number;
  sectionsTotal: number;
  questionsVerified: number;
  questionsTotal: number;
  hasCCA: boolean;
};

const ALL_PAPERS_ORDER = ['m01','m02','m03','m04','m05','m06','m07','m08','m09','m10','m11','m12'];
const PAPERS_ORDER = ALL_PAPERS_ORDER.filter((id) => {
  const p = canonicPaper.find((x) => x.id === id);
  return p ? isPublished(p) : false;
});

/** Calcula el estado de UNA misión a partir del readingState + comprehension data. */
export function calcMission(paperId: string, readingState: ReadingState | null, prevCompleted: boolean): MissionState {
  const paper = canonicPaper.find((p) => p.id === paperId);
  const compr = COMPREHENSION_REGISTRY[paperId];
  const docState = readingState?.docs[paperId];

  const sectionsTotal = compr?.sections.length ?? 0;
  const sectionsRead = docState
    ? Object.values(docState.sections).filter((s) => s === 'completed' || s === 'verified').length
    : 0;
  const questionsTotal = compr?.sections.filter((s) => s.question).length ?? 0;
  const questionsVerified = docState
    ? compr?.sections.filter((s) => s.question && docState.sections[s.anchor] === 'verified').length ?? 0
    : 0;

  // Progreso ponderado: 70% lectura + 30% verificación con preguntas
  const readWeight = sectionsTotal > 0 ? (sectionsRead / sectionsTotal) * 70 : 0;
  const verifyWeight = questionsTotal > 0 ? (questionsVerified / questionsTotal) * 30 : sectionsTotal > 0 ? 0 : 0;
  const progress = Math.round(readWeight + verifyWeight);

  // Estado
  let status: MissionStatus = 'locked';
  if (prevCompleted || paperId === 'm01') {
    if (progress === 0) status = 'active';
    else if (progress >= 100) status = 'completed';
    else status = 'in-progress';
  }

  // Si no hay comprehension data aún (placeholders), considerar progress por reading puro
  if (!compr && docState) {
    const fallback = docState.progress ?? 0;
    return {
      paperId,
      number: paper?.number ?? 0,
      title: paper?.title ?? paperId,
      href: paper?.href ?? `/canonico/${paperId}`,
      status: prevCompleted || paperId === 'm01' ? (fallback >= 100 ? 'completed' : fallback > 0 ? 'in-progress' : 'active') : 'locked',
      progress: fallback,
      sectionsRead: 0,
      sectionsTotal: 0,
      questionsVerified: 0,
      questionsTotal: 0,
      hasCCA: fallback >= 100,
    };
  }

  return {
    paperId,
    number: paper?.number ?? 0,
    title: paper?.title ?? paperId,
    href: paper?.href ?? `/canonico/${paperId}`,
    status,
    progress,
    sectionsRead,
    sectionsTotal,
    questionsVerified,
    questionsTotal,
    hasCCA: status === 'completed',
  };
}

/** Calcula todas las misiones M01-M12 con cascada de unlocks. */
export function calcAllMissions(readingState: ReadingState | null, role?: RoleId): MissionState[] {
  // El director ve todas activas (overview ejecutivo)
  const isDirector = role === 'docente-director';

  const missions: MissionState[] = [];
  let prevCompleted = isDirector; // si director, todas desbloqueadas

  for (const pid of PAPERS_ORDER) {
    const m = calcMission(pid, readingState, prevCompleted || isDirector);
    missions.push(m);
    if (m.status === 'completed') prevCompleted = true;
    else if (!isDirector) prevCompleted = false;
  }

  return missions;
}

/** Retorna la misión activa (in-progress) o la primera no-completed. */
export function getActiveMission(missions: MissionState[]): MissionState | null {
  return (
    missions.find((m) => m.status === 'in-progress') ??
    missions.find((m) => m.status === 'active') ??
    null
  );
}

/** Stats globales del usuario para mostrar en widget/header. */
export function calcMissionStats(missions: MissionState[]) {
  const completed = missions.filter((m) => m.status === 'completed').length;
  const inProgress = missions.filter((m) => m.status === 'in-progress').length;
  const totalProgress = missions.length > 0
    ? Math.round(missions.reduce((acc, m) => acc + m.progress, 0) / missions.length)
    : 0;
  return {
    completed,
    inProgress,
    locked: missions.filter((m) => m.status === 'locked').length,
    total: missions.length,
    totalProgress,
    ccasEarned: missions.filter((m) => m.hasCCA).length,
  };
}
