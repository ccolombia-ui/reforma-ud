export type * from './types.js';
export {
  computeGamification,
  DEFAULT_CONFIG,
  mergeConfig,
  calcXp,
  computeLevel,
  evalCondition,
} from './engine.js';
export {
  fetchGamificationConfig,
  fetchUserStats,
  fetchEarnedBadges,
  getGamificationResult,
  recordSectionProgress,
  type GamificationClientDeps,
} from './client.js';
