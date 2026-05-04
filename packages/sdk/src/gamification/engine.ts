/**
 * Motor de gamificación puro (sin dependencias de framework ni Supabase).
 * Calcula XP, niveles y badges a partir de estadísticas de usuario y configuración.
 */

import type {
  GamificationConfig,
  UserStats,
  ComputedLevel,
  BadgeState,
  GamificationResult,
  LevelDef,
} from './types.js';

const DEFAULT_CONFIG: GamificationConfig = {
  enabled: true,
  xpPerAction: {
    sectionRead: 10,
    paperCompleted: 100,
    comprehensionVerified: 50,
    firstLogin: 25,
  },
  levels: [
    { name: 'Novato', minXp: 0, icon: '🌱' },
    { name: 'Aprendiz', minXp: 200, icon: '🌿' },
    { name: 'Contribuyente', minXp: 500, icon: '🍃' },
    { name: 'Especialista', minXp: 1000, icon: '🌳' },
    { name: 'Experto', minXp: 2000, icon: '🏆' },
    { name: 'Maestro', minXp: 5000, icon: '👑' },
  ],
  badges: [
    { id: 'primer-paso', name: 'Primer Paso', description: 'Lee tu primera sección', icon: '👣', condition: 'sectionsRead >= 1' },
    { id: 'lector-activo', name: 'Lector Activo', description: 'Lee 10 secciones', icon: '📖', condition: 'sectionsRead >= 10' },
    { id: 'mision-cumplida', name: 'Misión Cumplida', description: 'Completa tu primera misión', icon: '🎯', condition: 'missionsCompleted >= 1' },
    { id: 'comprension-verificada', name: 'Comprensión Verificada', description: 'Verifica 5 preguntas', icon: '✅', condition: 'questionsVerified >= 5' },
    { id: 'recorrido-completo', name: 'Recorrido Completo', description: 'Completa todas las misiones', icon: '🏅', condition: 'missionsCompleted >= 12' },
  ],
};

function mergeConfig(input?: Partial<GamificationConfig>): GamificationConfig {
  if (!input) return DEFAULT_CONFIG;
  return {
    enabled: input.enabled ?? DEFAULT_CONFIG.enabled,
    xpPerAction: { ...DEFAULT_CONFIG.xpPerAction, ...input.xpPerAction },
    levels: input.levels && input.levels.length > 0 ? input.levels : DEFAULT_CONFIG.levels,
    badges: input.badges && input.badges.length > 0 ? input.badges : DEFAULT_CONFIG.badges,
  };
}

function calcXp(stats: UserStats, cfg: GamificationConfig): number {
  const xp = cfg.xpPerAction;
  let total = 0;
  total += stats.sectionsRead * (xp.sectionRead ?? 10);
  total += stats.questionsVerified * (xp.comprehensionVerified ?? 50);
  total += stats.missionsCompleted * (xp.paperCompleted ?? 100);
  if (stats.totalXp > 0 || stats.sectionsRead > 0 || stats.missionsCompleted > 0) {
    total += xp.firstLogin ?? 25;
  }
  return total;
}

function computeLevel(totalXp: number, levels: ComputedLevel['current'][]): ComputedLevel {
  const sorted = [...levels].sort((a, b) => a.minXp - b.minXp);
  let current = sorted[0]!;
  let next: LevelDef | null = null;

  for (let i = 0; i < sorted.length; i++) {
    if (totalXp >= sorted[i]!.minXp) {
      current = sorted[i]!;
      next = sorted[i + 1] ?? null;
    }
  }

  let progressToNext = 100;
  if (next) {
    const range = next.minXp - current.minXp;
    const earned = totalXp - current.minXp;
    progressToNext = Math.min(100, Math.max(0, Math.floor((earned / range) * 100)));
  }

  return { current, next, progressToNext };
}

function evalCondition(condition: string, stats: UserStats): boolean {
  // Condiciones simples del tipo "key >= number"
  const match = condition.match(/^(\w+)\s*(>=|<=|>|==|<)\s*(\d+)$/);
  if (!match) return false;
  const [, key, op, rawValue] = match;
  const value = Number(rawValue);
  const statValue = (stats as unknown as Record<string, number>)[key] ?? 0;
  switch (op) {
    case '>=': return statValue >= value;
    case '<=': return statValue <= value;
    case '>': return statValue > value;
    case '<': return statValue < value;
    case '==': return statValue === value;
    default: return false;
  }
}

function computeBadges(
  cfg: GamificationConfig,
  stats: UserStats,
  earnedIds: Set<string>
): BadgeState[] {
  return cfg.badges.map((b) => {
    const earned = earnedIds.has(b.id) || evalCondition(b.condition, stats);
    return {
      id: b.id,
      name: b.name,
      description: b.description,
      icon: b.icon,
      earned,
    };
  });
}

/**
 * Calcula el estado completo de gamificación.
 */
export function computeGamification(
  stats: UserStats,
  earnedBadges: string[],
  rawConfig?: Partial<GamificationConfig>
): GamificationResult {
  const cfg = mergeConfig(rawConfig);
  if (!cfg.enabled) {
    return {
      stats,
      level: { current: { name: '-', minXp: 0 }, next: null, progressToNext: 0 },
      badges: [],
    };
  }

  const totalXp = calcXp(stats, cfg);
  const level = computeLevel(totalXp, cfg.levels);
  const badges = computeBadges(cfg, stats, new Set(earnedBadges));

  return { stats: { ...stats, totalXp }, level, badges };
}

export { DEFAULT_CONFIG, mergeConfig, calcXp, computeLevel, evalCondition };
