/**
 * scan-obsidian-vault.mjs — v8g-l5.2
 *
 * Escanea el vault REAL de Obsidian en H:\ y genera vault-tree.json
 * con nombres literales del vault, filtrando solo nombres alfanuméricos.
 */

import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const VAULT = 'H:\\.shortcut-targets-by-id\\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\\daath-zen\\R002-daath-cortex\\20--udfjc-reforma-vinculante';
const OUT = 'content/vault-index/vault-tree.json';

function isAlnumFirst(name) {
  if (!name || name.length === 0) return false;
  return /[a-zA-Z0-9]/.test(name[0]);
}

function isMd(name) {
  return /\.(md|mdx)$/i.test(name);
}

function scan(dir, base = '') {
  const children = [];
  for (const name of readdirSync(dir)) {
    if (!isAlnumFirst(name)) continue;
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    try {
      const s = statSync(full);
      if (s.isDirectory()) {
        const ch = scan(full, rel);
        if (ch.length > 0) {
          children.push({ type: 'folder', id: rel, name, children: ch });
        }
      } else if (isMd(name)) {
        children.push({
          type: 'file',
          id: rel,
          name: name.replace(/\.(md|mdx)$/i, ''),
          href: '/' + rel.replace(/\\/g, '/').replace(/\.(md|mdx)$/i, ''),
        });
      }
    } catch {
      // skip inaccessible
    }
  }
  children.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'folder' ? -1 : 1;
  });
  return children;
}

console.log(`[scan-obsidian] scanning: ${VAULT}`);
const tree = scan(VAULT);
writeFileSync(OUT, JSON.stringify(tree, null, 2));
console.log(`[scan-obsidian] ${tree.length} roots → ${OUT}`);
if (tree.length > 0) {
  tree.forEach((r) => console.log(`  - ${r.name}`));
}
