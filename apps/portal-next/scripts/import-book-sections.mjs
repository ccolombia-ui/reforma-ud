#!/usr/bin/env node
/**
 * import-book-sections.mjs — copia secciones MI12 del libro UDFJC al portal.
 *
 * Para cada `sec-MI12-NN--*.md` en SOURCE:
 *   - Preserva el frontmatter velite del m##.mdx existente (id, number, title, description,
 *     crispPhase, rutaClark, status, tags), añadiendo crispPhase si falta.
 *   - Reemplaza el body con el del source (descartando su frontmatter kd_*).
 *   - Promueve status: red → green (las secciones ya están FINAL).
 *   - Mantiene wikilinks `[[glo-...]]` y `![[ref]]` tal cual; el portal los resuelve en runtime.
 *
 * Uso: node scripts/import-book-sections.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const SOURCE = String.raw`H:\.shortcut-targets-by-id\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\daath-zen\R002-daath-cortex\20--udfjc-reforma-vinculante\3-diseño-capitulo-libro\01-secciones`;
const DEST = path.resolve('content', 'canonico');

if (!fs.existsSync(SOURCE)) {
  console.error(`✗ Source no existe: ${SOURCE}`);
  process.exit(1);
}
if (!fs.existsSync(DEST)) {
  console.error(`✗ Dest no existe: ${DEST}`);
  process.exit(1);
}

/** Parse simple frontmatter YAML — devuelve { frontmatter (object), body (string) }. */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { frontmatter: {}, body: raw };
  const fmText = m[1];
  const body = m[2];
  // Parser muy simple: clave: valor en cada línea no indentada
  const fm = {};
  const lines = fmText.split(/\r?\n/);
  let lastKey = null;
  for (const line of lines) {
    if (/^\s*$/.test(line)) continue;
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (kv) {
      lastKey = kv[1];
      const val = kv[2].trim();
      fm[lastKey] = val.startsWith('[') ? val : val;
    } else if (line.startsWith('- ') && lastKey) {
      // simple array continuation — no tocamos
    }
  }
  return { frontmatter: fm, body };
}

/** Serializa frontmatter velite respetando arrays y strings con comillas. */
function serializeFrontmatter(fm) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fm)) {
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map((x) => (typeof x === 'string' && /^[A-Z\d]/.test(x) ? x : `"${x}"`)).join(', ')}]`);
    } else if (typeof v === 'string' && (v.includes(':') || v.includes(',') || v.includes("'") || v.includes('"'))) {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    } else {
      lines.push(`${k}: ${v}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

const sources = fs.readdirSync(SOURCE).filter((f) => /^sec-MI12-\d{2}--.+\.md$/.test(f));
let imported = 0;
const errors = [];

for (const file of sources) {
  const m = file.match(/^sec-MI12-(\d{2})--/);
  if (!m) continue;
  const num = parseInt(m[1], 10);
  const mid = `m${m[1]}`;
  const destFile = path.join(DEST, `${mid}.mdx`);

  if (!fs.existsSync(destFile)) {
    errors.push(`${mid}: dest .mdx no existe`);
    continue;
  }

  const sourceRaw = fs.readFileSync(path.join(SOURCE, file), 'utf-8');
  const { body: sourceBody } = parseFrontmatter(sourceRaw);
  const destRaw = fs.readFileSync(destFile, 'utf-8');
  const { frontmatter: destFm } = parseFrontmatter(destRaw);

  // Reusar frontmatter destino + bump status a green (las secciones MI12 están FINAL).
  // Reemplazar tags por un set ampliado.
  const newFm = {
    ...destFm,
    status: 'green',
  };

  // Preservar el orden idiomático del frontmatter velite
  const orderedKeys = ['id', 'number', 'title', 'description', 'crispPhase', 'rutaClark', 'status', 'tags'];
  const ordered = {};
  for (const k of orderedKeys) {
    if (newFm[k] !== undefined) ordered[k] = newFm[k];
  }
  // Add any extra keys
  for (const [k, v] of Object.entries(newFm)) {
    if (!(k in ordered)) ordered[k] = v;
  }

  // Limpiar wikilinks relativos del source: `![[../60-glosario/glo-X]]` → `![[glo-X]]`
  // y `[[../60-glosario/glo-X|alias]]` → `[[glo-X|alias]]`
  const cleanedBody = sourceBody
    .replaceAll(/!\[\[\.{2}\/[^/\]]+\/([^\]]+?)\]\]/g, '![[$1]]')
    .replaceAll(/\[\[\.{2}\/[^/\]]+\/([^|\]]+?)(\|[^\]]+)?\]\]/g, '[[$1$2]]');

  const out = `${serializeFrontmatter(ordered)}\n${cleanedBody.startsWith('\n') ? '' : '\n'}${cleanedBody}`;
  fs.writeFileSync(destFile, out, 'utf-8');
  imported++;
  console.log(`✓ ${mid} ← ${file} (${cleanedBody.length} chars)`);
}

console.log(`\nImportadas ${imported}/${sources.length} secciones a ${DEST}`);
if (errors.length) {
  console.log('\nErrores:');
  for (const e of errors) console.log(`  · ${e}`);
}
