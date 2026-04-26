'use client';

import { useMemo, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { Columns2, X, ArrowLeftRight, GripVertical } from 'lucide-react';
import { canonicPaper } from '#site/content';
import { Button } from '@/components/ui/button';
import { MDXWithHoverPreview } from '@/components/mdx-with-hover-preview';
import { MermaidRenderer } from '@/components/biblioteca/mermaid-renderer';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const COMPARE_PARAM = 'compare';

/**
 * ComparativeSplit — wrapper que muestra el doc actual + un doc opcional a la derecha.
 *
 * Activación: URL `?compare=m04` → muestra m04 en pane B.
 *
 * Cuando split está activo:
 *   - Pane A: contenido actual (children)
 *   - Pane B: paper comparativo (renderizado con MDX + Mermaid)
 *
 * Sin compare: render directo de children.
 */
export function ComparativeSplit({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<>{children}</>}>
      <ComparativeSplitInner>{children}</ComparativeSplitInner>
    </Suspense>
  );
}

function ComparativeSplitInner({ children }: Readonly<{ children: React.ReactNode }>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const compareId = searchParams.get(COMPARE_PARAM);
  const comparePaper = useMemo(() => {
    if (!compareId) return null;
    return canonicPaper.find((p) => p.id === compareId.toLowerCase()) ?? null;
  }, [compareId]);

  const closeCompare = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(COMPARE_PARAM);
    const newSearch = params.toString();
    router.replace(`${pathname}${newSearch ? '?' + newSearch : ''}`, { scroll: false });
  }, [searchParams, router, pathname]);

  // Sin compare → render normal
  if (!comparePaper) {
    return <>{children}</>;
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] no-print">
      <Group orientation="horizontal" id="comparative-workspace" className="flex h-full">
        {/* Pane A — contenido actual */}
        <Panel id="pane-a" defaultSize={50} minSize={25} className="overflow-y-auto">
          <div className="px-4 md:px-6 py-2 sticky top-0 bg-background/95 backdrop-blur z-10 border-b">
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="secondary" className="font-mono text-[9px]">A</Badge>
              <span className="font-medium text-muted-foreground">Doc actual</span>
            </div>
          </div>
          <div className="px-4 md:px-6 py-4">
            {children}
          </div>
        </Panel>

        <Separator className="group relative w-1.5 bg-border hover:bg-primary/40 data-[dragging=true]:bg-primary transition-colors cursor-col-resize">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Separator>

        {/* Pane B — paper comparativo */}
        <Panel id="pane-b" defaultSize={50} minSize={25} className="overflow-y-auto">
          <div className="px-4 md:px-6 py-2 sticky top-0 bg-background/95 backdrop-blur z-10 border-b flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs min-w-0">
              <Badge variant="secondary" className="font-mono text-[9px]">B</Badge>
              <span className="font-mono text-[10px] text-primary shrink-0">M{String(comparePaper.number).padStart(2, '0')}</span>
              <span className="font-medium truncate">{comparePaper.title}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={closeCompare} aria-label="Cerrar comparación">
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <article className="px-4 md:px-6 py-6 prose-paper">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight">{comparePaper.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{comparePaper.description}</p>
            <hr className="my-4" />
            <MDXWithHoverPreview code={comparePaper.body} />
            <MermaidRenderer deps={[comparePaper.id]} />
          </article>
        </Panel>
      </Group>
    </div>
  );
}

/* ============================================================
 * CompareButton — toggle del compare desde la barra de tabs/header del paper
 * ============================================================ */

export function CompareButton({ currentPaperId }: Readonly<{ currentPaperId: string }>) {
  return (
    <Suspense fallback={null}>
      <CompareButtonInner currentPaperId={currentPaperId} />
    </Suspense>
  );
}

function CompareButtonInner({ currentPaperId }: Readonly<{ currentPaperId: string }>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const compareId = searchParams.get(COMPARE_PARAM);

  const otherPapers = canonicPaper
    .filter((p) => p.id !== currentPaperId)
    .sort((a, b) => a.number - b.number);

  function setCompare(id: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set(COMPARE_PARAM, id);
    else params.delete(COMPARE_PARAM);
    const newSearch = params.toString();
    router.replace(`${pathname}${newSearch ? '?' + newSearch : ''}`, { scroll: false });
    setOpen(false);
  }

  return (
    <div className="relative">
      <Button
        variant={compareId ? 'default' : 'outline'}
        size="sm"
        className="gap-1.5 no-print"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Comparar con otro paper (vista lado a lado)"
      >
        {compareId ? <ArrowLeftRight className="h-3.5 w-3.5" /> : <Columns2 className="h-3.5 w-3.5" />}
        {compareId ? `Comparando con M${compareId.replace('m', '').padStart(2, '0').toUpperCase()}` : 'Comparar'}
      </Button>

      {open && (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="fixed inset-0 z-30 cursor-default"
          />
          <div className="absolute right-0 top-full mt-1 z-40 w-72 rounded-md border bg-popover shadow-lg overflow-hidden">
            <div className="border-b px-3 py-2 text-[10px] uppercase tracking-wide text-muted-foreground bg-muted/30">
              Comparar este paper con…
            </div>
            <div className="max-h-80 overflow-y-auto py-1">
              {compareId && (
                <button
                  type="button"
                  onClick={() => setCompare(null)}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs hover:bg-destructive/10 text-destructive border-b"
                >
                  <X className="h-3.5 w-3.5" />
                  Cerrar comparación actual
                </button>
              )}
              {otherPapers.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCompare(p.id)}
                  className={cn(
                    'flex w-full items-start gap-2 px-3 py-2 text-left text-xs hover:bg-accent transition-colors',
                    compareId === p.id && 'bg-accent/50',
                  )}
                >
                  <span className="font-mono text-[9px] text-muted-foreground mt-0.5">
                    M{String(p.number).padStart(2, '0')}
                  </span>
                  <span className="line-clamp-2">{p.title}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
