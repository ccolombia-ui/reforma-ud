#!/usr/bin/env node
/**
 * fix-orphan-indented.mjs — limpia líneas indentadas huérfanas en frontmatter YAML
 * de content/glosario/*.md tras un sync.
 *
 * Patrón problemático (regenera sync-glosario.mjs cuando elimina parents tipo
 * `normative_facet:` `metric_facet:` `relation_facet:` y deja hijos sin padre):
 *
 *   pasteur_quadrant: PASTEUR
 *
 *
 *     normative_source: "..."     ← orphan-indented (parent eliminado)
 *     normative_locator: "..."    ← orphan-indented
 *
 * Heurística: si una línea indentada con `  KEY: VALUE` tiene como línea previa
 * (saltando blanks) un campo top-level (no acaba en `:`), la línea es huérfana.
 *
 * Uso: node scripts/fix-orphan-indented.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve('content', 'glosario');
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));

let fixed = 0;
let totalLinesRemoved = 0;

for (const file of files) {
  const fp = path.join(DIR, file);
  const raw = fs.readFileSync(fp, 'utf-8');

  // Solo procesar el bloque de frontmatter (entre los dos ---)
  const m = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)([\s\S]*)$/);
  if (!m) continue;

  const [, fmStart, fmBody, fmEnd, body] = m;
  const lines = fmBody.split('\n');
  const cleaned = [];
  let removed = 0;

  // Stack del último top-level key visto (sin valor) que abre mapping
  // Si la línea es `KEY: VALUE`, no abre mapping (top-level scalar/escalar).
  // Si la línea es `KEY:`, abre mapping (esperamos `  child:` después).
  // Si la línea es `KEY:\n  - item`, abre lista.
  let lastOpensMapping = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const indented = /^( {2,}|\t)\S/.test(line);
    const isBlank = line.trim() === '';

    if (isBlank) {
      cleaned.push(line);
      continue;
    }

    if (indented) {
      // Línea indentada — solo válida si lastOpensMapping=true
      if (!lastOpensMapping) {
        // Huérfana: descartar
        removed++;
        continue;
      }
      // OK, hijo válido
      cleaned.push(line);
      continue;
    }

    // Línea top-level
    cleaned.push(line);

    // ¿Abre mapping? `KEY:` (sin valor a la derecha) o `KEY: |` o `KEY: >`
    const trimmed = line.trim();
    // Detecta: `key:` (nada después), o `key: |` / `key: >` (block scalar), o `key: # comment`
    if (/^[A-Za-z_][\w-]*\s*:\s*(\|[+-]?|>[+-]?)?\s*(#.*)?$/.test(trimmed)) {
      lastOpensMapping = true;
    } else {
      lastOpensMapping = false;
    }
  }

  if (removed > 0) {
    const out = `${fmStart}${cleaned.join('\n')}${fmEnd}${body}`;
    fs.writeFileSync(fp, out, 'utf-8');
    fixed++;
    totalLinesRemoved += removed;
    console.log(`✓ ${file}: ${removed} líneas huérfanas eliminadas`);
  }
}

console.log(`\nArreglados ${fixed} archivos · ${totalLinesRemoved} líneas eliminadas en total`);
