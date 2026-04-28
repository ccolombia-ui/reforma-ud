/**
 * test-sync-vault.mjs · TDD del orquestador sync-vault.mjs
 * v1.0.0 · 2026-04-28
 *
 * Tests (node:test runtime, sin dependencias):
 *   [1] Prerequisites: vault path + ghs-src + node_modules + portal dest
 *   [2] Dry-run no escribe archivos en content/glosario/
 *   [3] Counts esperados post-sync: ≥12 papers + ≥150 conceptos
 *   [4] Frontmatter válido en content/glosario/ (sin YAML errors)
 *   [5] Frontmatter válido en content/canonico/ (sin YAML errors)
 *   [6] M01-M12 todos presentes (no falta ninguno)
 *
 * Uso: node --test scripts/test-sync-vault.mjs
 *      pnpm test:sync-vault
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORTAL_ROOT = path.resolve(__dirname, '..');
const GHS_SRC = 'c:/tmp/ghs-src';
const VAULT_CHAPTER = 'H:\\.shortcut-targets-by-id\\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\\daath-zen\\R002-daath-cortex\\20--udfjc-reforma-vinculante\\3-diseño-capitulo-libro';
const CANONICO = path.join(PORTAL_ROOT, 'content', 'canonico');
const GLOSARIO = path.join(PORTAL_ROOT, 'content', 'glosario');

// ══════════════════════════════════════════════════════════════════════════
// [1] PREREQUISITES
// ══════════════════════════════════════════════════════════════════════════
describe('[1] Prerequisites', () => {
  test('vault path accesible (Google Drive Stream montado)', () => {
    assert.ok(
      fs.existsSync(VAULT_CHAPTER),
      `Vault no accesible: ${VAULT_CHAPTER}\nVerifica Google Drive Stream`,
    );
  });

  test('vault tiene 01-secciones/', () => {
    assert.ok(fs.existsSync(path.join(VAULT_CHAPTER, '01-secciones')));
  });

  test('vault tiene 00-glosoario-universal/', () => {
    assert.ok(fs.existsSync(path.join(VAULT_CHAPTER, '00-glosoario-universal')));
  });

  test('host sync-glosario c:/tmp/ghs-src/ existe', () => {
    assert.ok(
      fs.existsSync(GHS_SRC),
      `Host no setup. Ver _gold-html-static/_meta/_README.md §"Setup único"`,
    );
  });

  test('node_modules instalados en ghs-src', () => {
    assert.ok(
      fs.existsSync(path.join(GHS_SRC, 'node_modules')),
      `Ejecuta: cd ${GHS_SRC} && npm install`,
    );
  });

  test('sync-glosario.mjs existe en ghs-src', () => {
    assert.ok(fs.existsSync(path.join(GHS_SRC, 'sync-glosario.mjs')));
  });

  test('portal scripts existen', () => {
    for (const f of ['sync-vault.mjs', 'import-book-sections.mjs', 'fix-orphan-indented.mjs', 'validate-frontmatter.mjs']) {
      assert.ok(fs.existsSync(path.join(__dirname, f)), `Falta: scripts/${f}`);
    }
  });

  test('portal content dirs existen', () => {
    assert.ok(fs.existsSync(CANONICO));
    assert.ok(fs.existsSync(GLOSARIO));
  });
});

// ══════════════════════════════════════════════════════════════════════════
// [2] DRY-RUN no escribe
// ══════════════════════════════════════════════════════════════════════════
describe('[2] sync-vault --dry-run no muta el filesystem', () => {
  test('dry-run reporta paso 2 sin escribir + termina exit 0', { timeout: 90_000 }, () => {
    // Snapshot count + mtime de un archivo para verificar no-escritura
    const samplePath = path.join(GLOSARIO, 'con-acu-004-25.md');
    const exists = fs.existsSync(samplePath);
    const before = exists ? fs.statSync(samplePath).mtimeMs : 0;

    const result = spawnSync('node', ['scripts/sync-vault.mjs', '--dry-run', '--skip-papers', '--skip-fix'], {
      cwd: PORTAL_ROOT,
      encoding: 'utf8',
      timeout: 80_000,
    });

    assert.equal(result.status, 0, `Exit non-zero: ${result.stderr}`);
    assert.ok(result.stdout.includes('DRY-RUN'), 'Output no menciona DRY-RUN');
    assert.ok(/Encontrados \d+/.test(result.stdout), 'Output no reporta scan de glosario');

    if (exists) {
      const after = fs.statSync(samplePath).mtimeMs;
      assert.equal(before, after, 'mtime cambió en dry-run (¡hubo escritura!)');
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════
// [3] COUNTS post-sync (estado actual del portal)
// ══════════════════════════════════════════════════════════════════════════
describe('[3] Counts esperados', () => {
  test('canonico tiene ≥ 12 m##.mdx', () => {
    const files = fs.readdirSync(CANONICO).filter((f) => /^m\d{2}\.mdx$/.test(f));
    assert.ok(files.length >= 12, `Solo ${files.length} papers`);
  });

  test('M01-M12 todos presentes (no falta ninguno)', () => {
    for (let i = 1; i <= 12; i++) {
      const id = `m${String(i).padStart(2, '0')}`;
      assert.ok(
        fs.existsSync(path.join(CANONICO, `${id}.mdx`)),
        `Falta: ${id}.mdx`,
      );
    }
  });

  test('glosario tiene ≥ 150 con-*.md', () => {
    const files = fs.readdirSync(GLOSARIO).filter((f) => /^con-.+\.md$/.test(f));
    assert.ok(files.length >= 150, `Solo ${files.length} conceptos`);
  });
});

// ══════════════════════════════════════════════════════════════════════════
// [4] Frontmatter válido (validate-frontmatter no encuentra errores)
// ══════════════════════════════════════════════════════════════════════════
describe('[4] Frontmatter post-sync válido', () => {
  test('validate-frontmatter.mjs corre sin errores YAML', { timeout: 30_000 }, () => {
    const result = spawnSync('node', ['scripts/validate-frontmatter.mjs'], {
      cwd: PORTAL_ROOT,
      encoding: 'utf8',
      timeout: 25_000,
    });
    assert.equal(
      result.status, 0,
      `Validate frontmatter falló (exit ${result.status}):\n${result.stdout}\n${result.stderr}`,
    );
    assert.ok(
      result.stdout.includes('✓') || result.stdout.includes('0 errores'),
      'Output no confirma 0 errores',
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// [5] Frontmatter por archivo (spot check sin YAML libs)
// ══════════════════════════════════════════════════════════════════════════
describe('[5] Frontmatter spot check', () => {
  // Helper: normaliza CRLF→LF antes de parsear (algunos archivos vienen con \r\n)
  function readAndSplit(filepath) {
    const raw = fs.readFileSync(filepath, 'utf-8').replaceAll('\r\n', '\n');
    if (!raw.startsWith('---\n')) return { fmBlock: '', fmBody: '', body: raw };
    const fmEnd = raw.indexOf('\n---\n', 4);
    if (fmEnd <= 0) return { fmBlock: '', fmBody: '', body: raw };
    return { fmBlock: raw.slice(0, fmEnd + 5), fmBody: raw.slice(4, fmEnd), body: raw.slice(fmEnd + 5) };
  }

  test('todos los m##.mdx tienen frontmatter --- ... ---', () => {
    const files = fs.readdirSync(CANONICO).filter((f) => /^m\d{2}\.mdx$/.test(f));
    for (const f of files) {
      const { fmBody } = readAndSplit(path.join(CANONICO, f));
      assert.ok(fmBody.length > 0, `${f}: frontmatter no cierra o vacío`);
    }
  });

  test('todos los con-*.md tienen kd_id en frontmatter', () => {
    const files = fs.readdirSync(GLOSARIO).filter((f) => /^con-.+\.md$/.test(f));
    let missing = 0;
    const missingFiles = [];
    for (const f of files) {
      const { fmBody } = readAndSplit(path.join(GLOSARIO, f));
      if (!/^kd_id:/m.test(fmBody)) { missing++; missingFiles.push(f); }
    }
    assert.equal(missing, 0, `${missing} conceptos sin kd_id: ${missingFiles.slice(0, 3).join(', ')}`);
  });

  test('ninguna línea YAML huérfana en glosario (post fix-orphan-indented)', () => {
    const files = fs.readdirSync(GLOSARIO).filter((f) => /^con-.+\.md$/.test(f));
    let orphans = 0;
    const orphanFiles = [];
    for (const f of files) {
      const { fmBody } = readAndSplit(path.join(GLOSARIO, f));
      if (!fmBody) continue;
      const lines = fmBody.split('\n');
      let lastOpensMapping = false;
      for (const line of lines) {
        if (line.trim() === '') continue;
        const indented = /^( {2,}|\t)\S/.test(line);
        if (indented && !lastOpensMapping) { orphans++; orphanFiles.push(f); break; }
        if (!indented) {
          lastOpensMapping = /^[A-Za-z_][\w-]*\s*:\s*(\|[+-]?|>[+-]?)?\s*(#.*)?$/.test(line.trim());
        }
      }
    }
    assert.equal(orphans, 0, `${orphans} archivos con líneas huérfanas: ${orphanFiles.slice(0, 5).join(', ')}`);
  });
});
