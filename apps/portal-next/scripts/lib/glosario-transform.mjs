/**
 * glosario-transform.mjs · pure functions para limpiar markdown del vault
 * v2.0.0 · 2026-04-28 · CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda
 *
 * v2.0 — DataviewJS portability (v8 S5):
 *   cleanBody() reemplaza ```dataviewjs blocks con sentinels HTML <div data-dv="...">
 *   en lugar de eliminarlos. MetaBind readonly → valor estático del frontmatter.
 *
 * Funciones idempotentes sin side effects — testeables en aislamiento.
 * Tests: src/lib/glosario-transform.test.ts (vitest)
 */

// ── Frontmatter parsing ───────────────────────────────────────────────────

export function splitFrontmatter(raw) {
  // Normalize CRLF → LF for consistent parsing (vault files on Windows)
  const normalized = raw.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---')) return { frontmatterBlock: '', body: raw };
  const end = normalized.indexOf('\n---', 4);
  if (end === -1) return { frontmatterBlock: '', body: raw };
  return {
    frontmatterBlock: normalized.slice(0, end + 4).trimEnd(),
    body: normalized.slice(end + 4),
  };
}

export function parseYamlKeys(block) {
  const keys = {};
  // Normalize CRLF → LF before splitting
  const lines = block.replace(/\r\n/g, '\n').replace(/^---\n/, '').replace(/\n---$/, '').split('\n');
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
// v8 S1: campos TPL v2.0 ya NO se strippean — velite los preserva en su schema.

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

// ── DV block pattern matching ─────────────────────────────────────────────
// Ordered by specificity — first match wins.

const DV_PATTERNS = [
  // Facets normativos — varias variantes en el corpus (v2 usa normative_source; T2 usa origin_type)
  { name: 'facet-normative',    test: c => c.includes('concepto_facet_normative') },
  // Facet DDD — concepto_facet_ddd con ddd_invariants, ddd_ubiquitous_terms
  { name: 'facet-ddd',          test: c => c.includes('concepto_facet_ddd') },
  // Pre-requisitos: lista simple de concepto_prerequisitos
  { name: 'prereqs',            test: c => c.includes('concepto_prerequisitos') && !c.includes('dv.pages') && !c.includes('some(matchHere)') },
  // Reverse-lookup: quién me declara como prereq
  { name: 'habilita',           test: c => c.includes('concepto_prerequisitos') && (c.includes('some(matchHere)') || c.includes('habilitados')) },
  // Mandatos normativos filtrado de tupla__relations
  { name: 'mandatos',           test: c => c.includes('tupla__relations') && c.includes('norm_mandates') && !c.includes('renderChart') },
  // Evolución longitudinal / definitional anchors
  { name: 'evolucion',          test: c => c.includes('concepto_definitional_anchors') },
  // Relaciones outgoing — varias variantes (full humanLabel o simple paragraph)
  { name: 'relations',          test: c => c.includes('tupla__relations') && !c.includes('norm_mandates') && !c.includes('renderChart') && !c.includes('directos.size') },
  // Vista por rol JTBD
  { name: 'vista-por-rol',      test: c => c.includes('vistas[rol]') && c.includes('rol_seleccionado') },
  // Recursos KDMO complementarios
  { name: 'recursos-kdmo',      test: c => c.includes('concepto_diagram_ref') || c.includes('concepto_qhu_refs') },
  // Citado en papers cap-MI12
  { name: 'cited-in',           test: c => (c.includes('cited_in') || c.includes('citado')) && (c.includes('cited_count') || c.includes('dv.list')) },
  // KPI Grid (in/out degree, centralidad)
  { name: 'kpi-grid',           test: c => c.includes('inDeg') && c.includes('outDeg') && c.includes('kpi-grid') },
  // Charts (Chart.js via renderChart)
  { name: 'charts',             test: c => c.includes('window.renderChart') },
  // Comunidades + métricas vecindad
  { name: 'comunidades',        test: c => c.includes('directos.size') || (c.includes('comunidades') && c.includes('indirectos')) },
  // Régimen epistémico
  { name: 'regimen-epistemico', test: c => c.includes('applicable_domain') && c.includes('breaks_at') },
];

function matchDvPattern(code) {
  for (const pat of DV_PATTERNS) {
    if (pat.test(code)) return pat.name;
  }
  return 'obsidian-only';
}

// ── MetaBind resolution ───────────────────────────────────────────────────

function resolveField(fieldPath, keys) {
  if (!keys || !fieldPath) return null;
  if (!fieldPath.includes('.')) {
    const val = keys[fieldPath];
    return val != null ? val : null;
  }
  // Dot notation: only first level (nested objects not parsed by parseYamlKeys)
  return null;
}

function transformMetabind(spec, keys) {
  const colonIdx = spec.lastIndexOf(':');
  if (colonIdx < 0) return '';
  const fieldPath = spec.slice(colonIdx + 1).trim();
  const isReadonly = spec.includes('meta-bind-readonly');
  const isInlineSelect = spec.trimStart().startsWith('inlineSelect');

  if (isInlineSelect && fieldPath === 'rol_seleccionado') {
    return '<span class="dv-block" data-dv="selector-rol"></span>';
  }
  if (isReadonly) {
    const val = resolveField(fieldPath, keys);
    if (val == null || val === '') return '—';
    if (Array.isArray(val)) return val.join(', ');
    return String(val).slice(0, 500);
  }
  return '—';
}

// ── Body cleanup (Obsidian-only artifacts → portal-compatible HTML) ───────
//
// v8 S5: DataviewJS blocks → <div data-dv="pattern-name"> sentinels.
//        MetaBind readonly widgets → static value from frontmatter keys.
//        cleanBody(body, keys?) — keys optional, resolves MetaBind values.
//
// Idempotent: cleanBody(cleanBody(x, k)) === cleanBody(x, k)
// Pure: no side effects, same input → same output

export function cleanBody(body, keys = null) {
  return body
    // Wikilinks: extract final path component (strip relative ../../ prefixes)
    .replace(/!\[\[(?:[^\]|]*\/)([^\]|/]+?)(\|[^\]]+)?\]\]/g, '![[$1$2]]')
    .replace(/\[\[(?:[^\]|]*\/)([^\]|/]+?)(\|[^\]]+)?\]\]/g, '[[$1$2]]')
    // DataviewJS blocks → semantic sentinel HTML (consumed by ConceptoBodyClient)
    // \r?\n handles both LF and CRLF line endings from vault files on Windows
    .replace(/```dataviewjs\r?\n([\s\S]*?)```/gi, (_match, code) => {
      const name = matchDvPattern(code);
      return `\n<div class="dv-block" data-dv="${name}"></div>\n`;
    })
    // Plain dataview (DQL, non-JS) → strip
    .replace(/```dataview[\s\S]*?```/gi, '')
    // MetaBind INPUT widgets → static value or selector sentinel
    .replace(/`INPUT\[([^\]]+)\]`/g, (_match, spec) => transformMetabind(spec, keys))
    // Orphaned INPUT[ without backticks → strip
    .replace(/INPUT\[([^\]]+)\](?::[a-zA-Z_][a-zA-Z0-9_.]*)?/g, '')
    // Strip VIEW[...] / BUTTON[...] inline commands
    .replace(/`?(VIEW|BUTTON)\[[^\]]*\][^\n`]*/g, '')
    // Clean up excess blank lines
    .replace(/\n{4,}/g, '\n\n\n');
}
