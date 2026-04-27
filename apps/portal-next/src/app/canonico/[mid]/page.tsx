import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Clock, FileText, Hash } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MDXWithHoverPreview } from '@/components/mdx-with-hover-preview';
import { DocTabsBar } from '@/components/biblioteca/doc-tabs-bar';
import { MermaidRenderer } from '@/components/biblioteca/mermaid-renderer';
import { ComprehensionInline } from '@/components/biblioteca/comprehension-inline';
import { PresaberesCallout } from '@/components/biblioteca/presaberes-callout';
import { DeliberacionPanel } from '@/components/biblioteca/deliberacion-panel';
import { ComparativeSplit, CompareButton } from '@/components/workspace/workspace-shell';
import { InfographicQuickstart, InfographicBadge } from '@/components/biblioteca/infographic-quickstart';
import { PrintButton } from '@/components/print-button';
// v5.0e · SplitWorkArea removed — el grafo local del paper ahora vive
// exclusivamente en `Conexiones › Grafo` del right panel. Render duplicado
// en el centro era herencia v4.0/v4.4 que ya no aporta valor con el shell
// rebalanceado de v4.5.
import { canonicPaper, note } from '#site/content';
import type { Metadata } from 'next';

// v5.0k · Force dynamic rendering — el HTML compilado de algunos papers
// (callouts Obsidian-style con SVG inline + Mermaid raw escape) no es
// estricto-válido y rompe el SSG strict mode con "Invalid tag: div<".
// dynamic='force-dynamic' renderea en server runtime con tolerancia mayor.
// Trade-off: TTFB ~50ms más en cold start, cubierto por Vercel CDN cache.
export const dynamic = 'force-dynamic';

const PHASE_LABEL: Record<string, string> = {
  business: 'Business Understanding',
  'data-understanding': 'Data Understanding',
  'data-prep': 'Data Preparation',
  modeling: 'Modeling',
  evaluation: 'Evaluation',
  deployment: 'Deployment',
};

const RUTAS_LABEL: Record<string, string> = {
  R1: 'R1 · Gobernanza',
  R2: 'R2 · Periferia',
  R3: 'R3 · Sector',
  R4: 'R4 · Misión',
  R5: 'R5 · Cultura',
};

export function generateStaticParams() {
  return canonicPaper.map((p) => ({ mid: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mid: string }>;
}): Promise<Metadata> {
  const { mid } = await params;
  const paper = canonicPaper.find((p) => p.id === mid);
  if (!paper) return {};
  return { title: paper.title, description: paper.description };
}

export default async function PaperPage({ params }: { params: Promise<{ mid: string }> }) {
  const { mid } = await params;
  const paper = canonicPaper.find((p) => p.id === mid);
  if (!paper) notFound();

  // Backlinks: notas que citen este paper
  const backlinks = note.filter((n) => n.cites?.includes(mid));

  // v5.0n · Layout infografia-quickstart vs standard.
  // El frontmatter `kd_doc_layout` lo activa el autor por paper.
  const isInfographic = paper.kd_doc_layout === 'infografia-quickstart';
  const article = (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      {/* Tabs estilo Obsidian (sólo si hay >1 tab) */}
      <DocTabsBar />
      {/* Top nav */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground no-print">
        <Link href="/canonico" className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Canónico
        </Link>
        <span>/</span>
        <span className="font-mono">M{String(paper.number).padStart(2, '0')}</span>
      </div>

      <div className="min-w-0">
        <main className="min-w-0">
          {/* Hero */}
          <header className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="font-mono">M{String(paper.number).padStart(2, '0')}</Badge>
              <Badge variant="outline">{PHASE_LABEL[paper.crispPhase] ?? paper.crispPhase}</Badge>
              <span className={`tdd-${paper.status}`}>
                {paper.status === 'red' ? '🔴 RED' : paper.status === 'yellow' ? '🟡 PR' : '🟢 LIVE'}
              </span>
              {isInfographic && <InfographicBadge />}
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {paper.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              {paper.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {paper.metadata?.readingTime && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {paper.metadata.readingTime} min lectura
                </span>
              )}
              {paper.metadata?.wordCount && (
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {paper.metadata.wordCount.toLocaleString()} palabras
                </span>
              )}
              <div className="ml-auto no-print flex items-center gap-2">
                <CompareButton currentPaperId={mid} />
                <PrintButton />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {paper.rutaClark.map((r) => (
                <span
                  key={r}
                  className={`ruta-${r.toLowerCase()} rounded-full px-2 py-0.5 text-[10px] font-semibold`}
                >
                  {RUTAS_LABEL[r] ?? r}
                </span>
              ))}
              {paper.tags.map((t) => (
                <Badge key={t} variant="secondary" className="text-[10px]">
                  <Hash className="mr-0.5 h-3 w-3 opacity-60" />
                  {t}
                </Badge>
              ))}
            </div>
          </header>

          <Separator className="my-6 no-print" />

          {/* v4.3b — Pre-saberes (auto-detect glosario refs) */}
          <PresaberesCallout body={paper.body} />

          {/* Body */}
          <div className="prose-paper">
            <MDXWithHoverPreview code={paper.body} />
            {/* Render Mermaid diagrams client-side (Vercel CI no tiene Chromium) */}
            <MermaidRenderer deps={[mid]} />
          </div>

          {/* v4.3c — Preguntas de comprensión transcluidas (cristalizan misión, top-down) */}
          <ComprehensionInline paperId={mid} />

          {/* v4.5b D8 — Deliberación de la comunidad (bottom-up, localStorage MVP) */}
          <DeliberacionPanel paperId={mid} />

          {/* Backlinks */}
          {backlinks.length > 0 && (
            <section className="mt-12 backlinks-panel no-print">
              <Separator className="mb-6" />
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Referenciado en
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {backlinks.map((b) => (
                  <Link key={b.href} href={b.href}>
                    <Card className="p-3 transition-colors hover:border-primary/50 hover:bg-accent/30">
                      <div className="text-sm font-medium">{b.title}</div>
                      <div className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
                        {b.communitySlug}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Print-only header (visible only when printing) */}
          <div className="print-only mt-12 border-t pt-4 text-xs text-muted-foreground">
            reforma·ud · CSU 04/2025 · M{String(paper.number).padStart(2, '0')} · CC BY-SA 4.0
          </div>
        </main>
      </div>
    </article>
  );

  // Si es infografía-quickstart, layout 3-zone (TOC izq + body + grafo der).
  // Si no, layout standard con ComparativeSplit (workspace shell N-pane).
  // v5.0o · activeDoc lo resuelve InfographicQuickstart internamente
  // (es 'use client'); evita llamar getActiveDocFromPath desde server.
  return isInfographic ? (
    <InfographicQuickstart paperId={mid}>
      {article}
    </InfographicQuickstart>
  ) : (
    <ComparativeSplit>
      {article}
    </ComparativeSplit>
  );
}

// El TOC ahora vive en el sidebar izquierdo (PaperItem.toc inline) y en el right-panel
// (Outline tab). Ya no se renderiza en la página del paper para liberar espacio central.
