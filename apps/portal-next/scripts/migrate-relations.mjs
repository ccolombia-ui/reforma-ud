#!/usr/bin/env node
/**
 * migrate-relations.mjs · v4.5c D6
 *
 * Para cada `content/canonico/m##.mdx`, lee el body y deriva:
 *   • relations.custom.glosario  ← wikilinks `[[glo-*]]`
 *   • relations.custom.figuras   ← wikilinks `[[fig-*]]`
 *   • relations.custom.normas    ← wikilinks `[[acu-*|estatuto-*]]`
 *   • cites                       ← compat plano (preserva existentes)
 *
 * NO toca `pre`, `pos`, `co` — esos los completan los autores a mano.
 * Idempotente: si ya hay un `relations:` con custom, lo regenera (no duplica).
 *
 * Run: `node scripts/migrate-relations.mjs`
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const CANONICO_DIR = join(process.cwd(), 'content', 'canonico');

function splitFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return null;
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return null;
  return {
    frontmatter: raw.slice(4, end),
    body: raw.slice(end + 5),
  };
}

function extractWikilinkTargets(body) {
  const out = new Set();
  // [[target]] o [[target|alias]] — sin embed (! delante)
  const re = /(?<!!)\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    out.add(m[1].trim());
  }
  return Array.from(out);
}

function categorize(targets) {
  const glosario = [];
  const figuras = [];
  const normas = [];
  const otros = [];
  for (const t of targets) {
    const lower = t.toLowerCase();
    if (lower.startsWith('glo-')) glosario.push(t);
    else if (lower.startsWith('fig-')) figuras.push(t);
    else if (/^(acu-|estatuto-|res-|conpes-|ley-|decreto-)/i.test(lower)) normas.push(t);
    else otros.push(t);
  }
  return { glosario, figuras, normas, otros };
}

function buildRelationsBlock({ glosario, figuras, normas }, existing) {
  // Preserva pre/pos/co existentes (no los derivamos)
  const preLines = existing?.pre ?? [];
  const posLines = existing?.pos ?? [];
  const coLines = existing?.co ?? [];
  const customCustom = existing?.customRaw ?? {};
  customCustom.glosario = glosario;
  customCustom.figuras = figuras;
  customCustom.normas = normas;
  // Limpia keys vacíos para no ensuciar yaml
  for (const k of Object.keys(customCustom)) {
    if (!customCustom[k] || customCustom[k].length === 0) delete customCustom[k];
  }
  let yaml = 'relations:\n';
  yaml += `  pre: [${preLines.map((x) => JSON.stringify(x)).join(', ')}]\n`;
  yaml += `  pos: [${posLines.map((x) => JSON.stringify(x)).join(', ')}]\n`;
  yaml += `  co: [${coLines.join(', ')}]\n`;
  if (Object.keys(customCustom).length === 0) {
    yaml += '  custom: {}\n';
  } else {
    yaml += '  custom:\n';
    for (const [k, arr] of Object.entries(customCustom)) {
      yaml += `    ${k}: [${arr.map((x) => JSON.stringify(x)).join(', ')}]\n`;
    }
  }
  return yaml.trimEnd();
}

function upsertRelations(frontmatter, relationsBlock) {
  // Si ya existe un bloque `relations:`, reemplazarlo. Si no, añadirlo al final.
  const lines = frontmatter.split('\n');
  let startIdx = -1;
  let endIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^relations:/.test(lines[i])) {
      startIdx = i;
      // Encontrar el fin: primera línea no indentada después
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].length === 0) continue;
        if (!/^\s/.test(lines[j])) {
          endIdx = j - 1;
          break;
        }
      }
      if (endIdx === -1) endIdx = lines.length - 1;
      break;
    }
  }
  if (startIdx === -1) {
    return frontmatter.trimEnd() + '\n' + relationsBlock;
  }
  return [...lines.slice(0, startIdx), relationsBlock, ...lines.slice(endIdx + 1)]
    .filter((l, i, arr) => !(l === '' && arr[i - 1] === '')) // dedupe blanks
    .join('\n');
}

function processFile(path) {
  const raw = readFileSync(path, 'utf8');
  const fm = splitFrontmatter(raw);
  if (!fm) {
    return { path, status: 'skipped: no frontmatter' };
  }
  const targets = extractWikilinkTargets(fm.body);
  const { glosario, figuras, normas } = categorize(targets);
  const relationsBlock = buildRelationsBlock({ glosario, figuras, normas });
  const updatedFm = upsertRelations(fm.frontmatter, relationsBlock);
  const out = `---\n${updatedFm}\n---\n${fm.body}`;
  writeFileSync(path, out, 'utf8');
  return {
    path,
    status: 'ok',
    counts: { glosario: glosario.length, figuras: figuras.length, normas: normas.length },
  };
}

function main() {
  const files = readdirSync(CANONICO_DIR)
    .filter((f) => /^m\d{2}\.mdx?$/i.test(f))
    .map((f) => join(CANONICO_DIR, f))
    .sort();
  if (files.length === 0) {
    console.error('No se encontraron papers M## en', CANONICO_DIR);
    process.exit(1);
  }
  console.log(`[migrate-relations] procesando ${files.length} archivos`);
  for (const f of files) {
    const r = processFile(f);
    if (r.status === 'ok') {
      console.log(
        `  ${r.path.split(/[\\/]/).pop()} · glosario=${r.counts.glosario} figuras=${r.counts.figuras} normas=${r.counts.normas}`
      );
    } else {
      console.warn(`  ${r.path}: ${r.status}`);
    }
  }
  console.log('[migrate-relations] DONE');
}

main();
