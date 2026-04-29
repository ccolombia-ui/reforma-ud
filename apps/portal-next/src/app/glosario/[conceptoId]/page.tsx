import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, BookOpen, ExternalLink, Hash, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Discusiones } from '@/components/comunidad/discusiones';
import { HeadingScrollSpy } from '@/components/heading-scroll-spy';
import { concepto, canonicPaper, note } from '#site/content';
import { ConceptoBodyClient, slugFromWikilink } from '@/components/glosario';
import type { TuplaRelation } from '@/components/glosario';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return concepto.map((c) => ({ conceptoId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ conceptoId: string }>;
}): Promise<Metadata> {
  const { conceptoId } = await params;
  const c = concepto.find((x) => x.id === conceptoId);
  if (!c) return {};
  return {
    title: c.skos_prefLabel ?? c.kd_title,
    description: c.skos_definition?.slice(0, 160),
  };
}

/**
 * /glosario/[conceptoId] · v5.0h — vista detalle de un concepto del glosario.
 *
 * Renderiza:
 *   • Header con label + altLabels + iso_subject_field
 *   • SKOS definition + scope note + example
 *   • Body markdown completo (con secciones del concepto-universal)
 *   • Backlinks: papers M01-M12 que citan el concepto via [[con-*]] o [[glo-*]]
 */
export default async function ConceptoPage({ params }: { params: Promise<{ conceptoId: string }> }) {
  const { conceptoId } = await params;
  const c = concepto.find((x) => x.id === conceptoId);
  if (!c) notFound();

  // Backlinks: buscar wikilinks [[con-id]] o [[glo-id]] en el body de papers/notes
  const lookupId = c.id.toLowerCase();
  const altLookupId = c.id.toLowerCase().replace(/^con-/, 'glo-'); // compat retro
  const re = new RegExp(`/(glosario)/(${lookupId}|${altLookupId})\\b`, 'i');

  const paperBacklinks = canonicPaper.filter((p) => re.test(p.body));
  const noteBacklinks = note.filter((n) => re.test(n.body));

  // v8 S4 · Pre-compute reverse prereq lookup server-side (no client iteration)
  const habilita = concepto
    .filter((x) =>
      (x.concepto_prerequisitos ?? []).some(
        (p: string) => slugFromWikilink(p) === c.id
      )
    )
    .map((x) => x.id);

  const conceptoTPLData = {
    id: c.id,
    kd_title: c.kd_title,
    skos_prefLabel: c.skos_prefLabel,
    concepto_capabilities: c.concepto_capabilities ?? [],
    concepto_facet_normative: c.concepto_facet_normative,
    concepto_prerequisitos: c.concepto_prerequisitos ?? [],
    concepto_definitional_anchors: c.concepto_definitional_anchors ?? [],
    concepto_current_anchor: c.concepto_current_anchor,
    concepto_anchor_chain_status: c.concepto_anchor_chain_status,
    tupla__relations: (c.tupla__relations as TuplaRelation[]) ?? [],
    rol_seleccionado: c.rol_seleccionado,
    applicable_domain: c.applicable_domain,
    assumptions: c.assumptions ?? [],
    breaks_at: c.breaks_at ?? [],
    valid_from: c.valid_from,
    valid_to: c.valid_to,
    cited_in: c.cited_in ?? [],
    cited_count: c.cited_count ?? 0,
    habilita,
  };

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
      {/* Top nav */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground no-print">
        <Link href="/glosario" className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Glosario
        </Link>
        <span>/</span>
        <span className="font-mono text-xs">{c.id}</span>
      </div>

      {/* Hero */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className="font-mono text-[10px]">
            <BookOpen className="mr-1 h-3 w-3" />
            CONCEPTO
          </Badge>
          {c.iso_subject_field && (
            <Badge variant="outline" className="text-[10px]">{c.iso_subject_field}</Badge>
          )}
          {c.kd_status && (
            <Badge variant="secondary" className="text-[10px]">{c.kd_status}</Badge>
          )}
          {c.skos_notation && (
            <span className="font-mono text-[11px] text-muted-foreground">
              {c.skos_notation}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {c.skos_prefLabel ?? c.kd_title}
        </h1>
        {c.skos_altLabel.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <span className="text-[10px] uppercase tracking-wide">Alias:</span>
            {c.skos_altLabel.map((alt) => (
              <span key={alt} className="rounded-md border bg-muted/30 px-2 py-0.5 italic">
                {alt}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* SKOS definition card destacada */}
      {c.skos_definition && (
        <Card className="mb-6 border-l-4 border-primary/60 bg-primary/5 p-4">
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-primary/80">
            <Quote className="h-3 w-3" />
            Definición SKOS
          </div>
          <p className="text-sm leading-relaxed">{c.skos_definition}</p>
        </Card>
      )}

      {c.skos_scopeNote && (
        <div className="mb-4 rounded-md border-l-4 border-amber-500/40 bg-amber-500/5 p-3 text-xs">
          <div className="mb-1 font-semibold text-amber-700 dark:text-amber-300">Nota de alcance</div>
          <p className="leading-relaxed">{c.skos_scopeNote}</p>
        </div>
      )}

      {c.skos_example && (
        <div className="mb-4 rounded-md border-l-4 border-emerald-500/40 bg-emerald-500/5 p-3 text-xs">
          <div className="mb-1 font-semibold text-emerald-700 dark:text-emerald-300">Ejemplo</div>
          <p className="leading-relaxed">{c.skos_example}</p>
        </div>
      )}

      <Separator className="my-6" />

      {/* Body markdown completo — v8 S4: usa ConceptoBodyClient (superset de
          MDXWithHoverPreview). Mientras S5 no active sentinel emission, el
          output es byte-idéntico al de MDXWithHoverPreview. */}
      <div className="prose-paper">
        <ConceptoBodyClient code={c.body} data={conceptoTPLData} />
      </div>

      {/* ISO 1087 metadata */}
      {(c.iso_genus || c.iso_differentia) && (
        <section className="mt-10 rounded-lg border bg-muted/20 p-4">
          <h2 className="mb-3 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            <Hash className="h-3 w-3" />
            ISO 1087 · terminografía formal
          </h2>
          <dl className="grid gap-2 text-xs sm:grid-cols-2">
            {c.iso_genus && (
              <div>
                <dt className="font-semibold text-foreground/70">Género próximo</dt>
                <dd className="text-muted-foreground">{c.iso_genus}</dd>
              </div>
            )}
            {c.iso_differentia && (
              <div>
                <dt className="font-semibold text-foreground/70">Diferencia específica</dt>
                <dd className="text-muted-foreground">{c.iso_differentia}</dd>
              </div>
            )}
          </dl>
        </section>
      )}

      {/* Backlinks */}
      {(paperBacklinks.length + noteBacklinks.length) > 0 && (
        <section className="mt-10 no-print">
          <Separator className="mb-6" />
          <h2 className="mb-3 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            <ExternalLink className="h-3 w-3" />
            Citado en
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {paperBacklinks.map((p) => (
              <Link key={p.id} href={p.href}>
                <Card className="p-3 transition-colors hover:border-primary/50 hover:bg-accent/30">
                  <div className="font-mono text-[10px] text-primary">
                    M{String(p.number).padStart(2, '0')}
                  </div>
                  <div className="mt-0.5 text-sm font-medium leading-tight">{p.title}</div>
                </Card>
              </Link>
            ))}
            {noteBacklinks.map((n) => (
              <Link key={n.slug} href={n.href}>
                <Card className="p-3 transition-colors hover:border-primary/50 hover:bg-accent/30">
                  <div className="text-sm font-medium leading-tight">{n.title}</div>
                  <div className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
                    {n.communitySlug}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* v7.2 — Discusiones por concepto */}
      <Discusiones term={`concepto:${c.id}`} />

      {/* v7.4 G11 — deep-link al heading + click-to-copy */}
      <HeadingScrollSpy />

      {/* Footer mínimo */}
      <div className="mt-12 border-t pt-4 text-[10px] text-muted-foreground">
        <span className="font-mono">{c.kd_id}</span>
        {c.kd_version && <span> · v{c.kd_version}</span>}
      </div>
    </article>
  );
}
