#!/usr/bin/env node
/**
 * import-book-sections.mjs — copia secciones MI12 del libro UDFJC al portal.
 *
 * Para cada `sec-MI12-NN--*.md` en SOURCE_SECTIONS:
 *   - Preserva el frontmatter velite del m##.mdx existente RAW (sin reparseo).
 *   - Modifica solo `status: ...` → `status: green`.
 *   - Reemplaza el body con el del source (descartando su frontmatter kd_*).
 *   - Limpia wikilinks relativos `![[../60-glosario/glo-X]]` → `![[glo-X]]`.
 *   - **INLINE figures**: detecta `![[fig-MI12-NN-...]]`, lee el `.md` correspondiente
 *     en SOURCE_FIGURES y inline el bloque mermaid (saltando frontmatter).
 *     Razón: @flowershow/remark-wiki-link 3.4 NO soporta embed de notas .md aún
 *     (solo media). Workaround build-time hasta que upstream lo soporte.
 *
 * Uso: node scripts/import-book-sections.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = String.raw`H:\.shortcut-targets-by-id\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\daath-zen\R002-daath-cortex\20--udfjc-reforma-vinculante\3-diseño-capitulo-libro`;
const SOURCE_SECTIONS = path.join(ROOT, '01-secciones');
const SOURCE_FIGURES = path.join(ROOT, '02-figuras');
const DEST = path.resolve('content', 'canonico');

if (!fs.existsSync(SOURCE_SECTIONS)) {
  console.error(`✗ Source secciones no existe: ${SOURCE_SECTIONS}`);
  process.exit(1);
}
if (!fs.existsSync(DEST)) {
  console.error(`✗ Dest no existe: ${DEST}`);
  process.exit(1);
}

// Cache: figId → body (sin frontmatter)
const figureCache = new Map();
function loadFigure(figId) {
  if (figureCache.has(figId)) return figureCache.get(figId);
  const fp = path.join(SOURCE_FIGURES, `${figId}.md`);
  if (!fs.existsSync(fp)) {
    figureCache.set(figId, null);
    return null;
  }
  const raw = fs.readFileSync(fp, 'utf-8');
  const { body } = splitFrontmatter(raw);
  figureCache.set(figId, body.trim());
  return body.trim();
}

/** Split raw text en frontmatter (con delimitadores) y body. */
function splitFrontmatter(raw) {
  const m = raw.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
  if (!m) return { frontmatterBlock: '---\n---\n', body: raw };
  return { frontmatterBlock: m[1], body: m[2] };
}

/**
 * Inline embeds `![[fig-MI12-NN-...]]` → contenido (mermaid block) + caption.
 * Estrategia:
 *   ![[fig-MI12-08--evolucion-mode-1-2-3]]
 *   →  ```mermaid\nflowchart...\n```
 *      *Figura: fig-MI12-08 — Evolución Mode 1→2→3*
 */
function inlineFigures(body) {
  const broken = [];
  const result = body.replaceAll(
    /!\[\[(fig-MI12-[^\]|]+?)(\|[^\]]+)?\]\]/g,
    (match, figId, _alias) => {
      const figBody = loadFigure(figId);
      if (!figBody) {
        broken.push(figId);
        return match; // dejar tal cual; quedará marcado broken por el wikilink plugin
      }
      // Caption visible bajo la figura
      const caption = figId.replace(/^fig-MI12-(\d+)--/, 'Figura $1 · ').replaceAll('-', ' ');
      return `\n${figBody}\n\n*${caption}*\n`;
    },
  );
  return { body: result, broken };
}

const sources = fs.readdirSync(SOURCE_SECTIONS).filter((f) => /^sec-MI12-\d{2}--.+\.md$/.test(f));
let imported = 0;
const errors = [];
let totalInlined = 0;
let totalBroken = 0;

for (const file of sources) {
  const m = file.match(/^sec-MI12-(\d{2})--/);
  if (!m) continue;
  const mid = `m${m[1]}`;
  const destFile = path.join(DEST, `${mid}.mdx`);

  if (!fs.existsSync(destFile)) {
    errors.push(`${mid}: dest .mdx no existe`);
    continue;
  }

  const sourceRaw = fs.readFileSync(path.join(SOURCE_SECTIONS, file), 'utf-8');
  const destRaw = fs.readFileSync(destFile, 'utf-8');

  const { body: sourceBody } = splitFrontmatter(sourceRaw);
  let { frontmatterBlock: destFm } = splitFrontmatter(destRaw);

  // Bump status: red|yellow → green
  destFm = destFm.replace(/^status:\s*\w+/m, 'status: green');

  // 1) Limpiar wikilinks relativos al glosario/sources del libro
  let cleanedBody = sourceBody
    .replaceAll(/!\[\[\.{2}\/[^/\]]+\/([^\]]+?)\]\]/g, '![[$1]]')
    .replaceAll(/\[\[\.{2}\/[^/\]]+\/([^|\]]+?)(\|[^\]]+)?\]\]/g, '[[$1$2]]');

  // 1b) Migrar prefijo legacy glo-* → con-* (vault sigue usando glo- en algunos M##)
  cleanedBody = cleanedBody
    .replaceAll(/(!?\[\[)glo-([a-z0-9-]+)/g, '$1con-$2');

  // 1c) Markdown links a archivos del vault → URLs portal o eliminar
  //   [text](../00-glosoario-universal/con-X.md) → [text](/glosario/con-X/)
  //   [text](../00-glosoario-universal/_README.md) → [text](/glosario/) (índice)
  //   [text](../X-folder/_anything.md) → solo el text (sin link, evita 404)
  cleanedBody = cleanedBody
    .replaceAll(
      /\[([^\]]+)\]\(\.{2}\/00-glosoario-universal\/(con-[a-z0-9-]+)(?:\.md)?\)/g,
      '[$1](/glosario/$2/)',
    )
    .replaceAll(
      /\[([^\]]+)\]\(\.{2}\/00-glosoario-universal\/_[^)]*\)/g,
      '[$1](/glosario/)',
    )
    .replaceAll(
      /\[([^\]]+)\]\(\.{2}\/[^)]*\.md\)/g,
      '$1',  // strip link a otros archivos del vault (ej. _audit, sources)
    )
    .replaceAll(
      /\[([^\]]+)\]\(\.{2}\/[^)]*\/?\)/g,
      '$1',  // strip link a directorios del vault (ej. ../99--sources/biblio/)
    )
    .replaceAll(
      /\[([^\]]+)\]\(glo-([a-z0-9-]+)\.md\)/g,
      '[$1](/glosario/con-$2/)',  // legacy [t](glo-X.md) → /glosario/con-X/
    )
    .replaceAll(
      /\[([^\]]+)\]\(con-([a-z0-9-]+)\.md\)/g,
      '[$1](/glosario/con-$2/)',  // [t](con-X.md) → /glosario/con-X/
    )
    .replaceAll(
      /\[([^\]]+)\]\(sec-MI12-(\d{2})[^)]*\.md\)/g,
      (_match, txt, num) => `[${txt}](/canonico/m${num}/)`,  // [t](sec-MI12-NN.md) → /canonico/mNN/
    );

  // 1d) Limpiar paths inline tipo `60-glosario/glo-X.md` (ya sin link wrap)
  //   Reemplaza por su slug equivalente para que sea legible
  cleanedBody = cleanedBody
    .replaceAll(/`60-glosario\/glo-([a-z0-9-]+)\.md`/g, '`con-$1`')
    .replaceAll(/`00-glosoario-universal\/(con-[a-z0-9-]+)\.md`/g, '`$1`');

  // 2) Inline embeds de figuras (Mermaid blocks)
  const inlineResult = inlineFigures(cleanedBody);
  cleanedBody = inlineResult.body;
  const figsInlined = (sourceBody.match(/!\[\[fig-MI12-/g) ?? []).length - inlineResult.broken.length;
  totalInlined += figsInlined;
  totalBroken += inlineResult.broken.length;

  // Normalize all line endings to LF before writing. Otherwise frontmatter
  // (preserved from existing dest) may keep CRLF while body (read from vault)
  // is LF — the mixed endings make git emit CRLF→LF warnings and can confuse
  // the YAML parser at the frontmatter boundary.
  const out = `${destFm}${cleanedBody.startsWith('\n') ? '' : '\n'}${cleanedBody}`.replaceAll('\r\n', '\n');
  fs.writeFileSync(destFile, out, 'utf-8');
  imported++;
  const figMsg = figsInlined > 0
    ? ` · ${figsInlined} fig${figsInlined === 1 ? '' : 's'} inlined${inlineResult.broken.length ? ` (${inlineResult.broken.length} broken)` : ''}`
    : '';
  console.log(`✓ ${mid} ← ${file} (${cleanedBody.length} chars${figMsg})`);
}

console.log(`\nImportadas ${imported}/${sources.length} secciones a ${DEST}`);
console.log(`Figuras inlined: ${totalInlined} · broken: ${totalBroken}`);
if (errors.length) {
  console.log('\nErrores:');
  for (const e of errors) console.log(`  · ${e}`);
}
