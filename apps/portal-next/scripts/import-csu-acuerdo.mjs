#!/usr/bin/env node
/**
 * import-csu-acuerdo.mjs — importa acuerdos CSU del vault al portal.
 * v2.0.0 · 2026-04-29 · CC BY-SA 4.0
 *
 * Estructura vault esperada (post Sprint C1 v2):
 *   100--csu/{N}--{slug}/
 *     _meta/ficha-acuerdo.md        → metadatos
 *     01-secciones/sec-EA-*.md      → documentos de sección (con transclusions)
 *     01-secciones/atomicos/**      → archivos atómicos (transcluidos inline)
 *     02-figuras/fig-EA-*.md        → figuras Mermaid (inlineadas)
 *
 * Para cada sección sec-EA-*.md:
 *   - Resuelve transclusions ![[art-EA-*]] → inline body del atómico
 *   - Resuelve ![[fig-EA-*]] → inline bloque Mermaid
 *   - Convierte DV blocks → sentinels (via glosario-transform.mjs cleanBody)
 *   - Genera content/acuerdos/{portal_id}.mdx con todas las secciones
 *
 * Uso:
 *   node scripts/import-csu-acuerdo.mjs         # todos los acuerdos
 *   node scripts/import-csu-acuerdo.mjs ea-001  # solo ea-001
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { splitFrontmatter, parseYamlKeys, cleanBody } from './lib/glosario-transform.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const VAULT_CSU = String.raw`H:\.shortcut-targets-by-id\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\daath-zen\R002-daath-cortex\20--udfjc-reforma-vinculante\100--csu`;
const DEST = path.join(ROOT, 'content', 'acuerdos');

// ── Cache de atómicos y figuras ───────────────────────────────────────
const atomicCache = new Map();  // slug → body text
const figureCache = new Map();  // slug → mermaid body

function findAtomicFile(acuerdoDir, slug) {
  if (atomicCache.has(slug)) return atomicCache.get(slug);
  // Search recursively in 01-secciones/atomicos/
  const atomicBase = path.join(acuerdoDir, '01-secciones', 'atomicos');
  if (!fs.existsSync(atomicBase)) { atomicCache.set(slug, null); return null; }

  function search(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const found = search(path.join(dir, entry.name));
        if (found) return found;
      } else if (entry.name === `${slug}.md` || entry.name.startsWith(slug)) {
        return path.join(dir, entry.name);
      }
    }
    return null;
  }
  const fp = search(atomicBase);
  const body = fp ? (() => {
    const raw = fs.readFileSync(fp, 'utf-8').replace(/\r\n/g, '\n');
    return splitFrontmatter(raw).body.trim();
  })() : null;
  atomicCache.set(slug, body);
  return body;
}

function loadFigure(acuerdoDir, figSlug) {
  if (figureCache.has(figSlug)) return figureCache.get(figSlug);
  const figDir = path.join(acuerdoDir, '02-figuras');
  if (!fs.existsSync(figDir)) { figureCache.set(figSlug, null); return null; }
  const files = fs.readdirSync(figDir).filter(f => f.startsWith(figSlug) && f.endsWith('.md'));
  if (files.length === 0) { figureCache.set(figSlug, null); return null; }
  const raw = fs.readFileSync(path.join(figDir, files[0]), 'utf-8').replace(/\r\n/g, '\n');
  const body = splitFrontmatter(raw).body.trim();
  figureCache.set(figSlug, body);
  return body;
}

/** Resuelve ![[slug]] → body del atómico o figura inline */
function resolveTransclusions(body, acuerdoDir) {
  const broken = [];
  const result = body.replace(
    /!\[\[([^\]|]+?)(\|[^\]]+)?\]\]/g,
    (_match, slug, alias) => {
      const cleanSlug = slug.trim();
      // Figura
      if (cleanSlug.startsWith('fig-EA-')) {
        const figBody = loadFigure(acuerdoDir, cleanSlug);
        if (!figBody) { broken.push(cleanSlug); return _match; }
        const caption = cleanSlug.replace(/^fig-EA-\d+--/, '').replaceAll('-', ' ');
        return `\n${figBody}\n\n*Figura: ${caption}*\n`;
      }
      // Artículo / Considerando atómico
      if (cleanSlug.startsWith('art-EA-') || cleanSlug.startsWith('cdo-EA-')) {
        const atomicBody = findAtomicFile(acuerdoDir, cleanSlug);
        if (!atomicBody) { broken.push(cleanSlug); return `\n<!-- ${cleanSlug} not found -->\n`; }
        return `\n${atomicBody}\n`;
      }
      return _match; // leave unknown transclusions
    }
  );
  return { body: result, broken };
}

function buildAcuerdo(acuerdoDir, portalSlug) {
  const metaPath = path.join(acuerdoDir, '_meta', 'ficha-acuerdo.md');
  if (!fs.existsSync(metaPath)) return null;

  const metaRaw = fs.readFileSync(metaPath, 'utf-8').replace(/\r\n/g, '\n');
  const { frontmatterBlock } = splitFrontmatter(metaRaw);
  const meta = parseYamlKeys(frontmatterBlock);

  const objetoCorto = String(meta.acuerdo_objeto_corto ?? portalSlug);
  const titulo = String(meta.acuerdo_titulo ?? 'Acuerdo CSU UDFJC').slice(0, 200);
  const estado = String(meta.acuerdo_estado ?? 'DRAFT');
  const implementa = String(meta.implementa ?? '');
  const implementaArt = String(meta.implementa_articulo ?? '');

  // Read section files in order
  const secDir = path.join(acuerdoDir, '01-secciones');
  if (!fs.existsSync(secDir)) return null;
  const secFiles = fs.readdirSync(secDir)
    .filter(f => f.startsWith('sec-EA-') && f.endsWith('.md'))
    .sort();

  const sections = [];
  let totalBroken = [];

  for (const secFile of secFiles) {
    const secRaw = fs.readFileSync(path.join(secDir, secFile), 'utf-8').replace(/\r\n/g, '\n');
    const { frontmatterBlock: secFm, body: secBody } = splitFrontmatter(secRaw);
    const secMeta = parseYamlKeys(secFm);

    // Resolve transclusions (![[art-EA-*]] → inline body)
    const { body: resolved, broken } = resolveTransclusions(secBody, acuerdoDir);
    totalBroken.push(...broken);

    // Apply cleanBody to remove Obsidian-only artifacts from atomic bodies
    const cleaned = cleanBody(resolved, secMeta);
    sections.push(cleaned.trim());
  }

  if (totalBroken.length > 0) {
    console.warn(`  ⚠ ${totalBroken.length} transclusion(s) no resueltas: ${totalBroken.slice(0,3).join(', ')}...`);
  }

  // Build capitulos array from section files
  const capitulos = secFiles.map(f => {
    const raw = fs.readFileSync(path.join(secDir, f), 'utf-8').replace(/\r\n/g, '\n');
    const m = parseYamlKeys(splitFrontmatter(raw).frontmatterBlock);
    return { id: String(m.unidad_organizativa ?? f), titulo: String(m.kd_title ?? f) };
  });

  const body = sections.join('\n\n---\n\n');

  const fm = [
    '---',
    `id: ${portalSlug}`,
    `titulo: "${objetoCorto.replace(/"/g, "'")}"`,
    `objetoCorto: "${objetoCorto.replace(/"/g, "'")}"`,
    `estado: ${estado}`,
    `organo: CSU`,
    `implementaAcuerdo: "${implementa}"`,
    `implementaArticulo: "${implementaArt}"`,
    `color: blue`,
    `capitulos:`,
    ...capitulos.map(c => `  - id: ${c.id}\n    titulo: "${c.titulo.replace(/"/g, "'")}"`),
    '---',
    '',
  ].join('\n');

  return fm + body;
}

// ── Main ──────────────────────────────────────────────────────────────
if (!fs.existsSync(VAULT_CSU)) {
  console.error(`✗ Vault CSU no encontrado: ${VAULT_CSU}`);
  process.exit(1);
}
if (!fs.existsSync(DEST)) fs.mkdirSync(DEST, { recursive: true });

const targetSlug = process.argv[2] ?? null;

const acuerdoDirs = fs.readdirSync(VAULT_CSU, { withFileTypes: true })
  .filter(e => e.isDirectory() && /^\d+--/.test(e.name))
  .map(e => ({ name: e.name, fullPath: path.join(VAULT_CSU, e.name) }));

let built = 0;
for (const { name, fullPath } of acuerdoDirs) {
  const metaPath = path.join(fullPath, '_meta', 'ficha-acuerdo.md');
  if (!fs.existsSync(metaPath)) {
    console.log(`  ⏭ ${name} — sin _meta/ficha-acuerdo.md`);
    continue;
  }
  const metaRaw = fs.readFileSync(metaPath, 'utf-8').replace(/\r\n/g, '\n');
  const meta = parseYamlKeys(splitFrontmatter(metaRaw).frontmatterBlock);
  const portalSlug = String(meta.portal_id ?? name.replace(/^\d+--/, ''));

  if (targetSlug && portalSlug !== targetSlug) continue;

  console.log(`\n  → ${name} (${portalSlug})`);
  atomicCache.clear();
  figureCache.clear();

  const content = buildAcuerdo(fullPath, portalSlug);
  if (!content) { console.warn(`  ✗ falló buildAcuerdo`); continue; }

  const destFile = path.join(DEST, `${portalSlug}.mdx`);
  fs.writeFileSync(destFile, content, 'utf-8');
  console.log(`  ✓ content/acuerdos/${portalSlug}.mdx (${(content.length/1024).toFixed(0)}KB)`);
  built++;
}

console.log(`\nImportados: ${built} acuerdo(s) → content/acuerdos/`);
