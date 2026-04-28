'use client';

import { canonicPaper, note, concepto, community } from '#site/content';

export type ActiveDoc = {
  id: string;
  href: string;
  title: string;
  kind: 'paper' | 'note' | 'concepto' | 'community';
  number?: number;
  toc?: Array<{ title: string; url: string; items?: Array<{ title: string; url: string }> }>;
  /** v6.0 · cites del frontmatter (papers vinculados). Disponible para community/note. */
  cites?: string[];
};

/**
 * Resuelve el doc activo desde el pathname.
 * Soporta /canonico/m##, /comunidades/.../slug, /glosario/<conId>.
 */
export function getActiveDocFromPath(pathname: string | null | undefined): ActiveDoc | null {
  if (!pathname) return null;
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/$/, '');

  // /canonico/m##
  if (clean.startsWith('/canonico/')) {
    const id = clean.replace('/canonico/', '');
    if (/^m\d{2}$/i.test(id)) {
      const paper = canonicPaper.find((p) => p.id === id.toLowerCase());
      if (paper) {
        return {
          id: paper.id,
          href: paper.href,
          title: paper.title,
          kind: 'paper',
          number: paper.number,
          toc: paper.toc,
        };
      }
    }
  }

  // /glosario/<conId> · v5.0j Gap 3 — el Esquema del right panel ahora
  // resuelve TOC de conceptos también, no solo de papers/notas.
  if (clean.startsWith('/glosario/')) {
    const id = clean.replace('/glosario/', '');
    const c = concepto.find((x) => x.id === id);
    if (c) {
      return {
        id: c.id,
        href: c.href,
        title: c.skos_prefLabel ?? c.kd_title,
        kind: 'concepto',
        toc: c.toc,
      };
    }
  }

  // /comunidades/.../slug → primero buscar nota, luego comunidad
  if (clean.startsWith('/comunidades/')) {
    const slug = clean.replace(/^\//, '');
    // Sub-rutas de comunidad (no son notes ni community en si): biblioteca, grafo, biblioteca/<docId>
    const lastSeg = slug.split('/').pop();
    const isSubroute = lastSeg === 'biblioteca' || lastSeg === 'grafo';
    const isBibliotecaDoc = slug.includes('/biblioteca/');

    if (!isSubroute && !isBibliotecaDoc) {
      // 1) Nota (mdx hijo en vault de comunidad)
      const noteDoc = note.find((n) => n.slug === slug);
      if (noteDoc) {
        return {
          id: noteDoc.slug,
          href: noteDoc.href,
          title: noteDoc.title,
          kind: 'note',
          toc: noteDoc.toc,
          cites: noteDoc.cites ?? [],
        };
      }
      // 2) Comunidad (index.mdx de unidad organizativa)
      // v6.0 G-SVC-04 · antes /comunidades/<slug> retornaba null;
      // ahora retorna kind:'community' para que tabs activen contexto.
      const cop = community.find((c) => c.slug === slug);
      if (cop) {
        return {
          id: cop.slug,
          href: cop.href,
          title: cop.shortName ?? cop.name,
          kind: 'community',
          toc: cop.toc,
          cites: cop.cites ?? [],
        };
      }
    }
  }

  return null;
}
