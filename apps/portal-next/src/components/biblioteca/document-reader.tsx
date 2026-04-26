'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronLeft, ChevronRight, Lock, BookMarked, FileText, Hash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { MDXWithHoverPreview } from '@/components/mdx-with-hover-preview';
import { PrintButton } from '@/components/print-button';
import { SectionGate } from './section-gate';
import { getReadingState, markSection, type SectionStatus } from '@/lib/reading-state';
import type { DocumentComprehension } from '@/lib/comprehension';

type DocMeta = {
  id: string;
  title: string;
  description?: string;
  body: string;
  type: 'paper' | 'note';
  metaLabels?: string[];
  href: string;
};

export function DocumentReader({
  doc,
  copSlug,
  copName,
  comprehension,
}: {
  doc: DocMeta;
  copSlug: string;
  copName: string;
  comprehension: DocumentComprehension | null;
}) {
  const sections = comprehension?.sections ?? [];
  const totalSections = sections.length;

  const [statuses, setStatuses] = useState<Record<string, SectionStatus>>({});
  const [currentIdx, setCurrentIdx] = useState(0);

  // load initial state
  useEffect(() => {
    const state = getReadingState();
    setStatuses(state.docs[doc.id]?.sections ?? {});
    // resume at next non-completed section
    if (sections.length > 0) {
      const firstUnfinished = sections.findIndex(
        (s) => !['completed', 'verified'].includes(state.docs[doc.id]?.sections[s.anchor] ?? 'unread'),
      );
      if (firstUnfinished >= 0) setCurrentIdx(firstUnfinished);
      else setCurrentIdx(sections.length); // todas completas
    }
  }, [doc.id, sections]);

  const completedCount = useMemo(
    () => sections.filter((s) => ['completed', 'verified'].includes(statuses[s.anchor])).length,
    [sections, statuses],
  );
  const progress = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  function completeSection(anchor: string, asVerified: boolean) {
    const newState = markSection(doc.id, anchor, asVerified ? 'verified' : 'completed', totalSections);
    setStatuses(newState.docs[doc.id]?.sections ?? {});
    setCurrentIdx((i) => Math.min(i + 1, totalSections));
  }

  // Marca todo el documento como leído cuando no hay secciones (sin comprehension data)
  function markFullDoc() {
    if (sections.length === 0) {
      // Tratamos el documento entero como una sola sección sintética
      const newState = markSection(doc.id, '_full', 'completed', 1);
      setStatuses(newState.docs[doc.id]?.sections ?? {});
    }
  }

  const fullDocCompleted = sections.length === 0 && (statuses._full === 'completed' || statuses._full === 'verified');

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      {/* breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground no-print">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${copSlug}`} className="hover:text-foreground">{copName}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${copSlug}/biblioteca`} className="hover:text-foreground">Biblioteca</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground line-clamp-1">{doc.title}</span>
      </nav>

      {/* header */}
      <header className="mb-6 no-print">
        <Link
          href={`/${copSlug}/biblioteca`}
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Volver a la biblioteca
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Badge variant="outline" className="mb-2 gap-1">
              {doc.type === 'paper' ? <BookMarked className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
              {doc.type === 'paper' ? 'Paper canónico · MI-12' : 'Nota del vault'}
            </Badge>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{doc.title}</h1>
            {doc.description && <p className="mt-2 text-base text-muted-foreground">{doc.description}</p>}
            {doc.metaLabels && doc.metaLabels.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {doc.metaLabels.map((m) => (
                  <Badge key={m} variant="secondary" className="text-[10px]">
                    <Hash className="mr-0.5 h-3 w-3 opacity-60" />
                    {m}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <PrintButton />
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Progreso</div>
              <div className="text-2xl font-bold tracking-tight">
                {progress}<span className="text-base font-normal text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* progress bar */}
      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-muted no-print">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            progress >= 100 ? 'bg-emerald-500' : 'bg-primary',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        {/* main */}
        <main className="min-w-0 space-y-6">
          {/* if comprehension present, show structured guided flow */}
          {sections.length > 0 ? (
            <>
              {/* progressive sections */}
              {sections.map((s, idx) => {
                const status = statuses[s.anchor] ?? 'unread';
                const completed = status === 'completed' || status === 'verified';
                const isCurrent = idx === currentIdx;
                const locked = idx > currentIdx;

                return (
                  <section
                    key={s.anchor}
                    id={s.anchor}
                    className={cn(
                      'scroll-mt-20 rounded-lg border p-5 transition-opacity',
                      locked && 'opacity-50',
                    )}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(idx + 1).padStart(2, '0')} /{' '}
                          {String(sections.length).padStart(2, '0')}
                        </span>
                        <h2 className="text-xl font-semibold">{s.heading}</h2>
                      </div>
                      <div>
                        {locked && <Badge variant="outline" className="gap-1 text-[10px]"><Lock className="h-3 w-3" /> bloqueada</Badge>}
                        {completed && (
                          <Badge className="gap-1 border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px]">
                            <CheckCircle2 className="h-3 w-3" /> {status === 'verified' ? 'verificada' : 'leída'}
                          </Badge>
                        )}
                        {isCurrent && !completed && <Badge className="text-[10px]">en lectura</Badge>}
                      </div>
                    </div>

                    {locked ? (
                      <p className="text-sm text-muted-foreground">
                        Completa la sección anterior para desbloquear esta.
                      </p>
                    ) : (
                      <>
                        {s.summary && (
                          <p className="mb-4 text-sm text-muted-foreground">{s.summary}</p>
                        )}

                        {/* Si es la sección actual, render del cuerpo MDX completo solo en la primera sección */}
                        {idx === 0 && (
                          <div className="prose-paper">
                            <MDXWithHoverPreview code={doc.body} />
                          </div>
                        )}

                        {idx > 0 && (
                          <div className="rounded bg-muted/40 p-4 text-sm">
                            <p className="font-medium">Lectura sugerida:</p>
                            <p className="text-muted-foreground">
                              Repasa la sección «{s.heading}» del documento arriba, luego responde la pregunta.
                            </p>
                          </div>
                        )}

                        {/* Gate o auto-complete */}
                        {!completed && (
                          isCurrent && (
                            s.question ? (
                              <div className="mt-4">
                                <SectionGate
                                  question={s.question}
                                  onComplete={(outcome) => {
                                    completeSection(s.anchor, outcome === 'correct');
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="mt-4 flex justify-end">
                                <Button
                                  size="sm"
                                  className="gap-1.5"
                                  onClick={() => completeSection(s.anchor, false)}
                                >
                                  Marcar como leída <ArrowRight />
                                </Button>
                              </div>
                            )
                          )
                        )}
                      </>
                    )}
                  </section>
                );
              })}

              {currentIdx >= sections.length && (
                <Card className="border-emerald-500/30 bg-emerald-500/5">
                  <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    <h3 className="text-lg font-semibold">Documento completo</h3>
                    <p className="text-sm text-muted-foreground">
                      Has recorrido las {sections.length} secciones de este documento.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/${copSlug}/biblioteca`}>Volver a la biblioteca</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <>
              <div className="prose-paper">
                <MDXWithHoverPreview code={doc.body} />
              </div>
              <Separator />
              <div className="flex justify-between">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/${copSlug}/biblioteca`}>← Volver</Link>
                </Button>
                <Button
                  size="sm"
                  variant={fullDocCompleted ? 'outline' : 'default'}
                  onClick={markFullDoc}
                  disabled={fullDocCompleted}
                  className="gap-1.5"
                >
                  {fullDocCompleted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Marcado como leído
                    </>
                  ) : (
                    <>
                      Marcar como leído <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </main>

        {/* TOC + meta sidebar */}
        <aside className="hidden lg:block no-print">
          <div className="sticky top-20 space-y-4">
            {sections.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Secciones
                </h3>
                <ol className="space-y-1 text-sm">
                  {sections.map((s, idx) => {
                    const status = statuses[s.anchor] ?? 'unread';
                    const done = status === 'completed' || status === 'verified';
                    const locked = idx > currentIdx;
                    return (
                      <li key={s.anchor}>
                        <a
                          href={locked ? undefined : `#${s.anchor}`}
                          className={cn(
                            'flex items-center justify-between gap-2 rounded px-2 py-1',
                            locked && 'pointer-events-none opacity-50',
                            !locked && 'hover:bg-muted',
                            done && 'text-emerald-600 dark:text-emerald-400',
                          )}
                        >
                          <span className="line-clamp-1">{s.heading}</span>
                          {done ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          ) : locked ? (
                            <Lock className="h-3.5 w-3.5 shrink-0" />
                          ) : (
                            <span className="text-[10px] opacity-60">{idx + 1}</span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ArrowRight() {
  return <ChevronRight className="h-3.5 w-3.5" />;
}
