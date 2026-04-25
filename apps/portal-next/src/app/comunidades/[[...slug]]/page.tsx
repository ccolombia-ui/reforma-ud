import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, FileText, Folder, Network, BookMarked, Building2, GraduationCap, Microscope, Globe, Landmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MDXContent } from '@/components/mdx-content';
import { PrintButton } from '@/components/print-button';
import { community, note, canonicPaper } from '#site/content';
import type { Metadata } from 'next';

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
  return [...communityParams, ...noteParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = ['comunidades', ...(slug ?? [])].join('/');
  const c = community.find((x) => x.slug === fullSlug);
  if (c) return { title: c.name, description: c.description };
  const n = note.find((x) => x.slug === fullSlug);
  if (n) return { title: n.title };
  return {};
}

function findCommunity(slug: string) {
  return community.find((c) => c.slug === slug);
}

function findChildren(parentSlug: string) {
  // Hijos directos = aquellos cuyo slug = parent + 1 segmento más,
  // o que pasan por un grupo sintético como facultades/escuelas/etc.
  return community.filter((c) => {
    if (c.slug === parentSlug) return false;
    if (!c.slug.startsWith(parentSlug + '/')) return false;
    const rest = c.slug.slice(parentSlug.length + 1);
    // Hijos directos: 1 segmento. Pero también incluyo "grupo + 1 nodo" para mostrar
    // facultades/cmn al nivel de formacion (saltando el nodo sintético "facultades")
    const segments = rest.split('/');
    return segments.length === 1 || segments.length === 2;
  });
}

function findNotes(communitySlug: string) {
  return note.filter((n) => n.communitySlug === communitySlug);
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
  const fullSlug = ['comunidades', ...(slug ?? [])].join('/');

  // Check if this is a note first
  const noteMatch = note.find((n) => n.slug === fullSlug);
  if (noteMatch) {
    return <NotePage note={noteMatch} />;
  }

  const c = findCommunity(fullSlug);
  if (!c) notFound();

  const children = findChildren(fullSlug);
  const notes = findNotes(fullSlug);
  const crumbs = buildBreadcrumb(fullSlug);
  const cited = canonicPaper.filter((p) => c.cites?.includes(p.id));

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

      {/* Header */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1">
            {TYPE_ICONS[c.type]}
            {TYPE_LABEL[c.type] ?? c.type}
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {c.name}
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {c.description}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <main className="min-w-0 space-y-10">
          {/* Sub-comunidades */}
          {children.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold">Sub-comunidades</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {children.map((ch) => (
                  <Link key={ch.slug} href={`/${ch.slug}`} className="group block">
                    <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
                      <CardHeader>
                        <div className="mb-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                          {TYPE_ICONS[ch.type]}
                          {TYPE_LABEL[ch.type] ?? ch.type}
                        </div>
                        <CardTitle className="text-base leading-snug">
                          {ch.shortName ?? ch.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">
                          {ch.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Body MDX */}
          <section className="prose-paper">
            <MDXContent code={c.body} />
          </section>

          {/* Notas del vault */}
          {notes.length > 0 && (
            <section>
              <Separator className="mb-6" />
              <h2 className="mb-4 text-xl font-semibold">Notas del vault</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {notes.map((n) => (
                  <Link key={n.href} href={n.href} className="group block">
                    <Card className="h-full p-4 transition-all hover:border-primary/50">
                      <div className="text-sm font-medium">{n.title}</div>
                      {n.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {n.tags.map((t) => (
                            <span key={t} className="text-[10px] text-muted-foreground">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Right rail */}
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

          <Button asChild variant="outline" size="sm" className="w-full gap-2" disabled>
            <span>
              <Network className="h-3.5 w-3.5" />
              Grafo de la CoP (S3)
            </span>
          </Button>
        </aside>
      </div>
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
          <MDXContent code={n.body} />
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

