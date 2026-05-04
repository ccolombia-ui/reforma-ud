/**
 * Adaptador cliente para gamificación con Supabase.
 * Útil en Next.js / React para leer/escribir progreso y obtener resultados computados.
 */

import type { AleiaClient } from '../supabase/client.js';
import type { GamificationConfig, UserStats, GamificationResult } from './types.js';
import { computeGamification } from './engine.js';

export interface GamificationClientDeps {
  supabase: AleiaClient;
  tenantId: string;
}

export async function fetchGamificationConfig(
  deps: GamificationClientDeps
): Promise<GamificationConfig | null> {
  // TODO: usar tipos generados por `supabase gen types` en lugar de cast manual
  const { data, error } = (await deps.supabase
    .from('gamification_configs')
    .select('config')
    .eq('tenant_id', deps.tenantId)
    .single()) as { data: { config: unknown } | null; error: Error | null };
  if (error || !data) return null;
  return (data.config ?? null) as GamificationConfig | null;
}

export async function fetchUserStats(
  deps: GamificationClientDeps,
  userId: string
): Promise<UserStats> {
  // TODO: usar tipos generados por `supabase gen types`
  const { data } = (await deps.supabase
    .from('user_xp')
    .select('*')
    .eq('tenant_id', deps.tenantId)
    .eq('user_id', userId)
    .single()) as { data: Record<string, number> | null };
  if (!data) {
    return { totalXp: 0, sectionsRead: 0, missionsCompleted: 0, questionsVerified: 0 };
  }
  return {
    totalXp: data.total_xp,
    sectionsRead: data.sections_read,
    missionsCompleted: data.missions_completed,
    questionsVerified: data.questions_verified,
  };
}

export async function fetchEarnedBadges(
  deps: GamificationClientDeps,
  userId: string
): Promise<string[]> {
  const { data, error } = await deps.supabase
    .from('badge_earnings')
    .select('badge_id')
    .eq('tenant_id', deps.tenantId)
    .eq('user_id', userId);
  if (error || !data) return [];
  return data.map((d: { badge_id: string }) => d.badge_id);
}

export async function getGamificationResult(
  deps: GamificationClientDeps,
  userId: string
): Promise<GamificationResult> {
  const [rawConfig, stats, earned] = await Promise.all([
    fetchGamificationConfig(deps),
    fetchUserStats(deps, userId),
    fetchEarnedBadges(deps, userId),
  ]);
  return computeGamification(stats, earned, rawConfig ?? undefined);
}

/**
 * Registra el progreso de una sección y recalcula XP.
 * Devuelve el nuevo resultado de gamificación.
 */
export async function recordSectionProgress(
  deps: GamificationClientDeps,
  userId: string,
  documentSlug: string,
  sectionId: string,
  status: 'completed' | 'verified'
): Promise<GamificationResult> {
  const cfg = await fetchGamificationConfig(deps);
  const xpPerAction = cfg?.xpPerAction;
  const xpEarned =
    status === 'verified'
      ? (xpPerAction?.sectionRead ?? 10) + (xpPerAction?.comprehensionVerified ?? 50)
      : (xpPerAction?.sectionRead ?? 10);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const progressPayload: any = {
    tenant_id: deps.tenantId,
    user_id: userId,
    document_slug: documentSlug,
    section_id: sectionId,
    status,
    xp_earned: xpEarned,
    completed_at: new Date().toISOString(),
  };

  await (deps.supabase.from('user_progress') as unknown as { upsert: (p: unknown, o?: unknown) => Promise<unknown> })
    .upsert(progressPayload, { onConflict: 'tenant_id,user_id,document_slug,section_id' });

  // Recalcular agregados (en producción se puede mover a una Edge Function)
  const { data: rows } = (await deps.supabase
    .from('user_progress')
    .select('*')
    .eq('tenant_id', deps.tenantId)
    .eq('user_id', userId)) as { data: Array<{ status: string; xp_earned: number }> | null };

  const sectionsRead = (rows ?? []).filter((r) => r.status === 'completed' || r.status === 'verified').length;
  const questionsVerified = (rows ?? []).filter((r) => r.status === 'verified').length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const xpPayload: any = {
    tenant_id: deps.tenantId,
    user_id: userId,
    total_xp: (rows ?? []).reduce((sum, r) => sum + r.xp_earned, 0),
    sections_read: sectionsRead,
    missions_completed: 0, // se actualiza por otro flujo
    questions_verified: questionsVerified,
  };

  await (deps.supabase.from('user_xp') as unknown as { upsert: (p: unknown, o?: unknown) => Promise<unknown> })
    .upsert(xpPayload, { onConflict: 'tenant_id,user_id' });

  return getGamificationResult(deps, userId);
}
