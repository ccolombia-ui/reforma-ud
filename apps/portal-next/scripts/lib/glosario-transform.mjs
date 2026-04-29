/**
 * glosario-transform.mjs · pure functions para limpiar markdown del vault
 *
 * Funciones idempotentes sin side effects — testeables en aislamiento.
 * Importadas por:
 *   - scripts/sync-glosario.mjs       (sync local Node)
 *   - cloud-functions/sync-glosario-gas/sync-glosario.gs  (port manual a Apps Script)
 *
 * Si modificas estas funciones, asegúrate de actualizar la versión .gs también.
 * Tests: src/lib/glosario-transform.test.ts (vitest)
 */

// ── Frontmatter parsing ───────────────────────────────────────────────────

export function splitFrontmatter(raw) {
  if (!raw.startsWith('---')) return { frontmatterBlock: '', body: raw };
  const end = raw.indexOf('\n---', 4);
  if (end === -1) return { frontmatterBlock: '', body: raw };
  return {
    frontmatterBlock: raw.slice(0, end + 4).trimEnd(),
    body: raw.slice(end + 4),
  };
}

export function parseYamlKeys(block) {
  const keys = {};
  const lines = block.replace(/^---\n/, '').replace(/\n---$/, '').split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^([a-zA-Z_@"'][a-zA-Z0-9_@"'.-]*)\s*:\s*(.*)$/);
    if (!kv) { i++; continue; }
    const [, k, vRaw] = kv;
    const v = vRaw.trim();
    if (v === '' || v === '|' || v === '>') {
      const items = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  -') || lines[i].startsWith('    '))) {
        const item = lines[i].replace(/^\s+-\s*/, '').trim().replace(/^["']|["']$/g, '');
        if (lines[i].startsWith('  -')) items.push(item);
        i++;
      }
      keys[k] = items.length ? items : v;
    } else {
      keys[k] = v.replace(/^["']|["']$/g, '');
      i++;
    }
  }
  return keys;
}

// ── Frontmatter cleanup ───────────────────────────────────────────────────
//
// v8 S1: campos TPL v2.0 ya NO se strippean — velite los preserva en su schema.
// Removidos del strip:
//   - /^tupla_/         (tupla__relations consumido por DvRelations/DvMandatos)
//   - /^concepto_/      (concepto_prerequisitos, concepto_definitional_anchors,
//                        concepto_capabilities, concepto_current_anchor, etc.)
//   - /^concepto_facet_/ (concepto_facet_normative consumido por DvFacetNormative)
//   - /^applicable_domain/, /^assumptions/, /^breaks_at/  (régimen epistémico)
//   - /^valid_from/, /^valid_to/                           (evolución temporal)
//
// Lo que SÍ se strippea: campos legacy/internos que velite no necesita y que
// ensucian el frontmatter del portal sin valor agregado.

export const STRIP_KEY_PATTERNS = [
  /^pasteur_axis_/, /^neon_/, /^extends_to/, /^recorded_at/,
  /^lifecycle_state/, /^kd_supersedes/, /^kd_responsible/, /^kd_parent/,
  /^kd_created/, /^kd_updated/, /^kd_doc_layout/, /^kd_transcluible_en/,
  /^kd_classification/, /^kd_doc_type/, /^align_schema_type/,
  /^concept_subtype/, /^cssclasses/, /^@type$/, /^"@type"$/,
  /^"@context"$/, /^skos_hiddenLabel/, /^fileClass/, /^kd__up/,
];

export function cleanFrontmatter(block) {
  const lines = block.split('\n');
  const out = [];
  let inList = false;
  let skipCurrent = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '---') { out.push(line); inList = false; skipCurrent = false; continue; }

    if (inList) {
      if (/^\s+-/.test(line) || /^\s{2,}/.test(line)) {
        if (skipCurrent) continue;
        out.push(line);
        continue;
      } else {
        inList = false;
        skipCurrent = false;
      }
    }

    const kv = line.match(/^([a-zA-Z_@"'][a-zA-Z0-9_@"'.-]*)\s*:\s*/);
    if (kv) {
      const k = kv[1];
      const shouldStrip = STRIP_KEY_PATTERNS.some(re => re.test(k));
      if (shouldStrip) {
        skipCurrent = true;
        inList = true;
        continue;
      }
      skipCurrent = false;
      inList = true;
    }

    if (!skipCurrent) out.push(line);
  }
  return out.join('\n');
}

// ── Body cleanup (Obsidian-only artifacts) ────────────────────────────────

export function cleanBody(body) {
  return body
    // Wikilinks: extract final path component (strip relative ../../ prefixes)
    .replace(/!\[\[(?:[^\]|]*\/)([^\]|/]+?)(\|[^\]]+)?\]\]/g, '![[$1$2]]')
    .replace(/\[\[(?:[^\]|]*\/)([^\]|/]+?)(\|[^\]]+)?\]\]/g, '[[$1$2]]')
    // Strip Obsidian Dataview/DataviewJS blocks (can't execute in portal)
    .replace(/```dataviewjs[\s\S]*?```/gi, '')
    .replace(/```dataview[\s\S]*?```/gi, '')
    // Strip Obsidian Meta Bind directives (INPUT[...]:field syntax)
    .replace(/`?INPUT\[[^\]]*\][^\n`]*/g, '')
    // Strip Obsidian `VIEW[...]` / `BUTTON[...]` inline commands
    .replace(/`?(VIEW|BUTTON)\[[^\]]*\][^\n`]*/g, '')
    // Clean up triple+ blank lines left after block removal
    .replace(/\n{4,}/g, '\n\n\n');
}
