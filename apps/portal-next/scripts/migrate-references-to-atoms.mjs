#!/usr/bin/env node
/**
 * migrate-references-to-atoms.mjs · v5.0f Gap A
 *
 * Convierte src/lib/references.json (36 entradas) en átomos .md atómicos
 * en content/biblio/<bibtex_key>.md con frontmatter completo per
 * AUDIT-arquitectura-citas-bibliografia.md v3.0.
 *
 * Modelo del átomo bibliográfico:
 *   ---
 *   bibtex_key: beer1979heart
 *   biblio_type: book
 *   authors: ["Beer, Stafford"]
 *   year: 1979
 *   title: "The Heart of Enterprise"
 *   publisher: "Wiley"
 *   url: ...
 *   doi: ...
 *   tupla_tipo: BIBLIO_REF
 *   ---
 *
 *   ## Beer (1979) — The Heart of Enterprise
 *
 *   <descripción auto-generada con autores + año + título + journal/publisher>
 *
 *   ### Citado en
 *   - (auto-actualizado por compile-biblio en futuras iteraciones)
 *
 * Ejecutar UNA SOLA VEZ. Idempotente: si el átomo ya existe lo sobreescribe
 * con frontmatter actualizado (preserva body custom si difiere del template).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REFS_JSON = join(__dirname, '..', 'src', 'lib', 'references.json');
const BIBLIO_DIR = join(__dirname, '..', 'content', 'biblio');

function inferBiblioType(entry) {
  if (entry.journal) return 'article';
  if (entry.publisher && /press|publisher|wiley|springer|sage|harvard|oxford|cambridge/i.test(entry.publisher)) return 'book';
  if (entry.publisher) return 'techreport';
  if (entry.url && entry.url.includes('doi.org')) return 'article';
  return 'misc';
}

function authorListFromString(authorStr) {
  // "Christensen, C. et al." → ["Christensen, C. et al."]
  // "Kaplan, R. & Norton, D." → ["Kaplan, R.", "Norton, D."]
  // "Beer, S." → ["Beer, S."]
  // "ABET" → ["ABET"]  (organizational author)
  if (authorStr.includes(' et al.')) return [authorStr];
  if (authorStr.includes(' & ')) {
    return authorStr.split(' & ').map((s) => s.trim());
  }
  return [authorStr.trim()];
}

function shortLabel(authorStr, year) {
  if (authorStr.includes(' et al.')) {
    const first = authorStr.split(' et al.')[0].split(',')[0].trim();
    return `${first} et al. (${year})`;
  }
  const first = authorStr.split(/\s*&\s*|\s+y\s+/)[0];
  const lastName = first.split(',')[0].trim();
  return `${lastName} (${year})`;
}

function frontmatterYaml(entry, bibtexKey) {
  const biblioType = inferBiblioType(entry);
  const authors = authorListFromString(entry.author);
  const lines = [
    '---',
    `bibtex_key: ${bibtexKey}`,
    `biblio_type: ${biblioType}`,
    `authors:`,
    ...authors.map((a) => `  - ${JSON.stringify(a)}`),
    `year: ${entry.year}`,
    `title: ${JSON.stringify(entry.title ?? 'TODO')}`,
  ];
  if (entry.journal) lines.push(`journal: ${JSON.stringify(entry.journal)}`);
  if (entry.publisher) lines.push(`publisher: ${JSON.stringify(entry.publisher)}`);
  if (entry.url) lines.push(`url: ${JSON.stringify(entry.url)}`);
  if (entry.doi) lines.push(`doi: ${JSON.stringify(entry.doi)}`);
  lines.push('tupla_tipo: BIBLIO_REF');
  lines.push('tags:');
  lines.push('  - biblio');
  lines.push('  - reforma-ud');
  lines.push('---');
  return lines.join('\n');
}

function bodyMd(entry, bibtexKey) {
  const label = shortLabel(entry.author, entry.year);
  const venue = entry.journal ?? entry.publisher ?? 'Fuente sin especificar';
  const lines = [
    '',
    `# ${label} — ${entry.title}`,
    '',
    `> [!cite] APA`,
    `> ${entry.author} (${entry.year}). *${entry.title}*. ${venue}.`,
    `> ${entry.doi ? `DOI: ${entry.doi}` : ''}${entry.url ? ` · [Abrir fuente](${entry.url})` : ''}`,
    '',
    '## Resumen',
    '',
    `_(TODO — describir el aporte central de **${entry.title}** en 1-2 párrafos)_`,
    '',
    '## Citado en',
    '',
    '_Auto-actualizado por `compile-biblio` (futuro). Por ahora vacío._',
    '',
    '## Notas de uso',
    '',
    '_(TODO — cómo se usa esta cita en el corpus reforma·ud)_',
    '',
  ];
  return lines.join('\n');
}

function processEntry(bibtexKey, entry) {
  const path = join(BIBLIO_DIR, `${bibtexKey}.md`);
  const fm = frontmatterYaml(entry, bibtexKey);
  const body = bodyMd(entry, bibtexKey);
  const content = `${fm}\n${body}`;
  writeFileSync(path, content, 'utf8');
  return path;
}

function main() {
  if (!existsSync(BIBLIO_DIR)) mkdirSync(BIBLIO_DIR, { recursive: true });

  const raw = readFileSync(REFS_JSON, 'utf8');
  const refs = JSON.parse(raw);
  delete refs._meta;

  const keys = Object.keys(refs);
  console.log(`[migrate-references] ${keys.length} entradas a procesar`);

  let n = 0;
  for (const k of keys) {
    const entry = refs[k];
    if (!entry || typeof entry !== 'object') continue;
    if (!entry.author || !entry.year) {
      console.warn(`  skip ${k}: faltan author/year`);
      continue;
    }
    const path = processEntry(k, entry);
    n++;
    console.log(`  ${path.split(/[\\/]/).pop()} · ${entry.author} (${entry.year})`);
  }

  // Sanity: contar archivos finales
  const finalCount = readdirSync(BIBLIO_DIR).filter((f) => f.endsWith('.md')).length;
  console.log(`[migrate-references] DONE · ${n} átomos creados · total en biblio/: ${finalCount}`);
}

main();
