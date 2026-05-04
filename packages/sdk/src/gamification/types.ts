/**
 * Tipos agnósticos del motor de gamificación.
 * No dependen de React ni de Supabase.
 */

export interface XpPerAction {
  sectionRead: number;
  paperCompleted: number;
  comprehensionVerified: number;
  firstLogin: number;
  [key: string]: number;
}

export interface LevelDef {
  name: string;
  minXp: number;
  icon?: string;
}

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string; // expresión simple, ej: "sectionsRead >= 10"
}

export interface GamificationConfig {
  enabled: boolean;
  xpPerAction: XpPerAction;
  levels: LevelDef[];
  badges: BadgeDef[];
}

export interface UserStats {
  totalXp: number;
  sectionsRead: number;
  missionsCompleted: number;
  questionsVerified: number;
}

export interface ComputedLevel {
  current: LevelDef;
  next: LevelDef | null;
  progressToNext: number; // 0-100
}

export interface BadgeState {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export interface GamificationResult {
  stats: UserStats;
  level: ComputedLevel;
  badges: BadgeState[];
}
