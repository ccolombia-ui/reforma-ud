#!/usr/bin/env node
/**
 * sync-vault.mjs — orquestador único vault → portal.
 * v1.1.0 · 2026-04-28
 *
 * Ejecuta en orden los 3 pasos del sync vault Obsidian → portal Next.js:
 *   [1] import-book-sections.mjs    · papers M01-M12 (vault 01-secciones/ → content/canonico/)
 *   [2] sync-glosario.mjs           · 159+ conceptos (vault 00-glosoario/T1-T7/ → content/glosario/)
 *                                     Corre desde scripts/ — sin deps externas, solo Node built-ins
 *   [3] fix-orphan-indented.mjs     · workaround YAML huérfanos del paso [2]
 *
 * Prerequisites:
 *   - Vault accesible en H:\... (Google Drive Stream)
 *   - No se necesita c:/tmp/ ni nada fuera de este repo
 *
 * Flags:
 *   --dry-run         · no escribe archivos (sólo reporte de paso [2])
 *   --skip-papers     · salta paso [1]
 *   --skip-glosario   · salta paso [2]
 *   --skip-fix        · salta paso [3]
 *   --filter approved · default; o `all` para incluir DRAFT en glosario
 *
 * Uso:
 *   pnpm sync:vault            # full sync write-mode
 *   pnpm sync:vault:dry        # dry-run (solo reporte glosario)
 *   node scripts/sync-vault.mjs --skip-papers
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORTAL_ROOT = path.resolve(__dirname, '..');                 // apps/portal-next/
const SCRIPTS_DIR = __dirname;                                      // apps/portal-next/scripts/
const VAULT_CHAPTER = 'H:\\.shortcut-targets-by-id\\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\\daath-zen\\R002-daath-cortex\\20--udfjc-reforma-vinculante\\3-diseño-capitulo-libro';
const PORTAL_GLOSARIO = path.join(PORTAL_ROOT, 'content', 'glosario');

// ── flags ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SKIP_PAPERS = args.includes('--skip-papers');
const SKIP_GLOSARIO = args.includes('--skip-glosario');
const SKIP_FIX = args.includes('--skip-fix');
const filterIdx = args.indexOf('--filter');
const FILTER = filterIdx >= 0 ? args[filterIdx + 1] : 'approved';

// ── helpers ───────────────────────────────────────────────────────────────
function step(n, label) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  STEP ${n}/3 · ${label}`);
  console.log(`${'═'.repeat(70)}`);
}

function ok(msg) { console.log(`  ✓ ${msg}`); }
function warn(msg) { console.log(`  ⚠ ${msg}`); }
function fail(msg) { console.log(`  ✗ ${msg}`); }

function checkPrerequisites() {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  PREREQUISITES CHECK`);
  console.log(`${'═'.repeat(70)}`);

  const checks = [
    {
      label: `Vault path accesible: ${VAULT_CHAPTER.slice(0, 50)}…`,
      pass: fs.existsSync(VAULT_CHAPTER),
      hint: 'Google Drive Stream debe estar montado y sincronizado',
    },
    {
      label: `Source secciones: 01-secciones/`,
      pass: fs.existsSync(path.join(VAULT_CHAPTER, '01-secciones')),
      hint: 'Verifica vault structure',
    },
    {
      label: `Source glosario: 00-glosoario-universal/`,
      pass: fs.existsSync(path.join(VAULT_CHAPTER, '00-glosoario-universal')),
      hint: 'Verifica vault structure',
    },
    {
      label: `Script sync-glosario: scripts/sync-glosario.mjs`,
      pass: fs.existsSync(path.join(SCRIPTS_DIR, 'sync-glosario.mjs')),
      hint: 'Archivo faltante en el repo — git status',
    },
    {
      label: `Portal dest: ${path.relative(process.cwd(), PORTAL_GLOSARIO)}/`,
      pass: fs.existsSync(PORTAL_GLOSARIO),
      hint: 'Repo del portal corrupto?',
    },
  ];

  let allOk = true;
  for (const c of checks) {
    if (c.pass) ok(c.label);
    else { fail(`${c.label}\n      → ${c.hint}`); allOk = false; }
  }

  if (!allOk) {
    console.log(`\n  Aborta. Resuelve los errores arriba y reintenta.\n`);
    process.exit(1);
  }
}

function runStep(label, command, options = {}) {
  console.log(`\n  $ ${command}\n`);
  const result = spawnSync(command, {
    shell: true,
    stdio: 'inherit',
    cwd: options.cwd ?? PORTAL_ROOT,
    env: { ...process.env, ...(options.env ?? {}) },
  });
  if (result.status !== 0) {
    fail(`${label} falló (exit ${result.status})`);
    process.exit(1);
  }
  ok(`${label} completado`);
}

// ── main ──────────────────────────────────────────────────────────────────
console.log(`\n  reforma·ud · sync vault → portal · v1.1.0`);
console.log(`  Modo: ${DRY_RUN ? 'DRY-RUN (no escribe paso [2])' : 'WRITE'} · Filter: ${FILTER}`);

checkPrerequisites();

// STEP [1] — import-book-sections.mjs
if (!SKIP_PAPERS) {
  step(1, 'Import papers M01-M12 (import-book-sections.mjs)');
  runStep('papers import', 'node scripts/import-book-sections.mjs');
} else {
  console.log(`\n  STEP 1/3 · Papers · SKIPPED (--skip-papers)`);
}

// STEP [2] — sync-glosario.mjs (corre desde scripts/ — sin deps externas)
if (!SKIP_GLOSARIO) {
  step(2, `Sync glosario (sync-glosario.mjs · filter=${FILTER}${DRY_RUN ? ' · DRY-RUN' : ''})`);
  const glosArgs = [
    'scripts/sync-glosario.mjs',
    DRY_RUN ? '--dry-run' : '',
    '--filter', FILTER,
  ].filter(Boolean).join(' ');
  runStep('glosario sync', `node ${glosArgs}`, {
    env: {
      GHS_CHAPTER: VAULT_CHAPTER,
      GHS_PORTAL_DEST: PORTAL_GLOSARIO,
    },
  });
} else {
  console.log(`\n  STEP 2/3 · Glosario · SKIPPED (--skip-glosario)`);
}

// STEP [3] — fix-orphan-indented.mjs (post-fix workaround)
if (!SKIP_FIX && !DRY_RUN) {
  step(3, 'Fix orphan-indented YAML (workaround sync-glosario bug)');
  runStep('fix orphan-indented', 'node scripts/fix-orphan-indented.mjs');
} else {
  console.log(`\n  STEP 3/3 · Fix orphan · SKIPPED (${DRY_RUN ? 'dry-run' : '--skip-fix'})`);
}

// ── summary ───────────────────────────────────────────────────────────────
console.log(`\n${'═'.repeat(70)}`);
console.log(`  ✅  SYNC VAULT → PORTAL COMPLETO`);
console.log(`${'═'.repeat(70)}`);
console.log(`\n  Próximos pasos:`);
console.log(`    pnpm run build              # validar que compila`);
console.log(`    pnpm test:smoke             # smoke E2E vs portal deployed`);
console.log(`    git add content/ && git commit -m "chore(content): sync vault $(date +%Y-%m-%d)"`);
console.log(`    git push origin main         # Vercel deploy auto en ~60s\n`);
