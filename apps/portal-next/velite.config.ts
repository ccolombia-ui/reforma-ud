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

// v5.0f Gap A · SSOT bibliográfico = átomos .md en content/biblio/<key>.md
// per AUDIT-arquitectura-citas-bibliografia.md v3.0. Antes era references.json
// (revertido). Velite recoge cada átomo como Reference collection y el transform
// de [@key] resuelve leyendo el frontmatter de los .md.
type RefEntry = {
  bibtex_key: string;
  authors: string[];
  year: number;
  title?: string;
  url?: string;
  journal?: string;
  publisher?: string;
  doi?: string;
  biblio_type?: string;
};

let REFERENCES: Record<string, RefEntry> = {};

function parseFrontmatter(raw: string): Record<string, unknown> | null {
  if (!raw.startsWith('---\n')) return null;
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return null;
  const yaml = raw.slice(4, end);
  // Mini-parser dedicado (evita dep de yaml en velite.config). Soporta el
  // subset que genera migrate-references-to-atoms.mjs:
  //   key: value
  //   key: "quoted value"
  //   key:
  //     - "list item"
  //     - "list item"
  const out: Record<string, unknown> = {};
  let currentList: { key: string; items: string[] } | null = null;
  for (const line of yaml.split('\n')) {
    if (!line.trim()) continue;
    const listMatch = line.match(/^\s+-\s+(.+)$/);
    if (listMatch && currentList) {
      let v = listMatch[1].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      currentList.items.push(v);
      continue;
    }
    const kvMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
    if (!kvMatch) continue;
    if (currentList) {
      out[currentList.key] = currentList.items;
      currentList = null;
    }
    const [, k, vRaw] = kvMatch;
    if (vRaw === '' || vRaw === undefined) {
      currentList = { key: k, items: [] };
      continue;
    }
    let v: unknown = vRaw.trim();
    if (typeof v === 'string') {
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      } else if (/^-?\d+$/.test(v)) {
        v = Number(v);
      }
    }
    out[k] = v;
  }
  if (currentList) out[currentList.key] = currentList.items;
  return out;
}

function loadReferences(): void {
  const dir = join(process.cwd(), 'content', 'biblio');
  REFERENCES = {};
  try {
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const raw = readFileSync(join(dir, f), 'utf8');
      const fm = parseFrontmatter(raw);
      if (!fm || !fm.bibtex_key) continue;
      REFERENCES[fm.bibtex_key as string] = {
        bibtex_key: fm.bibtex_key as string,
        authors: (fm.authors as string[]) ?? [],
        year: (fm.year as number) ?? 0,
        title: fm.title as string | undefined,
        url: fm.url as string | undefined,
        journal: fm.journal as string | undefined,
        publisher: fm.publisher as string | undefined,
        doi: fm.doi as string | undefined,
        biblio_type: fm.biblio_type as string | undefined,
      };
    }
    console.log(`[velite] ${Object.keys(REFERENCES).length} átomos bibliográficos cargados desde content/biblio/`);
  } catch (e) {
    console.warn('[velite] content/biblio/ no encontrado — citas APA no resolverán', e);
  }
}
loadReferences();

function shortAuthor(authors: string[]): string {
  if (authors.length === 0) return 'Anonymous';
  const first = authors[0];
  // "Beer, S." → "Beer"; "ABET" → "ABET"; "X et al." → "X et al."
  if (first.includes(' et al.')) return first;
  const firstComma = first.indexOf(',');
  const lastName = firstComma > 0 ? first.slice(0, firstComma) : first;
  if (authors.length === 1) return lastName;
  if (authors.length === 2) {
    const second = authors[1];
    const secondLast = second.includes(',') ? second.slice(0, second.indexOf(',')) : second;
    return `${lastName} & ${secondLast}`;
  }
  return `${lastName} et al.`;
}

function transformApaCites(html: string): string {
  return html.replace(
    /\[(-?)@([a-zA-Z][a-zA-Z0-9_-]+)(?:\s*,?\s*p\.?\s*[\d-]+)?\]/g,
    (_full, suppress, key) => {
      const ref = REFERENCES[key];
      if (!ref) {
        return `<a class="apa-cite apa-cite-broken" data-cite-key="${key}" title="Cita no resuelta">[@${key}]</a>`;
      }
      const text = suppress
        ? `(${ref.year})`
        : `(${shortAuthor(ref.authors)}, ${ref.year})`;
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

// v5.0f Gap A · Reference = átomo bibliográfico con frontmatter + body markdown.
// SSOT del corpus per AUDIT-arquitectura-citas-bibliografia.md v3.0.
// Velite los recoge de content/biblio/<bibtex_key>.md y los expone como
// `reference` collection. <ApaCite> client component lee de aquí en runtime.
const reference = defineCollection({
  name: 'Reference',
  pattern: 'biblio/*.md',
  schema: s
    .object({
      bibtex_key: s.string(),
      biblio_type: s.string().default('misc'),
      authors: s.array(s.string()).default([]),
      year: s.number(),
      title: s.string().optional(),
      journal: s.string().optional(),
      publisher: s.string().optional(),
      url: s.string().optional(),
      doi: s.string().optional(),
      tupla_tipo: s.string().default('BIBLIO_REF'),
      tags: s.array(s.string()).default([]),
      body: s.markdown(),
      slug: s.path(),
    })
    .transform((data) => ({
      ...data,
      href: `/biblio/${data.bibtex_key}`,
    })),
});

// v5.0h · Concepto = átomo del Glosario Universal (cap-MI12 base conceptual).
// Cada archivo content/glosario/con-*.md sigue el spec concepto-universal v5.2:
// frontmatter SKOS + ISO 1087 + Pasteur quadrant + DDD facets + schema.org JSON-LD.
// Schema MÍNIMO obligatorio: kd_id, kd_title, skos_prefLabel, skos_definition.
// Todo lo demás opcional (la collection no falla si un átomo no tiene DDD facet).
const concepto = defineCollection({
  name: 'Concepto',
  pattern: 'glosario/con-*.md',
  schema: s
    .object({
      kd_id: s.string(),
      kd_title: s.string(),
      kd_type: s.string().default('glosario-universal'),
      kd_status: s.string().optional(),
      kd_version: s.string().optional(),
      skos_prefLabel: s.string(),
      skos_altLabel: s.array(s.string()).default([]),
      skos_definition: s.string(),
      skos_scopeNote: s.string().optional(),
      skos_example: s.string().optional(),
      skos_notation: s.string().optional(),
      iso_subject_field: s.string().optional(),
      iso_genus: s.string().optional(),
      iso_differentia: s.string().optional(),
      iso_term_status: s.string().optional(),
      pasteur_quadrant: s.string().optional(),
      cited_in: s.array(s.string()).default([]),
      cited_count: s.number().default(0),
      tags: s.array(s.string()).default([]),
      body: s.markdown(),
      toc: s.toc(),
      slug: s.path(),
    })
    .transform((data) => {
      // Slug del archivo: glosario/con-jtbd-christensen → con-jtbd-christensen
      const id = data.slug.replace(/^glosario\//, '');
      return {
        ...data,
        id,
        href: `/glosario/${id}`,
        // v5.0j · post-procesa [@key] APA en el body de cada concepto también
        // (los conceptos pueden citar fuentes en su sección "Fuente primaria").
        body: transformApaCites(data.body),
      };
    }),
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
    reference,
    concepto,
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
          let url: string;
          // Paper canónico m##: /canonico/m##
          const mMatch = noExt.match(/(?:^|\/)(m\d{2})$/i);
          // v5.0h · Concepto del Glosario Universal: con-* o glo-* → /glosario/<slug>
          const conMatch = noExt.match(/(?:^|\/)(con-[a-z0-9-]+)$/i);
          const gloMatch = noExt.match(/(?:^|\/)(glo-[a-z0-9-]+)$/i);
          if (mMatch) {
            url = `/canonico/${mMatch[1].toLowerCase()}`;
          } else if (conMatch) {
            url = `/glosario/${conMatch[1].toLowerCase()}`;
          } else if (gloMatch) {
            // Compat retro: [[glo-*]] (legacy en M01-M12) también va al glosario
            url = `/glosario/${gloMatch[1].toLowerCase()}`;
          } else if (noExt.startsWith('comunidades/')) {
            url = `/${noExt}`;
          } else {
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
