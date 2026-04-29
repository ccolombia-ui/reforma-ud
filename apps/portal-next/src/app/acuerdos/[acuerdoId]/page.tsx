import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Scale, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { MDXWithHoverPreview } from '@/components/mdx-with-hover-preview';
import { HeadingScrollSpy } from '@/components/heading-scroll-spy';
import { csuAcuerdo } from '#site/content';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return csuAcuerdo.map((a) => ({ acuerdoId: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ acuerdoId: string }>;
}): Promise<Metadata> {
  const { acuerdoId } = await params;
  const a = csuAcuerdo.find((x) => x.id === acuerdoId);
  if (!a) return {};
  return {
    title: a.objetoCorto ?? a.titulo,
    description: `Acuerdo CSU UDFJC · ${a.implementaArticulo ?? 'Art. 98'} · ${a.estado}`,
  };
}

const ESTADO_COLOR: Record<string, string> = {
  BORRADOR:       'bg-gray-500/20 text-gray-400 border-gray-500/30',
  EN_REVISION:    'bg-amber-500/20 text-amber-400 border-amber-500/30',
  PRE_APROBADO:   'bg-sky-500/20 text-sky-400 border-sky-500/30',
  APROBADO:       'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  VIGENTE:        'bg-green-500/20 text-green-500 border-green-500/30',
  MODIFICADO:     'bg-violet-500/20 text-violet-400 border-violet-500/30',
  DEROGADO:       'bg-red-500/20 text-red-400 border-red-500/30',
  DRAFT:          'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default async function AcuerdoPage({
  params,
}: {
  params: Promise<{ acuerdoId: string }>;
}) {
  const { acuerdoId } = await params;
  const a = csuAcuerdo.find((x) => x.id === acuerdoId);
  if (!a) notFound();

  const estadoClass = ESTADO_COLOR[a.estado] ?? ESTADO_COLOR.DRAFT;

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground no-print">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Inicio
        </Link>
        <span>/</span>
        <span className="text-foreground/70">CSU — Estatutos</span>
        <span>/</span>
        <span className="font-mono text-xs">{a.id.toUpperCase()}</span>
      </div>

      {/* Hero */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="font-mono text-[10px] border-blue-500/40 text-blue-400 bg-blue-500/10"
          >
            <Scale className="mr-1 h-3 w-3" />
            CSU · {a.organo}
          </Badge>
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${estadoClass}`}>
            {a.estado === 'VIGENTE' || a.estado === 'APROBADO'
              ? <CheckCircle className="h-3 w-3" />
              : <Clock className="h-3 w-3" />}
            {a.estado}
          </span>
          {a.implementaArticulo && (
            <span className="text-[11px] text-muted-foreground font-mono">
              {a.implementaArticulo} ACU-004-25
            </span>
          )}
          {a.numero && (
            <span className="text-[11px] text-muted-foreground">
              Acuerdo No. {a.numero}
            </span>
          )}
        </div>

        <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
          {a.objetoCorto}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {a.titulo}
        </p>
      </header>

      {/* Índice de capítulos */}
      {a.capitulos.length > 0 && (
        <Card className="mb-6 p-4 bg-muted/20">
          <div className="mb-2 text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">
            Unidades organizativas reglamentadas
          </div>
          <div className="flex flex-wrap gap-1.5">
            {a.capitulos.map((cap) => (
              <span
                key={cap.id}
                className="rounded-md border bg-card px-2.5 py-1 text-xs font-mono hover:bg-accent/30"
              >
                {cap.id.toUpperCase()}
              </span>
            ))}
          </div>
        </Card>
      )}

      <Separator className="my-6" />

      {/* Body */}
      <div className="prose-paper">
        <MDXWithHoverPreview code={a.body} />
      </div>

      {/* Footer */}
      <div className="mt-12 border-t pt-4 text-[10px] text-muted-foreground">
        <span className="font-mono">{a.id.toUpperCase()}</span>
        {a.vigentDesde && <span> · Vigente desde: {a.vigentDesde}</span>}
        <span> · CC BY-SA 4.0 · UDFJC · 2026</span>
      </div>

      <HeadingScrollSpy />
    </article>
  );
}
