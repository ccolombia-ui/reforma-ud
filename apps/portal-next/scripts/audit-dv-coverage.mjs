#!/usr/bin/env node
/**
 * audit-dv-coverage.mjs · v8 S7
 * Audita la cobertura del DV transformer sobre el corpus de conceptos.
 *
 * Lee content/glosario/*.md (ya sincronizados) y reporta:
 *   - Sentinels emitidos por patrón (% match rate)
 *   - Bloques obsidian-only (fallback — no reconocidos)
 *   - Conceptos con mayor cantidad de fallbacks
 *
 * Uso: node scripts/audit-dv-coverage.mjs [--json]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GLOSARIO = path.join(__dirname, '..', 'content', 'glosario');
const JSON_OUT = process.argv.includes('--json');

const files = fs.readdirSync(GLOSARIO).filter(f => f.endsWith('.md') && f.startsWith('con-'));

const patternCounts = {};
const fallbackFiles = [];
let totalSentinels = 0;
let totalFallbacks = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(GLOSARIO, file), 'utf-8');
  const matches = [...raw.matchAll(/data-dv="([^"]+)"/g)];
  let fileFallbacks = 0;

  for (const m of matches) {
    const name = m[1];
    patternCounts[name] = (patternCounts[name] ?? 0) + 1;
    totalSentinels++;
    if (name === 'obsidian-only') {
      fileFallbacks++;
      totalFallbacks++;
    }
  }

  if (fileFallbacks > 0) {
    fallbackFiles.push({ file, fallbacks: fileFallbacks, total: matches.length });
  }
}

const matchRate = totalSentinels > 0
  ? (((totalSentinels - totalFallbacks) / totalSentinels) * 100).toFixed(1)
  : '0.0';

const report = {
  totalConcepts: files.length,
  totalSentinels,
  totalFallbacks,
  matchRate: `${matchRate}%`,
  patternCounts: Object.fromEntries(
    Object.entries(patternCounts).sort(([, a], [, b]) => b - a)
  ),
  fallbackFiles: fallbackFiles.sort((a, b) => b.fallbacks - a.fallbacks),
};

if (JSON_OUT) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

console.log('\n──────────────────────────────────────────────────');
console.log('DV Coverage Audit · v8 S7');
console.log('──────────────────────────────────────────────────');
console.log(`Conceptos analizados : ${report.totalConcepts}`);
console.log(`Sentinels totales    : ${report.totalSentinels}`);
console.log(`Fallbacks (obsidian) : ${report.totalFallbacks}`);
console.log(`Match rate           : ${report.matchRate}`);
console.log('\n── Distribución por patrón ──────────────────────');
for (const [name, count] of Object.entries(report.patternCounts)) {
  const bar = '█'.repeat(Math.min(count, 40));
  const pad = name.padEnd(22);
  console.log(`  ${pad} ${String(count).padStart(3)}  ${bar}`);
}
if (report.fallbackFiles.length > 0) {
  console.log('\n── Top conceptos con fallbacks ──────────────────');
  for (const { file, fallbacks, total } of report.fallbackFiles.slice(0, 10)) {
    console.log(`  ${file.padEnd(45)} ${fallbacks}/${total} fallbacks`);
  }
}
console.log('──────────────────────────────────────────────────\n');
