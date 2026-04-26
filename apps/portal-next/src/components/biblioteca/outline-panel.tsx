'use client';

import { useEffect, useState } from 'react';
import { ListTree, FileText } from 'lucide-react';
import type { ActiveDoc } from '@/lib/active-doc';
import { cn } from '@/lib/utils';

type TocEntry = { title: string; url: string; items?: TocEntry[] };

/**
 * OutlinePanel — TOC navegable del documento activo con scroll-spy.
 * Highlight del heading visible en viewport mediante IntersectionObserver.
 */
export function OutlinePanel({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scroll-spy: observar todos los headings del documento
  useEffect(() => {
    if (!doc?.toc || doc.toc.length === 0) return;
    const ids = flattenIds(doc.toc);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Patrón Flowershow (apps/flowershow/components/public/table-of-contents.tsx):
        // el heading "activo" es el primer visible en zona top 20% — bottom 70%.
        // Esto evita que un heading cerca del footer "robe" foco al hacer scroll.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [doc]);

  if (!doc) {
    return <EmptyState reason="no-doc" />;
  }
  if (!doc.toc || doc.toc.length === 0) {
    return <EmptyState reason="no-toc" docTitle={doc.title} />;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-sidebar-border px-3 py-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          <FileText className="h-3 w-3" />
          {doc.kind === 'paper' && doc.number !== undefined ? `M${String(doc.number).padStart(2, '0')}` : 'Nota'}
        </div>
        <p className="mt-0.5 text-xs font-semibold leading-tight line-clamp-2">{doc.title}</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 text-xs">
        <ul className="space-y-0.5">
          {doc.toc.map((entry) => (
            <TocItem key={entry.url} entry={entry} activeId={activeId} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

function flattenIds(toc: TocEntry[]): string[] {
  const out: string[] = [];
  for (const e of toc) {
    const id = e.url.replace(/^#/, '');
    if (id) out.push(id);
    if (e.items) out.push(...flattenIds(e.items));
  }
  return out;
}

function TocItem({
  entry,
  activeId,
  depth = 0,
}: Readonly<{
  entry: TocEntry;
  activeId: string | null;
  depth?: number;
}>) {
  const id = entry.url.replace(/^#/, '');
  const isActive = id === activeId;
  return (
    <li>
      <a
        href={entry.url}
        className={cn(
          'block rounded px-2 py-0.5 text-[11px] leading-tight transition-colors',
          'border-l-2',
          isActive
            ? 'border-primary bg-primary/10 text-foreground font-medium'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/30',
        )}
        style={{ paddingLeft: `${0.5 + depth * 0.75}rem` }}
      >
        {entry.title}
      </a>
      {entry.items && entry.items.length > 0 && (
        <ul className="space-y-0.5">
          {entry.items.map((sub) => (
            <TocItem key={sub.url} entry={sub} activeId={activeId} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function EmptyState({ reason, docTitle }: Readonly<{ reason: 'no-doc' | 'no-toc'; docTitle?: string }>) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground p-4">
      <ListTree className="h-6 w-6 opacity-40" />
      {reason === 'no-doc' ? (
        <>
          <p className="font-medium text-foreground">Sin documento activo</p>
          <p className="text-[10px]">Abre un paper o nota para ver su outline.</p>
        </>
      ) : (
        <>
          <p className="font-medium text-foreground">Sin headings</p>
          <p className="text-[10px]">{docTitle ?? 'El documento'} no tiene secciones para listar.</p>
        </>
      )}
    </div>
  );
}
