/**
 * resolve-href · función pura para resolver wikilinks internos a su doc Velite.
 *
 * Extraído de WikiLinkPreview para ser testeable sin React/JSDOM. Recibe las
 * colecciones por DI (no importa #site/content directamente), lo que permite
 * pasar fixtures en tests unitarios.
 *
 * Soporta:
 *   /canonico/m05              → paper
 *   /canonico/m05#anchor       → paper (ignora hash)
 *   /glosario/con-foo          → concepto
 *   /glosario/con-foo/         → concepto (con trailing slash)
 *   /comunidades/<slug>        → note o community
 *   '#' o vacío                → broken
 *   cualquier otra cosa        → broken
 */

export type ResolvedDoc =
  | { kind: 'paper'; id: string; title: string; description: string; href: string; body: string; number: number }
  | { kind: 'note'; slug: string; title: string; description?: string; href: string; body: string }
  | { kind: 'concepto'; slug: string; title: string; definition?: string; href: string; body: string }
  | { kind: 'community'; slug: string; name: string; description: string; href: string }
  | { kind: 'broken'; href: string };

export interface ResolveCollections {
  canonicPaper: ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    href: string;
    body: string;
    number: number;
  }>;
  community: ReadonlyArray<{
    slug: string;
    name: string;
    shortName?: string;
    description?: string;
  }>;
  concepto: ReadonlyArray<{
    slug: string;
    href: string;
    kd_title?: string;
    skos_prefLabel?: string;
    skos_definition?: string;
    body: string;
  }>;
  note: ReadonlyArray<{
    slug: string;
    title: string;
    href: string;
    body: string;
  }>;
}

export function resolveHref(href: string, collections: ResolveCollections): ResolvedDoc {
  if (!href || href === '#') return { kind: 'broken', href };
  const cleanHref = href.split('#')[0];

  if (cleanHref.startsWith('/canonico/')) {
    const id = cleanHref.replace('/canonico/', '').replace(/\/$/, '');
    const paper = collections.canonicPaper.find((p) => p.id === id);
    if (paper) {
      return {
        kind: 'paper',
        id: paper.id,
        title: paper.title,
        description: paper.description,
        href: paper.href,
        body: paper.body,
        number: paper.number,
      };
    }
  }

  if (cleanHref.startsWith('/glosario/')) {
    const target = cleanHref.replace(/\/$/, '');
    const doc = collections.concepto.find((c) => c.href.replace(/\/$/, '') === target);
    if (doc) {
      return {
        kind: 'concepto',
        slug: doc.slug,
        title: doc.kd_title ?? doc.skos_prefLabel ?? doc.slug,
        definition: doc.skos_definition,
        href: doc.href,
        body: doc.body,
      };
    }
  }

  if (cleanHref.startsWith('/comunidades/')) {
    const slug = cleanHref.replace(/^\//, '').replace(/\/$/, '');
    const noteDoc = collections.note.find((n) => n.slug === slug);
    if (noteDoc) {
      return {
        kind: 'note',
        slug: noteDoc.slug,
        title: noteDoc.title,
        href: noteDoc.href,
        body: noteDoc.body,
      };
    }
    const cop = collections.community.find((c) => c.slug === slug);
    if (cop) {
      return {
        kind: 'community',
        slug: cop.slug,
        name: cop.shortName ?? cop.name,
        description: cop.description ?? '',
        href: `/${cop.slug}`,
      };
    }
  }

  return { kind: 'broken', href };
}
