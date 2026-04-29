/**
 * Acceso y nivel de usuario en una CoP — v8b
 *
 * Nivel = máximo nivel donde todos los CCAs requeridos están ganados.
 * CCAs vienen de calcAllMissions (reading-state localStorage).
 * Misiones CoP completadas en clave separada de localStorage.
 */

const COP_MISSIONS_KEY = 'reforma-ud:cop-missions-completed';

export type CoPLevel = { nivel: number; nombre: string };

/**
 * Lee los IDs de misiones CoP completadas para una comunidad.
 * Clave: reforma-ud:cop-missions-completed → { [comunidadSlug]: string[] }
 */
export function getCompletedCoPMissions(comunidadSlug: string): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COP_MISSIONS_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw) as Record<string, string[]>;
    return all[comunidadSlug] ?? [];
  } catch {
    return [];
  }
}

export function markCoPMissionCompleted(comunidadSlug: string, misionId: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const raw = localStorage.getItem(COP_MISSIONS_KEY);
    const all: Record<string, string[]> = raw ? JSON.parse(raw) : {};
    const prev = all[comunidadSlug] ?? [];
    if (!prev.includes(misionId)) {
      all[comunidadSlug] = [...prev, misionId];
      localStorage.setItem(COP_MISSIONS_KEY, JSON.stringify(all));
      window.dispatchEvent(new CustomEvent('cop-mission-completed', { detail: { comunidadSlug, misionId } }));
    }
  } catch {}
}

type RolDef = { nivel: number; nombre: string };

/**
 * Calcula el nivel máximo alcanzado en una CoP dado:
 * - roles: definición de niveles de la comunidad (del frontmatter)
 * - earnedCCAs: paperId[] con hasCCA=true
 * - misionesCoP: misiones de la comunidad con prerequisitosCanonicas
 * - completedMisionIds: misiones CoP ya completadas
 */
export function calcUserCoPLevel(
  roles: RolDef[],
  misionesCoP: Array<{ id: string; nivelOtorga?: number; prerequisitosCanonicas: string[] }>,
  earnedCCAs: string[],
  completedMisionIds: string[],
): number {
  // Nivel otorgado por misiones completadas + CCAs cumplidas
  let maxLevel = 0;

  for (const m of misionesCoP) {
    if (!m.nivelOtorga) continue;
    const canonicasOk = m.prerequisitosCanonicas.every((p) => earnedCCAs.includes(p));
    const completed = completedMisionIds.includes(m.id);
    if (completed && canonicasOk && m.nivelOtorga > maxLevel) {
      maxLevel = m.nivelOtorga;
    }
  }

  return maxLevel;
}

export function getCoPLevelName(roles: RolDef[], nivel: number): string {
  return roles.find((r) => r.nivel === nivel)?.nombre ?? `N${nivel}`;
}
