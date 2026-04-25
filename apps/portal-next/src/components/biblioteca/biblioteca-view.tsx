'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, BookMarked, FileText, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { canonicPaper, community, note } from '#site/content';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { COMPREHENSION_REGISTRY } from '@/lib/comprehension';
import { cn } from '@/lib/utils';

type DocItem = {
  id: string;
  type: 'paper' | 'note';
  title: string;
  description: string;
  href: string;
  progress: number;
  hasComprehension: boolean;
  metaTop?: string;
  metaTags?: string[];
};

export function BibliotecaView({ community: c }: { community: typeof community[number] }) {
  const [readingState, setReadingState] = useState<ReadingState | null>(null);

  useEffect(() => {
    setReadingState(getReadingState());
    const onChange = () => setReadingState(getReadingState());
    window.addEventListener('reading-state-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('reading-state-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const items: DocItem[] = useMemo(() => {
    const result: DocItem[] = [];
    const cites = c.cites ?? [];

    // Papers canónicos citados
    for (const pid of cites) {
      const p = canonicPaper.find((x) => x.id === pid);
      if (!p) continue;
      const progress = readingState?.docs[p.id]?.progress ?? 0;
      result.push({
        id: p.id,
        type: 'paper',
        title: p.title,
        description: p.description,
        href: `/${c.slug}/biblioteca/${p.id}`,
        progress,
        hasComprehension: !!COMPREHENSION_REGISTRY[p.id],
        metaTop: `M${String(p.number).padStart(2, '0')} · ${p.crispPhase}`,
        metaTags: p.tags?.slice(0, 3),
      });
    }

    // Notas del vault de la CoP (incluyendo sub-comunidades)
    const notesInVault = note.filter(
      (n) => n.communitySlug === c.slug || n.communitySlug.startsWith(c.slug + '/'),
    );
    for (const n of notesInVault) {
      const progress = readingState?.docs[n.slug]?.progress ?? 0;
      result.push({
        id: n.slug,
        type: 'note',
        title: n.title,
        description: n.tags.slice(0, 4).map((t) => `#${t}`).join(' '),
        href: `/${c.slug}/biblioteca/${encodeURIComponent(n.slug)}`,
        progress,
        hasComprehension: !!COMPREHENSION_REGISTRY[n.slug],
        metaTop: 'Nota del vault',
        metaTags: n.tags.slice(0, 3),
      });
    }

    return result;
  }, [c, readingState]);

  const totalProgress = items.length > 0
    ? Math.round(items.reduce((acc, i) => acc + i.progress, 0) / items.length)
    : 0;
  const readCount = items.filter((i) => i.progress >= 100).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${c.slug}`} className="hover:text-foreground">
          {c.shortName ?? c.name}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Biblioteca</span>
      </nav>

      <header className="mb-8">
        <Link
          href={`/${c.slug}`}
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Volver al tablero
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="outline" className="mb-2 gap-1">
              <BookMarked className="h-3.5 w-3.5" />
              Servicio · Biblioteca
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Biblioteca · {c.shortName ?? c.name}
            </h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Documentos de investigación que fundan esta comunidad y notas vivas del vault. Cada
              documento se marca como leído al recorrer sus secciones; algunas tienen preguntas de
              comprensión opcionales.
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Progreso global</div>
            <div className="text-3xl font-bold tracking-tight">
              {totalProgress}<span className="text-base font-normal text-muted-foreground">%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {readCount} / {items.length} completos
            </div>
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Esta comunidad aún no tiene documentos asociados. Cuando alguien cite un paper canónico
            o agregue una nota al vault, aparecerá aquí.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((doc) => (
            <Link key={doc.id} href={doc.href} className="group block">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                      {doc.type === 'paper' ? <BookMarked className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                      <span>{doc.metaTop}</span>
                    </div>
                    {doc.hasComprehension && (
                      <Badge variant="secondary" className="gap-1 text-[10px]">
                        <Sparkles className="h-3 w-3" />
                        guiada
                      </Badge>
                    )}
                  </div>
                  <h3 className="line-clamp-2 text-base font-semibold leading-snug">{doc.title}</h3>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{doc.description}</p>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>
                        {doc.progress === 0 ? 'No leído' : doc.progress >= 100 ? 'Completado' : 'En progreso'}
                      </span>
                      <span className="font-mono">{doc.progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          doc.progress >= 100
                            ? 'bg-emerald-500'
                            : doc.progress >= 50
                              ? 'bg-amber-500'
                              : doc.progress > 0
                                ? 'bg-blue-500'
                                : 'bg-muted-foreground/30',
                        )}
                        style={{ width: `${doc.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline" size="sm">
          <Link href={`/${c.slug}`}>
            <ChevronLeft className="mr-1.5 h-3.5 w-3.5" />
            Volver al tablero de la CoP
          </Link>
        </Button>
      </div>
    </div>
  );
}
