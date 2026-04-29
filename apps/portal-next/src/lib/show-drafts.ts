/**
 * Visibilidad de contenido — v8b
 *
 * Fuente de verdad única: `kd_status` en el frontmatter del paper.
 * Los conceptos del glosario son DERIVADOS: visibles si al menos un
 * paper con kd_status PUBLISHED o DEPRECATED los referencia.
 *
 * Workflow Obsidian: el autor cambia `kd_status: DRAFT` → `kd_status: PUBLISHED`
 * en el frontmatter del paper. El commit activa el deploy. Sin configuración extra.
 *
 * Para ver contenido oculto en dev: NEXT_PUBLIC_SHOW_DRAFTS=true en .env.local
 */

export type PaperLifecycle = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'DEPRECATED';

export const VISIBLE_STATUSES: PaperLifecycle[] = ['PUBLISHED', 'DEPRECATED'];

export const showDrafts =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true';

/** True si el paper debe mostrarse públicamente. */
export function isPublished(paper: { kd_status?: string; draft?: boolean }): boolean {
  if (paper.kd_status) {
    return (VISIBLE_STATUSES as string[]).includes(paper.kd_status);
  }
  // backward compat para papers sin kd_status
  return !paper.draft;
}

/** Filtra un array de papers excluyendo los no publicados (salvo showDrafts). */
export function filterPublished<T extends { kd_status?: string; draft?: boolean }>(
  items: T[]
): T[] {
  if (showDrafts) return items;
  return items.filter(isPublished);
}

/**
 * Dado el array completo de papers, retorna el Set de conceptoIds que
 * están referenciados por al menos un paper publicado.
 * Usa `relations.custom.glosario` del paper como fuente.
 */
export function buildPublishedConceptIds(
  papers: Array<{ kd_status?: string; draft?: boolean; relations?: { custom?: { glosario?: string[] } } }>
): Set<string> {
  const visible = filterPublished(papers);
  const ids = new Set<string>();
  for (const p of visible) {
    for (const id of p.relations?.custom?.glosario ?? []) {
      ids.add(id);
    }
  }
  return ids;
}

/** True si un concepto debe mostrarse (referenciado por al menos un paper publicado). */
export function isConceptVisible(
  conceptId: string,
  publishedConceptIds: Set<string>
): boolean {
  return showDrafts || publishedConceptIds.has(conceptId);
}
