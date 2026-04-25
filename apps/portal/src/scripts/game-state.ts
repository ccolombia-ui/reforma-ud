// Cliente-side persistencia tu-reforma. localStorage; sin backend.

export type Medal = 'bronze' | 'silver' | 'gold';
export type CopRole = 'estudiante' | 'director' | 'disenador' | 'formador' | 'investigador' | 'emprendedor';

export type GameState = {
  player: {
    name: string;
    role: CopRole;
    startedAt: string;
  };
  progress: {
    currentMission: string; // 'm01' .. 'm12' | 'completed'
    medals: Record<string, Medal | null>;
  };
  quizResults: Record<string, { correct: number; total: number; attemptedAt: string }>;
};

const KEY = 'tu-reforma:state';
const PAPERS = ['m01','m02','m03','m04','m05','m06','m07','m08','m09','m10','m11','m12'] as const;

export function getState(): GameState | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export function saveState(s: GameState): void {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

export function initState(name: string, role: CopRole): GameState {
  const medals: Record<string, Medal | null> = {};
  PAPERS.forEach((p) => (medals[p] = null));
  const s: GameState = {
    player: { name, role, startedAt: new Date().toISOString() },
    progress: { currentMission: 'm01', medals },
    quizResults: {},
  };
  saveState(s);
  return s;
}

export function recordQuiz(paperId: string, correct: number, total: number, medal: Medal): GameState | null {
  const s = getState();
  if (!s) return null;
  s.progress.medals[paperId] = medal;
  s.quizResults[paperId] = { correct, total, attemptedAt: new Date().toISOString() };
  // Avance: si completó M##, desbloquear M(##+1)
  const idx = PAPERS.indexOf(paperId as any);
  if (idx >= 0) {
    if (idx === PAPERS.length - 1) {
      s.progress.currentMission = 'completed';
    } else if (PAPERS[idx + 1]) {
      // Solo avanza si la misión actual era ésta o anterior
      const currentIdx = PAPERS.indexOf(s.progress.currentMission as any);
      if (currentIdx <= idx) {
        s.progress.currentMission = PAPERS[idx + 1];
      }
    }
  }
  saveState(s);
  return s;
}

export function isUnlocked(paperId: string, state: GameState | null): boolean {
  if (!state) return false;
  const idx = PAPERS.indexOf(paperId as any);
  if (idx < 0) return false;
  if (idx === 0) return true;
  // Está desbloqueado si la misión actual es éste o uno posterior, o si ya tiene medalla
  if (state.progress.medals[paperId]) return true;
  const currentIdx = PAPERS.indexOf(state.progress.currentMission as any);
  return currentIdx >= idx;
}

export function isCompleted(state: GameState | null): boolean {
  if (!state) return false;
  return PAPERS.every((p) => state.progress.medals[p] !== null);
}

export function clearState(): void {
  try { localStorage.removeItem(KEY); } catch {}
}

export const PAPERS_LIST = PAPERS;
