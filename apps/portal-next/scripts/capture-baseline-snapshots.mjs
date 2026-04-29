#!/usr/bin/env node
/**
 * capture-baseline-snapshots.mjs
 * v1.0.0 · 2026-04-28 · S0 del ROADMAP-v8-dataviewjs-tdd
 *
 * Captura snapshots del HTML compilado por velite para conceptos representativos.
 * Sirve como baseline para detectar regresiones en sprints siguientes.
 *
 * Uso: node scripts/capture-baseline-snapshots.mjs
 *      pnpm baseline:capture (alias)
 *
 * Output:
 *   tests/baseline-snapshots/<concepto-id>.html  ← cuerpo HTML compilado
 *   tests/baseline-snapshots/manifest.json       ← lista + checksums SHA-256
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const VELITE_OUT = path.join(ROOT, '.velite', 'concepto.json');
const SNAPSHOT_DIR = path.join(ROOT, 'tests', 'baseline-snapshots');

// Conceptos representativos elegidos para baseline:
//   - con-acu-004-25:  rico en DV blocks (13 bloques, mayor complejidad TPL v2.0)
//   - con-cca:         concepto sin DV (control)
//   - con-iso-21001:   concepto académico estándar
//   - con-mipg-funcion-publica: concepto normativo simple
//   - con-decreto-1421-2017: con DV blocks (control normativo)
const REPRESENTATIVE = [
  'con-acu-004-25',
  'con-cca',
  'con-iso-21001',
  'con-mipg-funcion-publica',
  'con-decreto-1421-2017',
];

function sha256(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 16);
}

function main() {
  if (!fs.existsSync(VELITE_OUT)) {
    console.error(`[!] ${VELITE_OUT} no existe. Ejecuta primero: pnpm build`);
    process.exit(1);
  }

  const conceptos = JSON.parse(fs.readFileSync(VELITE_OUT, 'utf8'));
  const byId = new Map(conceptos.map(c => [c.id, c]));

  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });

  const manifest = {
    capturedAt: new Date().toISOString(),
    totalConcepts: conceptos.length,
    snapshots: [],
  };

  for (const id of REPRESENTATIVE) {
    const c = byId.get(id);
    if (!c) {
      console.warn(`[!] No encontrado en velite output: ${id} — saltado`);
      continue;
    }
    const filename = `${id}.html`;
    const outPath = path.join(SNAPSHOT_DIR, filename);
    fs.writeFileSync(outPath, c.body, 'utf8');

    const checksum = sha256(c.body);
    manifest.snapshots.push({
      id,
      filename,
      bytes: c.body.length,
      checksum,
      kd_status: c.kd_status ?? null,
      kd_version: c.kd_version ?? null,
      hasDvBlock: /```dataview(?:js)?\b/.test(c.body) === false ? false : true, // velite ya stripea — debería ser false
      hasMetabind: /INPUT\[/.test(c.body),
    });
    console.log(`✓ ${id}  ${c.body.length} bytes  ${checksum}`);
  }

  fs.writeFileSync(
    path.join(SNAPSHOT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  console.log(`\nBaseline capturado en: ${SNAPSHOT_DIR}`);
  console.log(`Total conceptos en velite: ${conceptos.length}`);
  console.log(`Snapshots guardados:       ${manifest.snapshots.length}/${REPRESENTATIVE.length}`);
}

main();
