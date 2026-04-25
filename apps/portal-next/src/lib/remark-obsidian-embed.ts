import type { Plugin } from 'unified';
import type { Root, Text, Image } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Plugin remark para embeds Obsidian-native:
 *   ![[archivo.png]]            → <img src="/static/archivo.png" alt="archivo">
 *   ![[archivo.png|alt text]]   → <img src="..." alt="alt text">
 *   ![[ruta/larga/archivo]]     → resuelve por basename + extensión
 *   ![[nota.md]]                → marker para transclusion (handled in MDX render)
 *
 * Se ejecuta antes del wikilinks plugin. Detecta el patrón `!` antepuesto.
 */
const EMBED_RE = /!\[\[([^\[\]\n]+?)\]\]/g;

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov)$/i;
const AUDIO_EXT = /\.(mp3|ogg|wav|m4a)$/i;
const PDF_EXT = /\.pdf$/i;

function inferType(target: string): 'image' | 'video' | 'audio' | 'pdf' | 'note' | 'iframe' {
  const t = target.toLowerCase();
  if (IMAGE_EXT.test(t)) return 'image';
  if (VIDEO_EXT.test(t)) return 'video';
  if (AUDIO_EXT.test(t)) return 'audio';
  if (PDF_EXT.test(t)) return 'pdf';
  if (t.startsWith('http')) return 'iframe';
  return 'note';
}

function basename(path: string): string {
  const idx = path.lastIndexOf('/');
  return idx === -1 ? path : path.slice(idx + 1);
}

const remarkObsidianEmbed: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined || !node.value) return;
      if (!EMBED_RE.test(node.value)) return;
      EMBED_RE.lastIndex = 0;

      const newChildren: Array<Text | Image | { type: 'html'; value: string }> = [];
      let cursor = 0;
      let match: RegExpExecArray | null;

      while ((match = EMBED_RE.exec(node.value)) !== null) {
        const [full, inner] = match;
        const start = match.index;
        if (start > cursor) {
          newChildren.push({ type: 'text', value: node.value.slice(cursor, start) });
        }

        const [targetWithAlt, alt] = inner.split('|', 2);
        const target = targetWithAlt.trim();
        const type = inferType(target);
        const fileName = basename(target);
        const altText = alt?.trim() ?? fileName;

        if (type === 'image') {
          newChildren.push({
            type: 'image',
            url: `/static/${fileName}`,
            alt: altText,
            title: alt ?? null,
          });
        } else if (type === 'video') {
          newChildren.push({
            type: 'html',
            value: `<video controls src="/static/${fileName}" class="rounded-lg w-full"></video>`,
          });
        } else if (type === 'audio') {
          newChildren.push({
            type: 'html',
            value: `<audio controls src="/static/${fileName}" class="w-full"></audio>`,
          });
        } else if (type === 'pdf') {
          newChildren.push({
            type: 'html',
            value: `<iframe src="/static/${fileName}" class="w-full h-[600px] rounded-lg border" title="${altText}"></iframe>`,
          });
        } else {
          // Nota o desconocido — marcador para transclusion (resuelto en runtime via wikilink resolver)
          newChildren.push({
            type: 'html',
            value: `<div class="not-prose embed-note" data-embed-note="${target}"><a href="/${target}" class="wikilink">📄 ${altText}</a></div>`,
          });
        }

        cursor = start + full.length;
      }
      if (cursor < node.value.length) {
        newChildren.push({ type: 'text', value: node.value.slice(cursor) });
      }
      const children = parent.children as Array<unknown>;
      children.splice(index, 1, ...newChildren);
      EMBED_RE.lastIndex = 0;
      return index + newChildren.length;
    });
  };
};

export default remarkObsidianEmbed;
