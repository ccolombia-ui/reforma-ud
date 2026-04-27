#!/usr/bin/env node
/**
 * Construye los grafos de conocimiento desde la salida de Velite:
 *   - public/static/graph-global.json  → corpus completo (canónico + comunidades + notas)
 *   - public/static/graphs/<slug>.json → grafo local de cada CoP
 *
 * Nodos:
 *   - paper (M01-M12) con metadata fase + rutas Clark
 *   - community (CoP) con type
 *   - note (vault de CoP)
 * Aristas:
 *   - cites: community/note → paper
 *   - wikilink: extraído del cuerpo MDX (m## detectados)
 *   - parent: jerarquía de comunidades
 *
 * Output formato compatible con vis-network: { nodes: [...], edges: [...] }
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const VELITE_OUT = path.join(ROOT, '.velite');
const PUBLIC_DIR = path.join(ROOT, 'public', 'static');
const GRAPHS_DIR = path.join(PUBLIC_DIR, 'graphs');

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
if (!fs.existsSync(GRAPHS_DIR)) fs.mkdirSync(GRAPHS_DIR, { recursive: true });

const canonicPaper = JSON.parse(fs.readFileSync(path.join(VELITE_OUT, 'canonicPaper.json'), 'utf-8'));
const community = JSON.parse(fs.readFileSync(path.join(VELITE_OUT, 'community.json'), 'utf-8'));
const note = JSON.parse(fs.readFileSync(path.join(VELITE_OUT, 'note.json'), 'utf-8'));
// v5.0h · Conceptos del Glosario Universal cargados desde Velite collection
const concepto = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(VELITE_OUT, 'concepto.json'), 'utf-8'));
  } catch {
    return [];
  }
})();

// vis-network color palette aligned to B.3 tokens
const COLORS = {
  paper: { bg: '#0284c7', border: '#075985', font: '#ffffff' },        // brand-blue
  community: {
    gobierno:      { bg: '#0f172a', border: '#0f172a', font: '#ffffff' },
    csu:           { bg: '#334155', border: '#1e293b', font: '#ffffff' },
    rectoria:      { bg: '#334155', border: '#1e293b', font: '#ffffff' },
    direccion:     { bg: '#475569', border: '#334155', font: '#ffffff' },
    vicerrectoria: { bg: '#7c3aed', border: '#5b21b6', font: '#ffffff' }, // brand-purple
    facultad:      { bg: '#a78bfa', border: '#7c3aed', font: '#1e1b4b' },
    programa:      { bg: '#c4b5fd', border: '#a78bfa', font: '#3b0764' },
    escuela:       { bg: '#d97706', border: '#92400e', font: '#ffffff' }, // brand-gold
    caba:          { bg: '#fbbf24', border: '#d97706', font: '#451a03' },
    instituto:     { bg: '#059669', border: '#047857', font: '#ffffff' }, // brand-emerald
    centro:        { bg: '#ea580c', border: '#9a3412', font: '#ffffff' }, // brand-orange
  },
  note: { bg: '#f1f5f9', border: '#94a3b8', font: '#0f172a' },
  bridge: { bg: '#fef3c7', border: '#d97706', font: '#451a03' }, // canonical paper as bridge
  concepto: { bg: '#1e3a8a', border: '#1e40af', font: '#ffffff' }, // glosario universal — azul oscuro
};

const RUTA_COLORS = {
  R1: '#059669',
  R2: '#7c3aed',
  R3: '#0284c7',
  R4: '#d97706',
  R5: '#ea580c',
};

const WIKILINK_RE = /\[\[([^\[\]\n]+?)\]\]/g;

function extractWikilinkTargets(body) {
  if (!body) return [];
  const out = new Set();
  let m;
  while ((m = WIKILINK_RE.exec(body)) !== null) {
    const inner = m[1];
    const [targetWithHash] = inner.split('|', 1);
    const [target] = targetWithHash.split('#', 1);
    const t = target.trim().toLowerCase();
    if (/^m\d{2}$/.test(t)) out.add(t);
  }
  WIKILINK_RE.lastIndex = 0;
  return Array.from(out);
}

// v5.0h · extrae targets de conceptos del Glosario Universal.
// El body de Velite ya viene como HTML (s.markdown() compila MD a HTML),
// así que los [[con-*]] ya fueron transformados por wiki-link plugin
// a `<a class="wikilink" href="/glosario/con-*">`. Parseamos el href.
const GLOSARIO_HREF_RE = /href="\/glosario\/(con|glo)-([a-z0-9-]+?)(?:#[^"]*)?"/gi;
function extractConceptoTargets(body) {
  if (!body) return [];
  const out = new Set();
  let m;
  while ((m = GLOSARIO_HREF_RE.exec(body)) !== null) {
    out.add(`con-${m[2].toLowerCase()}`);
  }
  GLOSARIO_HREF_RE.lastIndex = 0;
  return Array.from(out);
}

/* ---------------------------------------------------------------------------
 * Grafo global
 * ------------------------------------------------------------------------- */
function buildGlobalGraph() {
  const nodes = [];
  const edges = [];
  const seenEdges = new Set();

  function addEdge(from, to, label) {
    const key = `${from}->${to}:${label}`;
    if (seenEdges.has(key)) return;
    seenEdges.add(key);
    edges.push({ from, to, label, arrows: 'to' });
  }

  // Papers canonicos
  for (const p of canonicPaper) {
    const ruta = p.rutaClark[0] ?? 'R1';
    const color = RUTA_COLORS[ruta] ?? COLORS.paper.bg;
    nodes.push({
      id: p.id,
      label: p.id.toUpperCase(),
      title: `${p.title}\n\n${p.description}`,
      group: 'paper',
      shape: 'dot',
      size: 26,
      color: { background: color, border: '#0f172a', highlight: { background: color, border: '#000' } },
      font: { color: '#ffffff', size: 14, face: 'Inter' },
      url: p.href,
    });
    // v5.0h · papers que citan conceptos via wikilinks [[con-*]] o [[glo-*]]
    for (const conId of extractConceptoTargets(p.body)) {
      addEdge(p.id, conId, 'invoca');
    }
  }

  // v5.0h · Conceptos del Glosario Universal — base conceptual M00
  for (const c of concepto) {
    nodes.push({
      id: c.id,
      label: c.skos_prefLabel?.slice(0, 24) ?? c.kd_title?.slice(0, 24) ?? c.id,
      title: `${c.skos_prefLabel ?? c.kd_title}\n[concepto]\n\n${(c.skos_definition ?? '').slice(0, 200)}`,
      group: 'concepto',
      shape: 'diamond',
      size: 14,
      color: { background: COLORS.concepto.bg, border: COLORS.concepto.border },
      font: { color: COLORS.concepto.font, size: 11, face: 'Inter' },
      url: c.href,
    });
    // Si el frontmatter tiene cited_in con [[sec-MI12-NN]], no creamos arista
    // (sec-MI12 son secciones del libro, no del portal). Las aristas concepto→
    // concepto se derivan del propio body (extractConceptoTargets).
    for (const conId of extractConceptoTargets(c.body)) {
      if (conId !== c.id) addEdge(c.id, conId, 'relacionado');
    }
  }

  // Comunidades
  for (const c of community) {
    if (c.slug === 'comunidades') continue;
    const colorSpec = COLORS.community[c.type] ?? COLORS.community.direccion;
    nodes.push({
      id: c.slug,
      label: c.shortName ?? c.name.slice(0, 32),
      title: `${c.name}\n[${c.type}]\n\n${c.description}`,
      group: c.type,
      shape: 'box',
      color: { background: colorSpec.bg, border: colorSpec.border },
      font: { color: colorSpec.font, size: 12, face: 'Inter' },
      url: `/${c.slug}`,
    });
    // citations to canonical
    for (const cite of c.cites ?? []) {
      addEdge(c.slug, cite, 'cita');
    }
    // parent-child
    const parts = c.slug.split('/');
    if (parts.length > 1) {
      const parentSlug = parts.slice(0, -1).join('/');
      // si el padre existe como community, conectar
      if (community.find((x) => x.slug === parentSlug)) {
        addEdge(parentSlug, c.slug, 'contiene');
      }
    }
  }

  // Notas
  for (const n of note) {
    nodes.push({
      id: n.slug,
      label: n.title.slice(0, 28),
      title: `${n.title}\n[nota]\nCoP: ${n.communitySlug}`,
      group: 'note',
      shape: 'ellipse',
      size: 12,
      color: { background: COLORS.note.bg, border: COLORS.note.border },
      font: { color: COLORS.note.font, size: 11, face: 'Inter' },
      url: `/${n.slug}`,
    });
    // Note belongs-to community
    addEdge(n.communitySlug, n.slug, 'contiene');
    // cites
    for (const cite of n.cites ?? []) addEdge(n.slug, cite, 'cita');
    // wikilinks extraidos
    for (const wl of extractWikilinkTargets(n.body)) addEdge(n.slug, wl, 'wikilink');
    // v5.0h · notas que invocan conceptos del glosario
    for (const conId of extractConceptoTargets(n.body)) addEdge(n.slug, conId, 'invoca');
  }

  return { nodes, edges, meta: { generatedAt: new Date().toISOString(), counts: { nodes: nodes.length, edges: edges.length } } };
}

/* ---------------------------------------------------------------------------
 * Grafo local por comunidad
 * ------------------------------------------------------------------------- */
function buildLocalGraph(communitySlug) {
  const nodes = [];
  const edges = [];
  const seenEdges = new Set();
  const includedPapers = new Set();

  function addEdge(from, to, label) {
    const key = `${from}->${to}:${label}`;
    if (seenEdges.has(key)) return;
    seenEdges.add(key);
    edges.push({ from, to, label, arrows: 'to' });
  }

  // Comunidades en este subarbol
  const subCommunities = community.filter(
    (c) => c.slug === communitySlug || c.slug.startsWith(communitySlug + '/')
  );
  for (const c of subCommunities) {
    const colorSpec = COLORS.community[c.type] ?? COLORS.community.direccion;
    nodes.push({
      id: c.slug,
      label: c.shortName ?? c.name.slice(0, 32),
      title: `${c.name}\n[${c.type}]`,
      group: c.type,
      shape: 'box',
      color: { background: colorSpec.bg, border: colorSpec.border },
      font: { color: colorSpec.font, size: 12, face: 'Inter' },
      url: `/${c.slug}`,
    });
    for (const cite of c.cites ?? []) includedPapers.add(cite);
    // parent-child entre subcomunidades
    const parts = c.slug.split('/');
    if (parts.length > 1) {
      const parentSlug = parts.slice(0, -1).join('/');
      if (subCommunities.find((x) => x.slug === parentSlug)) {
        addEdge(parentSlug, c.slug, 'contiene');
      }
    }
  }

  // Notas de esas comunidades
  const subNotes = note.filter(
    (n) => n.communitySlug === communitySlug || n.communitySlug.startsWith(communitySlug + '/')
  );
  for (const n of subNotes) {
    nodes.push({
      id: n.slug,
      label: n.title.slice(0, 28),
      title: `${n.title}\n[nota]`,
      group: 'note',
      shape: 'ellipse',
      size: 12,
      color: { background: COLORS.note.bg, border: COLORS.note.border },
      font: { color: COLORS.note.font, size: 11, face: 'Inter' },
      url: `/${n.slug}`,
    });
    addEdge(n.communitySlug, n.slug, 'contiene');
    for (const cite of n.cites ?? []) {
      includedPapers.add(cite);
      addEdge(n.slug, cite, 'cita');
    }
    for (const wl of extractWikilinkTargets(n.body)) {
      includedPapers.add(wl);
      addEdge(n.slug, wl, 'wikilink');
    }
  }

  // Papers como nodos puente (color distinto)
  for (const pid of includedPapers) {
    const p = canonicPaper.find((x) => x.id === pid);
    if (!p) continue;
    nodes.push({
      id: p.id,
      label: p.id.toUpperCase(),
      title: `${p.title}\n\n[paper canónico]`,
      group: 'bridge',
      shape: 'dot',
      size: 22,
      color: { background: COLORS.bridge.bg, border: COLORS.bridge.border },
      font: { color: COLORS.bridge.font, size: 13, face: 'Inter' },
      url: p.href,
    });
    // citations from communities
    for (const c of subCommunities) {
      if (c.cites?.includes(pid)) addEdge(c.slug, pid, 'cita');
    }
  }

  return { nodes, edges, meta: { slug: communitySlug, generatedAt: new Date().toISOString(), counts: { nodes: nodes.length, edges: edges.length } } };
}

/* --------------------------------------------------------------------------- */

const global = buildGlobalGraph();
fs.writeFileSync(path.join(PUBLIC_DIR, 'graph-global.json'), JSON.stringify(global));
console.log(`[graph] global: ${global.meta.counts.nodes} nodos, ${global.meta.counts.edges} aristas`);

let localCount = 0;
for (const c of community) {
  if (c.slug === 'comunidades') continue;
  const local = buildLocalGraph(c.slug);
  const filename = c.slug.replace(/\//g, '__') + '.json';
  fs.writeFileSync(path.join(GRAPHS_DIR, filename), JSON.stringify(local));
  localCount++;
}
console.log(`[graph] ${localCount} grafos locales por comunidad`);
console.log('[graph] DONE');
