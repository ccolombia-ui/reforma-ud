import { defineCollection, defineConfig, s } from 'velite';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import wikiLinkPlugin from '@flowershow/remark-wiki-link';
import rehypeCallouts from 'rehype-callouts';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeMermaid from 'rehype-mermaid';

// v4.5c D5 — Carga la bibliografía para resolver `[@key]` a `(Autor, año)`
// durante el build de Velite. Es un read-once al iniciar el proceso.
type RefEntry = { author: string; year: number; title?: string; url?: string | null; journal?: string; publisher?: string };
let REFERENCES: Record<string, RefEntry> = {};
try {
  const raw = readFileSync(join(process.cwd(), 'src', 'lib', 'references.json'), 'utf8');
  REFERENCES = JSON.parse(raw) as Record<string, RefEntry>;
  delete (REFERENCES as Record<string, unknown>)._meta;
} catch (e) {
  console.warn('[velite] references.json no encontrado — citas APA no resolverán', e);
}

function shortAuthor(author: string): string {
  // "Apellido, Nombre" → "Apellido"; "X et al." → "X et al."; "Autor1 & Autor2" → "Autor1 & Autor2"
  if (author.includes(' et al.')) return author;
  const firstComma = author.indexOf(',');
  if (firstComma > 0) return author.slice(0, firstComma);
  return author;
}

function transformApaCites(html: string): string {
  // Reemplaza [@key], [@key, p. X], [-@key] → <a class="apa-cite" data-cite-key="key">(Autor, Año)</a>
  // Pandoc syntax soportada (mínima): `[@key]`, `[-@key]` (suprimir autor), `[@key1; @key2]` (múltiples).
  return html.replace(
    /\[(-?)@([a-zA-Z][a-zA-Z0-9_-]+)(?:\s*,?\s*p\.?\s*[\d-]+)?\]/g,
    (full, suppress, key) => {
      const ref = REFERENCES[key];
      if (!ref) {
        return `<a class="apa-cite apa-cite-broken" data-cite-key="${key}" title="Cita no resuelta">[@${key}]</a>`;
      }
      const text = suppress
        ? `(${ref.year})`
        : `(${shortAuthor(ref.author)}, ${ref.year})`;
      return `<a class="apa-cite" data-cite-key="${key}">${text}</a>`;
    },
  );
}

/**
 * Recolecta todos los `.md`/`.mdx` bajo content/ para alimentar
 * `@flowershow/remark-wiki-link` (necesario en format: 'shortestPossible'
 * para resolver `[[m04]]` → `canonico/m04.mdx`).
 */
function collectFiles(rootDir: string, baseDir = rootDir, acc: string[] = []): string[] {
  for (const entry of readdirSync(rootDir, { withFileTypes: true })) {
    const full = join(rootDir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, baseDir, acc);
    } else if (/\.(mdx?|md)$/i.test(entry.name)) {
      acc.push(full.slice(baseDir.length + 1).replaceAll('\\', '/'));
    }
  }
  return acc;
}

const contentFiles = collectFiles('content');

// Permalinks: M01-M12 → /canonico/m##  ·  notes & community resuelven via urlResolver
const permalinks: Record<string, string> = {};
for (const f of contentFiles) {
  const m = f.match(/^canonico\/(m\d{2})\.mdx?$/i);
  if (m) permalinks[f] = `/canonico/${m[1].toLowerCase()}`;
}

// Canonical papers (M01-M12) — the theoretical base
const canonicPaper = defineCollection({
  name: 'CanonicPaper',
  pattern: 'canonico/*.mdx',
  schema: s
    .object({
      id: s.string(),
      number: s.number(),
      title: s.string(),
      description: s.string(),
      crispPhase: s.enum([
        'business',
        'data-understanding',
        'data-prep',
        'modeling',
        'evaluation',
        'deployment',
      ]),
      rutaClark: s.array(s.enum(['R1', 'R2', 'R3', 'R4', 'R5'])).default([]),
      status: s.enum(['red', 'yellow', 'green']).default('red'),
      tags: s.array(s.string()).default([]),
      sources: s
        .array(
          s.object({
            title: s.string(),
            url: s.string(),
            doi: s.string().optional(),
          })
        )
        .default([]),
      // v4.5c D6 · Relaciones tipadas. Todas opcionales — un paper sin relations
      // sigue funcionando. `cites` se mantiene como atajo plano para compat.
      relations: s
        .object({
          pre: s.array(s.string()).default([]),       // pre-saberes
          pos: s.array(s.string()).default([]),       // pos-saberes
          co: s
            .array(
              s.object({
                autor: s.string(),
                pct: s.number().optional(),
              })
            )
            .default([]),
          custom: s.record(s.array(s.string())).default({}),
        })
        .default({ pre: [], pos: [], co: [], custom: {} }),
      cites: s.array(s.string()).default([]),
      body: s.markdown(),
      toc: s.toc(),
      metadata: s.metadata(),
      slug: s.path(),
    })
    .transform((data) => ({
      ...data,
      // v4.5c D5 — post-procesa `[@key]` en el HTML compilado a `<a class="apa-cite">…</a>`.
      // El componente cliente <ApaCite> intercepta esos anchors via mdx-with-hover-preview
      // y muestra hover popover con metadata bibliográfica.
      body: transformApaCites(data.body),
      href: `/canonico/${data.id}`,
    })),
});

// Communities = organizational units (Gobierno + VRs + Facultades + Escuelas + ...)
const community = defineCollection({
  name: 'Community',
  pattern: 'comunidades/**/index.mdx',
  schema: s
    .object({
      type: s.enum([
        'gobierno',
        'csu',
        'rectoria',
        'direccion',
        'vicerrectoria',
        'facultad',
        'programa',
        'escuela',
        'caba',
        'instituto',
        'centro',
      ]),
      name: s.string(),
      shortName: s.string().optional(),
      description: s.string(),
      cites: s.array(s.string()).default([]),
      body: s.markdown(),
      toc: s.toc(),
      slug: s.path(),
    })
    .transform((data) => {
      // slug como "comunidades/formacion/escuelas/fisica/_index" → "/comunidades/formacion/escuelas/fisica"
      const cleanSlug = data.slug.replace(/\/_index$/, '');
      return {
        ...data,
        slug: cleanSlug,
        href: `/${cleanSlug}`,
      };
    }),
});

// Notes = child content inside a community vault
const note = defineCollection({
  name: 'Note',
  pattern: ['comunidades/**/*.mdx', '!comunidades/**/index.mdx'],
  schema: s
    .object({
      title: s.string(),
      tags: s.array(s.string()).default([]),
      cites: s.array(s.string()).default([]),
      body: s.markdown(),
      toc: s.toc(),
      slug: s.path(),
    })
    .transform((data) => {
      const parts = data.slug.split('/');
      const communitySlug = parts.slice(0, -1).join('/');
      return {
        ...data,
        communitySlug,
        href: `/${data.slug}`,
      };
    }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    canonicPaper,
    community,
    note,
  },
  markdown: {
    gfm: true,
    // Cast a `never` aplicado al array porque el flat tree de npm en CI mezcla
    // varias versiones de `unified` y rompe la inferencia de Plugin<>. En runtime
    // los plugins funcionan idéntico; solo apaga el TS check en build.
    remarkPlugins: ([
      remarkGfm,
      remarkMath,           // $...$ y $$...$$
      // @flowershow/remark-wiki-link 3.4 — SOTA Obsidian wikilinks + embeds
      [wikiLinkPlugin, {
        format: 'shortestPossible',
        files: contentFiles,
        permalinks,
        className: 'wikilink',
        newClassName: 'wikilink-broken',
        urlResolver: ({ filePath, heading }: { filePath: string; heading?: string; isEmbed: boolean }) => {
          // Quitar extensión .md/.mdx
          const noExt = filePath.replace(/\.(mdx?|md)$/i, '');
          // Si es paper canónico m##: /canonico/m##
          const mMatch = noExt.match(/(?:^|\/)(m\d{2})$/i);
          let url: string;
          if (mMatch) {
            url = `/canonico/${mMatch[1].toLowerCase()}`;
          } else if (noExt.startsWith('comunidades/')) {
            url = `/${noExt}`;
          } else {
            // Fallback: ruta directa
            url = `/${noExt.replace(/^\//, '')}`;
          }
          return heading ? `${url}#${heading.replace(/^#/, '')}` : url;
        },
      }],
    ]) as never,
    // Cast a `never` aplicado a los arrays porque el flat tree de npm en CI
    // mezcla varias versiones de `unified` y rompe la inferencia de Plugin<>.
    // En runtime los plugins funcionan idéntico; solo apaga el TS check en build.
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeCallouts, { theme: 'obsidian' }],
      // rehype-mermaid 3 con strategy 'pre-mermaid':
      // No usa Chromium (que NO está disponible en Vercel CI sin postinstall).
      // El plugin solo añade class='mermaid' al <pre> y un cliente lo renderiza.
      // Componente cliente: src/components/mermaid-renderer.tsx — lazy-load + useEffect.
      [rehypeMermaid, { strategy: 'pre-mermaid', errorFallback: (node: unknown, error: unknown) => { console.warn('Mermaid error:', error); return node; } }],
      rehypeRaw,
      [rehypeKatex, { strict: false, output: 'html', trust: true, macros: { '\\R': '\\mathbb{R}' } }],
      [rehypePrettyCode, { theme: 'github-light-default' }],
    ] as never,
  },
});
