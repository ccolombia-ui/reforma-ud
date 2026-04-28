#!/usr/bin/env node
/**
 * validate-frontmatter.mjs · v6.5 TDD
 *
 * Pre-build YAML validator. Detecta archivos .md/.mdx en content/ con
 * frontmatter inválido (delimitadores faltantes, indentación corrupta,
 * mappings anidados ilegales, etc.) ANTES de que Velite los excluya
 * silenciosamente del build.
 *
 * Bloquea el build si encuentra problemas (exit 1) y lista exactamente
 * qué archivos están corruptos con la línea/columna del error.
 *
 * Trigger: corre antes de `velite build` en `pnpm build`.
 *
 * Background: durante v6.x descubrimos que 44 archivos del glosario tenían
 * frontmatter con líneas indentadas con 2 espacios que YAML interpretaba
 * como "Nested mappings are not allowed in compact mappings". Velite los
 * excluía silently — solo se dieron a conocer al cambiar el schema y forzar
 * un re-parse en CI. Este validador previene esa categoría de regresiones.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import yaml from 'yaml';

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, 'content');

const ERRORS = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      validateFile(full);
    }
  }
}

function validateFile(path) {
  const rel = relative(ROOT, path).replace(/\\/g, '/');
  let raw;
  try {
    raw = readFileSync(path, 'utf-8');
  } catch (err) {
    ERRORS.push({ path: rel, kind: 'read', message: err.message });
    return;
  }

  // Detectar frontmatter (entre `---\n` y `\n---\n`)
  if (!raw.startsWith('---\n') && !raw.startsWith('---\r\n')) {
    // Sin frontmatter → ok para ciertos archivos (README, etc.)
    return;
  }
  const endIdx = raw.indexOf('\n---\n', 4);
  const endIdxCRLF = raw.indexOf('\r\n---\r\n', 4);
  const idx = endIdx >= 0 ? endIdx : endIdxCRLF;
  if (idx < 0) {
    ERRORS.push({
      path: rel,
      kind: 'unclosed-frontmatter',
      message: 'Frontmatter abierto con `---` pero nunca cerrado',
    });
    return;
  }
  const fm = raw.slice(raw.indexOf('\n') + 1, idx);

  // Parse YAML estricto
  try {
    const parsed = yaml.parse(fm);
    if (parsed === null || typeof parsed !== 'object') {
      ERRORS.push({
        path: rel,
        kind: 'empty-frontmatter',
        message: 'Frontmatter no produjo un objeto (¿solo whitespace?)',
      });
    }
  } catch (err) {
    // yaml.parse lanza errors con línea/col inline en el mensaje
    ERRORS.push({
      path: rel,
      kind: 'yaml-syntax',
      message: err.message.split('\n')[0],
    });
  }

  // Heurística adicional: detectar líneas con 2 espacios + letra al inicio
  // sin parent key inmediatamente arriba (suelen ser bugs de indentación).
  const lines = fm.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^  [a-zA-Z@"]/.test(line)) {
      // Look-back: la línea anterior no-vacía debe terminar en `:` (parent)
      let prev = '';
      for (let j = i - 1; j >= 0; j--) {
        if (lines[j].trim() !== '') { prev = lines[j]; break; }
      }
      // Permitir si la línea previa termina con `:` (parent key) o `:` seguido de comentario.
      // Si la previa NO termina en `:` y no es indentada también, es un orfano.
      const trimmedPrev = prev.replace(/\s+#.*$/, '').trim();
      const prevIsParent = trimmedPrev.endsWith(':');
      const prevIsIndented = /^\s/.test(prev);
      if (!prevIsParent && !prevIsIndented && trimmedPrev !== '') {
        ERRORS.push({
          path: rel,
          kind: 'orphan-indented',
          message: `Línea ${i + 2} tiene 2 espacios de indentación pero la línea previa no abre un mapping (\`${trimmedPrev.slice(0, 50)}\`). Probablemente debe estar al nivel raíz.`,
        });
        // Solo reportar el primero por archivo
        break;
      }
    }
  }
}

walk(CONTENT_DIR);

if (ERRORS.length === 0) {
  console.log(`[validate-frontmatter] ✓ ${0} errores en content/`);
  process.exit(0);
}

console.error(`\n[validate-frontmatter] ✗ ${ERRORS.length} archivo(s) con frontmatter inválido:\n`);
for (const e of ERRORS) {
  console.error(`  ${e.path}`);
  console.error(`    [${e.kind}] ${e.message}\n`);
}
console.error('\nAborta el build. Corrige los archivos arriba y vuelve a intentar.\n');
process.exit(1);
