/**
 * API Route — v8g-l5.2 (con soporte para Google Drive proxy)
 *
 * Sirve el vault-tree.json. En producción puede leer de dos fuentes:
 *   1. Archivo local generado por scan-obsidian-vault.mjs (default).
 *   2. Google Apps Script proxy si NEXT_PUBLIC_VAULT_PROXY_URL está definido.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const dynamic = 'force-static';

export async function GET() {
  const proxyUrl = process.env.NEXT_PUBLIC_VAULT_PROXY_URL;

  // Si hay proxy configurado, leer árbol desde Google Drive
  if (proxyUrl) {
    try {
      const url = new URL(proxyUrl);
      url.searchParams.set('mode', 'tree');
      url.searchParams.set('rootFilter', '100--csu');
      const res = await fetch(url.toString(), { next: { revalidate: 60 } });
      if (res.ok) {
        const data = await res.json();
        if (data.ok && Array.isArray(data.tree)) {
          return new Response(JSON.stringify(data.tree), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
    } catch {
      // fallback al archivo local
    }
  }

  // Fallback: archivo local generado por scan-obsidian-vault.mjs
  const path = join(process.cwd(), 'content', 'vault-index', 'vault-tree.json');
  const data = readFileSync(path, 'utf-8');
  return new Response(data, {
    headers: { 'Content-Type': 'application/json' },
  });
}
