#!/usr/bin/env node
/**
 * sync-glosario.mjs — sincroniza con-*.md del vault Obsidian al portal Next.js
 * v1.0.0 · 2026-04-27 · CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda
 *
 * Flujo:
 *   VAULT: 00-glosoario-universal/1-normativo/, 2-academico-teorico/, ...  (subdirs por categoría)
 *   PORTAL: content/glosario/con-*.md                (FLAT — Velite lo requiere)
 *
 * Qué hace:
 *   1. Escanea recursivamente el glosario del vault
 *   2. Limpia campos incompatibles con el schema Velite (tupla_*, @type, etc.)
 *   3. Escribe cada con-*.md como fichero flat en content/glosario/
 *   4. Limpia wikilinks relativos (../../) a forma corta ([[con-X]])
 *   5. Emite reporte: nuevos / actualizados / sin cambios / ignorados
 *
 * Uso:
 *   node build/sync-glosario.mjs                   # sync completo
 *   node build/sync-glosario.mjs --dry-run          # solo reporte, no escribe
 *   node build/sync-glosario.mjs --filter approved  # solo kd_status: APPROVED
 *   node build/sync-glosario.mjs --filter all        # todos (default: approved)
 *
 * Variables de entorno:
 *   GHS_CHAPTER     ruta al capítulo del libro (contiene 00-glosoario-universal/)
 *   GHS_PORTAL_DEST ruta a content/glosario/ del portal Next.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  splitFrontmatter, parseYamlKeys, cleanFrontmatter, cleanBody,
} from './lib/glosario-transform.mjs';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..');             // _gold-html-static/

// ── Rutas ─────────────────────────────────────────────────────────────────
const CHAPTER = process.env.GHS_CHAPTER
    ? path.resolve(process.env.GHS_CHAPTER)
    : path.resolve(ROOT, '..');                                        // 3-diseño-capitulo-libro/

const VAULT_GLOSARIO = path.join(CHAPTER, '00-glosoario-universal');

const PORTAL_DEST = process.env.GHS_PORTAL_DEST
    ? path.resolve(process.env.GHS_PORTAL_DEST)
    : path.resolve('C:/antigravity/aleia-reforma-ud/apps/portal-next/content/glosario');

// ── Flags CLI ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const filterIdx = args.indexOf('--filter');
const FILTER = filterIdx >= 0 ? args[filterIdx + 1] : 'approved'; // 'approved' | 'all'
// --file <slug>: solo sincroniza ese concepto (e.g. 'con-acu-004-25')
const fileIdx = args.indexOf('--file');
const SINGLE_FILE = fileIdx >= 0 ? args[fileIdx + 1] : null;

// Transformaciones puras viven en ./lib/glosario-transform.mjs (testeable con vitest).
// Si necesitas modificar reglas de limpieza, cambia el módulo, no este archivo.

function collectConceptFiles(dir, acc = []) {
    if (!fs.existsSync(dir)) return acc;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            collectConceptFiles(path.join(dir, entry.name), acc);
        } else if (/^con-[a-z0-9-]+\.md$/i.test(entry.name)) {
            acc.push(path.join(dir, entry.name));
        }
    }
    return acc;
}

// ── Lógica de sync (exportable para tests) ───────────────────────────────

function runSync({ vaultGlosario, portalDest, filter, dryRun, singleFile = null }) {
    const stats = { new: 0, updated: 0, unchanged: 0, ignored: 0, errors: 0 };
    const report = [];

    let conceptFiles = collectConceptFiles(vaultGlosario);
    if (singleFile) {
        const slug = singleFile.endsWith('.md') ? singleFile : singleFile + '.md';
        conceptFiles = conceptFiles.filter(f => path.basename(f) === slug);
        if (conceptFiles.length === 0) {
            return { stats, report: [`[!] No encontrado en vault: ${singleFile}`], total: 0 };
        }
    }
    for (const srcPath of conceptFiles) {
        const slug = path.basename(srcPath, '.md');
        const raw = fs.readFileSync(srcPath, 'utf8');
        const { frontmatterBlock, body } = splitFrontmatter(raw);

        let keys = {};
        try { keys = parseYamlKeys(frontmatterBlock); } catch (e) { /* ignora */ }

        const status = (keys.kd_status || '').toString().toUpperCase();

        if (filter === 'approved' && status !== 'APPROVED' && status !== 'FINAL') {
            stats.ignored++;
            report.push(`⏭ ${slug} (${status || 'sin status'})`);
            continue;
        }

        let cleanedFm;
        try {
            cleanedFm = cleanFrontmatter(frontmatterBlock);
        } catch (e) {
            console.error(`[!] Error limpiando frontmatter de ${slug}: ${e.message}`);
            stats.errors++;
            continue;
        }
        const cleanedBody = cleanBody(body);
        const outContent = `${cleanedFm}\n${cleanedBody.startsWith('\n') ? '' : '\n'}${cleanedBody}`;

        const destPath = path.join(portalDest, slug + '.md');

        if (fs.existsSync(destPath)) {
            const existing = fs.readFileSync(destPath, 'utf8');
            if (existing === outContent) {
                stats.unchanged++;
                report.push(`= ${slug}`);
                continue;
            }
            if (!dryRun) fs.writeFileSync(destPath, outContent, 'utf8');
            stats.updated++;
            report.push(`↑ ${slug} (actualizado)`);
        } else {
            if (!dryRun) fs.writeFileSync(destPath, outContent, 'utf8');
            stats.new++;
            report.push(`+ ${slug} (nuevo)`);
        }
    }

    return { stats, report, total: conceptFiles.length };
}

// ── Main ──────────────────────────────────────────────────────────────────

function main() {
    console.log(`sync-glosario.mjs · vault → portal`);
    console.log(`  VAULT: ${VAULT_GLOSARIO}`);
    console.log(`  DEST : ${PORTAL_DEST}`);
    console.log(`  FILTRO: ${FILTER} · DRY-RUN: ${DRY_RUN}`);
    console.log('');

    if (!fs.existsSync(VAULT_GLOSARIO)) {
        console.error(`[!] Vault glosario no encontrado: ${VAULT_GLOSARIO}`);
        process.exit(1);
    }
    if (!DRY_RUN && !fs.existsSync(PORTAL_DEST)) {
        console.error(`[!] Portal dest no existe: ${PORTAL_DEST}`);
        console.error('    Crea la carpeta o verifica GHS_PORTAL_DEST');
        process.exit(1);
    }

    const { stats, report, total } = runSync({
        vaultGlosario: VAULT_GLOSARIO,
        portalDest: PORTAL_DEST,
        filter: FILTER,
        dryRun: DRY_RUN,
        singleFile: SINGLE_FILE,
    });

    console.log(`Encontrados ${total} con-*.md en vault\n`);
    console.log(report.join('\n'));
    console.log(`
─────────────────────────────────────
Resumen sync-glosario:
  + Nuevos    : ${stats.new}
  ↑ Actualizados: ${stats.updated}
  = Sin cambios: ${stats.unchanged}
  ⏭ Ignorados  : ${stats.ignored}
  ✗ Errores    : ${stats.errors}
─────────────────────────────────────
${DRY_RUN ? '⚠ DRY-RUN: ningún archivo fue escrito' : `✓ Destino: ${PORTAL_DEST}`}
`);
}

// ── CLI guard + exports ───────────────────────────────────────────────────
const _isMain = path.resolve(process.argv[1] ?? '') === path.resolve(fileURLToPath(import.meta.url));
if (_isMain) {
    main();
}

// Re-exports para compat con tests existentes que importan desde sync-glosario.mjs
export {
    splitFrontmatter, parseYamlKeys, cleanFrontmatter, cleanBody,
    STRIP_KEY_PATTERNS,
} from './lib/glosario-transform.mjs';
export {
    collectConceptFiles, runSync,
    VAULT_GLOSARIO, PORTAL_DEST,
};
