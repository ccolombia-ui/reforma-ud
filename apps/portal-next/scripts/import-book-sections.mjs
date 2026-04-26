#!/usr/bin/env node
/**
 * import-book-sections.mjs — copia secciones MI12 del libro UDFJC al portal.
 *
 * Para cada `sec-MI12-NN--*.md` en SOURCE:
 *   - Preserva el frontmatter velite del m##.mdx existente RAW (sin reparseo).
 *   - Modifica solo `status: ...` → `status: green`.
 *   - Reemplaza el body con el del source (descartando su frontmatter kd_*).
 *   - Limpia wikilinks relativos `![[../60-glosario/glo-X]]` → `![[glo-X]]`.
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

/** Split raw text en frontmatter (con delimitadores) y body. */
function splitFrontmatter(raw) {
  const m = raw.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
  if (!m) return { frontmatterBlock: '---\n---\n', body: raw };
  return { frontmatterBlock: m[1], body: m[2] };
}

const sources = fs.readdirSync(SOURCE).filter((f) => /^sec-MI12-\d{2}--.+\.md$/.test(f));
let imported = 0;
const errors = [];

for (const file of sources) {
  const m = file.match(/^sec-MI12-(\d{2})--/);
  if (!m) continue;
  const mid = `m${m[1]}`;
  const destFile = path.join(DEST, `${mid}.mdx`);

  if (!fs.existsSync(destFile)) {
    errors.push(`${mid}: dest .mdx no existe`);
    continue;
  }

  const sourceRaw = fs.readFileSync(path.join(SOURCE, file), 'utf-8');
  const destRaw = fs.readFileSync(destFile, 'utf-8');

  const { body: sourceBody } = splitFrontmatter(sourceRaw);
  let { frontmatterBlock: destFm } = splitFrontmatter(destRaw);

  // Bump status: red|yellow → green
  destFm = destFm.replace(/^status:\s*\w+/m, 'status: green');

  // Limpiar wikilinks relativos al glosario/sources del libro
  const cleanedBody = sourceBody
    .replaceAll(/!\[\[\.{2}\/[^/\]]+\/([^\]]+?)\]\]/g, '![[$1]]')
    .replaceAll(/\[\[\.{2}\/[^/\]]+\/([^|\]]+?)(\|[^\]]+)?\]\]/g, '[[$1$2]]');

  const out = `${destFm}${cleanedBody.startsWith('\n') ? '' : '\n'}${cleanedBody}`;
  fs.writeFileSync(destFile, out, 'utf-8');
  imported++;
  console.log(`✓ ${mid} ← ${file} (${cleanedBody.length} chars)`);
}

console.log(`\nImportadas ${imported}/${sources.length} secciones a ${DEST}`);
if (errors.length) {
  console.log('\nErrores:');
  for (const e of errors) console.log(`  · ${e}`);
}
