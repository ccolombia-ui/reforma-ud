/**
 * sync-vault-to-github.mjs — Opción A
 *
 * Sincroniza los archivos .md/.mdx del vault local (H:\) al branch
 * vault-content del repo en GitHub.
 *
 * Uso:
 *   node scripts/sync-vault-to-github.mjs
 *
 * Requisitos:
 *   - Git en PATH
 *   - Acceso de escritura al repo https://github.com/ccolombia-ui/reforma-ud.git
 */

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// ─── CONFIGURACIÓN ─────────────────────────────────────────
const VAULT_SOURCE =
  'H:\\.shortcut-targets-by-id\\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\\daath-zen\\R002-daath-cortex\\20--udfjc-reforma-vinculante';
const REPO_URL = 'https://github.com/ccolombia-ui/reforma-ud.git';
const BRANCH = 'vault-content';
const WORK_DIR = join(tmpdir(), 'reforma-ud-vault-sync');
// ───────────────────────────────────────────────────────────

function run(cmd, cwd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

function robocopySafe(src, dest) {
  // /MIR = espejo (elimina en destino lo que no está en fuente)
  // /XF = excluir archivos por patrón
  // /XD = excluir directorios
  const cmd = [
    'robocopy',
    `"${src}"`,
    `"${dest}"`,
    '/MIR',
    '/XF',
    '*.canvas',
    '*.png',
    '*.jpg',
    '*.jpeg',
    '*.gif',
    '*.mp4',
    '*.pdf',
    '*.zip',
    '*.exe',
    '/XD',
    '.obsidian',
    '.git',
    '.trash',
  ].join(' ');
  console.log(`> ${cmd}`);
  // robocopy usa códigos de salida 0-7 como éxito
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    if (e.status > 7) throw e;
  }
}

function main() {
  console.log(`[vault-sync] Source : ${VAULT_SOURCE}`);
  console.log(`[vault-sync] Branch : ${BRANCH}`);
  console.log(`[vault-sync] WorkDir: ${WORK_DIR}`);

  // 1. Limpiar/crear directorio de trabajo
  if (existsSync(WORK_DIR)) {
    rmSync(WORK_DIR, { recursive: true });
  }
  mkdirSync(WORK_DIR, { recursive: true });

  // 2. Clonar SOLO el branch vault-content
  run(
    `git clone --single-branch --branch ${BRANCH} ${REPO_URL} .`,
    WORK_DIR
  );

  // 3. Copiar contenido (mirror, excluyendo assets y carpetas de sistema)
  robocopySafe(VAULT_SOURCE, WORK_DIR);

  // 4. Stage, commit y push
  run('git add -A', WORK_DIR);

  // Solo commitear si hay cambios
  const status = execSync('git status --short', { cwd: WORK_DIR, encoding: 'utf-8' });
  if (!status.trim()) {
    console.log('[vault-sync] Sin cambios. Nada que commitear.');
    return;
  }

  const now = new Date().toISOString();
  run(`git commit -m "sync(vault): ${now}"`, WORK_DIR);
  run(`git push origin ${BRANCH}`, WORK_DIR);

  console.log('[vault-sync] ✅ Sincronización completa.');
}

main();
