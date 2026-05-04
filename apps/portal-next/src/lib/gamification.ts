/**
 * Gamification Engine — v8g-l12 (integrado con @aleia/sdk)
 *
 * Capa de adaptación que usa el motor puro del SDK (@aleia/sdk/gamification)
 * pero sigue alimentándose de readingState local (localStorage).
 *
 * Cuando se conecte Supabase, solo cambia la fuente de datos de este archivo;
 * los componentes (profile-menu, mission-panel, etc.) no se tocan.
 */

import { useMemo } from 'react';
import { getReadingState, type ReadingState } from './reading-state';
import { calcAllMissions, type MissionState } from './mission-state';
import { layoutConfig } from './layout/config';
import {
  computeGamification,
  type GamificationConfig,
  type GamificationResult,
  type BadgeState as SdkBadgeState,
} from '@aleia/sdk/gamification';

export interface GamificationStats {
  xp: number;
  level: { name: string; icon: string; minXp: number };
  nextLevel: { name: string; minXp: number } | null;
  progressToNext: number;
  sectionsRead: number;
  missionsCompleted: number;
  questionsVerified: number;
}

export type BadgeState = SdkBadgeState;

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

function countMissionsCompleted(missions: MissionState[]): number {
  return missions.filter((m) => m.status === 'completed').length;
}

function toSdkConfig(): Partial<GamificationConfig> {
  const g = layoutConfig.gamification;
  if (!g) return {};
  return {
    enabled: g.enabled,
    xpPerAction: g.xpPerAction
      ? {
          sectionRead: g.xpPerAction.sectionRead ?? 10,
          paperCompleted: g.xpPerAction.paperCompleted ?? 100,
          comprehensionVerified: g.xpPerAction.comprehensionVerified ?? 50,
          firstLogin: g.xpPerAction.firstLogin ?? 25,
        }
      : undefined,
    levels: g.levels?.map((l) => ({ name: l.name, minXp: l.minXp, icon: l.icon })),
    badges: g.badges?.map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      icon: b.icon,
      condition: b.condition,
    })),
  };
}

export function calcGamification(
  readingState: ReadingState | null,
  role?: string
): GamificationStats & { badges: BadgeState[] } {
  const missions = calcAllMissions(readingState, role as import('./ui-state').RoleId);
  const sectionsRead = countSectionsRead(readingState);
  const questionsVerified = countQuestionsVerified(readingState);
  const missionsCompleted = countMissionsCompleted(missions);

  const result: GamificationResult = computeGamification(
    { totalXp: 0, sectionsRead, missionsCompleted, questionsVerified },
    [], // earned badges: localStorage no los persiste todavía; Supabase lo hará
    toSdkConfig()
  );

  const { stats, level, badges } = result;

  return {
    xp: stats.totalXp,
    level: { ...level.current, icon: level.current.icon ?? '' },
    nextLevel: level.next,
    progressToNext: level.progressToNext,
    sectionsRead,
    missionsCompleted,
    questionsVerified,
    badges,
  };
}

/** Hook para consumir gamificación en componentes React. */
export function useGamification(role?: string) {
  return useMemo(() => {
    const state = typeof window !== 'undefined' ? getReadingState() : null;
    return calcGamification(state, role);
  }, [role]);
}
