'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Sparkles, MessageCircleQuestion, X, ChevronLeft, BookMarked, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { COMPREHENSION_REGISTRY, type DocumentComprehension } from '@/lib/comprehension';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { canonicPaper, community, note } from '#site/content';

type Tab = 'preguntas' | 'chat';

export function AsistenteSidebar({ copSlug }: { copSlug: string }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('preguntas');
  const [readingState, setReadingState] = useState<ReadingState | null>(null);

  useEffect(() => {
    setReadingState(getReadingState());
    const onChange = () => setReadingState(getReadingState());
    window.addEventListener('reading-state-change', onChange);
    return () => window.removeEventListener('reading-state-change', onChange);
  }, []);

  // Documents en la CoP
  const cop = community.find((c) => c.slug === copSlug);
  const cites = cop?.cites ?? [];
  const notesInVault = note.filter((n) => n.communitySlug === copSlug || n.communitySlug.startsWith(copSlug + '/'));

  // Preguntas pendientes: documentos que tienen comprehension data y secciones por completar
  const pending = useMemo(() => {
    type Item = { docId: string; href: string; title: string; remaining: number; total: number; type: 'paper' | 'note' };
    const items: Item[] = [];
    for (const pid of cites) {
      const c = COMPREHENSION_REGISTRY[pid];
      if (!c) continue;
      const p = canonicPaper.find((x) => x.id === pid);
      if (!p) continue;
      const sections = c.sections;
      const status = readingState?.docs[pid]?.sections ?? {};
      const completed = sections.filter((s) => ['completed', 'verified'].includes(status[s.anchor] ?? 'unread')).length;
      const remaining = sections.length - completed;
      if (remaining > 0) {
        items.push({
          docId: pid,
          href: `/${copSlug}/biblioteca/${pid}`,
          title: p.title,
          remaining,
          total: sections.length,
          type: 'paper',
        });
      }
    }
    for (const n of notesInVault) {
      const c = COMPREHENSION_REGISTRY[n.slug];
      if (!c) continue;
      const status = readingState?.docs[n.slug]?.sections ?? {};
      const completed = c.sections.filter((s) => ['completed', 'verified'].includes(status[s.anchor] ?? 'unread')).length;
      const remaining = c.sections.length - completed;
      if (remaining > 0) {
        items.push({
          docId: n.slug,
          href: `/${copSlug}/biblioteca/${encodeURIComponent(n.slug)}`,
          title: n.title,
          remaining,
          total: c.sections.length,
          type: 'note',
        });
      }
    }
    return items;
  }, [cites, copSlug, notesInVault, readingState]);

  return (
    <>
      {/* Trigger button (floating bottom-right) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir asistente"
        className={cn(
          'fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-xl transition-transform hover:scale-105',
          open && 'pointer-events-none opacity-0',
        )}
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline">Asistente</span>
        {pending.length > 0 && (
          <Badge className="ml-1 rounded-full bg-amber-400 text-amber-950 hover:bg-amber-400">
            {pending.length}
          </Badge>
        )}
      </button>

      {/* Side panel */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l bg-background shadow-2xl transition-transform',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-semibold">Asistente</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Cerrar">
            <X className="h-4 w-4" />
          </Button>
        </header>

        <div className="flex border-b">
          <button
            onClick={() => setTab('preguntas')}
            className={cn(
              'flex-1 border-b-2 px-4 py-2 text-sm font-medium transition-colors',
              tab === 'preguntas' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            <span className="inline-flex items-center gap-1.5">
              <MessageCircleQuestion className="h-3.5 w-3.5" />
              Preguntas
              {pending.length > 0 && <Badge variant="secondary" className="text-[10px]">{pending.length}</Badge>}
            </span>
          </button>
          <button
            onClick={() => setTab('chat')}
            className={cn(
              'flex-1 border-b-2 px-4 py-2 text-sm font-medium transition-colors',
              tab === 'chat' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Chat
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {tab === 'preguntas' && (
            pending.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                <Sparkles className="h-6 w-6 text-emerald-500" />
                <p className="font-medium text-foreground">¡Estás al día!</p>
                <p>No quedan preguntas de comprensión pendientes en esta CoP.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Documentos con preguntas de comprensión pendientes en esta comunidad. Saltables en cualquier momento.
                </p>
                {pending.map((p) => (
                  <Link
                    key={p.docId}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg border p-3 transition-all hover:border-primary/50 hover:bg-accent/40"
                  >
                    <div className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                      {p.type === 'paper' ? <BookMarked className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                      {p.type === 'paper' ? p.docId.toUpperCase() : 'nota'}
                    </div>
                    <div className="line-clamp-2 text-sm font-medium">{p.title}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-[10px]">
                        {p.remaining} de {p.total} pendientes
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )
          )}
          {tab === 'chat' && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
              <Sparkles className="h-8 w-8 text-primary opacity-60" />
              <div>
                <p className="font-medium text-foreground">Chat AI próximamente</p>
                <p className="mt-1">
                  El asistente conversacional con Claude Haiku se habilita en v3.2 después de definir las
                  variables de entorno y el endpoint <code className="text-xs">/api/chat</code>.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setTab('preguntas')} className="gap-1.5 mt-3">
                <ChevronLeft className="h-3.5 w-3.5" /> Volver a Preguntas
              </Button>
            </div>
          )}
        </div>

        <footer className="border-t px-4 py-2 text-[10px] text-muted-foreground">
          Asistente local · {cop?.shortName ?? cop?.name ?? 'CoP'} · sin servidor
        </footer>
      </aside>

      {/* backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          aria-hidden
        />
      )}
    </>
  );
}
