import { defineCollection, defineConfig, s } from 'velite';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkWikilinks from './src/lib/remark-wikilinks';
import remarkObsidianEmbed from './src/lib/remark-obsidian-embed';
import rehypeCallouts from 'rehype-callouts';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

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
      body: s.mdx(),
      toc: s.toc(),
      metadata: s.metadata(),
      slug: s.path(),
    })
    .transform((data) => ({ ...data, href: `/canonico/${data.id}` })),
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
      body: s.mdx(),
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
      body: s.mdx(),
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
  mdx: {
    gfm: true,
    remarkPlugins: [
      remarkGfm,
      remarkMath,           // $...$ y $$...$$
      remarkObsidianEmbed,  // ![[archivo]]
      remarkWikilinks,      // [[link]] [[link|alias]] [[link#anchor]]
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeCallouts, { theme: 'obsidian' }],
      [rehypeKatex, { strict: false, output: 'html', trust: true, macros: { '\\R': '\\mathbb{R}' } }],
      [rehypePrettyCode, { theme: 'github-light-default' }],
    ],
  },
});
