import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

/**
 * baseline-snapshots.test.ts · v1.0.0 · 2026-04-28
 *
 * S0 del ROADMAP-v8-dataviewjs-tdd: detección de regresión visual.
 *
 * Cada sprint v8 (S1-S8) debe mantener los checksums de estos conceptos
 * IDÉNTICOS hasta que el sprint S5 (activación de sentinels) explícitamente
 * los modifique para los conceptos con DV blocks. Los conceptos sin DV
 * deben mantenerse idénticos durante TODOS los sprints.
 *
 * Snapshots:
 *   tests/baseline-snapshots/<id>.html
 *   tests/baseline-snapshots/manifest.json
 *
 * Cómo regenerar (solo si la regresión es intencional):
 *   pnpm build && node scripts/capture-baseline-snapshots.mjs
 */

const PORTAL_ROOT = path.resolve(__dirname, '..', '..');
const VELITE_OUT = path.join(PORTAL_ROOT, '.velite', 'concepto.json');
const SNAPSHOT_DIR = path.join(PORTAL_ROOT, 'tests', 'baseline-snapshots');
const MANIFEST_PATH = path.join(SNAPSHOT_DIR, 'manifest.json');

function sha256(s: string): string {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 16);
}

type Snapshot = {
  id: string;
  filename: string;
  bytes: number;
  checksum: string;
  hasDvBlock: boolean;
  hasMetabind: boolean;
};

type Manifest = {
  capturedAt: string;
  totalConcepts: number;
  snapshots: Snapshot[];
};

const hasBaseline = fs.existsSync(MANIFEST_PATH) && fs.existsSync(VELITE_OUT);

describe.skipIf(!hasBaseline)('baseline snapshots · v8 regression guard', () => {
  const manifest: Manifest = hasBaseline
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    : { capturedAt: '', totalConcepts: 0, snapshots: [] };

  const concepts: Array<{ id: string; body: string }> = hasBaseline
    ? JSON.parse(fs.readFileSync(VELITE_OUT, 'utf8'))
    : [];
  const byId = new Map(concepts.map(c => [c.id, c]));

  it('manifest existe y tiene snapshots', () => {
    expect(manifest.snapshots.length).toBeGreaterThan(0);
  });

  // Un test por snapshot — failure aislado por concepto.
  for (const snap of manifest.snapshots) {
    describe(snap.id, () => {
      it('existe en velite output', () => {
        expect(byId.has(snap.id)).toBe(true);
      });

      it('mantiene checksum baseline', () => {
        const c = byId.get(snap.id);
        if (!c) return;
        const currentChecksum = sha256(c.body);
        expect(currentChecksum, `Body de ${snap.id} cambió. Si es intencional (sprint S5+), regenera baseline.`)
          .toBe(snap.checksum);
      });

      it('mantiene tamaño esperado (±0 bytes)', () => {
        const c = byId.get(snap.id);
        if (!c) return;
        expect(c.body.length).toBe(snap.bytes);
      });
    });
  }
});
