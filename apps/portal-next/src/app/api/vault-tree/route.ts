/**
 * API Route — v8g-l5.2
 * Sirve el vault-tree.json generado por scan-obsidian-vault.mjs.
 * En producción se puede servir directamente desde public/.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const dynamic = 'force-static';

export async function GET() {
  const path = join(process.cwd(), 'content', 'vault-index', 'vault-tree.json');
  const data = readFileSync(path, 'utf-8');
  return new Response(data, {
    headers: { 'Content-Type': 'application/json' },
  });
}
