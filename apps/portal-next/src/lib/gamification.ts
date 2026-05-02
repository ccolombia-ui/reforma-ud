/**
 * Gamification Engine — v8g-l9
 *
 * Calcula XP, niveles y badges a partir del readingState y missionState.
 * Todo en cliente (localStorage).  La configuración proviene de layout.yaml.
 */

import { useMemo } from 'react';
import { getReadingState, type ReadingState } from './reading-state';
import { calcAllMissions, calcMissionStats, type MissionState } from './mission-state';
import type { GamificationConfig } from './layout/types';
import { layoutConfig } from './layout/config';

const DEFAULT_XP: NonNullable<GamificationConfig['xpPerAction']> = {
  sectionRead: 10,
  paperCompleted: 100,
  comprehensionVerified: 50,
  firstLogin: 25,
};

export interface GamificationStats {
  xp: number;
  level: { name: string; icon: string; minXp: number };
  nextLevel: { name: string; minXp: number } | null;
  progressToNext: number; // 0-100
  sectionsRead: number;
  missionsCompleted: number;
  questionsVerified: number;
}

export interface BadgeState {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

function getXpPerAction(): NonNullable<GamificationConfig['xpPerAction']> {
  return { ...DEFAULT_XP, ...layoutConfig.gamification?.xpPerAction };
}

function getLevels(): NonNullable<GamificationConfig['levels']> {
  const defaults = [
    { name: 'Novato', minXp: 0, icon: '🌱' },
    { name: 'Aprendiz', minXp: 200, icon: '🌿' },
    { name: 'Contribuyente', minXp: 500, icon: '🍃' },
    { name: 'Especialista', minXp: 1000, icon: '🌳' },
    { name: 'Experto', minXp: 2000, icon: '🏆' },
    { name: 'Maestro', minXp: 5000, icon: '👑' },
  ];
  const custom = layoutConfig.gamification?.levels;
  return custom && custom.length > 0 ? custom : defaults;
}

function getBadges(): NonNullable<GamificationConfig['badges']> {
  const defaults = [
    { id: 'primer-paso', name: 'Primer Paso', description: 'Lee tu primera sección', icon: '👣', condition: 'sectionsRead >= 1' },
    { id: 'lector-activo', name: 'Lector Activo', description: 'Lee 10 secciones', icon: '📖', condition: 'sectionsRead >= 10' },
    { id: 'mision-cumplida', name: 'Misión Cumplida', description: 'Completa tu primera misión', icon: '🎯', condition: 'missionsCompleted >= 1' },
    { id: 'comprension-verificada', name: 'Comprensión Verificada', description: 'Verifica 5 preguntas', icon: '✅', condition: 'questionsVerified >= 5' },
    { id: 'recorrido-completo', name: 'Recorrido Completo', description: 'Completa todas las misiones', icon: '🏅', condition: 'missionsCompleted >= 12' },
  ];
  const custom = layoutConfig.gamification?.badges;
  return custom && custom.length > 0 ? custom : defaults;
}

function countSectionsRead(state: ReadingState | null): number {
  if (!state) return 0;
  let count = 0;
  for (const doc of Object.values(state.docs)) {
    count += Object.values(doc.sections).filter((s) => s === 'completed' || s === 'verified').length;
  }
  return count;
}

function countQuestionsVerified(state: ReadingState | null): number {
  if (!state) return 0;
  let count = 0;
  for (const doc of Object.values(state.docs)) {
    count += Object.values(doc.sections).filter((s) => s === 'verified').length;
  }
  return count;
}

function calcXp(readingState: ReadingState | null, missions: MissionState[]): number {
  const xpCfg = getXpPerAction();
  const sectionsRead = countSectionsRead(readingState);
  const questionsVerified = countQuestionsVerified(readingState);
  const completedMissions = missions.filter((m) => m.status === 'completed').length;

  let xp = 0;
  xp += sectionsRead * (xpCfg.sectionRead ?? 10);
  xp += questionsVerified * (xpCfg.comprehensionVerified ?? 50);
  xp += completedMissions * (xpCfg.paperCompleted ?? 100);

  // firstLogin se otorga una sola vez; lo detectamos por existencia de cualquier progreso
  if (sectionsRead > 0 || completedMissions > 0) {
    xp += xpCfg.firstLogin ?? 25;
  }

  return xp;
}

function getLevelForXp(xp: number) {
  const levels = getLevels().sort((a, b) => b.minXp - a.minXp);
  return levels.find((l) => xp >= l.minXp) ?? levels[levels.length - 1];
}

function getNextLevel(xp: number) {
  const levels = getLevels().sort((a, b) => a.minXp - b.minXp);
  const currentIdx = levels.findLastIndex((l) => xp >= l.minXp);
  return levels[currentIdx + 1] ?? null;
}

export function calcGamification(readingState: ReadingState | null, role?: string): GamificationStats & { badges: BadgeState[] } {
  const missions = calcAllMissions(readingState, role as import('./ui-state').RoleId);
  const sectionsRead = countSectionsRead(readingState);
  const questionsVerified = countQuestionsVerified(readingState);
  const missionsCompleted = missions.filter((m) => m.status === 'completed').length;

  const xp = calcXp(readingState, missions);
  const level = getLevelForXp(xp);
  const nextLevel = getNextLevel(xp);

  const progressToNext = nextLevel
    ? Math.min(100, Math.round(((xp - level.minXp) / (nextLevel.minXp - level.minXp)) * 100))
    : 100;

  // Evaluar badges
  const badges = getBadges().map((b) => {
    const earned = evaluateCondition(b.condition, { sectionsRead, missionsCompleted, questionsVerified });
    return {
      ...b,
      earned,
      earnedAt: earned ? new Date().toISOString() : undefined,
    };
  });

  return {
    xp,
    level,
    nextLevel,
    progressToNext,
    sectionsRead,
    missionsCompleted,
    questionsVerified,
    badges,
  };
}

function evaluateCondition(condition: string, vars: Record<string, number>): boolean {
  try {
    // condiciones simples: "sectionsRead >= 1", "missionsCompleted >= 5"
    const [left, op, right] = condition.trim().split(/\s+/);
    const val = vars[left];
    const target = Number(right);
    if (val === undefined) return false;
    switch (op) {
      case '>=': return val >= target;
      case '>': return val > target;
      case '==': return val === target;
      case '<=': return val <= target;
      case '<': return val < target;
      default: return false;
    }
  } catch {
    return false;
  }
}

/** Hook para consumir gamification en componentes React. */
export function useGamification(role?: string) {
  // Leer readingState directamente para evitar re-render excesivo;
  // idealmente el componente padre escucha reading-state-change.
  return useMemo(() => {
    const state = typeof window !== 'undefined' ? getReadingState() : null;
    return calcGamification(state, role);
  }, [role]);
}
