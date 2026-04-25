import type { Plugin } from 'unified';
import type { Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Mini plugin remark para wikilinks Obsidian-native:
 *   [[m05]]                → <a class="wikilink" href="/canonico/m05">m05</a>
 *   [[m05|Escuela]]        → <a class="wikilink" href="/canonico/m05">Escuela</a>
 *   [[m05#seccion-3]]      → <a class="wikilink" href="/canonico/m05#seccion-3">m05</a>
 *   [[nota-en-comunidad]]  → <a class="wikilink" href="/comunidades/.../nota-en-comunidad">nota</a>
 *
 * Convencion de resolucion (MVP):
 *  - Si el target empieza con "m" + digitos (m01-m12), va a /canonico/<target>.
 *  - En otros casos queda como /canonico/<target> por defecto (sera resuelto
 *    en S3 con un index global de slugs construido por el script de grafo).
 *  - Si el target esta vacio, se renderiza como wikilink-broken.
 */
const WIKILINK_RE = /\[\[([^\[\]\n]+?)\]\]/g;

export interface WikiLinkOptions {
  /** Map de slug -> path resuelto. Si esta presente, se usa para resolver. */
  pathResolver?: (target: string) => { href: string; broken?: boolean };
}

function defaultResolver(target: string): { href: string; broken?: boolean } {
  if (!target) return { href: '#', broken: true };
  // Canonical paper m01..m12 (case-insensitive)
  if (/^m\d{2}$/i.test(target)) {
    return { href: `/canonico/${target.toLowerCase()}` };
  }
  // Fallback: assume canonical
  return { href: `/canonico/${target.toLowerCase()}` };
}

const remarkWikilinks: Plugin<[WikiLinkOptions?], Root> = (options = {}) => {
  const resolve = options.pathResolver ?? defaultResolver;

  return (tree) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined || !node.value) return;
      if (!WIKILINK_RE.test(node.value)) return;
      WIKILINK_RE.lastIndex = 0;

      const newChildren: Array<Text | { type: 'link'; url: string; data?: { hProperties: { className: string }}; children: [Text] }> = [];
      let cursor = 0;
      let match: RegExpExecArray | null;

      while ((match = WIKILINK_RE.exec(node.value)) !== null) {
        const [full, inner] = match;
        const start = match.index;
        if (start > cursor) {
          newChildren.push({ type: 'text', value: node.value.slice(cursor, start) });
        }
        // parse [[target#hash|alias]]
        const [targetWithHash, alias] = inner.split('|', 2);
        const [target, hash] = targetWithHash.split('#', 2);
        const text = (alias ?? target).trim();
        const cleanTarget = target.trim();
        const { href, broken } = resolve(cleanTarget);
        const finalHref = hash ? `${href}#${hash.trim()}` : href;
        newChildren.push({
          type: 'link',
          url: finalHref,
          data: {
            hProperties: { className: broken ? 'wikilink wikilink-broken' : 'wikilink' },
          },
          children: [{ type: 'text', value: text }],
        });
        cursor = start + full.length;
      }
      if (cursor < node.value.length) {
        newChildren.push({ type: 'text', value: node.value.slice(cursor) });
      }
      // Replace original text node with new children
      const children = parent.children as Array<unknown>;
      children.splice(index, 1, ...newChildren);
      WIKILINK_RE.lastIndex = 0;
      return index + newChildren.length;
    });
  };
};

export default remarkWikilinks;
