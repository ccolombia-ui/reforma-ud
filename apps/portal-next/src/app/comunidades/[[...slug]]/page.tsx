import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, FileText, BookMarked, Building2, GraduationCap, Microscope, Globe, Landmark } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MDXWithHoverPreview } from '@/components/mdx-with-hover-preview';
import { PrintButton } from '@/components/print-button';
import { VisNetworkGraph } from '@/components/graph/vis-network-graph';
import { DashboardCop } from '@/components/dashboard/dashboard-cop';
import { ServiceTiles } from '@/components/dashboard/service-tiles';
import { BibliotecaView } from '@/components/biblioteca/biblioteca-view';
import { DocumentReader } from '@/components/biblioteca/document-reader';
import { NoticiasRelacionadas } from '@/components/comunidad/noticias-relacionadas';
import { ComunidadDefinicion } from '@/components/comunidad/comunidad-definicion';
import { MisionesColectivas } from '@/components/comunidad/misiones-colectivas';
import { type MisionCoP } from '@/components/comunidad/cop-mission-card';
import { CoPMissionsPanel } from '@/components/comunidad/cop-missions-panel';
import { CoPMissionPage } from '@/components/comunidad/cop-mission-page';
import { CoPAccessPanel } from '@/components/comunidad/cop-access-panel';
import { RolesGrid } from '@/components/comunidad/roles-grid';
import { GlosarioComunidad } from '@/components/comunidad/glosario-comunidad';
import { Discusiones } from '@/components/comunidad/discusiones';
import { ComunidadTabs } from '@/components/comunidad/comunidad-tabs';
import { getComprehension } from '@/lib/comprehension';
import { community, note, canonicPaper } from '#site/content';
import type { Metadata } from 'next';

// v5.0k · Force dynamic — el HTML compilado de papers transcluidos en
// comunidades hereda los mismos issues no-estrictos del SSG.
export const dynamic = 'force-dynamic';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  gobierno: <Landmark className="h-4 w-4" />,
  csu: <Building2 className="h-4 w-4" />,
  rectoria: <Building2 className="h-4 w-4" />,
  direccion: <Building2 className="h-4 w-4" />,
  vicerrectoria: <GraduationCap className="h-4 w-4" />,
  facultad: <GraduationCap className="h-4 w-4" />,
  programa: <FileText className="h-4 w-4" />,
  escuela: <BookMarked className="h-4 w-4" />,
  caba: <FileText className="h-4 w-4" />,
  instituto: <Microscope className="h-4 w-4" />,
  centro: <Globe className="h-4 w-4" />,
};

const TYPE_LABEL: Record<string, string> = {
  gobierno: 'Gobierno',
  csu: 'Consejo Superior',
  rectoria: 'Rectoría',
  direccion: 'Dirección',
  vicerrectoria: 'Vicerrectoría',
  facultad: 'Facultad',
  programa: 'Programa académico',
  escuela: 'Escuela Emprendedora Transformativa',
  caba: 'Cohorte Activa de Buenas-prácticas Aplicadas',
  instituto: 'Instituto',
  centro: 'Centro',
};

export function generateStaticParams() {
  const communityParams = community.map((c) => ({
    slug: c.slug === 'comunidades' ? [] : c.slug.split('/').slice(1),
  }));
  const noteParams = note.map((n) => ({
    slug: n.slug.split('/').slice(1), // strip "comunidades/" prefix
  }));
  // Per-CoP graph routes: <community-slug>/grafo
  const graphParams = community
    .filter((c) => c.slug !== 'comunidades')
    .map((c) => ({
      slug: [...c.slug.split('/').slice(1), 'grafo'],
    }));
  // Per-CoP biblioteca route: <community-slug>/biblioteca
  const bibParams = community
    .filter((c) => c.slug !== 'comunidades')
    .map((c) => ({
      slug: [...c.slug.split('/').slice(1), 'biblioteca'],
    }));
  // Per-CoP biblioteca/<docId> reader routes
  const bibDocParams: Array<{ slug: string[] }> = [];
  for (const c of community) {
    if (c.slug === 'comunidades') continue;
    const cites = c.cites ?? [];
    for (const pid of cites) {
      bibDocParams.push({
        slug: [...c.slug.split('/').slice(1), 'biblioteca', pid],
      });
    }
    const notesInVault = note.filter((n) => n.communitySlug === c.slug || n.communitySlug.startsWith(c.slug + '/'));
    for (const n of notesInVault) {
      bibDocParams.push({
        slug: [...c.slug.split('/').slice(1), 'biblioteca', encodeURIComponent(n.slug)],
      });
    }
  }
  return [...communityParams, ...noteParams, ...graphParams, ...bibParams, ...bibDocParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const segments = slug ?? [];
  // Detect /grafo as last segment
  if (segments[segments.length - 1] === 'grafo') {
    const communitySegments = segments.slice(0, -1);
    const fullSlug = ['comunidades', ...communitySegments].join('/');
    const c = community.find((x) => x.slug === fullSlug);
    if (c) {
      return {
        title: `Grafo · ${c.shortName ?? c.name}`,
        description: `Grafo local de la comunidad ${c.name}.`,
      };
    }
  }
  // Detect /biblioteca
  if (segments[segments.length - 1] === 'biblioteca') {
    const communitySegments = segments.slice(0, -1);
    const fullSlug = ['comunidades', ...communitySegments].join('/');
    const c = community.find((x) => x.slug === fullSlug);
    if (c) {
      return {
        title: `Biblioteca · ${c.shortName ?? c.name}`,
        description: `Documentos de investigación de la comunidad ${c.name} con progreso de lectura.`,
      };
    }
  }
  const fullSlug = ['comunidades', ...segments].join('/');
  const c = community.find((x) => x.slug === fullSlug);
  if (c) return { title: c.name, description: c.description };
  const n = note.find((x) => x.slug === fullSlug);
  if (n) return { title: n.title };
  return {};
}

function findCommunity(slug: string) {
  return community.find((c) => c.slug === slug);
}


function buildBreadcrumb(slug: string) {
  const parts = slug.split('/');
  const crumbs: Array<{ name: string; href?: string }> = [];
  for (let i = 1; i <= parts.length; i++) {
    const partial = parts.slice(0, i).join('/');
    const c = community.find((x) => x.slug === partial);
    if (c) {
      crumbs.push({ name: c.shortName ?? c.name, href: `/${c.slug}` });
    } else {
      const seg = parts[i - 1];
      const SYN: Record<string, string> = {
        facultades: 'Facultades',
        escuelas: 'Escuelas',
        cabas: 'CABAs',
        programas: 'Programas',
        direcciones: 'Direcciones',
        institutos: 'Institutos',
        centros: 'Centros',
        comunidades: 'Comunidades',
      };
      crumbs.push({ name: SYN[seg] ?? seg });
    }
  }
  return crumbs;
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const segments = slug ?? [];

  // Detect /grafo route → render GraphView
  if (segments[segments.length - 1] === 'grafo') {
    const communitySegments = segments.slice(0, -1);
    const fullSlug = ['comunidades', ...communitySegments].join('/');
    const cg = findCommunity(fullSlug);
    if (!cg) notFound();
    return <GraphView community={cg} />;
  }

  // Detect /biblioteca route → render BibliotecaView
  if (segments[segments.length - 1] === 'biblioteca') {
    const communitySegments = segments.slice(0, -1);
    const fullSlug = ['comunidades', ...communitySegments].join('/');
    const cb = findCommunity(fullSlug);
    if (!cb) notFound();
    return <BibliotecaView community={cb} />;
  }
  // Detect /biblioteca/<docId> route → render DocumentReader
  if (segments.length >= 2 && segments[segments.length - 2] === 'biblioteca') {
    const docId = decodeURIComponent(segments[segments.length - 1]);
    const communitySegments = segments.slice(0, -2);
    const fullSlug = ['comunidades', ...communitySegments].join('/');
    const cb = findCommunity(fullSlug);
    if (!cb) notFound();

    // Resolver doc: paper canónico o nota
    const paperDoc = canonicPaper.find((p) => p.id === docId);
    if (paperDoc) {
      return (
        <DocumentReader
          doc={{
            id: paperDoc.id,
            title: paperDoc.title,
            description: paperDoc.description,
            body: paperDoc.body,
            type: 'paper',
            metaLabels: paperDoc.tags,
            href: paperDoc.href,
          }}
          copSlug={cb.slug}
          copName={cb.shortName ?? cb.name}
          comprehension={getComprehension(paperDoc.id)}
        />
      );
    }
    const noteDoc = note.find((n) => n.slug === docId);
    if (noteDoc) {
      return (
        <DocumentReader
          doc={{
            id: noteDoc.slug,
            title: noteDoc.title,
            body: noteDoc.body,
            type: 'note',
            metaLabels: noteDoc.tags,
            href: noteDoc.href,
          }}
          copSlug={cb.slug}
          copName={cb.shortName ?? cb.name}
          comprehension={getComprehension(noteDoc.slug)}
        />
      );
    }
    notFound();
  }

  const fullSlug = ['comunidades', ...segments].join('/');

  // Check if this is a note first
  const noteMatch = note.find((n) => n.slug === fullSlug);
  if (noteMatch) {
    return <NotePage note={noteMatch} />;
  }

  // v8b · Detect CoP mission page: last segment matches a misionCoP.slug
  if (segments.length >= 2) {
    const misionSlug = segments[segments.length - 1];
    const parentSlug = ['comunidades', ...segments.slice(0, -1)].join('/');
    const parentCom = findCommunity(parentSlug);
    const mision = (parentCom as unknown as { misionesCoP?: MisionCoP[] })
      ?.misionesCoP?.find((m) => m.slug === misionSlug);
    if (mision && parentCom) {
      return (
        <CoPMissionPage
          mision={mision}
          comunidad={parentCom}
          papers={canonicPaper.filter((p) => mision.papers.includes(p.id))}
        />
      );
    }
  }

  const c = findCommunity(fullSlug);
  if (!c) notFound();

  const crumbs = buildBreadcrumb(fullSlug);
  const cited = canonicPaper.filter((p) => c.cites?.includes(p.id));

  // v7.0 — datos del modelo extendido
  const misionesColectivas = (c as unknown as { misionesColectivas?: unknown[] }).misionesColectivas ?? [];
  const misionesCoP = ((c as unknown as { misionesCoP?: MisionCoP[] }).misionesCoP ?? [])
    .sort((a, b) => a.orden - b.orden);
  const roles = (c as unknown as { roles?: unknown[] }).roles ?? [];
  const miembros = (c as unknown as { miembros?: unknown[] }).miembros ?? [];
  const conceptoId = (c as unknown as { conceptoId?: string }).conceptoId;
  const glosarioTags = (c as unknown as { glosarioTags?: string[] }).glosarioTags ?? [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        {crumbs.map((cr, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {cr.href && i < crumbs.length - 1 ? (
              <Link href={cr.href} className="hover:text-foreground">
                {cr.name}
              </Link>
            ) : (
              <span className="text-foreground">{cr.name}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Hero */}
      <header className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1">
                {TYPE_ICONS[c.type]}
                {TYPE_LABEL[c.type] ?? c.type}
              </Badge>
              {miembros.length > 0 && (
                <Badge variant="secondary" className="text-[10px]">
                  {miembros.length} miembros
                </Badge>
              )}
              {misionesColectivas.filter((m: unknown) => (m as { estado: string }).estado === 'activo').length > 0 && (
                <Badge className="gap-1 border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px]">
                  {misionesColectivas.filter((m: unknown) => (m as { estado: string }).estado === 'activo').length} misiones activas
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {c.name}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {c.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href={`/${c.slug}/biblioteca`}>📚 Biblioteca</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href={`/${c.slug}/grafo`}>🕸️ Grafo</Link>
            </Button>
            <Button size="sm" className="gap-1.5">+ Publicar</Button>
          </div>
        </div>
      </header>

      {/* v7.0 — Definición: concepto fundante del glosario */}
      {conceptoId && (
        <>
          <ComunidadDefinicion conceptoId={conceptoId} />
          <Separator className="my-8" />
        </>
      )}

      {/* v7.3 — Tabs internas con scroll-spy + anchor URLs */}
      <ComunidadTabs
        available={[
          'inicio',
          ...(misionesColectivas.length > 0 ? ['misiones-colectivas' as const] : []),
          ...(glosarioTags.length > 0 ? ['glosario' as const] : []),
          'noticias',
          'discusiones',
        ]}
      />

      {/* v8c — Panel de acceso a CoP (gates de inscripción) */}
      <section className="scroll-mt-32 mb-8">
        <CoPAccessPanel
          comunidadNombre={c.shortName ?? c.name}
          comunidadSlug={c.slug}
          misionesCoP={misionesCoP}
          roles={roles as Array<{ nivel: number; nombre: string; emoji?: string }>}
          ccaRequeridos={['m01']}
        />
      </section>

      {/* Sección Inicio: dashboard + servicios */}
      <section id="inicio" className="scroll-mt-32">
        <DashboardCop copSlug={c.slug} />
        <Separator className="my-10" />
        <ServiceTiles copSlug={c.slug} />
      </section>

      <Separator className="my-10" />

      {/* v8b — Misiones de CoP con nivel real desde localStorage */}
      {misionesCoP.length > 0 && (
        <>
          <CoPMissionsPanel
            misionesCoP={misionesCoP}
            comunidadSlug={c.slug}
            comunidadHref={c.href}
            roles={roles as Array<{ nivel: number; nombre: string; emoji?: string }>}
          />
          <Separator className="my-10" />
        </>
      )}

      {/* v7.0 — Misiones colectivas con progress (id en el componente) */}
      {misionesColectivas.length > 0 && (
        <>
          <div className="scroll-mt-32">
            <MisionesColectivas
              misiones={misionesColectivas as Parameters<typeof MisionesColectivas>[0]['misiones']}
              copSlug={c.slug}
            />
          </div>
          <Separator className="my-10" />
        </>
      )}

      {/* v7.0 — Glosario contextual (id en el componente) */}
      {glosarioTags.length > 0 && (
        <>
          <div className="scroll-mt-32">
            <GlosarioComunidad tags={glosarioTags} />
          </div>
          <Separator className="my-10" />
        </>
      )}

      {/* Noticias relacionadas — wrap con id para scroll-spy */}
      <section id="noticias" className="scroll-mt-32">
        <NoticiasRelacionadas
          communitySlug={c.slug}
          communityCites={c.cites ?? []}
        />
      </section>

      <Separator className="my-10" />

      {/* v7.0 — Roles y miembros */}
      {roles.length > 0 && (
        <>
          <RolesGrid
            roles={roles as Parameters<typeof RolesGrid>[0]['roles']}
            miembros={miembros as Parameters<typeof RolesGrid>[0]['miembros']}
          />
          <Separator className="my-10" />
        </>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <main className="min-w-0 space-y-10">
          {/* Body MDX */}
          <section className="prose-paper">
            <MDXWithHoverPreview code={c.body} />
          </section>
        </main>

        {/* Right rail — papers fundantes */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          {cited.length > 0 && (
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Fundado en
              </h3>
              <div className="space-y-2">
                {cited.map((p) => (
                  <Link key={p.id} href={p.href} className="block">
                    <Card className="p-3 transition-colors hover:border-primary/50 hover:bg-accent/30">
                      <div className="font-mono text-[10px] text-primary">
                        M{String(p.number).padStart(2, '0')}
                      </div>
                      <div className="mt-0.5 line-clamp-2 text-sm font-medium">
                        {p.title.replace(/^M\d+\s*[—-]\s*/i, '')}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>

      {/* v7.2 — Discusiones por comunidad */}
      <Discusiones term={`comunidad:${c.slug}`} />
    </div>
  );
}

function GraphView({ community: c }: { community: typeof community[number] }) {
  const crumbs = buildBreadcrumb(c.slug);
  const graphFile = c.slug.replace(/\//g, '__') + '.json';

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        {crumbs.map((cr, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {cr.href ? (
              <Link href={cr.href} className="hover:text-foreground">{cr.name}</Link>
            ) : (
              <span>{cr.name}</span>
            )}
          </span>
        ))}
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Grafo</span>
      </nav>

      <header className="mb-6">
        <Link
          href={`/${c.slug}`}
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Volver a {c.shortName ?? c.name}
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Grafo · {c.shortName ?? c.name}
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Red local del vault: notas de esta comunidad + sub-comunidades + nodos puente
          (en color claro) hacia los papers canónicos que cita.
        </p>
      </header>

      <VisNetworkGraph src={`/static/graphs/${graphFile}`} />
    </div>
  );
}

function NotePage({ note: n }: { note: typeof note[number] }) {
  const parentCommunity = community.find((c) => c.slug === n.communitySlug);
  const crumbs = buildBreadcrumb(n.communitySlug);
  const cited = canonicPaper.filter((p) => n.cites?.includes(p.id));

  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground no-print">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        {crumbs.map((cr, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {cr.href ? (
              <Link href={cr.href} className="hover:text-foreground">{cr.name}</Link>
            ) : (
              <span>{cr.name}</span>
            )}
          </span>
        ))}
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{n.title}</span>
      </nav>

      <header className="mb-8">
        <Badge variant="outline" className="mb-3 gap-1">
          <FileText className="h-3.5 w-3.5" />
          Nota del vault
        </Badge>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{n.title}</h1>
        {parentCommunity && (
          <p className="mt-2 text-sm text-muted-foreground">
            Comunidad:{' '}
            <Link href={`/${parentCommunity.slug}`} className="text-primary hover:underline">
              {parentCommunity.shortName ?? parentCommunity.name}
            </Link>
          </p>
        )}
        {n.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {n.tags.map((t) => (
              <Badge key={t} variant="secondary" className="text-[10px]">#{t}</Badge>
            ))}
          </div>
        )}
        <div className="mt-4 no-print">
          <PrintButton />
        </div>
      </header>

      <Separator className="mb-6 no-print" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="prose-paper">
          <MDXWithHoverPreview code={n.body} />
        </div>
        {cited.length > 0 && (
          <aside className="lg:sticky lg:top-20 lg:self-start no-print">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Cita
            </h3>
            <div className="space-y-2">
              {cited.map((p) => (
                <Link key={p.id} href={p.href}>
                  <Card className="p-3 transition-colors hover:border-primary/50 hover:bg-accent/30">
                    <div className="font-mono text-[10px] text-primary">
                      M{String(p.number).padStart(2, '0')}
                    </div>
                    <div className="mt-0.5 line-clamp-2 text-sm font-medium">
                      {p.title.replace(/^M\d+\s*[—-]\s*/i, '')}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}

