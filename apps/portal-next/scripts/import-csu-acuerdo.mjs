#!/usr/bin/env node
/**
 * import-csu-acuerdo.mjs — importa acuerdos CSU del vault al portal.
 * v1.0.0 · 2026-04-29 · CC BY-SA 4.0
 *
 * Para cada acuerdo en VAULT/100--csu/{N}--{slug}/:
 *   - Lee _meta/ficha-acuerdo.md → obtiene metadatos
 *   - Lee unidades en orden (02-vif → 08-oeg) con sus artículos atómicos
 *   - Lee 09-otras-disposiciones/
 *   - Genera content/acuerdos/{slug}.mdx con el cuerpo completo
 *
 * Uso:
 *   node scripts/import-csu-acuerdo.mjs            # todos los acuerdos
 *   node scripts/import-csu-acuerdo.mjs ea-001      # solo ea-001
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { splitFrontmatter, parseYamlKeys } from './lib/glosario-transform.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const VAULT_CSU = String.raw`H:\.shortcut-targets-by-id\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\daath-zen\R002-daath-cortex\20--udfjc-reforma-vinculante\100--csu`;
const DEST = path.join(ROOT, 'content', 'acuerdos');

const UNIT_ORDER = [
  { dir: '02-vif',                 id: 'vif',    label: 'Vicerrectoría de Formación (VIF)' },
  { dir: '03-vic-i',               id: 'vic-i',  label: 'Vicerrectoría Investigación-Creación-Innovación (VIC&I)' },
  { dir: '04-vice-ps',             id: 'vice-ps', label: 'Vicerrectoría Contextos-Extensión y Proyección Social (VICE&PS)' },
  { dir: '05-gaf',                 id: 'gaf',    label: 'Gerencia Administrativa y Financiera (GA&F)' },
  { dir: '06-dbu-bv',              id: 'dbu-bv', label: 'Dirección Bienestar Universitario y Buen Vivir (DBU&BV)' },
  { dir: '07-dge-p',               id: 'dge-p',  label: 'Dirección Gestión Estratégica y Planeación (DGE&P)' },
  { dir: '08-oeg',                 id: 'oeg',    label: 'Oficina de Egresados (OEG)' },
  { dir: '09-otras-disposiciones', id: 'otras',  label: 'Otras Disposiciones — Modificaciones y Transición' },
];

function readArticlesFromDir(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md') && f.startsWith('art-'))
    .sort();
  return files.map(f => {
    const raw = fs.readFileSync(path.join(dirPath, f), 'utf-8').replace(/\r\n/g, '\n');
    const { body } = splitFrontmatter(raw);
    return body.trim();
  });
}

function buildAcuerdo(acuerdoDir, portalSlug) {
  const metaPath = path.join(acuerdoDir, '_meta', 'ficha-acuerdo.md');
  if (!fs.existsSync(metaPath)) {
    console.warn(`  [!] _meta/ficha-acuerdo.md no encontrado en ${acuerdoDir}`);
    return null;
  }

  // Parse meta
  const metaRaw = fs.readFileSync(metaPath, 'utf-8').replace(/\r\n/g, '\n');
  const { frontmatterBlock } = splitFrontmatter(metaRaw);
  const meta = parseYamlKeys(frontmatterBlock);

  const titulo = String(meta.acuerdo_titulo ?? 'Acuerdo CSU UDFJC').slice(0, 200);
  const objetoCorto = String(meta.acuerdo_objeto_corto ?? portalSlug);
  const estado = String(meta.acuerdo_estado ?? 'DRAFT');
  const implementa = String(meta.implementa ?? '');
  const implementaArt = String(meta.implementa_articulo ?? '');

  // Build body sections
  const sections = [];

  // Header card
  sections.push(`## Acuerdo EA-001 · Descripción General

> **Estado**: ${estado} · **Mandato**: ${implementa} ${implementaArt}

${titulo}
`);

  // Each unit
  for (const unit of UNIT_ORDER) {
    const unitDir = path.join(acuerdoDir, unit.dir);
    const articles = readArticlesFromDir(unitDir);
    if (articles.length === 0) continue;

    sections.push(`## ${unit.label}\n`);
    sections.push(articles.join('\n\n---\n\n'));
    sections.push('');
  }

  const body = sections.join('\n');

  // Velite frontmatter for csuAcuerdo collection
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
    ...UNIT_ORDER.filter(u => fs.existsSync(path.join(acuerdoDir, u.dir))).map(
      u => `  - id: ${u.id}\n    titulo: "${u.label}"`
    ),
    '---',
    '',
  ].join('\n');

  return fm + body;
}

// ── Main ──────────────────────────────────────────────────────────────
if (!fs.existsSync(VAULT_CSU)) {
  console.error(`✗ Vault CSU no encontrado: ${VAULT_CSU}`);
  console.error('  Verifica Google Drive Stream en H:\\');
  process.exit(1);
}

if (!fs.existsSync(DEST)) {
  fs.mkdirSync(DEST, { recursive: true });
}

const targetSlug = process.argv[2] ?? null; // e.g. "ea-001"

// Discover acuerdo dirs
const acuerdoDirs = fs.readdirSync(VAULT_CSU, { withFileTypes: true })
  .filter(e => e.isDirectory() && /^\d+--/.test(e.name))
  .map(e => ({ name: e.name, fullPath: path.join(VAULT_CSU, e.name) }));

let built = 0;
for (const { name, fullPath } of acuerdoDirs) {
  // Derive portal slug: "001--estructura-organizativa" → "ea-001"
  // Convention: read portal_id from ficha-acuerdo.md
  const metaPath = path.join(fullPath, '_meta', 'ficha-acuerdo.md');
  if (!fs.existsSync(metaPath)) {
    console.warn(`  ⏭ ${name} — sin _meta/ficha-acuerdo.md, saltado`);
    continue;
  }

  const metaRaw = fs.readFileSync(metaPath, 'utf-8').replace(/\r\n/g, '\n');
  const { frontmatterBlock } = splitFrontmatter(metaRaw);
  const meta = parseYamlKeys(frontmatterBlock);
  const portalSlug = String(meta.portal_id ?? name.replace(/^\d+--/, ''));

  if (targetSlug && portalSlug !== targetSlug) continue;

  console.log(`  → ${name} (portal: ${portalSlug})`);
  const content = buildAcuerdo(fullPath, portalSlug);
  if (!content) continue;

  const destFile = path.join(DEST, `${portalSlug}.mdx`);
  fs.writeFileSync(destFile, content, 'utf-8');
  console.log(`  ✓ content/acuerdos/${portalSlug}.mdx (${content.length} bytes)`);
  built++;
}

console.log(`\nImportados: ${built} acuerdo(s) → content/acuerdos/`);
