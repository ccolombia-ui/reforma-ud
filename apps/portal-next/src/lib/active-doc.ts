'use client';

import { canonicPaper, note } from '#site/content';

export type ActiveDoc = {
  id: string;
  href: string;
  title: string;
  kind: 'paper' | 'note';
  number?: number;
  toc?: Array<{ title: string; url: string; items?: Array<{ title: string; url: string }> }>;
};

/**
 * Resuelve el doc activo desde el pathname.
 * Soporta /canonico/m## y /comunidades/.../slug
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

  // /comunidades/.../slug → buscar nota
  if (clean.startsWith('/comunidades/')) {
    const slug = clean.replace(/^\//, '');
    const noteDoc = note.find((n) => n.slug === slug);
    if (noteDoc) {
      return {
        id: noteDoc.slug,
        href: noteDoc.href,
        title: noteDoc.title,
        kind: 'note',
        toc: noteDoc.toc,
      };
    }
  }

  return null;
}
