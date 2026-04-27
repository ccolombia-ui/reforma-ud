/**
 * remark-rejoin-wikilinks-in-tables · v5.0m
 *
 * Bug clásico Obsidian + GFM tables: el `|` que separa target/alias de un
 * wikilink (`[[target|alias]]`) colisiona con el separador de columnas
 * de tablas GFM. `[[glo-frame-1|Frame 1]]` se parsea como dos celdas
 * distintas (`[[glo-frame-1` y `Frame 1]]`).
 *
 * Este plugin opera DESPUÉS de remark-gfm. Para cada tableRow:
 *   1. Detecta pares de celdas adyacentes con wikilink partido.
 *   2. Las funde en una sola celda.
 *   3. **Construye los AST nodes de wikilink directamente** (en lugar de
 *      delegar a @flowershow/remark-wiki-link), porque a ese plugin le
 *      cuesta procesar text nodes que ya pasaron por GFM table parsing.
 *
 * Los wikilinks generados se renderizan como `<a class="wikilink" href="...">`
 * idéntico al del flowershow plugin, lo que permite que MDXWithHoverPreview
 * los intercepte con WikiLinkPreview client-side igual.
 *
 * Resolver de URLs es local — replica la lógica del urlResolver del
 * velite.config para targets `m##`, `con-*`, `glo-*`, `comunidades/*`.
 */

import type { Plugin } from 'unified';
import type { Root } from 'mdast';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { visit } from 'unist-util-visit';

type AnyNode = { type: string; value?: string; children?: AnyNode[]; data?: Record<string, unknown> };

function nodeText(node: AnyNode): string {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
  if (Array.isArray(node.children)) return node.children.map(nodeText).join('');
  return '';
}

/**
 * Resuelve un wikilink target a URL absoluta. Espejo simplificado del
 * urlResolver de @flowershow/remark-wiki-link configurado en velite.config.
 */
function resolveWikilinkUrl(target: string, heading?: string): string {
  const t = target.trim().toLowerCase();
  let url: string;
  if (/^m\d{2}$/.test(t)) {
    url = `/canonico/${t}`;
  } else if (/^(con|glo)-/.test(t)) {
    url = `/glosario/${t}`;
  } else if (t.startsWith('comunidades/')) {
    url = `/${t}`;
  } else {
    url = `/${t}`;
  }
  return heading ? `${url}#${heading.trim().replace(/^#+/, '')}` : url;
}

/** Parsea texto y emite AST nodes intercalando wikilinks como <a class="wikilink">. */
function textToNodesWithWikilinks(text: string): AnyNode[] {
  const out: AnyNode[] = [];
  // Pattern: [[target(#heading)?(|alias)?]]
  const re = /\[\[([^\[\]|#]+?)(?:#([^\[\]|]+?))?(?:\|([^\[\]]+?))?\]\]/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) {
      out.push({ type: 'text', value: text.slice(lastIdx, m.index) });
    }
    const [, target, heading, alias] = m;
    const display = (alias ?? target).trim();
    const url = resolveWikilinkUrl(target, heading);
    // mdast `link` con hProperties para que rehype añada className='wikilink'
    out.push({
      type: 'link',
      url,
      children: [{ type: 'text', value: display }],
      data: {
        hProperties: { className: 'wikilink' },
      },
    } as AnyNode);
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) {
    out.push({ type: 'text', value: text.slice(lastIdx) });
  }
  return out.length > 0 ? out : [{ type: 'text', value: text }];
}

const remarkRejoinWikilinksInTables: Plugin<[], Root> = () => (tree) => {
  // visit con tipos relajados — el AST que manipulamos es la unión típica
  // de mdast + remark-gfm (tableRow/tableCell que no están en core mdast).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = tree as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visit(t, 'tableRow', (row: any) => {
    if (!Array.isArray(row.children)) return;
    const cells = row.children;
    let i = 0;
    while (i < cells.length - 1) {
      const cur = cells[i];
      const next = cells[i + 1];
      const curTxt = nodeText(cur);
      const nextTxt = nodeText(next);

      const lastOpen = curTxt.lastIndexOf('[[');
      const lastClose = curTxt.lastIndexOf(']]');
      const openAtEnd = lastOpen !== -1 && lastOpen > lastClose;

      const firstClose = nextTxt.indexOf(']]');
      const firstOpen = nextTxt.indexOf('[[');
      const closeAtStart =
        firstClose !== -1 && (firstOpen === -1 || firstClose < firstOpen);

      if (openAtEnd && closeAtStart) {
        // Fusionar texto y emitir AST con wikilinks ya procesados
        const fullText = curTxt + '|' + nextTxt;
        cur.children = textToNodesWithWikilinks(fullText);
        cells.splice(i + 1, 1);
        // No incrementar i — la celda combinada puede seguir teniendo
        // otro wikilink partido más adelante en la misma fila.
      } else {
        i++;
      }
    }
  });

  // Truncar header/align rows al min de cells por row después del merge
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visit(t, 'table', (table: any) => {
    if (!Array.isArray(table.children) || table.children.length === 0) return;
    const counts = (table.children as Array<{ children?: AnyNode[] }>)
      .map((r) => r.children?.length ?? 0)
      .filter((n) => n > 0);
    if (counts.length === 0) return;
    const min = Math.min(...counts);
    for (const row of table.children as Array<{ children?: AnyNode[] }>) {
      if (row.children && row.children.length > min) {
        row.children.length = min;
      }
    }
    if (Array.isArray(table.align) && table.align.length > min) {
      table.align.length = min;
    }
  });
};

export default remarkRejoinWikilinksInTables;
