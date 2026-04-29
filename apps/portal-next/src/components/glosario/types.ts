/**
 * types.ts · Tipos compartidos por los componentes DV del glosario.
 * v8 S2 · 2026-04-28 · CC BY-SA 4.0
 *
 * Estos tipos modelan los campos TPL v2.0 que viven en el frontmatter del
 * concepto-universal v5.2, preservados por velite (v8 S1) y consumidos por
 * los componentes DV (v8 S2-S5).
 */

export type TuplaRelation = {
  rel_nombre: string;
  rel_direccion?: string;
  rel_target: string;
  rel_frame?: string;
  rel_propiedades?: Record<string, unknown>;
};

export type FacetNormative = {
  normative_source?: string;
  normative_locator?: string;
  normative_text?: string;
  normative_authority_level?: string;
  chain_status?: string;
  derogates?: string[];
  derogated_by?: string;
  conflicts_with?: string[];
};

export type ConceptoTPLData = {
  id: string;
  kd_title?: string;
  skos_prefLabel?: string;
  concepto_capabilities: string[];
  concepto_facet_normative?: FacetNormative;
  concepto_prerequisitos: string[];
  concepto_definitional_anchors: string[];
  concepto_current_anchor?: string;
  concepto_anchor_chain_status?: string;
  tupla__relations: TuplaRelation[];
  rol_seleccionado?: string;
  applicable_domain?: string;
  assumptions: string[];
  breaks_at: string[];
  valid_from?: string;
  valid_to?: string;
  cited_in: string[];
  cited_count: number;
  /** Pre-computado server-side: conceptos que declaran ESTE como prereq. */
  habilita: string[];
  /** Vistas por rol JTBD (extraído del DV block §8 en el vault). */
  concepto_vistas_rol?: Record<string, unknown>;
};

// ── Helpers wikilink (puros, testeables) ──────────────────────────────────

/**
 * Extrae el slug de un wikilink Obsidian-style:
 *   "[[con-x]]" → "con-x"
 *   "[[con-x|alias]]" → "con-x"
 *   "[[path/to/con-x.md]]" → "con-x"
 *   "con-x" → "con-x"  (idempotente con strings ya limpios)
 */
export function slugFromWikilink(raw: string | null | undefined): string {
  if (!raw) return '';
  const m = raw.match(/\[\[([^\]|]+?)(?:\|[^\]]*)?\]\]/);
  const slug = (m ? m[1] : raw).split('/').pop()?.replace(/\.md$/, '') ?? raw;
  return slug.trim();
}

/**
 * Extrae el label legible de un wikilink:
 *   "[[con-x|Mi alias]]" → "Mi alias"
 *   "[[con-x]]" → "con-x"
 */
export function labelFromWikilink(raw: string | null | undefined): string {
  if (!raw) return '—';
  const aliasMatch = raw.match(/\[\[[^\]|]+?\|([^\]]+)\]\]/);
  if (aliasMatch) return aliasMatch[1].trim();
  return slugFromWikilink(raw);
}
